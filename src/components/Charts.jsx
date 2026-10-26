import { useEffect, useRef, useState } from 'react';

/* Width of an element in CSS pixels, so SVG charts draw at true size and keep readable labels. */
function useWidth(fallback) {
  const ref = useRef(null);
  const [w, setW] = useState(fallback);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

const fmt = {
  pct: (v) => `${Math.round(v * 100)}%`,
  pct1: (v) => `${(v * 100).toFixed(1)}%`,
  dec2: (v) => v.toFixed(2),
  dec3: (v) => (Math.round(v * 1000) / 1000).toString(),
  m: (v) => `${v.toFixed(1)} m`,
};

/* Line chart: SVG plot, hover or arrow keys move a readout across the x positions. */
export function LineChart({ x, series, yDomain, format, xLabel, yLabel }) {
  const [active, setActive] = useState(null);
  const f = fmt[format];
  const [wrapRef, measured] = useWidth(520);
  const W = Math.max(260, measured), H = Math.round(Math.min(300, Math.max(220, W * 0.56)));
  const m = { t: 14, r: 14, b: 44, l: 48 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const [y0, y1] = yDomain;
  const xs = (i) => m.l + (i / (x.length - 1)) * iw;
  const ys = (v) => m.t + ih - ((v - y0) / (y1 - y0)) * ih;
  const ticks = Array.from({ length: 5 }, (_, i) => y0 + ((y1 - y0) * i) / 4);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((px - m.l) / iw) * (x.length - 1));
    setActive(Math.max(0, Math.min(x.length - 1, i)));
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') setActive((a) => Math.min(x.length - 1, (a ?? -1) + 1));
    if (e.key === 'ArrowLeft') setActive((a) => Math.max(0, (a ?? x.length) - 1));
  };

  return (
    <div>
      {series.length > 1 && (
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3 text-sm text-slate">
          {series.map((s) => (
            <li key={s.name} className="flex items-center gap-2">
              <svg width="22" height="8" aria-hidden="true">
                <line x1="0" y1="4" x2="22" y2="4" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dash} />
              </svg>
              {s.name}
            </li>
          ))}
        </ul>
      )}
      <div className="relative" ref={wrapRef}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="block max-w-full touch-none select-none"
          role="img"
          tabIndex={0}
          aria-label={`${yLabel} by ${xLabel}. Use the arrow keys to read values.`}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          onKeyDown={onKey}
          onBlur={() => setActive(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={W - m.r} y1={ys(t)} y2={ys(t)} stroke="#DDE2EA" />
              <text x={m.l - 8} y={ys(t)} dy="0.35em" textAnchor="end" fontSize="13" fill="#5B6475" className="tabular">
                {f(t)}
              </text>
            </g>
          ))}
          {x.map((v, i) => (
            <text key={v} x={xs(i)} y={H - m.b + 20} textAnchor="middle" fontSize="13" fill="#5B6475" className="tabular">
              {v}
            </text>
          ))}
          <text x={m.l + iw / 2} y={H - 4} textAnchor="middle" fontSize="13" fill="#5B6475">
            {xLabel}
          </text>
          {active !== null && <line x1={xs(active)} x2={xs(active)} y1={m.t} y2={m.t + ih} stroke="#14213D" strokeOpacity="0.25" />}
          {series.map((s) => (
            <g key={s.name}>
              <polyline
                points={s.values.map((v, i) => `${xs(i)},${ys(v)}`).join(' ')}
                fill="none"
                stroke={s.color}
                strokeWidth="2.5"
                strokeDasharray={s.dash}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {s.values.map((v, i) => (
                <circle key={i} cx={xs(i)} cy={ys(v)} r={active === i ? 5 : 3} fill={s.color} stroke="#fff" strokeWidth="1.5" />
              ))}
            </g>
          ))}
        </svg>
        {active !== null && (
          <div
            className="pointer-events-none absolute top-1 rounded-md bg-white text-ink border border-rule text-sm px-3 py-2 shadow-lg tabular"
            style={{
              left: `${(xs(active) / W) * 100}%`,
              transform: active > (x.length - 1) / 2 ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)',
            }}
            aria-live="polite"
          >
            <p className="font-semibold mb-1 whitespace-nowrap">
              {xLabel}: {x[active]}
            </p>
            {series.map((s) => (
              <p key={s.name} className="flex items-center gap-2 whitespace-nowrap">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: s.color }} />
                {series.length > 1 && <span className="text-slate">{s.name}</span>}
                <span className="ml-auto pl-3 font-medium">{f(s.values[active])}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const scale = (v, [d0, d1]) => Math.max(0, Math.min(1, (v - d0) / (d1 - d0))) * 100;

/* Horizontal bars, values labelled directly. */
export function BarChart({ rows, domain, format }) {
  const f = fmt[format];
  return (
    <div>
    <dl className="space-y-2.5">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[minmax(0,11rem)_1fr] sm:grid-cols-[minmax(0,14rem)_1fr] items-center gap-3">
          <dt className={`text-sm leading-tight ${r.highlight ? 'font-semibold text-ink' : 'text-slate'}`}>{r.label}</dt>
          <dd className="flex items-center gap-2">
            <span
              className="h-5 rounded-r-sm"
              style={{ width: `${scale(r.value, domain)}%`, minWidth: 3, background: r.highlight ? '#6D5BD0' : '#B9B2E8' }}
            />
            <span className={`text-sm ${r.highlight ? 'font-semibold' : ''}`}>{f(r.value)}</span>
          </dd>
        </div>
      ))}
    </dl>
      {domain[0] > 0 && <p className="text-xs text-slate pt-2">Bar axis starts at {f(domain[0])}</p>}
    </div>
  );
}

