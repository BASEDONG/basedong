#!/usr/bin/env bash
# EPay top-up seam (BASEDONG/basedong#6):
# compliance + EPay options → POST /pay (pending) → signed notify → 额度↑
# + negatives: bad signature / unknown trade must not credit
#
# Without a live merchant: Purchase only builds a signed form URL locally;
# credit is proven via a correctly MD5-signed /api/user/epay/notify (same path
# as a real gateway callback → RechargeEpay).
#
# Usage:
#   BASEDONG_API_BASE=http://localhost:3000 ./scripts/probe-epay.sh
set -euo pipefail

BASE="${BASEDONG_API_BASE:-http://localhost:3000}"
BASE="${BASE%/}"
USER="e$(date +%s | tail -c 7)$((RANDOM % 1000))"
PASS="ProbePass123!"
ROOT_USER="rootprobe"
ROOT_PASS="RootPass123!"
TOPUP_AMOUNT=1
EPAY_KEY="probe-epay-key"

json_str() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n1
}

json_num() {
  local key="$1"
  sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\([0-9][0-9]*\).*/\1/p" | head -n1
}

put_option() {
  local key="$1"
  local value="$2"
  local out
  out="$(curl -sS -X PUT "$BASE/api/option/" \
    -H "Authorization: Bearer $root_token" \
    -H 'Content-Type: application/json' \
    -d "{\"key\":\"$key\",\"value\":$value}")"
  echo "$out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
    echo "option $key failed: $out" >&2
    exit 1
  }
}

# MD5 sign EPay notify params (exclude sign / sign_type / empty); append merchant key.
epay_md5_sign() {
  EPAY_KEY="$EPAY_KEY" python3 - "$@" <<'PY'
import hashlib, os, sys
key = os.environ["EPAY_KEY"]
params = {}
for arg in sys.argv[1:]:
    k, _, v = arg.partition("=")
    params[k] = v
items = sorted(
    (k, v) for k, v in params.items()
    if v and k not in ("sign", "sign_type")
)
payload = "&".join(f"{k}={v}" for k, v in items) + key
print(hashlib.md5(payload.encode()).hexdigest())
PY
}

echo "ensure setup"
setup_json="$(curl -fsS "$BASE/api/setup" || true)"
if echo "$setup_json" | grep -q '"status"[[:space:]]*:[[:space:]]*false\|"status"[[:space:]]*:[[:space:]]*0'; then
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    | grep -q '"success"[[:space:]]*:[[:space:]]*true'
else
  curl -fsS -X POST "$BASE/api/setup" \
    -H 'Content-Type: application/json' \
    -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\",\"confirmPassword\":\"$ROOT_PASS\",\"SelfUseModeEnabled\":false,\"DemoSiteEnabled\":false}" \
    >/tmp/setup-epay.out || true
fi

echo "register $USER"
reg_out="$(curl -sS -X POST "$BASE/api/user/register" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
echo "$reg_out" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "register failed: $reg_out" >&2
  exit 1
}

user_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}")"
user_token="$(echo "$user_login" | json_str access_token)"
test -n "$user_token"

root_login="$(curl -fsS -X POST "$BASE/api/user/login" \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$ROOT_USER\",\"password\":\"$ROOT_PASS\"}")"
root_token="$(echo "$root_login" | json_str access_token)"
test -n "$root_token"

echo "confirm payment compliance"
comp="$(curl -sS -X POST "$BASE/api/option/payment_compliance" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d '{"confirmed":true}')"
echo "$comp" | grep -q '"success"[[:space:]]*:[[:space:]]*true' || {
  echo "compliance failed: $comp" >&2
  exit 1
}

echo "configure EPay options (probe merchant — no live gateway required for /pay form)"
put_option "PayAddress" '"https://pay.example.invalid/"'
put_option "EpayId" '"10001"'
put_option "EpayKey" "\"$EPAY_KEY\""
put_option "ServerAddress" '"http://localhost:3001"'
put_option "CustomCallbackAddress" "\"$BASE\""
put_option "PayMethods" '"[{\"name\":\"支付宝\",\"type\":\"alipay\"},{\"name\":\"微信\",\"type\":\"wxpay\"}]"'
put_option "MinTopUp" '"1"'
put_option "Price" '"1"'

