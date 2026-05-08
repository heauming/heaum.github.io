import { useState } from 'react';

export function TopNav({ view, setView }) {
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "work", label: "Work" },
  ];
  return (
    <header className="top-nav">
      <div className="top-nav-inner">
        <div className="brand-mark">
          황진흠<span className="dot">.</span>
          <span style={{ marginLeft: 8, color: "var(--fg-disabled)", fontWeight: 400, fontSize: 13 }}>
            Game Business PM
          </span>
        </div>
        <nav className="nav-boxes" aria-label="primary">
          {items.map((it) => (
            <button
              key={it.key}
              className={"nav-box" + (view === it.key ? " is-active" : "")}
              onClick={() => setView(it.key)}
              aria-current={view === it.key ? "page" : undefined}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
