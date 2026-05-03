import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import TerritoryWalk, { DaySchedule } from "@/components/TerritoryWalk";

// ─── Data ─────────────────────────────────────────────────────────────────────

const programBlocks = [
  {
    icon: "🌊",
    title: "Очищение",
    desc: "Мягкий, но глубокий перезапуск всех систем. Выведение накопленного, освобождение пространства внутри.",
  },
  {
    icon: "🌿",
    title: "Исцеление",
    desc: "Восстановление того, что устало или болело. Клетки помнят путь к здоровью — мы помогаем им вспомнить.",
  },
  {
    icon: "✦",
    title: "Обновление",
    desc: "Тело и ум возвращают молодость, упругость, ясность. Это не маска — это настоящее изменение изнутри.",
  },
  {
    icon: "🔥",
    title: "Наполнение",
    desc: "Энергия, которой давно не было. Радость от тела. Желание жить полно — каждый день, а не в отпуске.",
  },
];

const variants = [
  {
    id: "fasting",
    icon: "💧",
    color: "#6aaad0",
    colorDim: "rgba(106,170,208,0.12)",
    border: "rgba(106,170,208,0.25)",
    title: "Программа с выходом на голодание",
    subtitle: "Путь инея — чистота и ясность",
    tag: "Глубокое очищение",
    desc: "Ступенчатый переход к терапевтическому голоданию под медицинским наблюдением. Детоксикация на клеточном уровне, запуск аутофагии, очищение кишечника, перезагрузка иммунитета. Выход — плавный, с поддержкой нутрициолога.",
    highlights: [
      "Ступенчатая подготовка и сопровождение",
      "Запуск аутофагии — «уборка» на уровне клеток",
      "Отвары, травяные чаи, минеральная вода",
      "Плавный выход под контролем специалиста",
    ],
  },
  {
    id: "broths",
    icon: "🍵",
    color: "#d4922a",
    colorDim: "rgba(212,146,42,0.12)",
    border: "rgba(212,146,42,0.25)",
    title: "Программа с выходом на бульоны и отвары",
    subtitle: "Путь магмы — тепло и восстановление",
    tag: "Мягкое восстановление",
    desc: "Питательные костные бульоны, целебные отвары трав, фитонастои по сезону. Максимальная биодоступность нутриентов, восстановление слизистых, укрепление суставов и кожи. Идеально для тех, кто хочет восстановления без стресса для тела.",
    highlights: [
      "Костные бульоны и травяные отвары",
      "Персональный состав под ваши задачи",
      "Коллаген, минералы, противовоспалительные фитокомплексы",
      "Мягкий, тёплый путь к обновлению",
    ],
  },
];

const included = [
  { emoji: "🏊", label: "Плавание в природном бассейне" },
  { emoji: "🌲", label: "Прогулки по лесу (шинрин-йоку)" },
  { emoji: "🔥", label: "Баня с чаном и купелью" },
  { emoji: "🤲", label: "Аюрведические массажи с маслами" },
  { emoji: "🌿", label: "Травяные мешочки и обливания" },
  { emoji: "🚿", label: "Душ впечатлений (аудио + аромат + свет)" },
  { emoji: "💦", label: "SPA и бальнеотерапия" },
  { emoji: "💧", label: "Капельницы и нутрицевтики" },
  { emoji: "🧬", label: "Полная диагностика организма" },
  { emoji: "🥗", label: "Индивидуальный план питания" },
  { emoji: "😴", label: "Режим сна и циркадные ритмы" },
  { emoji: "🧘", label: "Медитации и дыхательные практики" },
  { emoji: "❄️", label: "Криотерапия и контрасты" },
  { emoji: "⚡", label: "LED и лазерные процедуры" },
  { emoji: "🫧", label: "Гипербарическая оксигенация" },
  { emoji: "🩸", label: "PRP и озонотерапия" },
  { emoji: "🦴", label: "Мануальная терапия и остеопатия" },
  { emoji: "🪨", label: "Стоун-терапия горячими камнями" },
  { emoji: "🦷", label: "Профессиональная чистка зубов" },
  { emoji: "🎨", label: "Творческие практики и ремёсла" },
  { emoji: "👨‍⚕️", label: "Консультации всех специалистов включены" },
];