/* Two metrics per row. */
export function GroupedBars({ rows, metrics, domain, format }) {
  const f = fmt[format];
  return (
    <div>
      <ul className="flex flex-wrap gap-x-5 gap-y-1.5 mb-3 text-sm text-slate">
        {metrics.map((mt) => (
          <li key={mt.key} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: mt.color }} />
            {mt.name}
          </li>
        ))}
      </ul>
      <dl className="space-y-3">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[minmax(0,9rem)_1fr] sm:grid-cols-[minmax(0,12rem)_1fr] items-center gap-3">
            <dt className="text-sm leading-tight text-slate">{r.label}</dt>
            <dd className="space-y-1">
              {metrics.map((mt) => (
                <div key={mt.key} className="flex items-center gap-2">
                  <span className="h-3.5 rounded-r-sm" style={{ width: `${scale(r[mt.key], domain)}%`, minWidth: 3, background: mt.color }} />
                  <span className="text-xs">{f(r[mt.key])}</span>
                </div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      {domain[0] > 0 && <p className="text-xs text-slate pt-2">Bar axis starts at {f(domain[0])}</p>}
    </div>
  );
}

/* Confusion matrix: rows are the truth, columns the prediction. */
export function ConfusionMatrix({ labels, matrix }) {
  const max = Math.max(...matrix.flat());
  const total = matrix.flat().reduce((a, b) => a + b, 0);
  return (
    <div className="max-w-md">
      <p className="text-sm text-slate mb-2 pl-[6.5rem] text-center">Predicted</p>
      <div className="grid grid-cols-[6rem_1fr_1fr] gap-1.5">
        <span />
        {labels.map((l) => (
          <span key={l} className="text-sm text-center text-slate pb-1">{l}</span>
        ))}
        {matrix.map((row, i) => (
          <Row key={i} label={labels[i]} row={row} i={i} max={max} total={total} first={i === 0} />
        ))}
      </div>
    </div>
  );
}

function Row({ label, row, i, max, total, first }) {
  return (
    <>
      <span className="text-sm text-slate flex items-center justify-end pr-2 text-right leading-tight">
        {first && <span className="sr-only">Actual: </span>}
        {label}
      </span>
      {row.map((v, j) => {
        const correct = i === j;
        const t = 0.15 + 0.85 * Math.sqrt(v / max);
        return (
          <div
            key={j}
            className="aspect-[4/3] rounded-md flex flex-col items-center justify-center"
            style={{ background: correct ? `rgb(109 91 208 / ${t})` : '#FBE9EF', color: correct && t > 0.5 ? '#fff' : '#14213D' }}
          >
            <span className="text-2xl font-semibold">{v.toLocaleString('en-US')}</span>
            <span className="text-xs opacity-80">{((v / total) * 100).toFixed(1)}%</span>
          </div>
        );
      })}
    </>
  );
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm tabular border-collapse">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={`py-2 px-2 font-medium text-slate border-b border-rule ${i ? 'text-right' : 'text-left'}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) =>
                i === 0 ? (
                  <th key={i} scope="row" className="py-2.5 px-2 text-left font-semibold border-b border-rule">{c}</th>
                ) : (
                  <td key={i} className="py-2.5 px-2 text-right border-b border-rule">{c}</td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Chart(props) {
  switch (props.type) {
    case 'line':
      return <LineChart {...props} />;
    case 'bars':
      return <BarChart {...props} />;
    case 'grouped':
      return <GroupedBars {...props} />;
    case 'confusion':
      return <ConfusionMatrix {...props} />;
    case 'table':
      return <DataTable {...props} />;
    default:
      return null;
  }
}
