import { useState, useRef } from "react";

const zones = [
  {
    id: "healing-center",
    title: "Целительский центр",
    subtitle: "Апартаменты для гостей",
    emoji: "🏛️",
    mapLabel: "Центр",
    desc: "Сердце нашего пространства. Деревянный особняк с тёплыми апартаментами, где каждая деталь создана для восстановления. Резные потолки, живые растения, запах кедра и трав.",
    details: ["Апартаменты с панорамными окнами", "Авторский интерьер из натурального дерева", "Открытые террасы с видом на лес", "Персональный консьерж и программа пребывания"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/88732ba1-9af1-4411-a6dc-d60fb1b1a1c2.jpg",
    color: "#c8923a",
    accent: "rgba(200,146,58,0.18)",
    icon: "🌿",
    mapX: 460, mapY: 310,
  },
  {
    id: "medtech",
    title: "MedTech зона",
    subtitle: "Диагностика и высокие технологии",
    emoji: "🔬",
    mapLabel: "MedTech",
    desc: "Современное оборудование в обрамлении натуральных материалов. Криокапсулы, LED-терапия, гипербарическая оксигенация — технологии долголетия в деревянном пространстве.",
    details: ["Криокапсула и LED-панели", "Гипербарическая оксигенация", "Аппаратная диагностика тела", "PRP и инъекционные кабинеты"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/360e91a8-d769-4770-850a-b1537c72b2c0.jpg",
    color: "#7aab9e",
    accent: "rgba(122,171,158,0.18)",
    icon: "⚗️",
    mapX: 320, mapY: 265,
  },
  {
    id: "longevity",
    title: "Зона Longevity",
    subtitle: "Протоколы долголетия",
    emoji: "✨",
    mapLabel: "Longevity",
    desc: "Персонализированные программы биохакинга и антиэйджинга. Здесь наука встречается с природой — каждый протокол разработан индивидуально по результатам диагностики.",
    details: ["Индивидуальные программы омоложения", "Капельницы с витаминными коктейлями", "Озонотерапия и ВЛОК", "Полный чекап организма"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e6adfd17-af96-46fd-8a2f-0195ba659c74.jpg",
    color: "#9b7fb5",
    accent: "rgba(155,127,181,0.18)",
    icon: "🧬",
    mapX: 600, mapY: 265,
  },
  {
    id: "pool",
    title: "Бассейн и движение",
    subtitle: "Беговые и велодорожки",
    emoji: "🏊",
    mapLabel: "Бассейн",
    desc: "Природный бассейн с ключевой водой окружён живыми камнями и соснами. Вдоль леса проложены беговые и велодорожки — дышите полной грудью.",
    details: ["Природный бассейн с очисткой без хлора", "5 км беговых дорожек через лес", "Велодорожки с прокатом велосипедов", "Тренажёры на открытом воздухе"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/f21d798d-86b2-4b28-8faf-ea53e3a589cc.jpeg",
    color: "#5a9ec8",
    accent: "rgba(90,158,200,0.18)",
    icon: "💧",
    mapX: 460, mapY: 185,
  },
  {
    id: "banya",
    title: "Баня",
    subtitle: "Русская банная традиция",
    emoji: "🔥",
    mapLabel: "Баня",
    desc: "Бревенчатая баня с этническими узорами, деревянный чан с горячими травяными настоями и лесная купель с ледяной ключевой водой. Берёзовый веник, медово-травяной пилинг, ароматерапия — ритуал очищения тела и духа.",
    details: ["Классическая русская баня на дровах", "Чан с травяными настоями и купель", "Авторские банные ритуалы с мастером", "Этнические церемонии с травами"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/1e2e1715-1107-47f6-ae90-53b9387fc14c.jpg",
    color: "#d4622a",
    accent: "rgba(212,98,42,0.18)",
    icon: "🌿",
    mapX: 730, mapY: 310,
  },
  {
    id: "vip-cabins",
    title: "VIP домики",
    subtitle: "Индивидуальные деревянные резиденции",
    emoji: "🏡",
    mapLabel: "VIP дом",
    desc: "Отдельные деревянные домики среди вековых сосен. Каждый — маленькое произведение искусства с резными наличниками, камином, верандой и полной приватностью.",
    details: ["Индивидуальный деревянный домик в лесу", "Камин, сауна и джакузи на террасе", "Персональная программа и шеф-повар", "Полная приватность и тишина"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/a856d357-54c9-48c9-b0cc-731291f0342d.jpg",
    color: "#c8923a",
    accent: "rgba(200,146,58,0.18)",
    icon: "⭐",
    mapX: 730, mapY: 435,
  },
  {
    id: "campfire",
    title: "Костровая зона",
    subtitle: "Ужины у огня под звёздами",
    emoji: "🪵",
    mapLabel: "Костёр",
    desc: "Большое кострище из природного камня, окружённое деревянными столами с резьбой. Вечерние ужины с фермерской едой, живой музыкой и историями у огня.",
    details: ["Авторские ужины от шеф-повара", "Фермерские продукты и травяные чаи", "Живая музыка и этнические инструменты", "Ночные церемонии и ритуалы"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/75c9649e-22d9-4bfc-bf4d-56ea36522f16.jpg",
    color: "#e8a030",
    accent: "rgba(232,160,48,0.18)",
    icon: "🌙",
    mapX: 600, mapY: 500,
  },
  {
    id: "forest",
    title: "Лесные прогулки",
    subtitle: "Ручейки и беседки в лесу",
    emoji: "🌲",
    mapLabel: "Лес",
    desc: "Извилистые тропы через старый лес, деревянные мостики над ручьями, укромные беседки с резными узорами. Здесь время замедляется — и вы слышите себя.",
    details: ["Маркированные тропы разной сложности", "Деревянные беседки над ручьями", "Лесные ванны (шинрин-йоку)", "Гид-натуралист по запросу"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/26e2719a-58a5-4686-8542-278ee0018437.jpg",
    color: "#6aaa70",
    accent: "rgba(106,170,112,0.18)",
    icon: "🍃",
    mapX: 185, mapY: 435,
  },
  {
    id: "meadow",
    title: "Медитативная поляна",
    subtitle: "Пространство тишины и практик",
    emoji: "🧘",
    mapLabel: "Поляна",
    desc: "Открытая поляна в окружении деревьев — солнечный круг для утренних медитаций, звуковых чаш и дыхательных практик. Деревянный помост с этническими узорами.",
    details: ["Утренние медитации на рассвете", "Звуковые ванны с тибетскими чашами", "Групповые и индивидуальные практики", "Церемония встречи солнца"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e8a973eb-f25f-42c5-bcc3-0dab13ca1686.jpg",
    color: "#a0c070",
    accent: "rgba(160,192,112,0.18)",
    icon: "☀️",
    mapX: 320, mapY: 500,
  },
  {
    id: "creativity",
    title: "Зона творчества",
    subtitle: "Мастерские среди живых растений",
    emoji: "🎨",
    mapLabel: "Творчество",
    desc: "Просторная мастерская, утопающая в тропических растениях. Гончарный круг, ткацкий станок, живопись, плетение — творческие практики как путь к себе.",
    details: ["Гончарная мастерская и живопись", "Ткачество и плетение из природных материалов", "Мастер-классы по этническим ремёслам", "Свободное творчество без расписания"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/554d67fb-1525-4cf0-8c9f-7d7dbcb1cb7c.jpg",
    color: "#c87a9b",
    accent: "rgba(200,122,155,0.18)",
    icon: "🌺",
    mapX: 185, mapY: 265,
  },
];

// Рукописные тропинки — кривые, неровные как настоящие тропы
const TRAILS = [
  "M 460 310 C 420 295 370 278 320 265",
  "M 320 265 C 305 240 340 205 460 185",
  "M 460 185 C 520 168 562 235 600 265",
  "M 600 265 C 648 278 695 292 730 310",
  "M 730 310 C 748 355 745 400 730 435",
  "M 730 435 C 672 462 638 482 600 500",
  "M 600 500 C 545 515 500 460 460 310",
  "M 460 310 C 405 345 360 435 320 500",
  "M 320 500 C 270 468 220 450 185 435",
  "M 185 435 C 168 385 172 320 185 265",
  "M 185 265 C 240 248 285 258 320 265",
];

// Рукописные текстовые метки на карте
const MAP_LABELS = [
  { x: 80, y: 200, text: "~ река ~", rotate: -25, opacity: 0.55, color: "#8ab8d8" },
  { x: 55, y: 320, text: "ручей", rotate: -70, opacity: 0.5, color: "#8ab8d8" },
  { x: 370, y: 145, text: "купальня", rotate: -8, opacity: 0.45, color: "#a0b8e8" },
  { x: 760, y: 240, text: "баня", rotate: 12, opacity: 0.55, color: "#d48060" },
  { x: 760, y: 490, text: "VIP", rotate: 5, opacity: 0.45, color: "#c8923a" },
  { x: 250, y: 555, text: "лес", rotate: -5, opacity: 0.4, color: "#6aaa70" },
  { x: 500, y: 565, text: "поляна", rotate: 3, opacity: 0.4, color: "#a0c070" },
  { x: 140, y: 185, text: "чаща", rotate: -15, opacity: 0.35, color: "#5a8050" },
  { x: 820, y: 160, text: "сосны", rotate: 10, opacity: 0.35, color: "#5a8050" },
];

// Рунические символы — рассыпаны по карте
const RUNES = [
  { x: 45, y: 100, r: "ᚱ" }, { x: 875, y: 95, r: "ᚠ" },
  { x: 50, y: 550, r: "ᚾ" }, { x: 860, y: 570, r: "ᛏ" },
  { x: 460, y: 58, r: "ᛚ" }, { x: 460, y: 590, r: "ᛖ" },
  { x: 240, y: 80, r: "ᚢ" }, { x: 680, y: 75, r: "ᛗ" },
  { x: 180, y: 590, r: "ᚹ" }, { x: 720, y: 585, r: "ᛁ" },
];

// Этнические узоры — маленькие орнаменты
const ORNAMENTS = [
  { x: 460, y: 350 }, // центр
  { x: 150, y: 340 },
  { x: 770, y: 350 },
  { x: 460, y: 130 },
  { x: 460, y: 570 },
];

function HandDrawnTree({ x, y, size, opacity }: { x: number; y: number; size: number; opacity: number }) {
  const s = size;
  return (
    <g transform={`translate(${x},${y})`} opacity={opacity}>
      {/* Ствол — кривая линия */}
      <path d={`M 0 ${s * 0.6} C ${s * 0.05} ${s * 0.3} ${-s * 0.05} ${s * 0.1} 0 0`}
        stroke={`hsl(30, 40%, ${18 + Math.round(size) % 5}%)`} strokeWidth={s * 0.12} fill="none" strokeLinecap="round" />
      {/* Крона — неровный круг/треугольник */}
      <path d={`M 0 ${-s * 0.2} C ${s * 0.5} 0 ${s * 0.4} ${-s * 0.8} 0 ${-s} C ${-s * 0.4} ${-s * 0.8} ${-s * 0.5} 0 0 ${-s * 0.2}`}
        fill={`hsl(${115 + Math.round(size * 3) % 20}, ${28 + Math.round(size) % 8}%, ${10 + Math.round(size * 2) % 6}%)`}
        stroke={`hsl(${118 + Math.round(size) % 15}, 22%, ${16 + Math.round(size * 1.5) % 5}%)`}
        strokeWidth="0.8" />
    </g>
  );
}

function EthnicOrnament({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} opacity={0.08}>
      {[0, 45, 90, 135].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <g key={i}>
            <line x1={0} y1={0} x2={Math.cos(r) * 18} y2={Math.sin(r) * 18} stroke="#c8923a" strokeWidth="1" />
            <line x1={0} y1={0} x2={-Math.cos(r) * 18} y2={-Math.sin(r) * 18} stroke="#c8923a" strokeWidth="1" />
            <circle cx={Math.cos(r) * 18} cy={Math.sin(r) * 18} r={2} fill="#c8923a" />
            <circle cx={-Math.cos(r) * 18} cy={-Math.sin(r) * 18} r={2} fill="#c8923a" />
          </g>
        );
      })}
      <circle cx={0} cy={0} r={6} fill="none" stroke="#c8923a" strokeWidth="1" />
      <circle cx={0} cy={0} r={2.5} fill="#c8923a" />
    </g>
  );
}

function TerritoryMap({ activeZone, onSelect }: { activeZone: number; onSelect: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 920, H = 620;

  // Позиции деревьев
  const trees = [
    [62,72,14,0.5],[130,48,11,0.45],[198,88,13,0.5],[268,58,10,0.4],[338,38,12,0.45],
    [438,52,10,0.4],[548,38,11,0.4],[648,52,12,0.45],[738,68,13,0.5],[818,48,11,0.45],[876,82,14,0.5],
    [42,158,12,0.45],[98,198,10,0.4],[58,298,11,0.42],[78,398,10,0.4],[42,478,12,0.45],
    [88,538,11,0.4],[148,568,13,0.48],[42,558,10,0.38],[72,488,9,0.35],
    [868,158,12,0.45],[898,218,10,0.4],[868,318,11,0.42],[898,418,10,0.4],
    [858,508,12,0.45],[878,558,11,0.4],[818,568,13,0.48],[848,488,9,0.35],
    [198,578,11,0.4],[318,588,10,0.38],[428,588,11,0.4],[538,578,12,0.42],
    [658,588,11,0.4],[748,572,12,0.42],[118,142,10,0.38],[278,118,11,0.42],
    [368,108,10,0.4],[458,98,11,0.38],[548,108,10,0.4],[638,118,11,0.42],
    [718,128,12,0.45],[798,138,11,0.42],[168,108,9,0.35],[688,42,9,0.35],
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl"
      style={{ background: "radial-gradient(ellipse at 48% 52%, #0d1a0b 0%, #060d05 100%)", border: "1px solid rgba(160,140,80,0.18)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ display: "block" }}>
        <defs>
          {/* Фильтр «бумага» */}
          <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blend" />
            <feComponentTransfer in="blend">
              <feFuncR type="linear" slope="0.95" />
              <feFuncG type="linear" slope="0.95" />
              <feFuncB type="linear" slope="0.95" />
            </feComponentTransfer>
          </filter>
          {/* Фильтр «чернила» для линий */}
          <filter id="ink">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          {/* Рукописный шрифт — подключаем через стиль */}
        </defs>

        {/* Бумажный фон */}
        <rect x={0} y={0} width={W} height={H} fill="transparent" filter="url(#paper)" />

        {/* Граница карты — рукописная рамка с этническими углами */}
        <rect x={18} y={15} width={W - 36} height={H - 30} rx={4}
          fill="none" stroke="rgba(160,130,60,0.25)" strokeWidth="1.5"
          strokeDasharray="8 3 2 3" filter="url(#ink)" />
        {/* Угловые орнаменты рамки */}
        {[[22,19],[W-22,19],[22,H-19],[W-22,H-19]].map(([cx,cy],i) => (
          <g key={i} transform={`translate(${cx},${cy})`} opacity={0.35}>
            <circle r={5} fill="none" stroke="#c8923a" strokeWidth="1" />
            <line x1={-8} y1={0} x2={8} y2={0} stroke="#c8923a" strokeWidth="0.8" />
            <line x1={0} y1={-8} x2={0} y2={8} stroke="#c8923a" strokeWidth="0.8" />
          </g>
        ))}

        {/* Деревья — рукописные */}
        {trees.map(([x, y, s, op], i) => (
          <HandDrawnTree key={i} x={x} y={y} size={s} opacity={op} />
        ))}

        {/* Этнические орнаменты */}
        {ORNAMENTS.map((o, i) => <EthnicOrnament key={i} x={o.x} y={o.y} />)}

        {/* Руны по углам */}
        {RUNES.map((r, i) => (
          <text key={i} x={r.x} y={r.y} textAnchor="middle" dominantBaseline="central"
            fill="rgba(180,150,70,0.28)"
            style={{ fontSize: "13px", fontFamily: "serif", userSelect: "none" }}>
            {r.r}
          </text>
        ))}

        {/* Ручей — синяя кривая, рукописная */}
        <path d="M 96 170 C 118 210 105 250 112 290 C 118 330 95 370 118 410 C 138 445 128 488 112 530 C 100 558 130 572 148 568"
          fill="none" stroke="rgba(90,150,200,0.22)" strokeWidth="8" strokeLinecap="round" filter="url(#ink)" />
        <path d="M 96 170 C 118 210 105 250 112 290 C 118 330 95 370 118 410 C 138 445 128 488 112 530 C 100 558 130 572 148 568"
          fill="none" stroke="rgba(110,170,220,0.35)" strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray="12 4" filter="url(#ink)" />

        {/* Тропы — рукописные пунктиры */}
        {TRAILS.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(160,130,70,0.12)" strokeWidth="5" strokeLinecap="round" filter="url(#ink)" />
            <path d={d} fill="none" stroke="rgba(180,150,80,0.3)" strokeWidth="1.8"
              strokeDasharray="7 6" strokeLinecap="round" filter="url(#ink)" />
          </g>
        ))}

        {/* Главная дорога вокруг центра */}
        <ellipse cx={460} cy={350} rx={288} ry={198}
          fill="none" stroke="rgba(160,130,70,0.08)" strokeWidth="18" filter="url(#ink)" />
        <ellipse cx={460} cy={350} rx={288} ry={198}
          fill="none" stroke="rgba(180,150,80,0.18)" strokeWidth="2"
          strokeDasharray="14 7 3 7" filter="url(#ink)" />

        {/* Рукописные подписи мест */}
        {MAP_LABELS.map((lbl, i) => (
          <text key={i} x={lbl.x} y={lbl.y}
            textAnchor="middle"
            fill={lbl.color}
            opacity={lbl.opacity}
            transform={`rotate(${lbl.rotate}, ${lbl.x}, ${lbl.y})`}
            filter="url(#ink)"
            style={{ fontSize: "9px", fontFamily: "'Georgia', serif", fontStyle: "italic", userSelect: "none", letterSpacing: "0.05em" }}>
            {lbl.text}
          </text>
        ))}

        {/* Зоны — интерактивные точки */}
        {zones.map((zone, i) => {
          const isActive = i === activeZone;
          const isHov = hovered === i;
          // Увеличение при наведении через transform на <g>
          const scale = isActive ? 1.4 : isHov ? 1.25 : 1;
          return (
            <g key={zone.id}
              transform={`translate(${zone.mapX},${zone.mapY}) scale(${scale})`}
              style={{ cursor: "pointer", transformOrigin: `${zone.mapX}px ${zone.mapY}px`, transformBox: "fill-box", transition: "transform 0.18s cubic-bezier(0.34,1.56,0.64,1)" }}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>

              {/* Пульс */}
              {isActive && (
                <>
                  <circle cx={0} cy={0} r={30} fill="none"
                    stroke={zone.color} strokeWidth="1.5" opacity={0.28}
                    style={{ animation: "mapPulse 2.2s ease-out infinite" }} />
                  <circle cx={0} cy={0} r={40} fill="none"
                    stroke={zone.color} strokeWidth="1" opacity={0.12}
                    style={{ animation: "mapPulse 2.2s ease-out infinite 0.5s" }} />
                </>
              )}

              {/* Тень земли */}
              <ellipse cx={2} cy={24} rx={16} ry={4} fill="rgba(0,0,0,0.35)" />

              {/* Иконка зоны — «нарисованный» домик/метка */}
              {/* Основа — деревянный кружок с текстурой */}
              <circle cx={0} cy={0} r={21}
                fill={isActive ? `${zone.color}22` : "rgba(10,18,9,0.82)"}
                stroke={zone.color}
                strokeWidth={isActive ? 2.5 : isHov ? 2 : 1.5}
                filter="url(#ink)"
              />
              {/* Этнические штрихи вокруг */}
              {[0, 60, 120, 180, 240, 300].map((a, idx) => {
                const rad = (a * Math.PI) / 180;
                return (
                  <line key={idx}
                    x1={Math.cos(rad) * 23} y1={Math.sin(rad) * 23}
                    x2={Math.cos(rad) * 28} y2={Math.sin(rad) * 28}
                    stroke={zone.color} strokeWidth="1" opacity={isActive ? 0.7 : 0.3} />
                );
              })}
              {/* Эмодзи */}
              <text x={0} y={1} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: "13px", userSelect: "none", pointerEvents: "none" }}>
                {zone.emoji}
              </text>

              {/* Подпись — рукописная */}
              {(isActive || isHov) && (
                <g>
                  {/* Фон бирки */}
                  <rect x={-45} y={27} width={90} height={20} rx={3}
                    fill="rgba(6,11,5,0.9)"
                    stroke={zone.color} strokeWidth="0.8"
                    filter="url(#ink)" />
                  <text x={0} y={40}
                    textAnchor="middle"
                    fill={zone.color}
                    filter="url(#ink)"
                    style={{ fontSize: "8.5px", fontFamily: "'Georgia', serif", fontStyle: "italic", userSelect: "none", pointerEvents: "none", letterSpacing: "0.03em" }}>
                    {zone.mapLabel}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Компас — этнический рукописный */}
        <g transform="translate(856,64)" opacity={0.6}>
          {/* Фон */}
          <circle cx={0} cy={0} r={24} fill="rgba(8,13,7,0.85)"
            stroke="rgba(180,140,60,0.5)" strokeWidth="1" filter="url(#ink)" />
          <circle cx={0} cy={0} r={18} fill="none"
            stroke="rgba(180,140,60,0.25)" strokeWidth="0.8" strokeDasharray="3 2" />
          {/* Стрелки */}
          <path d="M 0 -19 L 4 0 L 0 5 L -4 0 Z" fill="#c8923a" opacity={0.9} filter="url(#ink)" />
          <path d="M 0 19 L 4 0 L 0 -5 L -4 0 Z" fill="rgba(200,146,58,0.28)" />
          <path d="M -19 0 L 0 4 L 5 0 L 0 -4 Z" fill="rgba(200,146,58,0.28)" />
          <path d="M 19 0 L 0 4 L -5 0 L 0 -4 Z" fill="rgba(200,146,58,0.28)" />
          {/* Буквы сторон */}
          {[["С",-13],["Ю",13]].map(([t, dy]) => (
            <text key={t as string} x={0} y={(dy as number) + 3.5} textAnchor="middle"
              fill="rgba(200,160,70,0.8)"
              style={{ fontSize: "7px", fontFamily: "'Georgia', serif", fontWeight: 700, userSelect: "none" }}>
              {t}
            </text>
          ))}
          <circle cx={0} cy={0} r={3} fill="rgba(180,140,60,0.6)" />
        </g>

        {/* Легенда — рукописная бирка */}
        <g transform="translate(22, 425)">
          <rect x={0} y={0} width={92} height={72} rx={4}
            fill="rgba(6,11,5,0.82)" stroke="rgba(180,140,60,0.3)" strokeWidth="1"
            filter="url(#ink)" />
          <text x={8} y={14} fill="rgba(180,140,60,0.7)"
            style={{ fontSize: "7.5px", fontFamily: "'Georgia', serif", fontStyle: "italic", letterSpacing: "0.06em", userSelect: "none" }}>легенда</text>
          <line x1={8} y1={25} x2={20} y2={25} stroke="rgba(180,150,80,0.6)" strokeWidth="1.8" strokeDasharray="5 3" />
          <text x={25} y={29} fill="rgba(200,190,160,0.65)" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>тропа</text>
          <line x1={8} y1={40} x2={20} y2={40} stroke="rgba(90,158,200,0.6)" strokeWidth="3" strokeLinecap="round" />
          <text x={25} y={44} fill="rgba(200,190,160,0.65)" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>ручей</text>
          <circle cx={14} cy={58} r={6} fill="rgba(10,18,9,0.82)" stroke="rgba(200,146,58,0.6)" strokeWidth="1" />
          <text x={14} y={59} textAnchor="middle" dominantBaseline="central" style={{ fontSize: "8px", userSelect: "none" }}>🏛️</text>
          <text x={25} y={62} fill="rgba(200,190,160,0.65)" style={{ fontSize: "7px", fontFamily: "serif", fontStyle: "italic", userSelect: "none" }}>зона</text>
        </g>

        {/* Заголовок карты — рукописный */}
        <text x={460} y={32} textAnchor="middle" fill="rgba(180,150,70,0.4)"
          filter="url(#ink)"
          style={{ fontSize: "10px", fontFamily: "'Georgia', serif", fontStyle: "italic", letterSpacing: "0.15em", userSelect: "none" }}>
          ✦ карта территории целительского центра ✦
        </text>

        <style>{`
          @keyframes mapPulse {
            0% { opacity: 0.3; }
            100% { r: 55; opacity: 0; }
          }
        `}</style>
      </svg>

      {/* Подсказка */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(6,11,5,0.75)", color: "rgba(160,140,80,0.75)", backdropFilter: "blur(8px)", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>
          нажмите на зону чтобы узнать подробности
        </span>
      </div>
    </div>
  );
}

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
            Прогуляйтесь по нашему<br />
            <em style={{ color: "#6aaa70" }}>живому пространству</em>
          </h2>
          <p className="text-base mb-10 leading-relaxed" style={{ color: "#8a9a78", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
            10 уникальных зон на территории — лес, ручьи, баня с чаном, медитативные поляны, VIP-домики и творческие мастерские
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
            Начать прогулку
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="mt-4 text-xs" style={{ color: "#6a7a60" }}>10 зон · карта с рунами · этнический стиль</p>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#080c07" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3"
        style={{ background: "rgba(8,12,7,0.96)", borderBottom: "1px solid rgba(106,170,112,0.12)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <span style={{ color: "#6aaa70", fontSize: "1.2rem" }}>🌿</span>
          <p className="text-sm font-light" style={{ color: "#c8d89e", fontFamily: "'Cormorant', serif" }}>Прогулка по территории</p>
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
            style={{ background: "rgba(106,170,112,0.1)", color: "#6aaa70", fontSize: "1rem" }}>
            ✕
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-24 pt-4">

        {/* MAP VIEW */}
        {view === "map" && (
          <div>
            <div className="text-center mb-4">
              <p className="text-xs" style={{ color: "#5a7a55", fontFamily: "'Georgia', serif", fontStyle: "italic" }}>нажмите на любую зону</p>
            </div>
            <TerritoryMap activeZone={activeZone} onSelect={goToZone} />
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {zones.map((z, i) => (
                <button key={z.id} onClick={() => goToZone(i)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all hover:scale-[1.03]"
                  style={{ background: i === activeZone ? z.accent : "rgba(255,255,255,0.03)", border: `1px solid ${i === activeZone ? z.color + "60" : "rgba(255,255,255,0.06)"}` }}>
                  <span style={{ fontSize: "1rem" }}>{z.emoji}</span>
                  <span className="text-xs leading-tight" style={{ color: i === activeZone ? z.color : "#7a8a70" }}>{z.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DETAIL VIEW */}
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
                <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#e8f0d8" }}>
                  {zone.emoji} {zone.title}
                </h2>
              </div>
            </div>

            <div className="rounded-2xl p-5 mb-4" style={{ background: zone.accent, border: `1px solid ${zone.color}25`, opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.1s" }}>
              <p className="leading-relaxed" style={{ color: "#c8d8b8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>{zone.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6" style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.12s" }}>
              {zone.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl p-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: zone.color, flexShrink: 0, marginTop: "1px" }}>{zone.icon}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "#8a9a78" }}>{detail}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 mb-6">
              <button onClick={prev} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,170,112,0.15)", color: "#6aaa70" }}>
                ← Назад
              </button>
              <button onClick={() => setView("map")} className="flex items-center justify-center gap-1 px-4 py-4 rounded-2xl text-xs transition-all hover:scale-[1.02]"
                style={{ background: "rgba(106,170,112,0.07)", border: "1px solid rgba(106,170,112,0.2)", color: "#6aaa70" }}>
                🗺
              </button>
              <button onClick={next} className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02]"
                style={{ background: `linear-gradient(135deg, ${zone.color}30, ${zone.color}15)`, border: `1px solid ${zone.color}40`, color: zone.color }}>
                Далее →
              </button>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-4 text-center rounded-2xl p-7" style={{ background: "rgba(106,170,112,0.05)", border: "1px solid rgba(106,170,112,0.12)" }}>
          <p className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e" }}>Понравилось то, что увидели?</p>
          <p className="text-sm mb-5" style={{ color: "#6a7a60" }}>Приходите — в реальности это ещё красивее</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #3a6640, #5a9e60)", color: "#f0f8e8", textDecoration: "none" }}>
              🌿 Забронировать визит
            </a>
            <button onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm transition-all hover:scale-[1.03]"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,170,112,0.2)", color: "#6aaa70" }}>
              Вернуться к программам
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
