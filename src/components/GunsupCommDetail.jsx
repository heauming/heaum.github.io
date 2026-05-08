import { useState, useEffect, Fragment } from 'react';

const GUNSUP_NODES = [
  {
    id: "dev",
    n: "01",
    label: "개발",
    org: "VKE Entertainment",
    bullets: ["미국 시애틀 위치", "Sony 산하 스튜디오", "건즈업 IP"],
    size: 168,
    angle: -150,
    radius: 320,
    summary: {
      role: "프로젝트 리드",
      timeline: "2024.06 — 2024.12",
      task: "버그 및 업데이트 스펙 논의, 라이브 옵스 일정 조율, BM 기획",
      points: [
        "해외 개발사 협업 시 시차로 인한 패치 직후 대응이 어렵기에 점검 QA 세션 중 확인이 중요",
        "잦은 연휴와 서양식 Work Ethic으로 인하여 스펙이 지연될 가능성이 높아, 개발 현황에 대한 지속적인 팔로업 및 조건부 마일스톤 설정 필요",
        "데이터 기반의 근거 제시를 통한 감각적(철학적)인 개발 방향성 설득",
      ],
    },
  },
  {
    id: "marketing",
    n: "02",
    label: "마케팅",
    org: "게임미디어콘텐츠팀",
    orgSub: "(내부조직)",
    bullets: ["마케팅 에셋 제작", "크리에이터 컨택"],
    size: 180,
    angle: -42,
    radius: 330,
    summary: {
      role: "마케팅 대응 사업 PM",
      timeline: "2022.10 — 2023.10",
      task: "크리에이티브 마케팅 방향성 제안, 에셋 촬영 및 검수",
      result: [
        {
          text: "자체 유튜브 콘텐츠",
          link: "https://www.youtube.com/watch?v=834nmqf6QQk",
          tail: " 조회수 1만 ~ 3만 사이 달성",
        },
        {
          text: "인플루언서 ",
          links: [
            { text: "팍플레이", url: "https://www.youtube.com/watch?v=5abp366crM8" },
            { text: "판자집 강아지", url: "https://www.youtube.com/watch?v=rxkfM4Mjf2Y" },
          ],
          tail: " 와 협업 — 각각 조회수 80만, 28만 기록",
        },
      ],
      points: [
        "인플루언서 마케팅은 다소 비용이 발생하더라도 타겟군을 잘 선정하고 적절한 콘텐츠 설계 시 효과적인 마케팅 수단",
      ],
    },
  },
  {
    id: "exec",
    n: "03",
    label: "경영진",
    org: "사내 고위 임원",
    bullets: [],
    size: 150,
    angle: 50,
    radius: 305,
    summary: {
      role: "리드 사업 PM",
      timeline: "2024.06 — 2024.12",
      task: "성과 보고 및 인력 운영 계획, KPI 설정",
      points: [
        "KPI 설정 시 타겟 액션 아이템 제시 필요",
        "마케팅, 패치 등 주요 액션에 대하여 적절한 간격으로 성과를 빠르게 보고하는 것이 핵심",
      ],
    },
  },
  {
    id: "finance",
    n: "04",
    label: "회계",
    org: "내부 감사 / Sony 회계",
    bullets: ["내부 감사 및 회계 조직", "Sony 측 회계 조직"],
    size: 140,
    angle: 130,
    radius: 290,
    summary: {
      role: "리드 사업 PM",
      timeline: "2024.06 — 2024.12",
      task: "소니 측 매출 증빙 자료 기반의 R/S 회계 처리, 내부 회계 감사 대응",
    },
  },
  {
    id: "qa",
    n: "05",
    label: "QA",
    org: "내부 QA 조직",
    bullets: [],
    size: 158,
    angle: -95,
    radius: 295,
    summary: {
      role: "CS 대응 사업 PM, QA 일정 조율",
      timeline: "2022.10 — 2024.12",
      task: "버그에 대한 CS 점검 요청 및 확인, 점검 및 업데이트 전 QA 필요 시간에 대한 일정 조율",
    },
  },
];

// Canvas size
const GS_W = 1040;
const GS_H = 740;
const GS_CX = GS_W / 2;
const GS_CY = GS_H / 2;
const CENTER_SIZE = 230;

