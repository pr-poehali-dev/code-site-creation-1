import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";


// ─── Data ─────────────────────────────────────────────────────────────────────

const HERO_STATS = [
  { value: "7+", label: "направлений" },
  { value: "40+", label: "процедур" },
  { value: "1", label: "ваша уникальная стратегия" },
];

// БиоХакинг — отдельно, особый стиль
const biohack = {
  id: "biohack",
  title: "БиоХакинг",
  tagline: "Персонализированная стратегия регенерации",
  effect: "Запускает глубокое обновление на клеточном уровне",
  items: [
    { emoji: "❄️", name: "Криокапсула", desc: "Криотерапия запускает регенерацию тканей, ускоряет обмен веществ и даёт мощный антивоспалительный эффект" },
    { emoji: "💡", name: "LED-терапия", desc: "Световые панели стимулируют выработку коллагена, улучшают микроциркуляцию и омолаживают кожу" },
    { emoji: "🌊", name: "Гидромассаж", desc: "Родниковая вода с морской солью, травяными настоями и лечебными грязями — детокс и восстановление" },
    { emoji: "🌿", name: "Водорослевые обёртывания", desc: "Бандажные обёртывания питают кожу, выводят токсины и моделируют силуэт" },
    { emoji: "🤲", name: "Авторский массаж", desc: "Глубокая работа с телом — снятие зажимов, восстановление лимфотока, расслабление нервной системы" },
    { emoji: "✨", name: "Альгинатные маски", desc: "Мгновенный лифтинг и увлажнение — кожа сияет уже после первой процедуры" },
    { emoji: "💧", name: "Капельницы", desc: "Персональные коктейли витаминов и микроэлементов для восстановления изнутри" },
    { emoji: "🔥", name: "SPA-баня", desc: "Берёзовый веник, кесе, медово-травяной пилинг и ароматерапия — обновление с головы до пят" },
    { emoji: "🫧", name: "Гипербарическая оксигенация", desc: "Насыщение тканей кислородом под давлением — ускоряет заживление, усиливает иммунитет и запускает глубокую клеточную регенерацию" },
  ],
};

// Остальные программы (5 вместо 6 — SPA + маникюр объединены)
const programs = [
  {
    id: "prp",
    icon: "◈",
    title: "PRP & Инъекции",
    tagline: "Молодость из ресурсов вашего тела",
    effect: "Омоложение, восстановление, сияние кожи",
    color: "#b87a6a",
    gradient: "linear-gradient(135deg, rgba(184,122,106,0.15), rgba(184,122,106,0.04))",
    items: [
      { emoji: "🩸", name: "PRP-терапия", desc: "Плазма собственной крови насыщена факторами роста — запускает регенерацию тканей на уровне клеток" },
      { emoji: "✦", name: "NCTF", desc: "Коктейль из 53 компонентов глубоко увлажняет, разглаживает кожу и восстанавливает её матрикс" },
      { emoji: "🧬", name: "PDRN", desc: "Полинуклеотиды из лосося восстанавливают ДНК клеток, оказывают мощный регенерирующий эффект" },
      { emoji: "💉", name: "Микроколост", desc: "Тончайшие инъекции коктейлей омоложения — равномерное питание и увлажнение всей поверхности кожи" },
      { emoji: "👁️", name: "Мезоай", desc: "Специальный препарат для зоны глаз — убирает тёмные круги, отёки и мелкие морщины" },
      { emoji: "☀️", name: "Мезоксантин", desc: "Антиоксидантная мезотерапия защищает клетки от свободных радикалов и восстанавливает сияние" },
      { emoji: "🔬", name: "Субцизия от рубцов", desc: "Рассечение фиброзных тяжей + инъекции PRP или собственного жира — видимый результат с первого сеанса" },
      { emoji: "🌬️", name: "Озонотерапия и ВЛОК", desc: "Озон насыщает кровь кислородом и уничтожает патогены, ВЛОК (лазерное облучение крови) восстанавливает иммунитет и омолаживает клетки" },
    ],
  },
  {
    id: "hardware",
    icon: "⬡",
    title: "Аппаратная и лазерная косметология",
    tagline: "Технологии, которые меняют тело",
    effect: "Коррекция, омоложение, лазерные технологии",
    color: "#7aab9e",
    gradient: "linear-gradient(135deg, rgba(122,171,158,0.15), rgba(122,171,158,0.04))",
    items: [
      { emoji: "⚡", name: "Fotona & Halo", desc: "Шлифовка лазером — убирает пигментацию, рубцы, расширенные поры. Кожа как после 10 лет назад" },
      { emoji: "🌸", name: "Лазерная эпиляция", desc: "Навсегда избавит от нежелательных волос — безболезненно, быстро, на любом типе кожи" },
      { emoji: "💎", name: "Удаление сосудов и пятен", desc: "Сосудистые звёздочки, гемангиомы, винные пятна, новообразования — исчезают без следа" },
      { emoji: "✨", name: "Эндосфера", desc: "Антицеллюлитная терапия с доказанным результатом — уменьшение объёмов и подтяжка тканей" },
      { emoji: "🔥", name: "Onda & Icoon", desc: "Неинвазивное жиросжигание и ремоделирование тела — видимый результат без операции" },
      { emoji: "💪", name: "BTL X-Wave", desc: "Радиальные ударные волны разрушают фиброзные тяжи целлюлита и запускают лимфодренаж" },
      { emoji: "🌊", name: "ИзоДжей & тунелизация", desc: "Аппаратная коррекция целлюлита и растяжек — глубокое воздействие на проблемные зоны" },
      { emoji: "🌟", name: "Перманент бровей и губ", desc: "Авторская техника перманентного макияжа — естественный результат на годы" },
    ],
  },
  {
    id: "yoga",
    icon: "❋",
    title: "Хот-Йога, Движение & Медитация",
    tagline: "Тело в потоке — разум в покое",
    effect: "Гибкость, сила, внутренний баланс",
    color: "#d4622a",
    gradient: "linear-gradient(135deg, rgba(212,98,42,0.15), rgba(212,98,42,0.04))",
    items: [
      { emoji: "🔥", name: "Хот-йога", desc: "Практика в тёплом зале — тело раскрывается глубже, детоксикация через пот, ум успокаивается" },
      { emoji: "🚴", name: "Хот-сайкл", desc: "Кардио в тепле сжигает в 2 раза больше калорий и прокачивает выносливость на новый уровень" },
      { emoji: "🌿", name: "Растяжка", desc: "Восстановление гибкости и подвижности суставов — профилактика травм и хронических болей" },
      { emoji: "🧘", name: "Хот-пилатес", desc: "Глубокая работа с мышечным корсетом в тёплом пространстве — тело становится стройнее и сильнее" },
      { emoji: "🌙", name: "Медитация осознанности", desc: "Практика наблюдения за умом — снимает тревогу, восстанавливает внутренний ресурс и учит быть в настоящем моменте" },
      { emoji: "🎵", name: "Звуковые медитации", desc: "Тибетские поющие чаши и частоты 432 Гц — глубокое расслабление нервной системы через звуковые вибрации" },
      { emoji: "🌬️", name: "Дыхательные практики", desc: "Пранаяма и техники осознанного дыхания — активация парасимпатической системы, антистресс и ясность ума" },
    ],
  },
  {
    id: "spa-beauty",
    icon: "✿",
    title: "SPA, Лицо & Красота",
    tagline: "Ритуалы красоты — от лица до кончиков пальцев",
    effect: "Сияние, молодость, красота в каждой детали",
    color: "#9b7fb5",
    gradient: "linear-gradient(135deg, rgba(155,127,181,0.15), rgba(155,127,181,0.04))",
    items: [
      { emoji: "💦", name: "HydraFacial", desc: "Глубокая чистка + пилинг + маска за один сеанс — кожа сияет как после курса процедур" },
      { emoji: "🤲", name: "Скульптурный массаж лица", desc: "Японская техника работы с мышцами — естественный лифтинг без инъекций" },
      { emoji: "👄", name: "Буккальный массаж", desc: "Работа изнутри и снаружи — убирает зажимы, меняет овал лица" },
      { emoji: "❄️", name: "Крио-массаж", desc: "Холодовая терапия сужает поры, снимает воспаления и моментально освежает цвет лица" },
      { emoji: "💅", name: "Кислотный педикюр", desc: "Растворяет огрубевшую кожу без механического воздействия — стопы как у ребёнка" },
      { emoji: "✨", name: "Восстановление ногтей", desc: "Маникюр с реконструкцией — даже повреждённые ногти становятся крепкими и красивыми" },
      { emoji: "🌿", name: "Пилинг головы", desc: "Глубокое очищение кожи головы — активирует рост волос и устраняет перхоть" },
      { emoji: "✂️", name: "Стрижка & укладка", desc: "Авторская стрижка с учётом типа волос и образа жизни — волосы, которыми вы гордитесь" },
    ],
  },
];

