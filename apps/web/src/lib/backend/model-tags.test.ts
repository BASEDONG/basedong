import assert from "node:assert/strict";
import test from "node:test";

import {
  bsContextKeyFromTags,
  capabilityKeysFromTags,
  contextLabelFromTags,
  formatContextKLabel,
  isBsControlTag,
  maxContextKFromTags,
  parseTags,
  writeBsContextTag,
} from "./model-tags.ts";

test("parses bsCtx{n} thousands and formats labels", () => {
  const tags = parseTags("bsCapMultimodal,bsCtx127");
  assert.equal(maxContextKFromTags(tags), 127);
  assert.equal(contextLabelFromTags(tags), "127K");
  assert.equal(bsContextKeyFromTags(tags), "bsCtx127");
  assert.equal(writeBsContextTag(1000), "bsCtx1000");
  assert.equal(formatContextKLabel(1000), "1M");
  assert.equal(formatContextKLabel(256), "256K");
});

test("dual-reads legacy bsCtx128k / 1M into numeric K", () => {
  assert.equal(maxContextKFromTags(parseTags("Tools,Vision,1M")), 1000);
  assert.equal(contextLabelFromTags(parseTags("1M")), "1M");
  assert.equal(maxContextKFromTags(parseTags("bsCtx200k")), 200);
  assert.equal(contextLabelFromTags(parseTags("bsCtx200k")), "200K");
  assert.equal(maxContextKFromTags(parseTags("bsCtx512k")), 512);
  assert.equal(contextLabelFromTags(parseTags("8K")), "8K");
});

test("prefers largest context when several present", () => {
  const tags = parseTags("bsCtx256,bsCtx1000,bsCtx128");
  assert.equal(maxContextKFromTags(tags), 1000);
  assert.equal(contextLabelFromTags(tags), "1M");
  assert.equal(bsContextKeyFromTags(tags), "bsCtx1000");
});

test("only multimodal is a live capability; Vision dual-reads into it", () => {
  assert.deepEqual(
    capabilityKeysFromTags(parseTags("bsCapReasoning,Tools,Vision")),
    ["multimodal"],
  );
  assert.deepEqual(
    capabilityKeysFromTags(parseTags("bsCapMultimodal")),
    ["multimodal"],
  );
  assert.deepEqual(capabilityKeysFromTags(parseTags("bsCapTools")), []);
  assert.equal(isBsControlTag("bsCapMultimodal"), true);
  assert.equal(isBsControlTag("bsCtx127"), true);
  assert.equal(isBsControlTag("bsCapTools"), false);
  assert.equal(isBsControlTag("Reasoning"), false);
});