const bioSections = [
  {
    title: "Криотерапия и термовоздействия",
    color: "#6aaad0",
    items: [
      { name: "Криованны / криосауны", desc: "До −150°C · воспаление уходит · иммунитет пробуждается · кожа подтягивается" },
      { name: "Чан + ледяная купель", desc: "Термоконтраст · активирует сосуды · мощный прилив энергии" },
      { name: "Баня на дровах", desc: "Берёзовый веник · пот уносит токсины · древнейший детокс" },
      { name: "Бальнеотерапия", desc: "Минеральные ванны · снятие отёков · восстановление кожного барьера" },
    ],
  },
  {
    title: "Аюрведа и древние практики тела",
    color: "#c8923a",
    items: [
      { name: "Абхьянга — масляный массаж", desc: "Тёплые масла + травы · снятие напряжения · вывод токсинов через кожу" },
      { name: "Широдхара — обливание головы", desc: "Тёплое масло на третий глаз · глубокий психофизический сброс" },
      { name: "Панчакарма — мешочки с травами", desc: "Горячие мешочки · суставы · нервная проводимость · питание тканей" },
      { name: "Удвартана — пилинг из трав", desc: "Сухой массаж · расщепление жира · упругость · вывод шлаков" },
    ],
  },
  {
    title: "Мануальная терапия и остеопатия",
    color: "#7aab9e",
    items: [
      { name: "Остеопатия", desc: "Работа с первопричиной · хронические боли · нервная система" },
      { name: "Мануальная терапия позвоночника", desc: "Коррекция позвонков · снятие компрессии · тело выпрямляется" },
      { name: "Краниосакральная терапия", desc: "Ритм спинномозговой жидкости · последствия травм и стресса" },
      { name: "Висцеральная остеопатия", desc: "Внутренние органы · пищеварение · гормональный фон" },
    ],
  },
  {
    title: "Световые и лазерные технологии",
    color: "#e8b86d",
    items: [
      { name: "LED красный свет (630–660 нм)", desc: "Коллаген · эластин · кожа молодеет · тон выравнивается" },
      { name: "Инфракрасный свет (810–850 нм)", desc: "Воспаление · мышцы · суставы · без таблеток" },
      { name: "ВЛОК — лазер в кровь", desc: "Текучесть крови · молекулярная регенерация" },
    ],
  },
  {
    title: "Стоун-терапия и минеральные практики",
    color: "#9b8a7a",
    items: [
      { name: "Базальт — горячие камни", desc: "Мышечные зажимы · лимфоток · тепловая энергия" },
      { name: "Криостоун — холодный мрамор", desc: "Отёчность · тонус · контрастный эффект" },
      { name: "Нефритовые роллеры (шиацу)", desc: "Баланс энергии · нервная система · тон кожи" },
    ],
  },
  {
    title: "Оксигенация и восстановление крови",
    color: "#7aab9e",
    items: [
      { name: "Гипербарика (ГБО)", desc: "Кислород под давлением · заживление · когнитивный подъём" },
      { name: "Озонотерапия", desc: "Иммунитет · микроциркуляция · прилив сил после первой процедуры" },
      { name: "PRP-терапия", desc: "Факторы роста из вашей крови · запуск регенерации" },
      { name: "Капельницы NAD+ / глутатион / витамин C", desc: "Мгновенное восстановление · биохимический перезапуск" },
    ],
  },
  {
    title: "Стоматология и полость рта",
    color: "#c87a9b",
    items: [
      { name: "Ультразвуковая чистка зубов", desc: "Камень · налёт · здоровье дёсен" },
      { name: "Отбеливание и реминерализация", desc: "Белее + крепче. Кальций и фтор в эмаль" },
      { name: "Снятие бруксизма", desc: "Стресс в зубах · нейромышечная коррекция · головные боли уходят" },
    ],
  },
  {
    title: "Физическая активность",
    color: "#d4622a",
    items: [
      { name: "Хот-йога · пилатес", desc: "Гибкость · баланс · покой в голове" },
      { name: "Бег по лесу · скандинавская ходьба", desc: "Фитонциды · нервная система · мозг" },
      { name: "Велопрогулки · плавание", desc: "Кардио · суставы · свежий воздух" },
    ],
  },
  {
    title: "Питание и нутрицевтики",
    color: "#9b7fb5",
    items: [
      { name: "Персонализированный протокол", desc: "По анализам: кето · голодание · FODMAP · палео" },
      { name: "Коллаген · пробиотики · адаптогены", desc: "Суставы · кожа · микробиом · стрессоустойчивость" },
      { name: "Митохондриальная поддержка", desc: "Q10 · PQQ · альфа-липоевая кислота · энергия без кофе" },
    ],
  },
  {
    title: "Anti-age · пептиды · натуропатия",
    color: "#c8923a",
    items: [
      { name: "Anti-age медицина", desc: "NAD+ · сенолитики · биологический возраст клетки" },
      { name: "Пептидные протоколы", desc: "Тимоген · эпиталон · иммунитет · сон · кожа" },
      { name: "Натуропатия и биопитание", desc: "Адаптогены · дикоросы · нутригеномика · пища как лекарство" },
    ],
  },
  {
    title: "Психоэмоциональное восстановление",
    color: "#a078c8",
    items: [
      { name: "Медитация и звуковые ванны 432 Гц", desc: "Кортизол снижается · нейронные паттерны перестраиваются" },
      { name: "Пранаяма · метод Вима Хофа", desc: "Вегетативная нервная система · стресс управляем" },
      { name: "Цифровой детокс", desc: "Без экранов · сон за 7 дней · мозг перезапускается" },
    ],
  },
  {
    title: "Специалисты — все включены",
    color: "#6aaa70",
    items: [
      { name: "Врач-остеопат", desc: "Первопричина хронических болей" },
      { name: "Нутрициолог", desc: "Протокол питания · дефициты · нутрицевтики" },
      { name: "Психолог и коуч", desc: "Эмоциональные причины симптомов · новые привычки" },
      { name: "Косметолог + аюрведа", desc: "Тип кожи · доша · персональный подбор процедур" },
    ],
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Program Table ────────────────────────────────────────────────────────────

const DURATIONS = [3, 7, 14, 21, 28] as const;
type Dur = typeof DURATIONS[number];

const fastingProgram: Record<Dur, {
  procedures: string[];
  sessions: { label: string; count: number }[];
  price: number;
  priceEarly: number;
}> = {
  3: {
    procedures: ["Первичная диагностика организма", "Ступенчатый вход в очищение", "Травяные отвары и детокс-напитки", "Банный ритуал с веником", "Вечерняя медитация"],
    sessions: [
      { label: "Консультации врача", count: 2 },
      { label: "Банных ритуалов", count: 3 },
      { label: "Детокс-процедур", count: 4 },
      { label: "Медитаций", count: 3 },
    ],
    price: 148000,
    priceEarly: 118000,
  },
  7: {
    procedures: ["Диагностика и составление протокола", "Ступенчатый переход к голоданию", "Травяные отвары, минеральная вода", "Капельницы с электролитами", "Ежедневная баня с травами", "Звуковые медитации", "Лесные прогулки шинрин-йоку", "Аюрведический массаж"],
    sessions: [
      { label: "Консультации врача", count: 5 },
      { label: "Банных ритуалов", count: 7 },
      { label: "Детокс-процедур", count: 9 },
      { label: "Массажей", count: 3 },
      { label: "Медитаций", count: 7 },
    ],
    price: 320000,
    priceEarly: 258000,
  },
  14: {
    procedures: ["Полный медицинский чекап", "Двухнедельный протокол голодания", "LED-терапия и гипербарика", "Капельницы с витаминами и аминокислотами", "Ежедневная баня, чан и купель", "Аюрведический и стоун-массаж", "Звуковые ванны и пранаяма", "Лесные медитации на рассвете", "Остеопатия", "Консультации нутрициолога"],
    sessions: [
      { label: "Консультации врача", count: 10 },
      { label: "Банных ритуалов", count: 14 },
      { label: "Детокс-процедур", count: 18 },
      { label: "Массажей", count: 7 },
      { label: "Медитаций", count: 14 },
      { label: "LED / гипербарика", count: 6 },
    ],
    price: 590000,
    priceEarly: 472000,
  },
  21: {
    procedures: ["Глубокая диагностика (МРТ, анализы, ДНК)", "Трёхнедельный голодательный протокол", "PRP-терапия и ВЛОК", "Гипербарическая оксигенация", "Криотерапия", "Ежедневная баня и чан", "Аюрведа, массаж, остеопатия", "Звуковые ванны и дыхательные сессии", "Индивидуальный нутрициолог", "Психолог / коуч сессии", "Выход на поддерживающее питание"],
    sessions: [
      { label: "Консультации врача", count: 16 },
      { label: "Банных ритуалов", count: 21 },
      { label: "Детокс-процедур", count: 28 },
      { label: "Массажей / остеопатии", count: 12 },
      { label: "Медитаций", count: 21 },
      { label: "Аппаратных процедур", count: 12 },
    ],
    price: 890000,
    priceEarly: 712000,
  },
  28: {
    procedures: ["Полный геномный анализ", "28-дневный трансформационный протокол", "PRP, ВЛОК, озонотерапия", "Серия криопроцедур", "Гипербарика — полный курс", "Ежедневная баня, чан, купель", "Аюрведа и тибетская медицина", "Звуковые ванны, дыхание, медитации", "Индивидуальный ассистент", "Персональный шеф-повар на выходе", "Психолог и лайф-коуч"],
    sessions: [
      { label: "Консультации врача", count: 22 },
      { label: "Банных ритуалов", count: 28 },
      { label: "Детокс-процедур", count: 38 },
      { label: "Массажей / остеопатии", count: 18 },
      { label: "Медитаций", count: 28 },
      { label: "Аппаратных процедур", count: 20 },
      { label: "Коуч-сессий", count: 8 },
    ],
    price: 1250000,
    priceEarly: 980000,
  },
};

const brothsProgram: Record<Dur, {
  procedures: string[];
  sessions: { label: string; count: number }[];
  price: number;
  priceEarly: number;
}> = {
  3: {
    procedures: ["Диагностика и протокол питания", "Костные бульоны и целебные супы", "Банный ритуал с мёдом", "Вечерние чайные церемонии", "Медитация и телесная практика"],
    sessions: [
      { label: "Консультации нутрициолога", count: 2 },
      { label: "Банных ритуалов", count: 3 },
      { label: "Питательных процедур", count: 4 },
      { label: "Практик", count: 3 },
    ],
    price: 138000,
    priceEarly: 108000,
  },
  7: {
    procedures: ["Протокол восстановительного питания", "Костные бульоны, ферменты, суперфуды", "Банные ритуалы с ароматерапией", "Фитотерапия и травяные обёртывания", "Аюрведический массаж", "Звуковые медитации", "Лесные прогулки"],
    sessions: [
      { label: "Консультации нутрициолога", count: 4 },
      { label: "Банных ритуалов", count: 7 },
      { label: "Процедур питания", count: 7 },
      { label: "Массажей", count: 4 },
      { label: "Медитаций", count: 7 },
    ],
    price: 298000,
    priceEarly: 238000,
  },
  14: {
    procedures: ["Полный нутригенетический анализ", "14-дневный протокол бульонов и суперфудов", "Капельницы витамины + аминокислоты", "LED-фотобиомодуляция", "Ежедневная баня с чаном", "Массаж, рефлексология, стоун-терапия", "Фитобарель и обёртывания", "Звуковые ванны, медитации"],
    sessions: [
      { label: "Консультации нутрициолога", count: 8 },
      { label: "Банных ритуалов", count: 14 },
      { label: "Процедур питания и капельниц", count: 16 },
      { label: "Массажей", count: 8 },
      { label: "Медитаций", count: 14 },
      { label: "LED / фотобиомодуляция", count: 5 },
    ],
    price: 545000,
    priceEarly: 436000,
  },
  21: {
    procedures: ["Расширенный метаболический анализ", "21-дневный протокол: бульоны, суперфуды, ферменты", "Озонотерапия и ВЛОК", "Капельницы и аминокислоты", "Фитобарель и обёртывания", "Ежедневная баня и чан", "Аюрведа и тибетские практики", "Психосоматическая работа", "Коуч по питанию"],
    sessions: [
      { label: "Консультации нутрициолога", count: 14 },
      { label: "Банных ритуалов", count: 21 },
      { label: "Процедур питания", count: 26 },
      { label: "Массажей", count: 12 },
      { label: "Медитаций", count: 21 },
      { label: "Аппаратных процедур", count: 10 },
    ],
    price: 820000,
    priceEarly: 656000,
  },
  28: {
    procedures: ["Полный анализ микробиома", "28-дневная трансформация через питание", "PRP, ВЛОК, озонотерапия", "Персональный шеф-повар на протоколе", "Ежедневная баня, чан, купель", "Аюрведа, остеопатия, рефлексология", "Звуковые ванны, дыхание, йога", "Психолог и нутри-коуч", "Финальный чекап и план на год"],
    sessions: [
      { label: "Консультации нутрициолога", count: 20 },
      { label: "Банных ритуалов", count: 28 },
      { label: "Процедур питания", count: 36 },
      { label: "Массажей / остеопатии", count: 18 },
      { label: "Медитаций", count: 28 },
      { label: "Аппаратных процедур", count: 16 },
      { label: "Коуч-сессий", count: 6 },
    ],
    price: 1150000,
    priceEarly: 895000,
  },
};

function fmt(n: number) {
  return n.toLocaleString("ru-RU") + " ₽";
}

function ProgramTable() {
  const [dur, setDur] = useState<Dur>(7);
  const fData = fastingProgram[dur];
  const bData = brothsProgram[dur];

  return (
    <section className="py-20 px-4 md:px-6" style={{ background: "rgba(6,4,18,0.95)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Заголовок */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "rgba(120,100,200,0.6)" }}>Интенсивность и продолжительность</p>
          <h2 className="text-4xl md:text-5xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.92)" }}>
            Программы
          </h2>
          <p className="text-2xl md:text-3xl font-light italic" style={{ fontFamily: "'Cormorant', serif", color: "rgba(180,140,80,0.85)" }}>
            выберите продолжительность
          </p>
        </div>

        {/* Переключатель дней */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <span className="text-xs uppercase tracking-widest mr-2" style={{ color: "rgba(160,140,220,0.5)" }}>Дней:</span>
          {DURATIONS.map(d => (
            <button key={d} onClick={() => setDur(d)}
              className="w-12 h-12 rounded-xl text-sm font-light transition-all"
              style={{
                background: d === dur ? "rgba(140,100,220,0.25)" : "rgba(255,255,255,0.04)",
                border: d === dur ? "1.5px solid rgba(140,100,220,0.6)" : "1px solid rgba(255,255,255,0.08)",
                color: d === dur ? "rgba(200,180,255,0.95)" : "rgba(180,160,240,0.4)",
                fontFamily: "'Cormorant', serif",
                fontSize: "1.1rem",
                boxShadow: d === dur ? "0 0 20px rgba(140,100,220,0.2)" : "none",
              }}>
              {d}
            </button>
          ))}
        </div>

        {/* Шапка таблицы с фото */}
        <div className="grid grid-cols-[220px_1fr_1fr] gap-4 mb-2">
          <div />
          {[
            { title: "Голодание", sub: "Путь инея — чистота", color: "#6aaad0", img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/842a7db6-76ad-4809-81dd-d0ac718fa38e.jpg" },
            { title: "Бульоны", sub: "Путь магмы — тепло", color: "#d4922a", img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/30274289-3cc5-4bf8-aa74-9feee968b857.jpg" },
          ].map(col => (
            <div key={col.title} className="rounded-2xl overflow-hidden relative" style={{ height: "120px" }}>
              <img src={col.img} alt={col.title} className="w-full h-full object-cover" style={{ opacity: 0.75 }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(6,4,18,0.6) 0%, rgba(6,4,18,0.2) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-lg font-light" style={{ fontFamily: "'Cormorant', serif", color: "#fff" }}>{col.title}</p>
                <p className="text-xs italic" style={{ color: col.color }}>{col.sub}</p>
              </div>
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs"
                style={{ background: `${col.color}20`, border: `1px solid ${col.color}60`, color: col.color }}>
                {dur} дней
              </div>
            </div>
          ))}
        </div>

        {/* Процедуры */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(140,100,220,0.12)" }}>

          {/* Строка: что входит каждый день */}
          <div className="grid grid-cols-[220px_1fr_1fr]" style={{ borderBottom: "1px solid rgba(140,100,220,0.08)" }}>
            <div className="px-5 py-4" style={{ background: "rgba(255,255,255,0.02)" }}>
              <p className="text-xs uppercase tracking-widest" style={{ color: "rgba(160,140,220,0.5)" }}>Процедуры</p>
            </div>
            {[fData, bData].map((data, ci) => (
              <div key={ci} className="px-5 py-4" style={{ background: ci === 0 ? "rgba(106,170,208,0.04)" : "rgba(212,146,42,0.04)" }}>
                <ul className="space-y-1.5">
                  {data.procedures.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-xs" style={{ color: "rgba(200,190,230,0.7)" }}>
                      <span style={{ color: ci === 0 ? "#6aaad0" : "#d4922a", fontSize: "0.5rem", marginTop: "4px", flexShrink: 0 }}>◆</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Строки сессий */}
          {(() => {
            const allLabels = Array.from(new Set([
              ...fData.sessions.map(s => s.label),
              ...bData.sessions.map(s => s.label),
            ]));
            return allLabels.map((label, ri) => (
              <div key={label} className="grid grid-cols-[220px_1fr_1fr]"
                style={{ borderBottom: "1px solid rgba(140,100,220,0.06)", background: ri % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                <div className="px-5 py-3.5 flex items-center" style={{ background: "rgba(255,255,255,0.02)" }}>
                  <p className="text-xs leading-snug" style={{ color: "rgba(180,160,240,0.65)" }}>{label}</p>
                </div>
                {[fData, bData].map((data, ci) => {
                  const s = data.sessions.find(x => x.label === label);
                  return (
                    <div key={ci} className="px-5 py-3.5 flex items-center justify-center"
                      style={{ background: ci === 0 ? "rgba(106,170,208,0.03)" : "rgba(212,146,42,0.03)" }}>
                      {s ? (
                        <span className="text-xl font-light" style={{
                          fontFamily: "'Cormorant', serif",
                          color: ci === 0 ? "rgba(106,170,208,0.9)" : "rgba(212,146,42,0.9)",
                        }}>{s.count}</span>
                      ) : (
                        <span style={{ color: "rgba(180,160,240,0.2)", fontSize: "1.2rem" }}>—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ));
          })()}

          {/* Строка цен */}
          <div className="grid grid-cols-[220px_1fr_1fr]" style={{ borderTop: "1px solid rgba(140,100,220,0.15)" }}>
            <div className="px-5 py-6 flex items-center" style={{ background: "rgba(255,255,255,0.02)" }}>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(160,140,220,0.5)" }}>Стоимость</p>
                <p className="text-xs leading-snug" style={{ color: "rgba(160,140,220,0.35)" }}>при предбронировании</p>
              </div>
            </div>
            {[
              { data: fData, color: "#6aaad0", dimColor: "rgba(106,170,208,0.08)", borderColor: "rgba(106,170,208,0.2)" },
              { data: bData, color: "#d4922a", dimColor: "rgba(212,146,42,0.08)", borderColor: "rgba(212,146,42,0.2)" },
            ].map(({ data, color, dimColor, borderColor }, ci) => (
              <div key={ci} className="px-5 py-6" style={{ background: dimColor }}>
                <p className="text-xs line-through mb-1" style={{ color: "rgba(180,160,240,0.3)" }}>{fmt(data.price)}</p>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <p className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color }}>
                    {fmt(data.priceEarly)}
                  </p>
                  <span className="text-xs px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ background: `${color}15`, border: `1px solid ${borderColor}`, color }}>
                    −{Math.round((1 - data.priceEarly / data.price) * 100)}%
                  </span>
                </div>
                <p className="text-xs mt-1.5 italic" style={{ color: "rgba(180,160,240,0.4)" }}>
                  при предбронировании от 14 дней
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-widest font-semibold transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, rgba(106,170,208,0.25), rgba(106,170,208,0.12))", border: "1px solid rgba(106,170,208,0.35)", color: "#6aaad0", textDecoration: "none", letterSpacing: "0.1em" }}>
            💧 Забронировать место
          </a>
          <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-widest font-semibold transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, rgba(212,146,42,0.25), rgba(212,146,42,0.12))", border: "1px solid rgba(212,146,42,0.35)", color: "#d4922a", textDecoration: "none", letterSpacing: "0.1em" }}>
            🍵 Получить консультацию
          </a>
        </div>

        <p className="text-center text-xs mt-6 italic" style={{ color: "rgba(160,140,220,0.35)" }}>
          * Скидка при предбронировании действует до заполнения квоты на сезон. Стоимость указана за 1 человека, включает проживание и питание по протоколу.
        </p>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Perspektiva() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#07050f", color: "#f0e6d0" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(7,5,15,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(120,100,200,0.15)" }}>
        <button onClick={() => navigate("/tradition")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "rgba(160,140,220,0.8)" }}>
          <Icon name="ArrowLeft" size={18} />
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>Традиция</span>
        </button>
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "rgba(120,100,200,0.5)" }}>Перспектива</p>
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(120,100,200,0.15)", color: "rgba(160,140,220,0.8)", border: "1px solid rgba(120,100,200,0.3)" }}>
          В разработке
        </span>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        {/* bg particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(100,80,200,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(60,120,180,0.08) 0%, transparent 55%)" }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: `${100 + i * 90}px`, height: `${100 + i * 90}px`,
                border: `1px solid rgba(120,100,200,${0.06 - i * 0.01})`,
                top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                animation: `regen-spin ${18 + i * 7}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }} />
          ))}
        </div>

        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease, transform 1s ease" }}>
          {/* Dev badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(120,100,200,0.15)", border: "1px solid rgba(120,100,200,0.35)", color: "rgba(180,160,240,0.9)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "rgba(160,140,220,0.8)" }} />
            <span className="text-xs uppercase tracking-[0.4em]">Проект на стадии разработки</span>
          </div>

          <p className="text-xs uppercase tracking-[0.6em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Иней & Магма corp.</p>

          <h1 className="text-6xl md:text-9xl font-light leading-none mb-3"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.95)", textShadow: "0 0 60px rgba(120,100,200,0.4)" }}>
            Перспектива
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(140,120,220,0.7)" }}>
            new
          </p>

          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-4"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.8)", fontStyle: "italic" }}>
            Два углублённых варианта программ — от и до.<br />
            С проживанием на территории целительского центра<br />
            <strong style={{ fontStyle: "normal", color: "rgba(200,180,255,0.95)" }}>Иней & Магма corp.</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
            {["Очищение", "Исцеление", "Обновление", "Наполнение"].map((w, i) => (
              <span key={i} className="text-sm px-4 py-1.5 rounded-full"
                style={{ background: "rgba(120,100,200,0.1)", color: "rgba(180,160,240,0.8)", border: "1px solid rgba(120,100,200,0.2)", fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
                {w}
              </span>
            ))}
          </div>

          <button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, rgba(100,80,200,0.3), rgba(80,60,180,0.2))", border: "1px solid rgba(120,100,200,0.4)", color: "rgba(180,160,240,0.9)", letterSpacing: "0.12em" }}>
            Узнать о программе
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(120,100,200,0.3)" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ── Dev notice ── */}
      <section className="py-12 px-6" style={{ background: "rgba(15,10,30,0.8)", borderTop: "1px solid rgba(120,100,200,0.1)", borderBottom: "1px solid rgba(120,100,200,0.1)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
            Этот проект сейчас рождается
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1.1rem" }}>
            Мы собираем уникальную программу, которой ещё нет в России — погружение с проживанием, где каждый день расписан под ваш организм. Оставьте заявку первыми и получите специальные условия раннего бронирования.
          </p>
        </div>
      </section>

      {/* ── Четыре столпа ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Суть программы</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Четыре шага<br /><em style={{ color: "rgba(140,120,220,0.8)" }}>к себе настоящему</em>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {programBlocks.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1} className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.15)" }}>
                <span className="block text-4xl mb-4">{b.icon}</span>
                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,160,240,0.55)" }}>{b.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Два варианта ── */}
      <section id="programs" className="py-20 px-6" style={{ background: "rgba(10,7,25,0.9)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Выберите свой путь</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Два варианта программы
            </h2>
            <p className="mt-4 text-base italic" style={{ color: "rgba(180,160,240,0.5)", fontFamily: "'Cormorant', serif" }}>
              Оба ведут к одной цели — через разные пути
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {variants.map((v, i) => (
              <FadeIn key={v.id} delay={i * 0.15}>
                <div className="rounded-3xl overflow-hidden h-full"
                  style={{ background: v.colorDim, border: `1px solid ${v.border}`, boxShadow: `0 0 60px ${v.colorDim}` }}>
                  <div className="px-7 pt-7 pb-5" style={{ borderBottom: `1px solid ${v.border}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{v.icon}</span>
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{ background: `${v.colorDim}`, color: v.color, border: `1px solid ${v.border}` }}>
                        {v.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light mb-1"
                      style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.95)" }}>
                      {v.title}
                    </h3>
                    <p className="text-sm italic mb-4" style={{ color: "rgba(180,160,240,0.5)" }}>{v.subtitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(200,190,230,0.7)" }}>{v.desc}</p>
                  </div>
                  <div className="px-7 py-5">
                    <ul className="space-y-2.5">
                      {v.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(200,190,230,0.75)" }}>
                          <span style={{ color: v.color, fontSize: "0.6rem", marginTop: "5px", flexShrink: 0 }}>◆</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Таблица программ ── */}
      <ProgramTable />

      {/* ── Что включено ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>от древних ритуалов до чит-кодов биохакинга</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Всё включено
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {included.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="rounded-2xl p-4 text-center"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.12)" }}>
                  <span className="block text-2xl mb-2">{item.emoji}</span>
                  <p className="text-xs leading-snug" style={{ color: "rgba(180,160,240,0.65)", fontFamily: "'Cormorant', serif", fontSize: "0.9rem" }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Специалисты центра ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Команда профессионалов</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Специалисты центра
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { icon: "🌿", title: "Пармастер", desc: "Авторские банные ритуалы, работа с веником и паром" },
              { icon: "🧖", title: "Косметолог-эстетист", desc: "Аппаратная косметология, уходы, маски, процедуры для кожи" },
              { icon: "🤲", title: "Массажист", desc: "Классический, релаксирующий, лимфодренажный массаж" },
              { icon: "✨", title: "СПА-специалист", desc: "Обёртывания, скрабы, ароматерапия, body-уходы" },
              { icon: "🩺", title: "Врач общей практики", desc: "Диагностика, контроль состояния, протоколы восстановления" },
              { icon: "💉", title: "Инъекционист", desc: "PRP, мезотерапия, NCTF, ВЛОК, биоревитализация" },
              { icon: "🦷", title: "Стоматолог", desc: "Чистка, отбеливание, профилактика в формате SPA" },
              { icon: "🧬", title: "Нутрициолог", desc: "Персональное питание, детокс-протоколы, анализ микробиома" },
              { icon: "🧠", title: "Психолог / коуч", desc: "Работа с телесными блоками, стрессом и ментальным восстановлением" },
              { icon: "⚡", title: "Физиотерапевт", desc: "Аппаратные процедуры: BTL, ударные волны, LED, криотерапия" },
              { icon: "🦴", title: "Остеопат", desc: "Коррекция осанки, работа с зажимами и суставами" },
              { icon: "🌸", title: "Аюрведический терапевт", desc: "Традиционные техники, абхьянга, широабхьянга" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="rounded-2xl p-5 h-full"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.12)" }}>
                  <span className="block text-3xl mb-3">{s.icon}</span>
                  <h4 className="text-base font-light mb-1.5" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)", fontSize: "1.05rem" }}>{s.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(180,160,240,0.5)" }}>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Полная научная база ── */}
      <section className="py-20 px-6" style={{ background: "rgba(10,7,25,0.9)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Что за этим стоит</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Научная основа программы
            </h2>
            <p className="text-base italic" style={{ color: "rgba(180,160,240,0.5)", fontFamily: "'Cormorant', serif" }}>
              Каждый метод — доказанный инструмент регенерации
            </p>
          </FadeIn>

          <div className="space-y-4">
            {bioSections.map((sec, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl overflow-hidden"
                  style={{ border: `1px solid ${sec.color}22`, background: "rgba(255,255,255,0.015)" }}>
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-all hover:opacity-80"
                    onClick={() => setOpenSection(openSection === i ? null : i)}>
                    <span className="text-lg font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(210,195,255,0.9)" }}>
                      <span style={{ color: sec.color, marginRight: "10px", fontSize: "0.7rem" }}>◆</span>
                      {sec.title}
                    </span>
                    <span style={{ color: sec.color, transform: openSection === i ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.3s ease" }}>›</span>
                  </button>
                  {openSection === i && (
                    <div className="px-6 pb-5 space-y-4" style={{ borderTop: `1px solid ${sec.color}15` }}>
                      {sec.items.map((item, j) => (
                        <div key={j} className="pt-4">
                          <p className="text-base font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: sec.color }}>{item.name}</p>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(180,165,220,0.65)" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Творческие курсы ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.15)" }}>
              <span className="block text-4xl mb-4">🎨</span>
              <h3 className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
                Творческие практики
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif" }}>
                Дополнительно — авторские курсы по работе с глиной, живописи, работе с образами. Творчество включает правое полушарие, снимает ментальные блоки и становится ещё одним языком исцеления.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Day Schedule ── */}
      <DaySchedule />

      {/* ── Territory Walk ── */}
      <TerritoryWalk />

      {/* ── Интерактивные часы ── */}
      <section className="py-20 px-6" style={{ background: "rgba(8,5,20,0.98)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Новаторский подход Иней & Магма</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.95)" }}>
              Интерактивные часы для гостей
            </h2>
            <p className="text-lg italic" style={{ color: "rgba(180,160,240,0.5)", fontFamily: "'Cormorant', serif" }}>
              Каждому гостю при заселении — компактное устройство, которое делает программу максимально комфортной
            </p>
          </FadeIn>

          {/* Анимированный центральный элемент */}
          <FadeIn className="flex justify-center mb-16">
            <div className="relative" style={{ width: "220px", height: "220px" }}>
              {/* Пульсирующие кольца */}
              <div className="absolute inset-0 rounded-full" style={{
                border: "1px solid rgba(120,100,200,0.2)",
                animation: "watch-ring1 3s ease-in-out infinite",
              }} />
              <div className="absolute" style={{
                inset: "-20px",
                borderRadius: "50%",
                border: "1px solid rgba(120,100,200,0.12)",
                animation: "watch-ring1 3s ease-in-out infinite 0.5s",
              }} />
              <div className="absolute" style={{
                inset: "-40px",
                borderRadius: "50%",
                border: "1px solid rgba(120,100,200,0.07)",
                animation: "watch-ring1 3s ease-in-out infinite 1s",
              }} />
              {/* Корпус часов */}
              <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center" style={{
                background: "linear-gradient(145deg, rgba(25,18,50,0.98), rgba(15,10,35,0.98))",
                border: "2px solid rgba(120,100,200,0.35)",
                boxShadow: "0 0 60px rgba(100,80,200,0.2), inset 0 0 30px rgba(100,80,200,0.05)",
              }}>
                <span style={{ fontSize: "2.5rem" }}>⌚</span>
                <p className="text-xs mt-2 tracking-[0.3em] uppercase" style={{ color: "rgba(140,120,220,0.7)" }}>Иней</p>
                <div className="flex gap-1 mt-2">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="w-0.5 rounded-full" style={{
                      height: `${8 + i * 3}px`,
                      background: "rgba(120,100,200,0.6)",
                      animation: `watch-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate`,
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* 4 функции */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: "🔔",
                title: "Напоминания о мероприятиях",
                color: "rgba(120,100,200,0.8)",
                colorDim: "rgba(120,100,200,0.08)",
                border: "rgba(120,100,200,0.18)",
                items: [
                  "Уведомление за 10–15 минут до начала — название, время, продолжительность",
                  "Повторное напоминание за 5 минут, если первое пропущено",
                  "Вибросигнал настраивается под ваш режим сна",
                ],
              },
              {
                icon: "🗺️",
                title: "Интерактивная карта территории",
                color: "rgba(106,170,208,0.8)",
                colorDim: "rgba(106,170,208,0.08)",
                border: "rgba(106,170,208,0.18)",
                items: [
                  "Детальная карта с отмеченными зонами: баня, бассейн, фитобар, медитативная поляна",
                  "При напоминании — автомаршрут от вашей точки до назначения",
                  "Подсказки на экране: «Поверните у фонтана», «Пройдите мимо бассейна»",
                ],
              },
              {
                icon: "🚨",
                title: "Кнопка экстренного вызова",
                color: "rgba(200,100,80,0.8)",
                colorDim: "rgba(200,100,80,0.08)",
                border: "rgba(200,100,80,0.18)",
                items: [
                  "Крупная тактильная кнопка на корпусе — невозможно не найти",
                  "Сигнал поступает дежурному куратору или медику мгновенно",
                  "Автоматическая передача координат + чат для текстового общения",
                ],
              },
              {
                icon: "📋",
                title: "Персонализированная программа",
                color: "rgba(122,184,112,0.8)",
                colorDim: "rgba(122,184,112,0.08)",
                border: "rgba(122,184,112,0.18)",
                items: [
                  "Индивидуальный график на день: активности, процедуры, свободное время",
                  "Просмотр программы на несколько дней вперёд",
                  "Изменения в расписании — обновляются автоматически в реальном времени",
                ],
              },
              {
                icon: "💓",
                title: "Считывание состояния организма",
                color: "rgba(212,98,42,0.8)",
                colorDim: "rgba(212,98,42,0.08)",
                border: "rgba(212,98,42,0.18)",
                items: [
                  "Мониторинг сна: фазы, глубина, пробуждения — рекомендации к утренним процедурам",
                  "Пройденные шаги и активность: персональная норма, динамика за период программы",
                  "Пульс и вариабельность ЧСС: оценка уровня стресса и готовности к нагрузке",
                  "Состав тела: жировая/мышечная масса, гидратация — синхронизация с данными диагностики",
                  "Уровень насыщения кислородом (SpO2) и температура тела",
                ],
              },
              {
                icon: "📊",
                title: "Динамика восстановления",
                color: "rgba(155,127,181,0.8)",
                colorDim: "rgba(155,127,181,0.08)",
                border: "rgba(155,127,181,0.18)",
                items: [
                  "Ежедневный отчёт врачу: все показатели биометрии в одном интерфейсе",
                  "Сравнение день 1 vs текущий день — видите динамику своего восстановления",
                  "Уведомление, когда показатели выходят за персональные нормы",
                ],
              },
            ].map((f, i) => (
              <FadeIn key={i} delay={i * 0.1}
                className="rounded-2xl p-6"
                style={{ background: f.colorDim, border: `1px solid ${f.border}` }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <h3 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: f.color }}>
                      {f.title}
                    </h3>
                    <ul className="space-y-2">
                      {f.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: "rgba(200,185,255,0.55)" }}>
                          <span style={{ color: f.color, opacity: 0.6, flexShrink: 0, marginTop: "2px" }}>·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-10">
            <p className="text-sm italic" style={{ color: "rgba(140,120,220,0.4)", fontFamily: "'Cormorant', serif" }}>
              Это не гаджет — это ваш проводник в мире центра Иней & Магма
            </p>
          </FadeIn>
        </div>

        <style>{`
          @keyframes watch-ring1 { 0%,100% { opacity:0.4; transform:scale(1); } 50% { opacity:1; transform:scale(1.03); } }
          @keyframes watch-bar { from { transform:scaleY(0.5); opacity:0.4; } to { transform:scaleY(1); opacity:0.9; } }
        `}</style>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(100,80,200,0.08) 0%, transparent 65%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <FadeIn>
            <span className="block text-5xl mb-6">✦</span>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.95)" }}>
              Хотите быть первыми?
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
              Программа открывается для ограниченного числа участников.<br />
              Оставьте заявку сейчас — и получите специальные условия первой волны.
            </p>
            <a href={`https://max.ru/+79186860650?text=${encodeURIComponent("Здравствуйте! Хочу узнать о программе Перспектива — с проживанием в центре Иней и Магма")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, rgba(100,80,200,0.5), rgba(80,60,180,0.4))", color: "rgba(200,185,255,0.95)", textDecoration: "none", fontWeight: 700, letterSpacing: "0.12em", border: "1px solid rgba(120,100,200,0.5)", boxShadow: "0 0 40px rgba(100,80,200,0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
              </svg>
              Хочу на программу
            </a>
            <p className="mt-4 text-xs" style={{ color: "rgba(120,100,200,0.5)" }}>Проживание · Питание · Все процедуры включены</p>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(120,100,200,0.08)" }}>
        <button onClick={() => navigate("/")} className="text-xs hover:opacity-60 transition-opacity"
          style={{ color: "rgba(120,100,200,0.4)", fontFamily: "'Cormorant', serif" }}>
          Иней & Магма corp. · Мария · Пармастер
        </button>
      </footer>

      <style>{`
        @keyframes regen-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}