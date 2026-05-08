import { CAREER } from '../data';

export function Roadmap({ onOpen }) {
  return (
    <div className="roadmap-wrap">
      <svg className="roadmap-svg" viewBox="0 0 400 380" preserveAspectRatio="none">
        <defs>
          <marker id="arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="#0066cc" />
          </marker>
        </defs>
        <path
          d="M 200 10 C 260 60, 140 110, 200 150 C 260 190, 140 240, 200 280 C 240 310, 200 340, 200 370"
          stroke="#0066cc" strokeWidth="2" fill="none" strokeLinecap="round" markerEnd="url(#arrowhead)"
        />
        {CAREER.map((c) => {
          const y = (c.yPct / 100) * 380;
          const spineX = 200;
          const isLeft = c.side === "left";
          const targetX = isLeft ? 60 : 340;
          return (
            <line key={c.id} x1={spineX} y1={y} x2={targetX} y2={y}
              stroke="#0066cc" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
          );
        })}
      </svg>

      {CAREER.map((c) => {
        const isLeft = c.side === "left";
        const style = {
          top: `calc(${c.yPct}% - 20px)`,
          [isLeft ? "left" : "right"]: "8px",
          textAlign: isLeft ? "right" : "left",
          alignItems: isLeft ? "flex-end" : "flex-start",
        };
        return (
          <button key={c.id} className={"roadmap-node" + (c.isCurrent ? " current" : "")}
            style={style} onClick={() => onOpen(c)}>
            <span className="rn-date">{c.date}</span>
            <span className="rn-title">{c.title}</span>
          </button>
        );
      })}
    </div>
  );
}
