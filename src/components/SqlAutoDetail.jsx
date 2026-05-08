import { useRef } from 'react';

function SqlAutoCaseVisual({ kind }) {
  if (kind === "background") {
    // 단순 작업의 AI 위임 — 점차 증가하는 요청 + 병목
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* axis */}
        <line x1="48" y1="180" x2="440" y2="180" stroke="#e0e0e0" strokeWidth="1" />
        <line x1="48" y1="40" x2="48" y2="180" stroke="#e0e0e0" strokeWidth="1" />
        {/* growing request bars */}
        {[
          [70, 150], [110, 130], [150, 110], [190, 92],
          [230, 76], [270, 64], [310, 56], [350, 48],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="22" height={180 - y} rx="3"
                fill={i >= 5 ? "#0066cc" : "rgba(0,102,204,0.35)"} />
        ))}
        {/* bottleneck label */}
        <g transform="translate(370,58)">
          <rect x="-4" y="-18" width="92" height="26" rx="13" fill="#1d1d1f" />
          <text x="42" y="-1" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fontWeight="600" fill="#fff" letterSpacing="0.3">
            병목 발생
          </text>
        </g>
        {/* xlabel */}
        <text x="244" y="202" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">
          데이터 추출 요청 건수 — 시간 흐름 →
        </text>
      </svg>
    );
  }

  if (kind === "goal") {
    // 자연어 → AI → 쿼리/데이터
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* node 1: 자연어 */}
        <g>
          <rect x="28" y="80" width="112" height="60" rx="11" fill="#fff" stroke="#e0e0e0" />
          <text x="84" y="106" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="11" fontWeight="600" fill="#7a7a7a" letterSpacing="0.6">QUESTION</text>
          <text x="84" y="125" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fontWeight="600" fill="#1d1d1f">자연어 질문</text>
        </g>
        {/* arrow */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M148 110 L184 110" />
          <path d="M178 105 L184 110 L178 115" />
        </g>
        {/* node 2: AI */}
        <g>
          <rect x="190" y="68" width="100" height="84" rx="11" fill="#1d1d1f" />
          <circle cx="240" cy="100" r="13" fill="none" stroke="#2997ff" strokeWidth="1.5" />
          <circle cx="240" cy="100" r="4" fill="#2997ff" />
          <text x="240" y="135" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="12" fontWeight="600" fill="#fff">AI Agent</text>
        </g>
        {/* arrow */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M298 110 L334 110" />
          <path d="M328 105 L334 110 L328 115" />
        </g>
        {/* node 3: query / data */}
        <g>
          <rect x="340" y="56" width="118" height="44" rx="9" fill="#fff" stroke="#e0e0e0" />
          <text x="399" y="74" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="#7a7a7a">OUTPUT</text>
          <text x="399" y="91" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fontWeight="600" fill="#1d1d1f">쿼리</text>
          <rect x="340" y="118" width="118" height="44" rx="9" fill="#fff" stroke="#e0e0e0" />
          <text x="399" y="136" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="#7a7a7a">OUTPUT</text>
          <text x="399" y="153" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fontWeight="600" fill="#1d1d1f">데이터</text>
        </g>
        <text x="240" y="200" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">
          비-SQL 사용자도 자체적으로 데이터 추출
        </text>
      </svg>
    );
  }

  if (kind === "method") {
    // 두 가지 방식 비교: GPT 에이전트 vs Dooray AI
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* left: GPT agent (limited) */}
        <g>
          <rect x="20" y="34" width="200" height="156" rx="11" fill="#fff" stroke="#e0e0e0" />
          <text x="36" y="56" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#7a7a7a" letterSpacing="0.8">PHASE 01</text>
          <text x="36" y="76" fontFamily="Pretendard, sans-serif" fontSize="14"
                fontWeight="600" fill="#1d1d1f">GPT 에이전트</text>
          {/* bullets */}
          <g fontFamily="Pretendard, sans-serif" fontSize="11" fill="#333">
            <circle cx="42" cy="100" r="2" fill="#0066cc" />
            <text x="52" y="103">테이블 정보 수동 작성</text>
            <circle cx="42" cy="120" r="2" fill="#0066cc" />
            <text x="52" y="123">예시 데이터 + 검증 로직</text>
            <circle cx="42" cy="140" r="2" fill="#0066cc" />
            <text x="52" y="143">제한 조건 튜닝 반복</text>
          </g>
          {/* warning */}
          <rect x="36" y="156" width="168" height="22" rx="5" fill="rgba(217,119,87,0.12)"
                stroke="rgba(217,119,87,0.4)" />
          <text x="120" y="170" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="10" fontWeight="600" fill="#a44a23">⚠ 환각 현상 발생</text>
        </g>
        {/* arrow */}
        <g stroke="#0066cc" strokeWidth="1.5" fill="none">
          <path d="M226 112 L254 112" />
          <path d="M248 107 L254 112 L248 117" />
        </g>
        {/* right: Dooray AI */}
        <g>
          <rect x="260" y="34" width="200" height="156" rx="11" fill="#1d1d1f" />
          <text x="276" y="56" fontFamily="ui-monospace, monospace" fontSize="10"
                fill="#9a9a9e" letterSpacing="0.8">PHASE 02</text>
          <text x="276" y="76" fontFamily="Pretendard, sans-serif" fontSize="14"
                fontWeight="600" fill="#fff">Dooray AI 연동</text>
          <g fontFamily="Pretendard, sans-serif" fontSize="11" fill="#cccccc">
            <circle cx="282" cy="100" r="2" fill="#2997ff" />
            <text x="292" y="103">프로젝트 내 정보 기반 응답</text>
            <circle cx="282" cy="120" r="2" fill="#2997ff" />
            <text x="292" y="123">예시 쿼리 학습 추가</text>
            <circle cx="282" cy="140" r="2" fill="#2997ff" />
            <text x="292" y="143">복잡 컬럼 처리 규칙 반영</text>
          </g>
          <rect x="276" y="156" width="168" height="22" rx="5" fill="rgba(41,151,255,0.14)"
                stroke="rgba(41,151,255,0.45)" />
          <text x="360" y="170" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="10" fontWeight="600" fill="#2997ff">✓ 환각 현상 감소</text>
        </g>
      </svg>
    );
  }

  if (kind === "result") {
    // 결과: 요청 건수 감소
    return (
      <svg className="cs-visual-svg" viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="480" height="220" fill="#f5f5f7" />
        {/* before */}
        <g>
          <text x="120" y="46" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="#7a7a7a" letterSpacing="1">BEFORE / 주간 요청</text>
          <text x="120" y="116" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="64" fontWeight="700" fill="#1d1d1f" letterSpacing="-2">3-4</text>
          <text x="120" y="146" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fill="#7a7a7a">건 / 주</text>
        </g>
        {/* arrow */}
        <g stroke="#0066cc" strokeWidth="2" fill="none">
          <path d="M198 100 L282 100" />
          <path d="M272 92 L282 100 L272 108" />
        </g>
        <text x="240" y="86" textAnchor="middle" fontFamily="Pretendard, sans-serif"
              fontSize="11" fontWeight="600" fill="#0066cc">자연어 AI 도입</text>
        {/* after */}
        <g>
          <text x="360" y="46" textAnchor="middle" fontFamily="ui-monospace, monospace"
                fontSize="10" fill="#7a7a7a" letterSpacing="1">AFTER / 주간 요청</text>
          <text x="360" y="116" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="64" fontWeight="700" fill="#0066cc" letterSpacing="-2">1-2</text>
          <text x="360" y="146" textAnchor="middle" fontFamily="Pretendard, sans-serif"
                fontSize="13" fill="#7a7a7a">건 / 주</text>
        </g>
        <text x="240" y="190" textAnchor="middle" fontFamily="ui-monospace, monospace"
              fontSize="10" fill="#7a7a7a" letterSpacing="1">
          사업 인원 자체 데이터 추출 가능 → 분석 리소스 확보
        </text>
      </svg>
    );
  }

  return null;
}

