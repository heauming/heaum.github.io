export const CAREER = [
  {
    id: "netmarble",
    date: "2022.06",
    title: "넷마블 채용 연계형 인턴",
    side: "left",
    yPct: 6,
    detail: {
      eyebrow: "INTERNSHIP",
      heading: "넷마블 채용 연계형 인턴",
      body: (
        <>
          <p>대학 졸업을 앞두고 게임 산업으로의 진출을 위한 첫 인턴십이었습니다. 사업본부에서 출시작 및 신작의 게임 개선점을 제안하였습니다.</p>
          <ul>
            <li>세븐나이츠2 게임 분석 및 개선점 제안</li>
            <li>세븐나이츠 레볼루션 게임 분석 및 개선점 제안</li>
          </ul>
        </>
      ),
    },
  },
  {
    id: "nhn-join",
    date: "2022.08",
    title: "NHN 공채 입사",
    side: "right",
    yPct: 22,
    detail: {
      eyebrow: "FULL-TIME",
      heading: "NHN 공채 입사",
      body: (
        <p>정식으로 사업 PM 공채 포지션으로 입사하였습니다. 입사 직후 신입 교육 과정과 각종 수습 기간을 약 한달 반동안 거쳤으며, 과제 기간 중 동기들 중 가장 뛰어난 게임 실력을 지닌 것으로 인정 받았습니다.</p>
      ),
    },
  },
  {
    id: "gunsup-pm",
    date: "2022.10",
    title: "건즈업 모바일 사업 PM",
    side: "left",
    yPct: 40,
    detail: {
      eyebrow: "PROJECT",
      heading: "건즈업 모바일 사업 PM",
      body: (
        <>
          <p>온보딩 과정 이후 미국의 발키리엔터테인먼트가 개발한 모바일 미드코어 RPG 라이브 서비스 게임인 건즈업 모바일의 사업 PM으로 배정받았습니다.</p>
          <ul>
            <li>쿼리 기반 데이터 추출 및 분석</li>
            <li>인플루언서, 유튜브 등 대외 마케팅 커뮤니케이션</li>
            <li>이벤트 등 라이브 옵스 세팅</li>
          </ul>
        </>
      ),
    },
  },
  {
    id: "gunsup-lead",
    date: "2023.06",
    title: "건즈업 모바일 리드 사업 PM",
    side: "right",
    yPct: 60,
    detail: {
      eyebrow: "LEAD",
      heading: "건즈업 모바일 리드 사업 PM",
      body: (
        <>
          <p>한단계 나아가 게임의 방향성을 책임지는 리드 사업 PM 역할을 맡게 되었습니다.</p>
          <ul>
            <li>SLACK 기반 개발사 메인 커뮤니케이션</li>
            <li>점검 일정 조율 및 QA 리소스 관리</li>
            <li>KPI 설정 및 경영계획 작성</li>
            <li>R/S 회계 결산 처리</li>
            <li>스토어 관리</li>
          </ul>
        </>
      ),
    },
  },
  {
    id: "modeling",
    date: "2024.01 — 현재",
    title: "사업모델링 파트",
    side: "left",
    yPct: 82,
    isCurrent: true,
    detail: {
      eyebrow: "CURRENT",
      heading: "사업모델링 파트",
      body: (
        <>
          <p>쿼리 및 데이터 활용 능력을 인정 받아 사내 게임 전반의 데이터와 관련된 업무를 수행하는 사업모델링 파트로 배정받았습니다.</p>
          <ul>
            <li>게임 DB 스키마 구축</li>
            <li>게임 매출 시뮬레이션 기반 평가&KPI</li>
            <li>사내 게임 데이터 분석</li>
            <li>각종 게임 지표 구축&시각화</li>
          </ul>
        </>
      ),
    },
  },
];

export const SKILLS = ["MySQL", "Impala", "Tableau", "Dighty", "PPT", "EXCEL"];

export const CERTS = [
  { name: "TOEIC SPEAKING — Level 7", date: "2022.04 취득" },
  { name: "SQLD", date: "2022.06 취득" },
  { name: "JLPT N2 — 138점", date: "2026.01 취득" },
];

export const ABOUT_CELLS = [
  { n: "01", keyword: "상위 5%의 게임 재능", detail: "오버워치 시즌2 마스터 직전 / 리그오브레전드 에메랄드 / 이터널리턴 미스릴" },
  { n: "02", keyword: "게임 오프라인 행사", detail: "지스타, TGS, PlanX4 등 — 업무가 아니어도 즐겨 찾는 현장" },
  { n: "03", keyword: "J-Pop & 보컬", detail: "일본 록 밴드를 즐겨 듣고, 보컬 트레이닝을 간헐적으로 받고 있습니다" },
  { n: "04", keyword: "학원 강사 경력", detail: "대학 시절 방학마다 국어 학원 파트타임 논술 강사로 활동" },
];

export const STRENGTHS = [
  {
    n: "01",
    keyword: "빠른 학습능력",
    desc: "접해 보지 못한 영역이라도 빠르게 학습하고 적용해냅니다.",
    visual: "bars",
    works: [
      { id: "sql-class", title: "SQL 강의 진행" },
      { id: "sql-auto", title: "SQL 자동 프로세스 구축" },
    ],
    theme: "light",
  },
  {
    n: "02",
    keyword: "다양한 커뮤니케이션 경험",
    desc: "개발, 기술, QA, 회계, 경영진까지 다양한 직군과 협업해 왔습니다.",
    visual: "circles",
    works: [
      { id: "gunsup-comm", title: "건즈업 사업 PM" },
      { id: "modeling-comm", title: "사업모델링 파트" },
    ],
    theme: "dark",
  },
  {
    n: "03",
    keyword: "데이터 활용능력",
    desc: "데이터를 활용하여 게임의 출시 전략과 개선점 및 목표를 제시합니다.",
    visual: "line",
    works: [
      { id: "darkest-cbt", title: "Darkest Days CBT 데이터 분석" },
      { id: "abysdia", title: "Abysdia 초기 리텐션 하락 원인 분석 " },
    ],
    theme: "light",
  },
];
