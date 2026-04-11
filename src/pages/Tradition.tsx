import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Ember / spark particles ──────────────────────────────────────────────────

function Embers() {
  const [sparks] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 8,
      dur: 3 + Math.random() * 5,
      size: 1.5 + Math.random() * 3,
      side: i % 2 === 0 ? "magma" : "ice",
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {sparks.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            bottom: "-10px",
            width: `${s.size}px`,
            height: `${s.size}px`,
            background:
              s.side === "magma"
                ? "rgba(212,98,42,0.9)"
                : "rgba(140,200,220,0.85)",
            boxShadow:
              s.side === "magma"
                ? `0 0 6px 2px rgba(212,98,42,0.5)`
                : `0 0 6px 2px rgba(140,200,220,0.4)`,
            animation: `ember-rise ${s.dur}s ease-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Ice crystals falling ─────────────────────────────────────────────────────

function IceCrystals() {
  const [crystals] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 6 + Math.random() * 8,
      size: 10 + Math.random() * 14,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {crystals.map((c) => (
        <div
          key={c.id}
          className="absolute select-none"
          style={{
            left: `${c.left}%`,
            top: "-30px",
            fontSize: `${c.size}px`,
            color: "rgba(180,220,240,0.35)",
            animation: `leaf-fall-2 ${c.dur}s ease-in ${c.delay}s infinite`,
            textShadow: "0 0 8px rgba(160,210,240,0.5)",
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

// ─── The big animated SVG — Magma meets Ice ───────────────────────────────────

function MagmaIceArt() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow rings */}
      <div
        className="absolute rounded-full animate-float"
        style={{
          width: "420px",
          height: "420px",
          background:
            "conic-gradient(from 0deg, rgba(212,98,42,0.08) 0deg, rgba(140,200,220,0.08) 180deg, rgba(212,98,42,0.08) 360deg)",
          filter: "blur(30px)",
          animation: "spirit-float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "320px",
          height: "320px",
          background:
            "conic-gradient(from 90deg, rgba(200,146,58,0.12) 0deg, rgba(80,150,200,0.08) 180deg, rgba(200,146,58,0.12) 360deg)",
          filter: "blur(20px)",
          animation: "spirit-float 6s ease-in-out 1s infinite reverse",
        }}
      />

      <svg
        viewBox="0 0 400 460"
        className="relative z-10"
        style={{
          width: "min(380px, 90vw)",
          filter: "drop-shadow(0 0 30px rgba(0,0,0,0.8))",
        }}
      >
        <defs>
          {/* Magma gradient */}
          <radialGradient id="magmaCore" cx="40%" cy="60%">
            <stop offset="0%" stopColor="#ff6a20" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#d44010" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#8b2010" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3a0a05" stopOpacity="1" />
          </radialGradient>
          {/* Ice gradient */}
          <radialGradient id="iceCore" cx="60%" cy="40%">
            <stop offset="0%" stopColor="#e8f6ff" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#90c8e8" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#1a5878" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#041020" stopOpacity="1" />
          </radialGradient>
          {/* Steam / merge gradient */}
          <radialGradient id="steamMerge" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#e8e0d0" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#c8b890" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Gold ornament */}
          <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#c8923a" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#e8b86d" stopOpacity="0.9" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="magmaGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="iceGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip paths */}
          <clipPath id="leftHalf">
            <rect x="0" y="0" width="200" height="460" />
          </clipPath>
          <clipPath id="rightHalf">
            <rect x="200" y="0" width="200" height="460" />
          </clipPath>
        </defs>

        {/* ── Background circle ── */}
        <circle cx="200" cy="230" r="185" fill="rgba(8,4,2,0.95)" stroke="rgba(200,146,58,0.15)" strokeWidth="1" />

        {/* ── MAGMA side (left) ── */}
        <g clipPath="url(#leftHalf)">
          {/* Lava pool at bottom */}
          <ellipse cx="130" cy="360" rx="110" ry="55" fill="url(#magmaCore)" opacity="0.9" />
          <ellipse cx="120" cy="355" rx="80" ry="38" fill="rgba(255,120,30,0.4)" />
          {/* Lava flows */}
          <path d="M80 360 Q60 300 90 250 Q110 210 80 170" stroke="rgba(212,80,20,0.7)" strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#magmaGlow)" />
          <path d="M120 358 Q100 290 130 240 Q150 200 120 155" stroke="rgba(230,100,30,0.6)" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#magmaGlow)" />
          <path d="M155 355 Q140 310 160 270 Q175 240 155 200" stroke="rgba(200,70,15,0.5)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Rock texture */}
          <ellipse cx="95" cy="320" rx="20" ry="10" fill="rgba(60,20,8,0.8)" transform="rotate(-15 95 320)" />
          <ellipse cx="140" cy="340" rx="15" ry="8" fill="rgba(50,15,6,0.7)" transform="rotate(10 140 340)" />
          {/* Ethnic ornament — magma side */}
          <path d="M30 200 Q50 180 70 200 Q90 220 110 200 Q130 180 150 200" stroke="rgba(200,80,20,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M40 220 Q60 205 80 220 Q100 235 120 220 Q140 205 160 220" stroke="rgba(200,80,20,0.25)" strokeWidth="1" fill="none" />
          {/* Lava bubbles */}
          {[{ cx: 90, cy: 345, r: 8 }, { cx: 130, cy: 352, r: 6 }, { cx: 155, cy: 342, r: 5 }].map((b, i) => (
            <circle
              key={i}
              cx={b.cx}
              cy={b.cy}
              r={b.r}
              fill="rgba(255,140,40,0.6)"
              style={{
                animation: `pulseGold ${1.5 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
          {/* Flame tips */}
          <path d="M85 170 Q75 140 90 115 Q100 135 88 170" fill="rgba(255,160,30,0.7)" filter="url(#magmaGlow)" style={{ animation: "flicker 2s ease-in-out infinite" }} />
          <path d="M110 155 Q100 125 115 100 Q125 120 113 155" fill="rgba(255,120,20,0.6)" filter="url(#magmaGlow)" style={{ animation: "flicker 2.5s ease-in-out 0.4s infinite" }} />
          <path d="M130 160 Q122 132 135 110 Q143 128 132 160" fill="rgba(240,100,15,0.55)" filter="url(#magmaGlow)" style={{ animation: "flicker 1.8s ease-in-out 0.8s infinite" }} />
        </g>

        {/* ── ICE side (right) ── */}
        <g clipPath="url(#rightHalf)">
          {/* Ice floor */}
          <ellipse cx="280" cy="365" rx="110" ry="50" fill="url(#iceCore)" opacity="0.85" />
          <ellipse cx="285" cy="358" rx="75" ry="32" fill="rgba(200,240,255,0.25)" />
          {/* Ice formations / stalactites */}
          <path d="M220 360 Q240 290 210 230 Q195 190 220 150" stroke="rgba(140,200,230,0.6)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#iceGlow)" />
          <path d="M260 358 Q275 295 250 245 Q238 210 260 165" stroke="rgba(160,215,240,0.5)" strokeWidth="5" fill="none" strokeLinecap="round" filter="url(#iceGlow)" />
          <path d="M300 355 Q315 305 295 260 Q282 230 300 195" stroke="rgba(120,185,220,0.45)" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* Ice shards */}
          <polygon points="240,120 230,160 250,160" fill="rgba(200,240,255,0.5)" filter="url(#iceGlow)" />
          <polygon points="270,105 258,148 282,148" fill="rgba(180,230,250,0.45)" filter="url(#iceGlow)" />
          <polygon points="305,115 295,155 315,158" fill="rgba(160,220,245,0.4)" filter="url(#iceGlow)" />
          {/* Snowflake ornament */}
          <text x="320" y="200" fontSize="20" fill="rgba(180,220,240,0.3)" style={{ animation: "spirit-float 4s ease-in-out 1s infinite" }}>❄</text>
          <text x="240" y="185" fontSize="14" fill="rgba(160,210,235,0.25)" style={{ animation: "spirit-float 5s ease-in-out infinite" }}>❄</text>
          {/* Ethnic ornament — ice side */}
          <path d="M220 200 Q240 180 260 200 Q280 220 300 200 Q320 180 360 200" stroke="rgba(80,160,210,0.4)" strokeWidth="1.5" fill="none" />
          <path d="M230 222 Q250 205 270 222 Q290 238 310 222 Q330 207 360 222" stroke="rgba(80,160,210,0.25)" strokeWidth="1" fill="none" />
          {/* Ice reflections */}
          <ellipse cx="260" cy="355" rx="20" ry="8" fill="rgba(200,240,255,0.2)" transform="rotate(5 260 355)" />
          <ellipse cx="305" cy="362" rx="14" ry="6" fill="rgba(180,230,250,0.15)" transform="rotate(-8 305 362)" />
        </g>

        {/* ── MERGE ZONE (center) — Steam ── */}
        <ellipse cx="200" cy="250" rx="40" ry="120" fill="url(#steamMerge)" style={{ animation: "mist-drift 5s ease-in-out infinite" }} />
        {/* Steam wisps */}
        <path d="M195 320 Q190 290 197 265 Q204 240 198 215" stroke="rgba(220,210,195,0.3)" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-1" />
        <path d="M205 315 Q210 285 203 262 Q196 238 202 210" stroke="rgba(220,210,195,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-2" />
        <path d="M200 325 Q194 295 200 270 Q206 248 200 220" stroke="rgba(230,215,200,0.2)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-3" />

        {/* ── Dividing line — gold ornament ── */}
        <line x1="200" y1="60" x2="200" y2="415" stroke="url(#goldLine)" strokeWidth="1" strokeDasharray="4 6" opacity="0.6" />
        <circle cx="200" cy="230" r="6" fill="rgba(200,146,58,0.6)" style={{ animation: "pulseGold 2s ease-in-out infinite" }} />
        <circle cx="200" cy="230" r="12" fill="none" stroke="rgba(200,146,58,0.25)" strokeWidth="1" style={{ animation: "pulseGold 2s ease-in-out 0.5s infinite" }} />

        {/* ── Outer ornamental ring ── */}
        <circle cx="200" cy="230" r="183" fill="none" stroke="rgba(200,146,58,0.12)" strokeWidth="1" />
        <circle cx="200" cy="230" r="178" fill="none" stroke="rgba(200,146,58,0.06)" strokeWidth="0.5" />

        {/* ── Top & Bottom ornaments ── */}
        <path d="M160 55 Q200 40 240 55" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5" fill="none" />
        <path d="M175 50 Q200 38 225 50" stroke="rgba(200,146,58,0.3)" strokeWidth="1" fill="none" />
        <circle cx="200" cy="42" r="4" fill="rgba(200,146,58,0.6)" />
        <text x="196" y="46" fontSize="6" fill="rgba(200,146,58,0.9)">✦</text>

        <path d="M160 408 Q200 422 240 408" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5" fill="none" />
        <circle cx="200" cy="420" r="4" fill="rgba(200,146,58,0.6)" />

        {/* ── Labels ── */}
        <text x="80" y="415" textAnchor="middle" fontSize="9" fill="rgba(212,98,42,0.7)" fontFamily="Cormorant, serif" letterSpacing="3">МАГМА</text>
        <text x="310" y="415" textAnchor="middle" fontSize="9" fill="rgba(140,200,220,0.7)" fontFamily="Cormorant, serif" letterSpacing="3">ИНЕЙ</text>
        <text x="200" y="440" textAnchor="middle" fontSize="8" fill="rgba(200,180,140,0.5)" fontFamily="Cormorant, serif" letterSpacing="4">✦ ПАР ✦</text>
      </svg>
    </div>
  );
}