export function SqlAutoDetail({ onBack }) {
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
        <h1 className="wd-title">SQL 자동화 프로세스 구축</h1>
        <div className="wd-subtitle">사업모델링파트</div>
      </header>

      <div className="wd-grid">
        <aside className="wd-side">
          <div className="wd-side-block">
            <div className="wd-side-label">MY ROLE</div>
            <ul className="wd-side-list">
              <li>데이터 추출 및 분석</li>
            </ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TOOLS</div>
            <ul className="wd-side-list">
              <li>Impala</li>
              <li>Dooray 내부 AI 툴</li>
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
            <p>내부 AI 툴을 활용한 자연어 기반 쿼리 출력 시스템 구축</p>
          </div>

          <div className="wd-detail">
            <div className="wd-side-label">상세 내용</div>
            <p>
              SQL에 익숙하지 않은 인원들도 자연어 기반으로 질문을 통해 원하는
              데이터를 출력할 수 있는 쿼리를 작성할 수 있는 환경 구축.
            </p>
            <p style={{ marginTop: 14 }}>
              보안, 인프라 등의 제약이 존재하는 상황에서 실현 가능한 방법을 찾아
              간단한 작업에 할애되는 리소스를 줄여, 데이터 분석과 같은 고도의
              작업에 리소스를 효율적으로 할애할 수 있도록 AI를 활용한 환경
              조성.
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
          <h2 className="cs-title">자연어 기반 쿼리 자동화</h2>
          <p className="cs-lede">
            보안 제약 환경에서 사업 인원도 자체적으로 데이터 추출이 가능하도록,
            Dooray 내부 AI를 활용해 자연어 → 쿼리 출력 시스템을 구축한 과정.
          </p>
        </header>

        {/* 배경 */}
        <article className="cs-block">
          <div className="cs-block-num">01</div>
          <div className="cs-block-eyebrow">배경</div>
          <h3 className="cs-block-title">단순 작업의 AI 위임을 통한 효율성 개선</h3>
          <div className="cs-block-grid">
            <div className="cs-block-text">
              <p>
                사내 라이브 게임의 수가 증가하고 요청 데이터 추출 수가 점차 증가함에
                따라, 비교적 간단한 데이터 추출 건에도 지속적으로 커뮤니케이션 및
                리소스 할당이 발생하는, 다소 비효율적인 상황이었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <SqlAutoCaseVisual kind="background" />
              <div className="cs-visual-cap">요청 누적 → 단순 추출에도 병목 발생</div>
            </div>
          </div>
        </article>

        {/* 목표 */}
        <article className="cs-block">
          <div className="cs-block-num">02</div>
          <div className="cs-block-eyebrow">목표</div>
          <h3 className="cs-block-title">자연어 기반 AI 데이터 추출 기능 구현</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                AI를 활용하여 자연어 기반으로 출력을 원하는 데이터를 물을 경우,
                AI가 해당 데이터를 바로 출력해주거나 그에 상응하는 쿼리를 작성해주는
                환경을 구축.
              </p>
              <p style={{ marginTop: 12 }}>
                간단한 데이터 추출은 사업 담당자들이 자체적으로 실행할 수 있는
                환경을 조성하는 것을 목표로 하였습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <SqlAutoCaseVisual kind="goal" />
              <div className="cs-visual-cap">자연어 질문 → AI Agent → 쿼리·데이터 출력</div>
            </div>
          </div>
        </article>

        {/* 방식 */}
        <article className="cs-block">
          <div className="cs-block-num">03</div>
          <div className="cs-block-eyebrow">방식</div>
          <h3 className="cs-block-title">제한 사항에 따른 쿼리문 출력 방식 활용</h3>

          <div className="cs-block-grid">
            <div className="cs-block-text">
              <h4 className="cs-sub-title">제한 조건 안에서의 출구 찾기</h4>
              <p>
                직접 DB에 후킹하여 데이터를 학습 시킨 후 출력하는 방식은 보안
                리스크로 인해 실행 불가능한 상황이었습니다. 이에 초기에는 테이블
                정보를 수동으로 작성한 후, 예시 데이터와 함께 기존 AI에 에이전트
                형식으로 삽입하는 방식을 통해 대응되는 쿼리를 출력하는 방식으로
                시도하였습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                에이전트의 역할, 각종 테이블에 대한 설명과 각 컬럼에 대한 정보,
                예시 등이 담긴 참고 자료, 신뢰성 있는 쿼리 출력을 위한 검증 로직 및
                제한 사항 등을 지속적으로 삽입/제거 하면서 튜닝 과정을 거쳤습니다.
              </p>

              <h4 className="cs-sub-title" style={{ marginTop: 24 }}>환각 현상으로 인한 시스템 구축의 어려움</h4>
              <p>
                그러나, 아무리 제한 조건을 추가하여도 기존 GPT 내부에서 실행하는
                에이전트 방식으로는 새로운 컬럼을 추가한다거나 시간 등의 처리 방식
                규칙을 준수하지 않는 등, 지속적으로 외부 SQL 관련 지식 기반의
                정보를 활용하는 환각 현상을 방지할 수가 없었습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                이에 다른 방안을 고민하던 와중, 두레이에서 외부 언어 모델을 가져와
                각 프로젝트의 내용을 요약하거나 이에 대한 질문을 해주는 AI 기능이
                추가된 것을 확인하여 해당 기능을 활용하고자 하였습니다.
              </p>

              <h4 className="cs-sub-title" style={{ marginTop: 24 }}>제한 조건 설정 및 실행</h4>
              <p>
                두레이 내부 AI 연동은 환각 현상이 비교적 덜한, 제한된 프로젝트
                안의 내용을 중심으로 답변하는 성향이 강하여 환각 현상이 많이 줄어든
                모습이었습니다. 그러나 아레나 전투 정보 등과 같은 json 기반 내용을
                처리할 시 컬럼의 내용 설명 만으로는 환각 현상이 발생하는 경향이
                있어, 복잡한 컬럼에 대한 처리 규칙을 예시 쿼리와 함께 학습 내용에
                반영하는 방향을 통해 환각 현상을 줄일 수 있었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <SqlAutoCaseVisual kind="method" />
              <div className="cs-visual-cap">GPT 에이전트(환각) → Dooray 내부 AI(컨텍스트 한정)</div>
            </div>
          </div>
        </article>

        {/* 결과 */}
        <article className="cs-block">
          <div className="cs-block-num">04</div>
          <div className="cs-block-eyebrow">결과</div>
          <h3 className="cs-block-title">자연어 기반 데이터 출력 환경 조성</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>
                리텐션, 특정 유저의 기간 중 재화 소비 동향 등 AI를 통해 사업적으로
                필요한 데이터 출력 구조가 가능하게 되었습니다. 다소 복잡한 쿼리의
                경우에도 들어온 요청에 대하여 검토하는 과정만 거치게 되어, 데이터
                분석과 같은 고도의 작업에 보다 집중할 수 있는 환경이 조성되었습니다.
              </p>
              <p style={{ marginTop: 12 }}>
                사업 내 인원들 또한 자체적으로 데이터 추출이 가능하게 되어, 이전
                대비 일주일에 3~4건씩 들어오던 요청이 체감 상 1~2번 정도로
                줄어들었습니다.
              </p>
            </div>
            <div className="cs-block-visual">
              <SqlAutoCaseVisual kind="result" />
              <div className="cs-visual-cap">주간 요청 건수 약 50%↓ — 분석 리소스 확보</div>
            </div>
          </div>
        </article>

        {/* 의의 */}
        <article className="cs-block cs-block-final">
          <div className="cs-block-num">05</div>
          <div className="cs-block-eyebrow">의의</div>
          <h3 className="cs-block-title">
            AI 설정을 위한 섬세한 제한 조건 설정의 필요성 및<br />
            자체 AI 활용 인프라 필요성 체감
          </h3>
          <div className="cs-final-text">
            <p>
              AI를 활용하기 위해 어느 정도 수준의 제한 조건 및 예시 데이터 학습이
              필요한지 체감하게 되었으며, 나아가 AI 활용을 통한 리소스 효율화를
              체감하여 이러한 인프라 조성의 중요성에 대하여 깨달을 수 있는
              업무였습니다.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
