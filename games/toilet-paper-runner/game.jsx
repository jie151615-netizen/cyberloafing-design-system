/* Cyberloafing Arcade — 卷纸狂人 Toilet Paper Runner (mid-risk level)
   Source of truth for this level's mechanics + copy. Compiled to game.js
   (plain React.createElement, no JSX) so it can be loaded via a plain
   <script src> from both the standalone page and the arcade shell with
   no runtime Babel and no fetch/CORS issues over file://.
   Exposes: window.CyberloafingGames.toiletPaperRunner */
(function () {
  const { useState, useRef, useEffect, useCallback } = React;

  const STRINGS = {
    zh: {
      levelName: "卷纸狂人", levelNameEn: "Toilet Paper Runner",
      subtitle: "带薪拉屎 · 以正当理由寻找内心平静",
      tagline: "疯狂点击卷纸，或在触控板/滚轮上向下狂滑——扯出摸鱼的自由。",
      scoreLabel: "带薪积点",
      pointsAtRisk: "冒险中",
      pointsBanked: "已入账",
      speedLabel: "扯纸速度",
      speedSafe: "安全",
      speedDanger: "过快！",
      tearBonus: "扯下一整段！",
      warningTitle: "门外有脚步声！",
      warningBody: "立刻停手，点击冲水伪装！",
      flushButton: "冲水伪装",
      flushIdleHint: "一切正常",
      toastSuccess: "伪装成功，积分安全入账！",
      toastFail: "被敲门催促了，本轮积分清零！",
      footerTip: "提示：扯得越快倍数越高，但脚步声只抓那些不肯收手的人。",
      idleHint: "点击卷纸，开始摸鱼",
    },
    en: {
      levelName: "卷纸狂人", levelNameEn: "Toilet Paper Runner",
      subtitle: "A paid bathroom break, in search of inner peace.",
      tagline: "Click the roll fast, or scroll hard on your trackpad — tear your way to freedom.",
      scoreLabel: "Paid Toilet Points",
      pointsAtRisk: "At risk",
      pointsBanked: "Banked",
      speedLabel: "Pull Speed",
      speedSafe: "SAFE",
      speedDanger: "TOO FAST!",
      tearBonus: "Ripped off a whole sheet!",
      warningTitle: "FOOTSTEPS OUTSIDE!",
      warningBody: "Stop pulling. Hit FLUSH now!",
      flushButton: "FLUSH",
      flushIdleHint: "All quiet",
      toastSuccess: "Nice cover — points banked safely!",
      toastFail: "Caught! Someone's knocking. Round points lost.",
      footerTip: "Tip: pulling faster raises your multiplier, but footsteps come for whoever won't let go.",
      idleHint: "Click the roll to start loafing",
    },
    it: {
      levelName: "卷纸狂人", levelNameEn: "Toilet Paper Runner",
      subtitle: "Una pausa bagno pagata, in cerca di pace interiore.",
      tagline: "Clicca il rotolo a raffica, o scorri in giù sul trackpad — strappa la tua libertà.",
      scoreLabel: "Punti Bagno Pagati",
      pointsAtRisk: "A rischio",
      pointsBanked: "Al sicuro",
      speedLabel: "Velocità di Strappo",
      speedSafe: "SICURO",
      speedDanger: "TROPPO VELOCE!",
      tearBonus: "Strappato un intero foglio!",
      warningTitle: "PASSI FUORI DALLA PORTA!",
      warningBody: "Fermati subito. Premi SCARICA!",
      flushButton: "SCARICA",
      flushIdleHint: "Tutto tranquillo",
      toastSuccess: "Bella copertura, punti al sicuro!",
      toastFail: "Beccato! Bussano alla porta. Punti del turno persi.",
      footerTip: "Consiglio: strappare più veloce alza il moltiplicatore, ma i passi arrivano per chi non molla mai.",
      idleHint: "Clicca il rotolo per iniziare a battere la fiacca",
    },
  };

  const TITLES = {
    low: { zh: "手抖新人 · 只敢轻轻扯", en: "Rookie Tearer — barely dares to tug", it: "Novellino Timido — tira appena appena" },
    mid: { zh: "洗手间哲学家", en: "Restroom Philosopher", it: "Filosofo del Bagno" },
    high: { zh: "带薪拉屎宗师", en: "Paid-Break Grandmaster", it: "Gran Maestro della Pausa Pagata" },
  };
  function pickTitle(score) {
    const tier = score >= 220 ? "high" : score >= 80 ? "mid" : "low";
    return TITLES[tier];
  }

  const RATE_WINDOW_MS = 1000;
  const DANGER_RATE = 6;
  const RATE_TIERS = [{ max: 2, mult: 1 }, { max: 4, mult: 2 }, { max: 6, mult: 3 }, { max: Infinity, mult: 4 }];
  const STRIP_MAX = 190;
  const STRIP_STEP = 15;
  const TEAR_BONUS = 20;
  const WARNING_MIN_DELAY = 7000;
  const WARNING_MAX_DELAY = 13000;
  const WARNING_DURATION = 3200;
  const WHEEL_CHUNK = 34;

  function rateToMult(rate) {
    return (RATE_TIERS.find((t) => rate <= t.max) || RATE_TIERS[RATE_TIERS.length - 1]).mult;
  }

  function PaperRoll({ stripHeight, danger }) {
    const stripTop = 130, stripW = 120, stripX = 60;
    const tornY = stripTop + stripHeight;
    const stripPath =
      `M${stripX},${stripTop} L${stripX + stripW},${stripTop} L${stripX + stripW},${tornY - 9} ` +
      `L${stripX + 100},${tornY} L${stripX + 80},${tornY - 9} L${stripX + 60},${tornY} ` +
      `L${stripX + 40},${tornY - 9} L${stripX + 20},${tornY} L${stripX},${tornY - 9} Z`;
    return (
      <svg viewBox="0 0 240 200" width="100%" style={{ overflow: "visible", display: "block" }}>
        <line x1="30" y1="20" x2="210" y2="20" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="30" cy="20" r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
        <circle cx="210" cy="20" r="7" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" />
        <rect x="50" y="34" width="140" height="64" rx="10" fill="var(--paper-warm)" stroke="var(--ink)" strokeWidth="2.5" />
        <line x1="72" y1="40" x2="72" y2="92" stroke="var(--ink-25)" strokeWidth="2" />
        <line x1="168" y1="40" x2="168" y2="92" stroke="var(--ink-25)" strokeWidth="2" />
        <path d={stripPath} fill={danger ? "var(--coral-wash)" : "var(--mint-wash)"} stroke={danger ? "var(--red)" : "var(--ink)"} strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
    );
  }

  function GameCore({ lang, initialScore = 0, onScoreChange }) {
    const t = STRINGS[lang];

    const [started, setStarted] = useState(false);
    const [banked, setBanked] = useState(initialScore);
    const [pending, setPending] = useState(0);
    const [rate, setRate] = useState(0);
    const [stripHeight, setStripHeight] = useState(0);
    const [warning, setWarning] = useState(false);
    const [warningPct, setWarningPct] = useState(100);
    const [toast, setToast] = useState(null);
    const [floaters, setFloaters] = useState([]);

    const pendingRef = useRef(0);
    const warningRef = useRef(false);
    const pullTimes = useRef([]);
    const rollRef = useRef(null);
    const nextWarningTimeout = useRef(null);
    const warningInterval = useRef(null);
    const warningTimeout = useRef(null);
    const toastTimeout = useRef(null);
    const floaterTimeouts = useRef([]);

    useEffect(() => { pendingRef.current = pending; }, [pending]);
    useEffect(() => { warningRef.current = warning; }, [warning]);
    useEffect(() => { onScoreChange && onScoreChange(banked + pending); }, [banked, pending]);

    const showToast = useCallback((type) => {
      clearTimeout(toastTimeout.current);
      setToast({ id: Math.random(), type });
      toastTimeout.current = setTimeout(() => setToast(null), 2400);
    }, []);

    const clearWarningTimers = () => {
      clearInterval(warningInterval.current);
      clearTimeout(warningTimeout.current);
    };

    const scheduleFootsteps = useCallback(() => {
      clearTimeout(nextWarningTimeout.current);
      const delay = WARNING_MIN_DELAY + Math.random() * (WARNING_MAX_DELAY - WARNING_MIN_DELAY);
      nextWarningTimeout.current = setTimeout(triggerWarning, delay);
    }, []);

    const resolveWarning = useCallback((success) => {
      clearWarningTimers();
      setWarning(false);
      if (success) {
        setBanked((b) => b + pendingRef.current);
        setPending(0);
        showToast("success");
      } else {
        setPending(0);
        showToast("fail");
      }
      scheduleFootsteps();
    }, [scheduleFootsteps, showToast]);

    const triggerWarning = useCallback(() => {
      setWarning(true);
      setWarningPct(100);
      const start = Date.now();
      warningInterval.current = setInterval(() => {
        const pct = Math.max(0, 100 - ((Date.now() - start) / WARNING_DURATION) * 100);
        setWarningPct(pct);
      }, 60);
      warningTimeout.current = setTimeout(() => resolveWarning(false), WARNING_DURATION);
    }, [resolveWarning]);

    const addFloater = useCallback(() => {
      const id = Math.random().toString(36).slice(2);
      const x = Math.random() * 50 - 25;
      setFloaters((f) => [...f, { id, x }]);
      const to = setTimeout(() => setFloaters((f) => f.filter((it) => it.id !== id)), 900);
      floaterTimeouts.current.push(to);
    }, []);

    const registerPull = useCallback(() => {
      if (warningRef.current) { resolveWarning(false); return; }
      if (!started) setStarted(true);
      const now = Date.now();
      pullTimes.current.push(now);
      pullTimes.current = pullTimes.current.filter((ts) => now - ts <= RATE_WINDOW_MS);
      const currentRate = pullTimes.current.length;
      setRate(currentRate);
      const gain = rateToMult(currentRate);
      setPending((p) => p + gain);
      setStripHeight((h) => {
        const nh = h + STRIP_STEP;
        if (nh >= STRIP_MAX) {
          setPending((p) => p + TEAR_BONUS);
          addFloater();
          return 0;
        }
        return nh;
      });
    }, [started, resolveWarning, addFloater]);

    useEffect(() => {
      const iv = setInterval(() => {
        const now = Date.now();
        pullTimes.current = pullTimes.current.filter((ts) => now - ts <= RATE_WINDOW_MS);
        setRate(pullTimes.current.length);
      }, 200);
      return () => clearInterval(iv);
    }, []);

    useEffect(() => {
      if (started) scheduleFootsteps();
      return () => {
        clearTimeout(nextWarningTimeout.current);
        clearWarningTimers();
        clearTimeout(toastTimeout.current);
        floaterTimeouts.current.forEach(clearTimeout);
      };
    }, [started, scheduleFootsteps]);

    useEffect(() => {
      const el = rollRef.current;
      if (!el) return;
      let acc = 0;
      const onWheel = (e) => {
        if (e.deltaY <= 0) return;
        e.preventDefault();
        acc += e.deltaY;
        let ticks = 0;
        while (acc >= WHEEL_CHUNK && ticks < 5) { acc -= WHEEL_CHUNK; ticks++; }
        for (let i = 0; i < ticks; i++) registerPull();
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    }, [registerPull]);

    const danger = rate >= DANGER_RATE;
    const total = banked + pending;

    return (
      <div className="game-core">
        <div className="hud">
          <div className="hud-block">
            <div className="hud-label">{t.scoreLabel}</div>
            <div className="hud-value">{Math.round(total).toLocaleString(lang === "zh" ? "zh-CN" : lang === "it" ? "it-IT" : "en-US")}</div>
            <div className={"hud-sub" + (pending > 0 ? " at-risk" : "")}>
              {pending > 0 ? `${t.pointsAtRisk} +${Math.round(pending)}` : t.pointsBanked}
            </div>
          </div>
          <div className="hud-block">
            <div className="hud-label">{t.speedLabel}</div>
            <div className="speed-bar">
              <div className="speed-fill" style={{
                transform: `scaleX(${Math.min(1, rate / (DANGER_RATE + 2))})`,
                background: danger ? "var(--red)" : rate >= DANGER_RATE - 2 ? "var(--coral)" : "var(--mint)",
              }} />
            </div>
            <div className={"hud-sub" + (danger ? " danger-tag" : "")}>{danger ? t.speedDanger : t.speedSafe}</div>
          </div>
        </div>

        <div className="toast-zone" aria-live="polite">
          {toast && <div className={"toast " + toast.type}>{toast.type === "success" ? t.toastSuccess : t.toastFail}</div>}
        </div>

        <div className="roll-stage">
          <div
            ref={rollRef}
            className={"roll" + (danger ? " danger" : "")}
            onPointerDown={registerPull}
            onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); registerPull(); } }}
            role="button" tabIndex={0} aria-label={t.idleHint}
          >
            <PaperRoll stripHeight={stripHeight} danger={danger} />
            {floaters.map((f) => (
              <span key={f.id} className="floater" style={{ left: `calc(50% + ${f.x}px)` }}>{t.tearBonus}</span>
            ))}
            {!started && <div className="idle-hint">{t.idleHint}</div>}
          </div>
        </div>

        <div className="alert-zone" aria-live="assertive">
          {warning && (
            <div className="warning-banner">
              <div className="warning-title">{t.warningTitle}</div>
              <div className="warning-body">{t.warningBody}</div>
              <div className="warning-bar"><div className="warning-bar-fill" style={{ width: warningPct + "%" }} /></div>
            </div>
          )}
        </div>

        <div className="flush-row">
          <button
            className={"flush-btn" + (warning ? " armed" : "")}
            disabled={!warning}
            onClick={() => { if (warning) resolveWarning(true); }}
          >
            {t.flushButton}
          </button>
          {!warning && <div className="flush-hint">{t.flushIdleHint}</div>}
        </div>

        <p className="footer-tip">{t.footerTip}</p>
      </div>
    );
  }

  window.CyberloafingGames = window.CyberloafingGames || {};
  window.CyberloafingGames.toiletPaperRunner = {
    key: "mid",
    accent: "var(--coral)",
    accentWash: "var(--coral-wash)",
    Strings: STRINGS,
    pickTitle,
    GameCore,
  };
})();
