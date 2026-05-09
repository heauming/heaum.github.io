import { ABOUT_CELLS } from '../data';
import first from '../assets/first.jpg';
import second from '../assets/second.jpg';
import third from '../assets/third.jpg';
import fourth from '../assets/fourth.jpg';

export function About() {
  const sections = [
    { eyebrow: "WHERE I'M FROM", heading: "나의 출신", body: "경상남도에서 태어나 고등학교까지 부산에서 보낸 후, 서울에서 현재까지 생활하고 있습니다." },
    { eyebrow: "WHAT I USED TO", heading: "성장 배경", body: "어릴 적부터 노바1492, 세븐나이츠 등 장르를 가리지 않고 다양한 게임을 즐겨 왔습니다. 학생 때 지스타도 세 차례 방문하는 등 게임에 대한 관심이 어릴 적부터 꾸준히 이어왔고, 대학 진학 후에는 과 대항전 오버워치 대회에도 출전할 정도로 게임에 진심이었습니다. 이후 경영학과로서 게임 산업에 기여할 수 있는 사업 PM의 진로를 결심하게 되었습니다." },
    { eyebrow: "WHAT I DO NOW", heading: "지금 하고 있는 일", body: "현재 NHN의 데이터 사업 PM으로서 게임 데이터와 관련된 업무 전반을 도맡고 있습니다. 런칭 전·후의 DB 스키마 설계, 정합성 검증, KPI 설정, 데이터 분석 등 기술과 사업의 가교 역할을 수행 중입니다. 최근에는 사내에 AI 툴을 전파하는 역할도 함께 맡고 있습니다." },
    { eyebrow: "WHAT I'M LOOKING FOR", heading: "목표", body: "보고와 데이터 정리처럼 자동화 가능한 영역은 AI에 위임하고, 게임의 본질인 경쟁력 확보와 시장 전략 수립 같은 크리에이티브 영역에 집중할 수 있는 환경에 관심이 큽니다. 언어의 장벽을 넘어 전 세계 유저가 함께 즐기는 게임의 일원이 되고 싶습니다." },
  ];
  const aboutImages = [first, second, third, fourth];

  return (
    <div className="about-grid">
      <div className="about-left">
        {sections.map((s) => (
          <div key={s.eyebrow} className="card about-section">
            <div className="about-eyebrow">{s.eyebrow}</div>
            <h3>{s.heading}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>

      <div className="about-grid-cells">
        {ABOUT_CELLS.map((c, index) => (
          <div key={c.n} className="about-cell">
            <div className="cell-photo">
                <img
                  src={aboutImages[index]}
                  alt={c.keyword}
                  className="about-photo"
                />
              
                <span className="ph-num">{c.n}</span>
              </div>
            <div className="cell-text">
              <div className="cell-keyword">{c.keyword}</div>
              <div className="cell-detail">{c.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
