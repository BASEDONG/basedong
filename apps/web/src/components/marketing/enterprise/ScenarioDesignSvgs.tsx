import type { ReactNode } from "react";
import type { ScenarioDiagramSpec } from "./content";

export type DiagramPalette = {
  accent: string;
  secondary: string;
};

function tint(color: string, pct: number) {
  return `color-mix(in srgb, ${color} ${pct}%, white)`;
}

const FONT = "system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif";

function SvgShell({
  title,
  palette,
  children,
}: {
  title: string;
  palette: DiagramPalette;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox="0 0 960 560"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      role="presentation"
    >
      <defs>
        <marker id="mA" markerWidth="9" markerHeight="9" refX="8" refY="3.5" orient="auto">
          <path d="M0,0 L8,3.5 L0,7 Z" fill={palette.accent} />
        </marker>
        <marker id="mS" markerWidth="9" markerHeight="9" refX="8" refY="3.5" orient="auto">
          <path d="M0,0 L8,3.5 L0,7 Z" fill={palette.secondary} />
        </marker>
      </defs>
      <rect width="960" height="560" rx="16" fill="#ffffff" stroke="#eceef3" />
      <text
        x="480"
        y="38"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill={palette.accent}
        fontFamily={FONT}
      >
        {title}
      </text>
      {children}
    </svg>
  );
}

function Tx({
  x,
  y,
  children,
  size = 14,
  weight = 600,
  fill = "#1E293B",
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      fontFamily={FONT}
    >
      {children}
    </text>
  );
}

function Panel({
  x,
  y,
  w,
  h,
  fill,
  stroke,
  rx = 14,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  stroke: string;
  rx?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={1.5} />;
}

function Capsule({
  x,
  y,
  w,
  h,
  label,
  stroke,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  stroke: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h / 2} fill="#fff" stroke={stroke} strokeWidth={1.5} />
      <Tx x={x + w / 2} y={y + h / 2 + 5} size={13}>
        {label}
      </Tx>
    </g>
  );
}

function Tile({
  x,
  y,
  w,
  h,
  label,
  stroke,
  size = 12,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  stroke: string;
  size?: number;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="#fff" stroke={stroke} strokeWidth={1.2} />
      <Tx x={x + w / 2} y={y + h / 2 + 4} size={size} weight={500}>
        {label}
      </Tx>
    </g>
  );
}

function BaseEllipse({
  cx,
  cy,
  rx,
  ry,
  label,
  left,
  right,
  fill,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  label: string;
  left?: string;
  right?: string;
  fill: string;
}) {
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} />
      {left ? (
        <Tx x={cx - rx + 80} y={cy + 5} size={12} weight={500} fill="#57627f">
          {left}
        </Tx>
      ) : null}
      <Tx x={cx} y={cy + 6} size={16} weight={700}>
        {label}
      </Tx>
      {right ? (
        <Tx x={cx + rx - 80} y={cy + 5} size={12} weight={500} fill="#57627f">
          {right}
        </Tx>
      ) : null}
    </g>
  );
}