// ─── Tradition text blocks ────────────────────────────────────────────────────

const VERSES = [
  {
    icon: "🌿",
    title: "Травы",
    text: "Травы выбирали — чтоб аромат был чистый, сила — живая.",
    color: "rgba(120,180,80,0.7)",
  },
  {
    icon: "✦",
    title: "Соль",
    text: "Соль брали — не простую, а ту, что солнцем согрета, морем взлелеяна.",
    color: "rgba(180,200,220,0.7)",
  },
  {
    icon: "🍯",
    title: "Мёд",
    text: "Мёд клали — светлый, душистый, от пчёл, что на лугах вольных летали.",
    color: "rgba(200,146,58,0.8)",
  },
  {
    icon: "🌿",
    title: "Веники",
    text: "Веники вязали — берёзовые да дубовые, в срок положенный, когда дерево силу набирает.",
    color: "rgba(140,180,100,0.7)",
  },
];

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Tradition() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const verseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Intersection observer — animate verses on scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActiveVerse((prev) => (prev === null || idx > prev ? idx : prev));
          }
        });
      },
      { threshold: 0.3 }
    );
    verseRefs.current.forEach((el) => { if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 20% 40%, #1a0800 0%, #0a0806 40%, #060410 60%, #080a06 100%)",
        color: "var(--eth-cream)",
      }}
    >
      {/* Keyframes injected inline for ember-rise */}
      <style>{`
        @keyframes ember-rise {
          0%   { transform: translateY(0) scale(1);        opacity: 0; }
          10%  { opacity: 0.9; }
          80%  { opacity: 0.5; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
      `}</style>

      {/* Ambient layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 15% 70%, rgba(80,20,5,0.4) 0%, transparent 50%), radial-gradient(ellipse at 85% 30%, rgba(10,40,80,0.3) 0%, transparent 50%)",
        }}
      />
      <Embers />
      <IceCrystals />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(8,5,3,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,146,58,0.12)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold)" }}
        >
          <Icon name="ArrowLeft" size={18} />
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
            Иней & Магма corp.
          </span>
        </button>
        <p
          className="text-xs uppercase tracking-[0.4em]"
          style={{ color: "rgba(200,146,58,0.4)" }}
        >
          Традиция
        </p>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6"
        style={{
          opacity: entered ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <div className="text-center mb-12 max-w-xl mx-auto">
          <p
            className="text-xs uppercase tracking-[0.55em] mb-5"
            style={{ color: "rgba(200,146,58,0.5)" }}
          >
            По старинному обычаю
          </p>
          <h1
            className="text-5xl md:text-6xl font-light leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--eth-gold2)",
              textShadow:
                "0 0 60px rgba(200,100,30,0.3), 0 0 120px rgba(80,140,200,0.15)",
            }}
          >
            Мудрость<br />
            <em style={{ color: "var(--eth-ember)" }}>веков</em>
          </h1>
          <p
            className="text-base leading-relaxed italic"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "rgba(220,200,170,0.75)",
              fontSize: "1.15rem",
            }}
          >
            По старинному обычаю, да с мастерством веков,<br />
            создавали каждую программу.
          </p>
        </div>

        {/* Main artwork */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
            transition: "all 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          <MagmaIceArt />
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-gold"
          style={{ color: "rgba(200,146,58,0.4)" }}
        >
          <span className="text-xs tracking-widest">читать далее</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ── Opening verse ── */}
      <section
        className="relative py-20 px-6 z-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(14,10,6,0.95) 20%, rgba(14,10,6,0.98) 80%, transparent 100%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="eth-divider mb-10">
            <span>◆ ◇ ◆</span>
          </div>
          <p
            className="text-xl md:text-2xl font-light leading-loose mb-8"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "rgba(220,200,165,0.9)",
              fontSize: "clamp(1.1rem, 3vw, 1.45rem)",
              fontStyle: "italic",
            }}
          >
            Всё для того, чтобы в бане вы телом окрепли,<br />
            душой отдохнули, да здоровьем прибавили.
          </p>
          <div className="eth-divider">
            <span>◆ ◇ ◆</span>
          </div>
        </div>
      </section>

      {/* ── Four elements / verses ── */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <p
            className="text-center text-xs uppercase tracking-[0.5em] mb-16"
            style={{ color: "rgba(200,146,58,0.4)" }}
          >
            Из чего соткана программа
          </p>

          <div className="space-y-8">
            {VERSES.map((v, i) => (
              <div
                key={i}
                ref={(el) => { verseRefs.current[i] = el; }}
                data-idx={i}
                className="flex gap-6 items-start group"
                style={{
                  opacity: activeVerse !== null && activeVerse >= i ? 1 : 0,
                  transform:
                    activeVerse !== null && activeVerse >= i
                      ? "translateX(0)"
                      : i % 2 === 0
                      ? "translateX(-30px)"
                      : "translateX(30px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}
              >
                {/* Ornament line */}
                <div className="flex flex-col items-center pt-2 flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg border"
                    style={{
                      background: `${v.color.replace("0.7", "0.08").replace("0.8", "0.1")}`,
                      borderColor: v.color.replace("0.7", "0.3").replace("0.8", "0.35"),
                      boxShadow: `0 0 16px ${v.color.replace("0.7", "0.15").replace("0.8", "0.2")}`,
                    }}
                  >
                    <span style={{ fontSize: "1rem" }}>{v.icon}</span>
                  </div>
                  {i < VERSES.length - 1 && (
                    <div
                      className="w-px mt-2 flex-1"
                      style={{
                        height: "60px",
                        background: `linear-gradient(to bottom, ${v.color.replace("0.7", "0.3").replace("0.8", "0.3")}, transparent)`,
                      }}
                    />
                  )}
                </div>

                {/* Text */}
                <div className="pb-6">
                  <p
                    className="text-xs uppercase tracking-[0.4em] mb-2"
                    style={{ color: v.color }}
                  >
                    {v.title}
                  </p>
                  <p
                    className="text-lg md:text-xl font-light leading-relaxed"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "rgba(220,200,165,0.85)",
                      fontStyle: "italic",
                      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    {v.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing quote ── */}
      <section
        className="relative py-20 px-6 z-10 text-center"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(10,6,3,0.97) 30%, rgba(10,6,3,0.99) 70%, transparent)",
        }}
      >
        <div className="max-w-xl mx-auto">
          <div className="eth-divider mb-10">
            <span>✦</span>
          </div>
          <p
            className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--eth-gold2)",
              textShadow: "0 0 40px rgba(200,146,58,0.2)",
            }}
          >
            Всё — с мастерством веков<br />
            <span style={{ fontSize: "0.75em", opacity: 0.7, color: "var(--eth-smoke)" }}>
              и заботой о вас
            </span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(60,30,10,0.9), rgba(80,40,12,0.8))",
              border: "1px solid rgba(200,146,58,0.35)",
              color: "var(--eth-gold2)",
              letterSpacing: "0.15em",
            }}
          >
            Записаться
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-8 px-6 text-center z-10"
        style={{ borderTop: "1px solid rgba(200,146,58,0.08)" }}
      >
        <p
          className="text-xs"
          style={{ color: "rgba(200,146,58,0.3)", fontFamily: "'Cormorant', serif" }}
        >
          Иней & Магма corp. · Мария · Пармастер
        </p>
      </footer>
    </div>
  );
}
