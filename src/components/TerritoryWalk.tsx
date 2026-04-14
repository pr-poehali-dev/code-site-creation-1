import { useState, useRef } from "react";

const zones = [
  {
    id: "healing-center", title: "Целительский центр", subtitle: "Апартаменты для гостей", emoji: "🏛️", mapLabel: "ЦЕНТР",
    desc: "Сердце нашего пространства. Деревянный особняк с тёплыми апартаментами, где каждая деталь создана для восстановления. Резные потолки, живые растения, запах кедра и трав.",
    details: ["Апартаменты с панорамными окнами", "Авторский интерьер из натурального дерева", "Открытые террасы с видом на лес", "Персональный консьерж и программа пребывания"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/88732ba1-9af1-4411-a6dc-d60fb1b1a1c2.jpg",
    color: "#8B5E3C", accent: "rgba(139,94,60,0.15)", icon: "🌿", mapX: 460, mapY: 305,
  },
  {
    id: "medtech", title: "MedTech зона", subtitle: "Диагностика и высокие технологии", emoji: "🔬", mapLabel: "MED TECH",
    desc: "Современное оборудование в обрамлении натуральных материалов. Криокапсулы, LED-терапия, гипербарическая оксигенация — технологии долголетия в деревянном пространстве.",
    details: ["Криокапсула и LED-панели", "Гипербарическая оксигенация", "Аппаратная диагностика тела", "PRP и инъекционные кабинеты"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/360e91a8-d769-4770-850a-b1537c72b2c0.jpg",
    color: "#3A7A6A", accent: "rgba(58,122,106,0.15)", icon: "⚗️", mapX: 310, mapY: 255,
  },
  {
    id: "longevity", title: "Зона Longevity", subtitle: "Протоколы долголетия", emoji: "✨", mapLabel: "LONGEVITY",
    desc: "Персонализированные программы биохакинга и антиэйджинга. Здесь наука встречается с природой — каждый протокол разработан индивидуально.",
    details: ["Индивидуальные программы омоложения", "Капельницы с витаминными коктейлями", "Озонотерапия и ВЛОК", "Полный чекап организма"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e6adfd17-af96-46fd-8a2f-0195ba659c74.jpg",
    color: "#6A4A8C", accent: "rgba(106,74,140,0.15)", icon: "🧬", mapX: 610, mapY: 255,
  },
  {
    id: "pool", title: "Бассейн и движение", subtitle: "Беговые и велодорожки", emoji: "🏊", mapLabel: "БАССЕЙН",
    desc: "Природный бассейн с ключевой водой окружён живыми камнями и соснами. Вдоль леса проложены беговые и велодорожки.",
    details: ["Природный бассейн без хлора", "5 км беговых дорожек", "Велодорожки с прокатом", "Тренажёры на воздухе"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/f21d798d-86b2-4b28-8faf-ea53e3a589cc.jpeg",
    color: "#2A6A9A", accent: "rgba(42,106,154,0.15)", icon: "💧", mapX: 460, mapY: 175,
  },
  {
    id: "banya", title: "Баня", subtitle: "Русская банная традиция", emoji: "🔥", mapLabel: "БАНЯ",
    desc: "Бревенчатая баня, деревянный чан с горячими травяными настоями и лесная купель. Берёзовый веник, медово-травяной пилинг, ароматерапия.",
    details: ["Баня на дровах", "Чан с травами и купель", "Авторские банные ритуалы", "Этнические церемонии"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/1e2e1715-1107-47f6-ae90-53b9387fc14c.jpg",
    color: "#A04020", accent: "rgba(160,64,32,0.15)", icon: "🌿", mapX: 735, mapY: 305,
  },
  {
    id: "vip-cabins", title: "VIP домики", subtitle: "Деревянные резиденции", emoji: "🏡", mapLabel: "VIP ДОМА",
    desc: "Отдельные деревянные домики среди вековых сосен с резными наличниками, камином, верандой и полной приватностью.",
    details: ["Домик в лесу", "Камин и джакузи на террасе", "Персональный шеф-повар", "Полная приватность"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/a856d357-54c9-48c9-b0cc-731291f0342d.jpg",
    color: "#8B5E3C", accent: "rgba(139,94,60,0.15)", icon: "⭐", mapX: 735, mapY: 435,
  },
  {
    id: "campfire", title: "Костровая зона", subtitle: "Ужины у огня", emoji: "🪵", mapLabel: "КОСТЁР",
    desc: "Большое кострище из природного камня, деревянные столы с резьбой. Вечерние ужины с фермерской едой и живой музыкой.",
    details: ["Ужины от шеф-повара", "Фермерские продукты", "Живая музыка", "Ночные церемонии"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/75c9649e-22d9-4bfc-bf4d-56ea36522f16.jpg",
    color: "#B07010", accent: "rgba(176,112,16,0.15)", icon: "🌙", mapX: 610, mapY: 495,
  },
  {
    id: "forest", title: "Лесные прогулки", subtitle: "Ручейки и беседки", emoji: "🌲", mapLabel: "ЛЕС",
    desc: "Извилистые тропы через старый лес, деревянные мостики над ручьями, укромные беседки с резными узорами.",
    details: ["Тропы разной сложности", "Беседки над ручьями", "Лесные ванны (шинрин-йоку)", "Гид-натуралист"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/26e2719a-58a5-4686-8542-278ee0018437.jpg",
    color: "#3A6A3A", accent: "rgba(58,106,58,0.15)", icon: "🍃", mapX: 185, mapY: 435,
  },
  {
    id: "meadow", title: "Медитативная поляна", subtitle: "Тишина и практики", emoji: "🧘", mapLabel: "ПОЛЯНА",
    desc: "Открытая поляна — солнечный круг для медитаций, звуковых чаш и дыхательных практик. Деревянный помост с этническими узорами.",
    details: ["Медитации на рассвете", "Звуковые ванны", "Групповые практики", "Встреча солнца"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e8a973eb-f25f-42c5-bcc3-0dab13ca1686.jpg",
    color: "#5A8A3A", accent: "rgba(90,138,58,0.15)", icon: "☀️", mapX: 310, mapY: 495,
  },
  {
    id: "creativity", title: "Зона творчества", subtitle: "Мастерские и растения", emoji: "🎨", mapLabel: "ТВОРЧЕСТВО",
    desc: "Просторная мастерская в тропических растениях. Гончарный круг, ткацкий станок, живопись, плетение.",
    details: ["Гончарная мастерская", "Ткачество и плетение", "Этнические ремёсла", "Свободное творчество"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/554d67fb-1525-4cf0-8c9f-7d7dbcb1cb7c.jpg",
    color: "#9A4A6A", accent: "rgba(154,74,106,0.15)", icon: "🌺", mapX: 185, mapY: 255,
  },
];

// ── SVG-иконки зон в стиле скетча ──────────────────────────────────────────

function SketchHouse({ x, y, s = 1, c = "#8B5E3C" }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d={`M ${-16*s} ${2*s} C ${-12*s} ${-4*s} 0 ${-16*s} ${16*s} ${2*s}`}
        fill={`${c}28`} stroke={c} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
      <rect x={-11*s} y={2*s} width={22*s} height={14*s} rx={1}
        fill={`${c}18`} stroke={c} strokeWidth={1.2} />
      <rect x={-3*s} y={9*s} width={6*s} height={7*s} rx={1}
        fill={`${c}38`} stroke={c} strokeWidth={0.9} />
      <rect x={-9*s} y={4*s} width={5*s} height={4*s} rx={0.5}
        fill={`${c}28`} stroke={c} strokeWidth={0.8} />
      <line x1={-6.5*s} y1={4*s} x2={-6.5*s} y2={8*s} stroke={c} strokeWidth={0.5} />
      <line x1={-9*s} y1={6*s} x2={-4*s} y2={6*s} stroke={c} strokeWidth={0.5} />
    </g>
  );
}

function SketchBanya({ x, y, c = "#A04020" }: { x: number; y: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M -14 3 C -11 -2 0 -14 14 3" fill={`${c}28`} stroke={c} strokeWidth={1.4} strokeLinecap="round" />
      <rect x="-10" y="3" width="20" height="13" rx={1} fill={`${c}18`} stroke={c} strokeWidth={1.2} />
      <line x1="6" y1="-13" x2="6" y2="-7" stroke={c} strokeWidth={1.8} strokeLinecap="round" />
      <path d="M 6 -7 C 7 -12 11 -14 9 -18" fill="none" stroke={`${c}70`} strokeWidth={1.1} strokeLinecap="round" />
      {[-1, 4, 9].map(y2 => (
        <line key={y2} x1={-10} y1={y2+3} x2={10} y2={y2+3} stroke={c} strokeWidth={0.5} strokeOpacity={0.45} />
      ))}
      <path d="M -3 16 L -3 9 C -3 7 3 7 3 9 L 3 16" fill={`${c}38`} stroke={c} strokeWidth={0.9} />
    </g>
  );
}

function SketchPool({ x, y, c = "#2A6A9A" }: { x: number; y: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0} cy={4} rx={20} ry={12} fill={`${c}22`} stroke={c} strokeWidth={1.4} />
      {[-5, 1, 7].map((yw, i) => (
        <path key={i} d={`M ${-12} ${yw+4} C ${-6} ${yw+1} ${-2} ${yw+7} ${0} ${yw+4} C ${2} ${yw+1} ${6} ${yw+7} ${12} ${yw+4}`}
          fill="none" stroke={`${c}80`} strokeWidth={0.9} />
      ))}
    </g>
  );
}

function SketchTree({ x, y, s = 1, c = "#3A6A3A" }: { x: number; y: number; s?: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d={`M ${-1.5*s} ${13*s} C ${-1*s} ${9*s} ${1*s} ${5*s} 0 0`}
        stroke="hsl(25,38%,22%)" strokeWidth={2*s} fill="none" strokeLinecap="round" />
      <path d={`M 0 0 C ${-8*s} ${3*s} ${-10*s} ${9*s} 0 ${7*s} C ${10*s} ${9*s} ${8*s} ${3*s} 0 0`}
        fill={c} stroke={`${c}bb`} strokeWidth={0.7} />
      <path d={`M 0 ${-5*s} C ${-7*s} ${-1*s} ${-8*s} ${4*s} 0 ${3*s} C ${8*s} ${4*s} ${7*s} ${-1*s} 0 ${-5*s}`}
        fill={c} stroke={`${c}bb`} strokeWidth={0.7} />
      <path d={`M 0 ${-10*s} C ${-5*s} ${-6*s} ${-6*s} ${-1*s} 0 ${0} C ${6*s} ${-1*s} ${5*s} ${-6*s} 0 ${-10*s}`}
        fill={c} stroke={`${c}bb`} strokeWidth={0.7} />
    </g>
  );
}

function SketchGazebo({ x, y, c = "#5A8A3A" }: { x: number; y: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M 0 -14 C -13 -4 -15 7 -13 15 L 13 15 C 15 7 13 -4 0 -14 Z"
        fill={`${c}18`} stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
      <ellipse cx={0} cy={-13} rx={4.5} ry={2.5} fill={`${c}38`} stroke={c} strokeWidth={0.9} />
      {[-7, 0, 7].map(xp => (
        <line key={xp} x1={xp} y1={-7} x2={xp} y2={15} stroke={c} strokeWidth={0.6} strokeOpacity={0.5} />
      ))}
    </g>
  );
}

function SketchCabin({ x, y, c = "#8B5E3C" }: { x: number; y: number; c?: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M 0 -18 C -5 -10 -18 0 -20 16 L 20 16 C 18 0 5 -10 0 -18 Z"
        fill={`${c}22`} stroke={c} strokeWidth={1.3} strokeLinejoin="round" />
      <line x1={0} y1={-18} x2={0} y2={16} stroke={c} strokeWidth={0.7} strokeDasharray="2 2" />
      <path d="M -4 16 C -4 9 4 9 4 16" fill={`${c}38`} stroke={c} strokeWidth={0.9} />
    </g>
  );
}

// Декоративные деревья фона
const BG_TREES = [
  [55,65,0.62],[120,42,0.55],[195,72,0.58],[262,46,0.5],[338,30,0.53],[455,43,0.5],[558,30,0.53],[658,43,0.58],[742,56,0.62],[822,40,0.55],[880,70,0.58],
  [38,148,0.53],[90,182,0.5],[48,292,0.53],[68,398,0.5],[35,478,0.58],[80,538,0.5],[142,562,0.53],[35,556,0.5],
  [868,142,0.53],[898,212,0.5],[868,308,0.53],[892,412,0.5],[856,502,0.58],[872,552,0.5],[818,562,0.53],
  [195,572,0.5],[318,582,0.5],[425,582,0.5],[535,570,0.5],[652,580,0.5],[745,565,0.53],
  [158,115,0.5],[278,106,0.53],[368,98,0.5],[548,98,0.5],[635,108,0.5],[716,120,0.53],[796,128,0.5],
];

const MAP_LABELS = [
  { x: 75, y: 182, text: "~ река ~", rot: -22, color: "#5A7A9A", sz: 8.5 },
  { x: 50, y: 308, text: "ручей", rot: -68, color: "#5A7A9A", sz: 8 },
  { x: 460, y: 110, text: "купальня", rot: -5, color: "#4A6A8A", sz: 8 },
  { x: 758, y: 226, text: "баня", rot: 14, color: "#8A4020", sz: 9.5 },
  { x: 762, y: 465, text: "VIP", rot: 6, color: "#7A4A20", sz: 9 },
  { x: 242, y: 556, text: "лес", rot: -5, color: "#3A6A3A", sz: 9.5 },
  { x: 500, y: 558, text: "поляна", rot: 4, color: "#4A7A2A", sz: 8.5 },
  { x: 138, y: 172, text: "чаща", rot: -18, color: "#3A5A3A", sz: 7.5 },
  { x: 818, y: 152, text: "бор", rot: 12, color: "#3A5A3A", sz: 7.5 },
  { x: 298, y: 145, text: "озеро", rot: -3, color: "#3A6A8A", sz: 8 },
];

const RUNES = [
  { x: 36, y: 30, r: "ᚱ" }, { x: 884, y: 28, r: "ᚠ" },
  { x: 36, y: 590, r: "ᚾ" }, { x: 884, y: 590, r: "ᛏ" },
  { x: 460, y: 20, r: "ᛚ" }, { x: 460, y: 598, r: "ᛖ" },
  { x: 232, y: 20, r: "ᚢ" }, { x: 688, y: 20, r: "ᛗ" },
  { x: 20, y: 308, r: "ᛁ" }, { x: 900, y: 308, r: "ᚹ" },
];

const ORNAMENTS = [
  { x: 460, y: 348, sz: 13 }, { x: 145, y: 340, sz: 9 }, { x: 775, y: 342, sz: 9 },
  { x: 460, y: 128, sz: 8 }, { x: 460, y: 570, sz: 8 },
  { x: 228, y: 145, sz: 7 }, { x: 692, y: 145, sz: 7 },
];

const TRAILS = [
  "M 460 305 C 402 290 358 272 310 255",
  "M 310 255 C 292 228 350 198 460 175",
  "M 460 175 C 524 162 567 228 610 255",
  "M 610 255 C 658 272 700 288 735 305",
  "M 735 305 C 752 352 748 398 735 435",
  "M 735 435 C 675 462 645 480 610 495",
  "M 460 305 C 408 348 358 435 310 495",
  "M 310 495 C 262 468 218 450 185 435",
  "M 185 435 C 166 382 170 318 185 255",
  "M 185 255 C 238 242 278 250 310 255",
  "M 610 495 C 535 512 495 450 460 305",
];

function EthnicOrnament({ x, y, sz = 10 }: { x: number; y: number; sz?: number }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={0.18}>
      {[0, 45, 90, 135].map(a => {
        const r = (a * Math.PI) / 180;
        return (
          <g key={a}>
            <line x1={-Math.cos(r)*sz} y1={-Math.sin(r)*sz} x2={Math.cos(r)*sz} y2={Math.sin(r)*sz}
              stroke="#8B5E3C" strokeWidth={1.2} />
            <circle cx={Math.cos(r)*sz} cy={Math.sin(r)*sz} r={1.5} fill="#8B5E3C" />
            <circle cx={-Math.cos(r)*sz} cy={-Math.sin(r)*sz} r={1.5} fill="#8B5E3C" />
          </g>
        );
      })}
      <circle cx={0} cy={0} r={sz * 0.35} fill="none" stroke="#8B5E3C" strokeWidth={1} />
      <circle cx={0} cy={0} r={2.2} fill="#8B5E3C" />
    </g>
  );
}

function ZoneMarker({ zone, i, isActive, isHov, onSelect, onHover, onLeave }: {
  zone: typeof zones[0]; i: number; isActive: boolean; isHov: boolean;
  onSelect: (i: number) => void; onHover: (i: number) => void; onLeave: () => void;
}) {
  const scale = isActive ? 1.45 : isHov ? 1.28 : 1;
  const c = zone.color;

  const iconInner = (() => {
    switch (zone.id) {
      case "healing-center": return <SketchHouse x={0} y={-8} s={0.9} c={c} />;
      case "medtech": return <SketchHouse x={0} y={-8} s={0.82} c={c} />;
      case "longevity": return <SketchCabin x={0} y={-3} c={c} />;
      case "pool": return <SketchPool x={0} y={-6} c={c} />;
      case "banya": return <SketchBanya x={0} y={-8} c={c} />;
      case "vip-cabins": return <SketchHouse x={0} y={-8} s={1.02} c={c} />;
      case "campfire": return (
        <g>
          <circle cx={0} cy={2} r={11} fill={`${c}18`} stroke={c} strokeWidth={1.2} />
          <path d="M 0 8 C -5 2 -3 -4 0 -7 C 3 -4 5 2 0 8 Z" fill={`${c}48`} stroke={c} strokeWidth={0.9} />
        </g>
      );
      case "forest": return <SketchTree x={0} y={2} s={0.85} c={c} />;
      case "meadow": return <SketchGazebo x={0} y={-7} c={c} />;
      case "creativity": return (
        <g>
          <circle cx={0} cy={0} r={13} fill={`${c}18`} stroke={c} strokeWidth={1.2} />
          <path d="M -7 4 C -5 -2 -2 -5 0 -7 C 2 -5 5 -2 7 4 C 3 7 -3 7 -7 4 Z" fill={`${c}38`} stroke={c} strokeWidth={0.9} />
        </g>
      );
      default: return <circle cx={0} cy={0} r={13} fill={`${c}28`} stroke={c} strokeWidth={1.3} />;
    }
  })();

  return (
    <g
      transform={`translate(${zone.mapX},${zone.mapY}) scale(${scale})`}
      style={{ cursor: "pointer", transformOrigin: "center", transformBox: "fill-box", transition: "transform 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}
      onClick={() => onSelect(i)}
      onMouseEnter={() => onHover(i)}
      onMouseLeave={onLeave}>
      {isActive && (
        <circle cx={0} cy={0} r={26} fill="none" stroke={c} strokeWidth={1.5} opacity={0.25}
          style={{ animation: "sketchPulse 2.5s ease-out infinite" }} />
      )}
      <ellipse cx={2} cy={24} rx={15} ry={4} fill="rgba(100,70,20,0.25)" />
      {iconInner}
      {(isActive || isHov) && (
        <g>
          <rect x={-38} y={28} width={76} height={17} rx={2}
            fill="#F5EDD8" stroke={c} strokeWidth={0.9} opacity={0.96} />
          <text x={0} y={40} textAnchor="middle" fill={c}
            style={{ fontSize: "7px", fontFamily: "'Georgia', serif", fontWeight: 700, letterSpacing: "0.05em", userSelect: "none", pointerEvents: "none" }}>
            {zone.mapLabel}
          </text>
        </g>
      )}
    </g>
  );
}

function TerritoryMap({ activeZone, onSelect }: { activeZone: number; onSelect: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 920, H = 615;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: "#EDD99A", border: "2px solid #C8A870", boxShadow: "0 8px 40px rgba(100,70,20,0.3), inset 0 0 80px rgba(180,130,40,0.12)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ display: "block" }}>
        <defs>
          <filter id="sk-ink">
            <feTurbulence type="turbulence" baseFrequency="0.032" numOctaves="2" result="noise" seed="7" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="sk-soft">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" result="noise" seed="3" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <radialGradient id="vig" cx="50%" cy="50%" r="70%">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(110,75,15,0.2)" />
          </radialGradient>
        </defs>

        {/* Фон */}
        <rect x={0} y={0} width={W} height={H} fill="#EDD99A" />
        <rect x={0} y={0} width={W} height={H} fill="url(#vig)" />

        {/* Рамка двойная */}
        <rect x={11} y={9} width={W-22} height={H-18} rx={3}
          fill="none" stroke="#9A7030" strokeWidth={2.5} opacity={0.55} filter="url(#sk-ink)" />
        <rect x={17} y={15} width={W-34} height={H-30} rx={2}
          fill="none" stroke="#9A7030" strokeWidth={0.9} opacity={0.3} strokeDasharray="12 4 2 4" />

        {/* Угловые украшения */}
        {[[16,16],[W-16,16],[16,H-14],[W-16,H-14]].map(([cx,cy],i) => (
          <g key={i} transform={`translate(${cx},${cy})`} opacity={0.5}>
            <path d="M -9 0 C -5 -4 5 -4 9 0 C 5 4 -5 4 -9 0 Z" fill="none" stroke="#8B5E3C" strokeWidth={1.1} />
            <path d="M 0 -9 C 4 -5 4 5 0 9 C -4 5 -4 -5 0 -9 Z" fill="none" stroke="#8B5E3C" strokeWidth={1.1} />
            <circle r={2} fill="#8B5E3C" />
          </g>
        ))}

        {/* Ручей */}
        <path d="M 93 163 C 108 198 98 236 106 276 C 114 316 90 358 113 400 C 133 438 123 480 106 526 C 96 553 126 566 146 560"
          fill="none" stroke="#8AAAC8" strokeWidth={10} strokeLinecap="round" opacity={0.28} />
        <path d="M 93 163 C 108 198 98 236 106 276 C 114 316 90 358 113 400 C 133 438 123 480 106 526 C 96 553 126 566 146 560"
          fill="none" stroke="#5A8AB0" strokeWidth={2.3} strokeLinecap="round"
          strokeDasharray="16 5 4 5" filter="url(#sk-soft)" opacity={0.8} />
        {[168,218,268,318,368,418,468,518].map((yw, i) => (
          <path key={i} d={`M ${86+Math.sin(i)*4} ${yw} C ${93+Math.sin(i)*3} ${yw-4} ${106+Math.cos(i)*3} ${yw+4} ${113+Math.sin(i)*4} ${yw}`}
            fill="none" stroke="#5A8AB0" strokeWidth={0.85} opacity={0.45} />
        ))}

        {/* Тропы */}
        {TRAILS.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="#C8A060" strokeWidth={4.5} strokeLinecap="round" opacity={0.12} />
            <path d={d} fill="none" stroke="#9A7030" strokeWidth={1.5}
              strokeDasharray="9 7" strokeLinecap="round" opacity={0.5} filter="url(#sk-soft)" />
          </g>
        ))}

        {/* Кольцевая тропа */}
        <ellipse cx={460} cy={345} rx={290} ry={200}
          fill="none" stroke="#C8A060" strokeWidth={15} opacity={0.1} />
        <ellipse cx={460} cy={345} rx={290} ry={200}
          fill="none" stroke="#9A7030" strokeWidth={1.7}
          strokeDasharray="14 6 3 6" opacity={0.38} filter="url(#sk-soft)" />

        {/* Фоновые деревья */}
        {BG_TREES.map(([tx, ty, op], i) => (
          <g key={i} opacity={op}>
            <SketchTree x={tx} y={ty} s={0.52 + (i % 4) * 0.07}
              c={`hsl(${118 + (i%9)*4}, ${30+(i%5)*3}%, ${19+(i%4)*4}%)`} />
          </g>
        ))}

        {/* Этнические орнаменты */}
        {ORNAMENTS.map((o, i) => <EthnicOrnament key={i} x={o.x} y={o.y} sz={o.sz} />)}

        {/* Руны */}
        {RUNES.map((r, i) => (
          <text key={i} x={r.x} y={r.y} textAnchor="middle" dominantBaseline="central"
            fill="#8B5E3C" opacity={0.32}
            style={{ fontSize: "12px", fontFamily: "serif", userSelect: "none" }}>
            {r.r}
          </text>
        ))}

        {/* Подписи */}
        {MAP_LABELS.map((lbl, i) => (
          <text key={i} x={lbl.x} y={lbl.y} textAnchor="middle"
            fill={lbl.color} opacity={0.72}
            transform={`rotate(${lbl.rot}, ${lbl.x}, ${lbl.y})`}
            filter="url(#sk-soft)"
            style={{ fontSize: `${lbl.sz}px`, fontFamily: "'Georgia', serif", fontStyle: "italic", userSelect: "none", letterSpacing: "0.04em" }}>
            {lbl.text}
          </text>
        ))}

        {/* Зоны */}
        {zones.map((zone, i) => (
          <ZoneMarker key={zone.id} zone={zone} i={i}
            isActive={i === activeZone} isHov={hovered === i}
            onSelect={onSelect} onHover={setHovered} onLeave={() => setHovered(null)} />
        ))}

        {/* Компас */}
        <g transform="translate(856,60)" opacity={0.72}>
          <circle cx={0} cy={0} r={21} fill="#F5EDD8" stroke="#8B5E3C" strokeWidth={1.4} filter="url(#sk-ink)" />
          <circle cx={0} cy={0} r={16} fill="none" stroke="#8B5E3C" strokeWidth={0.7} strokeDasharray="3 2" opacity={0.45} />
          <path d="M 0 -17 L 3.5 0 L 0 4.5 L -3.5 0 Z" fill="#8B3A20" />
          <path d="M 0 17 L 3.5 0 L 0 -4.5 L -3.5 0 Z" fill="#C8A060" opacity={0.38} />
          <path d="M -17 0 L 0 3.5 L 4.5 0 L 0 -3.5 Z" fill="#C8A060" opacity={0.38} />
          <path d="M 17 0 L 0 3.5 L -4.5 0 L 0 -3.5 Z" fill="#C8A060" opacity={0.38} />
          <text x={0} y={-10} textAnchor="middle" fill="#6A3A18" style={{ fontSize: "6.5px", fontWeight: 700, fontFamily: "'Georgia', serif", userSelect: "none" }}>С</text>
          <text x={0} y={17} textAnchor="middle" fill="#6A3A18" style={{ fontSize: "6.5px", fontFamily: "'Georgia', serif", userSelect: "none" }}>Ю</text>
          <text x={-12} y={4} textAnchor="middle" fill="#6A3A18" style={{ fontSize: "6.5px", fontFamily: "'Georgia', serif", userSelect: "none" }}>З</text>
          <text x={12} y={4} textAnchor="middle" fill="#6A3A18" style={{ fontSize: "6.5px", fontFamily: "'Georgia', serif", userSelect: "none" }}>В</text>
          <circle cx={0} cy={0} r={2.5} fill="#8B5E3C" />
        </g>

        {/* Легенда */}
        <g transform="translate(24,430)">
          <rect x={0} y={0} width={94} height={80} rx={3}
            fill="#F5EDD8" stroke="#8B5E3C" strokeWidth={1.2} opacity={0.92} filter="url(#sk-ink)" />
          <text x={8} y={14} fill="#8B5E3C"
            style={{ fontSize: "7.5px", fontFamily: "'Georgia', serif", fontStyle: "italic", letterSpacing: "0.07em", fontWeight: 700, userSelect: "none" }}>
            легенда
          </text>
          <path d="M 8 22 C 10 18 14 18 15 22 C 16 18 20 18 22 22" fill="#8B5E3C28" stroke="#8B5E3C" strokeWidth={0.9} />
          <text x={27} y={26} fill="#5A3A20" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>постройка</text>
          <line x1={8} y1={40} x2={22} y2={40} stroke="#5A8AB0" strokeWidth={2.5} strokeLinecap="round" />
          <text x={27} y={44} fill="#5A3A20" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>ручей</text>
          <line x1={8} y1={55} x2={22} y2={55} stroke="#9A7030" strokeWidth={1.5} strokeDasharray="5 4" />
          <text x={27} y={59} fill="#5A3A20" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>тропа</text>
          <text x={8} y={74} fill="#8B5E3C" opacity={0.65} style={{ fontSize: "6.5px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>↑ нажми на зону</text>
        </g>

        {/* Заголовок */}
        <text x={460} y={29} textAnchor="middle" fill="#8B5E3C" opacity={0.5} filter="url(#sk-soft)"
          style={{ fontSize: "9px", fontFamily: "'Georgia', serif", fontStyle: "italic", letterSpacing: "0.2em", userSelect: "none" }}>
          ✦ карта территории целительского центра ✦
        </text>

        <style>{`
          @keyframes sketchPulse {
            0% { r: 26; opacity: 0.28; }
            100% { r: 52; opacity: 0; }
          }
        `}</style>
      </svg>
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(245,237,216,0.85)", color: "#8B5E3C", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          нажмите на зону чтобы узнать подробности
        </span>
      </div>
    </div>
  );
}

// ── Расписание дня ────────────────────────────────────────────────────────────

const daySchedule = [
  { time: "06:30", icon: "🌅", title: "Подъём с солнцем", desc: "Тихое пробуждение без будильника. Стакан тёплой воды с лимоном и мёдом, прогулка к ручью." },
  { time: "07:00", icon: "🧘", title: "Утренняя практика", desc: "Медитация на рассвете на деревянной поляне. Пранаяма и звуковые чаши — настройка на день." },
  { time: "08:00", icon: "🍵", title: "Живой завтрак", desc: "Авторский завтрак по вашему протоколу питания. Травяные чаи, ферментированные продукты, суперфуды." },
  { time: "09:30", icon: "🔬", title: "Медицинский блок", desc: "Процедуры по программе: капельницы, LED-терапия, гипербарика, остеопатия или аюрведа." },
  { time: "12:00", icon: "🌲", title: "Лесная прогулка", desc: "Шинрин-йоку — японская практика лесных ванн. Фитонциды, тишина, наблюдение за природой." },
  { time: "13:30", icon: "🥗", title: "Обед", desc: "Живая еда по сезону — суп из лесных трав, пророщенные злаки, ферменты. Всё выращено рядом." },
  { time: "15:00", icon: "🤲", title: "Телесные практики", desc: "Аюрведический массаж с маслами, стоун-терапия или мануальная терапия. Два часа глубокой работы с телом." },
  { time: "17:00", icon: "🔥", title: "Баня и чан", desc: "Берёзовый веник, горячий чан с травами, ледяная купель. Ритуал очищения под руководством мастера." },
  { time: "19:00", icon: "🪵", title: "Ужин у костра", desc: "Фермерская еда, живая музыка, истории у огня. Время для разговоров и тишины." },
  { time: "21:00", icon: "🌙", title: "Вечерний ритуал", desc: "Травяной чай, дыхательная практика, подготовка ко сну. Никаких экранов — только звёзды." },
  { time: "22:00", icon: "😴", title: "Сон", desc: "Полная темнота, тишина леса, прохладный воздух. 8 часов восстановительного сна каждую ночь." },
];

function DaySchedule() {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-16 px-6 relative" style={{ background: "#0d0a07" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #c8923a)" }} />
            <span style={{ color: "#c8923a", fontSize: "1.2rem" }}>☀️</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #c8923a, transparent)" }} />
          </div>
          <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "#8a7a65" }}>Типичный день</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
            День в центре:<br /><em style={{ color: "#c8923a" }}>от рассвета до звёзд</em>
          </h2>
          <p className="text-base" style={{ color: "#8a9a78", fontFamily: "'Cormorant', serif", fontSize: "1.05rem" }}>
            Каждый день выстроен так, чтобы тело и ум восстанавливались по всем системам
          </p>
        </div>
        <div className="relative">
          <div className="absolute left-[52px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(200,146,58,0.3) 10%, rgba(200,146,58,0.3) 90%, transparent 100%)" }} />
          <div className="space-y-1">
            {(open ? daySchedule : daySchedule.slice(0, 5)).map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 flex flex-col items-center" style={{ width: "52px" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-base z-10 relative transition-all group-hover:scale-110"
                    style={{ background: "#16120e", border: "1px solid rgba(200,146,58,0.3)", boxShadow: "0 0 0 3px #0d0a07" }}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] mt-1 tabular-nums" style={{ color: "#c8923a", opacity: 0.8 }}>{item.time}</span>
                </div>
                <div className="flex-1 pb-5 pt-1">
                  <div className="rounded-xl px-4 py-3 transition-all group-hover:scale-[1.01]"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,146,58,0.08)" }}>
                    <p className="font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d", fontSize: "1.05rem" }}>{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#8a9a78" }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!open && (
            <div className="relative mt-2">
              <div className="absolute inset-0 top-[-60px] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, #0d0a07 80%)" }} />
              <div className="relative text-center pt-4">
                <button onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm transition-all hover:scale-[1.03]"
                  style={{ background: "rgba(200,146,58,0.08)", border: "1px solid rgba(200,146,58,0.2)", color: "#c8923a" }}>
                  Показать полное расписание →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { DaySchedule };

// ── TerritoryWalk ─────────────────────────────────────────────────────────────

export default function TerritoryWalk() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeZone, setActiveZone] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [view, setView] = useState<"map" | "detail">("map");
  const detailRef = useRef<HTMLDivElement>(null);

  const goToZone = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => { setActiveZone(index); setIsAnimating(false); }, 250);
    setView("detail");
    setTimeout(() => { detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
  };

  const next = () => { const n = (activeZone + 1) % zones.length; setIsAnimating(true); setTimeout(() => { setActiveZone(n); setIsAnimating(false); }, 250); };
  const prev = () => { const p = (activeZone - 1 + zones.length) % zones.length; setIsAnimating(true); setTimeout(() => { setActiveZone(p); setIsAnimating(false); }, 250); };
  const zone = zones[activeZone];

  if (!isOpen) {
    return (
      <section className="py-16 px-6 text-center relative overflow-hidden" style={{ background: "#0d0a07" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(106,170,112,0.05) 0%, transparent 70%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #6aaa70)" }} />
            <span style={{ color: "#6aaa70", fontSize: "1.3rem" }}>🌿</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #6aaa70, transparent)" }} />
          </div>
          <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "#8a7a65" }}>Территория центра</p>
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e" }}>
            Прогуляйтесь по нашему<br /><em style={{ color: "#6aaa70" }}>живому пространству</em>
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "#8a9a78", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
            10 уникальных зон на карте — лес, ручьи, баня с чаном, медитативные поляны, VIP-домики
          </p>
          <div className="flex gap-2 justify-center mb-10 overflow-hidden">
            {zones.slice(0, 5).map((z, i) => (
              <div key={z.id} className="rounded-xl overflow-hidden flex-shrink-0"
                style={{ width: "70px", height: "70px", border: "1px solid rgba(106,170,112,0.2)", transform: `rotate(${(i - 2) * 3}deg)` }}>
                <img src={z.image} alt={z.title} className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
              </div>
            ))}
          </div>
          <button onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg, #3a6640, #5a9e60)", color: "#f0f8e8", fontWeight: 700, letterSpacing: "0.1em", boxShadow: "0 0 50px rgba(90,158,96,0.25)" }}>
            <span style={{ fontSize: "1.3rem" }}>🌲</span>
            Открыть карту территории
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="mt-4 text-xs" style={{ color: "#6a7a60" }}>10 зон · рисованная карта с рунами</p>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#080c07" }}>
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
        style={{ background: "rgba(8,12,7,0.96)", borderBottom: "1px solid rgba(106,170,112,0.12)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <span style={{ color: "#6aaa70" }}>🌿</span>
          <p className="text-sm font-light" style={{ color: "#c8d89e", fontFamily: "'Cormorant', serif" }}>Карта территории</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setView("map")}
            className="px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: view === "map" ? "rgba(106,170,112,0.2)" : "transparent", border: `1px solid ${view === "map" ? "rgba(106,170,112,0.4)" : "rgba(106,170,112,0.1)"}`, color: view === "map" ? "#6aaa70" : "#5a7a55" }}>
            🗺 Карта
          </button>
          <button onClick={() => setView("detail")}
            className="px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ background: view === "detail" ? "rgba(106,170,112,0.2)" : "transparent", border: `1px solid ${view === "detail" ? "rgba(106,170,112,0.4)" : "rgba(106,170,112,0.1)"}`, color: view === "detail" ? "#6aaa70" : "#5a7a55" }}>
            📖 Зона
          </button>
          <button onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center ml-1 transition-all hover:scale-110"
            style={{ background: "rgba(106,170,112,0.1)", color: "#6aaa70" }}>✕</button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 pb-24 pt-4">
        {view === "map" && (
          <div>
            <p className="text-center text-xs mb-3" style={{ color: "#5a7a55", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>нажмите на любую зону</p>
            <TerritoryMap activeZone={activeZone} onSelect={goToZone} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {zones.map((z, i) => (
                <button key={z.id} onClick={() => goToZone(i)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all hover:scale-[1.03]"
                  style={{ background: i === activeZone ? z.accent : "rgba(255,255,255,0.03)", border: `1px solid ${i === activeZone ? z.color + "60" : "rgba(255,255,255,0.06)"}` }}>
                  <span>{z.emoji}</span>
                  <span className="text-xs leading-tight" style={{ color: i === activeZone ? z.color : "#7a8a70" }}>{z.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {view === "detail" && (
          <div ref={detailRef}>
            <div className="flex gap-2 justify-center py-3 overflow-x-auto">
              {zones.map((z, i) => (
                <button key={z.id}
                  onClick={() => { setIsAnimating(true); setTimeout(() => { setActiveZone(i); setIsAnimating(false); }, 250); }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{ background: i === activeZone ? z.color : "rgba(255,255,255,0.05)", border: `1px solid ${i === activeZone ? z.color : "rgba(255,255,255,0.1)"}`, transform: i === activeZone ? "scale(1.2)" : "scale(1)" }}>
                  {z.emoji}
                </button>
              ))}
            </div>
            <div className="relative rounded-3xl overflow-hidden my-4" style={{ height: "55vw", maxHeight: "360px", minHeight: "200px" }}>
              <img src={zone.image} alt={zone.title} className="w-full h-full object-cover"
                style={{ opacity: isAnimating ? 0 : 1, transform: isAnimating ? "scale(1.05)" : "scale(1)", transition: "opacity 0.25s ease, transform 0.25s ease" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,7,0.9) 0%, rgba(8,12,7,0.2) 50%, transparent 100%)" }} />
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs"
                style={{ background: "rgba(8,12,7,0.7)", border: `1px solid ${zone.color}`, color: zone.color, backdropFilter: "blur(8px)" }}>
                {activeZone + 1} / {zones.length}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.05s" }}>
                <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: zone.color }}>{zone.subtitle}</p>
                <h2 className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#e8f0d8" }}>{zone.emoji} {zone.title}</h2>
              </div>
            </div>
            <div className="rounded-2xl p-5 mb-4" style={{ background: zone.accent, border: `1px solid ${zone.color}25`, opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.1s" }}>
              <p style={{ color: "#c8d8b8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem", lineHeight: 1.6 }}>{zone.desc}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6" style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.12s" }}>
              {zone.details.map((d, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: zone.color, flexShrink: 0 }}>{zone.icon}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "#8a9a78" }}>{d}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mb-6">
              <button onClick={prev} className="flex-1 flex items-center justify-center py-4 rounded-2xl text-sm transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,170,112,0.15)", color: "#6aaa70" }}>← Назад</button>
              <button onClick={() => setView("map")} className="px-4 py-4 rounded-2xl text-xs transition-all hover:scale-[1.02]"
                style={{ background: "rgba(106,170,112,0.07)", border: "1px solid rgba(106,170,112,0.2)", color: "#6aaa70" }}>🗺</button>
              <button onClick={next} className="flex-1 flex items-center justify-center py-4 rounded-2xl text-sm transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${zone.color}30, ${zone.color}15)`, border: `1px solid ${zone.color}40`, color: zone.color }}>Далее →</button>
            </div>
          </div>
        )}
        <div className="mt-4 text-center rounded-2xl p-7" style={{ background: "rgba(106,170,112,0.05)", border: "1px solid rgba(106,170,112,0.12)" }}>
          <p className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e" }}>Понравилось?</p>
          <p className="text-sm mb-5" style={{ color: "#6a7a60" }}>Приходите — в реальности ещё красивее</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #3a6640, #5a9e60)", color: "#f0f8e8", textDecoration: "none" }}>
              🌿 Забронировать визит
            </a>
            <button onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.03]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,170,112,0.2)", color: "#6aaa70" }}>
              Вернуться
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
