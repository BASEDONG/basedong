import { ASSET, recordsColumns } from "./content";

function EmptyIllustration() {
  return (
    <svg
      width="64"
      height="41"
      viewBox="0 0 64 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>暂无数据</title>
      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
        <ellipse fill="#f8fafc" cx="32" cy="33" rx="32" ry="7" />
        <g fillRule="nonzero" stroke="#e2e8f0">
          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" />
          <path
            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
            fill="#f8fafc"
          />
        </g>
      </g>
    </svg>
  );
}

export function InviteRecords() {
  return (
    <div className="mt-12">
      <div className="mb-4 px-4 font-semibold">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ASSET.text3}
          alt="inviter-banner-text"
          className="mx-auto mb-[20px] h-[56px]"
        />
        <div className="flex justify-end">
          <div>
            累计已完成 <span className="text-red-600">0</span> 次有效推荐，共获得{" "}
            <span className="text-red-600">0</span> 元代金券
          </div>
        </div>
      </div>

      <div className="inviter-ant-table overflow-hidden rounded-t-[8px] bg-white">
        <table className="w-full table-auto text-left text-sm">
          <thead>
            <tr>
              {recordsColumns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className="whitespace-nowrap bg-slate-50 px-4 py-4 text-sm font-semibold leading-[22px] text-slate-800"
                >
                  {i === recordsColumns.length - 1 ? (
                    <span>
                      {col}{" "}
                      <span className="ml-2" title="有效认证说明">
                        ℹ️
                      </span>
                    </span>
                  ) : (
                    col
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-4 py-12">
                <div className="flex flex-col items-center justify-center gap-2">
                  <EmptyIllustration />
                  <div className="text-sm leading-[22px] text-slate-500">
                    暂无数据
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
