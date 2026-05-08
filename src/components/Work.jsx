import { STRENGTHS } from '../data';

function StrengthVisual({ kind, dark }) {
  if (kind === "bars") {
    return (
      <div className="shape-stack" aria-hidden="true">
        <div className="shape-bar b1" />
        <div className="shape-bar b2" />
        <div className="shape-bar b3" />
        <div className="shape-bar b4" />
      </div>
    );
  }
  if (kind === "circles") {
    return (
      <div className="shape-circles" aria-hidden="true">
        <div className="shape-circle fill" />
        <div className="shape-circle" />
        <div className="shape-circle fill" />
        <div className="shape-circle" />
      </div>
    );
  }
  return (
    <div className="shape-line" aria-hidden="true">
      <svg viewBox="0 0 200 60" preserveAspectRatio="none">
        <polyline
          points="0,50 30,42 60,46 90,28 120,34 150,18 180,22 200,8"
          fill="none"
          stroke={dark ? "#2997ff" : "#0066cc"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[[0,50],[30,42],[60,46],[90,28],[120,34],[150,18],[180,22],[200,8]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill={dark ? "#2997ff" : "#0066cc"} />
        ))}
      </svg>
    </div>
  );
}

export function Work({ onOpenWork }) {
  return (
    <div>
      <div className="work-intro">
        <h2>3가지의 강점</h2>
        <p>사업 PM으로서 가장 자신 있는 세 가지 영역과, 그 영역에서 만들어낸 작업물을 소개합니다.</p>
      </div>

      <div className="work-grid">
        {STRENGTHS.map((s) => (
          <div key={s.n} className={"strength-box" + (s.theme === "dark" ? " dark" : "")}>
            <div className="sb-top">
              <div>
                <div className="sb-num">No. {s.n}</div>
                <h3 className="sb-keyword">{s.keyword}</h3>
                <p className="sb-desc">{s.desc}</p>
              </div>
              <div className="sb-visual">
                <StrengthVisual kind={s.visual} dark={s.theme === "dark"} />
              </div>
            </div>
            <div className="sb-bottom">
              {s.works.map((w) => (
                <button key={w.id} className="work-item" onClick={() => onOpenWork(w)}>
                  <span>{w.title}</span>
                  <span className="arrow" aria-hidden="true">›</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
