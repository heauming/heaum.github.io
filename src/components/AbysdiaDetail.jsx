import { useRef } from 'react';

/* ---------------------------------------------------------------------
 * Heatmap visualization — inspired by Excel conditional-formatting view
 * Rows = dates, columns = early-game stage codes (10101..10405).
 * - Yellow band = global launch window (where churn-skew appeared).
 * - Cell color = relative position vs column mean: blue (high) → red (low).
 * Numbers below are illustrative reconstructions of the analysis form
 * (not real KPI values), used only to convey the visual pattern.
 * ------------------------------------------------------------------- */

const ABY_STAGES = [
  "10101", "10102", "10103", "10104", "10105",
  "10201", "10202", "10203", "10204", "10205",
  "10301", "10302", "10303", "10304", "10305",
  "10401", "10402", "10403", "10404", "10405",
];

// Includes a "TOTAL" column (전체 이탈률) before stages 10101..10405.
// Pre-launch (rows 0..16): prologue (10101) churn shows steady mid-range share.
// Post-launch (rows 17..23, yellow band): TOTAL ↑ AND prologue 10101 jumps
// dramatically — this is the "쏠림" the analysis surfaces.
const ABY_ROWS = [
  // pre-launch — prologue share oscillates 9~13%, total around 22~28%
  { date: "20260225", total: 25.20, vals: [10.63,  2.64, 8.84, 3.31, 4.94, 2.48, 1.13, 1.29, 0.34, 1.40, 1.86, 0.62, 0.23, 1.29, 0.67, 0.34, 0.37, 0.18, 0.00, 0.60] },
  { date: "20260226", total: 28.96, vals: [10.54,  2.89, 9.21, 5.15, 5.15, 2.28, 1.31, 1.22, 0.53, 2.14, 1.40, 0.53, 1.17, 1.17, 0.50, 0.41, 0.22, 0.13, 0.13, 1.11] },
  { date: "20260227", total: 31.74, vals: [11.50,  1.98, 8.39, 3.94, 5.71, 2.55, 1.56, 1.21, 0.67, 1.63, 2.04, 1.02, 0.38, 1.56, 1.56, 0.61, 0.45, 0.22, 0.13, 0.22] },
  { date: "20260228", total: 32.27, vals: [10.54,  2.01, 8.43, 3.45, 5.85, 2.78, 1.83, 1.23, 0.37, 1.34, 2.68, 0.73, 0.52, 1.25, 1.25, 1.10, 0.37, 0.27, 0.43, 0.68] },
  { date: "20260301", total: 29.05, vals: [10.78,  2.59, 8.62, 2.50, 5.28, 2.16, 1.45, 1.67, 0.60, 1.40, 2.28, 0.45, 0.32, 1.22, 1.42, 1.42, 0.50, 0.00, 0.29, 0.50] },
  { date: "20260302", total: 28.10, vals: [10.76,  3.02, 8.21, 3.91, 5.38, 1.74, 1.74, 1.00, 0.50, 1.51, 3.02, 0.50, 0.50, 1.70, 0.66, 1.05, 0.36, 0.30, 0.21, 1.41] },
  { date: "20260303", total: 27.72, vals: [ 9.74,  2.76, 8.61, 3.02, 6.59, 1.88, 1.41, 1.88, 0.60, 1.01, 2.76, 0.50, 0.50, 1.48, 1.07, 1.08, 0.34, 0.34, 0.00, 1.55] },
  { date: "20260304", total: 28.39, vals: [12.88,  3.18, 7.21, 3.88, 5.66, 3.66, 2.40, 2.09, 0.70, 2.02, 1.86, 0.54, 0.16, 1.24, 1.61, 0.74, 0.47, 0.08, 0.23, 0.23] },
  { date: "20260305", total: 23.08, vals: [10.73,  4.55, 7.29, 2.93, 3.68, 3.68, 2.38, 1.52, 1.52, 2.71, 1.66, 0.76, 0.76, 1.19, 2.28, 0.50, 0.98, 0.50, 0.32, 0.60] },
  { date: "20260306", total: 22.63, vals: [10.13,  2.48, 7.66, 3.66, 4.39, 3.34, 2.16, 3.56, 0.86, 1.49, 1.94, 0.76, 0.69, 1.27, 2.05, 0.62, 0.75, 0.43, 0.00, 0.50] },
  { date: "20260307", total: 22.92, vals: [10.22,  2.22, 7.41, 3.71, 7.45, 1.81, 1.81, 0.78, 1.43, 2.31, 1.27, 0.70, 0.57, 1.00, 1.00, 0.57, 0.50, 0.10, 0.10, 0.86] },
  { date: "20260308", total: 21.49, vals: [12.04,  2.69, 7.33, 3.58, 6.97, 1.82, 3.18, 0.90, 1.00, 2.39, 2.30, 1.00, 0.60, 1.00, 0.60, 0.60, 0.50, 0.00, 0.00, 0.50] },
  { date: "20260309", total: 22.92, vals: [12.49,  2.93, 7.55, 3.42, 6.76, 2.72, 1.16, 2.22, 0.39, 1.41, 1.93, 0.70, 0.60, 1.30, 1.74, 0.70, 0.55, 0.19, 0.00, 1.35] },
  { date: "20260310", total: 30.51, vals: [11.76,  2.02, 7.69, 4.78, 5.15, 4.04, 1.55, 1.10, 0.92, 3.49, 1.70, 0.50, 0.37, 1.00, 0.37, 1.24, 0.55, 0.00, 0.00, 0.55] },
  { date: "20260311", total: 28.32, vals: [10.81,  2.61, 7.20, 4.92, 8.50, 1.09, 0.90, 0.44, 0.50, 1.09, 2.18, 0.50, 0.77, 1.74, 0.66, 1.09, 0.55, 0.00, 0.00, 0.44] },
  { date: "20260312", total: 31.65, vals: [12.61,  2.52, 7.21, 3.31, 8.40, 3.92, 1.12, 2.44, 1.04, 2.52, 2.31, 0.43, 0.56, 0.91, 2.18, 0.43, 0.43, 0.28, 0.00, 0.43] },
  { date: "20260313", total: 32.26, vals: [12.61,  2.52, 7.20, 4.78, 3.07, 3.08, 1.12, 0.84, 0.43, 1.72, 1.72, 0.56, 0.56, 0.91, 1.68, 0.30, 0.22, 0.22, 0.00, 0.43] },
  // ── 2026.03.17 ─ Global Launch ─ yellow band starts ──
  // post-launch — TOTAL spikes (35~47%) AND prologue (10101) shows extreme rise (28~47%)
  { date: "20260317", launch: true, total: 36.29, vals: [28.45,  3.09, 7.78, 1.93, 6.18, 1.93, 1.16, 1.55, 1.16, 0.39, 0.39, 0.39, 0.00, 2.32, 0.77, 0.39, 1.16, 0.00, 0.00, 0.39] },
  { date: "20260318", launch: true, total: 33.07, vals: [25.53,  4.53, 8.07, 5.07, 9.60, 3.20, 1.07, 0.53, 0.80, 1.87, 1.07, 0.53, 0.00, 1.33, 2.13, 0.27, 0.80, 0.00, 0.00, 0.27] },
  { date: "20260319", launch: true, total: 43.93, vals: [40.94,  1.64, 8.30, 2.80, 3.97, 1.17, 1.40, 1.17, 1.87, 1.64, 1.17, 0.82, 1.64, 2.57, 0.70, 0.00, 0.47, 0.23, 0.23, 0.47] },
  { date: "20260320", launch: true, total: 42.12, vals: [38.06,  2.42, 8.30, 4.55, 5.76, 1.21, 1.21, 0.91, 0.61, 1.52, 1.21, 0.61, 0.30, 1.67, 1.36, 0.30, 1.21, 0.00, 0.45, 0.45] },
  { date: "20260321", launch: true, total: 42.27, vals: [42.27,  2.42, 8.74, 3.41, 8.01, 2.43, 1.06, 1.51, 0.19, 1.86, 1.86, 0.50, 0.00, 1.40, 0.74, 0.74, 1.40, 0.00, 0.00, 0.45] },
  { date: "20260322", launch: true, total: 43.88, vals: [44.15,  2.17, 8.67, 3.57, 6.20, 2.33, 2.33, 1.16, 0.16, 1.86, 1.55, 0.31, 0.00, 1.66, 0.41, 0.00, 0.51, 0.31, 0.00, 0.51] },
  { date: "20260323", launch: true, total: 47.34, vals: [47.52,  1.57, 8.24, 2.82, 3.45, 2.19, 2.59, 0.63, 0.31, 2.51, 1.97, 0.47, 0.00, 1.68, 1.31, 0.00, 0.94, 0.00, 0.00, 0.47] },
];

