// Compiled from game.jsx — do not hand-edit, edit the .jsx source and recompile.
/* Cyberloafing Arcade — 偷吃大作战 Biscuit Stealth (heavy-risk level)
   Hold to eat while the teacher/boss's back is turned. A brief warning
   flash precedes every turn-around; still holding when they turn means
   an immediate, real game over. The only level in the arcade with a
   hard fail state — everything is banked at once, or lost at once.
   Exposes: window.CyberloafingGames.biscuitStealth */
(function () {
  const {
    useState,
    useRef,
    useEffect,
    useCallback
  } = React;
  const STRINGS = {
    zh: {
      levelName: "偷吃大作战",
      levelNameEn: "Biscuit Stealth",
      subtitle: "上课偷吃饼干 · 刀尖起舞的快乐",
      tagline: "老师背对你时按住偷吃，看到预警立刻松手！",
      scoreLabel: "咀嚼满足度",
      eatButton: "按住偷吃",
      eatHint: "（或按住空格键）",
      preWarnLabel: "危险预警！",
      turnedLabel: "老师回头了！",
      safeToast: "低头认真写字，逃过一劫！",
      caughtTitle: "当场抓包！",
      caughtBody: "老师转身的瞬间，你还叼着饼干。",
      idleHint: "按住开始偷吃，见到预警赶紧松手",
      footerTip: "提示：这一关只要抓包一次就直接结束，稳住手，别贪。"
    },
    en: {
      levelName: "偷吃大作战",
      levelNameEn: "Biscuit Stealth",
      subtitle: "Sneaking biscuits in class — joy on a knife's edge.",
      tagline: "Hold to eat while their back is turned — let go the instant you see the warning!",
      scoreLabel: "Chewing Satisfaction",
      eatButton: "HOLD TO EAT",
      eatHint: "(or hold Space)",
      preWarnLabel: "WARNING!",
      turnedLabel: "TURNED AROUND!",
      safeToast: "Head down, writing hard — you got away with it!",
      caughtTitle: "CAUGHT RED-HANDED!",
      caughtBody: "The teacher turned around mid-bite.",
      idleHint: "Hold to start eating — let go the second you see a warning",
      footerTip: "Tip: one slip here ends the run — steady hands, don't get greedy."
    },
    it: {
      levelName: "偷吃大作战",
      levelNameEn: "Biscuit Stealth",
      subtitle: "Biscotti di nascosto in classe — gioia sul filo del rasoio.",
      tagline: "Tieni premuto mentre non ti guarda — lascia subito al primo avviso!",
      scoreLabel: "Soddisfazione da Masticazione",
      eatButton: "TIENI PREMUTO",
      eatHint: "(o tieni premuto Spazio)",
      preWarnLabel: "ATTENZIONE!",
      turnedLabel: "SI È GIRATO!",
      safeToast: "Testa bassa, scrivi forte — te la sei cavata!",
      caughtTitle: "BECCATO SUL FATTO!",
      caughtBody: "L'insegnante si è girato a metà morso.",
      idleHint: "Tieni premuto per iniziare — lascia subito all'avviso",
      footerTip: "Consiglio: un solo errore finisce la partita — mano ferma, non essere ingordo."
    }
  };
  const TITLES = {
    low: {
      zh: "手速拖延症患者",
      en: "Slow-Hand Procrastinator",
      it: "Procrastinatore dalle Mani Lente"
    },
    mid: {
      zh: "刀尖漫步者",
      en: "Knife-Edge Wanderer",
      it: "Viandante sul Filo del Rasoio"
    },
    high: {
      zh: "绝命毒师级摸鱼仙人",
      en: "Breaking-Bad Slacker Immortal",
      it: "Immortale Fannullone alla Breaking-Bad"
    }
  };
  function pickTitle(score) {
    const tier = score >= 150 ? "high" : score >= 50 ? "mid" : "low";
    return TITLES[tier];
  }
  const EAT_TICK_MS = 100;
  const EAT_STEP = 1;
  const TURN_MIN_DELAY = 4000;
  const TURN_MAX_DELAY = 9000;
  const PRE_WARN_MS = 450;
  const SAFE_PAUSE_MS = 1100;
  const CAUGHT_FLASH_MS = 1300;
  function BossFigure({
    turned,
    preWarn,
    eating
  }) {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 200 240",
      width: "100%",
      style: {
        overflow: "visible",
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "52",
      r: "24",
      fill: "var(--paper-warm)",
      stroke: "var(--ink)",
      strokeWidth: "2.5"
    }), turned ? /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement("circle", {
      cx: "91",
      cy: "50",
      r: "2.6",
      fill: "var(--ink)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "109",
      cy: "50",
      r: "2.6",
      fill: "var(--ink)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M90,62 Q100,68 110,62",
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "2.2",
      strokeLinecap: "round"
    })) : /*#__PURE__*/React.createElement("line", {
      x1: "100",
      y1: "30",
      x2: "100",
      y2: "74",
      stroke: "var(--ink-25)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M62,84 Q100,64 138,84 L148,220 L52,220 Z",
      fill: "var(--paper-warm)",
      stroke: "var(--ink)",
      strokeWidth: "2.5",
      strokeLinejoin: "round"
    }), preWarn && /*#__PURE__*/React.createElement("g", {
      transform: "translate(148,26)"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M0,18 L16,18 L8,0 Z",
      fill: "var(--red)",
      stroke: "var(--ink)",
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "6.5",
      y: "6",
      width: "3",
      height: "6",
      fill: "var(--paper)"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "6.5",
      y: "14",
      width: "3",
      height: "2.4",
      fill: "var(--paper)"
    })), /*#__PURE__*/React.createElement("g", {
      transform: eating && !turned ? "translate(0,-6)" : "translate(0,0)",
      style: {
        transition: "transform 120ms ease"
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: "66",
      y: "150",
      width: "68",
      height: "46",
      rx: "4",
      fill: "var(--red-tint)",
      stroke: "var(--ink)",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "100",
      y1: "150",
      x2: "100",
      y2: "196",
      stroke: "var(--ink)",
      strokeWidth: "1.6"
    })));
  }
  function GameCore({
    lang,
    onGameOver
  }) {
    const t = STRINGS[lang];
    const [eating, setEating] = useState(false);
    const [turned, setTurned] = useState(false);
    const [preWarn, setPreWarn] = useState(false);
    const [score, setScore] = useState(0);
    const [toast, setToast] = useState(null);
    const [caught, setCaught] = useState(false);
    const [started, setStarted] = useState(false);
    const eatingRef = useRef(false);
    const turnedRef = useRef(false);
    const scoreRef = useRef(0);
    const eatInterval = useRef(null);
    const turnTimeout = useRef(null);
    const preWarnTimeout = useRef(null);
    const safeResumeTimeout = useRef(null);
    const caughtFlashTimeout = useRef(null);
    const toastTimeout = useRef(null);
    useEffect(() => {
      eatingRef.current = eating;
    }, [eating]);
    useEffect(() => {
      turnedRef.current = turned;
    }, [turned]);
    useEffect(() => {
      scoreRef.current = score;
    }, [score]);
    const showToast = useCallback(type => {
      clearTimeout(toastTimeout.current);
      setToast({
        id: Math.random(),
        type
      });
      toastTimeout.current = setTimeout(() => setToast(null), 1800);
    }, []);
    const scheduleTurn = useCallback(() => {
      clearTimeout(turnTimeout.current);
      const delay = TURN_MIN_DELAY + Math.random() * (TURN_MAX_DELAY - TURN_MIN_DELAY);
      turnTimeout.current = setTimeout(() => {
        setPreWarn(true);
        preWarnTimeout.current = setTimeout(() => {
          setPreWarn(false);
          setTurned(true);
          if (eatingRef.current) {
            setCaught(true);
            setEating(false);
            return;
          }
          showToast("safe");
          safeResumeTimeout.current = setTimeout(() => {
            setTurned(false);
            scheduleTurn();
          }, SAFE_PAUSE_MS);
        }, PRE_WARN_MS);
      }, delay);
    }, [onGameOver, showToast]);
    const startEating = useCallback(() => {
      if (caught || turnedRef.current) return;
      if (!started) setStarted(true);
      setEating(true);
    }, [caught, started]);
    const stopEating = useCallback(() => setEating(false), []);
    useEffect(() => {
      eatInterval.current = setInterval(() => {
        if (eatingRef.current && !turnedRef.current) setScore(s => s + EAT_STEP);
      }, EAT_TICK_MS);
      return () => clearInterval(eatInterval.current);
    }, []);
    useEffect(() => {
      if (started && !caught) scheduleTurn();
      return () => {
        clearTimeout(turnTimeout.current);
        clearTimeout(preWarnTimeout.current);
        clearTimeout(safeResumeTimeout.current);
        clearTimeout(toastTimeout.current);
      };
    }, [started, caught, scheduleTurn]);

    // Owns the caught -> onGameOver handoff by itself so the turn-scheduling
    // effect's cleanup (which also reacts to `caught` changing) can't race it
    // and cancel the timeout before it fires.
    useEffect(() => {
      if (!caught) return;
      caughtFlashTimeout.current = setTimeout(() => {
        onGameOver && onGameOver(Math.round(scoreRef.current));
      }, CAUGHT_FLASH_MS);
      return () => clearTimeout(caughtFlashTimeout.current);
    }, [caught, onGameOver]);
    useEffect(() => {
      const onKeyDown = e => {
        if (e.key === " ") {
          e.preventDefault();
          startEating();
        }
      };
      const onKeyUp = e => {
        if (e.key === " ") {
          e.preventDefault();
          stopEating();
        }
      };
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
      return () => {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("keyup", onKeyUp);
      };
    }, [startEating, stopEating]);
    return /*#__PURE__*/React.createElement("div", {
      className: "game-core"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud-block",
      style: {
        maxWidth: 480,
        flex: "1 1 100%"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud-label"
    }, t.scoreLabel), /*#__PURE__*/React.createElement("div", {
      className: "hud-value"
    }, Math.round(score).toLocaleString(lang === "zh" ? "zh-CN" : lang === "it" ? "it-IT" : "en-US")))), /*#__PURE__*/React.createElement("div", {
      className: "toast-zone",
      "aria-live": "polite"
    }, toast && /*#__PURE__*/React.createElement("div", {
      className: "toast success"
    }, t.safeToast)), /*#__PURE__*/React.createElement("div", {
      className: "roll-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "roll",
      style: {
        cursor: "default"
      }
    }, /*#__PURE__*/React.createElement(BossFigure, {
      turned: turned,
      preWarn: preWarn,
      eating: eating
    }), !started && /*#__PURE__*/React.createElement("div", {
      className: "idle-hint"
    }, t.idleHint))), /*#__PURE__*/React.createElement("div", {
      className: "alert-zone",
      "aria-live": "assertive"
    }, preWarn && /*#__PURE__*/React.createElement("div", {
      className: "warning-banner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "warning-title"
    }, t.preWarnLabel)), turned && !preWarn && !caught && /*#__PURE__*/React.createElement("div", {
      className: "warning-banner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "warning-title"
    }, t.turnedLabel))), /*#__PURE__*/React.createElement("div", {
      className: "flush-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "flush-btn armed" + (turned || caught ? " disabled-look" : ""),
      disabled: turned || caught,
      onPointerDown: startEating,
      onPointerUp: stopEating,
      onPointerLeave: stopEating,
      style: {
        background: "var(--red)",
        borderColor: "var(--red)",
        color: "var(--paper)"
      }
    }, t.eatButton), /*#__PURE__*/React.createElement("div", {
      className: "flush-hint"
    }, t.eatHint)), /*#__PURE__*/React.createElement("p", {
      className: "footer-tip"
    }, t.footerTip), caught && /*#__PURE__*/React.createElement("div", {
      className: "caught-overlay"
    }, /*#__PURE__*/React.createElement("div", {
      className: "caught-title"
    }, t.caughtTitle), /*#__PURE__*/React.createElement("div", {
      className: "caught-body"
    }, t.caughtBody)));
  }
  window.CyberloafingGames = window.CyberloafingGames || {};
  window.CyberloafingGames.biscuitStealth = {
    key: "heavy",
    accent: "var(--red)",
    accentWash: "var(--red-tint)",
    Strings: STRINGS,
    pickTitle,
    GameCore
  };
})();