echo "topup info should enable online topup"
info="$(curl -fsS "$BASE/api/user/topup/info" -H "Authorization: Bearer $user_token")"
echo "info: $(echo "$info" | head -c 400)"
echo "$info" | grep -q '"enable_online_topup"[[:space:]]*:[[:space:]]*true' || {
  echo "enable_online_topup expected true" >&2
  exit 1
}

before="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_before="$(echo "$before" | json_num quota)"
echo "quota_before=$quota_before"
test -n "$quota_before"

echo "POST /api/user/pay (creates pending topup + signed form)"
pay_out="$(curl -sS -X POST "$BASE/api/user/pay" \
  -H "Authorization: Bearer $user_token" \
  -H 'Content-Type: application/json' \
  -d "{\"amount\":$TOPUP_AMOUNT,\"payment_method\":\"alipay\"}")"
echo "pay: $(echo "$pay_out" | head -c 500)"
echo "$pay_out" | grep -q '"message"[[:space:]]*:[[:space:]]*"success"' || {
  echo "pay failed" >&2
  exit 1
}
echo "$pay_out" | grep -q '"url"'
money="$(echo "$pay_out" | json_str money)"
test -n "$money"

tops="$(curl -fsS "$BASE/api/user/topup/self?p=1&page_size=10" -H "Authorization: Bearer $user_token")"
trade_no="$(echo "$tops" | sed -n 's/.*"trade_no"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
test -n "$trade_no"
echo "trade_no=$trade_no money=$money"

echo "negative: unsigned / bad-sign notify must not credit"
fake_notify="$(curl -sS -G "$BASE/api/user/epay/notify" \
  --data-urlencode "pid=10001" \
  --data-urlencode "trade_no=EPAYFAKE1" \
  --data-urlencode "out_trade_no=$trade_no" \
  --data-urlencode "type=alipay" \
  --data-urlencode "name=TUC$TOPUP_AMOUNT" \
  --data-urlencode "money=$money" \
  --data-urlencode "trade_status=TRADE_SUCCESS" \
  --data-urlencode "sign=deadbeef" \
  --data-urlencode "sign_type=MD5" || true)"
echo "fake_notify: $fake_notify"
mid="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_mid="$(echo "$mid" | json_num quota)"
test "$quota_mid" = "$quota_before"

echo "signed notify (simulates gateway callback → RechargeEpay)"
good_sign="$(epay_md5_sign \
  "pid=10001" \
  "trade_no=EPAYPROBE1" \
  "out_trade_no=$trade_no" \
  "type=alipay" \
  "name=TUC$TOPUP_AMOUNT" \
  "money=$money" \
  "trade_status=TRADE_SUCCESS")"
notify_out="$(curl -sS -G "$BASE/api/user/epay/notify" \
  --data-urlencode "pid=10001" \
  --data-urlencode "trade_no=EPAYPROBE1" \
  --data-urlencode "out_trade_no=$trade_no" \
  --data-urlencode "type=alipay" \
  --data-urlencode "name=TUC$TOPUP_AMOUNT" \
  --data-urlencode "money=$money" \
  --data-urlencode "trade_status=TRADE_SUCCESS" \
  --data-urlencode "sign=$good_sign" \
  --data-urlencode "sign_type=MD5")"
echo "notify: $notify_out"
echo "$notify_out" | grep -qi 'success' || {
  echo "expected notify success" >&2
  exit 1
}

after="$(curl -fsS "$BASE/api/user/self" -H "Authorization: Bearer $user_token")"
quota_after="$(echo "$after" | json_num quota)"
echo "quota_after=$quota_after"
if [ "$quota_after" -le "$quota_before" ]; then
  echo "expected 额度 to increase after signed notify" >&2
  exit 1
fi

echo "negative: complete unknown trade_no fails"
bad="$(curl -sS -X POST "$BASE/api/user/topup/complete" \
  -H "Authorization: Bearer $root_token" \
  -H 'Content-Type: application/json' \
  -d '{"trade_no":"USR0NOdoes-not-exist"}')"
echo "bad complete: $bad"
if echo "$bad" | grep -q '"success"[[:space:]]*:[[:space:]]*true'; then
  echo "unknown trade must not succeed" >&2
  exit 1
fi

echo "ok: EPay top-up seam (pay → pending → signed notify → 额度)"