export function EnterpriseScenarioSvg({
  spec,
  palette,
}: {
  spec: Extract<ScenarioDiagramSpec, { layout: "enterpriseFlow" }>;
  palette: DiagramPalette;
}) {
  const a = palette.accent;
  const s = palette.secondary;

  return (
    <SvgShell title={spec.title} palette={palette}>
      <line x1={170} y1={430} x2={170} y2={485} stroke={a} strokeWidth={2} strokeOpacity={0.35} />
      <line x1={480} y1={430} x2={480} y2={485} stroke={a} strokeWidth={2} strokeOpacity={0.35} />
      <line x1={790} y1={430} x2={790} y2={485} stroke={a} strokeWidth={2} strokeOpacity={0.35} />

      <Panel x={36} y={58} w={268} h={355} fill={tint(a, 8)} stroke={tint(a, 35)} />
      <Tx x={170} y={88} size={15} weight={700}>
        {spec.training.title}
      </Tx>
      {spec.training.steps.map((step, i) => (
        <g key={step}>
          <Capsule x={66} y={115 + i * 95} w={208} h={54} label={step} stroke={tint(a, 40)} />
          {i < spec.training.steps.length - 1 ? (
            <line
              x1={170}
              y1={174 + i * 95}
              x2={170}
              y2={205 + i * 95}
              stroke={a}
              strokeWidth={2.2}
              markerEnd="url(#mA)"
            />
          ) : null}
        </g>
      ))}

      <line x1={314} y1={250} x2={352} y2={250} stroke={a} strokeWidth={2.4} markerEnd="url(#mA)" />

      <Panel x={362} y={58} w={268} h={355} fill={tint(s, 12)} stroke={tint(s, 42)} />
      <Tx x={496} y={88} size={15} weight={700}>
        {spec.inference.title}
      </Tx>
      {spec.inference.steps.map((step, i) => (
        <g key={step}>
          <Capsule x={392} y={115 + i * 95} w={208} h={54} label={step} stroke={tint(s, 40)} />
          {i < spec.inference.steps.length - 1 ? (
            <line
              x1={496}
              y1={174 + i * 95}
              x2={496}
              y2={205 + i * 95}
              stroke={s}
              strokeWidth={2.2}
              markerEnd="url(#mS)"
            />
          ) : null}
        </g>
      ))}

      <Tx x={662} y={178} size={11} weight={500} fill="#57627f">
        {spec.apiUp}
      </Tx>
      <line x1={640} y1={195} x2={682} y2={195} stroke={a} strokeWidth={2.2} markerEnd="url(#mA)" />
      <Tx x={662} y={308} size={11} weight={500} fill="#57627f">
        {spec.apiDown}
      </Tx>
      <line x1={682} y1={325} x2={640} y2={325} stroke={s} strokeWidth={2.2} markerEnd="url(#mS)" />

      <Panel x={692} y={58} w={232} h={355} fill={tint(a, 5)} stroke={tint(a, 25)} />
      <Tx x={808} y={88} size={14} weight={700}>
        {spec.apps.title}
      </Tx>
      {spec.apps.items.map((item, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        return (
          <Tile
            key={item}
            x={712 + col * 102}
            y={112 + row * 92}
            w={92}
            h={72}
            label={item}
            stroke={tint(a, 30)}
            size={11}
          />
        );
      })}

      <BaseEllipse
        cx={480}
        cy={518}
        rx={390}
        ry={28}
        label={spec.platform}
        left={spec.supportLeft}
        right={spec.supportRight}
        fill={tint(s, 42)}
      />
    </SvgShell>
  );
}

export function AiCenterScenarioSvg({
  spec,
  palette,
}: {
  spec: Extract<ScenarioDiagramSpec, { layout: "aiCenterStack" }>;
  palette: DiagramPalette;
}) {
  const a = palette.accent;
  const s = palette.secondary;

  return (
    <SvgShell title={spec.title} palette={palette}>
      <Panel x={22} y={56} w={112} h={128} fill={a} stroke={a} rx={12} />
      <Tx x={78} y={125} size={13} weight={700} fill="#fff">
        {spec.leftAudience}
      </Tx>

      <Panel x={148} y={56} w={664} h={128} fill={tint(a, 6)} stroke={tint(a, 28)} />
      <Tx x={380} y={80} size={12} weight={500} fill="#57627f">
        {spec.axisLeft}
      </Tx>
      <Tx x={480} y={80} size={14} weight={600} fill={a}>
        ↔
      </Tx>
      <Tx x={580} y={80} size={12} weight={500} fill="#57627f">
        {spec.axisRight}
      </Tx>
      {spec.capabilityChips.map((chip, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <Tile
            key={chip}
            x={168 + col * 155}
            y={98 + row * 40}
            w={145}
            h={32}
            label={chip}
            stroke={tint(a, 28)}
            size={12}
          />
        );
      })}

      <Panel x={826} y={56} w={112} h={128} fill={a} stroke={a} rx={12} />
      <Tx x={882} y={125} size={13} weight={700} fill="#fff">
        {spec.rightAudience}
      </Tx>

      <Panel x={22} y={205} w={916} h={230} fill={tint(s, 10)} stroke={tint(s, 40)} />
      <Tx x={480} y={232} size={15} weight={700}>
        {spec.modelServiceTitle}
      </Tx>
      {spec.models.map((m, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        return (
          <Tile
            key={m}
            x={46 + col * 160}
            y={255 + row * 55}
            w={148}
            h={44}
            label={m}
            stroke={tint(a, 28)}
            size={13}
          />
        );
      })}
      {spec.sidePanels.map((p, i) => (
        <Tile
          key={p}
          x={720}
          y={255 + i * 70}
          w={190}
          h={58}
          label={p}
          stroke={tint(s, 40)}
          size={13}
        />
      ))}
      <rect x={46} y={380} width={868} height={38} rx={8} fill={tint(s, 40)} />
      <Tx x={480} y={405} size={13} weight={600}>
        {spec.integrateBar}
      </Tx>

      <Panel x={22} y={455} w={916} h={85} fill={tint(a, 8)} stroke={tint(a, 30)} />
      <Tx x={480} y={480} size={13} weight={700}>
        {spec.poolTitle}
      </Tx>
      {spec.vendors.map((v, i) => (
        <Tile key={v} x={46 + i * 98} y={495} w={90} h={28} label={v} stroke={tint(a, 25)} size={11} />
      ))}
    </SvgShell>
  );
}

