import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "star",
    symbol: "✦",
    title: "Звезда",
    subtitle: "Надежда · Вдохновение · Восстановление",
    description: "Программа для тех, кто ищет свет после усталости. Мягкое погружение в природные ароматы и тишину.",
    procedures: [
      "Парение с маслами лаванды (30 мин)",
      "Контрастная купель",
      "Расслабляющий массаж (45 мин)",
      "Медитация под звуки поющих чаш (20 мин)",
      "Чайная церемония с ромашковым чаем",
    ],
    duration: "3 часа",
    price: "8 000 ₽",
    color: "#4a6741",
    bgColor: "#f0f5ef",
  },
  {
    id: "empress",
    symbol: "♛",
    title: "Императрица",
    subtitle: "Изобилие · Женственность · Гармония",
    description: "Роскошный ритуал для возвращения к себе. Розовые масла, морские водоросли и забота о каждой клетке.",
    procedures: [
      "Аромапарение с розовым маслом",
      "Обёртывание с морскими водорослями",
      "Массаж лица (30 мин)",
      "Травяной чай с мёдом и лепестками",
    ],
    duration: "2.5 часа",
    price: "6 500 ₽",
    color: "#b5714a",
    bgColor: "#faf2ec",
  },
  {
    id: "moon",
    symbol: "☽",
    title: "Луна",
    subtitle: "Интуиция · Тайна · Глубина",
    description: "Ночной ритуал для восстановления. Лунные ванны с минералами и работа с внутренним ритмом.",
    procedures: [
      "Соляная ванна с лунными кристаллами",
      "Скраб с морской солью и водорослями",
      "Массаж спины с тёплыми камнями",
      "Медитация с аромасвечами",
      "Успокаивающий травяной чай",
    ],
    duration: "2 часа",
    price: "5 500 ₽",
    color: "#6b7fa3",
    bgColor: "#f0f2f8",
  },
  {
    id: "sun",
    symbol: "☀",
    title: "Солнце",
    subtitle: "Радость · Витальность · Ясность",
    description: "Заряжающая программа с цитрусовыми ароматами. Пробуждение энергии и лёгкость на целый день.",
    procedures: [
      "Скраб с апельсином и имбирём",
      "Тонизирующий душ с эфирными маслами",
      "Экспресс-массаж (30 мин)",
      "Свежевыжатый сок и энергетический чай",
    ],
    duration: "1.5 часа",
    price: "4 200 ₽",
    color: "#c9942a",
    bgColor: "#fdf6e8",
  },
];

const masters = [
  {
    name: "Анна Светлова",
    role: "Мастер аромапарения",
    experience: "8 лет",
    specialty: "Ароматерапия, восстановительные программы",
    emoji: "🌿",
  },
  {
    name: "Марина Дольникова",
    role: "Массажист-терапевт",
    experience: "12 лет",
    specialty: "Стоун-терапия, лимфодренажный массаж",
    emoji: "🪨",
  },
  {
    name: "Елена Борисова",
    role: "Мастер обёртываний",
    experience: "6 лет",
    specialty: "Водорослевые обёртывания, уход за лицом",
    emoji: "🌸",
  },
];

const reviews = [
  {
    name: "Ирина К.",
    text: "Программа «Звезда» стала для меня настоящим перезапуском. После трёх часов почувствовала себя так, будто отдохнула неделю.",
    rating: 5,
    program: "Звезда",
  },
  {
    name: "Светлана М.",
    text: "Пришла уставшей после проекта — вышла другим человеком. Особенно понравилась медитация с поющими чашами. Буду возвращаться.",
    rating: 5,
    program: "Звезда",
  },
  {
    name: "Наталья В.",
    text: "«Императрица» — это именно то, что нужно перед важными событиями. Кожа светится, настроение на высоте. Рекомендую всем подругам!",
    rating: 5,
    program: "Императрица",
  },
  {
    name: "Ольга Д.",
    text: "Уютная атмосфера, профессиональные мастера и потрясающий выбор чаёв. Каждый визит — как путешествие в другой мир.",
    rating: 5,
    program: "Луна",
  },
];