function polar(angleDeg, radius) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: GS_CX + Math.cos(a) * radius, y: GS_CY + Math.sin(a) * radius };
}

// Subtle curved connector from center edge to node edge
function curvedPath(angleDeg, radius, nodeSize) {
  const a = (angleDeg * Math.PI) / 180;
  const startR = CENTER_SIZE / 2 + 2;
  const endR = radius - nodeSize / 2 - 2;
  const sx = GS_CX + Math.cos(a) * startR;
  const sy = GS_CY + Math.sin(a) * startR;
  const ex = GS_CX + Math.cos(a) * endR;
  const ey = GS_CY + Math.sin(a) * endR;

  const px = -Math.sin(a);
  const py = Math.cos(a);
  const len = Math.hypot(ex - sx, ey - sy);
  const amp = Math.min(14, len * 0.06);

  const cx = (sx + ex) / 2 + px * amp;
  const cy = (sy + ey) / 2 + py * amp;

  return `M ${sx} ${sy} Q ${cx} ${cy}, ${ex} ${ey}`;
}

function GunsupSummaryRich({ summary }) {
  if (!summary) return null;
  return (
    <div className="modal-body gs-summary">
      <dl className="gs-meta">
        <div><dt>My Role</dt><dd>{summary.role}</dd></div>
        <div><dt>Timeline</dt><dd>{summary.timeline}</dd></div>
        <div><dt>주요 업무</dt><dd>{summary.task}</dd></div>
      </dl>

      {summary.result && (
        <div className="gs-result">
          <div className="gs-section-label">결과물</div>
          <ul>
            {summary.result.map((r, i) => (
              <li key={i}>
                {r.link && (
                  <>
                    <a href={r.link} target="_blank" rel="noreferrer">{r.text}</a>
                    {r.tail}
                  </>
                )}
                {r.links && (
                  <>
                    {r.text}
                    {r.links.map((l, j) => (
                      <Fragment key={j}>
                        <a href={l.url} target="_blank" rel="noreferrer">{l.text}</a>
                        {j < r.links.length - 1 && ", "}
                      </Fragment>
                    ))}
                    {r.tail}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {summary.points && summary.points.length > 0 && (
        <div className="gs-points">
          <div className="gs-section-label">Point</div>
          <ul>
            {summary.points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export function GunsupCommDetail({ onBack }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <div className="wd-wrap">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: 24 }}>← Work로 돌아가기</button>

      <header className="wd-header">
        <h1 className="wd-title">건즈업 사업 PM</h1>
        <div className="wd-subtitle">다양한 조직과의 커뮤니케이션 경험</div>
      </header>

      <div className="gs-intro">
        <p>
          건즈업 모바일 라이브 서비스를 진행하며 개발, 마케팅, 경영진, 회계, QA 등
          서로 다른 직군과 지속적으로 협업해 왔습니다. 각 노드를 클릭하면 해당
          조직과의 커뮤니케이션 요약을 확인할 수 있습니다.
        </p>
      </div>

      <div className="gs-mindmap-wrap">
        {/* index legend */}
        <ul className="gs-index">
          {GUNSUP_NODES.map((node) => (
            <li
              key={node.id}
              className={node.summary ? "is-clickable" : ""}
              onClick={() => node.summary && setActive(node)}
            >
              <span className="gs-index-num">{node.n}</span>
              <span className="gs-index-label">{node.label}</span>
              <span className="gs-index-org">{node.org}</span>
            </li>
          ))}
        </ul>

        <svg
          className="gs-mindmap"
          viewBox={`0 -50 ${GS_W} ${GS_H + 50}`}
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <filter id="gsSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
              <feOffset dx="1" dy="4" result="offsetblur" />
              <feComponentTransfer><feFuncA type="linear" slope="0.14" /></feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* connecting lines */}
          {GUNSUP_NODES.map((node) => (
            <path
              key={`line-${node.id}`}
              d={curvedPath(node.angle, node.radius, node.size)}
              fill="none"
              stroke="#1d1d1f"
              strokeOpacity="0.55"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          ))}

          {/* atmospheric dots */}
          <g opacity="0.18">
            {[
              [GS_CX - 420, GS_CY - 280, 2.2],
              [GS_CX + 410, GS_CY + 270, 2.6],
              [GS_CX + 460, GS_CY - 300, 1.6],
              [GS_CX - 460, GS_CY + 290, 2.0],
              [GS_CX - 60, GS_CY - 340, 1.4],
              [GS_CX + 80, GS_CY + 330, 1.8],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#0066cc" />
            ))}
          </g>

          {/* center node — flat fill matching DS */}
          <g filter="url(#gsSoftShadow)">
            <circle cx={GS_CX} cy={GS_CY} r={CENTER_SIZE / 2} fill="#0066cc" />
            <circle cx={GS_CX} cy={GS_CY} r={CENTER_SIZE / 2 - 7}
                    fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          </g>
          <g pointerEvents="none">
            <text x={GS_CX} y={GS_CY - 22} textAnchor="middle"
                  fontFamily="Pretendard, sans-serif" fontSize="11"
                  fill="rgba(255,255,255,0.78)" letterSpacing="2.4"
                  fontWeight="600">
              CENTER
            </text>
            <text x={GS_CX} y={GS_CY + 10} textAnchor="middle"
                  fontFamily="Pretendard, sans-serif" fontSize="32"
                  fontWeight="700" fill="#fff" letterSpacing="-0.6">
              사업 PM
            </text>
            <text x={GS_CX} y={GS_CY + 36} textAnchor="middle"
                  fontFamily="Pretendard, sans-serif" fontSize="12"
                  fill="rgba(255,255,255,0.82)" letterSpacing="-0.1">
              라이브옵스 운영 · 일정 조율
            </text>
            <text x={GS_CX} y={GS_CY + 54} textAnchor="middle"
                  fontFamily="Pretendard, sans-serif" fontSize="12"
                  fill="rgba(255,255,255,0.82)" letterSpacing="-0.1">
              게임 방향성 설립
            </text>
          </g>

          {/* satellite nodes — filled blue with white type, like reference */}
          {GUNSUP_NODES.map((node) => {
            const { x, y } = polar(node.angle, node.radius);
            const r = node.size / 2;
            const hasSummary = !!node.summary;
            // numeral scales with radius
            const numSize = Math.max(28, r * 0.42);
            const labelSize = Math.max(15, r * 0.18);
            return (
              <g
                key={node.id}
                className={"gs-node" + (hasSummary ? " is-clickable" : "")}
                onClick={() => hasSummary && setActive(node)}
                style={{ cursor: hasSummary ? "pointer" : "default" }}
              >
                <g filter="url(#gsSoftShadow)">
                  <circle cx={x} cy={y} r={r} fill="#0066cc" />
                  <circle cx={x} cy={y} r={r - 6}
                          fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
                </g>
                {/* big numeral */}
                <text x={x} y={y - r * 0.18} textAnchor="middle"
                      fontFamily="Pretendard, sans-serif" fontSize={numSize}
                      fontWeight="700" fill="#fff" letterSpacing="-1">
                  {node.n}
                </text>
                {/* label */}
                <text x={x} y={y + r * 0.18} textAnchor="middle"
                      fontFamily="Pretendard, sans-serif" fontSize={labelSize}
                      fontWeight="600" fill="#fff" letterSpacing="-0.3">
                  {node.label}
                </text>
                {/* org caption */}
                <text x={x} y={y + r * 0.42} textAnchor="middle"
                      fontFamily="Pretendard, sans-serif" fontSize="11"
                      fill="rgba(255,255,255,0.82)" letterSpacing="-0.1">
                  {node.org}
                </text>
                {hasSummary && (
                  <g pointerEvents="none">
                    <rect x={x - 26} y={y + r - 22} width="52" height="18" rx="9"
                          fill="rgba(255,255,255,0.18)" />
                    <text x={x} y={y + r - 9} textAnchor="middle"
                          fontFamily="Pretendard, sans-serif" fontSize="10"
                          fontWeight="600" fill="#fff" letterSpacing="0.6">
                      VIEW
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <div className="gs-legend">
          <span className="gs-legend-dot" /> 클릭하여 상세 요약 보기
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal gs-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="modal-eyebrow">{active.n} · {active.label}</div>
            <h3 className="modal-title">{active.org}{active.orgSub ? ` ${active.orgSub}` : ""}</h3>
            <GunsupSummaryRich summary={active.summary} />
          </div>
        </div>
      )}
    </div>
  );
}
