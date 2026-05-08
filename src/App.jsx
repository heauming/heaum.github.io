import { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { Home } from './components/Home';
import { About } from './components/About';
import { Work } from './components/Work';
import { SqlClassDetail } from './components/SqlClassDetail';
import { SqlAutoDetail } from './components/SqlAutoDetail';
import { GunsupCommDetail } from './components/GunsupCommDetail';
import { DarkestDaysCBTDetail } from './components/DarkestDaysCBTDetail';
import { AbysdiaDetail } from './components/AbysdiaDetail';
import { ModelingDetail } from './components/ModelingDetail';

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

function WorkDetail({ work, onBack }) {
  if (work.id === "sql-class") return <SqlClassDetail onBack={onBack} />;
  if (work.id === "sql-auto") return <SqlAutoDetail onBack={onBack} />;
  if (work.id === "gunsup-comm") return <GunsupCommDetail onBack={onBack} />;
  if (work.id === "darkest-cbt") return <DarkestDaysCBTDetail onBack={onBack} />;
  if (work.id === "abysdia") return <AbysdiaDetail onBack={onBack} />;
  if (work.id === "modeling-comm") return <ModelingDetail onBack={onBack} />;
  return (
    <div className="card placeholder-screen">
      <div>
        <div className="ph-eyebrow">Work · 작업물</div>
        <h2>{work.title}</h2>
        <p>
          이 작업물의 세부 영역은 추후 작성될 예정입니다.<br />
          상단의 Work 탭으로 돌아가 다른 작업물을 확인하실 수 있습니다.
        </p>
        <button className="btn-back" onClick={onBack}>← Work로 돌아가기</button>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [careerOpen, setCareerOpen] = useState(null);
  const [activeWork, setActiveWork] = useState(null);

  const handleSetView = (v) => {
    setView(v);
    setActiveWork(null);
    setCareerOpen(null);
  };

  return (
    <>
      <TopNav view={view} setView={handleSetView} />
      <main className="page">
        {activeWork ? (
          <WorkDetail work={activeWork} onBack={() => setActiveWork(null)} />
        ) : view === "home" ? (
          <Home onOpenCareer={setCareerOpen} />
        ) : view === "about" ? (
          <About />
        ) : (
          <Work onOpenWork={setActiveWork} />
        )}
      </main>

      <Modal open={!!careerOpen} onClose={() => setCareerOpen(null)}>
        {careerOpen && (
          <>
            <div className="modal-eyebrow">{careerOpen.detail.eyebrow} · {careerOpen.date}</div>
            <h3 className="modal-title">{careerOpen.detail.heading}</h3>
            <div className="modal-body">{careerOpen.detail.body}</div>
          </>
        )}
      </Modal>
    </>
  );
}
