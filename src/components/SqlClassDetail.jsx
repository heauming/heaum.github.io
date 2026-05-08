import { useState } from 'react';

const SQL_BASIC = [
  { title: "기초문제 1", body: "wpr_odyssey_db.user_wooparoo에서 각 유저별 보유한 우파루들을 kill_cnt가 높은 순으로 순위를 표시하라", ex: "Ex) uid: 318 / serial_no: 35 / kill_cnt: 132 / rank: 1\n    uid: 318 / serial_no: 72 / kill_cnt: 96 / rank: 2" },
  { title: "기초문제 2", body: "wpr_odyssey_db.user_wooparoo에서 각 유저 별 우파루의 sno 오름차순으로 kill_cnt 및 누적 kill_cnt를 표시하라", ex: "Ex) uid: 318 / serial_no: 1 / kill_cnt: 1 / cum_kill_cnt: 1\n    uid: 318 / serial_no: 2 / kill_cnt: 3 / cum_kill_cnt: 4" },
  { title: "기초문제 3", body: "wpr_odyssey_db.user_wooparoo에서 각 우파루 별로 어떤 유저가 가장 많은 kill_cnt를 기록하였는지 순위를 표시하라\n(※ 우파루를 중복해서 보유할 경우 제일 높은 Kill_cnt를 지닌 우파루 기준으로 순위 측정)", ex: "EX) serial_no: 1 / kill_cnt: 172 / uid: 572 / rank: 1\n    serial_no: 1 / kill_cnt: 156 / uid: 438 / rank: 2" },
];

const SQL_ADV = [
  { title: "심화문제 1", body: "wpr_odyssey_db.user_wooparoo에서, 유저 별 보유한 우파루 중 두번째로 높은 kill_cnt를 기록한 우파루를 각각 출력하라\n(※ kill_cnt가 중복된 순위로 나타날 시 전부 출력)", ex: "Ex) uid: 529 / serial_no: 425 / kill_cnt: 132" },
  { title: "심화문제 2", body: "wpr_odyssey_db.user_wooparoo와 wpr_odyssey_db.bi_wooparoo 테이블을 활용하여 각 첫 번째 속성별로 가장 많은 우파루를 보유한 인원들을 출력하시오", ex: "Ex) attr_1: 불 / uid: 542 / cnt(보유 우파루수): 192 / rank: 1" },
  { title: "심화문제 3", body: "wpr_odyssey_db.log_user_purchase테이블을 활용하여, 아래 조건을 만족하는 인원을 출력하라\n  1) 2025년 1월 1일 ~ 2025년 3월 31일까지의 기록\n  2) 각 월 별 총 결제금액 순위 top 10 안에 한번이라도 들어간 유저\n※ state = 5, currency = \"KRW\" 조건 디폴트로 삽입", ex: "Ex) uid: 602 / 1월 총 결제액: 300000 / 1월 순위: 12 / 2월 총 결제액: 380000 / 2월 순위: 8 → 해당 인원 포함" },
];

export function SqlClassDetail({ onBack }) {
  const [showProblems, setShowProblems] = useState(false);

  return (
    <div className="wd-wrap">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: 24 }}>← Work로 돌아가기</button>

      <header className="wd-header">
        <h1 className="wd-title">SQL 강의 진행</h1>
        <div className="wd-subtitle">사업모델링파트</div>
      </header>

      <div className="wd-grid">
        <aside className="wd-side">
          <div className="wd-side-block">
            <div className="wd-side-label">MY ROLE</div>
            <ul className="wd-side-list"><li>SQL 강의</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TOOLS</div>
            <ul className="wd-side-list"><li>Impala</li><li>Dighty</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TIMELINE</div>
            <ul className="wd-side-list"><li>2024 ~ 2025</li></ul>
          </div>
        </aside>

        <section className="wd-main">
          <div className="wd-summary">
            <div className="wd-side-label">업무 요약</div>
            <p>사내 사업실 인원을 대상으로 한 SQL 강의 진행</p>
          </div>

          <div className="wd-detail">
            <div className="wd-side-label">상세 내용</div>
            <p>SQL을 실무적 활용을 입사하고 처음 접한 후, 지속적인 학습을 통해 1년 후에는 사내 SQL 강의를 도맡아 활용 방법에 대한 설명도 하고 연습문제도 만들고 제시할 정도의 수준으로 끌어올렸습니다</p>
            <p style={{ marginTop: 14 }}>수업은 총 10차수로 설계되었으며 이론적인 부분을 4차씩 두번에 걸쳐 설명하였으며 SELECT 부터 시작해서 CREATE TABLE을 통한 데이터 임시 테이블 형성과 Meatabase를 활용한 시각화 까지 진행하였습니다</p>
            <button className="wd-example-btn" onClick={() => setShowProblems(true)}>예시 문제 보기</button>
          </div>
        </section>
      </div>

      {showProblems && (
        <div className="modal-overlay" onClick={() => setShowProblems(false)}>
          <div className="modal wd-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="modal-close" onClick={() => setShowProblems(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
            </button>
            <div className="modal-eyebrow">SQL · 예시 문제</div>
            <h3 className="modal-title">SQL 강의 — 예시 문제</h3>
            <div className="wd-problems">
              <div className="wd-problem-section">
                <div className="wd-problem-label">&lt;기초문제&gt;</div>
                <div className="wd-problem-note">* 하기의 문제들을 rank()over() 또는 sum()over()를 활용하여 답하시오</div>
                {SQL_BASIC.map((p) => (
                  <pre key={p.title} className="wd-codeblock">{`${p.title}.\n${p.body}\n\n${p.ex}`}</pre>
                ))}
              </div>
              <div className="wd-problem-section">
                <div className="wd-problem-label">&lt;심화문제&gt;</div>
                <div className="wd-problem-note">* 하기의 문제들을 rank()over() 또는 sum()over()를 활용하여 답하시오</div>
                {SQL_ADV.map((p) => (
                  <pre key={p.title} className="wd-codeblock">{`${p.title}.\n${p.body}\n\n${p.ex}`}</pre>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
