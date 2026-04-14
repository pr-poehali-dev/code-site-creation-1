import { useState, useEffect, useRef } from "react";

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
    accent: "rgba(200,146,58,0.2)",
    icon: "🌿",
    path: "M 50 450 Q 100 400 150 350",
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
    accent: "rgba(122,171,158,0.2)",
    icon: "⚗️",
    path: "M 150 350 Q 200 300 250 270",
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
    accent: "rgba(155,127,181,0.2)",
    icon: "🧬",
    path: "M 250 270 Q 330 220 400 200",
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
    accent: "rgba(90,158,200,0.2)",
    icon: "💧",
    path: "M 400 200 Q 500 180 580 200",
  },
  {
    id: "banya",
    title: "Баня",
    subtitle: "Русская банная традиция",
    emoji: "🔥",
    desc: "Бревенчатая баня с этническими узорами, выход прямо в купель у лесного ручья. Берёзовый веник, медово-травяной пилинг, ароматерапия — ритуал очищения тела и духа.",
    details: ["Классическая русская баня на дровах", "Купель с ключевой водой", "Авторские банные ритуалы с мастером", "Этнические церемонии с травами"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e0c02c44-5b1b-4c04-8b37-9a728931f89a.jpg",
    color: "#d4622a",
    accent: "rgba(212,98,42,0.2)",
    icon: "🌿",
    path: "M 580 200 Q 660 220 720 270",
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
    accent: "rgba(200,146,58,0.2)",
    icon: "⭐",
    path: "M 720 270 Q 760 330 780 400",
  },
  {
    id: "campfire",
    title: "Костровая зона",
    subtitle: "Ужины у огня под звёздами",
    emoji: "🔥",
    desc: "Большое кострище из природного камня, окружённое деревянными столами с резьбой. Вечерние ужины с фермерской едой, живой музыкой и историями у огня.",
    details: ["Авторские ужины от шеф-повара", "Фермерские продукты и травяные чаи", "Живая музыка и этнические инструменты", "Ночные церемонии и ритуалы"],
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/75c9649e-22d9-4bfc-bf4d-56ea36522f16.jpg",
    color: "#e8a030",
    accent: "rgba(232,160,48,0.2)",
    icon: "🌙",
    path: "M 780 400 Q 760 480 720 540",
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
    accent: "rgba(106,170,112,0.2)",
    icon: "🍃",
    path: "M 720 540 Q 650 580 580 600",
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
    accent: "rgba(160,192,112,0.2)",
    icon: "☀️",
    path: "M 580 600 Q 500 620 420 610",
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
    accent: "rgba(200,122,155,0.2)",
    icon: "🌺",
    path: "M 420 610 Q 300 590 200 560",
  },
];

const MAP_PATHS = [
  "M 160 440 Q 210 390 260 350 Q 310 310 370 275 Q 450 235 530 215",
  "M 530 215 Q 610 215 670 250 Q 720 280 750 340",
  "M 750 340 Q 770 390 770 445 Q 760 510 730 560",
  "M 730 560 Q 690 600 630 625 Q 560 645 490 645",
  "M 490 645 Q 410 645 340 625 Q 260 595 195 555",
  "M 195 555 Q 160 510 160 465 Q 160 453 160 440",
];

