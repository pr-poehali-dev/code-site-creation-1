import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ─── Data ────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "tsaritsa",
    emoji: "👑",
    title: "Кабы я была... Царица",
    tagline: "Погрузитесь в сказку — с авторским уходом в SPA-бане",
    description: "Роскошный банный ритуал в духе русских сказок. Цветочный пар, уход за волосами, кожей и ногами — всё по-царски.",
    procedures: [
      "Церемония цветочного пара",
      "Ритуал «Расти коса до пояса» — уход за волосами",
      "Солевой скраб с цитрусовыми цветами или массаж перчаткой кесе",
      "Теплый чан с травами",
      "Кокошники и сладкие брускеты для каждой гостьи",
      "Звуковая медитация в парной с нанесением альгинатной маски",
      "Ритуал «По тропинке босиком» — уход за ножками",
    ],
    extra: "Обёртывание тела — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "",
    price: "8 500 ₽",
    color: "#8b1a1a",
    accent: "#c0392b",
    bgGradient: "linear-gradient(135deg, #fdf0f0 0%, #fce8e8 100%)",
    bgCard: "#fff5f5",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/3a02ef48-a89e-4b7e-a630-8655f59083b0.png",
  },
  {
    id: "briz",
    emoji: "🌊",
    title: "Летний Бриз",
    tagline: "Нежный пар с ароматами летних трав",
    description: "Лёгкость морского ветра, пилинг как дождь в жаркий день и парафинотерапия для мягкости кожи.",
    procedures: [
      "Нежный пар с ароматами летних трав",
      "Пилинг с натуральной травой, мёдом и контрастными прикосновениями",
      "Медитация с элементами погружения",
      "Парафинотерапия для ладоней и стоп",
      "Бодрящий кофе или травяной чай",
      "Сливки с ягодами и тёплый кекс",
      "В подарок — альгинатная маска для лица",
    ],
    extra: "Расслабляющий экспресс-массаж «Лёгкость облаков» — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "",
    price: "6 500 ₽",
    color: "#1a6b8b",
    accent: "#2980b9",
    bgGradient: "linear-gradient(135deg, #f0f8fd 0%, #e8f4fb 100%)",
    bgCard: "#f0f8fd",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/7b20add8-7758-4248-95d2-98e407720338.png",
  },
  {
    id: "japan",
    emoji: "🌸",
    title: "Сладкая Япония",
    tagline: "Древняя философия очищения",
    description: "Глубокий ароматный пар под звуки бамбуковой флейты и ханга, погружающий в атмосферу Японии.",
    procedures: [
      "Церемония глубокого ароматного пара под звуки бамбуковой флейты и ханга",
      "Контрастный ритуал для головы с сандаловыми гребнями",
      "Спа-массаж",
      "Скрабирование с виноградным соком или медово-травяной пилинг",
      "Церемония «Сад камней» — пилинг для стоп с ковриком из натуральной гальки",
      "Травяной чай, мёд, пломбир с сушеными сливами, грейпфрутом и солёными палочками",
      "Холодная купель, тёплый чан с травами, качели на свежем воздухе",
    ],
    extra: "Классическое парение вениками — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "4 часа",
    price: "7 500 ₽",
    color: "#6b4a8b",
    accent: "#8e44ad",
    bgGradient: "linear-gradient(135deg, #fdf5ff 0%, #f8eeff 100%)",
    bgCard: "#fdf5ff",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/bae10646-5dcf-42a6-8403-fb9a5d6b8428.png",
  },
  {
    id: "sdobnaya",
    emoji: "🥐",
    title: "Сдобная Баня",
    tagline: "Пышная авторская программа с ингредиентами на ваш выбор",
    description: "Соберите свою идеальную банную программу: сами выбираете парение, уход и массаж. Уют, тепло и звуковая медитация на сеновале.",
    procedures: [
      "Глубокое парение с выходом в купель или классическое парение — на выбор",
      "Обёртывание тела или альгинатная маска для лица — на выбор",
      "Глубокотканный массаж верхней части тела или массаж ладоней, стоп и шеи — на выбор",
      "Медово-травяной пилинг или солевое выкатывание — на выбор",
      "Звуковая медитация на сеновале",
      "Тёплое какао, ароматный пирог и свежие ягоды",
      "Холодная купель, плед, качели на свежем воздухе",
      "Банные вязаные шапки, халаты, полотенца и тапочки",
    ],
    extra: "",
    guests: "2 гостя",
    duration: "4 часа",
    price: "36 000 ₽",
    color: "#7a4a1a",
    accent: "#a0522d",
    bgGradient: "linear-gradient(135deg, #fdf8f0 0%, #faf0e6 100%)",
    bgCard: "#fdf8f0",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/2e54fc39-8705-4976-995f-cfbc84b03100.png",
  },
];

