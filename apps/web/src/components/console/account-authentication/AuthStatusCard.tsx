import {
  enterpriseChangeHref,
  statusCard,
  type AuthFieldRow,
} from "./content";
import { AuthCheckCircleIcon } from "./icons";

function FieldRow({
  row,
  withFlex,
}: {
  row: AuthFieldRow;
  withFlex?: boolean;
}) {
  const inner = (
    <>
      {row.label}：
      {row.spaceAfterColon ? " " : null}
      <span className="text-gray-700">{row.value}</span>
      {row.showCheck ? (
        <AuthCheckCircleIcon className="ml-1 text-green-400" />
      ) : null}
    </>
  );

  if (withFlex) {
    return <div className="flex items-center">{inner}</div>;
  }
  return <div>{inner}</div>;
}

export function AuthStatusCard() {
  return (
    <div className="max-w-[800px] border border-zinc-200 px-3 pb-5 text-black">
      <div className="mb-2 flex items-center justify-between">
        <div className="py-5 pb-3 font-medium">{statusCard.title}</div>
        <div className="flex items-center gap-3 text-sm text-[rgba(108,40,246,0.8)]">
          <a href={enterpriseChangeHref}>{statusCard.enterpriseLink}</a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
        {statusCard.columns.map((column, colIdx) => (
          <div key={colIdx} className="grid gap-2">
            {column.map((row) => (
              <FieldRow
                key={row.label}
                row={row}
                withFlex={colIdx === 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