export default function TerritoryWalk() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeZone, setActiveZone] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [walkStarted, setWalkStarted] = useState(false);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !walkStarted) {
      setWalkStarted(true);
    }
  }, [isOpen, walkStarted]);

  const goToZone = (index: number) => {
    if (index === activeZone) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveZone(index);
      setIsAnimating(false);
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 300);
  };

  const next = () => goToZone((activeZone + 1) % zones.length);
  const prev = () => goToZone((activeZone - 1 + zones.length) % zones.length);

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
            10 уникальных зон на территории целительского центра — лес, ручьи, баня, медитативные поляны, VIP-домики и творческие мастерские
          </p>

          {/* Preview thumbnails */}
          <div className="flex gap-2 justify-center mb-10 overflow-hidden">
            {zones.slice(0, 5).map((z, i) => (
              <div key={z.id} className="rounded-xl overflow-hidden flex-shrink-0"
                style={{
                  width: "70px", height: "70px",
                  border: "1px solid rgba(106,170,112,0.2)",
                  transform: `rotate(${(i - 2) * 3}deg)`,
                  transition: "transform 0.3s ease",
                }}>
                <img src={z.image} alt={z.title} className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, #3a6640, #5a9e60)",
              color: "#f0f8e8",
              fontWeight: 700,
              letterSpacing: "0.1em",
              boxShadow: "0 0 50px rgba(90,158,96,0.25)",
            }}>
            <span style={{ fontSize: "1.3rem" }}>🌲</span>
            Начать прогулку
            <span className="group-hover:translate-x-1 transition-transform" style={{ fontSize: "1rem" }}>→</span>
          </button>
          <p className="mt-4 text-xs" style={{ color: "#6a7a60" }}>10 зон · этнический стиль · дерево и природа</p>
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ background: "#080c07" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3" style={{ background: "rgba(8,12,7,0.95)", borderBottom: "1px solid rgba(106,170,112,0.12)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <span style={{ color: "#6aaa70", fontSize: "1.2rem" }}>🌿</span>
          <div>
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "#6a7a60" }}>Прогулка по территории</p>
            <p className="text-sm font-light" style={{ color: "#c8d89e", fontFamily: "'Cormorant', serif" }}>{zone.title}</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110" style={{ background: "rgba(106,170,112,0.1)", color: "#6aaa70", fontSize: "1.1rem" }}>
          ✕
        </button>
      </div>

      {/* Zone dots navigation */}
      <div className="flex gap-2 justify-center py-4 px-4 overflow-x-auto">
        {zones.map((z, i) => (
          <button key={z.id} onClick={() => goToZone(i)}
            className="flex-shrink-0 flex flex-col items-center gap-1 transition-all"
            style={{ opacity: i === activeZone ? 1 : 0.45 }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all"
              style={{
                background: i === activeZone ? z.color : "rgba(255,255,255,0.05)",
                border: `1px solid ${i === activeZone ? z.color : "rgba(255,255,255,0.1)"}`,
                transform: i === activeZone ? "scale(1.2)" : "scale(1)",
              }}>
              {z.emoji}
            </div>
            {i === activeZone && (
              <span className="text-[9px] uppercase tracking-wider whitespace-nowrap" style={{ color: z.color }}>
                {z.title.split(" ")[0]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div ref={detailRef} className="max-w-4xl mx-auto px-4 pb-24">
        {/* Image hero */}
        <div className="relative rounded-3xl overflow-hidden mb-6" style={{ height: "55vw", maxHeight: "380px", minHeight: "220px" }}>
          <img
            src={zone.image}
            alt={zone.title}
            className="w-full h-full object-cover transition-all"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? "scale(1.05)" : "scale(1)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,12,7,0.9) 0%, rgba(8,12,7,0.2) 50%, transparent 100%)" }} />
          {/* Zone counter */}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs"
            style={{ background: "rgba(8,12,7,0.7)", border: `1px solid ${zone.color}`, color: zone.color, backdropFilter: "blur(8px)" }}>
            {activeZone + 1} / {zones.length}
          </div>
          {/* Zone label */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: zone.color, opacity: isAnimating ? 0 : 1, transition: "opacity 0.3s ease" }}>{zone.subtitle}</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#e8f0d8", opacity: isAnimating ? 0 : 1, transition: "opacity 0.3s ease 0.05s" }}>
              {zone.emoji} {zone.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <div className="rounded-2xl p-6 mb-5" style={{ background: zone.accent, border: `1px solid ${zone.color}25`, opacity: isAnimating ? 0 : 1, transition: "opacity 0.3s ease 0.1s" }}>
          <p className="text-base leading-relaxed" style={{ color: "#c8d8b8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
            {zone.desc}
          </p>
        </div>

        {/* Details list */}
        <div className="grid grid-cols-2 gap-3 mb-8" style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.3s ease 0.15s" }}>
          {zone.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-2 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ color: zone.color, fontSize: "1rem", flexShrink: 0, marginTop: "1px" }}>{zone.icon}</span>
              <span className="text-xs leading-relaxed" style={{ color: "#8a9a78" }}>{detail}</span>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          <button onClick={prev}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm transition-all hover:scale-[1.02]"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(106,170,112,0.15)", color: "#6aaa70" }}>
            ← Назад
          </button>
          <button onClick={next}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-medium transition-all hover:scale-[1.02]"
            style={{ background: `linear-gradient(135deg, ${zone.color}30, ${zone.color}15)`, border: `1px solid ${zone.color}40`, color: zone.color }}>
            Далее →
          </button>
        </div>

        {/* All zones strip */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-[0.4em] mb-4 text-center" style={{ color: "#6a7a60" }}>Все зоны территории</p>
          <div className="grid grid-cols-5 gap-2">
            {zones.map((z, i) => (
              <button key={z.id} onClick={() => goToZone(i)}
                className="rounded-xl overflow-hidden relative transition-all hover:scale-[1.05]"
                style={{ aspectRatio: "1", border: `1px solid ${i === activeZone ? z.color : "rgba(255,255,255,0.06)"}` }}>
                <img src={z.image} alt={z.title} className="w-full h-full object-cover" style={{ opacity: i === activeZone ? 1 : 0.4 }} />
                <div className="absolute inset-0 flex items-end p-1" style={{ background: i === activeZone ? "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" : "rgba(0,0,0,0.3)" }}>
                  <span className="text-xs" style={{ fontSize: "0.85rem" }}>{z.emoji}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center rounded-2xl p-8" style={{ background: "rgba(106,170,112,0.05)", border: "1px solid rgba(106,170,112,0.12)" }}>
          <p className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e" }}>Вам понравилось то, что вы увидели?</p>
          <p className="text-sm mb-6" style={{ color: "#6a7a60" }}>Приходите — в реальности это ещё красивее</p>
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
