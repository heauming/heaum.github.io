export function DarkestDaysCBTDetail({ onBack }) {
  return (
    <div className="wd-wrap">
      <button className="btn-back" onClick={onBack} style={{ marginBottom: 24 }}>← Work로 돌아가기</button>

      <header className="wd-header">
        <h1 className="wd-title">Darkest Days CBT 데이터 분석</h1>
        <div className="wd-subtitle">CBT 기간 동안의 플레이 데이터 분석 보고서</div>
      </header>

      <div className="wd-grid">
        <aside className="wd-side">
          <div className="wd-side-block">
            <div className="wd-side-label">MY ROLE</div>
            <ul className="wd-side-list"><li>게임 사업 PM</li><li>설문 · 분석</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">PROJECT</div>
            <ul className="wd-side-list"><li>CBT 설문 &amp; 코호트 분석</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">PLATFORM</div>
            <ul className="wd-side-list"><li>Steam</li><li>PC · 모바일 크로스</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">GENRE</div>
            <ul className="wd-side-list"><li>좀비 루트슈터</li></ul>
          </div>
          <div className="wd-side-block">
            <div className="wd-side-label">TIMELINE</div>
            <ul className="wd-side-list"><li>2025.01 — 2025.03</li></ul>
          </div>
        </aside>

        <section className="wd-main">
          <div className="wd-summary">
            <div className="wd-side-label">업무 요약</div>
            <p>Steam Next Fest CBT를 활용한 글로벌 유저 반응 검증 — CBT 설문 분석 &amp; 코호트 설계를 통해 유저 피드백 및 인게임 데이터를 기반으로 런칭 전 의사결정 우선 순위를 판단하였습니다.</p>
          </div>

          <div className="wd-detail">
            <div className="wd-side-label">상세 내용</div>
            <p>런칭 직전 제한된 리소스 중 우선적으로 개선이 필요한 부분에 대한 내부적 평가를 넘어 합리적인 외부 평가 기반 근거가 필요하였습니다.</p>
            <p style={{ marginTop: 14 }}>특히, 콘텐츠 개선 및 우선 순위(만족도) 결정의 경우 정성적 인게임 데이터만으로는 판단이 어렵다고 생각되어 설문 조사를 통한 정량적 데이터 확보 및 판단 근거를 형성하였습니다.</p>
          </div>
        </section>
      </div>

      {/* ============ CASE STUDY SECTIONS ============ */}
      <section className="cs-section">
        <div className="cs-divider" aria-hidden="true">
          <span className="cs-divider-line" />
          <span className="cs-divider-label">CASE STUDY</span>
          <span className="cs-divider-line" />
        </div>

        {/* ── 01. 문제 정의 ── */}
        <article className="cs-block">
          <div className="cs-block-num">01</div>
          <div className="cs-block-eyebrow">Problem · 문제 정의</div>
          <h3 className="cs-block-title">런칭 직전 효율적인 리소스 활용을 위한 합리적 근거</h3>
          <div className="cs-block-grid">
            <div className="cs-block-text">
              <p>런칭 직전 제한된 리소스 중 우선적으로 개선이 필요한 부분에 대한 내부적 평가를 넘어 합리적인 외부 평가 기반 근거가 필요하였습니다.</p>
              <p style={{ marginTop: 12 }}>특히, 콘텐츠 개선 및 우선 순위(만족도) 결정의 경우 정성적 인게임 데이터만으로는 판단이 어렵다고 생각되어 설문 조사를 통한 정량적 데이터 확보 및 판단 근거를 형성하였습니다.</p>
            </div>
            <div className="cs-block-visual">
              <div className="dd-flow-card">
                <div className="dd-flow-step">
                  <div className="dd-flow-label">PROBLEM</div>
                  <div className="dd-flow-text">제한된 개발 리소스, 다수의 개선 후보</div>
                </div>
                <div className="dd-flow-step">
                  <div className="dd-flow-label"></div>
                  <div className="dd-flow-text">의견이 아닌 데이터 기반의 우선순위 근거</div>
                </div>
                <div className="dd-flow-step dd-flow-step--accent">
                  <div className="dd-flow-label">GOAL</div>
                  <div className="dd-flow-text">런칭 전 집중 영역 + 핵심 타겟 코호트 정의</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ── 02. 프로젝트 배경 ── */}
        <article className="cs-block">
          <div className="cs-block-num">02</div>
          <div className="cs-block-eyebrow">Context · 프로젝트 배경</div>
          <h3 className="cs-block-title">Steam Next Fest CBT를 활용한 글로벌 유저 반응 검증</h3>
          <div className="cs-block-grid reverse">
            <div className="cs-block-text">
              <p>런칭 전 CBT를 통해 경쟁작 대비 강점, 핵심 이용자 층, 우선 개선 항목 등에 대한 합리적인 논거 확보가 필요하였습니다.</p>
              <p style={{ marginTop: 12 }}>Steam Next Fest를 중심으로 진행된 CBT 특성 상 다수의 서구권 유저 유입을 예측하여 영어를 중심으로 영, 한, 중, 일 총 4가지 언어를 지원한 설문을 설계하였습니다.</p>
            </div>
            <div className="cs-block-visual">
              <div className="dd-merge-diagram">
                <div className="dd-merge-source">
                  <div className="dd-merge-source-label">SOURCE A</div>
                  <div className="dd-merge-source-title">설문 데이터</div>
                  <ul className="dd-merge-list">
                    <li>장르 적합성</li>
                    <li>요소별 만족도</li>
                    <li>플레이 의향</li>
                    <li>개선 희망 영역</li>
                  </ul>
                </div>
                <div className="dd-merge-plus">+</div>
                <div className="dd-merge-source dd-merge-source--dark">
                  <div className="dd-merge-source-label">SOURCE B</div>
                  <div className="dd-merge-source-title">인게임 데이터</div>
                  <ul className="dd-merge-list">
                    <li>레벨 &amp; 진행도</li>
                    <li>멀티플레이 진입 &amp; 깊이</li>
                    <li>콘텐츠별 도달 수준</li>
                    <li>세션 구조</li>
                  </ul>
                </div>
              </div>
              <div className="dd-merge-output">코호트 분석 →</div>
            </div>
          </div>
        </article>

        {/* ── 03. 설문 설계 ── */}
        <article className="cs-block">
          <div className="cs-block-num">03</div>
          <div className="cs-block-eyebrow">Survey Design · 설문 설계</div>
          <h3 className="cs-block-title">게임 유입 코호트 설정을 위한 응답 구조 설계</h3>
          <div className="cs-block-grid">
            <div className="cs-block-text">
              <h4 className="cs-sub-title">설문 설계 조건</h4>
              <div className="dd-conditions">
                <div className="dd-cond-row"><span className="dd-cond-num">01</span><span>5분 이내 응답 가능한 분량</span></div>
                <div className="dd-cond-row"><span className="dd-cond-num">02</span><span>장르 적합도 + 요소별 만족도 측정</span></div>
                <div className="dd-cond-row"><span className="dd-cond-num">03</span><span>스크리닝 질문으로 응답 신뢰도 확보</span></div>
                <div className="dd-cond-row"><span className="dd-cond-num">04</span><span>내부 플레이 데이터와 결합</span></div>
                <div className="dd-cond-row"><span className="dd-cond-num">05</span><span>코호트별 비교 분석이 가능한 구조</span></div>
              </div>
            </div>
            <div className="cs-block-visual">
              <h4 className="cs-sub-title" style={{ marginBottom: 12 }}>설문 Flow</h4>
              <div className="dd-survey-flow">
                <div className="dd-sf-step">
                  <div className="dd-sf-num">01</div>
                  <div className="dd-sf-meta">STEP</div>
                  <div className="dd-sf-label">좀비 &amp; 슈터 장르 친화도 확인</div>
                </div>
                <div className="dd-sf-step">
                  <div className="dd-sf-num">02</div>
                  <div className="dd-sf-meta">STEP</div>
                  <div className="dd-sf-label">경쟁작 &amp; 유사 장르 플레이 경험</div>
                </div>
                <div className="dd-sf-step">
                  <div className="dd-sf-num">03</div>
                  <div className="dd-sf-meta">STEP</div>
                  <div className="dd-sf-label">요소별 4점 척도 만족도 평가</div>
                </div>
                <div className="dd-sf-step dd-sf-step--highlight">
                  <div className="dd-sf-num">04</div>
                  <div className="dd-sf-meta">SCREENING</div>
                  <div className="dd-sf-label">응답 품질 검증 스크리닝 질문</div>
                </div>
                <div className="dd-sf-step">
                  <div className="dd-sf-num">05</div>
                  <div className="dd-sf-meta">STEP</div>
                  <div className="dd-sf-label">플레이 의향 &amp; 개선 희망 요소</div>
                </div>
                <div className="dd-sf-step">
                  <div className="dd-sf-num">06</div>
                  <div className="dd-sf-meta">STEP</div>
                  <div className="dd-sf-label">주관식 답변</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* ── 04. 코호트 설계 ── */}
        <article className="cs-block">
          <div className="cs-block-num">04</div>
          <div className="cs-block-eyebrow">Cohort Design · 코호트 설계</div>
          <h3 className="cs-block-title">설문 × 인게임 데이터를 통한 타겟 유저 정의</h3>

          <div className="dd-cohort-layout">
            <div className="dd-matrix-wrap">
              <div className="dd-matrix-ylabel">슈팅 친화도 →</div>
              <div className="dd-matrix">
                <div className="dd-quad">
                  <div className="dd-quad-axis">좀비 낮음 · 슈팅 높음</div>
                  <div className="dd-quad-name">슈터 로열</div>
                  <div className="dd-quad-desc">슈팅 경험은 풍부하나 좀비 선호 낮음. 서브 타겟군_2</div>
                  <span className="dd-quad-badge">모바일 비중</span>
                </div>
                <div className="dd-quad dd-quad--primary">
                  <div className="dd-quad-axis">좀비 높음 · 슈팅 높음</div>
                  <div className="dd-quad-name">핵심 타겟<br />좀비 + 슈팅 · PC</div>
                  <div className="dd-quad-desc">플레이 의향 가장 높음. 런칭 시 핵심 타겟군</div>
                  <span className="dd-quad-badge">PC 비중</span>
                </div>
                <div className="dd-quad">
                  <div className="dd-quad-axis">좀비 낮음 · 슈팅 낮음</div>
                  <div className="dd-quad-name dd-quad-name--muted">프로필 외</div>
                  <div className="dd-quad-desc">베이스라인 비교용. 런칭 타겟에는 미포함</div>
                  <span className="dd-quad-badge">혼합</span>
                </div>
                <div className="dd-quad">
                  <div className="dd-quad-axis">좀비 높음 · 슈팅 낮음</div>
                  <div className="dd-quad-name">라이트 좀비 팬</div>
                  <div className="dd-quad-desc">좀비 컨셉에 반응하는 라이트 유저군. 서브 타겟군</div>
                  <span className="dd-quad-badge">PC 비중</span>
                </div>
              </div>
              <div className="dd-matrix-xlabel">좀비 친화도 →</div>
            </div>

            <div className="dd-cohort-intent">
              <h4 className="cs-sub-title" style={{ marginBottom: 12 }}>설계 의도</h4>
              <div className="dd-intent-card">
                <div className="dd-intent-title">데이터를 통한 실제 만족도 일치 여부 확인</div>
                <div className="dd-intent-body">실제 인게임 데이터를 통해 콘텐츠 체험 여부 및 레벨 달성 수준을 통한 설문 신뢰도 확보 및 핵심 개선 포인트의 유의미성 검증</div>
              </div>
              <div className="dd-intent-card">
                <div className="dd-intent-title">3가지 기준의 유저 분류</div>
                <div className="dd-intent-body">좀비, 슈팅, 플랫폼 3가지 축을 기준으로 유입 유저 층을 정의</div>
              </div>
              <div className="dd-intent-card dd-intent-card--dark">
                <div className="dd-intent-badge">기준 셀</div>
                <div className="dd-intent-title" style={{ color: '#fff' }}>'좀비 · 슈팅 · PC' 코호트가 핵심 타겟군</div>
              </div>
            </div>
          </div>
        </article>

        {/* ── 05. 분석 결과 ── */}
        <article className="cs-block">
          <div className="cs-block-num">05</div>
          <div className="cs-block-eyebrow">Findings · 분석 결과</div>
          <h3 className="cs-block-title">핵심 타겟 및 개선 항목 인사이트 도출</h3>

          <div className="dd-findings">
            {/* Finding 01 */}
            <div className="dd-find-card dd-find-card--primary">
              <div className="dd-find-num">01</div>
              <div className="dd-find-headline">핵심 타겟은 '좀비 + 슈팅 + PC' 유저층</div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">INSIGHT</div>
                <div className="dd-find-section-body">유의미한 이용자 비중 유지 및 높은 플레이 의향을 지닌 핵심 코호트</div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">EVIDENCE — 지속 의향 (상대 비교)</div>
                <div className="dd-bar-stack">
                  <div className="dd-bar-row"><span className="dd-bar-label">Core</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '92%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">Light Z</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '58%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">Loyal S</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '44%' }} /></div></div>
                </div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">PM IMPLICATION</div>
                <div className="dd-find-section-body">Steam 런칭 메시지를 좀비 생존 · 슈팅 · PC 중심으로 포지셔닝</div>
              </div>
            </div>

            {/* Finding 02 */}
            <div className="dd-find-card">
              <div className="dd-find-num">02</div>
              <div className="dd-find-headline">시각적 퀄리티와 오픈월드 깊이가 핵심 평가 요소</div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">INSIGHT</div>
                <div className="dd-find-section-body">전투 시 시각 퀄리티가 최우선 개선 항목으로 지적, 오픈월드 탐험 강조를 희망한 응답의 높은 비중</div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">EVIDENCE — 개선 희망 영역 (상대 비교)</div>
                <div className="dd-bar-stack">
                  <div className="dd-bar-row"><span className="dd-bar-label">시각</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '88%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">오픈W</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '74%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">루트</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '46%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">성장</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '32%' }} /></div></div>
                </div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">PM IMPLICATION</div>
                <div className="dd-find-section-body">런칭 전 우선순위는 VFX · 에셋 폴리싱 · 오픈월드 퀘스트 밀도에 집중</div>
              </div>
            </div>

            {/* Finding 03 */}
            <div className="dd-find-card">
              <div className="dd-find-num">03</div>
              <div className="dd-find-headline">멀티플레이의 핵심 재미로의 발전 가능성</div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">INSIGHT</div>
                <div className="dd-find-section-body">높은 플레이 의향을 보인 유저의 상당 수가 멀티플레이 진행 및 높은 만족도를 보였으나, 설문 &amp; 인게임 대다수 테스터는 체험 자체 X</div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">EVIDENCE — 멀티플레이 도달률 (상대 비교)</div>
                <div className="dd-bar-stack">
                  <div className="dd-bar-row"><span className="dd-bar-label">도달</span><div className="dd-bar-track"><div className="dd-bar-fill" style={{ width: '35%' }} /></div></div>
                  <div className="dd-bar-row"><span className="dd-bar-label">미도달</span><div className="dd-bar-track"><div className="dd-bar-fill dd-bar-fill--muted" style={{ width: '65%' }} /></div></div>
                </div>
              </div>
              <div className="dd-find-section">
                <div className="dd-find-section-label">PM IMPLICATION</div>
                <div className="dd-find-section-body">멀티 모드의 게임 핵심 재미로의 발전 가능성</div>
              </div>
            </div>
          </div>
        </article>

        {/* ── 06. 개선 제안 ── */}
        <article className="cs-block">
          <div className="cs-block-num">06</div>
          <div className="cs-block-eyebrow">Recommendations · 개선 제안</div>
          <h3 className="cs-block-title">분석 결과의 액션 아이템</h3>

          <div className="dd-rec-table">
            <div className="dd-rec-row dd-rec-row--head">
              <div>분석 결과</div>
              <div>PM 제안</div>
              <div>기대 효과</div>
              <div style={{ textAlign: 'right' }}>우선순위</div>
            </div>
            <div className="dd-rec-row">
              <div className="dd-rec-cell dd-rec-cell--title">핵심 유저군의 비주얼 퀄리티 &amp; 오픈월드 요소 중시</div>
              <div className="dd-rec-cell">인트로 · 튜토리얼 에셋 모델링 폴리싱 + 맵 전반 퀘스트 · 탐험 요소 확장</div>
              <div className="dd-rec-cell">첫 인상 개선; 필드 탐험 몰입도 강화</div>
              <div style={{ textAlign: 'right' }}><span className="dd-priority dd-priority--high">High</span></div>
            </div>
            <div className="dd-rec-row">
              <div className="dd-rec-cell dd-rec-cell--title">높은 멀티 만족도 but 낮은 참여율</div>
              <div className="dd-rec-cell">멀티 해금 시점 단축 및 접근성 강화</div>
              <div className="dd-rec-cell">게임 전반 리텐션 개선</div>
              <div style={{ textAlign: 'right' }}><span className="dd-priority dd-priority--high">High</span></div>
            </div>
            <div className="dd-rec-row">
              <div className="dd-rec-cell dd-rec-cell--title">좀비 · 슈팅 선호 유저의 높은 플레이 의향</div>
              <div className="dd-rec-cell">Steam 마케팅 소재에서 '좀비 생존 · 슈팅'을 전면 강조</div>
              <div className="dd-rec-cell">타겟 유저 유입 효율 개선</div>
              <div style={{ textAlign: 'right' }}><span className="dd-priority dd-priority--med">Med</span></div>
            </div>
          </div>
        </article>

        {/* ── 07. 임팩트 & 러닝 ── */}
        <article className="cs-block cs-block-final">
          <div className="cs-block-num">07</div>
          <div className="cs-block-eyebrow">Impact &amp; Learnings · 임팩트 &amp; 러닝</div>
          <h3 className="cs-block-title">설문 데이터를 통한 의사결정 근거 생성</h3>

          <div className="dd-impact-cards">
            <div className="dd-impact-card">
              <div className="dd-impact-num">OUTCOME 01 — 핵심 이용자층</div>
              <div className="dd-impact-title">런칭 이용자층 정의.</div>
              <ul className="dd-impact-list">
                <li>PC 비중 높은 유저</li>
                <li>좀비 장르 선호 유저</li>
                <li>슈팅 친화 유저</li>
                <li>멀티플레이 친화 유저</li>
              </ul>
            </div>
            <div className="dd-impact-card dd-impact-card--accent">
              <div className="dd-impact-num">OUTCOME 02 — 개선 우선순위</div>
              <div className="dd-impact-title">런칭 전 우선순위 확정.</div>
              <ul className="dd-impact-list">
                <li>시각 · 콘텐츠 폴리싱</li>
                <li>멀티플레이 해금 시점 단축</li>
              </ul>
            </div>
            <div className="dd-impact-card">
              <div className="dd-impact-num">OUTCOME 03 — PM 관점의 학습</div>
              <div className="dd-impact-title">PM 관점의 학습.</div>
              <ul className="dd-impact-list">
                <li>구조적 설문 형성을 통한 코호트 형성</li>
                <li>설문 × 인게임 데이터 결합을 통한 논리적 근거 마련</li>
                <li>우선순위 판단을 위한 데이터 기반 분석</li>
              </ul>
            </div>
          </div>

          <div className="dd-closing">
            <div className="dd-closing-lede">정량적 + 정성적 데이터의 결합으로 도출한 <span style={{ color: 'var(--accent)' }}>실행 가능한 인사이트</span>.</div>
            <div className="dd-closing-disclaimer">내부 수치는 대외 공개가 어려워, 본 포트폴리오는 절대 수치가 아닌 분석 구조 · 의사결정 흐름 · 도출 방향 중심으로 재구성되었습니다.</div>
          </div>
        </article>
      </section>
    </div>
  );
}
