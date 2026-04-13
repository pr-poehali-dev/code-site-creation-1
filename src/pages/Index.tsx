import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useChatGPT } from "@/components/extensions/chatgpt-polza/useChatGPT";

const GPT_URL = "https://functions.poehali.dev/093394c0-7807-4add-8ac3-ec0daee3deb3";

// ─── Data ────────────────────────────────────────────────────────────────────

const programs = [
  {
    id: "tsaritsa",
    symbol: "♛",
    title: "Зазеркалье",
    tagline: "Авторский уход в SPA-бане",
    description: "Глубокое восстановление через цветочный пар, уход за волосами и кожей. Тело регенерирует, каждая клетка дышит. Ритуал создан для полного отпускания напряжения — от корней волос до кончиков пальцев.",
    effect: "Регенерация кожи · Восстановление волос · Расслабление всего тела",
    procedures: [
      "Церемония цветочного пара — открывает поры, насыщает кожу влагой",
      "Ритуал «Расти коса до пояса» — питание и восстановление волос",
      "Солевой скраб с цитрусовыми цветами или массаж перчаткой кесе",
      "Теплый чан с травами — снимает воспаления, успокаивает нервную систему",
      "Кокошники для каждой гостьи",
      "Звуковая медитация в парной с нанесением альгинатной маски",
      "Ритуал «По тропинке босиком» — уход за ножками, восстановление стоп",
    ],
    extra: "Бандажное обёртывание тела — 3 500 ₽",
    guests: "5–8 гостей",
    duration: "",
    price: "8 500 ₽",
    color: "#c8923a",
    dimColor: "rgba(200,146,58,0.08)",
  },
  {
    id: "briz",
    symbol: "≋",
    title: "Ракушка",
    tagline: "Нежный пар с ароматами летних трав",
    description: "Лёгкий пар с ароматами луга восстанавливает дыхание и снимает усталость с мышц. Пилинг с мёдом и травами запускает обновление кожи. Парафинотерапия возвращает мягкость и эластичность.",
    effect: "Обновление кожи · Дренаж мышц · Снятие хронической усталости",
    procedures: [
      "Нежный пар с ароматами летних трав — глубокое расслабление дыхательной системы",
      "Пилинг с натуральной травой, мёдом и контрастными прикосновениями",
      "Медитация с элементами погружения — перезагрузка нервной системы",
      "Парафинотерапия для ладоней и стоп — восстановление кожи",
      "Бодрящий кофе, травяной чай, сливки и кекс",
      "Альгинатная маска для лица — в подарок при массаже",
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
    title: "Сакура",
    tagline: "Древняя философия очищения",
    description: "Церемония глубокого пара под медитативные звуки пробуждает тело. Японские техники очищения через контраст температур запускают мощный процесс регенерации — кожа обновляется, сосуды укрепляются.",
    effect: "Детокс · Укрепление сосудов · Глубокое очищение кожи",
    procedures: [
      "Церемония глубокого ароматного пара под звуки бамбуковой флейты и ханга",
      "Контрастный ритуал для головы с сандаловыми гребнями — расслабление шеи и головы",
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
      "Тёплый чан с пихтой и травами",
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
  { icon: "ᚦ", title: "Парение с вениками", text: "Берёза для очищения, дуб для силы, эвкалипт для дыхания. Мягкие техники, которые расслабляют без стресса для тела." },
  { icon: "ᚢ", title: "Фитотерапия", text: "Натуральные травы и масла для поддержки иммунитета, снятия напряжения и глубокого релакса." },
  { icon: "ᛚ", title: "Водные практики", text: "Контрастные обливания и купель для пробуждения жизненной силы и укрепления сосудов." },
  { icon: "ᚹ", title: "Мёд, соль и травы", text: "Натуральный источник энергии и питания для кожи в SPA-практиках — очищение и восстановление изнутри." },
  { icon: "ᛟ", title: "Звуковая медитация", text: "Гармонизация внутреннего состояния через вибрации звука — перезагрузка нервной системы и глубокий покой." },
];

const faqData = [
  { q: "Как записаться на программу?", a: "Заполните форму на сайте или напишите мне в мессенджер. Я отвечу и подберём удобное время вместе." },
  { q: "Сколько человек в группе?", a: "Групповые программы рассчитаны на 5–8 гостей. «Сдобная Баня» — только для двоих, особый формат." },
  { q: "Что нужно взять с собой?", a: "Только хорошее настроение! Халаты, тапочки, шапки и полотенца предоставляются." },
  { q: "Можно ли купить в подарок?", a: "Да! Оформляю красивые сертификаты на любую программу или сумму. Выберите стиль оформления и номинал прямо на сайте.", link: "/certificate", linkLabel: "Оформить сертификат" },
  { q: "Кому подойдёт?", a: "• Тем, кто чувствует эмоциональное выгорание и усталость\n• Желающим проработать внутренние блоки и страхи\n• Ищущим глубокий релакс с осознанным эффектом\n• Практикующим йогу, медитацию или эзотерические техники\n• Ценящим традиции русской бани с современным подходом" },
];

// ─── Chatbot ─────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `Ты — Мария, пармастер и создатель проекта «Иней и Магма corp.». Отвечай тепло, поэтично, кратко (2-4 предложения). Ты проводишь авторские банные программы в Краснодаре.

Программы:
— «Зазеркалье» — 8 500 ₽, 5–8 гостей: цветочный пар, уход за волосами, альгинатная маска, кокошники. Дополнительно: бандажное обёртывание 3 500 ₽.
— «Ракушка» — 6 500 ₽, 5–8 гостей: пар с летними травами, медовый пилинг, парафинотерапия, кофе/чай/кекс. Альгинатная маска в подарок при массаже. Доп: массаж 3 500 ₽.
— «Сакура» — 7 500 ₽, 4 часа, 5–8 гостей: ароматный пар, звуки ханга, виноградный скраб, холодная купель, качели. Доп: парение вениками 3 500 ₽.
— «Сдобная Баня» — 36 000 ₽, 4 часа, 2 гостя: выбор каждого элемента, тёплый чан с пихтой, звуковая медитация на сеновале.

Запись: форма на сайте или Telegram. Халаты, тапочки, шапки — предоставляются. Отвечай только на вопросы о бане и программах.`;

const FAQ_QUICK = [
  { label: "Как записаться?", answer: "Заполните форму на сайте или напишите мне в Telegram. Подберём удобное время вместе 🌿" },
  { label: "Цены?", answer: "Зазеркалье — 8 500 ₽, Ракушка — 6 500 ₽, Сакура — 7 500 ₽, Сдобная Баня — 36 000 ₽ (2 гостя). Доп. процедуры — 3 500 ₽." },
  { label: "Что взять с собой?", answer: "Только хорошее настроение 🔥 Халаты, тапочки, шапки и полотенца — всё предоставляю я." },
  { label: "Сколько человек?", answer: "Группы: 5–8 гостей. Сдобная Баня — только для двоих, особый формат." },
  { label: "Подарочный сертификат?", answer: "Да! Оформляю красивые сертификаты на любую программу или сумму. Выберите на странице «Сертификат» 🎁" },
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Добро пожаловать 🔥 Я отвечу на ваши вопросы о банных программах." },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const { generate, isLoading } = useChatGPT({ apiUrl: GPT_URL });

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput("");
    setMessages(p => [...p, { from: "user", text: msg }]);

    const history = messages
      .filter(m => m.from !== "bot" || m.text !== messages[0].text)
      .map(m => ({ role: m.from === "user" ? "user" as const : "assistant" as const, content: m.text }));

    const result = await generate({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...history,
        { role: "user", content: msg },
      ],
      model: "openai/gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 300,
    });

    setMessages(p => [...p, {
      from: "bot",
      text: result.success && result.content ? result.content : "Лучше уточните у Марии напрямую — она ответит и подберёт программу под вас 🌿",
    }]);
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
          {messages.length <= 2 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {FAQ_QUICK.map((fq) => (
                <button key={fq.label} onClick={() => setMessages(p => [...p, { from: "user", text: fq.label }, { from: "bot", text: fq.answer }])}
                  className="text-xs px-2.5 py-1 rounded-full transition-all hover:opacity-80"
                  style={{ background: "rgba(200,146,58,0.1)", border: "1px solid rgba(200,146,58,0.25)", color: "var(--eth-gold2)" }}>
                  {fq.label}
                </button>
              ))}
            </div>
          )}
          <div className="px-3 py-3 flex gap-2" style={{ borderTop: "1px solid rgba(200,146,58,0.15)" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Напишите вопрос..."
              className="flex-1 text-sm px-3 py-2 rounded-xl outline-none"
              style={{ background: "var(--eth-bg3)", color: "var(--eth-cream)", fontFamily: "'Golos Text', sans-serif", border: "1px solid rgba(200,146,58,0.15)" }} />
            <button onClick={send} disabled={isLoading} className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-50"
              style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white" }}>
              {isLoading ? <span className="animate-spin text-xs">◈</span> : <Icon name="Send" size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── About Audio ─────────────────────────────────────────────────────────────

function AboutAudio() {
  const [playing, setPlaying] = useState(false);
  const [bars] = useState(() => [1,2,3,4,5].map(() => Math.random() * 12 + 6));
  const audioRef = useRef<HTMLAudioElement>(null);

  function toggle() {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  }

  return (
    <div
      className="fixed bottom-24 left-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl animate-slide-up"
      style={{ background: "rgba(20,15,10,0.95)", border: "1px solid rgba(200,146,58,0.22)", backdropFilter: "blur(12px)" }}
    >
      <audio ref={audioRef} loop src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749b4b4.mp3?filename=ethnic-meditation-9818.mp3" />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
        style={{ background: playing ? "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))" : "rgba(200,146,58,0.12)", color: playing ? "white" : "var(--eth-gold)", border: "1px solid rgba(200,146,58,0.25)" }}>
        {playing ? <Icon name="Pause" size={14} /> : <Icon name="Play" size={14} />}
      </button>
      <div>
        <p className="text-xs font-medium leading-tight" style={{ color: "var(--eth-gold2)" }}>Этнический звук</p>
        <p className="text-xs opacity-50 leading-tight" style={{ color: "var(--eth-stone)" }}>{playing ? "Играет..." : "Воспроизвести"}</p>
      </div>
      {playing && (
        <div className="flex items-end gap-0.5 h-4">
          {bars.map((h, i) => (
            <div key={i} className="w-0.5 rounded-full" style={{ height: `${h}px`, background: "var(--eth-gold)", opacity: 0.7, animation: `flicker ${0.4 + i * 0.12}s ease-in-out infinite alternate` }} />
          ))}
        </div>
      )}
    </div>
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
    { label: "🔥 Баня", id: "programs" },
    { label: "Таро", id: "tarot-nav" },
    { label: "🌿 Лавка", id: "shop-nav" },
    { label: "✦ Традиция · Old & New", id: "tradition-nav" },
    { label: "Контакты", id: "contacts" },
  ];

  function scrollTo(id: string) {
    if (id === "tarot-nav") { navigate("/tarot"); setNavOpen(false); return; }
    if (id === "shop-nav") { navigate("/shop"); setNavOpen(false); return; }
    if (id === "tradition-nav") { navigate("/tradition"); setNavOpen(false); return; }
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
            Пармастер · Хилер · Практик
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
            Иней и Магма corp
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

      {/* ── About Slide 1 ───────────────────────────────── */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 60%, #2a0e08 0%, #1a1410 50%, #0f0c08 100%)" }}>

        {/* Ambient particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { cls: "top-1/4 left-1/4 w-72 h-72", c: "#c8923a" },
            { cls: "bottom-1/3 right-1/4 w-64 h-64", c: "#3a6080" },
            { cls: "top-1/2 left-1/2 w-48 h-48", c: "#8a4020" },
          ].map((g, i) => (
            <div key={i} className={`absolute ${g.cls} rounded-full opacity-10 animate-float`}
              style={{ background: `radial-gradient(circle, ${g.c}, transparent 70%)`, filter: "blur(50px)", animationDelay: `${i * 1.2}s` }} />
          ))}
          {["top-10 left-12", "top-20 right-20", "bottom-32 left-20", "bottom-10 right-10", "top-1/3 right-8"].map((pos, i) => (
            <span key={i} className={`absolute ${pos} animate-pulse-gold`}
              style={{ color: "rgba(200,146,58,0.25)", fontSize: i % 2 === 0 ? "10px" : "7px", animationDelay: `${i * 0.5}s` }}>✦</span>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "var(--eth-stone)" }}>Обо мне</p>
              <h2 className="text-5xl md:text-7xl font-light leading-tight mb-6"
                style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Иней<br />&amp; Магма<br /><em style={{ fontSize: "0.65em", opacity: 0.8 }}>corp.</em>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Я — Мария. Создатель проекта, где огонь и лёд объединяются, создавая целебный Пар.</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--eth-smoke)", opacity: 0.85 }}>
                <strong style={{ color: "var(--eth-ember)" }}>«Иней и Магма corp.»</strong> — это объединение противоположностей: обжигающей магмы, рвущейся из глубин земли, и хрустального инея, сотканного из дыхания зимы. Благодаря этому проекту каждый сможет ощутить то, чего так не хватало…
              </p>

              <div className="space-y-5">
                {[
                  { color: "rgba(212,98,42,0.6)", label: "МАГМА", title: "Обновление", text: "Раскалённый жар пробуждает то, что дремало годами. Тело вспоминает силу, а душа — смелость меняться. Первый шаг к новому — здесь." },
                  { color: "rgba(122,171,158,0.6)", label: "ИНЕЙ", title: "Возврат к себе", text: "Холодный воздух смывает всё наносное. Остаётся только суть — тихая, настоящая. Вы снова слышите себя." },
                  { color: "rgba(200,146,58,0.6)", label: "ПАР", title: "Расслабление", text: "Пар обволакивает, как объятие. Мышцы отпускают, мысли растворяются. Остаётся только тепло и покой." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                      <div className="w-px flex-1 mt-2 opacity-30" style={{ background: item.color }} />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.3em] mb-1" style={{ color: item.color.replace("0.6)", "1)") }}>{item.label}</p>
                      <p className="text-sm font-medium mb-1" style={{ color: "var(--eth-cream)" }}>{item.title}</p>
                      <p className="text-xs leading-relaxed italic" style={{ color: "var(--eth-smoke)", opacity: 0.75 }}>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual — ковш со звёздной водой */}
          <div className="relative flex items-center justify-center group/ladle">
            <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full opacity-20 animate-float"
              style={{ background: "radial-gradient(circle, #3a6080, transparent 70%)", filter: "blur(30px)" }} />

            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-end justify-center">
              {["top-2 left-8", "top-6 right-10", "top-0 left-1/2", "top-10 left-4", "top-4 right-4"].map((pos, i) => (
                <span key={i} className={`absolute ${pos} animate-pulse-gold text-xs`}
                  style={{ color: "rgba(200,220,255,0.6)", animationDelay: `${i * 0.4}s` }}>★</span>
              ))}

              <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 20px rgba(100,160,220,0.3))" }}>
                <defs>
                  <radialGradient id="starwater" cx="50%" cy="40%">
                    <stop offset="0%" stopColor="#6aa8d8" stopOpacity="0.9"/>
                    <stop offset="40%" stopColor="#1a3a6a" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#0a1a30" stopOpacity="1"/>
                  </radialGradient>
                </defs>

                {/* Пар над ковшом */}
                <path d="M70 135 Q68 120 72 108 Q76 96 73 84" stroke="rgba(200,220,255,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-1"/>
                <path d="M90 132 Q88 117 92 105 Q96 93 93 78" stroke="rgba(200,220,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" className="steam-2"/>
                <path d="M108 135 Q106 120 110 108 Q114 96 111 82" stroke="rgba(200,220,255,0.18)" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-3"/>

                {/* Ковш — чаша */}
                <ellipse cx="90" cy="145" rx="60" ry="18" fill="rgba(40,60,80,0.9)" stroke="rgba(200,146,58,0.6)" strokeWidth="1.5"/>
                <path d="M30 145 Q28 185 90 188 Q152 185 150 145 Z" fill="rgba(25,45,65,0.95)" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5"/>

                {/* Звёздная вода */}
                <ellipse cx="90" cy="148" rx="52" ry="12" fill="rgba(20,40,80,0.9)"/>
                <ellipse cx="90" cy="148" rx="50" ry="10" fill="url(#starwater)" opacity="0.9"/>
                <ellipse cx="75" cy="146" rx="12" ry="3" fill="rgba(180,220,255,0.25)" transform="rotate(-15 75 146)"/>
                <ellipse cx="105" cy="150" rx="8" ry="2" fill="rgba(180,220,255,0.15)" transform="rotate(10 105 150)"/>
                <text x="78" y="150" fontSize="7" fill="rgba(200,230,255,0.7)">★</text>
                <text x="96" y="153" fontSize="5" fill="rgba(200,230,255,0.5)">✦</text>
                <text x="65" y="153" fontSize="4" fill="rgba(200,230,255,0.4)">★</text>

                {/* Ручка */}
                <rect x="148" y="135" width="45" height="8" rx="4" fill="rgba(40,30,20,0.95)" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5"/>
                <rect x="185" y="131" width="8" height="16" rx="4" fill="rgba(40,30,20,0.95)" stroke="rgba(200,146,58,0.4)" strokeWidth="1"/>

                {/* Орнамент */}
                <path d="M50 165 Q90 170 130 165" stroke="rgba(200,146,58,0.3)" strokeWidth="1" fill="none"/>
              </svg>
            </div>

            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] whitespace-nowrap"
              style={{ color: "var(--eth-gold)", opacity: 0.5 }}>Алхимия стихий</p>
            <div className="absolute top-4 right-0 text-2xl animate-float" style={{ color: "var(--eth-gold)", opacity: 0.2 }}>◆</div>
            <div className="absolute bottom-8 left-0 text-xl animate-float delay-300" style={{ color: "var(--eth-gold)", opacity: 0.15 }}>◇</div>

            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/ladle:opacity-100 transition-all duration-700 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,6,2,0.92) 0%, rgba(10,6,2,0.7) 100%)", borderRadius: "50%", backdropFilter: "blur(2px)" }}>
              <div className="text-center px-4">
                <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "var(--eth-gold)", opacity: 0.7 }}>◈</p>
                <p className="font-light leading-snug mb-3" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.05rem", color: "var(--eth-gold2)" }}>
                  Бронируйте с пометкой<br />
                  <em style={{ color: "var(--eth-gold)" }}>«Алхимия Стихий»</em>.
                </p>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--eth-smoke)", opacity: 0.85, fontFamily: "'Cormorant', serif", fontSize: "0.9rem", fontStyle: "italic" }}>
                  Тогда программа будет создана Специально для вас — каждое действие, каждый элемент, каждая пауза..
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", opacity: 0.8, fontFamily: "'Cormorant', serif", fontSize: "0.9rem", fontStyle: "italic" }}>
                  Словно вы наконец нашли то, что искали всю жизнь..
                </p>
                <p className="text-sm font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", letterSpacing: "0.1em" }}>
                  Выдох. Новое начало
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About Slide 2 ───────────────────────────────── */}
      <section className="relative py-24 px-6 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0c08 0%, #1a1008 50%, #0f0a06 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.2), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.2), transparent)" }} />
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.5em] mb-6" style={{ color: "var(--eth-stone)" }}>Философия</p>
              <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8"
                style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Здесь нет<br />чужих рецептов.<br /><em>Только ваш путь. Ваш Ритм. </em><br /><span style={{ fontSize: "0.55em", opacity: 0.7, fontStyle: "normal", letterSpacing: "0.05em" }}>Каждая программа выстраивается под вас.</span>
              </h2>
              <p className="text-base leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Касания веником — едва уловимые, убаюкивающие или глубокие, с пробивками, пробуждающими силу. </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", opacity: 0.85 }}>Нанесение соли — нежное, словно шёпот волн, или скрабирующее, очищающее тело и дух.</p>
              <p className="leading-relaxed mb-6 text-sm" style={{ color: "var(--eth-smoke)", opacity: 0.85 }}>Мёд — тёплый, обволакивающий, или с ледяными припарками, дарующими свежесть. 

Каждый момент — ваш, каждый жест — в лад с вашим ритмом.</p>
              <p className="text-sm leading-relaxed font-medium pt-5" style={{ color: "var(--eth-gold)", borderTop: "1px solid rgba(200,146,58,0.2)" }}>
                Только натуральные ингредиенты · Только живые ароматы · Только настоящий банный опыт
              </p>
            </div>
            <div className="flex flex-col justify-center gap-6">
              {[["4", "авторские\nпрограммы"], ["5–8", "гостей\nв группе"], ["4 ч", "до полного\nрасслабления"]].map(([num, label]) => (
                <div key={num} className="rounded-2xl p-5 text-center eth-card" style={{ background: "var(--eth-bg3)" }}>
                  <p className="text-4xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", lineHeight: 1 }}>{num}</p>
                  <p className="text-xs uppercase tracking-wider mt-2 opacity-50 whitespace-pre-line leading-relaxed" style={{ color: "var(--eth-stone)" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3 pillars */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { sym: "🜂", title: "Огонь", sub: "Начало трансформации", text: "Жар открывает поры, выводит накопленное, даёт телу разрешение меняться. Здесь рождается новое.", color: "#d4622a", glow: "rgba(212,98,42,0.35)", anim: "flicker" },
              { sym: "🜄", title: "Вода", sub: "Очищение и обновление", text: "Контраст температур запускает жизненные процессы. Каждое погружение — это возвращение к себе.", color: "#4a9ec8", glow: "rgba(74,158,200,0.35)", anim: "mist-drift" },
              { sym: "🜃", title: "Земля", sub: "Укоренение и покой", text: "Соль, глина, травы, мёд — дары земли. Они питают, успокаивают и возвращают природный баланс.", color: "#7aaa50", glow: "rgba(122,170,80,0.35)", anim: "spirit-float" },
              { sym: "🜁", title: "Воздух", sub: "Дыхание и свобода", text: "Пар, наполненный ароматами трав и смол, открывает дыхание, несёт лёгкость и ощущение свободы.", color: "#8ac8b8", glow: "rgba(138,200,184,0.35)", anim: "mist-drift" },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl p-7 eth-card relative overflow-hidden" style={{ background: "var(--eth-bg2)" }}>
                <div className="absolute top-0 right-0 text-6xl font-light opacity-5 pointer-events-none select-none"
                  style={{ fontFamily: "serif", color: p.color, lineHeight: 1 }}>{p.sym}</div>
                {/* Animated glow circle behind icon */}
                <div className="relative w-14 h-14 mb-4 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full"
                    style={{ background: `radial-gradient(circle, ${p.glow} 0%, transparent 70%)`, animation: `pulseGold ${2+i*0.4}s ease-in-out ${i*0.2}s infinite` }}/>
                  <p className="text-3xl relative z-10"
                    style={{ color: p.color, animation: `${p.anim} ${2.5+i*0.5}s ease-in-out ${i*0.3}s infinite`, filter: `drop-shadow(0 0 8px ${p.glow})` }}>{p.sym}</p>
                </div>
                <h3 className="text-xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{p.title}</h3>
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: p.color, opacity: 0.7 }}>{p.sub}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--eth-smoke)", opacity: 0.8 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="eth-divider mb-6"><span>◆</span></div>
            <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Путь к обновлению на всех уровнях
            </h2>

            <blockquote className="eth-quote text-base mx-auto max-w-2xl mb-4" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Баня — это храм регенерации, где стихии помогают человеку обрести баланс. Каждая моя  программа — это продуманный ритуал, в котором жар, пар, травы и прикосновения работают как единая система восстановления. Тело регенерирует, нервная система успокаивается, кожа обновляется.</blockquote>
            <p className="text-sm leading-relaxed max-w-2xl mx-auto opacity-75" style={{ color: "var(--eth-smoke)" }}></p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((b, i) => {
              const iconColors = ["#d4622a","#6aaa80","#c8923a","#e8b86d","#8abeaa"];
              const iconBg = ["rgba(212,98,42,0.12)","rgba(106,170,128,0.12)","rgba(200,146,58,0.12)","rgba(232,184,109,0.12)","rgba(138,190,170,0.12)"];
              const iconGlow = ["rgba(212,98,42,0.3)","rgba(106,170,128,0.3)","rgba(200,146,58,0.3)","rgba(232,184,109,0.3)","rgba(138,190,170,0.3)"];
              return (
                <div key={i} className="rounded-2xl p-6 eth-card text-center"
                  style={{
                    background: "var(--eth-bg3)",
                    transition: `all 0.4s ease ${i * 0.08}s`,
                  }}>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: iconBg[i],
                      border: `1.5px solid ${iconColors[i]}40`,
                      boxShadow: `0 0 20px ${iconGlow[i]}, 0 0 40px ${iconGlow[i]}`,
                      animation: `pulseGold ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                    }}>
                    <span className="text-3xl" style={{ filter: `drop-shadow(0 0 6px ${iconColors[i]})` }}>{b.icon}</span>
                  </div>
                  <h3 className="text-lg font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{b.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--eth-stone)" }}>{b.text}</p>
                </div>
              );
            })}
          </div>

          {/* Quote block */}
          <div className="mt-14 text-center">
            <p className="text-3xl md:text-4xl font-light italic"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", opacity: 0.9 }}>
              «Алхимия стихий в ковше»
            </p>
          </div>
        </div>
      </section>

      {/* ── Programs ────────────────────────────────────── */}
      <section id="programs" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Авторские ритуалы</p>
            <h2 className="text-5xl md:text-6xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>Банные Программы</h2>
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
              Шелест карт<br /><em>и ваша программа</em>
            </h2>
            <p className="leading-relaxed mb-8 max-w-xl mx-auto text-xl"
              style={{ color: "var(--eth-smoke)", opacity: 0.8, fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Карты помогут раскрыть ваши текущие потребности и подобрать программу, которая резонирует именно с вами.</p>
            <button onClick={() => navigate("/tarot")}
              className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.12em" }}>
              Пройти таро-расклад
            </button>
          </div>
        </div>
      </section>

      {/* ── Poetic Interlude ─────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "linear-gradient(180deg, #0f0c08 0%, #100d0a 100%)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="eth-divider mb-10"><span style={{ color: "var(--eth-ember)" }}>❧</span></div>
          <p className="leading-loose mb-6 text-xl" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.25rem", color: "var(--eth-smoke)", fontStyle: "italic" }}>
            Огонь печи внемлет древним заклинаниям.<br />
            Пар из дубового веника окутывает тело.<br />
            Соль земли растворяется на коже.<br />
            Ароматы трав зовут вспомнить то, что забыто.
          </p>
          <p className="leading-relaxed text-xl" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.1rem", color: "var(--eth-gold2)" }}>
            Доверьтесь процессу. Ваше тело уже знает путь.
          </p>
          <div className="eth-divider mt-10"><span style={{ color: "var(--eth-ember)" }}>❧</span></div>
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
                    <div className="text-sm leading-relaxed mb-3 space-y-1.5" style={{ color: "var(--eth-smoke)" }}>
                      {item.a.split("\n").map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
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
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>Ждём Вас 
у огня</h2>
            <p className="mt-4 text-sm italic" style={{ color: "var(--eth-stone)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Секретные чит-коды и древние ритуалы в балансе 
для вашего
Глубокого Обновления</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <div className="space-y-5 mb-10">
                {[
                  { icon: "Phone", text: "+7 (918) 686-06-50" },
                  { icon: "Clock", text: "По предварительной записи" },
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
                href="https://max.ru/+79186860650"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full px-5 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl mb-5"
                style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none" }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
                </svg>
                <div>
                  <p className="text-sm font-medium tracking-wide">Написать в Max</p>
                  <p className="text-xs opacity-70">Мария · ответит быстро</p>
                </div>
              </a>
              <div className="flex justify-center mt-4">
                <img
                  src="https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/857bca83-d97b-47ea-9a5c-781078db15e4.png"
                  alt="Иней и Магма corp."
                  style={{
                    width: "220px",
                    height: "220px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 24px rgba(200,146,58,0.25))",
                    animation: "pulseGold 4s ease-in-out infinite",
                  }}
                />
              </div>

            </div>

            {/* Form */}
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-10 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid rgba(200,146,58,0.1)" }}>
        <div className="eth-divider max-w-xs mx-auto mb-5"><span>◆</span></div>
        <p className="text-xl mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", opacity: 0.8 }}>Мария · Пармастер</p>
        <p className="text-xs tracking-widest" style={{ color: "var(--eth-stone)", opacity: 0.5 }}>© 2024 · Краснодар · Авторские банные программы</p>
      </footer>

      {activeProgram && <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />}
      <AboutAudio />
      <Chatbot />
    </div>
  );
}