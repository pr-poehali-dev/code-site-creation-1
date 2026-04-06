import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Data ────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "tsaritsa",
    symbol: "♛",
    title: "Кабы я была... Царица",
    tagline: "Авторский уход в SPA-бане",
    description: "Глубокое восстановление через цветочный пар, уход за волосами и кожей. Тело регенерирует, каждая клетка дышит. Ритуал создан для полного отпускания напряжения — от корней волос до кончиков пальцев.",
    effect: "Регенерация кожи · Восстановление волос · Расслабление всего тела",
    procedures: [
      "Церемония цветочного пара — открывает поры, насыщает кожу влагой",
      "Ритуал «Расти коса до пояса» — питание и восстановление волос",
      "Солевой скраб с цитрусовыми цветами или массаж перчаткой кесе",
      "Теплый чан с травами — снимает воспаления, успокаивает нервную систему",
      "Кокошники и сладкие брускеты для каждой гостьи",
      "Звуковая медитация в парной с нанесением альгинатной маски",
      "Ритуал «По тропинке босиком» — уход за ножками, восстановление стоп",
    ],
    extra: "Обёртывание тела — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "",
    price: "8 500 ₽",
    color: "#c8923a",
    dimColor: "rgba(200,146,58,0.08)",
  },
  {
    id: "briz",
    symbol: "≋",
    title: "Летний Бриз",
    tagline: "Нежный пар с ароматами летних трав",
    description: "Лёгкий пар с ароматами луга восстанавливает дыхание и снимает усталость с мышц. Пилинг с мёдом и травами запускает обновление кожи. Парафинотерапия возвращает мягкость и эластичность.",
    effect: "Обновление кожи · Дренаж мышц · Снятие хронической усталости",
    procedures: [
      "Нежный пар с ароматами летних трав — глубокое расслабление дыхательной системы",
      "Пилинг с натуральной травой, мёдом и контрастными прикосновениями",
      "Медитация с элементами погружения — перезагрузка нервной системы",
      "Парафинотерапия для ладоней и стоп — восстановление суставов и кожи",
      "Бодрящий кофе или травяной чай",
      "Сливки с ягодами и тёплый кекс",
      "В подарок — альгинатная маска для лица",
    ],
    extra: "Расслабляющий экспресс-массаж «Лёгкость облаков» — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "",
    price: "6 500 ₽",
    color: "#7aab9e",
    dimColor: "rgba(122,171,158,0.08)",
  },
  {
    id: "japan",
    symbol: "❋",
    title: "Сладкая Япония",
    tagline: "Древняя философия очищения",
    description: "Церемония глубокого пара под медитативные звуки пробуждает тело. Японские техники очищения через контраст температур запускают мощный процесс регенерации — кожа обновляется, сосуды укрепляются.",
    effect: "Детокс · Укрепление сосудов · Глубокое очищение кожи",
    procedures: [
      "Церемония глубокого ароматного пара под звуки бамбуковой флейты и ханга",
      "Контрастный ритуал для головы с сандаловыми гребнями — расслабление шеи и головы",
      "Спа-массаж — восстановление лимфотока и мышечное расслабление",
      "Скрабирование с виноградным соком или медово-травяной пилинг",
      "Церемония «Сад камней» — пилинг для стоп с ковриком из натуральной гальки",
      "Травяной чай, мёд, пломбир с сушеными сливами и грейпфрутом",
      "Холодная купель, тёплый чан с травами, качели на свежем воздухе",
    ],
    extra: "Классическое парение вениками — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "4 часа",
    price: "7 500 ₽",
    color: "#b87a6a",
    dimColor: "rgba(184,122,106,0.08)",
  },
  {
    id: "sdobnaya",
    symbol: "✦",
    title: "Сдобная Баня",
    tagline: "Авторская программа с ингредиентами на ваш выбор",
    description: "Самая полная программа восстановления. Глубокое парение запускает терморегуляцию организма, контраст температур — мощный иммунный ответ. Вы выбираете каждый элемент под свои потребности. Звуковая медитация завершает цикл — тело и психика перезагружаются полностью.",
    effect: "Иммунитет · Полная перезагрузка · Глубокий мышечный релакс",
    procedures: [
      "Глубокое парение с выходом в купель или классическое парение — на выбор",
      "Обёртывание тела или альгинатная маска для лица — на выбор",
      "Глубокотканный массаж верхней части тела или массаж ладоней, стоп и шеи",
      "Медово-травяной пилинг или солевое выкатывание — на выбор",
      "Звуковая медитация на сеновале — полная перезагрузка нервной системы",
      "Тёплое какао, ароматный пирог и свежие ягоды",
      "Холодная купель, плед, качели на свежем воздухе",
      "Банные вязаные шапки, халаты, полотенца и тапочки",
    ],
    extra: "",
    guests: "2 гостя",
    duration: "4 часа",
    price: "36 000 ₽",
    color: "#c8923a",
    dimColor: "rgba(200,146,58,0.08)",
  },
];

