import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Leaf particle ────────────────────────────────────────────────────────────

const LEAF_SHAPES = ["🍂", "🍁", "🌿", "🍃", "🍂", "🍁"];

function Leaf({ style, shape }: { style: React.CSSProperties; shape: string }) {
  return (
    <span
      className="fixed pointer-events-none select-none z-10"
      style={{ fontSize: "clamp(14px,2vw,22px)", ...style }}
    >
      {shape}
    </span>
  );
}

function FallingLeaves() {
  const [leaves, setLeaves] = useState<
    { id: number; left: number; delay: number; dur: number; shape: string; cls: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 7 + Math.random() * 8,
      shape: LEAF_SHAPES[Math.floor(Math.random() * LEAF_SHAPES.length)],
      cls: ["leaf-fall-1", "leaf-fall-2", "leaf-fall-3"][i % 3],
    }));
    setLeaves(generated);
  }, []);

  return (
    <>
      {leaves.map((l) => (
        <Leaf
          key={l.id}
          shape={l.shape}
          style={{
            left: `${l.left}%`,
            top: "-40px",
            animationName: l.cls.replace("leaf-fall-", "") === "1"
              ? "leaf-fall-1"
              : l.cls.replace("leaf-fall-", "") === "2"
              ? "leaf-fall-2"
              : "leaf-fall-3",
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
      ))}
    </>
  );
}

// ─── Wind streaks ─────────────────────────────────────────────────────────────

function WindStreaks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${20 + i * 28}%`,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(168,184,144,0.12) 40%, rgba(168,184,144,0.08) 70%, transparent 100%)",
            animation: `wind-sweep ${3.5 + i * 0.8}s ease-in-out ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Forest Spirit SVG ────────────────────────────────────────────────────────

function ForestSpirit({ side = "right" }: { side?: "left" | "right" }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function cycle() {
      const wait = 8000 + Math.random() * 10000;
      timerRef.current = setTimeout(() => {
        setVisible(true);
        setTimeout(() => { setVisible(false); cycle(); }, 4000);
      }, wait);
    }
    cycle();
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="fixed bottom-[15%] z-20 pointer-events-none"
      style={{
        [side]: side === "right" ? "0" : "0",
        transition: "transform 1.2s cubic-bezier(0.34,1.56,0.64,1), opacity 1s ease",
        transform: visible
          ? "translateX(0)"
          : side === "right"
          ? "translateX(110%)"
          : "translateX(-110%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="spirit-float spirit-glow">
        <svg width="90" height="130" viewBox="0 0 90 130" fill="none">
          {/* Tree trunk */}
          <rect x="35" y="70" width="20" height="55" rx="4" fill="#3d2e1a" />
          <rect x="40" y="70" width="8" height="55" rx="3" fill="#5a4228" opacity="0.5" />
          {/* Canopy */}
          <ellipse cx="45" cy="55" rx="30" ry="38" fill="#1e2e14" />
          <ellipse cx="45" cy="45" rx="22" ry="30" fill="#253818" />
          <ellipse cx="38" cy="38" rx="14" ry="20" fill="#2e4820" />
          {/* Spirit face peering */}
          <ellipse cx="55" cy="58" rx="14" ry="16" fill="rgba(122,184,138,0.15)" />
          <circle cx="51" cy="54" r="3.5" fill="rgba(122,184,138,0.7)" />
          <circle cx="59" cy="56" r="2.8" fill="rgba(122,184,138,0.6)" />
          <circle cx="51.8" cy="53.2" r="1" fill="rgba(200,240,210,0.9)" />
          <circle cx="59.8" cy="55.2" r="0.8" fill="rgba(200,240,210,0.9)" />
          <path d="M50 63 Q55 66 60 63" stroke="rgba(122,184,138,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Leaves on spirit */}
          <text x="18" y="35" fontSize="12" style={{ fill: "rgba(180,120,40,0.7)" }}>🍂</text>
          <text x="58" y="28" fontSize="10" style={{ fill: "rgba(180,80,20,0.6)" }}>🍁</text>
          {/* Moss sparkles */}
          <circle cx="30" cy="60" r="1.5" fill="rgba(122,184,138,0.5)" />
          <circle cx="68" cy="48" r="1" fill="rgba(122,184,138,0.4)" />
        </svg>
        <p
          className="text-center text-xs mt-1"
          style={{
            fontFamily: "'Cormorant', serif",
            color: "rgba(122,184,138,0.7)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          лесной дух
        </p>
      </div>
    </div>
  );
}

// ─── Mist layer ───────────────────────────────────────────────────────────────

function Mist() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0" style={{ height: "220px" }}>
      <div
        className="mist-drift absolute inset-0 rounded-t-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(100,130,80,0.18) 0%, rgba(60,80,40,0.08) 50%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

// ─── Trees silhouette ─────────────────────────────────────────────────────────

function TreeSilhouettes() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0" style={{ height: "35vh" }}>
      <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full">
        <g className="tree-sway" style={{ animationDelay: "0s" }}>
          <path d="M60 300 L60 150 L30 150 L60 80 L90 150 L60 150" fill="#0d1109" />
          <path d="M60 300 L60 120 L40 120 L60 50 L80 120 L60 120" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.5s" }}>
          <path d="M200 300 L200 160 L165 160 L200 70 L235 160 L200 160" fill="#0d1109" />
          <path d="M200 300 L200 130 L175 130 L200 40 L225 130 L200 130" fill="#111508" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.8s" }}>
          <path d="M380 300 L380 170 L350 170 L380 90 L410 170 L380 170" fill="#0d1109" />
          <path d="M380 300 L380 140 L360 140 L380 60 L400 140 L380 140" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2s" }}>
          <path d="M600 300 L600 155 L568 155 L600 75 L632 155 L600 155" fill="#0a0d06" />
          <path d="M600 300 L600 120 L578 120 L600 40 L622 120 L600 120" fill="#0d1109" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.2s" }}>
          <path d="M820 300 L820 165 L792 165 L820 85 L848 165 L820 165" fill="#0d1109" />
          <path d="M820 300 L820 130 L800 130 L820 50 L840 130 L820 130" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2.5s" }}>
          <path d="M1020 300 L1020 158 L990 158 L1020 78 L1050 158 L1020 158" fill="#0d1109" />
          <path d="M1020 300 L1020 125 L1000 125 L1020 45 L1040 125 L1020 125" fill="#111508" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.4s" }}>
          <path d="M1240 300 L1240 162 L1210 162 L1240 82 L1270 162 L1240 162" fill="#0d1109" />
          <path d="M1240 300 L1240 128 L1220 128 L1240 48 L1260 128 L1240 128" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.8s" }}>
          <path d="M1400 300 L1400 150 L1376 150 L1400 70 L1424 150 L1400 150" fill="#0a0d06" />
          <path d="M1400 300 L1400 118 L1382 118 L1400 38 L1418 118 L1400 118" fill="#0d1109" />
        </g>
      </svg>
    </div>
  );
}

// ─── Fireflies ────────────────────────────────────────────────────────────────

function Fireflies() {
  const flies = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 20 + Math.random() * 55,
    delay: Math.random() * 5,
    dur: 2 + Math.random() * 3,
    size: 2 + Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full firefly"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: "rgba(180, 220, 120, 0.9)",
            boxShadow: "0 0 6px 2px rgba(180,220,120,0.5)",
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Shop data ────────────────────────────────────────────────────────────────

export const shopCategories = [
  {
    id: "tarot",
    emoji: "🃏",
    title: "Авторская колода",
    subtitle: "Таро",
    tagline: "Прочитай своё отражение в зеркале леса",
    depth: "Опушка леса",
    bg: "radial-gradient(ellipse at 40% 60%, #1a0e28 0%, #0d1109 60%)",
    accent: "rgba(140,80,200,0.5)",
    leafColor: "rgba(140,80,200,0.6)",
    path: "/shop/tarot",
    featured: "78 карт · авторские иллюстрации · полотняный мешочек",
  },
  {
    id: "candles",
    emoji: "🕯️",
    title: "Свечи с травами",
    subtitle: "Ручная работа",
    tagline: "Огонь хранит память трав",
    depth: "Первые деревья",
    bg: "radial-gradient(ellipse at 60% 40%, #2a1808 0%, #0d1109 60%)",
    accent: "rgba(200,146,58,0.5)",
    leafColor: "rgba(200,146,58,0.6)",
    path: "/shop/candles",
    featured: "пихта · полынь · мелисса · можжевельник",
  },
  {
    id: "amulets",
    emoji: "🔮",
    title: "Авторские амулеты",
    subtitle: "Обереги",
    tagline: "Сотканы из нити леса и намерения",
    depth: "Лесная тропа",
    bg: "radial-gradient(ellipse at 30% 70%, #082018 0%, #0d1109 60%)",
    accent: "rgba(80,180,120,0.5)",
    leafColor: "rgba(80,180,120,0.6)",
    path: "/shop/amulets",
    featured: "кожа · кость · травы · природные камни",
  },
  {
    id: "crystals",
    emoji: "💎",
    title: "Кристаллы",
    subtitle: "Минералы",
    tagline: "Земля хранит свои секреты в камнях",
    depth: "Старые корни",
    bg: "radial-gradient(ellipse at 70% 30%, #0a1820 0%, #0d1109 60%)",
    accent: "rgba(80,160,200,0.5)",
    leafColor: "rgba(80,160,200,0.6)",
    path: "/shop/crystals",
    featured: "аметист · горный хрусталь · обсидиан · лабрадор",
  },
  {
    id: "salt",
    emoji: "✦",
    title: "Авторская соль",
    subtitle: "Банная & SPA",
    tagline: "Морская соль и лесные ароматы",
    depth: "У ручья",
    bg: "radial-gradient(ellipse at 50% 50%, #101820 0%, #0d1109 60%)",
    accent: "rgba(160,200,220,0.5)",
    leafColor: "rgba(160,200,220,0.6)",
    path: "/shop/salt",
    featured: "гималайская · морская · с хвоей · с мёдом",
  },
  {
    id: "brooms",
    emoji: "🌿",
    title: "Банные веники",
    subtitle: "Авторские",
    tagline: "Вязанные с молитвой и знанием",
    depth: "Берёзовая роща",
    bg: "radial-gradient(ellipse at 40% 40%, #1a2808 0%, #0d1109 60%)",
    accent: "rgba(120,180,60,0.5)",
    leafColor: "rgba(120,180,60,0.6)",
    path: "/shop/brooms",
    featured: "берёза · дуб · пихта · эвкалипт",
  },
  {
    id: "fans",
    emoji: "🪭",
    title: "Банные веера",
    subtitle: "Ручная работа",
    tagline: "Ветер слушается умелых рук",
    depth: "Глубокий лес",
    bg: "radial-gradient(ellipse at 60% 60%, #200e08 0%, #0d1109 60%)",
    accent: "rgba(200,80,40,0.5)",
    leafColor: "rgba(200,80,40,0.6)",
    path: "/shop/fans",
    featured: "войлок · кожа · дерево · этнический орнамент",
  },
];

// ─── Main Shop page ───────────────────────────────────────────────────────────

export default function Shop() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--forest-bg)", color: "var(--forest-cream)" }}
    >
      {/* Ambient layers */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(30,40,20,0.8) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(20,30,15,0.6) 0%, transparent 50%)",
        }}
      />
      <TreeSilhouettes />
      <Mist />
      <WindStreaks />
      <FallingLeaves />
      <Fireflies />
      <ForestSpirit side="right" />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,13,6,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(122,184,138,0.12)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--forest-spirit)" }}
        >
          <Icon name="ArrowLeft" size={18} />
          <span
            className="text-sm tracking-wider"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Мария · Пармастер
          </span>
        </button>
        <p
          className="text-xs uppercase tracking-[0.35em]"
          style={{ color: "rgba(168,184,144,0.6)" }}
        >
          Лесная лавка
        </p>
      </nav>

      {/* Hero — Entrance to the forest */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #1a2210 0%, #0d1109 55%, #0a0d06 100%)",
        }}
      >
        {/* Moon */}
        <div
          className="absolute top-16 right-1/4 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(220,210,170,0.12) 0%, transparent 70%)",
            boxShadow:
              "0 0 60px rgba(220,210,170,0.08), 0 0 120px rgba(180,200,140,0.04)",
          }}
        />

        <div
          className="relative text-center max-w-2xl mx-auto z-10"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(122,184,138,0.4))",
              }}
            />
            <span
              className="text-sm tracking-[0.4em]"
              style={{ color: "rgba(122,184,138,0.5)" }}
            >
              🌿 ✦ 🌿
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(122,184,138,0.4))",
              }}
            />
          </div>

          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "rgba(168,184,144,0.6)" }}
          >Осенний лес</p>

          <h1
            className="text-5xl md:text-7xl font-light leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--forest-cream)",
              textShadow:
                "0 0 60px rgba(122,184,138,0.2), 0 0 120px rgba(80,120,60,0.1)",
            }}
          >
            Лесная<br />
            <em style={{ color: "var(--forest-spirit)" }}>лавка</em>
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mb-3"
            style={{
              color: "rgba(200,220,170,0.75)",
              fontFamily: "'Cormorant', serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
            }}
          >
            Войди. Лес давно тебя ждал.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(168,184,144,0.55)", maxWidth: "420px", margin: "0 auto" }}
          >Авторские изделия, сотканные из шепотков, трав и древнего знания. Каждый предмет создан вручную с намерением.</p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div
              className="h-px flex-1 max-w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(122,184,138,0.2))",
              }}
            />
            <span style={{ color: "rgba(122,184,138,0.4)" }}>✦</span>
            <div
              className="h-px flex-1 max-w-20"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(122,184,138,0.2))",
              }}
            />
          </div>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(40,60,28,0.9), rgba(60,80,40,0.8))",
              border: "1px solid rgba(122,184,138,0.3)",
              color: "var(--forest-spirit)",
              letterSpacing: "0.2em",
              boxShadow: "0 0 30px rgba(80,120,60,0.15)",
            }}
          >
            Войти в лес
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-gold"
          style={{ color: "rgba(122,184,138,0.4)" }}
        >
          <span className="text-xs tracking-widest">глубже</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* Categories — The forest path */}
      <section id="categories" className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.5em] mb-4"
              style={{ color: "rgba(168,184,144,0.5)" }}
            >
              Тропинки леса
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{
                fontFamily: "'Cormorant', serif",
                color: "var(--forest-cream)",
              }}
            >
              Что хранит лес
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shopCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path)}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="forest-card rounded-2xl p-7 text-left w-full group"
                style={{
                  background:
                    hoveredId === cat.id
                      ? cat.bg.replace("0d1109", "111a0c")
                      : "rgba(14,18,10,0.85)",
                  animationDelay: `${i * 0.08}s`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Depth label */}
                <p
                  className="text-xs tracking-[0.35em] mb-4 uppercase"
                  style={{ color: cat.leafColor, opacity: 0.7 }}
                >
                  {cat.depth}
                </p>

                {/* Emoji */}
                <div
                  className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block"
                >
                  {cat.emoji}
                </div>

                <h3
                  className="text-2xl font-light mb-1"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "var(--forest-cream)",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: cat.leafColor, opacity: 0.6 }}
                >
                  {cat.subtitle}
                </p>

                <p
                  className="text-sm leading-relaxed mb-5 italic"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "rgba(200,220,170,0.7)",
                    fontSize: "0.95rem",
                  }}
                >
                  {cat.tagline}
                </p>

                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "rgba(168,184,144,0.5)",
                    borderTop: `1px solid ${cat.accent.replace("0.5", "0.15")}`,
                    paddingTop: "0.75rem",
                  }}
                >
                  {cat.featured}
                </p>

                <div
                  className="flex items-center gap-2 mt-5 text-xs tracking-wider uppercase transition-all group-hover:gap-3"
                  style={{ color: cat.leafColor, opacity: 0.8 }}
                >
                  <span>Войти</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-10 px-6 text-center z-10"
        style={{
          borderTop: "1px solid rgba(122,184,138,0.08)",
          background: "rgba(6,8,4,0.9)",
        }}
      >
        <p
          className="text-sm mb-1"
          style={{
            fontFamily: "'Cormorant', serif",
            color: "rgba(122,184,138,0.5)",
          }}
        >
          🌿 Лесная лавка · Мария · Пармастер
        </p>
        <p
          className="text-xs"
          style={{ color: "rgba(168,184,144,0.3)" }}
        >
          Всё создано вручную с любовью и намерением
        </p>
      </footer>
    </div>
  );
}