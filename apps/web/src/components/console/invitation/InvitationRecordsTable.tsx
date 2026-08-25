import { copy, tableColumns } from "./content";

function EmptyIllustration() {
  return (
    <svg
      width="64"
      height="41"
      viewBox="0 0 64 41"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
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

const antFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif';

export function InvitationRecordsTable() {
  return (
    <div className="ant-table-wrapper w-full max-w-full" style={{ fontFamily: antFont }}>
      <div className="ant-table ant-table-empty overflow-hidden rounded-t-[8px] bg-white text-[#1E293B]">
        <div className="ant-table-container relative overflow-hidden rounded-t-[8px]">
          <div className="ant-table-content overflow-visible">
            <table className="w-full border-collapse text-sm leading-[22px]">
              <colgroup>
                <col style={{ width: "20%" }} />
              </colgroup>
              <thead className="ant-table-thead">
                <tr>
                  {tableColumns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className="ant-table-cell h-[55px] whitespace-nowrap border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 text-left text-sm font-semibold leading-[22px] text-[#1E293B] transition-[background] duration-200"
                      style={{
                        borderRadius:
                          i === 0
                            ? "8px 0 0 0"
                            : i === tableColumns.length - 1
                              ? "0 8px 0 0"
                              : undefined,
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                <tr className="ant-table-placeholder">
                  <td
                    colSpan={tableColumns.length}
                    className="ant-table-cell border-b border-[#E2E8F0] p-4 text-[#94A3B8]"
                  >
                    <div className="ant-empty ant-empty-normal mx-2 my-8 block text-center text-[#64748B]">
                      <div className="ant-empty-image mb-2">
                        <EmptyIllustration />
                      </div>
                      <div className="ant-empty-description text-sm leading-[22px]">
                        {copy.empty}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