const faqData = [
  { q: "Как записаться на программу?", a: "Заполните форму на сайте или напишите мне в мессенджер. Я отвечу и подберём удобное время вместе." },
  { q: "Сколько человек в группе?", a: "Групповые программы рассчитаны на 5–8 гостей. «Сдобная Баня» — только для двоих, особый формат." },
  { q: "Что нужно взять с собой?", a: "Только хорошее настроение! Халаты, тапочки, шапки и полотенца предоставляются." },
  { q: "Можно ли купить в подарок?", a: "Да! Оформляю красивые сертификаты на любую программу. Напишите — договоримся." },
  { q: "Есть ли противопоказания?", a: "При беременности, варикозе и некоторых заболеваниях часть процедур ограничена. Уточните при записи, подберём оптимальный вариант." },
  { q: "Можно ли изменить состав программы?", a: "Конечно! Программы гибкие, можно кое-что скорректировать под ваши предпочтения." },
];

// ─── Chatbot ─────────────────────────────────────────────────────────────────

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Привет! Я помогу с вопросами о банных программах Марии 🌿 Спрашивайте!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function getAnswer(q: string): string {
    const l = q.toLowerCase();
    if (l.includes("цен") || l.includes("стоит") || l.includes("сколько") || l.includes("прайс"))
      return "Программы от 6 500 до 36 000 ₽. «Летний Бриз» — 6 500 ₽, «Сладкая Япония» — 7 500 ₽, «Царица» — 8 500 ₽, «Сдобная Баня» для двоих — 36 000 ₽.";
    if (l.includes("записат") || l.includes("запись") || l.includes("бронь"))
      return "Заполните форму внизу страницы или напишите Марии напрямую. Подтвердим бронь в течение нескольких часов 🌸";
    if (l.includes("сколько") || l.includes("гостей") || l.includes("человек") || l.includes("групп"))
      return "Групповые программы на 5–8 гостей. «Сдобная Баня» — эксклюзивно для двоих.";
    if (l.includes("подарок") || l.includes("сертифик"))
      return "Оформляю подарочные сертификаты на любую программу 🎁 Напишите Марии — всё организует.";
    if (l.includes("взять") || l.includes("принести") || l.includes("готовит"))
      return "Только хорошее настроение 😊 Халаты, шапки, тапочки и полотенца — всё есть.";
    if (l.includes("царица") || l.includes("сказка"))
      return "«Кабы я была Царица» — это 8 500 ₽ для 5–8 гостей: цветочный пар, уход за волосами и ножками, кокошники и сладкие угощения 👑";
    if (l.includes("бриз") || l.includes("летн"))
      return "«Летний Бриз» — 6 500 ₽ для 5–8 гостей: пар с летними травами, пилинг, парафинотерапия и в подарок альгинатная маска 🌊";
    if (l.includes("япон") || l.includes("японии"))
      return "«Сладкая Япония» — 7 500 ₽ за 4 часа: бамбуковая флейта, ханг, виноградный скраб, холодная купель и качели 🌸";
    if (l.includes("сдобн") || l.includes("баня") || l.includes("двоих"))
      return "«Сдобная Баня» — 36 000 ₽ для двоих на 4 часа. Вы сами выбираете состав: парение, массаж, уход. Звуковая медитация на сеновале 🥐";
    if (l.includes("привет") || l.includes("здравств"))
      return "Привет! Рада вас видеть 🌿 Чем могу помочь?";
    return "Хороший вопрос! Лучше уточнить у Марии напрямую — она ответит на всё подробно 💚";
  }

  function send() {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { from: "user", text: msg }]);
    setTimeout(() => setMessages(p => [...p, { from: "bot", text: getAnswer(msg) }]), 600);
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "var(--spa-green)", color: "white" }}
      >
        {open ? <Icon name="X" size={22} /> : <span className="text-2xl">🌿</span>}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          style={{ background: "var(--spa-cream)", border: "1px solid #c5d5c0" }}>
          <div className="px-4 py-3 flex items-center gap-3" style={{ background: "var(--spa-green)" }}>
            <span className="text-xl">🌿</span>
            <div>
              <p className="text-sm font-medium text-white" style={{ fontFamily: "'Cormorant', serif" }}>Мария</p>
              <p className="text-xs text-white/70">Пармастер · всегда на связи</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                  style={m.from === "bot"
                    ? { background: "#e8f0e6", color: "var(--spa-dark)" }
                    : { background: "var(--spa-green)", color: "white" }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="px-3 py-3 flex gap-2 border-t" style={{ borderColor: "#d5e0d0" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Напишите вопрос..."
              className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "#f0f5ef", color: "var(--spa-dark)", fontFamily: "'Golos Text', sans-serif" }} />
            <button onClick={send} className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80"
              style={{ background: "var(--spa-green)", color: "white" }}>
              <Icon name="Send" size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Program Modal ────────────────────────────────────────────────────────────

function ProgramModal({ program, onClose }: { program: typeof programs[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: "rgba(20,15,10,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-3xl overflow-y-auto animate-slide-up"
        style={{ background: "var(--spa-cream)", maxHeight: "90vh" }}
        onClick={e => e.stopPropagation()}>

        {/* Image header */}
        <div className="relative h-48 overflow-hidden">
          <img src={program.image} alt={program.title}
            className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))" }} />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-all">
            <Icon name="X" size={16} />
          </button>
          <div className="absolute bottom-4 left-6">
            <p className="text-white/80 text-xs uppercase tracking-widest mb-1">{program.guests}{program.duration ? ` · ${program.duration}` : ""}</p>
            <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant', serif" }}>{program.title}</h2>
          </div>
        </div>

        <div className="p-7">
          <p className="text-sm leading-relaxed mb-6 opacity-75">{program.description}</p>

          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "var(--spa-stone)" }}>Программа включает</p>
          <ul className="space-y-2 mb-6">
            {program.procedures.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--spa-dark)" }}>
                <span style={{ color: program.accent }} className="mt-0.5 flex-shrink-0">✦</span>
                {p}
              </li>
            ))}
          </ul>

          {program.extra && (
            <div className="rounded-2xl px-4 py-3 mb-6"
              style={{ background: `${program.color}10`, border: `1px solid ${program.color}20` }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--spa-stone)" }}>Можно дополнить</p>
              <p className="text-sm" style={{ color: program.color }}>{program.extra}</p>
            </div>
          )}

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--spa-stone)" }}>Гостей</p>
              <p className="font-medium text-sm">{program.guests}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--spa-stone)" }}>Стоимость</p>
              <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: program.accent }}>{program.price}</p>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-2xl text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: program.color, color: "white" }}>
            Записаться на программу
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeProgram, setActiveProgram] = useState<typeof programs[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { label: "Обо мне", id: "about" },
    { label: "Программы", id: "programs" },
    { label: "Отзывы", id: "reviews" },
    { label: "Контакты", id: "contacts" },
  ];

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }

  return (
    <div style={{ background: "var(--spa-cream)", color: "var(--spa-dark)" }}>

      {/* ── Nav ────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(245,240,232,0.93)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(139,128,112,0.12)" }}>
        <button onClick={() => scrollTo("hero")}
          className="text-xl tracking-wider" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-green)", fontWeight: 500 }}>
          Мария · Пармастер
        </button>
        <div className="hidden md:flex items-center gap-7">
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="nav-link text-sm tracking-wide hover:opacity-70 transition-opacity"
              style={{ color: "var(--spa-dark)", fontFamily: "'Golos Text', sans-serif" }}>
              {n.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("contacts")}
          className="hidden md:block px-5 py-2 rounded-full text-sm tracking-wide transition-all hover:opacity-90"
          style={{ background: "var(--spa-green)", color: "white" }}>
          Записаться
        </button>
        <button className="md:hidden" onClick={() => setNavOpen(!navOpen)}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {navOpen && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-6 animate-fade-in"
          style={{ background: "var(--spa-cream)" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ───────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(160deg, #e8f0e4 0%, #f5f0e8 45%, #f2e8e0 100%)" }}>

        {/* Ambient blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-16 w-80 h-80 opacity-20 animate-float blob-1"
            style={{ background: "radial-gradient(circle, #7a9e76, transparent 70%)" }} />
          <div className="absolute top-1/3 -right-20 w-96 h-96 opacity-15 animate-float delay-300 blob-2"
            style={{ background: "radial-gradient(circle, #b5714a, transparent 70%)" }} />
          <div className="absolute -bottom-16 left-1/3 w-72 h-72 opacity-10 animate-float delay-500 blob-3"
            style={{ background: "radial-gradient(circle, #6b7fa3, transparent 70%)" }} />
          <span className="absolute top-28 left-8 text-5xl opacity-10 animate-float delay-100">🌿</span>
          <span className="absolute bottom-32 right-10 text-4xl opacity-10 animate-float delay-400">🌸</span>
          <span className="absolute top-1/2 right-1/4 text-3xl opacity-10 animate-float delay-200">✦</span>
        </div>

        <div className="relative text-center px-6 max-w-2xl mx-auto">
          {/* Avatar placeholder */}
          <div className="w-28 h-28 mx-auto mb-6 rounded-full flex items-center justify-center text-5xl animate-fade-up"
            style={{ background: "linear-gradient(135deg, #e8f4e6, #f5ecd8)", border: "3px solid rgba(74,103,65,0.2)" }}>
            🌿
          </div>

          <p className="text-xs uppercase tracking-[0.4em] mb-3 animate-fade-up delay-100"
            style={{ color: "var(--spa-stone)" }}>Пармастер · Краснодар</p>

          <h1 className="text-6xl md:text-8xl font-light leading-none mb-4 animate-fade-up delay-200"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-dark)" }}>
            Мария
          </h1>

          <p className="text-lg font-light leading-relaxed mb-3 animate-fade-up delay-300"
            style={{ color: "var(--spa-stone)" }}>
            Авторские банные программы и SPA-ритуалы
          </p>
          <p className="text-sm leading-relaxed mb-10 animate-fade-up delay-300"
            style={{ color: "var(--spa-stone)", opacity: 0.7, maxWidth: "420px", margin: "0 auto 2.5rem" }}>
            Каждая программа — это особый ритуал, где пар, прикосновения и ароматы создают незабываемый опыт. Для тех, кто хочет выдохнуть по-настоящему.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
            <button onClick={() => scrollTo("programs")}
              className="px-8 py-3.5 rounded-full text-sm tracking-wide transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "var(--spa-green)", color: "white" }}>
              Смотреть программы
            </button>
            <button onClick={() => scrollTo("contacts")}
              className="px-8 py-3.5 rounded-full text-sm tracking-wide transition-all hover:opacity-70"
              style={{ border: "1px solid var(--spa-green)", color: "var(--spa-green)" }}>
              Записаться
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <p className="text-xs tracking-widest uppercase" style={{ color: "var(--spa-stone)" }}>Пролистайте вниз</p>
          <Icon name="ChevronDown" size={16} color="var(--spa-stone)" />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Обо мне</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
              Баня —<br /><em>это не просто жара</em>
            </h2>
            <p className="text-base leading-relaxed mb-5 opacity-80">
              Я пармастер с авторским подходом. Каждая моя программа — это продуманный ритуал: от выбора трав и ароматов до финальной чашки чая. Я работаю только с натуральными ингредиентами и создаю атмосферу, в которой хочется остаться.
            </p>
            <p className="text-base leading-relaxed opacity-80">
              Мои гости приходят за восстановлением — и уходят с ощущением, что побывали в другом мире. Именно за этим я создаю то, что делаю.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              {[["4", "авторских\nпрограммы"], ["5–8", "гостей\nв группе"], ["Краснодар", "ул. Карельская\n102"]].map(([num, label]) => (
                <div key={num}>
                  <p className="text-2xl font-light whitespace-pre-line" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-terra)", lineHeight: 1.1 }}>{num}</p>
                  <p className="text-xs uppercase tracking-wider mt-2 opacity-60 whitespace-pre-line leading-relaxed">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="w-full aspect-square blob-2 flex items-center justify-center text-[100px]"
              style={{ background: "linear-gradient(135deg, #e8f0e4, #f5ecd8)" }}>
              🌿
            </div>
            <div className="absolute -bottom-6 -right-4 w-28 h-28 blob-3 flex items-center justify-center text-4xl"
              style={{ background: "#fdf0f0" }}>🌸</div>
            <div className="absolute -top-4 -left-4 w-20 h-20 blob-1 flex items-center justify-center text-3xl"
              style={{ background: "#f0f8fd" }}>✦</div>
          </div>
        </div>
      </section>

      <div className="px-6"><div className="max-w-5xl mx-auto leaf-divider" /></div>

      {/* ── Programs ───────────────────────────────────────── */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Авторские ритуалы</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Программы</h2>
            <p className="mt-4 text-sm opacity-60 max-w-md mx-auto">Нажмите на карточку, чтобы увидеть полный состав программы</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((p) => (
              <button key={p.id} onClick={() => setActiveProgram(p)}
                className="tarot-card text-left rounded-3xl overflow-hidden cursor-pointer group"
                style={{ background: p.bgCard, border: `1px solid ${p.color}18` }}>

                {/* Program image */}
                <div className="relative h-44 overflow-hidden">
                  <img src={p.image} alt={p.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 40%, ${p.bgCard}ee)` }} />
                  <div className="absolute bottom-3 right-4">
                    <span className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: p.color }}>
                      {p.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-2xl font-light leading-tight" style={{ fontFamily: "'Cormorant', serif", color: "var(--spa-dark)" }}>
                      {p.emoji} {p.title}
                    </h3>
                  </div>
                  <p className="text-xs mb-3 italic" style={{ color: p.accent }}>{p.tagline}</p>
                  <p className="text-sm leading-relaxed opacity-70 mb-4">{p.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 rounded-full" style={{ background: `${p.color}15`, color: p.color }}>
                      {p.guests}{p.duration ? ` · ${p.duration}` : ""}
                    </span>
                    <span className="text-xs flex items-center gap-1 opacity-50">
                      Подробнее <Icon name="ArrowRight" size={12} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ────────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-6" style={{ background: "linear-gradient(160deg, #f0ece0, #e8f0e4)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--spa-stone)" }}>Говорят гости</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif" }}>Отзывы</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Ирина М.", text: "«Царица» — это что-то невероятное. Пришла просто расслабиться, а получила настоящий ритуал. Кокошники, сладкие угощения, цветочный пар... Буду возвращаться!", program: "Царица", emoji: "👑" },
              { name: "Светлана Д.", text: "«Летний Бриз» перенёс меня к морю прямо в бане. Парафинотерапия для рук — просто волшебство. Кожа как у ребёнка. Мария — настоящий мастер!", program: "Летний Бриз", emoji: "🌊" },
              { name: "Анастасия К.", text: "Сладкая Япония стала для нас с подругами целым приключением. Бамбуковая флейта, качели, холодная купель — это надо пережить самой. Рекомендую всем!", program: "Сладкая Япония", emoji: "🌸" },
              { name: "Марина и Артём", text: "«Сдобная Баня» для двоих — лучший подарок на годовщину. Мы сами выбирали программу, всё было идеально. Звуковая медитация на сеновале — это отдельная история!", program: "Сдобная Баня", emoji: "🥐" },
            ].map((r, i) => (
              <div key={i} className="rounded-3xl p-7 transition-all duration-300 hover:shadow-md"
                style={{ background: "var(--spa-cream)" }}>
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-sm" style={{ color: "var(--spa-terra)" }}>✦</span>
                  ))}
                </div>
                <p className="leading-relaxed mb-5 opacity-80"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
                  {r.text}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{r.name}</p>
                  <span className="text-xs px-3 py-1 rounded-full" style={{ background: "#e8f4e6", color: "var(--spa-green)" }}>
                    {r.emoji} {r.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
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
                  <span className="text-base font-medium">{item.q}</span>
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

      {/* ── Contacts ───────────────────────────────────────── */}
      <section id="contacts" className="py-24 px-6"
        style={{ background: "linear-gradient(160deg, #4a6741, #3a5233)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4 text-white/50">Записаться</p>
            <h2 className="text-5xl md:text-6xl font-light text-white leading-tight mb-8"
              style={{ fontFamily: "'Cormorant', serif" }}>
              Ждём вас<br /><em>в гости</em>
            </h2>
            <div className="space-y-5">
              {[
                { icon: "MapPin", text: "Краснодар, ул. Карельская, 102" },
                { icon: "Phone", text: "+7 (999) 123-45-67" },
                { icon: "Clock", text: "По предварительной записи" },
                { icon: "Instagram", text: "@mariya.parmaster" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon name={icon} size={15} color="white" />
                  </div>
                  <p className="text-white/80 text-sm">{text}</p>
                </div>
              ))}
            </div>

            {/* Program quick links */}
            <div className="mt-10">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-4">Программы</p>
              <div className="flex flex-wrap gap-2">
                {programs.map(p => (
                  <button key={p.id} onClick={() => setActiveProgram(p)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.12)", color: "white" }}>
                    {p.emoji} {p.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl p-8" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
            <h3 className="text-2xl font-light text-white mb-6" style={{ fontFamily: "'Cormorant', serif" }}>
              Оставьте заявку
            </h3>
            <div className="space-y-4">
              {[{ placeholder: "Ваше имя", type: "text" }, { placeholder: "Телефон или Telegram", type: "text" }].map(f => (
                <input key={f.placeholder} type={f.type} placeholder={f.placeholder}
                  className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
              ))}
              <select className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Golos Text', sans-serif" }}>
                <option value="" style={{ color: "#333" }}>Выберите программу</option>
                {programs.map(p => (
                  <option key={p.id} value={p.id} style={{ color: "#333" }}>
                    {p.emoji} {p.title} — {p.price}
                  </option>
                ))}
              </select>
              <textarea placeholder="Пожелания или вопросы" rows={3}
                className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
              <button className="w-full py-3.5 rounded-2xl text-sm font-medium tracking-wide transition-all hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "var(--spa-cream)", color: "var(--spa-green)" }}>
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#2d2820", color: "rgba(245,240,232,0.4)" }}>
        <p className="text-lg mb-1" style={{ fontFamily: "'Cormorant', serif", color: "rgba(245,240,232,0.7)" }}>Мария · Пармастер</p>
        <p className="text-xs tracking-wider">© 2024 · Краснодар · Авторские банные программы</p>
      </footer>

      {activeProgram && <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />}
      <Chatbot />
    </div>
  );
}
