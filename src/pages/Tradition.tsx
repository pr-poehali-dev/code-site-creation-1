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