const benefits = [
  { icon: "🔥", title: "Детокс через жар", text: "Пар открывает поры и выводит токсины через кожу — самый древний способ очищения тела, известный тысячелетиями." },
  { icon: "❄️", title: "Контраст температур", text: "Переход от жара к холоду тренирует сосуды, укрепляет иммунитет и запускает мощный выброс эндорфинов." },
  { icon: "🌿", title: "Сила трав", text: "Натуральные масла и травяные настои проникают в кожу через расширенные поры, питая и восстанавливая изнутри." },
  { icon: "🎵", title: "Звуковая медитация", text: "Частоты поющих чаш и живых инструментов перезагружают нервную систему и снимают хронический стресс." },
];

const faqData = [
  { q: "Как записаться на программу?", a: "Заполните форму на сайте или напишите мне в мессенджер. Я отвечу и подберём удобное время вместе." },
  { q: "Сколько человек в группе?", a: "Групповые программы рассчитаны на 5–8 гостей. «Сдобная Баня» — только для двоих, особый формат." },
  { q: "Что нужно взять с собой?", a: "Только хорошее настроение! Халаты, тапочки, шапки и полотенца предоставляются." },
  { q: "Можно ли купить в подарок?", a: "Да! Оформляю красивые сертификаты на любую программу или сумму. Выберите стиль оформления и номинал прямо на сайте.", link: "/certificate", linkLabel: "Оформить сертификат" },
  { q: "Есть ли противопоказания?", a: "При беременности, варикозе и некоторых заболеваниях часть процедур ограничена. Уточните при записи, подберём оптимальный вариант." },
  { q: "Как баня помогает телу?", a: "Жар расширяет сосуды и открывает поры, контраст температур укрепляет иммунитет, травяные пары насыщают кожу и лёгкие. Это комплексная работа с телом, проверенная веками." },
];

