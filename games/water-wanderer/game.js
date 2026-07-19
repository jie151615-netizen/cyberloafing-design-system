// Compiled from game.jsx — do not hand-edit, edit the .jsx source and recompile.
/* Cyberloafing Arcade — 无限接水 Water Wanderer (light-risk level)
   Hold to fill a mini teacup; a colleague or the boss's glance randomly
   interrupts and must be matched with the right cover story in time.
   Very low stakes: a spill only costs the cup in progress, never the
   seconds you've already logged. Compiled to game.js (see game.jsx
   sibling files in this project for the same pattern).
   Exposes: window.CyberloafingGames.waterWanderer */
(function () {
  const {
    useState,
    useRef,
    useEffect,
    useCallback
  } = React;
  const STRINGS = {
    zh: {
      levelName: "无限接水",
      levelNameEn: "Water Wanderer",
      subtitle: "迷你小茶杯 · 高频接水的自由",
      tagline: "按住接水，用正当理由撑过同事和老板的余光。",
      scoreLabel: "摸鱼合法时长",
      unitSuffix: "秒",
      pointsBanked: "已计入",
      fillLabel: "水杯进度",
      fillButton: "接水",
      freshCupBonus: "满杯换新，奖励时长！",
      interrupt: {
        colleague: {
          title: "同事走过来了！",
          body: "点【假装聊工作】，稳住别慌！"
        },
        boss: {
          title: "老板的余光扫过来了！",
          body: "点【假装看打印机】，稳住别慌！"
        }
      },
      chatButton: "假装聊工作",
      printerButton: "假装看打印机",
      toastSuccess: "完美掩护，接着接水！",
      toastFail: "水洒了，这杯重新开始。",
      idleHint: "按住按钮，开始接水",
      footerTip: "提示：这一关容错率很高，已计入的时长几乎不会被扣掉，放心摸。"
    },
    en: {
      levelName: "无限接水",
      levelNameEn: "Water Wanderer",
      subtitle: "A mini teacup, and the freedom of one more water run.",
      tagline: "Hold to fill your cup — outlast the colleague and the boss's glance.",
      scoreLabel: "Slacker Seconds",
      unitSuffix: "s",
      pointsBanked: "Logged",
      fillLabel: "Cup Fill",
      fillButton: "FILL WATER",
      freshCupBonus: "Fresh cup — bonus seconds!",
      interrupt: {
        colleague: {
          title: "A COLLEAGUE IS COMING!",
          body: "Hit CHAT ABOUT WORK before it's too late!"
        },
        boss: {
          title: "THE BOSS IS GLANCING OVER!",
          body: "Hit CHECK THE PRINTER before it's too late!"
        }
      },
      chatButton: "CHAT ABOUT WORK",
      printerButton: "CHECK THE PRINTER",
      toastSuccess: "Perfect cover — keep filling!",
      toastFail: "Spilled! This cup starts over.",
      idleHint: "Hold the button to start filling",
      footerTip: "Tip: this level is very forgiving — seconds you've already logged are almost never taken away."
    },
    it: {
      levelName: "无限接水",
      levelNameEn: "Water Wanderer",
      subtitle: "Una tazzina mini, la libertà di un'altra ricarica d'acqua.",
      tagline: "Tieni premuto per riempire la tazza — resisti al collega e allo sguardo del capo.",
      scoreLabel: "Secondi da Fannullone",
      unitSuffix: "s",
      pointsBanked: "Registrati",
      fillLabel: "Livello Tazza",
      fillButton: "RIEMPI",
      freshCupBonus: "Tazza nuova — secondi bonus!",
      interrupt: {
        colleague: {
          title: "STA ARRIVANDO UN COLLEGA!",
          body: "Premi PARLA DI LAVORO prima che sia tardi!"
        },
        boss: {
          title: "IL CAPO STA GUARDANDO!",
          body: "Premi CONTROLLA LA STAMPANTE prima che sia tardi!"
        }
      },
      chatButton: "PARLA DI LAVORO",
      printerButton: "CONTROLLA LA STAMPANTE",
      toastSuccess: "Copertura perfetta — continua a riempire!",
      toastFail: "Versato! Questa tazza ricomincia.",
      idleHint: "Tieni premuto il pulsante per iniziare",
      footerTip: "Consiglio: questo livello è molto indulgente — i secondi già registrati quasi non si perdono mai."
    }
  };
  const TITLES = {
    low: {
      zh: "茶水间新手",
      en: "Water-Cooler Newbie",
      it: "Novizio della Fontanella"
    },
    mid: {
      zh: "饮水机守护神",
      en: "Water Cooler God",
      it: "Dio della Fontanella"
    },
    high: {
      zh: "接水传奇 · 永动摸鱼机",
      en: "Legendary Refill Machine",
      it: "Macchina Leggendaria del Fannullone"
    }
  };
  function pickTitle(score) {
    const tier = score >= 90 ? "high" : score >= 30 ? "mid" : "low";
    return TITLES[tier];
  }
  const FILL_TICK_MS = 250;
  const FILL_STEP = 6; // % per tick
  const SECONDS_PER_TICK = FILL_TICK_MS / 1000;
  const FRESH_CUP_BONUS = 5;
  const INTERRUPT_MIN_DELAY = 3000;
  const INTERRUPT_MAX_DELAY = 7000;
  const INTERRUPT_WINDOW_MS = 1500;
  function CoolerRig({
    fillPct
  }) {
    const cupTop = 140,
      cupBottom = 230,
      cupH = cupBottom - cupTop;
    const waterH = fillPct / 100 * cupH;
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 200 240",
      width: "100%",
      style: {
        overflow: "visible",
        display: "block"
      }
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("clipPath", {
      id: "cupClip"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M70,140 L130,140 L120,230 L80,230 Z"
    }))), /*#__PURE__*/React.createElement("ellipse", {
      cx: "100",
      cy: "38",
      rx: "26",
      ry: "32",
      fill: "var(--mint-wash)",
      stroke: "var(--ink)",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "76",
      y: "66",
      width: "48",
      height: "58",
      rx: "8",
      fill: "var(--paper-warm)",
      stroke: "var(--ink)",
      strokeWidth: "2.5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "93",
      y: "122",
      width: "14",
      height: "10",
      fill: "var(--paper)",
      stroke: "var(--ink)",
      strokeWidth: "2"
    }), /*#__PURE__*/React.createElement("g", {
      clipPath: "url(#cupClip)"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "70",
      y: cupBottom - waterH,
      width: "60",
      height: waterH,
      fill: "var(--mint)"
    })), /*#__PURE__*/React.createElement("path", {
      d: "M70,140 L130,140 L120,230 L80,230 Z",
      fill: "none",
      stroke: "var(--ink)",
      strokeWidth: "2.5",
      strokeLinejoin: "round"
    }));
  }
  function GameCore({
    lang,
    initialScore = 0,
    onScoreChange
  }) {
    const t = STRINGS[lang];
    const [started, setStarted] = useState(false);
    const [filling, setFilling] = useState(false);
    const [fillPct, setFillPct] = useState(0);
    const [seconds, setSeconds] = useState(initialScore);
    const [interrupt, setInterrupt] = useState(null); // { type, pct }
    const [toast, setToast] = useState(null);
    const [floaters, setFloaters] = useState([]);
    const fillingRef = useRef(false);
    const interruptRef = useRef(null);
    const fillInterval = useRef(null);
    const interruptTimeout = useRef(null);
    const interruptTickInterval = useRef(null);
    const interruptDeadlineTimeout = useRef(null);
    const toastTimeout = useRef(null);
    const floaterTimeouts = useRef([]);
    useEffect(() => {
      fillingRef.current = filling;
    }, [filling]);
    useEffect(() => {
      interruptRef.current = interrupt;
    }, [interrupt]);
    useEffect(() => {
      onScoreChange && onScoreChange(seconds);
    }, [seconds]);
    const showToast = useCallback(type => {
      clearTimeout(toastTimeout.current);
      setToast({
        id: Math.random(),
        type
      });
      toastTimeout.current = setTimeout(() => setToast(null), 2200);
    }, []);
    const addFloater = useCallback(() => {
      const id = Math.random().toString(36).slice(2);
      const x = Math.random() * 50 - 25;
      setFloaters(f => [...f, {
        id,
        x
      }]);
      const to = setTimeout(() => setFloaters(f => f.filter(it => it.id !== id)), 900);
      floaterTimeouts.current.push(to);
    }, []);
    const clearInterruptTimers = () => {
      clearInterval(interruptTickInterval.current);
      clearTimeout(interruptDeadlineTimeout.current);
    };
    const spill = useCallback(() => {
      clearInterruptTimers();
      setInterrupt(null);
      setFillPct(0);
      showToast("fail");
    }, [showToast]);
    const clearGameplayInterval = () => clearInterval(fillInterval.current);
    const scheduleInterrupt = useCallback(() => {
      clearTimeout(interruptTimeout.current);
      const delay = INTERRUPT_MIN_DELAY + Math.random() * (INTERRUPT_MAX_DELAY - INTERRUPT_MIN_DELAY);
      interruptTimeout.current = setTimeout(() => {
        if (!fillingRef.current) {
          scheduleInterrupt();
          return;
        }
        const type = Math.random() < 0.5 ? "colleague" : "boss";
        setInterrupt({
          type,
          pct: 100
        });
        const start = Date.now();
        interruptTickInterval.current = setInterval(() => {
          const pct = Math.max(0, 100 - (Date.now() - start) / INTERRUPT_WINDOW_MS * 100);
          setInterrupt(cur => cur ? {
            ...cur,
            pct
          } : cur);
        }, 60);
        interruptDeadlineTimeout.current = setTimeout(spill, INTERRUPT_WINDOW_MS);
      }, delay);
    }, [spill]);
    const resolveInterrupt = useCallback(chosen => {
      const cur = interruptRef.current;
      if (!cur) return;
      clearInterruptTimers();
      if (chosen === cur.type) {
        setInterrupt(null);
        setSeconds(s => s + 3);
        showToast("success");
      } else {
        spill();
      }
      scheduleInterrupt();
    }, [showToast, spill, scheduleInterrupt]);
    const startFilling = useCallback(() => {
      if (interruptRef.current) return;
      if (!started) setStarted(true);
      setFilling(true);
    }, [started]);
    const stopFilling = useCallback(() => setFilling(false), []);

    // The actual tick loop: runs continuously, only advances while `filling` and no interrupt.
    useEffect(() => {
      fillInterval.current = setInterval(() => {
        if (!fillingRef.current || interruptRef.current) return;
        setSeconds(s => s + SECONDS_PER_TICK);
        setFillPct(p => {
          const np = p + FILL_STEP;
          if (np >= 100) {
            setSeconds(s => s + FRESH_CUP_BONUS);
            addFloater();
            return 0;
          }
          return np;
        });
      }, FILL_TICK_MS);
      return clearGameplayInterval;
    }, [addFloater]);
    useEffect(() => {
      if (started) scheduleInterrupt();
      return () => {
        clearTimeout(interruptTimeout.current);
        clearInterruptTimers();
        clearTimeout(toastTimeout.current);
        floaterTimeouts.current.forEach(clearTimeout);
      };
    }, [started, scheduleInterrupt]);
    const secondsRounded = Math.floor(seconds);
    return /*#__PURE__*/React.createElement("div", {
      className: "game-core"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud-label"
    }, t.scoreLabel), /*#__PURE__*/React.createElement("div", {
      className: "hud-value"
    }, secondsRounded.toLocaleString(lang === "zh" ? "zh-CN" : lang === "it" ? "it-IT" : "en-US"), t.unitSuffix), /*#__PURE__*/React.createElement("div", {
      className: "hud-sub"
    }, t.pointsBanked)), /*#__PURE__*/React.createElement("div", {
      className: "hud-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hud-label"
    }, t.fillLabel), /*#__PURE__*/React.createElement("div", {
      className: "speed-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "speed-fill",
      style: {
        transform: `scaleX(${fillPct / 100})`,
        background: "var(--mint)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "hud-sub"
    }, Math.round(fillPct), "%"))), /*#__PURE__*/React.createElement("div", {
      className: "toast-zone",
      "aria-live": "polite"
    }, toast && /*#__PURE__*/React.createElement("div", {
      className: "toast " + toast.type
    }, toast.type === "success" ? t.toastSuccess : t.toastFail)), /*#__PURE__*/React.createElement("div", {
      className: "roll-stage"
    }, /*#__PURE__*/React.createElement("div", {
      className: "roll",
      style: {
        cursor: "default"
      }
    }, /*#__PURE__*/React.createElement(CoolerRig, {
      fillPct: fillPct
    }), floaters.map(f => /*#__PURE__*/React.createElement("span", {
      key: f.id,
      className: "floater",
      style: {
        left: `calc(50% + ${f.x}px)`
      }
    }, t.freshCupBonus)), !started && /*#__PURE__*/React.createElement("div", {
      className: "idle-hint"
    }, t.idleHint))), /*#__PURE__*/React.createElement("div", {
      className: "alert-zone",
      "aria-live": "assertive"
    }, interrupt && /*#__PURE__*/React.createElement("div", {
      className: "warning-banner",
      style: {
        background: "var(--register-light)",
        color: "var(--ink)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "warning-title",
      style: {
        color: "var(--ink)"
      }
    }, t.interrupt[interrupt.type].title), /*#__PURE__*/React.createElement("div", {
      className: "warning-body"
    }, t.interrupt[interrupt.type].body), /*#__PURE__*/React.createElement("div", {
      className: "warning-bar",
      style: {
        background: "rgba(19,49,79,.18)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "warning-bar-fill",
      style: {
        width: interrupt.pct + "%",
        background: "var(--ink)"
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "flush-row"
    }, interrupt ? /*#__PURE__*/React.createElement("div", {
      className: "response-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "response-btn",
      onClick: () => resolveInterrupt("colleague")
    }, t.chatButton), /*#__PURE__*/React.createElement("button", {
      className: "response-btn",
      onClick: () => resolveInterrupt("boss")
    }, t.printerButton)) : /*#__PURE__*/React.createElement("button", {
      className: "flush-btn armed",
      style: {
        background: "var(--mint)",
        borderColor: "var(--mint)",
        color: "var(--ink)"
      },
      onPointerDown: startFilling,
      onPointerUp: stopFilling,
      onPointerLeave: stopFilling
    }, t.fillButton)), /*#__PURE__*/React.createElement("p", {
      className: "footer-tip"
    }, t.footerTip));
  }
  window.CyberloafingGames = window.CyberloafingGames || {};
  window.CyberloafingGames.waterWanderer = {
    key: "light",
    accent: "var(--register-light)",
    accentWash: "var(--mint-wash)",
    Strings: STRINGS,
    pickTitle,
    GameCore
  };
})();