const testimonials = [
  { name: "Анастасия К.", text: "После криокапсулы и PRP-терапии кожа стала выглядеть на 10 лет моложе. Мария — настоящий профессионал.", stars: 5 },
  { name: "Елена М.", text: "Хот-йога изменила моё тело и внутреннее состояние. Уже 3 месяца хожу и не могу остановиться!", stars: 5 },
  { name: "Ольга Т.", text: "Персональная стратегия биохакинга — это именно то, что мне было нужно. Результат виден уже после первого курса.", stars: 5 },
  { name: "Наталья В.", text: "SPA-баня с авторскими программами — это что-то невероятное. Ушла вся усталость, кожа светится.", stars: 5 },
];

const MaxIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
  </svg>
);

// ─── Carousel ────────────────────────────────────────────────────────────────

function ProcedureCarousel({ items, color }: { items: { emoji: string; name: string; desc: string }[]; color: string }) {
  const [active, setActive] = useState(0);
  const total = items.length;

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}>
          {items.map((item, i) => (
            <div key={i} className="flex-shrink-0 w-full p-6 md:p-8"
              style={{ background: `linear-gradient(135deg, ${color}14, ${color}06)`, border: `1px solid ${color}20` }}>
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h4 className="text-xl md:text-2xl font-light mb-3"
                style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
                {item.name}
              </h4>
              <p className="text-base leading-relaxed"
                style={{ color: "#c8bca8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 px-1">
        <button onClick={() => setActive(a => (a - 1 + total) % total)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          <Icon name="ChevronLeft" size={16} />
        </button>
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? "20px" : "6px", height: "6px", background: i === active ? color : `${color}35` }} />
          ))}
        </div>
        <button onClick={() => setActive(a => (a + 1) % total)}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
    </div>
  );
}

// ─── BioHack Card (особый стиль) ──────────────────────────────────────────────

function BioHackCard() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
      <div className="relative rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0f02 0%, #120a01 50%, #1a0f02 100%)",
          border: "1px solid rgba(200,146,58,0.35)",
          boxShadow: "0 0 80px rgba(200,146,58,0.1), inset 0 0 80px rgba(200,146,58,0.03)",
        }}>
        {/* Декоративный фон */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(200,146,58,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(200,100,20,0.06) 0%, transparent 60%)" }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: `${60 + i * 40}px`, height: `${60 + i * 40}px`,
                border: `1px solid rgba(200,146,58,${0.06 - i * 0.01})`,
                top: "50%", right: "-30px",
                transform: "translateY(-50%)",
                animation: `regen-spin ${12 + i * 5}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }} />
          ))}
        </div>

        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 flex flex-col md:flex-row md:items-start gap-6"
          style={{ borderBottom: "1px solid rgba(200,146,58,0.15)" }}>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl" style={{ color: "#e8b86d", textShadow: "0 0 20px rgba(200,146,58,0.6)" }}>✦</span>
              <span className="text-xs px-3 py-1 rounded-full tracking-wider uppercase"
                style={{ background: "rgba(200,146,58,0.15)", color: "#c8923a", border: "1px solid rgba(200,146,58,0.3)" }}>
                {biohack.items.length} процедур · флагман
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-2"
              style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d", textShadow: "0 0 40px rgba(200,146,58,0.3)" }}>
              {biohack.title}
            </h2>
            <p className="text-base italic mb-3" style={{ color: "#8a7a65" }}>{biohack.tagline}</p>
            <p className="text-sm flex items-center gap-2" style={{ color: "#c8923a" }}>
              <span style={{ fontSize: "0.6rem" }}>◆</span>{biohack.effect}
            </p>
          </div>
          {/* Иконки процедур */}
          <div className="flex flex-wrap gap-2 md:max-w-[160px] justify-start md:justify-end">
            {biohack.items.map((item, i) => (
              <span key={i} className="text-xl" title={item.name}
                style={{ filter: "drop-shadow(0 0 4px rgba(200,146,58,0.3))", animation: `pulse-item ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite` }}>
                {item.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div className="p-6 md:p-8">
          <ProcedureCarousel items={biohack.items} color="#c8923a" />
        </div>
      </div>
    </div>
  );
}

// ─── Program Card ─────────────────────────────────────────────────────────────

function ProgramCard({ prog, index }: { prog: typeof programs[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-3xl overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s`,
        background: "#16120e",
        border: `1px solid ${prog.color}20`,
        boxShadow: `0 0 60px ${prog.color}08`,
      }}>
      <div className="px-7 pt-7 pb-5"
        style={{ background: prog.gradient, borderBottom: `1px solid ${prog.color}15` }}>
        <div className="flex items-start justify-between mb-3">
          <span className="text-4xl" style={{ color: prog.color }}>{prog.icon}</span>
          <span className="text-xs px-3 py-1 rounded-full tracking-wider uppercase"
            style={{ background: `${prog.color}15`, color: prog.color, border: `1px solid ${prog.color}30` }}>
            {prog.items.length} процедур
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-light mb-1"
          style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>{prog.title}</h2>
        <p className="text-sm italic mb-3" style={{ color: "#8a7a65" }}>{prog.tagline}</p>
        <p className="text-sm font-medium flex items-center gap-2" style={{ color: prog.color }}>
          <span style={{ fontSize: "0.6rem" }}>◆</span>{prog.effect}
        </p>
      </div>
      <div className="p-6">
        <ProcedureCarousel items={prog.items} color={prog.color} />
      </div>
    </div>
  );
}