// Coloring: per-column min/max, mapped to red(low) → white(mid) → blue(high)
// using Excel's 3-color conditional formatting curve. Stronger saturation on
// the extremes so the prologue spike in the launch band is unmistakable.
function abyComputeColors() {
  const cols = ABY_STAGES.length;
  const rows = ABY_ROWS.length;

  const stats = [];
  for (let c = 0; c < cols; c++) {
    const arr = ABY_ROWS.map((r) => r.vals[c]);
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const sum = arr.reduce((s, v) => s + v, 0);
    const mid = sum / rows; // mean as midpoint
    stats.push({ min, max, mid });
  }
  function tint(v, { min, max, mid }) {
    if (max === min) return "#ffffff";
    let t;
    if (v >= mid) {
      t = (v - mid) / (max - mid || 1); // 0..1 → blue
      // strong cobalt blue at peak (matches Excel default 3-color)
      const r = Math.round(255 - t * 167);
      const g = Math.round(255 - t * 116);
      const b = Math.round(255 - t * 51);
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      t = (mid - v) / (mid - min || 1); // 0..1 → red
      const r = Math.round(255 - t * 7);
      const g = Math.round(255 - t * 145);
      const b = Math.round(255 - t * 138);
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  function fgFor(v, { min, max, mid }) {
    if (max === min) return "#1d1d1f";
    if (v >= mid) {
      const t = (v - mid) / (max - mid || 1);
      return t > 0.62 ? "#ffffff" : "#1d1d1f";
    } else {
      const t = (mid - v) / (mid - min || 1);
      return t > 0.7 ? "#ffffff" : "#1d1d1f";
    }
  }

  const matrix = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      const v = ABY_ROWS[r].vals[c];
      row.push({ bg: tint(v, stats[c]), fg: fgFor(v, stats[c]) });
    }
    matrix.push(row);
  }
  return matrix;
}