export function IndustryFunnelScenarioSvg({
  spec,
  palette,
}: {
  spec: Extract<ScenarioDiagramSpec, { layout: "industryFunnel" }>;
  palette: DiagramPalette;
}) {
  const a = palette.accent;
  const s = palette.secondary;
  const hasArc = Boolean(spec.arc?.length);
  const hasEngine = Boolean(spec.engine);
  const isService = spec.topMode === "service";

  return (
    <SvgShell title={spec.title} palette={palette}>
      <Panel
        x={50}
        y={52}
        w={860}
        h={isService || spec.topItems.length > 3 ? 128 : 96}
        fill={tint(a, 7)}
        stroke={tint(a, 30)}
      />
      {isService && spec.topTitle ? (
        <Tx x={480} y={76} size={14} weight={700}>
          {spec.topTitle}
        </Tx>
      ) : null}
      {spec.topItems.map((item, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const startY = isService ? 92 : 72;
        return (
          <Tile
            key={item}
            x={80 + col * 270}
            y={startY + row * 48}
            w={250}
            h={40}
            label={item}
            stroke={tint(a, 30)}
            size={12}
          />
        );
      })}

      <path
        d="M355 245 L480 180 L605 245 L545 245 L545 280 L415 280 L415 245 Z"
        fill={tint(a, 28)}
        stroke={tint(a, 45)}
        strokeWidth={1.5}
      />

      {hasArc
        ? spec.arc!.map((label, i) => (
            <Tile
              key={label}
              x={150 + i * 170}
              y={295}
              w={155}
              h={28}
              label={label}
              stroke={tint(a, 30)}
              size={11}
            />
          ))
        : null}

      <Panel
        x={60}
        y={hasArc ? 345 : 320}
        w={190}
        h={72}
        fill={tint(a, 12)}
        stroke={tint(a, 35)}
        rx={12}
      />
      <Tx x={155} y={hasArc ? 388 : 363} size={14} weight={700}>
        {spec.left}
      </Tx>

      <rect x={350} y={hasArc ? 340 : 315} width={260} height={82} rx={14} fill={a} />
      <Tx x={480} y={hasArc ? 388 : 363} size={18} weight={700} fill="#fff">
        {spec.hub}
      </Tx>

      <Panel
        x={710}
        y={hasArc ? 345 : 320}
        w={190}
        h={72}
        fill={tint(a, 12)}
        stroke={tint(a, 35)}
        rx={12}
      />
      <Tx x={805} y={hasArc ? 388 : 363} size={14} weight={700}>
        {spec.right}
      </Tx>

      <line
        x1={480}
        y1={hasEngine ? 445 : 420}
        x2={480}
        y2={492}
        stroke={a}
        strokeWidth={2}
        strokeOpacity={0.4}
      />
      <line
        x1={155}
        y1={hasArc ? 417 : 392}
        x2={155}
        y2={492}
        stroke={a}
        strokeWidth={1.5}
        strokeOpacity={0.3}
      />
      <line
        x1={805}
        y1={hasArc ? 417 : 392}
        x2={805}
        y2={492}
        stroke={a}
        strokeWidth={1.5}
        strokeOpacity={0.3}
      />

      {hasEngine ? (
        <g>
          <rect x={210} y={438} width={540} height={38} rx={10} fill={tint(a, 16)} />
          <Tx x={480} y={463} size={14} weight={650}>
            {spec.engine!}
          </Tx>
        </g>
      ) : null}

      <BaseEllipse cx={480} cy={522} rx={350} ry={26} label={spec.platform} fill={tint(s, 42)} />
    </SvgShell>
  );
}