const faqData = [
  { q: "Как записаться на программу?", a: "Заполните форму на сайте или позвоните нам. Мы подберём удобное время и подтвердим запись в течение часа." },
  { q: "Нужна ли предварительная запись?", a: "Да, мы работаем только по предварительной записи, чтобы обеспечить вам индивидуальный подход и уютную атмосферу." },
  { q: "Можно ли прийти с подругой?", a: "Конечно! У нас есть программы для двоих. Уточните при записи — мы всё организуем." },
  { q: "Есть ли противопоказания?", a: "При беременности, некоторых кожных заболеваниях и варикозе часть процедур может быть ограничена. Наши мастера проконсультируют вас индивидуально." },
  { q: "Что взять с собой?", a: "Только хорошее настроение! Все необходимые принадлежности (халаты, тапочки, полотенца) мы предоставляем." },
  { q: "Можно ли купить программу в подарок?", a: "Да! Мы оформляем подарочные сертификаты на любую программу. Красивая упаковка включена." },
  { q: "Сколько длится сеанс?", a: "Продолжительность зависит от программы: от 1.5 до 3 часов. Точное время указано в описании каждой карты." },
  { q: "Как лучше подготовиться?", a: "Рекомендуем не есть за 1.5 часа до визита и пить больше воды в день процедуры. Остальное — наша забота." },
];

const galleryItems = [
  { emoji: "🌿", label: "Зал восстановления", desc: "Тихое пространство с живыми растениями" },
  { emoji: "🕯️", label: "Ароматический зал", desc: "Свечи, эфирные масла, тепло" },
  { emoji: "🪨", label: "Стоун-кабинет", desc: "Горячие камни и тёплый свет" },
  { emoji: "🌸", label: "Зал обёртываний", desc: "Морские водоросли и минералы" },
  { emoji: "🍃", label: "Чайная комната", desc: "Авторские травяные купажи" },
  { emoji: "🌙", label: "Медитационный зал", desc: "Тишина и поющие чаши" },
];

