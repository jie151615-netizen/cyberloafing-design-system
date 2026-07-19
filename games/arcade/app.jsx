/* Cyberloafing Arcade — shell that hosts all three levels.
   Owns: the one shared 中/EN/IT switch, the level tabs, per-level score
   memory (so switching tabs doesn't wipe progress), and the shared
   "clock out" / game-over result screen with its funny title ladder.
   Expects window.CyberloafingGames.{waterWanderer, toiletPaperRunner,
   biscuitStealth} to already be loaded (see the three game.js files). */
(function () {
  const { useState, useCallback } = React;

  // TODO(integration): replace HOME_URL with the real site homepage once this
  // arcade is embedded — every other place a "home" link is needed reads from
  // this one constant.
  const HOME_URL = "#";

  const SHARED = {
    zh: { arcadeTag: "赛博摸鱼街机厅", arcadeSubtitle: "选一关，开始你的带薪摸鱼。", homeButton: "返回主页", clockOutButton: "下班结算", resultScoreLabel: "本轮带薪积分", playAgainButton: "再摸一轮" },
    en: { arcadeTag: "Cyberloafing Arcade", arcadeSubtitle: "Pick a level and start clocking paid rest.", homeButton: "HOME", clockOutButton: "CLOCK OUT", resultScoreLabel: "This shift's points", playAgainButton: "PLAY AGAIN" },
    it: { arcadeTag: "Sala Giochi del Fannullone", arcadeSubtitle: "Scegli un livello e inizia il tuo riposo pagato.", homeButton: "HOME", clockOutButton: "STACCA E CONTA", resultScoreLabel: "Punti di questo turno", playAgainButton: "GIOCA ANCORA" },
  };

  function numLocale(lang) { return lang === "zh" ? "zh-CN" : lang === "it" ? "it-IT" : "en-US"; }

  function FishMark({ size = 28, color = "var(--ink)" }) {
    return (
      <svg width={size} height={(size * 86) / 280} viewBox="-3 -3 286 92" fill="none" style={{ display: "block" }}>
        <g stroke={color} strokeWidth="6" fill="none" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path d="M0 0 L30 43 L0 86 Z" />
          <path d="M28 43 C58 20 118 4 167 5 C212 6 252 22 279 38 C281 42 281 44 279 48 C252 64 212 80 167 81 C118 82 58 66 28 43 Z" />
          <path d="M230 15 Q214 43 230 72" />
        </g>
        <circle cx="252" cy="39" r="5" fill={color} />
      </svg>
    );
  }

  function App() {
    const G = window.CyberloafingGames;
    const GAMES = [
      { key: "light", mod: G.waterWanderer },
      { key: "mid", mod: G.toiletPaperRunner },
      { key: "heavy", mod: G.biscuitStealth },
    ];

    const [lang, setLang] = useState("zh");
    const [activeKey, setActiveKey] = useState("mid");
    const [scores, setScores] = useState({ light: 0, mid: 0, heavy: 0 });
    const [resetKeys, setResetKeys] = useState({ light: 0, mid: 0, heavy: 0 });
    const [resultModal, setResultModal] = useState(null); // { levelKey, score, caught }

    const s = SHARED[lang];
    const active = GAMES.find((g) => g.key === activeKey);
    const activeT = active.mod.Strings[lang];

    const endRound = useCallback((levelKey, score, caught) => {
      setResultModal({ levelKey, score, caught: !!caught });
      setScores((sc) => ({ ...sc, [levelKey]: 0 }));
      setResetKeys((rk) => ({ ...rk, [levelKey]: rk[levelKey] + 1 }));
    }, []);

    const GameComp = active.mod.GameCore;
    const gameProps = { lang, initialScore: scores[activeKey], onScoreChange: (v) => setScores((sc) => ({ ...sc, [activeKey]: v })) };
    if (activeKey === "heavy") gameProps.onGameOver = (finalScore) => endRound("heavy", finalScore, true);

    return (
      <div className="page">
        <header className="header">
          <div className="brand-group">
            <a className="home-btn" href={HOME_URL}>{s.homeButton}</a>
            <div className="brand"><FishMark /><span>{s.arcadeTag}</span></div>
          </div>
          <div className="lang-switch" role="group" aria-label="Language / 语言 / Lingua">
            {["zh", "en", "it"].map((code) => (
              <button key={code} className={"lang-btn" + (lang === code ? " active" : "")}
                onClick={() => setLang(code)} aria-pressed={lang === code}
                aria-label={code === "zh" ? "中文" : code === "en" ? "English" : "Italiano"}>
                {code === "zh" ? "中" : code.toUpperCase()}
              </button>
            ))}
          </div>
        </header>

        <p className="arcade-subtitle">{s.arcadeSubtitle}</p>

        <div className="tabs" role="tablist">
          {GAMES.map((g) => (
            <button key={g.key} role="tab" aria-selected={activeKey === g.key}
              className={"tab-btn" + (activeKey === g.key ? " active" : "")}
              style={activeKey === g.key ? { borderColor: g.mod.accent, background: g.mod.accentWash } : undefined}
              onClick={() => setActiveKey(g.key)}>
              <span className="tab-dot" style={{ background: g.mod.accent }} />
              {g.mod.Strings[lang].levelNameEn}
            </button>
          ))}
        </div>

        <div className="masthead">
          <h1 className="wordmark" style={{ fontSize: "clamp(26px, 6vw, 44px)" }}>{activeT.levelNameEn}</h1>
          <p className="subtitle">{activeT.subtitle}</p>
          <p className="tagline">{activeT.tagline}</p>
        </div>

        <GameComp key={activeKey + "-" + resetKeys[activeKey]} {...gameProps} />

        {activeKey !== "heavy" && (
          <div className="clock-out-row">
            <button className="clock-out-btn" onClick={() => endRound(activeKey, scores[activeKey], false)}>
              {s.clockOutButton}
            </button>
          </div>
        )}

        {resultModal && (() => {
          const mod = GAMES.find((g) => g.key === resultModal.levelKey).mod;
          const mt = mod.Strings[lang];
          const title = mod.pickTitle(resultModal.score)[lang];
          return (
            <div className="result-overlay">
              <div className="result-card">
                {resultModal.caught && (
                  <>
                    <div className="result-caught-title">{mt.caughtTitle}</div>
                    <div className="result-caught-body">{mt.caughtBody}</div>
                  </>
                )}
                <div className="result-score-label">{s.resultScoreLabel}</div>
                <div className="result-score-value">{Math.round(resultModal.score).toLocaleString(numLocale(lang))}</div>
                <div className="result-title">{title}</div>
                <div className="result-actions">
                  <button className="flush-btn armed" onClick={() => setResultModal(null)}>{s.playAgainButton}</button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