export function TransportScenarioSvg({
  spec,
  palette,
}: {
  spec: Extract<ScenarioDiagramSpec, { layout: "transportFlow" }>;
  palette: DiagramPalette;
}) {
  const a = palette.accent;
  const s = palette.secondary;

  return (
    <SvgShell title={spec.title} palette={palette}>
      <Panel x={50} y={52} w={860} h={112} fill={tint(s, 12)} stroke={tint(s, 40)} />
      <Tx x={480} y={80} size={15} weight={700}>
        {spec.trainingTitle}
      </Tx>
      {spec.trainingSteps.map((step, i) => (
        <g key={step}>
          <Tile x={90 + i * 205} y={98} w={170} h={42} label={step} stroke={tint(a, 30)} size={13} />
          {i < spec.trainingSteps.length - 1 ? (
            <line
              x1={265 + i * 205}
              y1={119}
              x2={290 + i * 205}
              y2={119}
              stroke={a}
              strokeWidth={2.2}
              markerEnd="url(#mA)"
            />
          ) : null}
        </g>
      ))}

      <line
        x1={455}
        y1={175}
        x2={455}
        y2={255}
        stroke={a}
        strokeWidth={2}
        strokeDasharray="6 4"
        markerEnd="url(#mA)"
      />
      <Tx x={395} y={220} size={11} weight={500} fill="#57627f">
        {spec.flowModelDown}
      </Tx>
      <line
        x1={520}
        y1={255}
        x2={520}
        y2={175}
        stroke={s}
        strokeWidth={2}
        strokeDasharray="6 4"
        markerEnd="url(#mS)"
      />
      <Tx x={585} y={220} size={11} weight={500} fill="#57627f">
        {spec.flowDataUp}
      </Tx>

      <Panel x={36} y={280} w={220} h={210} fill={tint(a, 8)} stroke={tint(a, 32)} />
      <Tx x={146} y={345} size={14} weight={700}>
        {spec.edgeTitle}
      </Tx>
      <Tile x={56} y={390} w={180} h={48} label={spec.edgeChip} stroke={tint(a, 30)} size={13} />

      <line x1={266} y1={385} x2={348} y2={385} stroke={a} strokeWidth={2.2} markerEnd="url(#mA)" />
      <Tx x={307} y={368} size={10} weight={500} fill="#57627f">
        {spec.flowEdgeToCenter}
      </Tx>

      <Panel x={360} y={270} w={240} h={230} fill={tint(a, 14)} stroke={tint(a, 40)} />
      <Tx x={480} y={390} size={16} weight={700}>
        {spec.centerTitle}
      </Tx>

      <line x1={610} y1={350} x2={690} y2={350} stroke={a} strokeWidth={2.2} markerEnd="url(#mA)" />
      <Tx x={650} y={333} size={10} weight={500} fill="#57627f">
        {spec.flowToBusiness}
      </Tx>
      <line
        x1={690}
        y1={430}
        x2={610}
        y2={430}
        stroke={s}
        strokeWidth={2}
        strokeDasharray="6 4"
        markerEnd="url(#mS)"
      />
      <Tx x={650} y={455} size={10} weight={500} fill="#57627f">
        {spec.flowFromBusiness}
      </Tx>

      <Panel x={704} y={280} w={220} h={210} fill={tint(s, 12)} stroke={tint(s, 40)} />
      <Tx x={814} y={390} size={14} weight={700}>
        {spec.businessTitle}
      </Tx>
    </SvgShell>
  );
}
