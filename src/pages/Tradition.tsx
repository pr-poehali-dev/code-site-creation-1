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
      {/* Left glow — magma */}
      <div className="absolute pointer-events-none" style={{ left: "5%", top: "20%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(255,80,10,0.18) 0%, transparent 70%)", filter: "blur(40px)", animation: "spirit-float 5s ease-in-out infinite" }} />
      {/* Right glow — ice */}
      <div className="absolute pointer-events-none" style={{ right: "5%", top: "15%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(100,200,255,0.15) 0%, transparent 70%)", filter: "blur(40px)", animation: "spirit-float 7s ease-in-out 1.5s infinite reverse" }} />

      <svg viewBox="0 0 480 520" className="relative z-10" style={{ width: "min(440px, 92vw)", filter: "drop-shadow(0 0 40px rgba(0,0,0,0.9))" }}>
        <defs>
          {/* Magma gradients */}
          <radialGradient id="lavaPool" cx="50%" cy="70%">
            <stop offset="0%" stopColor="#ff8020" stopOpacity="1" />
            <stop offset="40%" stopColor="#d43010" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#6a1005" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1a0403" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="lavaGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#ff6010" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Ice gradients */}
          <radialGradient id="iceField" cx="50%" cy="30%">
            <stop offset="0%" stopColor="#dff4ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#7ec8e8" stopOpacity="0.85" />
            <stop offset="75%" stopColor="#0e4060" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#030c18" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="iceGlowR" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#80d8ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Steam center */}
          <radialGradient id="steamC" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#e0d8c8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#b8a888" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          {/* Gold */}
          <linearGradient id="gld" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#c8923a" stopOpacity="0.7" />
            <stop offset="75%" stopColor="#e8b86d" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          {/* Filters */}
          <filter id="mGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="iGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="2"/>
          </filter>
          {/* Clip */}
          <clipPath id="cL"><rect x="0" y="0" width="240" height="520"/></clipPath>
          <clipPath id="cR"><rect x="240" y="0" width="240" height="520"/></clipPath>
          <clipPath id="circle"><circle cx="240" cy="260" r="210"/></clipPath>
        </defs>

        {/* ── Background ── */}
        <circle cx="240" cy="260" r="212" fill="rgba(5,2,1,0.97)" />
        <circle cx="240" cy="260" r="208" fill="none" stroke="rgba(200,146,58,0.14)" strokeWidth="1.5"/>

        {/* ══ MAGMA HALF (left) ══ */}
        <g clipPath="url(#cL)">
          {/* Deep background glow */}
          <ellipse cx="120" cy="340" rx="180" ry="140" fill="rgba(80,15,3,0.7)" filter="url(#softBlur)"/>

          {/* === ЛАВА — крупный пульсирующий бассейн === */}
          <ellipse cx="120" cy="400" rx="155" ry="70" fill="url(#lavaPool)" style={{ animation: "pulseGold 2.5s ease-in-out infinite" }}/>
          {/* Раскалённая поверхность */}
          <ellipse cx="105" cy="393" rx="110" ry="48" fill="rgba(255,130,30,0.35)" style={{ animation: "pulseGold 1.8s ease-in-out 0.3s infinite" }}/>
          <ellipse cx="80" cy="388" rx="60" ry="25" fill="rgba(255,200,80,0.2)" />
          {/* Трещины в породе */}
          <path d="M20 420 L60 390 L50 370 L90 345 L75 320" stroke="rgba(255,100,10,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M140 415 L165 385 L155 360 L175 335" stroke="rgba(230,80,5,0.4)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M60 410 L95 375 L85 350" stroke="rgba(255,140,20,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Камни-глыбы */}
          <ellipse cx="55" cy="375" rx="28" ry="14" fill="rgba(40,12,4,0.92)" transform="rotate(-20 55 375)"/>
          <ellipse cx="155" cy="380" rx="22" ry="11" fill="rgba(35,10,3,0.88)" transform="rotate(12 155 380)"/>
          <ellipse cx="100" cy="360" rx="16" ry="8" fill="rgba(30,8,2,0.85)"/>
          {/* Пузыри лавы */}
          {[{cx:75,cy:378,r:9},{cx:118,cy:385,r:7},{cx:155,cy:375,r:5},{cx:45,cy:392,r:6}].map((b,i)=>(
            <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill={`rgba(255,${140+i*15},${20+i*10},0.65)`}
              style={{ animation: `pulseGold ${1.3+i*0.35}s ease-in-out ${i*0.25}s infinite` }}/>
          ))}

          {/* === ПОТОКИ МАГМЫ вверх === */}
          <path d="M60 390 C50 340 75 290 55 240 C40 200 65 165 50 130" stroke="rgba(255,90,10,0.75)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#mGlow)"/>
          <path d="M100 385 C95 330 115 275 100 225 C88 185 108 148 95 110" stroke="rgba(245,110,20,0.65)" strokeWidth="7" fill="none" strokeLinecap="round" filter="url(#mGlow)"/>
          <path d="M148 382 C145 340 158 300 148 260 C140 228 152 200 145 170" stroke="rgba(220,80,10,0.55)" strokeWidth="5" fill="none" strokeLinecap="round"/>
          {/* Свечение потоков */}
          <ellipse cx="55" cy="240" rx="18" ry="50" fill="rgba(255,80,10,0.12)" filter="url(#softBlur)" style={{ animation: "flicker 3s infinite" }}/>

          {/* === ЯЗЫКИ ПЛАМЕНИ вверху === */}
          {/* Главное пламя */}
          <path d="M58 135 C42 100 55 60 68 30 C78 55 72 95 80 135 Z" fill="rgba(255,180,30,0.85)" filter="url(#mGlow)" style={{ animation: "flicker 1.6s ease-in-out infinite" }}/>
          <path d="M68 130 C52 95 62 50 75 18 C88 48 80 92 90 130 Z" fill="rgba(255,140,15,0.8)" filter="url(#mGlow)" style={{ animation: "flicker 2s ease-in-out 0.3s infinite" }}/>
          <path d="M82 138 C70 105 78 68 90 42 C100 65 95 100 105 138 Z" fill="rgba(255,100,10,0.75)" filter="url(#mGlow)" style={{ animation: "flicker 1.4s ease-in-out 0.6s infinite" }}/>
          {/* Малые язычки */}
          <path d="M105 148 C98 122 104 98 112 80 C119 98 115 122 122 148 Z" fill="rgba(245,90,8,0.7)" filter="url(#mGlow)" style={{ animation: "flicker 2.2s ease-in-out 0.9s infinite" }}/>
          <path d="M130 155 C124 133 129 112 136 95 C143 112 139 133 145 155 Z" fill="rgba(230,75,5,0.6)" style={{ animation: "flicker 1.8s ease-in-out 1.2s infinite" }}/>
          {/* Искры */}
          {[{x:45,y:95},{x:72,y:62},{x:100,y:75},{x:125,y:105},{x:88,y:48}].map((s,i)=>(
            <circle key={i} cx={s.x} cy={s.y} r={1.5+i%2} fill={`rgba(255,${200+i*10},50,0.8)`}
              style={{ animation: `firefly ${0.8+i*0.3}s ease-in-out ${i*0.2}s infinite` }}/>
          ))}

          {/* Этнический орнамент — магма */}
          <path d="M15 195 C35 175 55 195 75 175 C95 155 115 175 145 165" stroke="rgba(200,80,20,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="3 4"/>
          <path d="M20 218 C42 200 62 218 82 200 C102 182 122 200 148 192" stroke="rgba(180,60,15,0.3)" strokeWidth="1" fill="none" strokeDasharray="2 5"/>
          {/* Руна огня */}
          <text x="28" y="158" fontSize="28" fill="rgba(255,120,20,0.4)" style={{ fontFamily: "serif", animation: "pulseGold 3s ease-in-out infinite" }}>𐌔</text>
        </g>

        {/* ══ ICE HALF (right) ══ */}
        <g clipPath="url(#cR)">
          {/* Deep background */}
          <ellipse cx="355" cy="200" rx="180" ry="150" fill="rgba(2,10,25,0.75)" filter="url(#softBlur)"/>

          {/* === ЛЕДЯНОЕ поле внизу === */}
          <ellipse cx="355" cy="390" rx="155" ry="65" fill="url(#iceField)" style={{ animation: "mist-drift 6s ease-in-out infinite" }}/>
          {/* Блики льда */}
          <ellipse cx="340" cy="380" rx="80" ry="28" fill="rgba(200,240,255,0.3)"/>
          <ellipse cx="310" cy="375" rx="35" ry="12" fill="rgba(220,250,255,0.2)" transform="rotate(-8 310 375)"/>
          {/* Трещины во льду */}
          <path d="M260 400 L295 375 L285 358 L320 340 L310 315" stroke="rgba(140,200,240,0.45)" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M380 395 L405 368 L395 345 L420 320" stroke="rgba(120,185,230,0.35)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M340 395 L360 370 L350 348" stroke="rgba(160,215,245,0.3)" strokeWidth="1" fill="none" strokeLinecap="round"/>

          {/* === ЛЕДЯНЫЕ СТАЛАКТИТЫ снизу вверх === */}
          <path d="M270 385 C265 330 280 270 262 210 C248 165 268 128 255 90" stroke="rgba(140,205,235,0.65)" strokeWidth="9" fill="none" strokeLinecap="round" filter="url(#iGlow)"/>
          <path d="M308 382 C305 328 318 270 305 218 C295 175 310 142 300 105" stroke="rgba(160,220,245,0.55)" strokeWidth="6.5" fill="none" strokeLinecap="round" filter="url(#iGlow)"/>
          <path d="M348 378 C348 332 358 282 348 238 C340 202 350 172 345 142" stroke="rgba(120,195,225,0.5)" strokeWidth="5" fill="none" strokeLinecap="round"/>
          <path d="M390 372 C392 335 398 295 390 258 C384 228 392 202 388 175" stroke="rgba(100,175,215,0.4)" strokeWidth="4" fill="none" strokeLinecap="round"/>
          {/* Свечение льда */}
          <ellipse cx="262" cy="210" rx="16" ry="45" fill="rgba(140,200,240,0.1)" filter="url(#softBlur)"/>

          {/* === КРИСТАЛЛЫ льда вверху === */}
          {/* Главные шипы */}
          <polygon points="262,95 250,148 274,148" fill="rgba(210,245,255,0.7)" filter="url(#iGlow)" style={{ animation: "spirit-float 4s ease-in-out infinite" }}/>
          <polygon points="296,78 282,135 310,135" fill="rgba(190,235,250,0.65)" filter="url(#iGlow)" style={{ animation: "spirit-float 5s ease-in-out 0.8s infinite" }}/>
          <polygon points="330,88 318,142 342,142" fill="rgba(175,228,248,0.6)" filter="url(#iGlow)" style={{ animation: "spirit-float 3.5s ease-in-out 1.4s infinite" }}/>
          <polygon points="365,98 354,148 376,148" fill="rgba(155,218,242,0.55)" filter="url(#iGlow)" style={{ animation: "spirit-float 4.5s ease-in-out 0.4s infinite" }}/>
          <polygon points="400,110 390,155 410,155" fill="rgba(140,208,238,0.5)" style={{ animation: "spirit-float 6s ease-in-out 1.8s infinite" }}/>
          {/* Малые грани */}
          <polygon points="278,118 270,145 286,145" fill="rgba(200,240,255,0.4)"/>
          <polygon points="314,105 308,130 320,130" fill="rgba(185,232,250,0.35)"/>
          <polygon points="348,112 343,135 353,135" fill="rgba(170,225,245,0.35)"/>
          {/* Снежинки-украшения */}
          <text x="412" y="175" fontSize="22" fill="rgba(180,225,245,0.35)" style={{ animation: "spirit-float 5s ease-in-out 2s infinite" }}>❄</text>
          <text x="258" y="195" fontSize="16" fill="rgba(160,215,240,0.28)" style={{ animation: "spirit-float 4s ease-in-out infinite" }}>❄</text>
          <text x="385" y="240" fontSize="12" fill="rgba(140,205,235,0.22)" style={{ animation: "spirit-float 6s ease-in-out 1s infinite" }}>❄</text>
          {/* Мерцающие блики */}
          {[{x:268,y:95},{x:296,y:75},{x:330,y:85},{x:368,y:100},{x:400,y:112}].map((s,i)=>(
            <circle key={i} cx={s.x} cy={s.y} r={2} fill="rgba(220,248,255,0.9)"
              style={{ animation: `firefly ${1+i*0.4}s ease-in-out ${i*0.3}s infinite` }}/>
          ))}

          {/* Этнический орнамент — иней */}
          <path d="M252 200 C272 182 292 200 312 182 C332 164 352 182 428 172" stroke="rgba(80,160,215,0.4)" strokeWidth="1.5" fill="none" strokeDasharray="3 4"/>
          <path d="M258 224 C278 208 298 224 318 208 C338 192 358 208 428 200" stroke="rgba(60,140,200,0.28)" strokeWidth="1" fill="none" strokeDasharray="2 5"/>
          {/* Руна льда */}
          <text x="402" y="160" fontSize="26" fill="rgba(100,185,230,0.38)" style={{ fontFamily: "serif", animation: "mist-drift 4s ease-in-out infinite" }}>ᛁ</text>
        </g>

        {/* ══ MERGE CENTER — Пар ══ */}
        <g clipPath="url(#circle)">
          <ellipse cx="240" cy="280" rx="50" ry="150" fill="url(#steamC)" style={{ animation: "mist-drift 4s ease-in-out infinite" }}/>
          <path d="M234 360 Q228 320 236 285 Q244 252 237 218" stroke="rgba(220,208,190,0.32)" strokeWidth="3.5" fill="none" strokeLinecap="round" className="steam-1"/>
          <path d="M246 355 Q252 315 244 280 Q236 248 243 212" stroke="rgba(215,205,185,0.26)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="steam-2"/>
          <path d="M240 362 Q233 322 240 288 Q247 256 240 220" stroke="rgba(225,212,195,0.22)" strokeWidth="3" fill="none" strokeLinecap="round" className="steam-3"/>
        </g>

        {/* ══ Центральный медальон — точка слияния ══ */}
        <circle cx="240" cy="260" r="22" fill="rgba(8,4,2,0.95)" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5"/>
        <circle cx="240" cy="260" r="15" fill="none" stroke="rgba(200,146,58,0.3)" strokeWidth="1" style={{ animation: "pulseGold 2s ease-in-out 0.5s infinite" }}/>
        {/* Символ: половина лава / половина лёд */}
        <path d="M240 245 C235 248 228 255 228 260 C228 265 235 272 240 275 Z" fill="rgba(255,100,15,0.7)" filter="url(#mGlow)"/>
        <path d="M240 245 C245 248 252 255 252 260 C252 265 245 272 240 275 Z" fill="rgba(160,220,245,0.7)" filter="url(#iGlow)"/>
        <circle cx="240" cy="260" r="4" fill="rgba(200,146,58,0.8)" style={{ animation: "pulseGold 1.5s ease-in-out infinite" }}/>

        {/* Вертикальный разделитель */}
        <line x1="240" y1="65" x2="240" y2="450" stroke="url(#gld)" strokeWidth="1.2" strokeDasharray="5 7" opacity="0.7"/>

        {/* ══ Внешний орнамент ══ */}
        <circle cx="240" cy="260" r="210" fill="none" stroke="rgba(200,146,58,0.1)" strokeWidth="1"/>
        {/* Угловые акценты */}
        <path d="M190 55 Q240 38 290 55" stroke="rgba(200,146,58,0.55)" strokeWidth="2" fill="none"/>
        <circle cx="240" cy="42" r="5" fill="rgba(200,146,58,0.65)" style={{ animation: "pulseGold 3s infinite" }}/>
        <text x="235" y="46" fontSize="7" fill="white" opacity="0.8">✦</text>
        <path d="M190 468 Q240 482 290 468" stroke="rgba(200,146,58,0.55)" strokeWidth="2" fill="none"/>
        <circle cx="240" cy="478" r="5" fill="rgba(200,146,58,0.65)"/>

        {/* ══ Подписи ══ */}
        {/* МАГМА */}
        <rect x="28" y="462" width="90" height="26" rx="13" fill="rgba(180,50,10,0.2)" stroke="rgba(220,80,20,0.4)" strokeWidth="1"/>
        <text x="73" y="479" textAnchor="middle" fontSize="10" fill="rgba(255,110,30,0.85)" fontFamily="Cormorant, serif" letterSpacing="3" fontStyle="italic">МАГМА</text>
        {/* ИНЕЙ */}
        <rect x="362" y="462" width="80" height="26" rx="13" fill="rgba(20,80,140,0.2)" stroke="rgba(80,160,220,0.4)" strokeWidth="1"/>
        <text x="402" y="479" textAnchor="middle" fontSize="10" fill="rgba(140,210,245,0.85)" fontFamily="Cormorant, serif" letterSpacing="3" fontStyle="italic">ИНЕЙ</text>
        {/* ПАР центр */}
        <text x="240" y="503" textAnchor="middle" fontSize="9" fill="rgba(200,180,140,0.5)" fontFamily="Cormorant, serif" letterSpacing="5">✦ ПАР ✦</text>
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

      {/* ── Hero — split screen ── */}
      <section
        className="relative min-h-screen flex flex-col"
        style={{ opacity: entered ? 1 : 0, transition: "opacity 1.2s ease" }}
      >
        {/* Nav spacer */}
        <div style={{ height: "64px" }} />

        {/* Split landscape */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden" style={{ minHeight: "calc(100vh - 64px)" }}>

          {/* ══ LEFT — Вулкан с лавой ══ */}
          <div className="relative flex-1 overflow-hidden" style={{ minHeight: "50vh" }}>
            <svg
              viewBox="0 0 600 900"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="skyMagma" cx="50%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="#2a0800" />
                  <stop offset="50%" stopColor="#180500" />
                  <stop offset="100%" stopColor="#0a0200" />
                </radialGradient>
                <radialGradient id="lavaGlow1" cx="50%" cy="100%" r="60%">
                  <stop offset="0%" stopColor="#ff6010" stopOpacity="0.9" />
                  <stop offset="40%" stopColor="#d43000" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="craterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffaa20" stopOpacity="1" />
                  <stop offset="50%" stopColor="#ff5008" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#800000" stopOpacity="0.5" />
                </radialGradient>
                <linearGradient id="lavaRiver1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff8020" stopOpacity="0.95" />
                  <stop offset="60%" stopColor="#d44010" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#aa2000" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="lavaRiver2" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffaa30" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#e05010" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#901800" stopOpacity="0.65" />
                </linearGradient>
                <radialGradient id="lavaPool1" cx="50%" cy="60%">
                  <stop offset="0%" stopColor="#ff9030" stopOpacity="1" />
                  <stop offset="50%" stopColor="#cc3800" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#550800" stopOpacity="0.8" />
                </radialGradient>
                <filter id="fGlow">
                  <feGaussianBlur stdDeviation="5" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="fSoft"><feGaussianBlur stdDeviation="3"/></filter>
                <filter id="fBlur"><feGaussianBlur stdDeviation="8"/></filter>
              </defs>

              {/* Sky */}
              <rect width="600" height="900" fill="url(#skyMagma)" />
              {/* Sky glow from eruption */}
              <ellipse cx="300" cy="200" rx="280" ry="200" fill="rgba(180,40,5,0.18)" filter="url(#fBlur)"/>
              <ellipse cx="300" cy="180" rx="180" ry="120" fill="rgba(220,80,10,0.12)" filter="url(#fBlur)"/>

              {/* Stars / sparks in sky */}
              {[[80,60],[150,40],[220,80],[350,50],[420,70],[500,45],[540,90],[60,120],[170,100],[480,110]].map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r={1+i%2*0.5} fill={`rgba(255,${160+i*8},${50+i*5},0.6)`}
                  style={{ animation: `pulseGold ${1.5+i*0.3}s ease-in-out ${i*0.2}s infinite` }}/>
              ))}

              {/* Ash clouds */}
              <ellipse cx="280" cy="180" rx="120" ry="55" fill="rgba(40,15,5,0.85)" filter="url(#fSoft)"/>
              <ellipse cx="330" cy="155" rx="90" ry="45" fill="rgba(50,18,6,0.8)" filter="url(#fSoft)"/>
              <ellipse cx="240" cy="200" rx="80" ry="40" fill="rgba(35,12,4,0.75)" filter="url(#fSoft)"/>
              <ellipse cx="380" cy="195" rx="70" ry="38" fill="rgba(45,16,5,0.7)" filter="url(#fSoft)"/>
              <ellipse cx="300" cy="210" rx="140" ry="50" fill="rgba(30,10,3,0.6)" filter="url(#fBlur)"/>
              {/* Glowing ash tops */}
              <ellipse cx="280" cy="162" rx="110" ry="30" fill="rgba(200,70,10,0.15)" filter="url(#fBlur)"/>

              {/* ── Вулкан — силуэт горы ── */}
              {/* Основание горы */}
              <path d="M-20 900 L-20 680 L80 580 L140 520 L200 460 L260 390 L300 330 L340 390 L400 460 L460 520 L520 580 L590 660 L620 900 Z"
                fill="#1a0600"/>
              {/* Слои горы — текстура */}
              <path d="M120 580 L180 520 L230 470 L275 415 L300 380 L325 415 L370 470 L420 520 L480 580 L560 640 L560 900 L60 900 Z"
                fill="#150500"/>
              <path d="M170 580 L220 535 L265 490 L300 450 L335 490 L380 535 L430 580 L500 620 L500 900 L100 900 Z"
                fill="#0f0300"/>
              {/* Скалистые грани */}
              <path d="M300 330 L280 370 L260 390 L280 385 L300 370 L320 385 L340 390 L320 370 Z"
                fill="#200a02"/>
              <path d="M300 330 L290 355 L300 348 L310 355 Z" fill="#2a0e04"/>

              {/* ── Кратер ── */}
              <ellipse cx="300" cy="348" rx="52" ry="22" fill="url(#craterGlow)"
                style={{ animation: "pulseGold 2s ease-in-out infinite" }}/>
              <ellipse cx="300" cy="348" rx="38" ry="15" fill="#ffcc40" opacity="0.9"
                style={{ animation: "pulseGold 1.5s ease-in-out 0.3s infinite" }}/>
              <ellipse cx="300" cy="345" rx="22" ry="9" fill="white" opacity="0.7"
                style={{ animation: "pulseGold 1.2s ease-in-out 0.6s infinite" }}/>
              {/* Кратер — ободок */}
              <ellipse cx="300" cy="348" rx="52" ry="22" fill="none"
                stroke="rgba(255,120,20,0.6)" strokeWidth="3" filter="url(#fGlow)"/>

              {/* ── Выброс из кратера ── */}
              {/* Основной столб */}
              <path d="M290 345 C285 310 275 270 280 240 C288 210 295 180 285 155 C278 135 282 115 290 100"
                stroke="rgba(255,160,30,0.7)" strokeWidth="12" fill="none" strokeLinecap="round" filter="url(#fGlow)"
                style={{ animation: "flicker 2s ease-in-out infinite" }}/>
              <path d="M308 342 C315 305 320 265 315 235 C310 205 318 175 314 150 C312 130 316 110 310 95"
                stroke="rgba(255,100,10,0.65)" strokeWidth="10" fill="none" strokeLinecap="round" filter="url(#fGlow)"
                style={{ animation: "flicker 2.5s ease-in-out 0.4s infinite" }}/>
              <path d="M300 340 C298 300 300 258 298 228 C297 200 302 170 298 145 C296 120 300 100 298 78"
                stroke="rgba(255,180,50,0.55)" strokeWidth="7" fill="none" strokeLinecap="round"
                style={{ animation: "flicker 1.8s ease-in-out 0.8s infinite" }}/>
              {/* Языки огня из кратера */}
              <path d="M287 345 C278 315 270 280 275 255 C282 235 276 210 282 190 C286 175 280 158 286 140"
                fill="rgba(255,140,20,0.5)" stroke="none" filter="url(#fGlow)"
                style={{ animation: "flicker 3s ease-in-out 0.2s infinite" }}/>
              {/* Бомбы вулкана */}
              {[[260,280,6],[340,260,5],[280,220,4],[320,200,5],[255,190,3],[345,185,4]].map(([x,y,r],i)=>(
                <circle key={i} cx={x} cy={y} r={r} fill={`rgba(255,${100+i*15},10,0.8)`}
                  filter="url(#fGlow)" style={{ animation: `pulseGold ${1+i*0.25}s ease-in-out ${i*0.15}s infinite` }}/>
              ))}

              {/* ── ПОТОКИ ЛАВЫ ── */}
              {/* Центральный поток */}
              <path d="M295 365 C290 420 285 480 270 540 C258 590 250 640 240 700 C232 750 225 800 220 900"
                stroke="url(#lavaRiver1)" strokeWidth="22" fill="none" strokeLinecap="round" filter="url(#fGlow)"
                style={{ animation: "pulseGold 2.5s ease-in-out infinite" }}/>
              <path d="M295 365 C290 420 285 480 270 540 C258 590 250 640 240 700 C232 750 225 800 220 900"
                stroke="rgba(255,200,60,0.4)" strokeWidth="8" fill="none" strokeLinecap="round"/>

              {/* Левый поток */}
              <path d="M275 375 C255 430 235 490 215 550 C198 600 185 660 170 720 C158 775 148 840 140 900"
                stroke="url(#lavaRiver2)" strokeWidth="18" fill="none" strokeLinecap="round" filter="url(#fGlow)"
                style={{ animation: "pulseGold 3s ease-in-out 0.4s infinite" }}/>
              <path d="M275 375 C255 430 235 490 215 550 C198 600 185 660 170 720 C158 775 148 840 140 900"
                stroke="rgba(255,180,40,0.3)" strokeWidth="6" fill="none" strokeLinecap="round"/>

              {/* Правый поток */}
              <path d="M315 368 C330 425 345 485 360 545 C372 598 385 652 400 710 C412 762 422 830 428 900"
                stroke="url(#lavaRiver1)" strokeWidth="16" fill="none" strokeLinecap="round" filter="url(#fGlow)"
                style={{ animation: "pulseGold 2.8s ease-in-out 0.7s infinite" }}/>
              <path d="M315 368 C330 425 345 485 360 545 C372 598 385 652 400 710 C412 762 422 830 428 900"
                stroke="rgba(255,160,30,0.3)" strokeWidth="5" fill="none" strokeLinecap="round"/>

              {/* Малый боковой поток */}
              <path d="M260 410 C230 460 210 515 190 575 C174 628 162 685 150 750 C140 805 132 860 125 900"
                stroke="rgba(200,60,10,0.6)" strokeWidth="12" fill="none" strokeLinecap="round"
                style={{ animation: "pulseGold 3.5s ease-in-out 1s infinite" }}/>

              {/* Лавовые озёра у основания */}
              <ellipse cx="220" cy="870" rx="100" ry="35" fill="url(#lavaPool1)" opacity="0.9"
                style={{ animation: "pulseGold 2s ease-in-out infinite" }}/>
              <ellipse cx="400" cy="880" rx="85" ry="28" fill="url(#lavaPool1)" opacity="0.8"
                style={{ animation: "pulseGold 2.5s ease-in-out 0.5s infinite" }}/>
              <ellipse cx="300" cy="895" rx="130" ry="20" fill="rgba(255,100,20,0.6)"
                style={{ animation: "pulseGold 1.8s ease-in-out 0.3s infinite" }}/>
              {/* Блики на лаве */}
              <ellipse cx="200" cy="860" rx="55" ry="15" fill="rgba(255,200,80,0.3)"/>
              <ellipse cx="390" cy="872" rx="42" ry="12" fill="rgba(255,180,60,0.25)"/>

              {/* Раскалённые камни */}
              {[[80,800,35,18],[160,820,28,14],[450,810,32,16],[520,790,22,12],[90,700,18,9],[500,720,20,10]].map(([x,y,rx,ry],i)=>(
                <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry}
                  fill="rgba(30,8,2,0.9)" stroke={`rgba(180,${40+i*10},5,0.5)`} strokeWidth="1"/>
              ))}

              {/* Искры вулкана */}
              {[[270,240],[330,220],[260,190],[340,170],[285,160],[315,145],[290,125],[308,110]].map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r={1.5+i%3} fill={`rgba(255,${180+i*8},30,0.85)`}
                  filter="url(#fGlow)" style={{ animation: `firefly ${0.7+i*0.25}s ease-in-out ${i*0.15}s infinite` }}/>
              ))}

              {/* Подпись */}
              <text x="300" y="30" textAnchor="middle" fontSize="11" fill="rgba(255,140,40,0.55)"
                fontFamily="Cormorant, serif" letterSpacing="5">ПУЛЬСИРУЮЩАЯ МАГМА</text>
            </svg>

            {/* Text overlay — левая сторона */}
            <div className="absolute inset-0 flex items-end pb-16 pl-8 pointer-events-none">
              <div style={{
                opacity: entered ? 1 : 0,
                transform: entered ? "translateX(0)" : "translateX(-30px)",
                transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s",
              }}>
                <p className="text-xs uppercase tracking-[0.5em] mb-2" style={{ color: "rgba(255,140,40,0.6)" }}>Огонь земли</p>
                <h2 style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "rgba(255,180,80,0.95)",
                  lineHeight: 1.1,
                  textShadow: "0 0 40px rgba(255,80,10,0.6)",
                }}>
                  Магма
                </h2>
                <p style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem", color: "rgba(220,160,80,0.7)", fontStyle: "italic", marginTop: "6px" }}>
                  жар, преображение, сила
                </p>
              </div>
            </div>
          </div>

          {/* ══ CENTER divider line ══ */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-0.5 z-20 pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent 0%, rgba(200,146,58,0.6) 20%, rgba(200,146,58,0.9) 50%, rgba(200,146,58,0.6) 80%, transparent 100%)" }}>
            {/* Central emblem */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 rounded-full flex items-center justify-center z-30"
              style={{ background: "rgba(8,4,2,0.98)", border: "1.5px solid rgba(200,146,58,0.7)", boxShadow: "0 0 30px rgba(200,146,58,0.3), 0 0 60px rgba(0,0,0,0.8)" }}>
              <span style={{ fontFamily: "serif", fontSize: "1.4rem", color: "rgba(200,146,58,0.9)", lineHeight: 1 }}>✦</span>
            </div>
          </div>

          {/* ══ RIGHT — Ледяной лес ══ */}
          <div className="relative flex-1 overflow-hidden" style={{ minHeight: "50vh" }}>
            <svg
              viewBox="0 0 600 900"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyIce" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#020810" />
                  <stop offset="40%" stopColor="#040c18" />
                  <stop offset="80%" stopColor="#060e15" />
                  <stop offset="100%" stopColor="#030a0e" />
                </linearGradient>
                <linearGradient id="snowGround" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cce8f4" stopOpacity="0.9"/>
                  <stop offset="60%" stopColor="#8ec8e4" stopOpacity="0.7"/>
                  <stop offset="100%" stopColor="#3a7898" stopOpacity="0.5"/>
                </linearGradient>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e8f4ff" stopOpacity="0.95"/>
                  <stop offset="40%" stopColor="#a0c8e8" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
                </radialGradient>
                <filter id="iGlowF">
                  <feGaussianBlur stdDeviation="4" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <filter id="iSoft"><feGaussianBlur stdDeviation="2.5"/></filter>
                <filter id="iBlur"><feGaussianBlur stdDeviation="10"/></filter>
              </defs>

              {/* Night sky */}
              <rect width="600" height="900" fill="url(#skyIce)" />
              {/* Moon glow */}
              <circle cx="480" cy="90" r="55" fill="url(#moonGlow)" filter="url(#iBlur)"/>
              <circle cx="480" cy="90" r="38" fill="rgba(220,240,255,0.85)"/>
              <circle cx="480" cy="90" r="34" fill="rgba(240,250,255,0.9)"/>
              {/* Moon inner texture */}
              <circle cx="470" cy="85" r="8" fill="rgba(180,210,230,0.3)"/>
              <circle cx="490" cy="95" r="5" fill="rgba(160,200,225,0.25)"/>
              {/* Moon halo */}
              <circle cx="480" cy="90" r="55" fill="none" stroke="rgba(200,230,248,0.2)" strokeWidth="2"/>
              <circle cx="480" cy="90" r="70" fill="none" stroke="rgba(180,220,245,0.1)" strokeWidth="1"/>

              {/* Stars */}
              {[[30,40],[80,25],[150,55],[220,35],[310,20],[380,50],[440,30],[540,60],[570,30],[60,90],[200,80],[360,95],[520,100],[100,130],[280,110],[450,130]].map(([x,y],i)=>(
                <circle key={i} cx={x} cy={y} r={0.8+i%3*0.4} fill={`rgba(${200+i%3*15},${225+i%2*15},255,${0.5+i%3*0.15})`}
                  style={{ animation: `pulseGold ${2+i*0.4}s ease-in-out ${i*0.3}s infinite` }}/>
              ))}

              {/* Snowy ground layers */}
              <path d="M-10 780 Q50 760 120 775 Q180 788 250 768 Q320 750 400 765 Q470 778 540 760 Q580 752 620 758 L620 900 L-10 900 Z"
                fill="rgba(180,220,240,0.35)"/>
              <path d="M-10 810 Q60 795 140 808 Q210 820 300 800 Q380 782 470 798 Q530 810 620 795 L620 900 L-10 900 Z"
                fill="rgba(200,235,248,0.45)"/>
              <path d="M-10 840 Q80 825 200 838 Q320 850 450 832 Q540 820 620 835 L620 900 L-10 900 Z"
                fill="rgba(215,242,252,0.55)"/>
              <path d="M-10 870 L620 870 L620 900 L-10 900 Z" fill="rgba(225,246,255,0.6)"/>
              {/* Snow surface shimmer */}
              {[[60,848,40,8],[200,845,55,10],[360,852,48,9],[510,847,38,7]].map(([x,y,rx,ry],i)=>(
                <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill="rgba(240,252,255,0.35)"/>
              ))}

              {/* ── ДЕРЕВЬЯ с инеем ── */}
              {/* Дерево 1 — дальний план слева */}
              <g opacity="0.5">
                <line x1="55" y1="780" x2="55" y2="450" stroke="#1a2830" strokeWidth="8"/>
                <line x1="55" y1="620" x2="15" y2="540" stroke="#1a2830" strokeWidth="5"/>
                <line x1="55" y1="580" x2="95" y2="510" stroke="#1a2830" strokeWidth="4"/>
                <line x1="55" y1="550" x2="10" y2="490" stroke="#1a2830" strokeWidth="4"/>
                <line x1="55" y1="510" x2="90" y2="455" stroke="#1a2830" strokeWidth="3"/>
                {/* Иней */}
                {[[10,540],[8,490],[12,462],[96,510],[92,455],[15,540],[9,492]].map(([x,y],i)=>(
                  <ellipse key={i} cx={x} cy={y} rx={12+i%3*3} ry={3} fill="rgba(210,240,252,0.5)" transform={`rotate(${-15+i*8} ${x} ${y})`}/>
                ))}
                <path d="M15 540 Q12 535 8 532 Q10 530 14 534 Q16 530 14 527" stroke="rgba(200,235,250,0.6)" strokeWidth="1" fill="none"/>
              </g>

              {/* Дерево 2 — основное, центр-лево */}
              <g>
                <line x1="160" y1="800" x2="160" y2="380" stroke="#0e1e28" strokeWidth="14"/>
                <line x1="160" y1="680" x2="85" y2="580" stroke="#0e1e28" strokeWidth="8"/>
                <line x1="160" y1="620" x2="240" y2="530" stroke="#0e1e28" strokeWidth="7"/>
                <line x1="160" y1="570" x2="72" y2="478" stroke="#0e1e28" strokeWidth="6"/>
                <line x1="160" y1="530" x2="248" y2="448" stroke="#0e1e28" strokeWidth="5"/>
                <line x1="160" y1="490" x2="78" y2="420" stroke="#0e1e28" strokeWidth="5"/>
                <line x1="160" y1="455" x2="235" y2="395" stroke="#0e1e28" strokeWidth="4"/>
                <line x1="160" y1="420" x2="88" y2="368" stroke="#0e1e28" strokeWidth="3"/>
                {/* Веточки */}
                <line x1="85" y1="580" x2="62" y2="558" stroke="#0e1e28" strokeWidth="4"/>
                <line x1="85" y1="580" x2="72" y2="562" stroke="#0e1e28" strokeWidth="3"/>
                <line x1="240" y1="530" x2="262" y2="510" stroke="#0e1e28" strokeWidth="4"/>
                <line x1="72" y1="478" x2="52" y2="460" stroke="#0e1e28" strokeWidth="3"/>
                <line x1="248" y1="448" x2="268" y2="432" stroke="#0e1e28" strokeWidth="3"/>
                {/* Иней на ветках */}
                <path d="M85 580 Q60 572 45 568 Q55 562 75 568 Q80 558 70 552" stroke="rgba(210,240,252,0.8)" strokeWidth="2" fill="rgba(200,235,250,0.15)" filter="url(#iGlowF)"/>
                <path d="M240 530 Q265 522 278 518 Q268 512 252 518 Q248 508 256 502" stroke="rgba(210,240,252,0.75)" strokeWidth="2" fill="rgba(200,235,250,0.12)" filter="url(#iGlowF)"/>
                <path d="M72 478 Q48 470 34 466 Q44 460 64 465 Q68 456 60 450" stroke="rgba(215,242,253,0.7)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                <path d="M248 448 Q272 440 284 436 Q275 430 260 436 Q256 426 263 420" stroke="rgba(215,242,253,0.68)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                {/* Кристаллики инея */}
                {[[60,568],[72,560],[48,466],[260,436],[276,518],[55,462],[265,430]].map(([x,y],i)=>(
                  <g key={i}>
                    <line x1={x} y1={y-6} x2={x} y2={y+6} stroke={`rgba(210,242,255,${0.7+i%3*0.1})`} strokeWidth="1.5"/>
                    <line x1={x-5} y1={y-3} x2={x+5} y2={y+3} stroke={`rgba(210,242,255,${0.6+i%3*0.1})`} strokeWidth="1.5"/>
                    <line x1={x-5} y1={y+3} x2={x+5} y2={y-3} stroke={`rgba(210,242,255,${0.6+i%3*0.1})`} strokeWidth="1.5"/>
                  </g>
                ))}
              </g>

              {/* Дерево 3 — правее, главное */}
              <g>
                <line x1="330" y1="820" x2="330" y2="340" stroke="#0c1822" strokeWidth="16"/>
                <line x1="330" y1="700" x2="238" y2="592" stroke="#0c1822" strokeWidth="9"/>
                <line x1="330" y1="640" x2="428" y2="548" stroke="#0c1822" strokeWidth="8"/>
                <line x1="330" y1="588" x2="228" y2="496" stroke="#0c1822" strokeWidth="7"/>
                <line x1="330" y1="540" x2="432" y2="460" stroke="#0c1822" strokeWidth="6"/>
                <line x1="330" y1="495" x2="235" y2="428" stroke="#0c1822" strokeWidth="5"/>
                <line x1="330" y1="452" x2="422" y2="388" stroke="#0c1822" strokeWidth="4"/>
                <line x1="330" y1="410" x2="240" y2="358" stroke="#0c1822" strokeWidth="4"/>
                <line x1="330" y1="372" x2="408" y2="322" stroke="#0c1822" strokeWidth="3"/>
                {/* Веточки малые */}
                <line x1="238" y1="592" x2="210" y2="570" stroke="#0c1822" strokeWidth="5"/>
                <line x1="238" y1="592" x2="220" y2="575" stroke="#0c1822" strokeWidth="4"/>
                <line x1="428" y1="548" x2="454" y2="528" stroke="#0c1822" strokeWidth="4"/>
                <line x1="228" y1="496" x2="202" y2="478" stroke="#0c1822" strokeWidth="4"/>
                <line x1="432" y1="460" x2="458" y2="444" stroke="#0c1822" strokeWidth="3"/>
                <line x1="235" y1="428" x2="212" y2="412" stroke="#0c1822" strokeWidth="3"/>
                {/* Иней — крупные сосульки */}
                <path d="M238 592 Q205 582 188 576 Q202 568 225 575 Q230 562 218 555" stroke="rgba(215,244,255,0.85)" strokeWidth="2.5" fill="rgba(200,238,252,0.18)" filter="url(#iGlowF)"/>
                <path d="M428 548 Q460 538 476 532 Q464 524 444 530 Q440 518 450 510" stroke="rgba(215,244,255,0.82)" strokeWidth="2.5" fill="rgba(200,238,252,0.15)" filter="url(#iGlowF)"/>
                <path d="M228 496 Q196 486 180 480 Q194 472 218 478 Q222 466 212 460" stroke="rgba(215,244,255,0.78)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                <path d="M432 460 Q462 450 478 444 Q466 436 448 442 Q444 432 452 424" stroke="rgba(215,244,255,0.75)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                <path d="M235 428 Q206 418 190 412 Q202 404 224 410 Q228 400 220 394" stroke="rgba(215,244,255,0.7)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                {/* Сосульки */}
                {[[190,580,14],[205,575,10],[212,572,8],[180,484,16],[195,480,12],[208,477,9],[462,540,13],[474,535,9],[464,434,15],[478,428,10]].map(([x,y,h],i)=>(
                  <polygon key={i} points={`${x-2},${y} ${x+2},${y} ${x},${y+h}`}
                    fill={`rgba(${210+i%3*10},${240+i%2*8},255,0.65)`} filter="url(#iGlowF)"/>
                ))}
                {/* Кристаллики */}
                {[[205,572],[190,480],[455,532],[466,444],[225,408],[210,460]].map(([x,y],i)=>(
                  <g key={i}>
                    <line x1={x} y1={y-7} x2={x} y2={y+7} stroke={`rgba(215,245,255,${0.75+i%3*0.08})`} strokeWidth="1.8"/>
                    <line x1={x-6} y1={y-3} x2={x+6} y2={y+3} stroke={`rgba(215,245,255,${0.68+i%3*0.08})`} strokeWidth="1.8"/>
                    <line x1={x-6} y1={y+3} x2={x+6} y2={y-3} stroke={`rgba(215,245,255,${0.68+i%3*0.08})`} strokeWidth="1.8"/>
                    <circle cx={x} cy={y} r={1.5} fill="rgba(240,252,255,0.9)"/>
                  </g>
                ))}
              </g>

              {/* Дерево 4 — правый край */}
              <g opacity="0.65">
                <line x1="520" y1="810" x2="520" y2="440" stroke="#0e1c28" strokeWidth="11"/>
                <line x1="520" y1="660" x2="450" y2="575" stroke="#0e1c28" strokeWidth="6"/>
                <line x1="520" y1="610" x2="590" y2="532" stroke="#0e1c28" strokeWidth="5"/>
                <line x1="520" y1="565" x2="448" y2="495" stroke="#0e1c28" strokeWidth="5"/>
                <line x1="520" y1="524" x2="588" y2="460" stroke="#0e1c28" strokeWidth="4"/>
                <line x1="520" y1="484" x2="454" y2="428" stroke="#0e1c28" strokeWidth="3"/>
                {/* Иней */}
                <path d="M450 575 Q426 566 414 562 Q424 556 444 562 Q448 552 440 546" stroke="rgba(210,240,252,0.72)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                <path d="M448 495 Q424 486 412 482 Q422 475 442 480 Q446 470 438 464" stroke="rgba(210,240,252,0.68)" strokeWidth="2" fill="none" filter="url(#iGlowF)"/>
                {[[416,560],[412,478],[592,462]].map(([x,y],i)=>(
                  <polygon key={i} points={`${x-2},${y} ${x+2},${y} ${x},${y+12}`}
                    fill={`rgba(210,240,255,0.6)`} filter="url(#iGlowF)"/>
                ))}
              </g>

              {/* Туман / дымка у земли */}
              <ellipse cx="300" cy="800" rx="320" ry="60" fill="rgba(150,210,238,0.12)" filter="url(#iBlur)"/>
              <ellipse cx="200" cy="830" rx="240" ry="40" fill="rgba(160,218,242,0.1)" filter="url(#iBlur)"/>
              <ellipse cx="420" cy="820" rx="200" ry="35" fill="rgba(155,215,240,0.1)" filter="url(#iBlur)"/>

              {/* Лунный свет на снегу */}
              <path d="M420 760 Q480 740 540 755 Q560 758 580 750" stroke="rgba(200,235,252,0.25)" strokeWidth="20" fill="none" filter="url(#iSoft)"/>

              {/* Падающие снежинки */}
              {[[100,200],[200,150],[360,180],[500,140],[80,310],[280,280],[440,300],[560,260],[150,400],[380,420]].map(([x,y],i)=>(
                <text key={i} x={x} y={y} fontSize={10+i%4*3} fill={`rgba(200,235,252,${0.2+i%4*0.08})`}
                  style={{ animation: `leaf-fall-2 ${6+i*0.8}s ease-in ${i*1.1}s infinite` }}>❄</text>
              ))}

              {/* Подпись */}
              <text x="300" y="30" textAnchor="middle" fontSize="11" fill="rgba(140,205,235,0.55)"
                fontFamily="Cormorant, serif" letterSpacing="5">ХРУСТАЛЬНЫЙ ИНЕЙ</text>
            </svg>

            {/* Text overlay — правая сторона */}
            <div className="absolute inset-0 flex items-end pb-16 justify-end pr-8 pointer-events-none">
              <div style={{
                textAlign: "right",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateX(0)" : "translateX(30px)",
                transition: "all 1.4s cubic-bezier(0.16,1,0.3,1) 0.8s",
              }}>
                <p className="text-xs uppercase tracking-[0.5em] mb-2" style={{ color: "rgba(140,205,240,0.6)" }}>Дыхание зимы</p>
                <h2 style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  color: "rgba(180,228,248,0.95)",
                  lineHeight: 1.1,
                  textShadow: "0 0 40px rgba(80,160,220,0.6)",
                }}>
                  Иней
                </h2>
                <p style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem", color: "rgba(160,215,240,0.7)", fontStyle: "italic", marginTop: "6px" }}>
                  покой, чистота, хрусталь
                </p>
              </div>
            </div>
          </div>

          {/* ── Center title (mobile) ── */}
          <div className="md:hidden absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="text-center px-4 py-3 rounded-2xl"
              style={{ background: "rgba(5,3,2,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(200,146,58,0.25)" }}>
              <h1 style={{ fontFamily: "'Cormorant', serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--eth-gold2)", lineHeight: 1.2 }}>
                Иней<br />&amp; Магма
              </h1>
            </div>
          </div>

          {/* ── Scroll hint ── */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            style={{ animation: "pulseGold 2s ease-in-out infinite", color: "rgba(200,146,58,0.5)" }}>
            <span className="text-xs tracking-widest" style={{ fontFamily: "'Cormorant', serif" }}>далее</span>
            <Icon name="ChevronDown" size={16} />
          </div>
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