// ─── Animated stat ────────────────────────────────────────────────────────────

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.8)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <p className="text-4xl md:text-5xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "#c8923a" }}>{value}</p>
      <p className="text-xs uppercase tracking-widest" style={{ color: "#8a7a65" }}>{label}</p>
    </div>
  );
}

// ─── Dog Nursery ──────────────────────────────────────────────────────────────

function DogNursery() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const dogServices = [
    { emoji: "✂️", name: "Груминг", desc: "Профессиональная стрижка, расчёсывание и уход — питомец выглядит великолепно" },
    { emoji: "🛁", name: "SPA для питомца", desc: "Купание с премиальными средствами, маски и ароматерапия — роскошный уход для вашего любимца" },
    { emoji: "🤲", name: "Массаж", desc: "Расслабляющий массаж снимает стресс, улучшает кровообращение и настроение питомца" },
    { emoji: "📹", name: "Видео-трансляция", desc: "Наблюдайте за питомцем онлайн в любой момент — полный покой и прозрачность" },
  ];

  const floaters = [
    { el: "🐾", x: "8%",  y: "12%", size: "1.8rem", dur: "6s",  delay: "0s",   rot: "-20deg" },
    { el: "🐾", x: "88%", y: "6%",  size: "1.4rem", dur: "8s",  delay: "1.2s", rot: "30deg"  },
    { el: "🐾", x: "72%", y: "78%", size: "2rem",   dur: "7s",  delay: "0.5s", rot: "15deg"  },
    { el: "🐾", x: "15%", y: "70%", size: "1.2rem", dur: "9s",  delay: "2s",   rot: "-35deg" },
    { el: "🌿", x: "5%",  y: "40%", size: "1.6rem", dur: "10s", delay: "0.3s", rot: "10deg"  },
    { el: "🍃", x: "92%", y: "35%", size: "1.5rem", dur: "8s",  delay: "1.8s", rot: "-15deg" },
    { el: "🍃", x: "50%", y: "5%",  size: "1.1rem", dur: "12s", delay: "0.8s", rot: "25deg"  },
    { el: "🌿", x: "78%", y: "55%", size: "1.3rem", dur: "9s",  delay: "3s",   rot: "-25deg" },
    { el: "🐾", x: "35%", y: "88%", size: "1rem",   dur: "11s", delay: "1.5s", rot: "40deg"  },
    { el: "🍃", x: "60%", y: "90%", size: "1.4rem", dur: "7s",  delay: "0.2s", rot: "-10deg" },
    { el: "🍀", x: "25%", y: "30%", size: "1.2rem", dur: "13s", delay: "2.5s", rot: "20deg"  },
    { el: "🐾", x: "55%", y: "50%", size: "0.9rem", dur: "10s", delay: "4s",   rot: "-45deg" },
    { el: "🍃", x: "3%",  y: "80%", size: "1.3rem", dur: "9s",  delay: "1s",   rot: "35deg"  },
    { el: "🌿", x: "95%", y: "65%", size: "1.1rem", dur: "11s", delay: "0.6s", rot: "-30deg" },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className="rounded-3xl overflow-hidden relative"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            background: "linear-gradient(135deg, #0a1a10 0%, #0d1a0d 50%, #0a120a 100%)",
            border: "1px solid rgba(106,170,128,0.25)",
            boxShadow: "0 0 80px rgba(106,170,128,0.06)",
          }}>
          {/* Animated paws & leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {floaters.map((item, i) => (
              <span key={i} style={{
                position: "absolute", left: item.x, top: item.y, fontSize: item.size,
                transform: `rotate(${item.rot})`,
                opacity: 0,
                animation: `dogFloat ${item.dur} ease-in-out ${item.delay} infinite`,
              }}>{item.el}</span>
            ))}
          </div>

          <div className="px-8 pt-8 pb-6 flex flex-col md:flex-row md:items-center gap-4"
            style={{ borderBottom: "1px solid rgba(106,170,128,0.12)", background: "linear-gradient(90deg, rgba(106,170,128,0.1), transparent)" }}>
            <div className="flex items-center gap-4 flex-1">
              <span className="text-5xl">🐕</span>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: "rgba(106,170,128,0.6)" }}>для любимых питомцев</p>
                <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#a8d8b0" }}>
                  Ясли для собак
                </h2>
                <p className="text-sm italic mt-1" style={{ color: "rgba(106,170,128,0.6)" }}>Забота о любимце, пока вы отдыхаете</p>
              </div>
            </div>
            <span className="self-start md:self-center text-xs px-3 py-1.5 rounded-full"
              style={{ background: "rgba(106,170,128,0.1)", color: "#6aaa80", border: "1px solid rgba(106,170,128,0.2)" }}>
              🌿 Счастливый питомец — спокойный хозяин
            </span>
          </div>

          <div className="p-6 grid sm:grid-cols-2 gap-4">
            {dogServices.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 flex gap-4 items-start"
                style={{ background: "rgba(106,170,128,0.05)", border: "1px solid rgba(106,170,128,0.1)" }}>
                <span className="text-3xl flex-shrink-0">{s.emoji}</span>
                <div>
                  <h4 className="text-lg font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "#a8d8b0" }}>{s.name}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(168,216,176,0.55)" }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pb-6" />
        </div>
      </div>
    </section>
  );
}

// ─── Biohacking Stages ───────────────────────────────────────────────────────

const STAGES = [
  {
    id: 1,
    icon: "🌊",
    title: "Очищение",
    color: "#6aaad0",
    dim: "rgba(106,170,208,0.1)",
    border: "rgba(106,170,208,0.22)",
    tagline: "Начало Пути — обнуление и запуск системы",
    days: [
      {
        label: "День 1",
        sub: "Прибытие · диагностика · первый шаг",
        blocks: [
          {
            time: "06:30 — 12:00 · Заход",
            icon: "🌅",
            items: [
              "Контрастный душ — первый ритуал обнуления. Одежда центра из льна и хлопка",
              "Full Body Scan: кровь (общий, биохимия, гормоны), ЭКГ, УЗИ органов, биоимпедансометрия, анализ мочи",
              "Расширенная панель: микробиота кишечника, генетическая предрасположенность, витамины D / магний / цинк / железо",
              "Врач составляет индивидуальный протокол очищения — питание, капельницы, процедуры",
              "Снятие всего искусственного: ногти, ресницы, наращенные волосы, пирсинг. Без телефона. Без зеркал",
            ],
          },
          {
            time: "13:00 — 17:00 · Знакомство с пространством",
            icon: "🌲",
            items: [
              "Прогулка по территории с куратором: лес, ручей, баня, медитативная поляна, бассейн",
              "🍵 Питание / вариант А: живой обед по персональной диете — суп из лесных трав, пророщенные злаки, ферменты",
              "💧 Питание / вариант Б: питьевое питание — костные бульоны, семечки, минеральная вода, травяные настои",
              "Знакомство с участниками программы у костра. Свободное время с питомцем",
            ],
          },
          {
            time: "18:00 — 22:00 · Первый вечерний ритуал",
            icon: "🌙",
            items: [
              "Фитобочка с хвойными маслами · Восстановление ногтей и кожи рук",
              "Ингаляция с пихтой → Красный свет (LED-терапия) → Медитация со звуковыми чашами",
              "Вечерний травяной чай у костра. Дыхательная практика под звёздами",
              "Сон на специальной ортопедической кровати с датчиками сна",
            ],
          },
        ],
      },
      {
        label: "День 2",
        sub: "Детокс тела · первая капельница",
        blocks: [
          {
            time: "06:30 — 09:30 · Утро",
            icon: "☀️",
            items: [
              "06:30 — Контрастный душ · стакан тёплой воды с лимоном",
              "07:00 — Утренняя практика: пранаяма и медитация на деревянной поляне на рассвете",
              "07:45 — Зарядка + бег или шаг по лесу вдоль реки (30–60 мин)",
              "09:00 — Бассейн с морской водой или гидромассажная ванна с минеральной водой",
            ],
          },
          {
            time: "10:00 — 14:00 · Медицинский блок",
            icon: "🔬",
            items: [
              "Детокс-массаж внутренних органов + лимфодренажный + буккальный массаж лица",
              "Капельница: NAD+ / глутатион + витамин C / витамины группы B / магний, калий / аминокислоты / альфа-липоевая кислота",
              "🍵 Питание / вариант А: живой обед — суп, злаки, ферменты, пробиотики, омега",
              "💧 Питание / вариант Б: детокс-коктейль (зелёный сок, хлорофилл, куркума) + травяной настой",
            ],
          },
          {
            time: "15:00 — 22:00 · Тело и ум",
            icon: "🌿",
            items: [
              "Выбор занятия: растяжка · пилатес · йога · цигун · тайцзы · кардио · силовые",
              "Скрабирование тела кедровым скрабом · Фитобочка · Обёртывание с травами · Масляный массаж",
              "Чтение или медитация на природе / прогулка к ручью / шинрин-йоку в лесу",
              "Ингаляция → Красный свет → Медитация перед сном",
              "Энергопрактика с погружением или вечернее успокоение ума",
            ],
          },
        ],
      },
      {
        label: "День 3",
        sub: "Огонь и лёд · первая баня",
        blocks: [
          {
            time: "06:30 — 12:00 · Активация",
            icon: "🔥",
            items: [
              "Контрастный душ → зарядка → бег по лесной тропе (30–45 мин)",
              "Утренняя практика: звуковые чаши + дыхание Вима Хофа на поляне",
              "Растяжка / йога / цигун — выбор по самочувствию",
              "🍵 Вариант А: травяной завтрак с суперфудами, пробиотики, омега-3",
              "💧 Вариант Б: только травяной настой + минеральная вода (переход на голодание)",
            ],
          },
          {
            time: "13:00 — 18:00 · Баня и восстановление",
            icon: "🌊",
            items: [
              "Авторский банный ритуал: парение с берёзовым или дубовым веником",
              "Горячий чан с травами → ледяная купель (криотерапия природой)",
              "Криокапсула или бассейн с морской водой",
              "Ингаляция с пихтой + LED-красный свет",
              "Капельница: NAD+ / антиоксидантный коктейль / аминокислоты",
            ],
          },
          {
            time: "19:00 — 22:00 · Вечер у огня",
            icon: "🪵",
            items: [
              "🍵 Вариант А: ужин у костра — фермерская живая еда, пробиотики",
              "💧 Вариант Б: травяной настой у костра (полный переход на голодание)",
              "Групповые практики или свободное время",
              "Дыхательный ритуал → сон на кровати с датчиками",
            ],
          },
        ],
      },
      {
        label: "День 7",
        sub: "Середина очищения · результаты видны",
        blocks: [
          {
            time: "Утро · тело",
            icon: "🌿",
            items: [
              "Контрастный душ → медитация на рассвете с пранаямой",
              "Лесной бег или скандинавская ходьба 5–8 км",
              "Бассейн: плавание на ускорение + гидромассаж",
              "Аюрведический массаж с тёплыми маслами — 90 мин",
            ],
          },
          {
            time: "День · медицина",
            icon: "⚡",
            items: [
              "Промежуточная диагностика: контроль показателей крови, энергетика, сон",
              "Капельница с коррекцией по результатам: NAD+ / магний / витамины / антиоксиданты",
              "Гипербарическая оксигенация или LED-терапия",
              "🍵 Вариант А: обед — суп из костного бульона, квашеные овощи, пробиотики",
              "💧 Вариант Б: день голодания — травяные отвары + электролиты + минеральная вода",
            ],
          },
          {
            time: "Вечер · практики",
            icon: "🌙",
            items: [
              "Баня с можжевеловым паром + холодная купель",
              "Звуковые ванны на деревянной поляне — пение чаш, тишина",
              "Групповые танцы у костра или флоатинг с медитацией",
              "Разговор с врачом: как чувствуете себя на 7-й день? Корректировка плана",
            ],
          },
        ],
      },
      {
        label: "День 14",
        sub: "Итог очищения · повторная диагностика",
        blocks: [
          {
            time: "Диагностика · сравнение",
            icon: "🔬",
            items: [
              "Повторный Full Body Scan — кровь, гормоны, биоимпеданс, УЗИ",
              "Углублённая панель: микробиота, гормональный профиль, витаминный статус",
              "Сравнение показателей с Днём 1: видимая разница в цифрах",
              "Встреча с врачом и нутрициологом — разбор результатов",
            ],
          },
          {
            time: "Итог и план",
            icon: "🌱",
            items: [
              "Составление плана на следующий этап (Исцеление) или на возвращение домой",
              "Индивидуальный курс витаминов, БАДов, протокол питания на 3 месяца",
              "Доступ к мобильному приложению: отслеживание сна, активности, питания",
              "Запись на онлайн-консультации с врачом и нутрициологом",
              "Семинар: здоровое питание, дыхательные практики и самомассаж",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    icon: "🌿",
    title: "Исцеление",
    color: "#7ab870",
    dim: "rgba(122,184,112,0.1)",
    border: "rgba(122,184,112,0.22)",
    tagline: "Тело помнит путь к здоровью — мы помогаем ему вспомнить",
    days: [
      {
        label: "Дни 1–3",
        sub: "Запуск исцеления · работа с телом",
        blocks: [
          {
            time: "Утро — активация",
            icon: "☀️",
            items: [
              "06:30 — Контрастный душ. Утренняя медитация на рассвете на поляне",
              "07:00 — Пранаяма и звуковые чаши. Настройка на день",
              "07:45 — Бег по лесу или езда на велосипеде вдоль реки (6–10 км)",
              "09:00 — Бассейн: плавание с ускорением или озеро",
            ],
          },
          {
            time: "День — медицина тела",
            icon: "💆",
            items: [
              "Глубокотканный массаж + буккальный лица (при зажимах) / лимфодренажный / спортивный",
              "Скульптурный массаж тела + аппаратный: эндосфера, вакуум, BTL",
              "Аппаратная и ручная работа с целлюлитом · тунелизация",
              "Чистка зубов ультразвуком · Air Flow · отбеливание при необходимости",
              "Удаление пигмента, звёздочек · капельница по протоколу",
              "🍵 Вариант А: живой обед, детокс-коктейли, пробиотики, омега",
              "💧 Вариант Б: голодание — детокс-коктейль (зелёный сок + хлорофилл), травяной настой",
            ],
          },
          {
            time: "Вечер — практики и ум",
            icon: "🧠",
            items: [
              "Баня с глубокотканным паром + чан с травами + ледяная купель",
              "Очищение от стресса: крик-практики, телесная работа, эмоциональный выход",
              "Флоатинг с медитацией или групповые танцы у костра",
              "Медитация на земле под звёздами · дыхательный ритуал · сон",
            ],
          },
        ],
      },
      {
        label: "Дни 4–7",
        sub: "Глубокая работа · разум и навыки",
        blocks: [
          {
            time: "Тело — углубление",
            icon: "🌊",
            items: [
              "Лонгборд или яхта (плавание с ускорением, вёсла)",
              "Конный спорт в лесу — контакт с природой и животными",
              "Аппаратные процедуры: онда, бьютилазер, BTL X-Wave",
              "Массаж: лимфодренажный + скульптурный лица и тела",
              "Капельница: NAD+ / озонотерапия / ВЛОК / аминокислоты",
            ],
          },
          {
            time: "Разум — трансформация",
            icon: "🧠",
            items: [
              "Проработка трансформации с погружением: сессия с психологом или телесный коуч",
              "Тантрические ретриты для отключения ментального потока с медитацией",
              "Групповые танцы у костра · живая музыка · пение",
              "Вертолётная экскурсия над лесом и рекой",
              "🍵 Вариант А: ужин у костра — фермерская еда с суперфудами",
              "💧 Вариант Б: травяной настой + электролиты. День без твёрдой пищи",
            ],
          },
        ],
      },
      {
        label: "Дни 8–14",
        sub: "Обучение новому · закрепление",
        blocks: [
          {
            time: "Навыки и таланты",
            icon: "✨",
            items: [
              "Танцы (народные, аргентинское танго, свободный стиль)",
              "Гончарное дело · рисование акварелью · постановка голоса",
              "Выживание: ориентирование в лесу, разведение костра, съедобные растения",
              "Выращивание трав и еды — работа с землёй, посев, уход",
            ],
          },
          {
            time: "Итог и переход",
            icon: "🌱",
            items: [
              "Промежуточная диагностика: кровь, состав тела, энергетика",
              "Корректировка протокола питания и процедур",
              "Оценка эмоционального состояния — сессия с психологом",
              "Подготовка к этапу Обновление: план косметологических и эстетических процедур",
            ],
          },
        ],
      },
      {
        label: "День 21",
        sub: "Расцвет · тело откликается",
        blocks: [
          {
            time: "Медицина и тело",
            icon: "⚡",
            items: [
              "Полная диагностика: кровь, гормоны, биоимпеданс — сравнение с Днём 1",
              "PRP-терапия · ВЛОК · озонотерапия — запуск регенерации",
              "Гипербарическая оксигенация — полный курс",
              "Криотерапия — общая криокапсула + локальная",
              "Аюрведа и тибетская медицина: массаж, травяные обёртывания, ванны",
            ],
          },
          {
            time: "Практики и тишина",
            icon: "🌙",
            items: [
              "Медитация на рассвете на деревянной поляне — одни в тишине",
              "Лесные ванны (шинрин-йоку) 3–4 часа",
              "Звуковые ванны + дыхательные сессии",
              "🍵 Вариант А: обед и ужин из живой сезонной еды по протоколу",
              "💧 Вариант Б: переход на поддерживающее питание — костный бульон, соки, травяные отвары",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    icon: "✦",
    title: "Обновление",
    color: "#c8923a",
    dim: "rgba(200,146,58,0.1)",
    border: "rgba(200,146,58,0.22)",
    tagline: "Это не маска — это настоящее изменение изнутри",
    days: [
      {
        label: "Кожа лица",
        sub: "Эстетическая медицина — лицо",
        blocks: [
          {
            time: "Базовый уход",
            icon: "💎",
            items: [
              "Гидрадермабразия (HydraFacial) + глубокая чистка + пилинг + питательная маска",
              "Крио-массаж лица + LED-светотерапия (красный + инфракрасный спектр)",
              "Массаж скульптурный + буккальный (работа с лицевыми мышцами изнутри)",
              "Микроколостральная терапия · НСТФ · ПДРН · полимолочная кислота",
            ],
          },
          {
            time: "Аппаратное омоложение",
            icon: "⚡",
            items: [
              "Шлифовка Halo (гибридный лазер) · Фотона · микролазерпилинг",
              "Субцизия + коллостимуляция (работа со шрамами и рубцами)",
              "Мезотерапия · ревитализация глаз + зоны лица",
              "Плазма + жир (липофилинг при необходимости)",
              "Ксеомин (ботулинотерапия): лоб, межбровье, периорбитальная зона",
            ],
          },
        ],
      },
      {
        label: "Тело",
        sub: "Скульптура и восстановление тела",
        blocks: [
          {
            time: "Аппаратное тело",
            icon: "🌊",
            items: [
              "Онда (микроволновая деструкция жира) · Бьютилазер · Эндосфера",
              "BTL X-Wave (ударно-волновая) · Икун + Изоджей (RF-лифтинг)",
              "Тунелизация · ИГ РФ + коллагеназа по растяжкам",
              "Ванны-источники · грязевые ванны + гидромассаж с минеральной водой",
              "Обёртывания: ламинария, шоколад, золото",
            ],
          },
          {
            time: "Перманент и лазер",
            icon: "💄",
            items: [
              "Перманентный макияж бровей (по цветотипу) · перманент губ",
              "Лазерная эпиляция нужных зон · интимное отбеливание",
              "Удаление новообразований, родинок, бородавок",
              "Удаление звёздочек, гемангиом, винных пятен лазером",
              "Виниры или эстетическая реставрация зубов",
            ],
          },
        ],
      },
      {
        label: "Волосы",
        sub: "Комплексный уход за волосами и кожей головы",
        blocks: [
          {
            time: "Лечение и уход",
            icon: "💇",
            items: [
              "Пилинг кожи головы · мезотерапия волосистой зоны",
              "PRP-терапия для волос (плазма из собственной крови)",
              "Уходы с кератином, коллагеном, маслами — восстановление структуры",
              "Массаж головы 30 мин — улучшение кровообращения",
            ],
          },
          {
            time: "Стрижка и образ",
            icon: "✂️",
            items: [
              "Анализ цветотипа и типа волос",
              "Авторская стрижка по цветотипу + окрашивание (натуральные красители при желании)",
              "Тату — если есть задуманное",
              "Подбор духов по характеру и цветотипу",
              "Создание личных амулетов в мастерской",
            ],
          },
        ],
      },
      {
        label: "Стиль",
        sub: "Образ, стиль и самовыражение",
        blocks: [
          {
            time: "Личный стиль",
            icon: "🌺",
            items: [
              "Работа со стилистом: разбор гардероба, цветотип, архетип",
              "Шоппинг-сессия или создание капсульного гардероба",
              "Фотосессия нового образа в лесу и у воды",
              "Создание личного аромата или амулета",
            ],
          },
        ],
      },
      {
        label: "День 28 ✦",
        sub: "Финал · рождение нового образа",
        blocks: [
          {
            time: "Утро · последнее в центре",
            icon: "🌅",
            items: [
              "06:30 — Последний рассвет. Тишина. Медитация на деревянной поляне со всеми участниками",
              "Финальная диагностика: сравнение всех показателей с Днём 1",
              "Встреча с врачом: итоги, план на год, нутрицевтики",
              "Профессиональная фотосессия — до и после. В новом образе, на территории центра",
            ],
          },
          {
            time: "Вечер · торжество",
            icon: "✦",
            items: [
              "Торжественный ужин у костра: живая музыка, фермерская еда",
              "Каждый участник — слово о своей трансформации",
              "Вручение индивидуального плана здоровья и красоты на следующий год",
              "Зеркало покажет то, что изменилось изнутри. Добро пожаловать, новая версия.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    icon: "🔥",
    title: "Наполнение",
    color: "#a078c8",
    dim: "rgba(160,120,200,0.1)",
    border: "rgba(160,120,200,0.22)",
    tagline: "Тропинка целебного леса привела вас к полной регенерации",
    days: [
      {
        label: "Навыки",
        sub: "Знания, которые останутся с вами навсегда",
        blocks: [
          {
            time: "Мастерские жизни",
            icon: "🌱",
            items: [
              "Выращивание еды и трав: посев, уход, сбор урожая прямо здесь в центре",
              "Выпечка хлеба на закваске, ферментация, натуральные специи",
              "Создание натуральной косметики из растений и масел",
              "Шитьё: базовые навыки + пошив простой обуви из натуральных материалов",
            ],
          },
          {
            time: "Самоисцеление и выживание",
            icon: "⚡",
            items: [
              "Самомассаж: лицо, лимфа, суставы — ежедневные 15 минут",
              "Дыхательные практики: пранаяма, холотропное дыхание, Вим Хоф",
              "Медитация: от новичка до устойчивой практики (20 мин / день)",
              "Выживание: ориентирование по звёздам и деревьям · стрельба из лука",
              "Первая помощь и фитотерапия в полевых условиях",
            ],
          },
        ],
      },
      {
        label: "Привычки",
        sub: "Фундамент новой жизни после центра",
        blocks: [
          {
            time: "Система привычек",
            icon: "🌿",
            items: [
              "Спорт: персональный план на год (тип, частота, прогрессия)",
              "Гигиена тела и ума: утренний и вечерний ритуалы",
              "Чтение: 20 книг в год по здоровью, природе, осознанности",
              "Путешествия: план экологических маршрутов и ретритов",
            ],
          },
          {
            time: "Планета и смыслы",
            icon: "🌎",
            items: [
              "Осознанное потребление: отказ от лишних покупок и пластика",
              "Уход за планетой: высадка деревьев, участие в экопроектах",
              "Участие в групповых выездах центра: очищение территорий, посадка леса",
              "День 21/28: написание личного манифеста новой версии себя",
            ],
          },
        ],
      },
      {
        label: "Поддержка",
        sub: "Центр продолжает заботиться о вас",
        blocks: [
          {
            time: "После программы",
            icon: "🌐",
            items: [
              "10 дней в году — возвращение в центр с доступом ко всем общим зонам без оплаты",
              "Проживание в деревянной палатке среди леса · полная приватность",
              "Доставка еды и семян центра по вашей персональной диете",
              "Доставка капельниц, уколов, БАДов и натуральной одежды",
            ],
          },
          {
            time: "Сообщество",
            icon: "🔥",
            items: [
              "Групповые выезды по улучшению планеты: очищение, исцеление, обновление, наполнение",
              "Клуб выпускников центра: встречи раз в квартал",
              "Онлайн-поддержка: врач, нутрициолог, психолог — всегда на связи",
              "Доступ к новым программам и ретритам центра в приоритете",
            ],
          },
        ],
      },
      {
        label: "День 28 ✦",
        sub: "Финал · рождение новой версии",
        blocks: [
          {
            time: "Последнее утро",
            icon: "🌅",
            items: [
              "06:30 — Последний рассвет в центре. Тишина. Благодарность",
              "Финальная медитация на поляне со всеми участниками",
              "Повторный Full Body Scan: финальное сравнение всех показателей с Днём 1",
              "Вручение индивидуального плана здоровья на следующий год",
            ],
          },
          {
            time: "Новая версия",
            icon: "✨",
            items: [
              "Торжественный ужин: живая музыка, фермерская еда, истории у костра",
              "Каждый участник — слово о своей трансформации",
              "Тропинка целебного леса привела вас к полной регенерации",
              "Рады приветствовать вашу новую версию. Чем займётесь теперь?",
            ],
          },
        ],
      },
    ],
  },
];

function BiohackingStages() {
  const [activeStage, setActiveStage] = useState(0);
  const [activeDay, setActiveDay] = useState(0);
  const stage = STAGES[activeStage];
  const day = stage.days[activeDay];

  const handleStage = (i: number) => {
    setActiveStage(i);
    setActiveDay(0);
  };

  return (
    <section className="py-20 px-4 md:px-6" style={{ background: "rgba(6,8,4,0.97)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Заголовок */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(122,184,138,0.4))" }} />
            <span style={{ color: "rgba(122,184,138,0.7)", fontSize: "1.1rem" }}>🌿</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, rgba(122,184,138,0.4), transparent)" }} />
          </div>
          <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "rgba(122,184,138,0.5)" }}>4-этапный биохакинг</p>
          <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e" }}>
            Путь трансформации
          </h2>
          <p className="text-lg italic font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(168,184,144,0.6)" }}>
            Очищение · Исцеление · Обновление · Наполнение
          </p>
        </div>

        {/* Этапы-табы */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {STAGES.map((s, i) => (
            <button key={s.id} onClick={() => handleStage(i)}
              className="rounded-2xl p-4 text-left transition-all hover:scale-[1.02]"
              style={{
                background: i === activeStage ? s.dim : "rgba(255,255,255,0.03)",
                border: `1.5px solid ${i === activeStage ? s.border : "rgba(255,255,255,0.07)"}`,
                boxShadow: i === activeStage ? `0 0 30px ${s.dim}` : "none",
              }}>
              <span className="text-2xl block mb-2">{s.icon}</span>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs font-medium" style={{ color: "rgba(160,140,200,0.5)" }}>{s.id}</span>
                <div className="h-px flex-1" style={{ background: i === activeStage ? s.color : "rgba(255,255,255,0.1)" }} />
              </div>
              <p className="text-base font-light" style={{ fontFamily: "'Cormorant', serif", color: i === activeStage ? s.color : "rgba(200,190,220,0.6)", fontSize: "1.05rem" }}>
                {s.title}
              </p>
            </button>
          ))}
        </div>

        {/* Контент этапа */}
        <div className="rounded-3xl overflow-hidden" style={{ border: `1px solid ${stage.border}`, background: "rgba(8,10,6,0.8)" }}>

          {/* Шапка этапа */}
          <div className="px-6 py-5 flex items-center gap-4"
            style={{ borderBottom: `1px solid ${stage.border}`, background: stage.dim }}>
            <span className="text-4xl">{stage.icon}</span>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] mb-0.5" style={{ color: stage.color, opacity: 0.7 }}>Этап {stage.id}</p>
              <h3 className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#e8f0d8" }}>{stage.title}</h3>
              <p className="text-sm italic mt-0.5" style={{ color: "rgba(180,170,210,0.5)" }}>{stage.tagline}</p>
            </div>
          </div>

          {/* Табы дней */}
          <div className="flex gap-2 px-6 pt-5 flex-wrap">
            {stage.days.map((d, i) => (
              <button key={`${stage.id}-day-${i}`} onClick={() => setActiveDay(i)}
                className="px-4 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: i === activeDay ? stage.dim : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === activeDay ? stage.border : "rgba(255,255,255,0.07)"}`,
                  color: i === activeDay ? stage.color : "rgba(180,170,210,0.45)",
                  fontFamily: "'Cormorant', serif",
                  fontSize: "0.95rem",
                }}>
                {d.label}
              </button>
            ))}
          </div>

          {/* Подзаголовок дня */}
          <div className="px-6 pt-3 pb-1">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "rgba(160,140,200,0.4)" }}>{day.sub}</p>
          </div>

          {/* Блоки времени */}
          <div className="px-6 pb-6 pt-4 grid md:grid-cols-2 gap-4">
            {day.blocks.map((block, bi) => (
              <div key={`${stage.id}-${activeDay}-block-${bi}`} className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${stage.border.replace("0.22", "0.12")}`, background: "rgba(255,255,255,0.02)" }}>
                {/* Шапка блока */}
                <div className="px-4 py-3 flex items-center gap-3"
                  style={{ borderBottom: `1px solid ${stage.border.replace("0.22", "0.08")}`, background: stage.dim.replace("0.1", "0.07") }}>
                  <span className="text-lg">{block.icon}</span>
                  <p className="text-sm font-medium tracking-wide" style={{ color: stage.color }}>{block.time}</p>
                </div>
                {/* Список */}
                <ul className="px-4 py-3 space-y-2">
                  {block.items.map((item, ii) => (
                    <li key={`item-${bi}-${ii}`} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(200,190,220,0.72)", lineHeight: 1.5 }}>
                      <span className="flex-shrink-0 mt-1.5" style={{ color: stage.color, fontSize: "0.45rem" }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Навигация между этапами */}
        <div className="flex items-center justify-between mt-6 px-1">
          <button onClick={() => handleStage(Math.max(0, activeStage - 1))}
            disabled={activeStage === 0}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-25"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,190,220,0.6)" }}>
            ← Предыдущий этап
          </button>

          <div className="flex gap-2">
            {STAGES.map((s, i) => (
              <button key={i} onClick={() => handleStage(i)}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{ background: i === activeStage ? stage.color : "rgba(255,255,255,0.12)", transform: i === activeStage ? "scale(1.4)" : "scale(1)" }} />
            ))}
          </div>

          <button onClick={() => handleStage(Math.min(STAGES.length - 1, activeStage + 1))}
            disabled={activeStage === STAGES.length - 1}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm transition-all hover:scale-[1.02] disabled:opacity-25"
            style={{ background: stage.dim, border: `1px solid ${stage.border}`, color: stage.color }}>
            Следующий этап →
          </button>
        </div>

        {/* Финальный призыв */}
        {activeStage === 3 && activeDay === 3 && (
          <div className="mt-8 text-center rounded-3xl py-10 px-6"
            style={{ background: "linear-gradient(135deg, rgba(160,120,200,0.12), rgba(122,184,112,0.08))", border: "1px solid rgba(160,120,200,0.2)" }}>
            <p className="text-3xl mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#c8d89e", fontSize: "2rem" }}>Тропинки целебного леса
приведут вас к полной регенерации</p>
            <p className="text-base italic mb-6" style={{ color: "rgba(168,184,144,0.6)", fontFamily: "'Cormorant', serif" }}>
              Рады приветствовать вашу новую версию. Чем займётесь теперь?
            </p>
            <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-widest transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, rgba(122,184,112,0.2), rgba(160,120,200,0.15))", border: "1px solid rgba(122,184,112,0.3)", color: "#7ab870", textDecoration: "none", fontWeight: 600 }}>
              🌿 Начать своё путешествие
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Regeneration() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0f0c08", color: "#f0e6d0" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(15,12,8,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,146,58,0.1)" }}>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "#c8923a" }}>
          <Icon name="ArrowLeft" size={18} />
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>Иней & Магма</span>
        </button>
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "rgba(200,146,58,0.5)" }}>Регенерация</p>
        <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none", fontWeight: 600 }}>
          <MaxIcon /> Записаться
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(200,146,58,0.06) 0%, transparent 60%)" }} />
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: `${120 + i * 80}px`, height: `${120 + i * 80}px`,
                border: `1px solid rgba(200,146,58,${0.04 - i * 0.005})`,
                top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                animation: `regen-spin ${20 + i * 8}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
              }} />
          ))}
        </div>

        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease, transform 1s ease" }}>
          <p className="text-xs uppercase tracking-[0.6em] mb-6" style={{ color: "#8a7a65" }}>Иней & Магма corp.</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #c8923a)" }} />
            <span className="text-3xl" style={{ color: "#c8923a" }}>✦</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #c8923a, transparent)" }} />
          </div>
          <h1 className="text-6xl md:text-8xl font-light leading-none mb-4"
            style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>БиоХакинг</h1>
          <p className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase mb-8"
            style={{ fontFamily: "'Cormorant', serif", color: "#c8923a", textShadow: "0 0 40px rgba(200,146,58,0.5)" }}> MedTech & Longevity</p>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed mb-12"
            style={{ fontFamily: "'Cormorant', serif", color: "#c8bca8", fontStyle: "italic" }}>
            Персонализированные стратегии восстановления,<br />
            где древние традиции встречаются с новейшими технологиями
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/strategy")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #c8923a, #e8b86d)", color: "#0f0c08", fontWeight: 700, letterSpacing: "0.12em", boxShadow: "0 0 40px rgba(200,146,58,0.3)" }}>
              ✦ Создать мою стратегию
              <Icon name="ArrowRight" size={16} />
            </button>
            <button onClick={() => document.getElementById("programs-section")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:opacity-80"
              style={{ border: "1px solid rgba(200,146,58,0.3)", color: "#c8923a", letterSpacing: "0.12em" }}>
              Смотреть программы <Icon name="ChevronDown" size={16} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(200,146,58,0.3)" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 px-6" style={{ background: "#13100c", borderTop: "1px solid rgba(200,146,58,0.08)", borderBottom: "1px solid rgba(200,146,58,0.08)" }}>
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-8">
          {HERO_STATS.map((s, i) => <AnimatedStat key={i} value={s.value} label={s.label} />)}
        </div>
      </section>

      {/* ── Четыре шага к себе настоящему ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "#8a7a65" }}>Путь трансформации</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
              Четыре шага к себе настоящему
            </h2>
            <p className="text-lg italic max-w-2xl mx-auto" style={{ color: "#c8bca8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Трансформация начинается не с тела. С встречи с собой. Каждый этап — шаг к этой встрече.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "I",
                icon: "🌊",
                title: "Очищение",
                color: "#6aaad0",
                border: "rgba(106,170,208,0.25)",
                desc: "Тело отпускает всё накопленное — шлаки, напряжение, усталость. Жар открывает, вода смывает, соль выводит. Вы становитесь легче — буквально и внутренне.",
                result: "Итог: тело без груза, кожа — как новая, дыхание — глубже"
              },
              {
                num: "II",
                icon: "🌿",
                title: "Исцеление",
                color: "#7aaa50",
                border: "rgba(122,170,80,0.25)",
                desc: "Клетки получают то, чего им давно не хватало. Травы, микроэлементы, профессиональные процедуры запускают регенерацию — там, где она нужна.",
                result: "Итог: воспаление уходит, боли стихают, тело начинает восстанавливаться изнутри"
              },
              {
                num: "III",
                icon: "✨",
                title: "Обновление",
                color: "#c8923a",
                border: "rgba(200,146,58,0.25)",
                desc: "Новые клетки, новый облик, новое ощущение себя. Технологии и ритуалы работают как единая система — видимый результат с первого дня.",
                result: "Итог: сияние кожи, лёгкость в теле, ощущение, что вам на 10 лет меньше"
              },
              {
                num: "IV",
                icon: "🔥",
                title: "Наполнение",
                color: "#e8b86d",
                border: "rgba(232,184,109,0.25)",
                desc: "Пространство после трансформации наполняется смыслами. Энергия возвращается, ясность — тоже. Вы выходите отдохнувшим, заряженным и готовым жить по-новому.",
                result: "Итог: ресурс восстановлен, жизненная сила — на пике, вы знаете, зачем вернётесь"
              },
            ].map((step, i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col"
                style={{ background: "#16120e", border: `1px solid ${step.border}`, boxShadow: `0 0 30px ${step.border.replace("0.25", "0.06")}` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" style={{ filter: `drop-shadow(0 0 10px ${step.color}60)` }}>{step.icon}</span>
                  <span className="text-xs font-light px-2.5 py-1 rounded-full"
                    style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30`, fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
                    {step.num}
                  </span>
                </div>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: step.color, fontSize: "1.4rem" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#c8bca8", opacity: 0.8 }}>{step.desc}</p>
                <div className="pt-3 mt-auto" style={{ borderTop: `1px solid ${step.border}` }}>
                  <p className="text-xs leading-relaxed italic" style={{ color: step.color, opacity: 0.75 }}>{step.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section id="programs-section" className="py-20 px-6" style={{ background: "#0d0a07" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: "30px", height: "1px", background: "#c8923a" }} />
              <span style={{ color: "#c8923a", fontSize: "1.2rem" }}>◆</span>
              <div style={{ width: "30px", height: "1px", background: "#c8923a" }} />
            </div>
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "#8a7a65" }}>Все направления</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>Программы</h2>
          </div>

          {/* БиоХакинг — флагман, на всю ширину */}
          <BioHackCard />

          {/* Разделитель */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.25))" }} />
            <span className="text-xs uppercase tracking-[0.4em] px-4" style={{ color: "#8a7a65" }}>Другие направления</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(200,146,58,0.25), transparent)" }} />
          </div>

          {/* Остальные — двухколоночная сетка с разделителем */}
          <div className="relative grid md:grid-cols-2 gap-8">
            {/* vertical divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 pointer-events-none"
              style={{ width: "1px", background: "linear-gradient(to bottom, transparent 0%, rgba(200,146,58,0.2) 15%, rgba(200,146,58,0.35) 50%, rgba(200,146,58,0.2) 85%, transparent 100%)" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: "#0d0a07", border: "1px solid rgba(200,146,58,0.35)", color: "#c8923a", fontSize: "0.75rem" }}>
                ◆
              </div>
            </div>
            {programs.map((prog, i) => <ProgramCard key={prog.id} prog={prog} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Dog Nursery ── */}
      <DogNursery />

      {/* ── Biohacking Stages ── */}
      <BiohackingStages />



      {/* ── Privacy block ── */}
      <section className="py-20 px-6" style={{ background: "#13100c" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "#8a7a65" }}>Конфиденциальность</p>
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>Полная приватность</h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-8 italic"
              style={{ color: "#c8bca8", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Пройденный курс процедур уникален и подобран персонально под каждого гостя. Мы знаем о ваших результатах — как знаете и вы. Остальное сохраним в секрете.</p>
            <p className="text-base" style={{ fontFamily: "'Cormorant', serif", color: "#c8923a", fontStyle: "italic" }}>Лес хранит тайны</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: "🌲", title: "Персональный протокол", text: "Каждая программа составляется индивидуально — с учётом вашего состояния, целей и особенностей организма." },
              { icon: "🔒", title: "Тайна вашего пути", text: "Никакой огласки. Ваши данные, ваши результаты и ваш прогресс — между вами и центром." },
              { icon: "✦", title: "Только ваши результаты", text: "Мы не публикуем отзывы и фотографии. Ваша трансформация принадлежит только вам." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 text-center" style={{ background: "#16120e", border: "1px solid rgba(200,146,58,0.1)" }}>
                <span className="block text-4xl mb-3">{item.icon}</span>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8a7a65" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(200,146,58,0.06) 0%, transparent 65%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <span className="block text-5xl mb-6" style={{ color: "#c8923a" }}>◇</span>
          <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
            Пар зовёт.<br /><em style={{ color: "#c8923a" }}>Тело помнит путь.</em>
          </h2>
          <p className="text-lg mb-10 leading-relaxed" style={{ color: "#c8bca8", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>Огонь и лёд уже ждут встречи с вами —
позвольте алхимии стихий сделать своё дело.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate("/strategy")}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #c8923a, #e8b86d)", color: "#0f0c08", fontWeight: 700, letterSpacing: "0.12em", boxShadow: "0 0 60px rgba(200,146,58,0.25)" }}>
              ✦ Составить стратегию
            </button>
            <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.03]"
              style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none", fontWeight: 600 }}>
              <MaxIcon /> Написать Иней &amp; Магма corp.
            </a>
          </div>
          <p className="mt-4 text-xs" style={{ color: "#8a7a65" }}>Магма встречает иней · Ваш ритуал начинается</p>
        </div>
      </section>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <button onClick={() => navigate("/")} className="text-xs hover:opacity-60 transition-opacity"
          style={{ color: "rgba(200,146,58,0.4)", fontFamily: "'Cormorant', serif" }}>
          Иней & Магма corp. · Мария · Пармастер
        </button>
      </footer>

      <style>{`
        @keyframes regen-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes dogFloat {
          0%   { opacity: 0;    transform: translateY(0px) scale(0.8); }
          20%  { opacity: 0.14; }
          50%  { opacity: 0.2;  transform: translateY(-14px) scale(1); }
          80%  { opacity: 0.1; }
          100% { opacity: 0;    transform: translateY(0px) scale(0.8); }
        }
        @keyframes pulse-item {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}