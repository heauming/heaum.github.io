import { useState } from 'react';

export function DarkestDaysCBTDetail({ onBack }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="wd-wrap">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: 24 }}>← Work로 돌아가기</button>
      <header className="wd-header">
        <h1 className="wd-title">Darkest Days CBT 데이터 분석</h1>
        <div className="wd-subtitle">CBT 기간 동안의 플레이 데이터 분석 보고서</div>
      </header>
      <div className="dd-embed-wrap">
        {!loaded && <div className="dd-embed-loading">불러오는 중…</div>}
        <iframe
          src="/DarkestDaysCBT.html"
          title="Darkest Days CBT 데이터 분석"
          className="dd-embed-frame"
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}
