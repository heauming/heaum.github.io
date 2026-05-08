import { useRef } from 'react';

/* ---------------------------------------------------------------------
 * Stakeholder map — 5 organizations the modeling part negotiated with,
 * arranged around a center node. Re-uses the visual idiom of the
 * GunsupCommDetail mindmap but trimmed for inline use inside a case-study
 * block. Static (non-interactive) — the index legend below labels each.
 * ------------------------------------------------------------------- */
const MD_NODES = [
  { id: "biz",   n: "01", label: "사업",      org: "사업본부",          angle: -90,  radius: 200, size: 120, sub: "필요 지표 요청" },
  { id: "tpm",   n: "02", label: "기술 PM",   org: "DB 운영 책임",      angle: -22,  radius: 220, size: 116, sub: "DB 영향도 검토" },
  { id: "dev",   n: "03", label: "개발사",    org: "스튜디오 개발팀",   angle:  46,  radius: 230, size: 122, sub: "컬럼 추가 작업" },
  { id: "bi",    n: "04", label: "BI팀",      org: "DW 구축 담당",      angle: 116,  radius: 220, size: 124, sub: "쿼리·DW 구현" },
  { id: "biz2",  n: "05", label: "사업 (검수)", org: "지표 사용 측",     angle: -158, radius: 210, size: 110, sub: "절충안 합의" },
];

const MD_W = 980;
const MD_H = 620;
const MD_CX = MD_W / 2;
const MD_CY = MD_H / 2 + 14;
const MD_CENTER = 220;

function mdPolar(angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: MD_CX + Math.cos(a) * radius, y: MD_CY + Math.sin(a) * radius };
}
function mdCurvedPath(angleDeg, radius, nodeSize) {
  const a = (angleDeg * Math.PI) / 180;
  const startR = MD_CENTER / 2 + 2;
  const endR = radius - nodeSize / 2 - 2;
  const sx = MD_CX + Math.cos(a) * startR;
  const sy = MD_CY + Math.sin(a) * startR;
  const ex = MD_CX + Math.cos(a) * endR;
  const ey = MD_CY + Math.sin(a) * endR;
  const px = -Math.sin(a);
  const py = Math.cos(a);
  const len = Math.hypot(ex - sx, ey - sy);
  const amp = Math.min(14, len * 0.06);
  const cx = (sx + ex) / 2 + px * amp;
  const cy = (sy + ey) / 2 + py * amp;
  return `M ${sx} ${sy} Q ${cx} ${cy}, ${ex} ${ey}`;
}