// ─── Chatbot ─────────────────────────────────────────────────────────────────

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Добро пожаловать в Ботанику 🌿 Я отвечу на ваши вопросы о программах, записи и процедурах." },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getAnswer(q: string): string {
    const lower = q.toLowerCase();
    if (lower.includes("цен") || lower.includes("стоит") || lower.includes("сколько")) {
      return "Наши программы от 4 200 до 8 000 ₽. Самая популярная — «Звезда» за 8 000 ₽ (3 часа). Хотите узнать подробнее о конкретной?";
    }
    if (lower.includes("записат") || lower.includes("запись") || lower.includes("запишит")) {
      return "Для записи заполните форму на сайте или свяжитесь с нами по телефону. Мы подтвердим бронь в течение часа 🌸";
    }
    if (lower.includes("время") || lower.includes("долго") || lower.includes("длится") || lower.includes("час")) {
      return "Программы длятся от 1.5 до 3 часов. «Солнце» — 1.5 ч, «Луна» — 2 ч, «Императрица» — 2.5 ч, «Звезда» — 3 ч.";
    }
    if (lower.includes("подарок") || lower.includes("сертифик")) {
      return "Конечно! Мы оформляем красивые подарочные сертификаты на любую программу. Уточните в форме или по телефону 🎁";
    }
    if (lower.includes("взять") || lower.includes("принести") || lower.includes("готовит")) {
      return "Берите только хорошее настроение 😊 Халаты, тапочки и полотенца мы предоставляем.";
    }
    if (lower.includes("двоих") || lower.includes("вдвоём") || lower.includes("подруг")) {
      return "Да, у нас есть парные программы! Напишите при записи, и мы всё организуем для двоих 💚";
    }
    if (lower.includes("противопоказ") || lower.includes("беременн")) {
      return "При беременности и некоторых заболеваниях часть процедур ограничена. Наши мастера проконсультируют вас индивидуально при записи.";
    }
    if (lower.includes("программ") || lower.includes("услуг") || lower.includes("процедур")) {
      return "У нас 4 программы: Звезда (восстановление), Императрица (женственность), Луна (глубокое расслабление) и Солнце (энергия). Какая вас интересует?";
    }
    if (lower.includes("привет") || lower.includes("здравств")) {
      return "Привет! Рада вас видеть 🌿 Чем могу помочь?";
    }
    return "Отличный вопрос! Наши мастера подробно ответят при записи. Или позвоните нам — мы всегда рады помочь 🌿";
  }

  function send() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getAnswer(userMsg) }]);
    }, 600);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
        style={{ background: "var(--spa-green)", color: "var(--spa-cream)" }}
        aria-label="Чат-бот"
      >
        {open ? <Icon name="X" size={22} /> : <span className="animate-chat-bounce inline-block">🌿</span>}
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          style={{ background: "var(--spa-cream)", border: "1px solid #c5d5c0" }}
        >
          <div className="px-4 py-3 flex items-center gap-3" style={{ background: "var(--spa-green)" }}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">🌿</div>
            <div>
              <p className="text-sm font-medium text-white" style={{ fontFamily: "'Cormorant', serif" }}>Ботаника</p>
              <p className="text-xs text-white/70">Всегда на связи</p>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                  style={
                    m.from === "bot"
                      ? { background: "#e8f0e6", color: "var(--spa-dark)" }
                      : { background: "var(--spa-green)", color: "white" }
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 py-3 flex gap-2 border-t" style={{ borderColor: "#d5e0d0" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Напишите вопрос..."
              className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "#f0f5ef", color: "var(--spa-dark)", fontFamily: "'Golos Text', sans-serif" }}
            />
            <button
              onClick={send}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80"
              style={{ background: "var(--spa-green)", color: "white" }}
            >
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function ProgramModal({ program, onClose }: { program: (typeof programs)[0]; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(30,25,20,0.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8 animate-slide-up overflow-y-auto"
        style={{ background: "var(--spa-cream)", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
          style={{ background: "#d5cfc0" }}
        >
          <Icon name="X" size={16} />
        </button>

        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
          style={{ background: program.bgColor }}
        >
          {program.symbol}
        </div>

        <h2 className="text-4xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-dark)" }}>
          {program.title}
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--spa-stone)" }}>{program.subtitle}</p>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--spa-dark)" }}>{program.description}</p>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--spa-stone)" }}>Программа включает</p>
          <ul className="space-y-2">
            {program.procedures.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--spa-dark)" }}>
                <span style={{ color: "var(--spa-green)" }} className="mt-0.5">✦</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--spa-stone)" }}>Длительность</p>
            <p className="font-medium" style={{ color: "var(--spa-dark)" }}>{program.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--spa-stone)" }}>Стоимость</p>
            <p className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-terra)" }}>{program.price}</p>
          </div>
        </div>

        <button
          className="w-full py-3 rounded-2xl text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
          style={{ background: "var(--spa-green)", color: "var(--spa-cream)" }}
        >
          Записаться на программу
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeProgram, setActiveProgram] = useState<(typeof programs)[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const sections = ["о-салоне", "программы", "галерея", "мастера", "отзывы", "контакты"];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }

  return (
    <div style={{ background: "var(--spa-cream)", color: "var(--spa-dark)" }}>

      {/* ── Navigation ───────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(245,240,232,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,128,112,0.15)" }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="text-xl tracking-wider"
          style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-green)", fontWeight: 500 }}
        >
          Ботаника
        </button>

        <div className="hidden md:flex items-center gap-7">
          {["О салоне", "Программы", "Галерея", "Мастера", "Отзывы", "Контакты"].map((item, i) => (
            <button
              key={i}
              onClick={() => scrollTo(sections[i])}
              className="nav-link text-sm tracking-wide transition-colors hover:opacity-70"
              style={{ color: "var(--spa-dark)", fontFamily: "'Golos Text', sans-serif" }}
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("контакты")}
          className="hidden md:block px-5 py-2 rounded-full text-sm tracking-wide transition-all hover:opacity-90"
          style={{ background: "var(--spa-green)", color: "var(--spa-cream)" }}
        >
          Записаться
        </button>

        <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {navOpen && (
        <div
          className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 animate-fade-in"
          style={{ background: "var(--spa-cream)" }}
        >
          {["О салоне", "Программы", "Галерея", "Мастера", "Отзывы", "Контакты"].map((item, i) => (
            <button
              key={i}
              onClick={() => scrollTo(sections[i])}
              className="text-3xl font-light"
              style={{ fontFamily: "'Cormorant', serif" }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(160deg, #e8f0e4 0%, #f5f0e8 40%, #f2ece0 100%)" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-72 h-72 opacity-20 animate-float blob-1"
            style={{ background: "radial-gradient(circle, #7a9e76, transparent 70%)" }} />
          <div className="absolute top-1/4 -right-16 w-96 h-96 opacity-15 animate-float delay-300 blob-2"
            style={{ background: "radial-gradient(circle, #5c7a4e, transparent 70%)" }} />
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 opacity-10 animate-float delay-500 blob-3"
            style={{ background: "radial-gradient(circle, #b5714a, transparent 70%)" }} />
          <div className="absolute top-32 left-8 text-6xl opacity-10 animate-float delay-200">🌿</div>
          <div className="absolute bottom-40 right-10 text-5xl opacity-10 animate-float delay-400">🌸</div>
          <div className="absolute top-1/2 left-4 text-4xl opacity-10 animate-float delay-100">✦</div>
          <div className="absolute top-40 right-1/4 text-3xl opacity-10 animate-float delay-500">☽</div>
        </div>

        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] mb-6 animate-fade-up" style={{ color: "var(--spa-stone)" }}>
            Спа · Таро · Природа
          </p>
          <h1 className="text-6xl md:text-8xl font-light leading-none mb-6 animate-fade-up delay-100"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-dark)" }}>
            Ботаника
          </h1>
          <p className="text-lg md:text-xl font-light leading-relaxed animate-fade-up delay-200"
            style={{ color: "var(--spa-stone)", maxWidth: "480px", margin: "0 auto 3rem" }}>
            Авторские спа-программы, вдохновлённые архетипами таро. Восстановление через природные ритуалы.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-300">
            <button
              onClick={() => scrollTo("программы")}
              className="px-8 py-3.5 rounded-full text-sm tracking-wide transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "var(--spa-green)", color: "var(--spa-cream)" }}
            >
              Выбрать программу
            </button>
            <button
              onClick={() => scrollTo("о-салоне")}
              className="px-8 py-3.5 rounded-full text-sm tracking-wide transition-all hover:opacity-70"
              style={{ border: "1px solid var(--spa-green)", color: "var(--spa-green)" }}
            >
              Узнать больше
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-fade-up delay-500">
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--spa-stone)" }}>Прокрутите вниз</p>
          <Icon name="ChevronDown" size={16} color="var(--spa-stone)" />
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────── */}
      <section id="о-салоне" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>О салоне</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
              Место, где<br /><em>природа лечит</em>
            </h2>
            <p className="text-base leading-relaxed mb-6 opacity-80">
              Ботаника — это камерный спа-салон, где каждая программа создана как ритуал. Мы черпаем вдохновение из архетипов таро и мудрости природы, чтобы каждый визит стал настоящим путешествием внутрь себя.
            </p>
            <p className="text-base leading-relaxed opacity-80">
              Натуральные масла, лечебные травы, горячие камни и живые растения — наши инструменты. Ваше восстановление — наша цель.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[["5+", "лет"], ["1000+", "гостей"], ["4", "программы"]].map(([num, label]) => (
                <div key={label}>
                  <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-terra)" }}>{num}</p>
                  <p className="text-xs uppercase tracking-wider mt-1 opacity-60">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-square blob-1 flex items-center justify-center text-[120px]"
              style={{ background: "linear-gradient(135deg, #e8f0e4, #f0e8dc)" }}>
              🌿
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 blob-3 flex items-center justify-center text-5xl"
              style={{ background: "#f5ecd8" }}>✦</div>
            <div className="absolute -top-4 -right-4 w-20 h-20 blob-2 flex items-center justify-center text-4xl"
              style={{ background: "#e8f4e6" }}>🌸</div>
          </div>
        </div>
      </section>

      <div className="px-6"><div className="max-w-5xl mx-auto leaf-divider" /></div>

      {/* ── Programs ─────────────────────────────────────────── */}
      <section id="программы" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Карты таро</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Программы</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map((p) => (
              <button
                key={p.id}
                className="tarot-card text-left rounded-3xl p-6 cursor-pointer"
                style={{ background: p.bgColor, border: `1px solid ${p.color}20` }}
                onClick={() => setActiveProgram(p)}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `${p.color}20` }}>
                  {p.symbol}
                </div>
                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-dark)" }}>
                  {p.title}
                </h3>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--spa-stone)" }}>{p.subtitle}</p>
                <p className="text-sm leading-relaxed mb-5 opacity-70">{p.description}</p>
                <div className="flex items-end justify-between">
                  <p className="text-xs" style={{ color: "var(--spa-stone)" }}>{p.duration}</p>
                  <p className="text-xl font-light" style={{ fontFamily: "'Cormorant', serif", color: p.color }}>{p.price}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="text-center mt-8 text-sm opacity-50">Нажмите на карту, чтобы узнать подробности</p>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section id="галерея" className="py-24 px-6" style={{ background: "linear-gradient(160deg, #f0ece0, #e8f0e4)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Атмосфера</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Галерея</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <div key={i}
                className="rounded-3xl overflow-hidden flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{ background: i % 3 === 0 ? "#e8f4e6" : i % 3 === 1 ? "#f5ecd8" : "#f0eef5" }}>
                <span className="text-6xl mb-3">{item.emoji}</span>
                <p className="text-center px-3 font-medium" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
                  {item.label}
                </p>
                <p className="text-xs text-center px-4 mt-1 opacity-60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masters ──────────────────────────────────────────── */}
      <section id="мастера" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Команда</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Мастера</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {masters.map((m, i) => (
              <div key={i} className="rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ background: "#f5f0e8", border: "1px solid rgba(139,128,112,0.15)" }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-5"
                  style={{ background: "linear-gradient(135deg, #e8f4e6, #f5ecd8)" }}>
                  {m.emoji}
                </div>
                <h3 className="text-2xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif" }}>{m.name}</h3>
                <p className="text-sm font-medium mb-3" style={{ color: "var(--spa-green)" }}>{m.role}</p>
                <p className="text-xs mb-3 opacity-60 leading-relaxed">{m.specialty}</p>
                <div className="inline-block px-3 py-1 rounded-full text-xs"
                  style={{ background: "#e8f4e6", color: "var(--spa-green)" }}>
                  {m.experience} опыта
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ──────────────────────────────────────────── */}
      <section id="отзывы" className="py-24 px-6" style={{ background: "#f0ece0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Говорят гости</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Отзывы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="rounded-3xl p-7 transition-all duration-300 hover:shadow-md"
                style={{ background: "var(--spa-cream)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <span key={j} className="text-sm" style={{ color: "var(--spa-terra)" }}>✦</span>
                  ))}
                </div>
                <p className="leading-relaxed mb-5 italic opacity-80"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "1.15rem" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{r.name}</p>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "#e8f4e6", color: "var(--spa-green)" }}>
                    {r.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Вопросы</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Частые вопросы</h2>
          </div>

          <div className="space-y-3">
            {faqData.map((item, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: activeFaq === i ? "#e8f4e6" : "#f5f0e8", border: "1px solid rgba(139,128,112,0.12)" }}>
                <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="text-base font-medium" style={{ color: "var(--spa-dark)" }}>{item.q}</span>
                  <Icon name={activeFaq === i ? "ChevronUp" : "ChevronDown"} size={18} color="var(--spa-stone)" />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 animate-slide-up">
                    <p className="text-sm leading-relaxed opacity-75">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacts ─────────────────────────────────────────── */}
      <section id="контакты" className="py-24 px-6"
        style={{ background: "linear-gradient(160deg, #4a6741, #3a5233)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/50">Будем рады вас видеть</p>
            <h2 className="text-5xl md:text-6xl font-light text-white leading-tight mb-8"
              style={{ fontFamily: "'Cormorant', serif" }}>
              Запишитесь<br /><em>на визит</em>
            </h2>

            <div className="space-y-5">
              {[
                { icon: "MapPin", text: "Москва, ул. Лесная, 12" },
                { icon: "Phone", text: "+7 (999) 123-45-67" },
                { icon: "Clock", text: "Пн–Вс: 10:00 – 22:00" },
                { icon: "Instagram", text: "@botanika.spa" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon name={icon} size={15} color="white" />
                  </div>
                  <p className="text-white/80 text-sm">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
            <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
              Оставьте заявку
            </h3>
            <div className="space-y-4">
              {[
                { placeholder: "Ваше имя", type: "text" },
                { placeholder: "Телефон", type: "tel" },
              ].map((f) => (
                <input
                  key={f.placeholder}
                  type={f.type}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                />
              ))}
              <select
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Golos Text', sans-serif",
                }}
              >
                <option value="" style={{ color: "#333" }}>Выберите программу</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id} style={{ color: "#333" }}>
                    {p.symbol} {p.title} — {p.price}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Комментарий (необязательно)"
                rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "'Golos Text', sans-serif",
                }}
              />
              <button
                className="w-full py-3.5 rounded-2xl text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "var(--spa-cream)", color: "var(--spa-green)" }}
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#2d2820", color: "rgba(245,240,232,0.4)" }}>
        <p className="text-lg mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(245,240,232,0.7)" }}>Ботаника</p>
        <p className="text-xs tracking-wider">© 2024 · Спа-салон · Природные ритуалы</p>
      </footer>

      {activeProgram && <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />}

      <Chatbot />
    </div>
  );
}