const ABY_COLOR_MATRIX = abyComputeColors();

function AbysdiaHeatmap() {
  const launchIdx = ABY_ROWS.findIndex((r) => r.launch);

  return (
    <div className="aby-heatmap">
      <div className="aby-heatmap-head">
        <div className="aby-hm-corner">
          <span className="aby-hm-corner-row">D±N</span>
          <span className="aby-hm-corner-sep">/</span>
          <span className="aby-hm-corner-col">STAGE</span>
        </div>
        <div className="aby-hm-cols">
          {ABY_STAGES.map((s) => (
            <div key={s} className="aby-hm-col">{s}</div>
          ))}
        </div>
      </div>
      <div className="aby-hm-body">
        {ABY_ROWS.map((row, r) => {
          const isLaunchStart = r === launchIdx;
          return (
            <div
              key={row.label}
              className={`aby-hm-row${row.launch ? " is-launch" : ""}${isLaunchStart ? " is-launch-start" : ""}`}
            >
              <div className="aby-hm-rowlabel">
                {row.launch && <span className="aby-hm-band" aria-hidden="true" />}
                <span className="aby-hm-date">{row.label}</span>
              </div>
              <div className="aby-hm-cells">
                {row.vals.map((v, c) => (
                  <div
                    key={c}
                    className="aby-hm-cell"
                    style={{ background: ABY_COLOR_MATRIX[r][c].bg, color: ABY_COLOR_MATRIX[r][c].fg }}
                    title={`${ABY_STAGES[c]} · ${row.label} · ${v.toFixed(2)}%`}
                  >
                    {v.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="aby-hm-legend">
        <div className="aby-hm-legend-item">
          <span className="aby-hm-legend-band" />
          <span>글로벌 런칭 이후 구간 (쏠림 발생)</span>
        </div>
        <div className="aby-hm-legend-scale">
          <span className="aby-hm-legend-cap">열 기준</span>
          <span className="aby-hm-legend-low">낮음</span>
          <span className="aby-hm-legend-bar" />
          <span className="aby-hm-legend-high">높음</span>
        </div>
      </div>

      <div className="aby-hm-note">
        ※ 본 시각화는 실제 수치 공개가 어려워, 분석 시 사용한 조건부 서식 형식과 패턴을
        재구성한 예시입니다. 노란 띠는 글로벌 런칭 이후 구간이며, 각 셀은 해당 스테이지(열)
        기준의 상대값(파랑=높음 / 빨강=낮음)을 나타냅니다.
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------
 * Auxiliary visuals (background / goal / method / result) — same idiom
 * as SqlAutoDetail's case visuals, tuned to retention-drop narrative.
 * ------------------------------------------------------------------- */
function AbysdiaCaseVisual({ kind }) {
  if (kind === "background") {
    // D+1 retention dip after global launch — line w/ pre/post comparison.
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* axes */}
        <line x1="48" y1="180" x2="448" y2="180" stroke="#e0e0e0" strokeWidth="1" />
        <line x1="48" y1="40" x2="48" y2="180" stroke="#e0e0e0" strokeWidth="1" />
        {/* dotted band: global launch */}
        <rect x="248" y="40" width="200" height="140" fill="rgba(255,205,80,0.18)" />
        <line x1="248" y1="40" x2="248" y2="180" stroke="#e0a020" strokeDasharray="3 3" strokeWidth="1" />
        {/* baseline (pre) */}
        <path d="M58 90 L100 86 L142 92 L184 88 L226 90"
              stroke="#1d1d1f" strokeWidth="2" fill="none" />
        {/* dropped (post) */}
        <path d="M226 90 L268 122 L310 138 L352 134 L394 142 L436 140"
              stroke="#d04a3a" strokeWidth="2" fill="none" />
        {/* annotation */}
        <g transform="translate(330,60)">
          <rect x="-4" y="-16" width="116" height="22" rx="11" fill="#d04a3a" />
          <text x="54" y="-1" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fontWeight="600" fill="#fff" letterSpacing="0.3">
            D+1 리텐션 ↓
          </text>
        </g>
        {/* y-label */}
        <text x="58" y="60" fontFamily="ui-monospace, monospace" fontSize="10" fill="#7a7a7a">RETENTION</text>
        {/* x-label */}
        <text x="244" y="202" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">
          일본 런칭 ─────── 글로벌 런칭 →
        </text>
      </svg>
    );
  }

  if (kind === "goal") {
    // 우선 개선 포인트 의사결정 (분류 → 우선순위)
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* candidates */}
        <g>
          <rect x="28" y="52" width="120" height="32" rx="7" fill="#fff" stroke="#e0e0e0" />
          <text x="88" y="72" textAnchor="middle" fontFamily="Pretendard, sans-serif" fontSize="12" fill="#1d1d1f">프롤로그 시각</text>
          <rect x="28" y="94" width="120" height="32" rx="7" fill="#fff" stroke="#e0e0e0" />
          <text x="88" y="114" textAnchor="middle" fontFamily="Pretendard, sans-serif" fontSize="12" fill="#1d1d1f">튜토리얼 흐름</text>
          <rect x="28" y="136" width="120" height="32" rx="7" fill="#fff" stroke="#e0e0e0" />
          <text x="88" y="156" textAnchor="middle" fontFamily="Pretendard, sans-serif" fontSize="12" fill="#7a7a7a">전투 난이도</text>
        </g>
        {/* arrow → filter */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M156 110 L196 110" />
          <path d="M190 105 L196 110 L190 115" />
        </g>
        {/* filter (data) */}
        <g>
          <rect x="200" y="74" width="84" height="72" rx="11" fill="#1d1d1f" />
          <text x="242" y="97" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="#9a9a9e" letterSpacing="0.6">DATA</text>
          <text x="242" y="118" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fontWeight="600" fill="#fff">이탈 추이</text>
          <text x="242" y="135" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fill="#cccccc">(보정 후)</text>
        </g>
        {/* arrow → priority */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M292 110 L332 110" />
          <path d="M326 105 L332 110 L326 115" />
        </g>
        {/* priority pick */}
        <g>
          <rect x="338" y="80" width="120" height="60" rx="11" fill="#0066cc" />
          <text x="398" y="103" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="rgba(255,255,255,0.85)" letterSpacing="0.8">PRIORITY 01</text>
          <text x="398" y="125" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="14" fontWeight="700" fill="#fff">프롤로그</text>
        </g>
        <text x="240" y="200" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">
          가설 후보군 → 데이터 검증 → 우선순위 선정
        </text>
      </svg>
    );
  }

  if (kind === "method") {
    // 리세마라 보정 방식
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* RAW */}
        <g>
          <rect x="20" y="40" width="180" height="142" rx="11" fill="#fff" stroke="#e0e0e0" />
          <text x="36" y="62" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#7a7a7a" letterSpacing="0.8">RAW</text>
          <text x="36" y="82" fontFamily="Pretendard, sans-serif" fontSize="14"
                fontWeight="600" fill="#1d1d1f">초기 이탈 데이터</text>
          {/* mock bar group with reroll spike */}
          <g>
            <rect x="36" y="106" width="22" height="60" rx="3" fill="rgba(0,102,204,0.35)" />
            <rect x="62" y="116" width="22" height="50" rx="3" fill="rgba(0,102,204,0.35)" />
            <rect x="88" y="100" width="22" height="66" rx="3" fill="rgba(208,74,58,0.85)" />
            <rect x="114" y="130" width="22" height="36" rx="3" fill="rgba(0,102,204,0.35)" />
            <rect x="140" y="138" width="22" height="28" rx="3" fill="rgba(0,102,204,0.35)" />
            <text x="99" y="96" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                  fontSize="10" fontWeight="600" fill="#a4382b">리세마라</text>
          </g>
        </g>
        {/* arrow */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M206 110 L242 110" />
          <path d="M236 105 L242 110 L236 115" />
        </g>
        <text x="224" y="98" textAnchor="middle" fontFamily="Pretendard, sans-serif"
              fontSize="10" fontWeight="600" fill="#0066cc">JP 비율 보정</text>
        {/* CLEAN */}
        <g>
          <rect x="248" y="40" width="212" height="142" rx="11" fill="#1d1d1f" />
          <text x="264" y="62" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#9a9a9e" letterSpacing="0.8">ADJUSTED</text>
          <text x="264" y="82" fontFamily="Pretendard, sans-serif" fontSize="14"
                fontWeight="600" fill="#fff">실제 플레이 인원 기준</text>
          <g>
            <rect x="264" y="106" width="22" height="60" rx="3" fill="rgba(41,151,255,0.45)" />
            <rect x="290" y="116" width="22" height="50" rx="3" fill="rgba(41,151,255,0.45)" />
            <rect x="316" y="124" width="22" height="42" rx="3" fill="rgba(41,151,255,0.7)" />
            <rect x="342" y="130" width="22" height="36" rx="3" fill="rgba(41,151,255,0.45)" />
            <rect x="368" y="138" width="22" height="28" rx="3" fill="rgba(41,151,255,0.45)" />
            <rect x="394" y="142" width="22" height="24" rx="3" fill="rgba(41,151,255,0.45)" />
            <rect x="420" y="148" width="22" height="18" rx="3" fill="rgba(41,151,255,0.45)" />
            <text x="327" y="100" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                  fontSize="10" fontWeight="600" fill="#2997ff">프롤로그 직후</text>
          </g>
        </g>
      </svg>
    );
  }

  if (kind === "result") {
    // 프롤로그 이탈 비율 변화 (런칭 전 vs 런칭 후)
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        <text x="240" y="36" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">프롤로그 구간 이탈 쏠림 (상대)</text>
        {/* before */}
        <g>
          <text x="120" y="64" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fontWeight="600" fill="#7a7a7a">BEFORE · 일본 런칭 시기</text>
          <rect x="60" y="82" width="120" height="14" rx="7" fill="rgba(0,0,0,0.08)" />
          <rect x="60" y="82" width="64" height="14" rx="7" fill="#1d1d1f" />
          <text x="184" y="93" fontFamily="Pretendard, sans-serif" fontSize="11" fontWeight="600" fill="#1d1d1f">기준</text>
        </g>
        {/* after */}
        <g>
          <text x="120" y="130" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fontWeight="600" fill="#0066cc">AFTER · 글로벌 런칭 이후</text>
          <rect x="60" y="148" width="120" height="14" rx="7" fill="rgba(0,102,204,0.12)" />
          <rect x="60" y="148" width="108" height="14" rx="7" fill="#0066cc" />
          <text x="184" y="159" fontFamily="Pretendard, sans-serif" fontSize="11" fontWeight="700" fill="#0066cc">쏠림 강화</text>
        </g>
        {/* takeaway */}
        <g transform="translate(280, 70)">
          <rect x="0" y="0" width="170" height="118" rx="11" fill="#fff" stroke="#e0e0e0" />
          <text x="14" y="22" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#7a7a7a" letterSpacing="0.8">PROPOSAL</text>
          <text x="14" y="44" fontFamily="Pretendard, sans-serif" fontSize="13"
                fontWeight="700" fill="#1d1d1f">시각적 품질 개선</text>
          <g fontFamily="Pretendard, sans-serif" fontSize="11" fill="#333">
            <circle cx="20" cy="64" r="2" fill="#0066cc" />
            <text x="30" y="67">등장인물 모델링</text>
            <circle cx="20" cy="84" r="2" fill="#0066cc" />
            <text x="30" y="87">프롤로그 이펙트</text>
            <circle cx="20" cy="104" r="2" fill="#0066cc" />
            <text x="30" y="107">PV 대비 인게임 격차</text>
          </g>
        </g>
      </svg>
    );
  }

  return null;
}

export function AbysdiaDetail({ onBack }) {
  const caseStudyRef = useRef(null);

  const scrollToCase = () => {
    if (caseStudyRef.current) {
      caseStudyRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="wd-wrap">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: 24 }}>← Work로 돌아가기</button>

      <header className="wd-header">
        <h1 className="wd-title">Abysdia 초기 리텐션 하락 원인 분석</h1>
        <div className="wd-subtitle">사업모델링파트</div>
      </header>

      <div className="wd-grid">
        <aside className="wd-side">
          <div className="wd-side-block">
            <div className="wd-side-label">MY ROLE</div>
            <ul className="wd-side-list">
              <li>데이터 분석가</li>
            </ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TOOLS</div>
            <ul className="wd-side-list">
              <li>MSSQL</li>
            </ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TIMELINE</div>
            <ul className="wd-side-list">
              <li>2026</li>
            </ul>
          </div>
        </aside>

        <section className="wd-main">
          <div className="wd-summary">
            <div className="wd-side-label">업무 요약</div>
            <p>
              글로벌 런칭 이후 어비스디아의 초기 리텐션 저하 원인을 구간별 이탈
              데이터로 분석하고, 프롤로그 구간을 핵심 개선 포인트로 도출해
              개발사에 시각적 품질 개선안을 제안.
            </p>
          </div>

          <div className="wd-detail">
            <div className="wd-side-label">상세 내용</div>
            <p>
              글로벌 런칭 이후 D+1 리텐션이 기존 대비 저조하게 나타나, 초기 유저
              이탈 원인 파악이 필요한 상황이었습니다.
            </p>
            <p style={{ marginTop: 14 }}>
              홍보 PV와 실제 인게임 퀄리티 간 괴리, 프롤로그 및 튜토리얼 구간의
              낮은 완성도가 극초반 이탈에 영향을 줄 것이라는 가설을 수립한 후,
              일본 런칭 당시 리세마라 비율을 기준으로 프롤로그 완료 직후 이탈
              데이터를 보정하여 데이터 왜곡을 방지하였습니다.
            </p>
            <p style={{ marginTop: 14 }}>
              보정된 데이터를 기반으로 일자별·초반 구간별 이탈 비율 변화를
              시각화, 글로벌 런칭 이후 프롤로그 구간에서 이탈 쏠림이 강화된
              것을 확인하였으며, 이를 근거로 시각적 품질 개선안을 우선 과제로
              사업팀과 개발사에 제안했습니다.
            </p>

            <button className="wd-example-btn cs-toggle" onClick={scrollToCase}>
              <span>CASE STUDY 보기</span>
              <span className="cs-toggle-arrow" aria-hidden="true">↓</span>
            </button>
          </div>
        </section>
      </div>

      {/* ============ CASE STUDY ============ */}
      <section className="cs-section" ref={caseStudyRef}>
        <div className="cs-divider" aria-hidden="true">
          <span className="cs-divider-line" />
          <span className="cs-divider-label">CASE STUDY</span>
          <span className="cs-divider-line" />
        </div>

        <header className="cs-header">
          <h2 className="cs-title">초기 이탈 구간의 데이터 기반 진단</h2>
          <p className="cs-lede">
            가설 → 데이터 보정 → 구간별 이탈 추이 시각화로 이어지는 흐름에서
            글로벌 런칭 이후 프롤로그 구간에 발생한 이탈 쏠림을 핵심 개선
            포인트로 도출한 과정.
          </p>
        </header>

        {/* 배경 */}
        <article className="cs-block">
          <div className="cs-block-num">01</div>
          <div className="cs-block-eyebrow">배경</div>
          <h3 className="cs-block-title">글로벌 런칭 이후 저조한 초기 리텐션 원인 파악</h3>
          <div className="cs-block-grid">
            <div className="cs-block-text">
              <p>
                어비스디아의 일본 선 런칭 후 6달 뒤 글로벌 런칭 경과 후 D+1
                리텐션이 평소 대비 저조한 지표를 보이는 현상에 대한 개발사 대응을
                신속하게 요청해야 하는 상황이었습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                상대적 고관여 유저가 유입되는 초기 구간을 제외하고, 일주일 이후
                유저들이 타 기간 대비 평균 약 5%pp 내외로 저조한 리텐션을 보여
                글로벌 유저에 맞춰 초기 구간에 대한 개선이 필요하다 판단하였습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <AbysdiaCaseVisual kind="background" />
              <div className="cs-visual-cap">글로벌 런칭 이후 D+1 리텐션 약 5%pp 저하</div>
            </div>
          </div>
        </article>

        {/* 목표 */}
        <article className="cs-block">
          <div className="cs-block-num">02</div>
          <div className="cs-block-eyebrow">목표</div>
          <h3 className="cs-block-title">제한된 리소스 속 최우선 개선 포인트 의사결정</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                초반 구간 어떤 부분이 가장 취약한 포인트인지 판별하여 사업
                팀에 전달한 후, 부족한 리소스 환경 속에서 실질적으로 제안 가능한
                개선 안을 전달하는 것 까지가 목표였습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <AbysdiaCaseVisual kind="goal" />
              <div className="cs-visual-cap">가설 후보 → 이탈 데이터 검증 → 우선순위 1순위 선정</div>
            </div>
          </div>
        </article>

        {/* 방식 */}
        <article className="cs-block">
          <div className="cs-block-num">03</div>
          <div className="cs-block-eyebrow">방식</div>
          <h3 className="cs-block-title">게임 경험을 기반으로 한 가설과 데이터를 통한 증명</h3>

          <div className="cs-block-grid">
            <div className="cs-block-text">
              <h4 className="cs-sub-title">경험적 가설 수립</h4>
              <p>
                그래픽 적으로 높은 수준을 요구하는 한국 및 글로벌 유저들의 특성 상
                홍보 PV와 실제 인게임 모델링 퀄리티 간의 괴리, 비교적 개발 초기에
                형성되어 다소 저조한 퀄리티를 보인 프롤로그 포함 튜토리얼 구간의
                영향으로 게임의 극초반 이탈이 빠르게 발생할 것이라 생각하였습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                이를 증명하기 위해, 글로벌 런칭 전/후의 초기 구간 별 이탈 데이터
                추이를 파악하여 두드러지는 변화가 발생한 곳을 핵심 구간으로
                설정하고자 하였습니다.
              </p>

              <h4 className="cs-sub-title" style={{ marginTop: 24 }}>리세마라로 인한 데이터 영향 조정</h4>
              <p>
                수집형 게임의 특성 상 게임 초반 리세마라 인원 비중이 높았기에,
                이들을 배제한 실제 플레이 인원에 대한 데이터 분석이 진행되어야
                하였습니다. 리세마라 후 이탈 지점이 프롤로그 완료 직후인 점을
                감안하여, 일전의 일본 런칭 시 리세마라 인원 비율을 토대로 해당
                구간 이탈 인원의 수를 보정하여 데이터 오염을 방지하였습니다.
              </p>

              <h4 className="cs-sub-title" style={{ marginTop: 24 }}>각 일의 구간 별 이탈 비율 변화 추이 파악</h4>
              <p>
                보정된 값을 기반으로, 단기 이탈 구간 파악을 위해 각 일 별 마지막
                접속 후 3일 이상 경과 시 이탈 인원으로 가정 후 각 일별 발생한
                이탈 인원 중 초반 각 구간 몇 %의 인원이 각각 해당 영역에서
                빠져나갔는지를 시각화 하였습니다. 이를 기반으로 글로벌 런칭 후
                타 기간 대비 쏠림 구간이 발생한 구간을 핵심 개선 구간으로 정의,
                개선안을 제안하기로 하였습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <AbysdiaCaseVisual kind="method" />
              <div className="cs-visual-cap">RAW(리세마라 포함) → JP 비율 기반 보정 데이터</div>
            </div>
          </div>

          {/* heatmap full-width */}
          <div className="aby-hm-wrap">
            <div className="aby-hm-title-row">
              <div>
                <div className="cs-block-eyebrow" style={{ marginBottom: 6 }}>VISUALIZATION</div>
                <h4 className="aby-hm-title">일자 × 초반 스테이지 — 이탈 비율 조건부 서식</h4>
              </div>
              <div className="aby-hm-axislabel">행: 글로벌 런칭 기준 D±N  ·  열: 초반 스테이지 코드</div>
            </div>
            <AbysdiaHeatmap />
          </div>
        </article>

        {/* 결과 */}
        <article className="cs-block">
          <div className="cs-block-num">04</div>
          <div className="cs-block-eyebrow">결과</div>
          <h3 className="cs-block-title">프롤로그 구간에 대한 개선안 제안</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                기존에도 프롤로그 구간의 이탈 비율이 비교적 높은 축에 속하였으나,
                글로벌 유저들이 해당 구간에 대하여 더 민감하게 반응하고 있다는
                사실을 확인하였습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                이를 토대로 이전부터 제시하였던 프롤로그 등장 인물 모델링 및
                이펙트 개선 등 시각적 이미지 개선안에 대한 어필을 할 수 있었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <AbysdiaCaseVisual kind="result" />
              <div className="cs-visual-cap">프롤로그 이탈 쏠림 → 시각 품질 개선안 우선 과제화</div>
            </div>
          </div>
        </article>

        {/* 의의 */}
        <article className="cs-block cs-block-final">
          <div className="cs-block-num">05</div>
          <div className="cs-block-eyebrow">의의</div>
          <h3 className="cs-block-title">경험적 직관과 데이터 간의 연관성</h3>
          <div className="cs-final-text">
            <p>
              사업의 관점에서 게임 플레이 도중 느껴지는 문제점과 같은 경험적인
              직관의 대부분은 데이터로 드러난다는 사실을 확인하는 경험이었습니다.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