// ─── Chatbot ─────────────────────────────────────────────────────────────────

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Добро пожаловать 🔥 Я отвечу на ваши вопросы о банных программах Марии." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  function getAnswer(q: string): string {
    const l = q.toLowerCase();
    if (l.includes("цен") || l.includes("стоит") || l.includes("сколько") || l.includes("прайс"))
      return "Программы от 6 500 до 36 000 ₽. «Летний Бриз» — 6 500 ₽, «Сладкая Япония» — 7 500 ₽, «Царица» — 8 500 ₽, «Сдобная Баня» для двоих — 36 000 ₽.";
    if (l.includes("записат") || l.includes("запись") || l.includes("бронь"))
      return "Заполните форму внизу страницы или напишите Марии. Подтвердим бронь в течение нескольких часов 🌿";
    if (l.includes("гостей") || l.includes("человек") || l.includes("групп"))
      return "Групповые программы на 5–8 гостей. «Сдобная Баня» — эксклюзивно для двоих.";
    if (l.includes("подарок") || l.includes("сертифик"))
      return "Оформляю подарочные сертификаты на любую программу 🎁 Напишите Марии — всё организует.";
    if (l.includes("взять") || l.includes("принести"))
      return "Только хорошее настроение. Халаты, шапки, тапочки и полотенца — всё предоставляется.";
    if (l.includes("польза") || l.includes("зачем") || l.includes("помогает"))
      return "Жар открывает поры и выводит токсины, контраст температур укрепляет сосуды и иммунитет, травяные пары питают кожу и дыхательную систему. Древняя практика, проверенная веками 🔥";
    if (l.includes("царица") || l.includes("сказка"))
      return "«Кабы я была Царица» — 8 500 ₽ для 5–8 гостей: цветочный пар, уход за волосами и ножками, альгинатная маска, кокошники 👑";
    if (l.includes("бриз") || l.includes("летн"))
      return "«Летний Бриз» — 6 500 ₽: пар с летними травами, медовый пилинг, парафинотерапия и в подарок маска для лица.";
    if (l.includes("япон"))
      return "«Сладкая Япония» — 7 500 ₽ за 4 часа: бамбуковая флейта, ханг, виноградный скраб, холодная купель и качели.";
    if (l.includes("сдобн") || l.includes("двоих"))
      return "«Сдобная Баня» — 36 000 ₽ для двоих на 4 часа. Вы сами выбираете каждый элемент программы. Звуковая медитация на сеновале 🔥";
    if (l.includes("привет") || l.includes("здравств"))
      return "Добро пожаловать! Чем могу помочь?";
    return "Хороший вопрос! Лучше уточнить у Марии напрямую — она ответит подробно и подберёт программу под вас.";
  }

  function send() {
    if (!input.trim()) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { from: "user", text: msg }]);
    setTimeout(() => setMessages(p => [...p, { from: "bot", text: getAnswer(msg) }]), 500);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white" }}>
        {open ? <Icon name="X" size={22} /> : <span className="text-2xl">🔥</span>}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
          style={{ background: "var(--eth-bg2)", border: "1px solid rgba(200,146,58,0.25)" }}>
          <div className="px-4 py-3 flex items-center gap-3"
            style={{ background: "linear-gradient(135deg, #2a1f14, #1a1410)", borderBottom: "1px solid rgba(200,146,58,0.2)" }}>
            <span className="text-xl">🔥</span>
            <div>
              <p className="text-sm font-medium" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>Мария</p>
              <p className="text-xs" style={{ color: "var(--eth-stone)" }}>Пармастер · всегда на связи</p>
            </div>
          </div>
          <div className="p-4 flex flex-col gap-3 overflow-y-auto" style={{ maxHeight: "280px" }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed"
                  style={m.from === "bot"
                    ? { background: "var(--eth-bg3)", color: "var(--eth-cream)" }
                    : { background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white" }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="px-3 py-3 flex gap-2" style={{ borderTop: "1px solid rgba(200,146,58,0.15)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Напишите вопрос..."
              className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--eth-bg3)", color: "var(--eth-cream)", fontFamily: "'Golos Text', sans-serif", border: "1px solid rgba(200,146,58,0.15)" }} />
            <button onClick={send} className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity"
              style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white" }}>
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
      style={{ background: "rgba(10,8,5,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-2xl overflow-y-auto animate-slide-up"
        style={{ background: "var(--eth-bg2)", border: "1px solid rgba(200,146,58,0.2)", maxHeight: "92vh" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-8 pt-8 pb-6" style={{ borderBottom: "1px solid rgba(200,146,58,0.12)" }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-70"
            style={{ background: "rgba(200,146,58,0.1)", color: "var(--eth-stone)" }}>
            <Icon name="X" size={16} />
          </button>

          <span className="text-4xl mb-4 block" style={{ color: program.color, opacity: 0.7 }}>{program.symbol}</span>
          <h2 className="text-4xl font-light mb-2 leading-tight" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            {program.title}
          </h2>
          <p className="text-sm italic mb-4" style={{ color: "var(--eth-stone)" }}>{program.tagline}</p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--eth-smoke)" }}>{program.description}</p>

          {/* Effect tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {program.effect.split(" · ").map(e => (
              <span key={e} className="text-xs px-3 py-1 rounded-full"
                style={{ background: `${program.color}18`, color: program.color, border: `1px solid ${program.color}30` }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 py-6">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--eth-stone)" }}>Состав программы</p>
          <ul className="space-y-3 mb-6">
            {program.procedures.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--eth-smoke)" }}>
                <span className="mt-1 flex-shrink-0 text-xs" style={{ color: program.color }}>◆</span>
                {p}
              </li>
            ))}
          </ul>

          {program.extra && (
            <div className="rounded-xl px-4 py-3 mb-6"
              style={{ background: "rgba(200,146,58,0.06)", border: "1px solid rgba(200,146,58,0.15)" }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--eth-stone)" }}>Можно дополнить</p>
              <p className="text-sm" style={{ color: "var(--eth-gold)" }}>{program.extra}</p>
            </div>
          )}

          <div className="flex items-center justify-between mb-6 pt-4"
            style={{ borderTop: "1px solid rgba(200,146,58,0.12)" }}>
            <div>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--eth-stone)" }}>Гостей</p>
              <p className="text-sm" style={{ color: "var(--eth-cream)" }}>{program.guests}{program.duration ? ` · ${program.duration}` : ""}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--eth-stone)" }}>Стоимость</p>
              <p className="text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{program.price}</p>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.15em" }}>
            Записаться
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const TELEGRAM_URL = "https://functions.poehali.dev/b19212c6-df7b-49bb-9d3d-e1121d88dacb";

async function sendToTelegram(data: Record<string, string>) {
  const res = await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

// ─── Booking Form ─────────────────────────────────────────────────────────────

function BookingForm({ tarotCard }: { tarotCard?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    const ok = await sendToTelegram({
      name, phone,
      program: program || "не выбрана",
      comment,
      source: tarotCard ? "Таро-страница" : "Главная страница",
      ...(tarotCard ? { tarotCard } : {}),
    });
    setStatus(ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(200,146,58,0.05)", border: "1px solid rgba(200,146,58,0.15)" }}>
        <p className="text-5xl mb-4">🔥</p>
        <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          Заявка отправлена!
        </h3>
        <p className="text-sm" style={{ color: "var(--eth-stone)" }}>
          Мария свяжется с вами в ближайшее время
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-8"
      style={{ background: "rgba(200,146,58,0.05)", border: "1px solid rgba(200,146,58,0.15)" }}>
      <h3 className="text-2xl font-light mb-6" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
        Оставьте заявку
      </h3>
      <div className="space-y-4">
        <input required value={name} onChange={e => setName(e.target.value)}
          placeholder="Ваше имя" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        <input required value={phone} onChange={e => setPhone(e.target.value)}
          placeholder="Телефон или Telegram" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        <select value={program} onChange={e => setProgram(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(30,24,18,0.98)", color: program ? "var(--eth-cream)" : "rgba(240,230,208,0.5)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }}>
          <option value="">Выберите программу</option>
          {programs.map(p => (
            <option key={p.id} value={p.title} style={{ background: "#1a1410", color: "var(--eth-cream)" }}>
              {p.symbol} {p.title} — {p.price}
            </option>
          ))}
        </select>
        {tarotCard && (
          <div className="px-4 py-3 rounded-xl flex items-center gap-2"
            style={{ background: "rgba(155,127,181,0.08)", border: "1px solid rgba(155,127,181,0.2)" }}>
            <span style={{ color: "#9b7fb5" }}>🃏</span>
            <p className="text-sm" style={{ color: "var(--eth-smoke)" }}>Карта Таро: <strong style={{ color: "#9b7fb5" }}>{tarotCard}</strong></p>
          </div>
        )}
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          placeholder="Пожелания или вопросы" rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        {status === "err" && (
          <p className="text-sm text-center" style={{ color: "#e57373" }}>
            Ошибка отправки. Напишите напрямую в Telegram.
          </p>
        )}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.15em" }}>
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [activeProgram, setActiveProgram] = useState<typeof programs[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const navItems = [
    { label: "Обо мне", id: "about" },
    { label: "Программы", id: "programs" },
    { label: "Таро", id: "tarot-nav" },
    { label: "Отзывы", id: "reviews" },
    { label: "Контакты", id: "contacts" },
  ];

  function scrollTo(id: string) {
    if (id === "tarot-nav") { navigate("/tarot"); setNavOpen(false); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }

  return (
    <div style={{ background: "var(--eth-bg)", color: "var(--eth-cream)", minHeight: "100vh" }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(26,20,16,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,146,58,0.12)" }}>
        <button onClick={() => scrollTo("hero")}
          className="text-xl tracking-widest" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)", fontWeight: 400 }}>
          Мария
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="nav-link text-sm tracking-wider hover:opacity-70 transition-opacity"
              style={{ color: "var(--eth-smoke)", fontFamily: "'Golos Text', sans-serif", letterSpacing: "0.08em" }}>
              {n.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("contacts")}
          className="hidden md:block px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
          Записаться
        </button>
        <button className="md:hidden" onClick={() => setNavOpen(!navOpen)} style={{ color: "var(--eth-gold)" }}>
          <Icon name={navOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {navOpen && (
        <div className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-8 animate-fade-in"
          style={{ background: "var(--eth-bg)" }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => scrollTo(n.id)}
              className="text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ────────────────────────────────────────── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        style={{ background: "radial-gradient(ellipse at 50% 60%, #2a1f10 0%, #1a1410 50%, #0f0c08 100%)" }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full opacity-20"
            style={{ background: "radial-gradient(ellipse, #d4622a, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(ellipse, #c8923a, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        {/* Steam decorations */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none flex gap-8">
          {[0,1,2].map(i => (
            <div key={i} className={`w-1 h-16 rounded-full steam-${i+1}`}
              style={{ background: "linear-gradient(to top, rgba(200,180,150,0.4), transparent)" }} />
          ))}
        </div>

        {/* Ornamental top */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2">
          <div className="eth-divider"><span>◆ ◇ ◆</span></div>
        </div>

        <div className="relative text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.5em] mb-6 animate-fade-up"
            style={{ color: "var(--eth-stone)", letterSpacing: "0.4em" }}>
            Пармастер · Краснодар
          </p>

          <h1 className="text-7xl md:text-9xl font-light leading-none mb-3 animate-fade-up delay-100 fire-glow"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Мария
          </h1>

          <div className="eth-divider my-6 animate-fade-up delay-200">
            <span>✦</span>
          </div>

          {/* KEY PHRASES */}
          <p className="text-2xl md:text-3xl font-light italic mb-3 animate-fade-up delay-300"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)" }}>
            Мудрость предков в каждой капле пара
          </p>
          <p className="text-lg md:text-xl font-light mb-10 animate-fade-up delay-400"
            style={{ color: "var(--eth-gold)", letterSpacing: "0.05em" }}>
            Огонь, который лечит
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-500">
            <button onClick={() => scrollTo("programs")}
              className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
              Программы
            </button>
            <button onClick={() => scrollTo("contacts")}
              className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:opacity-70"
              style={{ border: "1px solid rgba(200,146,58,0.4)", color: "var(--eth-gold2)", letterSpacing: "0.12em" }}>
              Записаться
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-gold">
          <Icon name="ChevronDown" size={18} color="var(--eth-gold)" />
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section id="about" className="py-24 px-6 eth-pattern">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] mb-5" style={{ color: "var(--eth-stone)" }}>Обо мне</p>
            <h2 className="text-5xl md:text-6xl font-light leading-tight mb-6"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Баня — это<br /><em>древнее искусство</em>
            </h2>

            <blockquote className="eth-quote text-base mb-6" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.2rem" }}>
              Мудрость предков в каждой капле пара — я не просто провожу процедуры, я возвращаю телу его природное право на восстановление.
            </blockquote>

            <p className="text-sm leading-relaxed mb-4 opacity-80" style={{ color: "var(--eth-smoke)" }}>
              Каждая программа — это продуманный ритуал, в котором жар, пар, травы и прикосновения работают как единая система восстановления. Тело регенерирует, нервная система успокаивается, кожа обновляется.
            </p>
            <p className="text-sm leading-relaxed opacity-80" style={{ color: "var(--eth-smoke)" }}>
              Только натуральные ингредиенты, только живые ароматы, только настоящий банный опыт.
            </p>

            <div className="mt-6 rounded-xl px-5 py-4"
              style={{ background: "rgba(200,146,58,0.06)", border: "1px solid rgba(200,146,58,0.15)" }}>
              <p className="text-sm leading-relaxed italic"
                style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", fontSize: "1.05rem" }}>
                Мои программы — это не просто банные процедуры, это тщательно продуманные ритуалы, направленные на очищение, омоложение и глубокое расслабление. Каждая программа разработана для достижения максимального эффекта.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 pt-8" style={{ borderTop: "1px solid rgba(200,146,58,0.12)" }}>
              {[["4", "авторские\nпрограммы"], ["5–8", "гостей\nв группе"], ["4 часа", "максимум\nудовольствия"]].map(([num, label]) => (
                <div key={num}>
                  <p className="text-2xl font-light whitespace-pre-line" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", lineHeight: 1.1 }}>{num}</p>
                  <p className="text-xs uppercase tracking-wider mt-2 opacity-50 whitespace-pre-line leading-relaxed" style={{ color: "var(--eth-stone)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative"
              style={{ background: "radial-gradient(circle, #2a1f10, #1a1410)", border: "1px solid rgba(200,146,58,0.2)" }}>
              {/* Inner glow */}
              <div className="absolute inset-4 rounded-full"
                style={{ background: "radial-gradient(circle at 50% 80%, rgba(212,98,42,0.3), transparent 70%)" }} />
              <div className="text-center relative z-10">
                <p className="text-7xl mb-2 animate-flicker">🔥</p>
                <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--eth-gold)", opacity: 0.7 }}>Огонь лечит</p>
              </div>
            </div>
            {/* Orbit ornaments */}
            <div className="absolute top-0 right-0 text-3xl animate-float" style={{ color: "var(--eth-gold)", opacity: 0.3 }}>◆</div>
            <div className="absolute bottom-4 left-0 text-2xl animate-float delay-300" style={{ color: "var(--eth-gold)", opacity: 0.2 }}>◇</div>
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="eth-divider mb-6"><span>◆</span></div>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Как баня восстанавливает тело
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-2xl p-6 eth-card text-center"
                style={{ background: "var(--eth-bg3)" }}>
                <span className="text-4xl block mb-4">{b.icon}</span>
                <h3 className="text-lg font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{b.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--eth-stone)" }}>{b.text}</p>
              </div>
            ))}
          </div>

          {/* Quote block */}
          <div className="mt-14 text-center">
            <p className="text-3xl md:text-4xl font-light italic"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", opacity: 0.9 }}>
              «Огонь, который лечит —<br />это не метафора, это физиология»
            </p>
            <p className="mt-3 text-sm" style={{ color: "var(--eth-stone)" }}>— Мария, пармастер</p>
          </div>
        </div>
      </section>

      {/* ── Programs ────────────────────────────────────── */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Авторские ритуалы</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Программы
            </h2>
            <div className="eth-divider mt-6 max-w-xs mx-auto"><span>◇</span></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {programs.map((p) => (
              <button key={p.id} onClick={() => setActiveProgram(p)}
                className="eth-card fire-card-glow text-left rounded-2xl cursor-pointer group"
                style={{ background: "var(--eth-bg2)" }}>
                <div className="p-7">
                  {/* Symbol + title */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl font-light animate-pulse-gold" style={{ color: p.color, fontFamily: "'Cormorant', serif" }}>
                      {p.symbol}
                    </span>
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ background: p.dimColor, color: p.color, border: `1px solid ${p.color}25` }}>
                      {p.guests}
                    </span>
                  </div>

                  <h3 className="text-2xl font-light mb-1 leading-tight"
                    style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs italic mb-4" style={{ color: "var(--eth-stone)" }}>{p.tagline}</p>

                  {/* Effect */}
                  <p className="text-xs mb-4 font-medium" style={{ color: p.color }}>
                    ◆ {p.effect}
                  </p>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--eth-smoke)", opacity: 0.85 }}>
                    {p.description}
                  </p>

                  <div className="flex items-center justify-between pt-4"
                    style={{ borderTop: `1px solid ${p.color}18` }}>
                    <span className="text-xs flex items-center gap-1 transition-all group-hover:gap-2"
                      style={{ color: "var(--eth-stone)" }}>
                      Полный состав <Icon name="ArrowRight" size={12} />
                    </span>
                    <span className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                      {p.price}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="text-center mt-8 text-xs tracking-widest uppercase" style={{ color: "var(--eth-stone)", opacity: 0.5 }}>
            Нажмите на программу для полного состава
          </p>
        </div>
      </section>

      {/* ── Tarot Banner ────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "radial-gradient(ellipse at 50% 50%, #1e1530 0%, #0f0c08 80%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl px-8 py-12 text-center relative overflow-hidden"
            style={{ border: "1px solid rgba(155,127,181,0.25)", background: "radial-gradient(ellipse at 50% 0%, rgba(155,127,181,0.08), transparent 70%)" }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(155,127,181,0.4), transparent)" }} />
            <span className="text-5xl block mb-5 opacity-60" style={{ color: "#9b7fb5" }}>◆</span>
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "var(--eth-stone)" }}>
              Индивидуальный подход
            </p>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-4"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Магия Таро<br /><em>и ваша уникальная программа</em>
            </h2>
            <p className="text-base leading-relaxed mb-8 max-w-xl mx-auto"
              style={{ color: "var(--eth-smoke)", opacity: 0.8, fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
              Каждый человек уникален. Я верю, что карты Таро помогают раскрыть ваши текущие потребности и составить программу, которая резонирует именно с вами.
            </p>
            <button onClick={() => navigate("/tarot")}
              className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.12em" }}>
              Пройти таро-расклад
            </button>
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────── */}
      <section id="reviews" className="py-24 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Говорят гости</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Отзывы
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { name: "Ирина М.", text: "«Царица» — это не просто баня, это полное погружение в другой мир. После программы тело чувствует себя так, словно отдыхало неделю. Восстановление ощущается буквально на клеточном уровне.", program: "Царица", symbol: "♛" },
              { name: "Светлана Д.", text: "«Летний Бриз» — открытие для меня. Пар с травами, медовый пилинг — кожа обновилась полностью. Парафинотерапия вернула мягкость рукам, которой не было годами. Мария — настоящий мастер своего дела.", program: "Летний Бриз", symbol: "≋" },
              { name: "Анастасия К.", text: "Сладкая Япония — это не просто расслабление, это работа с телом. Контрастные купели, звуки ханга, качели на свежем воздухе. Ощущение лёгкости не проходило несколько дней.", program: "Сладкая Япония", symbol: "❋" },
              { name: "Марина и Артём", text: "«Сдобная Баня» стала лучшим подарком. Мы сами выбирали программу, и это создало ощущение особого ритуала. Звуковая медитация на сеновале — отдельный опыт, который невозможно описать словами.", program: "Сдобная Баня", symbol: "✦" },
            ].map((r, i) => (
              <div key={i} className="eth-card rounded-2xl p-7" style={{ background: "var(--eth-bg3)" }}>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} style={{ color: "var(--eth-gold)", fontSize: "12px" }}>◆</span>
                  ))}
                </div>
                <p className="leading-relaxed mb-5 italic"
                  style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem", color: "var(--eth-smoke)" }}>
                  «{r.text}»
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium" style={{ color: "var(--eth-cream)" }}>{r.name}</p>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "rgba(200,146,58,0.1)", color: "var(--eth-gold)", border: "1px solid rgba(200,146,58,0.2)" }}>
                    {r.symbol} {r.program}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Вопросы</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Часто спрашивают
            </h2>
          </div>
          <div className="space-y-2">
            {faqData.map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden transition-all duration-200"
                style={{ background: activeFaq === i ? "var(--eth-bg3)" : "var(--eth-bg2)", border: "1px solid rgba(200,146,58,0.12)" }}>
                <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                  <span className="text-base" style={{ color: "var(--eth-cream)" }}>{item.q}</span>
                  <Icon name={activeFaq === i ? "ChevronUp" : "ChevronDown"} size={16} color="var(--eth-stone)" />
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 animate-slide-up">
                    <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--eth-smoke)" }}>{item.a}</p>
                    {"link" in item && item.link && (
                      <button onClick={() => navigate(item.link as string)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-widest uppercase transition-all hover:opacity-90 hover:scale-105"
                        style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.1em" }}>
                        <Icon name="Gift" size={14} />
                        {item.linkLabel as string}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contacts ────────────────────────────────────── */}
      <section id="contacts" className="py-24 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #2a1808 0%, #1a1410 60%, #0f0c08 100%)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="eth-divider mb-6 max-w-sm mx-auto"><span>◆ ◇ ◆</span></div>
            <h2 className="text-5xl md:text-6xl font-light leading-tight"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Ждём вас<br /><em>у огня</em>
            </h2>
            <p className="mt-4 text-sm italic" style={{ color: "var(--eth-stone)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>
              Мудрость предков в каждой капле пара
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "MapPin", text: "Краснодар, ул. Карельская, 102" },
                  { icon: "Phone", text: "+7 (999) 123-45-67" },
                  { icon: "Clock", text: "По предварительной записи" },
                  { icon: "Instagram", text: "@mariya.parmaster" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(200,146,58,0.1)", border: "1px solid rgba(200,146,58,0.2)" }}>
                      <Icon name={icon} size={15} color="var(--eth-gold)" />
                    </div>
                    <p className="text-sm" style={{ color: "var(--eth-smoke)" }}>{text}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://t.me/+79186860650"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl"
                style={{ background: "linear-gradient(135deg, #229ed9, #1a7db8)", color: "white", textDecoration: "none" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.613c-.15.672-.546.836-1.107.52l-3.07-2.262-1.48 1.424c-.164.164-.3.3-.616.3l.22-3.11 5.67-5.12c.247-.22-.054-.342-.382-.122L7.34 14.6l-3.01-.94c-.654-.205-.667-.654.137-.968l11.726-4.522c.546-.197 1.023.133.87.078z"/>
                </svg>
                <div>
                  <p className="text-sm font-medium tracking-wide">Написать в Telegram</p>
                  <p className="text-xs opacity-70">Max · ответит быстро</p>
                </div>
              </a>

              <div className="mt-5">
                <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--eth-stone)" }}>Программы</p>
                <div className="flex flex-wrap gap-2">
                  {programs.map(p => (
                    <button key={p.id} onClick={() => setActiveProgram(p)}
                      className="px-3 py-1.5 rounded-full text-xs transition-all hover:opacity-80"
                      style={{ background: "rgba(200,146,58,0.08)", color: "var(--eth-gold)", border: "1px solid rgba(200,146,58,0.15)", letterSpacing: "0.05em" }}>
                      {p.symbol} {p.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid rgba(200,146,58,0.1)" }}>
        <div className="eth-divider max-w-xs mx-auto mb-5"><span>◆</span></div>
        <p className="text-xl mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", opacity: 0.8 }}>Мария · Пармастер</p>
        <p className="text-xs tracking-widest" style={{ color: "var(--eth-stone)", opacity: 0.5 }}>© 2024 · Краснодар · Авторские банные программы</p>
      </footer>

      {activeProgram && <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />}
      <Chatbot />
    </div>
  );
}