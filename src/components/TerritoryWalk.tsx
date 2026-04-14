import { useState, useRef } from "react";

const zones = [
  {
    id: "healing-center",
    title: "Целительский центр",
    subtitle: "Апартаменты для гостей",
    emoji: "🏛️",
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
    desc: "Бревенчатая баня с этническими узорами, выход прямо в купель у лесного ручья. Берёзовый веник, медово-травяной пилинг, ароматерапия — ритуал очищения тела и духа.",
    details: ["Классическая русская баня на дровах", "Купель с ключевой водой", "Авторские банные ритуалы с мастером", "Этнические церемонии с травами"],
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
    desc: "Просторная мастерская, утопающая в тропических растениях. Гончарный круг, ткацкий станок, живопись, плетение — творческие практики как путь к себе.",
    details: ["Гончарная мастерская и живопись", "Ткачество и плетение из природных материалов", "Мастер-классы по этническим ремёслам", "Свободное творчество без расписания"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/554d67fb-1525-4cf0-8c9f-7d7dbcb1cb7c.jpg",
    color: "#c87a9b",
    accent: "rgba(200,122,155,0.18)",
    icon: "🌺",
    mapX: 185, mapY: 265,
  },
];

// Тропинки между зонами (SVG paths)
const TRAIL_PATHS = [
  // Внешнее кольцо — главная тропа
  "M 460 310 Q 390 290 320 265",
  "M 320 265 Q 290 225 460 185",
  "M 460 185 Q 530 165 600 265",
  "M 600 265 Q 665 287 730 310",
  "M 730 310 Q 750 370 730 435",
  "M 730 435 Q 665 467 600 500",
  "M 600 500 Q 530 518 460 310",
  "M 460 310 Q 390 355 320 500",
  "M 320 500 Q 250 467 185 435",
  "M 185 435 Q 167 370 185 265",
  "M 185 265 Q 250 243 320 265",
  // Внутренние тропинки
  "M 320 265 Q 390 225 460 185",
  "M 460 310 Q 530 380 600 500",
  "M 185 435 Q 250 467 320 500",
];

function TerritoryMap({ activeZone, onSelect }: { activeZone: number; onSelect: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 920, H = 620;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ background: "radial-gradient(ellipse at 50% 50%, #0e1a0c 0%, #060d05 100%)", border: "1px solid rgba(106,170,112,0.15)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ display: "block" }}>
        {/* Лесной фон — деревья */}
        {[
          [60,80],[130,50],[200,90],[270,60],[340,40],[440,55],[550,40],[650,55],[740,70],[820,50],[880,85],
          [40,160],[100,200],[60,300],[80,400],[40,480],[90,540],[150,570],[40,560],
          [870,160],[900,220],[870,320],[900,420],[860,510],[880,560],[820,570],
          [200,580],[320,590],[430,590],[540,580],[660,590],[750,575],
          [200,140],[280,120],[370,110],[460,100],[550,110],[640,120],[720,130],[800,140],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x},${y})`} opacity={0.35 + (i % 3) * 0.1}>
            <ellipse cx={0} cy={0} rx={10 + (i % 4) * 4} ry={14 + (i % 3) * 5} fill={`hsl(${115 + (i % 20)}, ${30 + (i%10)*2}%, ${12 + (i%4)*3}%)`} />
          </g>
        ))}

        {/* Ручей / вода — извилистая линия */}
        <path d="M 100 180 Q 130 220 110 280 Q 90 340 120 390 Q 150 440 130 490 Q 115 530 140 560"
          fill="none" stroke="rgba(90,158,200,0.3)" strokeWidth="6" strokeLinecap="round" />
        <path d="M 100 180 Q 130 220 110 280 Q 90 340 120 390 Q 150 440 130 490 Q 115 530 140 560"
          fill="none" stroke="rgba(90,158,200,0.15)" strokeWidth="12" strokeLinecap="round" />

        {/* Тропы */}
        {TRAIL_PATHS.map((d, i) => (
          <path key={i} d={d} fill="none"
            stroke="rgba(180,150,100,0.18)" strokeWidth="3"
            strokeDasharray="6 5" strokeLinecap="round" />
        ))}

        {/* Главное кольцо тропы */}
        <ellipse cx={460} cy={350} rx={285} ry={195}
          fill="none" stroke="rgba(180,150,100,0.12)" strokeWidth="24" />
        <ellipse cx={460} cy={350} rx={285} ry={195}
          fill="none" stroke="rgba(180,150,100,0.22)" strokeWidth="2"
          strokeDasharray="10 8" />

        {/* Центральный элемент — этнический узор */}
        <g transform="translate(460,350)" opacity={0.12}>
          {[0,60,120,180,240,300].map((angle, i) => (
            <line key={i} x1={0} y1={0}
              x2={Math.cos((angle * Math.PI) / 180) * 40}
              y2={Math.sin((angle * Math.PI) / 180) * 40}
              stroke="#c8923a" strokeWidth="1.5" />
          ))}
          <circle cx={0} cy={0} r={12} fill="none" stroke="#c8923a" strokeWidth="1.5" />
          <circle cx={0} cy={0} r={4} fill="#c8923a" opacity={0.6} />
        </g>

        {/* Зоны — точки на карте */}
        {zones.map((zone, i) => {
          const isActive = i === activeZone;
          const isHov = hovered === i;
          const scale = isActive ? 1.35 : isHov ? 1.15 : 1;
          return (
            <g key={zone.id}
              transform={`translate(${zone.mapX},${zone.mapY})`}
              style={{ cursor: "pointer", transition: "transform 0.2s ease" }}
              onClick={() => onSelect(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>

              {/* Пульс-кольцо для активной зоны */}
              {isActive && (
                <>
                  <circle cx={0} cy={0} r={28} fill="none"
                    stroke={zone.color} strokeWidth="1.5" opacity={0.3}
                    style={{ animation: "mapPulse 2s ease-out infinite" }} />
                  <circle cx={0} cy={0} r={38} fill="none"
                    stroke={zone.color} strokeWidth="1" opacity={0.15}
                    style={{ animation: "mapPulse 2s ease-out infinite 0.4s" }} />
                </>
              )}

              {/* Тень */}
              <circle cx={2} cy={3} r={20 * scale} fill="rgba(0,0,0,0.5)" />

              {/* Основной кружок */}
              <circle cx={0} cy={0} r={20 * scale}
                fill={isActive ? zone.color : isHov ? `${zone.color}cc` : "#1a2518"}
                stroke={zone.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                style={{ transition: "all 0.2s ease" }} />

              {/* Этнический ободок */}
              {isActive && (
                <circle cx={0} cy={0} r={24}
                  fill="none" stroke={zone.color} strokeWidth="1"
                  strokeDasharray="4 3" opacity={0.5} />
              )}

              {/* Эмодзи */}
              <text x={0} y={0} textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: `${(isActive ? 14 : 12) * scale}px`, userSelect: "none", pointerEvents: "none" }}>
                {zone.emoji}
              </text>

              {/* Подпись */}
              {(isActive || isHov) && (
                <g>
                  <rect
                    x={-52} y={24 * scale}
                    width={104} height={22}
                    rx={5}
                    fill="rgba(8,12,7,0.88)"
                    stroke={zone.color}
                    strokeWidth="0.8"
                    opacity={0.95}
                  />
                  <text x={0} y={24 * scale + 14}
                    textAnchor="middle"
                    fill={zone.color}
                    style={{ fontSize: "9px", fontWeight: 600, letterSpacing: "0.04em", userSelect: "none", pointerEvents: "none" }}>
                    {zone.title}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Компас — этнический */}
        <g transform="translate(848,68)" opacity={0.55}>
          <circle cx={0} cy={0} r={22} fill="rgba(10,16,9,0.8)" stroke="rgba(200,146,58,0.4)" strokeWidth="1" />
          <circle cx={0} cy={0} r={16} fill="none" stroke="rgba(200,146,58,0.25)" strokeWidth="0.8" strokeDasharray="3 2" />
          {["С","В","Ю","З"].map((dir, i) => {
            const angle = i * 90 - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <text key={dir} x={Math.cos(rad) * 10} y={Math.sin(rad) * 10 + 4}
                textAnchor="middle" fill="rgba(200,146,58,0.7)"
                style={{ fontSize: "7px", fontWeight: 700, userSelect: "none" }}>
                {dir}
              </text>
            );
          })}
          <path d="M 0 -13 L 3 0 L 0 4 L -3 0 Z" fill="#c8923a" opacity={0.8} />
          <path d="M 0 13 L 3 0 L 0 -4 L -3 0 Z" fill="rgba(200,146,58,0.3)" />
        </g>

        {/* Легенда */}
        <g transform="translate(20, 430)">
          <rect x={0} y={0} width={88} height={60} rx={8}
            fill="rgba(8,12,7,0.75)" stroke="rgba(200,146,58,0.2)" strokeWidth="0.8" />
          <text x={9} y={15} fill="rgba(200,146,58,0.6)"
            style={{ fontSize: "7px", letterSpacing: "0.05em", userSelect: "none" }}>ЛЕГЕНДА</text>
          <line x1={9} y1={24} x2={19} y2={24} stroke="rgba(180,150,100,0.5)" strokeWidth="2" strokeDasharray="4 3" />
          <text x={23} y={28} fill="rgba(200,200,180,0.6)" style={{ fontSize: "7px", userSelect: "none" }}>тропа</text>
          <line x1={9} y1={36} x2={19} y2={36} stroke="rgba(90,158,200,0.5)" strokeWidth="3" strokeLinecap="round" />
          <text x={23} y={40} fill="rgba(200,200,180,0.6)" style={{ fontSize: "7px", userSelect: "none" }}>ручей</text>
          <circle cx={14} cy={51} r={5} fill="#1a2518" stroke="rgba(200,146,58,0.6)" strokeWidth="1" />
          <text x={23} y={55} fill="rgba(200,200,180,0.6)" style={{ fontSize: "7px", userSelect: "none" }}>зона</text>
        </g>

        <style>{`
          @keyframes mapPulse {
            0% { r: 28; opacity: 0.35; }
            100% { r: 52; opacity: 0; }
          }
        `}</style>
      </svg>

      {/* Подсказка */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(8,12,7,0.7)", color: "rgba(160,192,112,0.7)", backdropFilter: "blur(8px)" }}>
          Нажмите на зону чтобы узнать подробности
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
    if (index === activeZone && view === "detail") return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveZone(index);
      setIsAnimating(false);
    }, 250);
    setView("detail");
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const next = () => {
    const next = (activeZone + 1) % zones.length;
    setIsAnimating(true);
    setTimeout(() => { setActiveZone(next); setIsAnimating(false); }, 250);
  };
  const prev = () => {
    const p = (activeZone - 1 + zones.length) % zones.length;
    setIsAnimating(true);
    setTimeout(() => { setActiveZone(p); setIsAnimating(false); }, 250);
  };

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
            10 уникальных зон на территории — лес, ручьи, баня, медитативные поляны, VIP-домики и творческие мастерские
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
          <p className="mt-4 text-xs" style={{ color: "#6a7a60" }}>10 зон · карта территории · этнический стиль</p>
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

        {/* ── MAP VIEW ── */}
        {view === "map" && (
          <div>
            <div className="text-center mb-4">
              <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#5a7a55" }}>Нажмите на зону на карте</p>
            </div>
            <TerritoryMap activeZone={activeZone} onSelect={goToZone} />

            {/* Zone chips under map */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
              {zones.map((z, i) => (
                <button key={z.id} onClick={() => goToZone(i)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all hover:scale-[1.03]"
                  style={{
                    background: i === activeZone ? z.accent : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === activeZone ? z.color + "60" : "rgba(255,255,255,0.06)"}`,
                  }}>
                  <span style={{ fontSize: "1rem" }}>{z.emoji}</span>
                  <span className="text-xs leading-tight" style={{ color: i === activeZone ? z.color : "#7a8a70" }}>{z.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── DETAIL VIEW ── */}
        {view === "detail" && (
          <div ref={detailRef}>
            {/* Dots nav */}
            <div className="flex gap-2 justify-center py-3 overflow-x-auto">
              {zones.map((z, i) => (
                <button key={z.id} onClick={() => { setIsAnimating(true); setTimeout(() => { setActiveZone(i); setIsAnimating(false); }, 250); }}
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{ background: i === activeZone ? z.color : "rgba(255,255,255,0.05)", border: `1px solid ${i === activeZone ? z.color : "rgba(255,255,255,0.1)"}`, transform: i === activeZone ? "scale(1.2)" : "scale(1)" }}>
                  {z.emoji}
                </button>
              ))}
            </div>

            {/* Image */}
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

            {/* Description */}
            <div className="rounded-2xl p-5 mb-4" style={{ background: zone.accent, border: `1px solid ${zone.color}25`, opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.1s" }}>
              <p className="leading-relaxed" style={{ color: "#c8d8b8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>{zone.desc}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-6" style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.25s ease 0.12s" }}>
              {zone.details.map((detail, i) => (
                <div key={i} className="flex items-start gap-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ color: zone.color, flexShrink: 0, marginTop: "1px" }}>{zone.icon}</span>
                  <span className="text-xs leading-relaxed" style={{ color: "#8a9a78" }}>{detail}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
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