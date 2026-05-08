import { SKILLS, CERTS } from '../data';
import { Roadmap } from './Roadmap';

export function Home({ onOpenCareer }) {
  return (
    <div className="home-grid">
      <div>
        <div className="card" style={{ padding: 16 }}>
          <div className="photo-slot">
            <span className="corner">Photo · 추가 예정</span>
          </div>
        </div>

        <div className="intro-block">
          <h1 className="intro-headline">
            "인생의 51%는 <span className="accent">게임</span>입니다"
          </h1>
          <ul className="intro-list">
            <li>저는 약 10살 때부터 게임을 했습니다.</li>
            <li>저는 게임을 주제로 하루 종일 이야기할 수 있습니다.</li>
            <li>저는 세상 사람 모두가 게임을 통해 소통할 수 있다고 믿습니다.</li>
            <li>저는 게임 경쟁력의 핵심은 대체 불가능한 요소의 형성이라 생각합니다.</li>
            <li>저는 게임 사업 PM의 역할은 최선을 찾는 효율적 사고가 핵심이라 생각합니다.</li>
          </ul>
        </div>
      </div>

      <div className="right-col">
        <div className="edu-age-row">
          <div className="card edu-card">
            <div>
              <div className="edu-top">
                <div className="edu-mark" aria-hidden="true"><span>Y</span></div>
                <div>
                  <div className="edu-name">
                    연세대학교
                    <small>Yonsei University</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="edu-detail">
              <strong>2016 — 2022</strong> &nbsp;·&nbsp; 경영학부 졸업
            </div>
          </div>

          <div className="card age-card">
            <div className="age-num">
              29<span className="age-label">세</span>
            </div>
            <div className="age-meta">
              <strong>'97</strong>년생 · 만 28세
            </div>
          </div>
        </div>

        <div className="card roadmap-card">
          <div className="rm-header">
            <div>
              <div className="section-eyebrow">Career Roadmap</div>
              <h2 className="section-title">커리어 일대기</h2>
            </div>
            <div className="rm-hint" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <path d="M9 11.5 11 13.5l4.5-5" />
                <circle cx="12" cy="12" r="9" />
              </svg>
              <span>각 항목을 클릭하면 세부 내용을 볼 수 있어요</span>
            </div>
          </div>
          <Roadmap onOpen={onOpenCareer} />
        </div>

        <div className="skills-certs-row">
          <div className="card">
            <div className="section-eyebrow">Core Skills</div>
            <h2 className="section-title">핵심 스킬</h2>
            <div className="skill-scroll" role="list">
              {SKILLS.map((s) => (
                <span key={s} className="skill-tag" role="listitem">
                  <span className="hash">#</span>{s}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-eyebrow">Certifications</div>
            <h2 className="section-title">보유 자격증</h2>
            <ul className="cert-list">
              {CERTS.map((c) => (
                <li key={c.name} className="cert-item">
                  <div className="cert-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div className="cert-text">
                    <div className="cert-name">{c.name}</div>
                    <div className="cert-date">{c.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