function ModelingStakeholderMap() {
  return (
    <div className="md-stakeholder">
      <ul className="gs-index">
        {MD_NODES.map((node) => (
          <li key={node.id}>
            <span className="gs-index-num">{node.n}</span>
            <span className="gs-index-label">{node.label}</span>
            <span className="gs-index-org">{node.org}</span>
          </li>
        ))}
      </ul>

      <svg
        className="gs-mindmap"
        viewBox={`0 -30 ${MD_W} ${MD_H + 30}`}
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <defs>
          <filter id="mdSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
            <feOffset dx="1" dy="4" result="offsetblur" />
            <feComponentTransfer><feFuncA type="linear" slope="0.14" /></feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {MD_NODES.map((node) => (
          <path
            key={`l-${node.id}`}
            d={mdCurvedPath(node.angle, node.radius, node.size)}
            fill="none"
            stroke="#1d1d1f"
            strokeOpacity="0.5"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
        ))}

        <g opacity="0.18">
          {[
            [MD_CX - 380, MD_CY - 240, 2.0],
            [MD_CX + 380, MD_CY + 240, 2.4],
            [MD_CX + 420, MD_CY - 250, 1.6],
            [MD_CX - 420, MD_CY + 250, 1.8],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="#0066cc" />
          ))}
        </g>

        {/* Center: 모델링 파트 */}
        <g filter="url(#mdSoftShadow)">
          <circle cx={MD_CX} cy={MD_CY} r={MD_CENTER / 2} fill="#0066cc" />
          <circle cx={MD_CX} cy={MD_CY} r={MD_CENTER / 2 - 7}
                  fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        </g>
        <g pointerEvents="none">
          <text x={MD_CX} y={MD_CY - 22} textAnchor="middle"
                fontFamily="Pretendard, sans-serif" fontSize="11"
                fill="rgba(255,255,255,0.78)" letterSpacing="2.4" fontWeight="600">
            CENTER
          </text>
          <text x={MD_CX} y={MD_CY + 8} textAnchor="middle"
                fontFamily="Pretendard, sans-serif" fontSize="28"
                fontWeight="700" fill="#fff" letterSpacing="-0.6">
            모델링 파트
          </text>
          <text x={MD_CX} y={MD_CY + 32} textAnchor="middle"
                fontFamily="Pretendard, sans-serif" fontSize="12"
                fill="rgba(255,255,255,0.82)" letterSpacing="-0.1">
            지표 설계 · 협의 조율 · 쿼리 작성
          </text>
        </g>

        {/* Satellite nodes */}
        {MD_NODES.map((node) => {
          const { x, y } = mdPolar(node.angle, node.radius);
          const r = node.size / 2;
          const numSize = Math.max(24, r * 0.42);
          const labelSize = Math.max(13, r * 0.18);
          return (
            <g key={node.id}>
              <g filter="url(#mdSoftShadow)">
                <circle cx={x} cy={y} r={r} fill="#1d1d1f" />
                <circle cx={x} cy={y} r={r - 6}
                        fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
              </g>
              <text x={x} y={y - r * 0.18} textAnchor="middle"
                    fontFamily="Pretendard, sans-serif" fontSize={numSize}
                    fontWeight="700" fill="#fff" letterSpacing="-1">
                {node.n}
              </text>
              <text x={x} y={y + r * 0.18} textAnchor="middle"
                    fontFamily="Pretendard, sans-serif" fontSize={labelSize}
                    fontWeight="600" fill="#fff" letterSpacing="-0.3">
                {node.label}
              </text>
              <text x={x} y={y + r * 0.42} textAnchor="middle"
                    fontFamily="Pretendard, sans-serif" fontSize="10.5"
                    fill="rgba(255,255,255,0.78)" letterSpacing="-0.1">
                {node.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------------
 * Auxiliary visuals — same style as AbysdiaCaseVisual.
 * ------------------------------------------------------------------- */
function ModelingCaseVisual({ kind }) {
  if (kind === "background") {
    // Existing Tableau coverage vs missing metrics pre-launch.
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        <text x="32" y="38" fontFamily="ui-monospace, monospace" fontSize="10"
              fill="#7a7a7a" letterSpacing="0.8">PRE-LAUNCH METRIC COVERAGE</text>

        {/* row labels + bars */}
        {[
          { y: 60, label: "DAU / 매출 등 기본 지표", coverage: 0.92, ok: true },
          { y: 90, label: "유료 재화 흐름",          coverage: 0.32, ok: false },
          { y: 120, label: "콘텐츠 진행 현황",        coverage: 0.28, ok: false },
          { y: 150, label: "아레나 세부 지표 (티어 × 캐릭터)", coverage: 0.18, ok: false },
          { y: 180, label: "유저 레벨 × 이벤트",      coverage: 0.22, ok: false },
        ].map((r, i) => (
          <g key={i}>
            <text x={32} y={r.y + 4} fontFamily="Pretendard, sans-serif" fontSize="11"
                  fill={r.ok ? "#1d1d1f" : "#5a5a5e"}>{r.label}</text>
            <rect x={222} y={r.y - 7} width={210} height={11} rx="5.5" fill="rgba(0,0,0,0.06)" />
            <rect x={222} y={r.y - 7} width={210 * r.coverage} height={11} rx="5.5"
                  fill={r.ok ? "#1d1d1f" : "#d04a3a"} />
            <text x={440} y={r.y + 3} fontFamily="ui-monospace, monospace" fontSize="10"
                  fill={r.ok ? "#1d1d1f" : "#d04a3a"} fontWeight="600">
              {Math.round(r.coverage * 100)}%
            </text>
          </g>
        ))}

        <g transform="translate(32, 200)">
          <circle cx="4" cy="0" r="4" fill="#1d1d1f" />
          <text x="14" y="3" fontFamily="Pretendard, sans-serif" fontSize="10" fill="#7a7a7a">기 구축</text>
          <circle cx="84" cy="0" r="4" fill="#d04a3a" />
          <text x="94" y="3" fontFamily="Pretendard, sans-serif" fontSize="10" fill="#7a7a7a">컬럼/쿼리 부족</text>
        </g>
      </svg>
    );
  }

  if (kind === "goal") {
    // Pipeline: 지표 정의 → 컬럼 추가 → DW → Tableau
    const stages = [
      { x: 24,  label: "지표 정의",   sub: "Modeling × 사업" },
      { x: 132, label: "컬럼 추가",   sub: "기술 PM × 개발사" },
      { x: 240, label: "DW 생성",    sub: "BI팀" },
      { x: 348, label: "Tableau 시각화", sub: "Modeling × 사업" },
    ];
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        <text x="240" y="40" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="10"
              fill="#7a7a7a" letterSpacing="1">END-TO-END METRIC PIPELINE</text>

        {stages.map((s, i) => {
          const isLast = i === stages.length - 1;
          return (
            <g key={i}>
              <rect x={s.x} y="78" width="100" height="64" rx="11"
                    fill={isLast ? "#0066cc" : "#fff"}
                    stroke={isLast ? "#0066cc" : "#e0e0e0"} />
              <text x={s.x + 50} y="104" textAnchor="middle"
                    fontFamily="Pretendard, sans-serif" fontSize="13" fontWeight="700"
                    fill={isLast ? "#fff" : "#1d1d1f"}>{s.label}</text>
              <text x={s.x + 50} y="124" textAnchor="middle"
                    fontFamily="Pretendard, sans-serif" fontSize="10"
                    fill={isLast ? "rgba(255,255,255,0.85)" : "#7a7a7a"}>{s.sub}</text>
              {i < stages.length - 1 && (
                <g stroke="#0066cc" strokeWidth="1.5" fill="none">
                  <path d={`M${s.x + 102} 110 L${s.x + 128} 110`} />
                  <path d={`M${s.x + 122} 105 L${s.x + 128} 110 L${s.x + 122} 115`} />
                </g>
              )}
            </g>
          );
        })}

        <text x="240" y="180" textAnchor="middle" fontFamily="Pretendard, sans-serif"
              fontSize="11" fill="#5a5a5e">
          모델링이 각 단계의 허브로 협업 흐름을 조율
        </text>
      </svg>
    );
  }

  if (kind === "tradeoff") {
    // The cardinality / compromise example.
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="260" fill="#f5f5f7" />
        <text x="240" y="32" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">EXAMPLE · 절충안 도출</text>

        {/* Business request */}
        <g>
          <rect x="20" y="50" width="200" height="78" rx="10" fill="#fff" stroke="#e0e0e0" />
          <text x="36" y="72" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#7a7a7a" letterSpacing="0.6">사업 요청</text>
          <text x="36" y="92" fontFamily="Pretendard, sans-serif" fontSize="12"
                fontWeight="600" fill="#1d1d1f">아레나 점수대 티어 ×</text>
          <text x="36" y="108" fontFamily="Pretendard, sans-serif" fontSize="12"
                fontWeight="600" fill="#1d1d1f">캐릭터 별 승률</text>
          <text x="36" y="122" fontFamily="Pretendard, sans-serif" fontSize="10" fill="#5a5a5e">
            모든 조합을 세부 단위로 출력
          </text>
        </g>

        {/* BI concern */}
        <g>
          <rect x="260" y="50" width="200" height="78" rx="10" fill="#fff" stroke="#e0e0e0" />
          <text x="276" y="72" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#d04a3a" letterSpacing="0.6">BI 우려</text>
          <text x="276" y="92" fontFamily="Pretendard, sans-serif" fontSize="12"
                fontWeight="600" fill="#1d1d1f">행 1개가 4개로 분기</text>
          <text x="276" y="108" fontFamily="Pretendard, sans-serif" fontSize="12"
                fontWeight="600" fill="#1d1d1f">→ DW 과부하 발생</text>
          <text x="276" y="122" fontFamily="Pretendard, sans-serif" fontSize="10" fill="#5a5a5e">
            카디널리티 폭증, 유지·관리 부담
          </text>
        </g>

        {/* arrows down to consensus */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M120 132 L120 162" />
          <path d="M115 156 L120 162 L125 156" />
          <path d="M360 132 L360 162" />
          <path d="M355 156 L360 162 L365 156" />
        </g>

        {/* consensus */}
        <g>
          <rect x="60" y="172" width="360" height="68" rx="10" fill="#1d1d1f" />
          <text x="80" y="194" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#9a9a9e" letterSpacing="0.8">CONSENSUS · 모델링 조율</text>
          <text x="80" y="216" fontFamily="Pretendard, sans-serif" fontSize="13"
                fontWeight="700" fill="#fff">
            세부 레벨 → 점수 구간으로 그룹핑
          </text>
          <text x="80" y="232" fontFamily="Pretendard, sans-serif" fontSize="11"
                fill="rgba(255,255,255,0.78)">
            사업 분석 의도 유지 + DW 안정성 확보
          </text>
        </g>
      </svg>
    );
  }

  if (kind === "result") {
    // Before / After dashboard mocks.
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />

        {/* before */}
        <g>
          <text x="32" y="36" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#7a7a7a" letterSpacing="0.8">BEFORE</text>
          <rect x="20" y="46" width="200" height="148" rx="9" fill="#fff" stroke="#e0e0e0" />
          {/* sparse tiles */}
          {[[34,60],[110,60],[34,108],[110,108]].map(([x, y], i) => (
            <g key={i}>
              <rect x={x} y={y} width="68" height="36" rx="4" fill="rgba(0,0,0,0.06)" />
              <rect x={x + 6} y={y + 8} width="40" height="3" rx="1.5" fill="rgba(0,0,0,0.18)" />
              <rect x={x + 6} y={y + 18} width="56" height="9" rx="2" fill="rgba(0,0,0,0.22)" />
            </g>
          ))}
          <rect x={34} y={156} width="152" height="24" rx="4" fill="rgba(208,74,58,0.10)"
                stroke="rgba(208,74,58,0.45)" strokeDasharray="3 3" />
          <text x="110" y="172" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="10" fontWeight="600" fill="#a4382b">세부 지표 부재</text>
        </g>

        {/* after */}
        <g>
          <text x="272" y="36" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#0066cc" letterSpacing="0.8">AFTER</text>
          <rect x="260" y="46" width="200" height="148" rx="9" fill="#1d1d1f" />
          {/* dense tiles */}
          {[
            [274, 60, 0.6], [314, 60, 0.85], [354, 60, 0.4], [394, 60, 0.7],
            [274, 92, 0.5], [314, 92, 0.95], [354, 92, 0.65], [394, 92, 0.45],
            [274, 124, 0.7], [314, 124, 0.55], [354, 124, 0.8], [394, 124, 0.6],
          ].map(([x, y, t], i) => (
            <g key={i}>
              <rect x={x} y={y} width="32" height="22" rx="3" fill="rgba(255,255,255,0.06)" />
              <rect x={x + 3} y={y + 16 - 13 * t} width="26" height={13 * t} rx="1.5"
                    fill="#2997ff" opacity={0.55 + 0.45 * t} />
            </g>
          ))}
          {/* line panel */}
          <g transform="translate(272, 156)">
            <rect width="176" height="28" rx="4" fill="rgba(255,255,255,0.06)" />
            <polyline
              points="6,22 22,18 38,20 54,12 70,16 86,8 102,12 118,6 134,10 150,4 166,8"
              fill="none" stroke="#2997ff" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    );
  }

  return null;
}

export function ModelingDetail({ onBack }) {
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
        <h1 className="wd-title">사업모델링 파트 — 어비스디아 글로벌 런칭 지표 구축</h1>
        <div className="wd-subtitle">기술과 사업을 잇는 데이터 의사결정 환경 구축</div>
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
              <li>Tableau</li>
            </ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TIMELINE</div>
            <ul className="wd-side-list">
              <li>2025</li>
            </ul>
          </div>
        </aside>

        <section className="wd-main">
          <div className="wd-summary">
            <div className="wd-side-label">업무 요약</div>
            <p>
              어비스디아 글로벌 런칭 전 사업 필수 지표를 정의하고, DB 컬럼 추가
              · DW 구축 · 태블로 시각화까지 유관 부서와 협의하여 데이터 기반
              의사결정 환경을 마련했습니다.
            </p>
          </div>

          <div className="wd-detail">
            <div className="wd-side-label">상세 내용</div>
            <p>
              어비스디아 글로벌 런칭을 앞두고 기존 태블로 지표와 DB 컬럼만으로는
              사업에서 필요한 세부 지표를 확인하기 어려운 상황이었습니다. 이에
              모델링파트에서 필요한 지표 리스트를 우선 정리하고 사업 측 확인을
              거친 뒤, 각 지표의 중요도와 쿼리 구현 가능 여부를 검토했습니다.
            </p>
            <p style={{ marginTop: 14 }}>
              특히 유저 레벨, 아레나 세부 지표 등 일부 항목은 컬럼 추가 없이
              구현할 경우 쿼리 복잡도와 DW 유지·관리 부담이 커질 수 있어,
              BI팀·기술 PM·개발사와 협의해 안정적으로 구현 가능한 형태로
              조정했습니다.
            </p>
            <p style={{ marginTop: 14 }}>
              이후 필요한 컬럼 추가를 개발사에 요청하고, 업데이트된 컬럼을
              반영해 쿼리를 재작성한 뒤 BI팀에 DW 생성을 요청했습니다. 최종적으로
              DW 기반 태블로 지표를 구축하여 유료 재화 흐름, 콘텐츠 진행 현황,
              승률 등 세부 데이터를 시각화함으로써 사업 및 개발사가 데이터에
              근거해 의사결정할 수 있는 기반을 마련했습니다.
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
          <h2 className="cs-title">기술과 사업 사이, 5개 조직과의 지표 합의</h2>
          <p className="cs-lede">
            지표 정의 → 컬럼 추가 → DW 구축 → 태블로 시각화로 이어지는
            엔드 투 엔드 파이프라인을 모델링 파트가 허브가 되어 조율한 과정.
          </p>
        </header>

        {/* 배경 */}
        <article className="cs-block">
          <div className="cs-block-num">01</div>
          <div className="cs-block-eyebrow">배경</div>
          <h3 className="cs-block-title">필요한 지표의 부재에 따른 긴급 작업 요청</h3>
          <div className="cs-block-grid">
            <div className="cs-block-text">
              <p>
                어비스디아 글로벌 런칭 전 태블로 지표에 대한 개선이 필요한
                상황이었습니다. 전반적으로 지표 형성에 필요한 데이터가 들어
                있는 컬럼 또한 부족하였기에, 라이브 서비스 진행 과정 중 컬럼
                추가 작업을 위하여 기술 및 사업 PM, 개발사와 커뮤니케이션해야
                했습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                동시에 태블로 구축에 필요한 데이터 웨어하우스 작업을 담당하는
                Business Intelligence(BI)팀과의 커뮤니케이션 또한 병행되어야
                하는 멀티 트랙 구조였습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <ModelingCaseVisual kind="background" />
              <div className="cs-visual-cap">기존 태블로 — 사업 핵심 영역의 세부 지표 부재</div>
            </div>
          </div>
        </article>

        {/* 목표 */}
        <article className="cs-block">
          <div className="cs-block-num">02</div>
          <div className="cs-block-eyebrow">목표</div>
          <h3 className="cs-block-title">사업 필수 지표의 시각화까지 — 엔드 투 엔드 구축</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                글로벌 런칭 이전 사업에서 필요할 것이라 예상되는 지표들을 작성·
                공유한 뒤, 컬럼 추가 → DW 생성 → 태블로 시각화까지 일련의 과정을
                마무리하는 것이 목표였습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                각 단계의 책임 조직이 모두 다르기 때문에, 모델링 파트가 일정과
                요구사항의 허브가 되어 흐름을 끊김 없이 연결해야 했습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <ModelingCaseVisual kind="goal" />
              <div className="cs-visual-cap">지표 정의 → 컬럼 추가 → DW → 태블로</div>
            </div>
          </div>
        </article>

        {/* 방식 */}
        <article className="cs-block">
          <div className="cs-block-num">03</div>
          <div className="cs-block-eyebrow">방식</div>
          <h3 className="cs-block-title">지표 정의에서 시각화까지, 5개 조직과의 단계적 합의</h3>

          <div className="cs-block-text" style={{ maxWidth: "none" }}>
            <h4 className="cs-sub-title">기간 및 필요 지표 확인</h4>
            <p>
              지표가 완성되길 희망하는 기간과 종류를 파악하였습니다. 필요한
              지표 리스트는 모델링 파트에서 우선적으로 작성한 후 사업 측의
              확인을 받는 방식으로 진행되었습니다.
            </p>

            <h4 className="cs-sub-title" style={{ marginTop: 24 }}>중요도 구분 및 구현 가능 여부 확인</h4>
            <p>
              각 지표의 중요도를 구분한 후, 해당 지표들을 쿼리로 구현 가능할 수
              있는지 여부를 확인하였습니다. 대부분의 지표는 구현 가능하였으나
              특정 사건 관련 로그 발생 시 유저 레벨, 아레나 세부 지표 등은
              컬럼 추가가 없을 경우 쿼리 복잡도가 높아 BI팀의 DW 구현 시
              유지·관리에 어려움이 있을 것이라 판단되어, 추가적인 커뮤니케이션이
              필요하다 생각하였습니다.
            </p>
          </div>

          {/* Stakeholder map full-width */}
          <div className="md-stakeholder-wrap">
            <div className="aby-hm-title-row">
              <div>
                <div className="cs-block-eyebrow" style={{ marginBottom: 6 }}>STAKEHOLDER MAP</div>
                <h4 className="aby-hm-title">모델링 파트를 허브로 한 5개 조직 협의 구조</h4>
              </div>
              <div className="aby-hm-axislabel">각 조직의 역할 · 모델링 파트가 흐름을 조율</div>
            </div>
            <ModelingStakeholderMap />
          </div>

          <div className="cs-block-grid" style={{ marginTop: 32 }}>
            <div className="cs-block-text">
              <h4 className="cs-sub-title">기술적 구현 환경 문의 및 필요 지표 조정</h4>
              <p>
                BI팀과 협의하여 반드시 구현이 필요한 항목들 중 컬럼 추가가
                필요한 경우를 파악하고, 지표를 구성하는 축 중 세부 레벨과 같이
                카디널리티가 과도하게 발생하여 문제의 소지가 될 수 있는 부분은
                구간으로 나누는 등 사업과 함께 협의점을 도출하여 안정적으로
                구현할 수 있는 형태로 진행하였습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                사업의 세부적 출력 요구와 BI팀의 안전한 관리 요구 사이의 절충
                지점을 도출하는 과정이 가장 핵심이었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <ModelingCaseVisual kind="tradeoff" />
              <div className="cs-visual-cap">아레나 티어 × 캐릭터 승률 — 카디널리티 절충 사례</div>
            </div>
          </div>

          <div className="cs-block-text" style={{ maxWidth: "none", marginTop: 24 }}>
            <h4 className="cs-sub-title">기술 PM 및 개발사 공유</h4>
            <p>
              추가된 DB의 관리는 기술 PM이 진행하기에, 추가되는 컬럼이 DB에
              문제를 일으킬 여지가 없을지 확인을 받은 후 개발사에 필요한 컬럼
              추가를 요청하였으며, 개발 리소스를 침해 받지 않는 선에서 실행
              가능한 일자를 확인 받았습니다.
            </p>

            <h4 className="cs-sub-title" style={{ marginTop: 24 }}>쿼리 재작성 및 DW 생성 요청</h4>
            <p>
              컬럼 업데이트 이후, 추가된 컬럼을 포함하여 지표 구축에 필요한
              쿼리를 재작성한 뒤, 이를 토대로 BI팀에 DW 생성을 요청하였습니다.
            </p>

            <h4 className="cs-sub-title" style={{ marginTop: 24 }}>DW 기반 태블로 지표 형성</h4>
            <p>
              DW 완성 이후 태블로에 해당 내용을 기반으로 각 영역별 지표를
              작성하고, 사업과 협의하여 시각화 작업을 진행하였습니다.
            </p>
          </div>
        </article>

        {/* 결과 */}
        <article className="cs-block">
          <div className="cs-block-num">04</div>
          <div className="cs-block-eyebrow">결과</div>
          <h3 className="cs-block-title">데이터 기반 의사결정 환경의 확보</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                이전 대비 게임 내 세부 지표 — 유료 재화 흐름, 특정 콘텐츠 진행
                현황 및 승률 등 — 의 지표화가 가능해지면서, 사업 및 개발사
                입장에서 데이터를 토대로 근거 있는 의사결정을 내릴 수 있는
                환경이 마련되었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <ModelingCaseVisual kind="result" />
              <div className="cs-visual-cap">사업 핵심 영역에 대한 세부 지표 가시화</div>
            </div>
          </div>
        </article>

        {/* 의의 */}
        <article className="cs-block cs-block-final">
          <div className="cs-block-num">05</div>
          <div className="cs-block-eyebrow">의의</div>
          <h3 className="cs-block-title">지표를 고려한 사전 DB 구조 이해의 중요성</h3>
          <div className="cs-final-text">
            <p>
              필요한 지표를 구현하는 데 어려움을 유발한 가장 큰 원인은, DB의
              스키마 형태가 전적으로 개발 편의성 관점에서 제작되었다는 점이었습니다
              (예: 사업적으로 필요해 보이는 내용이 JSON 형태로 묶여 한 컬럼에
              출력). 불필요한 커뮤니케이션 비용을 줄이기 위해, 런칭 이전
              DB 스키마 구조 확립 단계에서 사업 측의 지표 이해도를 바탕으로
              한 사전 조정 작업의 중요성을 깨달았습니다.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
