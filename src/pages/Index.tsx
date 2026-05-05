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
  { icon: "ᚹ", title: "Мёд, соль и травы", text: "Натуральный источник энергии и питания для кожи в SPA-практиках — очищение и восстановление." },
  { icon: "ᛟ", title: "Пройти таро-расклад", text: "Карты помогут раскрыть ваши текущие потребности и подобрать программу, которая резонирует именно с вами." },
];

const benefitColors = ["#d4622a","#6aaa80","#c8923a","#e8b86d","#8abeaa"];
const benefitIconBg = ["rgba(212,98,42,0.12)","rgba(106,170,128,0.12)","rgba(200,146,58,0.12)","rgba(232,184,109,0.12)","rgba(138,190,170,0.12)"];
const benefitIconGlow = ["rgba(212,98,42,0.3)","rgba(106,170,128,0.3)","rgba(200,146,58,0.3)","rgba(232,184,109,0.3)","rgba(138,190,170,0.3)"];

function BenefitsCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % benefits.length);
    }, 3200);
  }

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div>
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${active * 100}%)` }}>
          {benefits.map((b, i) => (
            <div key={i} className="w-full flex-shrink-0 rounded-2xl p-8 text-center"
              style={{ background: "var(--eth-bg3)", border: `1px solid ${benefitColors[i]}25` }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: benefitIconBg[i],
                  border: `1.5px solid ${benefitColors[i]}40`,
                  boxShadow: `0 0 24px ${benefitIconGlow[i]}, 0 0 48px ${benefitIconGlow[i]}`,
                  animation: `pulseGold ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
                }}>
                <span className="text-3xl" style={{ filter: `drop-shadow(0 0 8px ${benefitColors[i]})` }}>{b.icon}</span>
              </div>
              <h3 className="text-2xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{b.title}</h3>
              <p className="text-sm leading-relaxed max-w-md mx-auto" style={{ color: "var(--eth-stone)" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6">
        {benefits.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); if (timerRef.current) clearInterval(timerRef.current); startTimer(); }}
            className="rounded-full transition-all duration-500"
            style={{
              width: active === i ? "28px" : "8px",
              height: "8px",
              background: active === i ? benefitColors[i] : "rgba(200,146,58,0.25)",
            }} />
        ))}
      </div>
    </div>
  );
}

const faqData = [
  { q: "Что нужно взять с собой?", a: "Только хорошее настроение и раздельный купальник. Халаты, тапочки, шапки и полотенца предоставляются." },
  { q: "Соло или группой?", a: "Посещение доступно как соло, так и группой до 4 человек. Пространство полностью ваше — никто не входит без вашего разрешения." },
  { q: "Что есть в вендинговых автоматах?", a: "В Рябина и Дым Lounge в вендинговых автоматах доступны: банные запарки, травы, скрабы и косметика, свежие цветы, фруктовые и овощные соки, салаты, безглютеновая выпечка, проростки, семечки и лечебные бады, селанк, семакс и другие новинки биохакинга." },
  { q: "Можно ли купить в подарок?", a: "Да! Оформляем красивые сертификаты на любую программу или сумму. Выберите стиль оформления и номинал прямо на сайте.", link: "/certificate", linkLabel: "Оформить сертификат" },
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
  { label: "Цены?", answer: "Зазеркалье — 8 500 ₽, Ракушка — 6 500 ₽, Сакура — 7 500 ₽, Сдобная Баня — 36 000 ₽ (2 гостя). Доп. процедуры — 3 500 ₽." },
  { label: "Что взять с собой?", answer: "Раздельный купальник и хорошее настроение 🔥 Халаты, тапочки, шапки и полотенца — предоставляются." },
  { label: "Соло или группой?", answer: "Посещение доступно соло или группой до 4 человек. Пространство полностью ваше." },
  { label: "Подарочный сертификат?", answer: "Да! Оформляем красивые сертификаты на любую программу или сумму. Выберите на странице «Сертификат» 🎁" },
  { label: "Как записаться?", answer: "Заполните форму на сайте или напишите в мессенджер. Подберём удобное время вместе 🌿" },
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

const AUDIO_CACHE_KEY = "eth_audio_cdn_url";
const UPLOAD_URL = "https://functions.poehali.dev/4dfb7fcc-c7cc-4459-ae3a-0e307c2a0fcc";
// Прямая ссылка на открытый этнический трек (Pixabay CDN, CORS разрешён для браузеров)
const ETHNIC_SRC = "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749b4b4.mp3";

function AboutAudio() {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [src, setSrc] = useState<string>(() => localStorage.getItem(AUDIO_CACHE_KEY) || ETHNIC_SRC);
  const [bars] = useState(() => [8,12,6,14,10,7,13].map((h, i) => ({ h, d: 0.35 + i * 0.1 })));
  const audioRef = useRef<HTMLAudioElement>(null);

  // При старте — пробуем сохранить файл в S3, чтобы в будущем он был на нашем CDN
  useEffect(() => {
    if (localStorage.getItem(AUDIO_CACHE_KEY)) return;
    fetch(ETHNIC_SRC)
      .then(r => r.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = async () => {
          const b64 = (reader.result as string).split(",")[1];
          try {
            const res = await fetch(UPLOAD_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ audio: b64 }),
            });
            const data = await res.json();
            if (data.url) {
              localStorage.setItem(AUDIO_CACHE_KEY, data.url);
              setSrc(data.url);
            }
          } catch (_e) { /* silent */ }
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => { /* silent */ });
  }, []);

  async function toggle() {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      setLoading(true);
      try {
        await el.play();
        setPlaying(true);
      } catch (_e) {
        // autoplay blocked — пользователь сам нажал кнопку, ничего не делаем
      }
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed bottom-24 left-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-2xl shadow-2xl"
      style={{ background: "rgba(20,15,10,0.95)", border: "1px solid rgba(200,146,58,0.22)", backdropFilter: "blur(12px)", animation: "slide-up 0.5s ease both" }}
    >
      <audio ref={audioRef} loop preload="auto" src={src} />
      <button onClick={toggle}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
        style={{ background: playing ? "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))" : "rgba(200,146,58,0.12)", color: playing ? "white" : "var(--eth-gold)", border: "1px solid rgba(200,146,58,0.25)" }}>
        {loading ? <Icon name="Loader" size={14} /> : playing ? <Icon name="Pause" size={14} /> : <Icon name="Play" size={14} />}
      </button>
      <div>
        <p className="text-xs font-medium leading-tight" style={{ color: "var(--eth-gold2)" }}>Этнический звук</p>
        <p className="text-xs opacity-50 leading-tight" style={{ color: "var(--eth-stone)" }}>{playing ? "Играет..." : "Слушать"}</p>
      </div>
      <div className="flex items-end gap-0.5 h-4">
        {bars.map((b, i) => (
          <div key={i} className="w-0.5 rounded-full transition-all" style={{
            height: playing ? `${b.h}px` : "3px",
            background: "var(--eth-gold)",
            opacity: playing ? 0.75 : 0.25,
            animation: playing ? `flicker ${b.d}s ease-in-out infinite alternate` : "none",
          }} />
        ))}
      </div>
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

// ─── Discount Modal ──────────────────────────────────────────────────────────

function DiscountModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    await sendToTelegram({ name, phone, program: "Скидка 15% (ковш)", source: "Главная — ковш" });
    setStatus("ok");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-sm rounded-3xl overflow-hidden animate-slide-up"
        style={{ background: "linear-gradient(160deg, #1e1608, #1a1410)", border: "1px solid rgba(200,146,58,0.3)", boxShadow: "0 0 60px rgba(200,146,58,0.15)" }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.6), transparent)" }} />
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition hover:opacity-70"
          style={{ background: "rgba(200,146,58,0.1)", color: "var(--eth-stone)" }}>
          <Icon name="X" size={16} />
        </button>
        <div className="px-8 pt-10 pb-8">
          {status === "ok" ? (
            <div className="text-center py-4">
              <p className="text-4xl mb-4">🔥</p>
              <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>Скидка ваша!</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--eth-stone)" }}>
                Мария свяжется с вами и подберёт программу со скидкой 15%.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-7">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm mb-4"
                  style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.08em" }}>
                  скидка 15%
                </span>
                <h3 className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                  Алхимия стихий в ковше
                </h3>
                <p className="text-sm" style={{ color: "var(--eth-stone)", fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1rem" }}>
                  Оставьте контакт — и программа с особым ценником будет ждать вас
                </p>
              </div>
              <form onSubmit={submit} className="space-y-3">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Ваше имя" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Телефон" type="tel" required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
                <button type="submit" disabled={status === "loading"}
                  className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
                  {status === "loading" ? "Отправляем..." : "Получить скидку →"}
                </button>
              </form>
            </>
          )}
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

// ─── Poetic Section ───────────────────────────────────────────────────────────

const POEM_LINES = [
  { text: "Огонь печи внемлет древним заклинаниям.", icon: "🔥", glow: "rgba(212,98,42,0.6)" },
  { text: "Пар из дубового веника окутывает тело.", icon: "💨", glow: "rgba(138,200,184,0.5)" },
  { text: "Соль земли растворяется на коже.", icon: "✦", glow: "rgba(200,146,58,0.6)" },
  { text: "Ароматы трав зовут вспомнить то, что забыто.", icon: "🌿", glow: "rgba(122,170,80,0.6)" },
];

function PoeticSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6 relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #1c1008 0%, #0f0c08 80%)" }}>

      <div className="absolute inset-0 pointer-events-none">
        {["top-8 left-[15%]","top-16 right-[12%]","bottom-12 left-[20%]","bottom-8 right-[18%]","top-1/2 left-[8%]","top-1/3 right-[6%]","bottom-1/3 left-[5%]"].map((pos, i) => (
          <span key={i} className={`absolute ${pos}`}
            style={{ color: "rgba(200,146,58,0.12)", fontSize: i % 3 === 0 ? "8px" : "5px", animation: `pulseGold ${3+i*0.6}s ease-in-out ${i*0.4}s infinite` }}>✦</span>
        ))}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(200,100,30,0.05) 0%, transparent 65%)" }} />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.35))" }} />
          <span style={{ color: "rgba(200,146,58,0.5)", fontSize: "1.5rem", animation: "pulseGold 3s ease-in-out infinite" }}>❧</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, rgba(200,146,58,0.35), transparent)" }} />
        </div>

        <div className="space-y-7 mb-12">
          {POEM_LINES.map((line, i) => (
            <div key={i} className="flex items-center justify-center gap-4 group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
                transition: `opacity 1s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.35}s, transform 1s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.35}s`,
              }}>
              <span className="text-3xl flex-shrink-0 transition-transform duration-500 group-hover:scale-125"
                style={{ filter: `drop-shadow(0 0 14px ${line.glow})` }}>
                {line.icon}
              </span>
              <p className="leading-relaxed italic text-left"
                style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.35rem",
                  color: "rgba(240,225,200,0.88)",
                  textShadow: `0 0 40px ${line.glow}`,
                }}>
                {line.text}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 1.1s ease ${0.2 + POEM_LINES.length * 0.35 + 0.2}s, transform 1.1s ease ${0.2 + POEM_LINES.length * 0.35 + 0.2}s`,
        }}>
          <div className="h-px max-w-xs mx-auto mb-7" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.3), transparent)" }} />
          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "1.4rem",
            color: "rgba(200,146,58,0.92)",
            fontStyle: "italic",
            letterSpacing: "0.03em",
            textShadow: "0 0 50px rgba(200,146,58,0.35)",
          }}>
            Доверьтесь процессу. Ваше тело уже знает путь.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.35))" }} />
          <span style={{ color: "rgba(200,146,58,0.5)", fontSize: "1.5rem", animation: "pulseGold 3s ease-in-out 1.5s infinite" }}>❧</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(90deg, rgba(200,146,58,0.35), transparent)" }} />
        </div>
      </div>
    </section>
  );
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
      <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
        Записаться на сеанс
      </h3>
      <p className="text-sm mb-6" style={{ color: "var(--eth-stone)", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>Мы свяжемся с вами для подбора удобного времени</p>
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

const CORP_LANGS = [
  { text: "Иней и Магма corp", lang: "рус" },
  { text: "Iney & Magma corp", lang: "eng" },
  { text: "إيني وماغما كورب", lang: "عربي" },
  { text: "이네이 앤 마그마 코프", lang: "한국어" },
  { text: "雪霜与熔岩公司", lang: "中文" },
  { text: "アイスとマグマコープ", lang: "日本語" },
  { text: "Iney e Magma corp", lang: "italiano" },
  { text: "Iney et Magma corp", lang: "français" },
  { text: "इनेय और मैग्मा कॉर्प", lang: "हिन्दी" },
  { text: "Иней і Магма corp", lang: "укр" },
  { text: "Iney und Magma corp", lang: "deutsch" },
  { text: "Iney y Magma corp", lang: "español" },
];

function CorpLanguageRotator() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % CORP_LANGS.length);
        setFade(true);
      }, 350);
    }, 2600);
    return () => clearInterval(t);
  }, []);

  const item = CORP_LANGS[idx];
  return (
    <div className="mb-10 animate-fade-up delay-400 flex flex-col items-center gap-1">
      <p
        style={{
          color: "var(--eth-gold)",
          letterSpacing: "0.05em",
          fontSize: "1.15rem",
          fontWeight: 300,
          opacity: fade ? 1 : 0,
          transform: fade ? "translateY(0)" : "translateY(6px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          fontFamily: idx >= 2 && idx <= 4 ? "sans-serif" : "inherit",
        }}>
        {item.text}
      </p>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--eth-stone)", opacity: fade ? 0.6 : 0, transition: "opacity 0.35s ease", textTransform: "uppercase" }}>
        {item.lang}
      </span>
    </div>
  );
}

export default function Index() {
  const navigate = useNavigate();
  const [activeProgram, setActiveProgram] = useState<typeof programs[0] | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [discountOpen, setDiscountOpen] = useState(false);

  const navItems = [
    { label: "Проект", id: "about" },
    { label: "Рябина и Дым Lounge", id: "banya-nav" },
    { label: "Ваша Карта", id: "tarot-nav" },
    { label: "Лавка", id: "shop-nav" },
    { label: "Контакты", id: "contacts" },
  ];

  function scrollTo(id: string) {
    if (id === "tarot-nav") { navigate("/tarot"); setNavOpen(false); return; }
    if (id === "shop-nav") { navigate("/shop"); setNavOpen(false); return; }
    if (id === "banya-nav") { navigate("/banya"); setNavOpen(false); return; }
    if (id === "perspektiva-nav") { navigate("/perspektiva"); setNavOpen(false); return; }
    if (id === "biohacking-nav") { navigate("/regeneration"); setNavOpen(false); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setNavOpen(false);
  }

  return (
    <div style={{ background: "var(--eth-bg)", color: "var(--eth-cream)", minHeight: "100vh" }}>
      {discountOpen && <DiscountModal onClose={() => setDiscountOpen(false)} />}

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
          <CorpLanguageRotator />


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

      {/* ── Философия — первой после Hero ── */}
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
              <p className="leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic", opacity: 0.9 }}>Касания веником — едва уловимые, убаюкивающие или глубокие, с пробивками, пробуждающими силу.</p>
              <p className="leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic", opacity: 0.9 }}>Нанесение соли — нежное, словно шёпот волн, или скрабирующее, очищающее тело и дух.</p>
              <p className="leading-relaxed mb-6" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic", opacity: 0.9 }}>Мёд — тёплый, обволакивающий, или с ледяными припарками, дарующими свежесть. Каждый момент — ваш, каждый жест — в лад с вашим ритмом.</p>
              <p className="text-sm leading-relaxed font-medium pt-5" style={{ color: "var(--eth-gold)", borderTop: "1px solid rgba(200,146,58,0.2)" }}>
                Только натуральные ингредиенты · Только живые ароматы · Только настоящий банный опыт
              </p>
            </div>
            <div className="flex flex-col justify-center gap-6">
              {[["6", "авторских\nпрограммы"], ["2–6", "гостей\nв группе"], ["3–4 ч", "погружения\nв ритуал"]].map(([num, label]) => (
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
              { sym: "🜂", title: "Огонь", sub: "Начало трансформации", text: "Жар открывает поры, выводит накопленное, даёт телу разрешение меняться.", color: "#d4622a", glow: "rgba(212,98,42,0.35)", anim: "flicker" },
              { sym: "🜄", title: "Вода", sub: "Очищение и обновление", text: "Контраст температур запускает жизненные процессы. Каждое погружение — это возвращение к себе.", color: "#4a9ec8", glow: "rgba(74,158,200,0.35)", anim: "mist-drift" },
              { sym: "🜃", title: "Земля", sub: "Мёд, соль и травы", text: "Натуральный источник энергии и питания для кожи в SPA-практиках — очищение и восстановление.", color: "#7aaa50", glow: "rgba(122,170,80,0.35)", anim: "spirit-float" },
              { sym: "🜁", title: "Воздух", sub: "Дыхание и свобода", text: "Пар, наполненный ароматами трав и смол, открывает дыхание, несёт приятные воспоминания и ощущение свободы.", color: "#8ac8b8", glow: "rgba(138,200,184,0.35)", anim: "mist-drift" },
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

      {/* ── Tarot Banner (Ваша Карта) ────────────────────── */}
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

      {/* ── Benefits (Путь к обновлению) ─────────────────── */}
      <section id="programs" className="py-24 px-6 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1a1008 0%, #0f0c08 70%)" }}>
        {/* Фоновые элементы */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.3), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.15), transparent)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(200,146,58,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.6em] mb-5" style={{ color: "var(--eth-stone)", opacity: 0.6 }}>Биохакинг & Longevity</p>
            <h2 className="text-4xl md:text-6xl font-light mb-8" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)", letterSpacing: "-0.01em" }}>
              Путь к обновлению<br /><em style={{ color: "var(--eth-gold)", fontSize: "0.75em" }}>на всех уровнях</em>
            </h2>
            {/* Цитата — стильная горизонтальная карточка */}
            <div className="max-w-3xl mx-auto rounded-2xl relative overflow-hidden"
              style={{ background: "rgba(200,146,58,0.04)", border: "1px solid rgba(200,146,58,0.15)" }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(200,146,58,0.5), transparent)" }} />
              <div className="px-8 py-7">
                <span className="block text-3xl mb-3 opacity-30" style={{ color: "var(--eth-gold)", fontFamily: "Georgia, serif" }}>"</span>
                <p className="text-lg md:text-xl leading-relaxed font-light"
                  style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)", fontSize: "1.15rem", fontStyle: "normal", letterSpacing: "0.01em" }}>
                  Баня — это храм регенерации, где стихии помогают человеку обрести баланс.{" "}
                  <em style={{ color: "var(--eth-gold)", opacity: 0.85 }}>
                    Каждая программа — это продуманный ритуал, в котором жар, пар, травы и прикосновения работают как единая система восстановления.
                  </em>
                </p>
              </div>
            </div>
          </div>
          <BenefitsCarousel />

          {/* Quote block */}
          <div className="mt-14 text-center">
            <button onClick={() => setDiscountOpen(true)} className="relative inline-block group bg-transparent border-0 outline-none cursor-pointer">
              <p className="md:text-4xl font-light italic transition-opacity group-hover:opacity-70 text-lg"
                style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", opacity: 0.9 }}>"Алхимия стихий в ковше"</p>
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0"
                style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.08em", fontFamily: "'Golos Text', sans-serif", fontStyle: "normal", boxShadow: "0 4px 16px rgba(200,146,58,0.4)" }}>
                скидка 15%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Poetic Interlude — с анимацией ───────────────── */}
      <PoeticSection />

      {/* ── О проекте (перед FAQ) ───────────────────────── */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 30% 60%, #2a0e08 0%, #1a1410 50%, #0f0c08 100%)" }}>

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
              <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "var(--eth-stone)" }}>О проекте:</p>
              <h2 className="text-5xl md:text-7xl font-light leading-tight mb-6"
                style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Иней<br />&amp; Магма<br /><em style={{ fontSize: "0.65em", opacity: 0.8 }}></em>
              </h2>
              <p className="text-base leading-relaxed my-3 text-justify" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.1rem" }}>Синтез древних традиций и инноваций. Мы создаём решения в области регенеративной медицины, опираясь на два столпа: проверенные веками практики оздоровления и восстановления, и современные «чит‑коды» биохакинга.</p>

              <div className="space-y-5 mt-6">
                {[
                  { color: "rgba(212,98,42,0.6)", label: "МАГМА", title: "Обновление", text: "Раскалённый жар пробуждает то, что дремало годами. Тело вспоминает силу, а душа — смелость меняться. Первый шаг к новому — здесь." },
                  { color: "rgba(122,171,158,0.6)", label: "ИНЕЙ", title: "Возврат к себе", text: "Холодный поток смывает всё наносное. Остаётся только суть — тихая, настоящая. Вы снова слышите себя." },
                  { color: "rgba(200,146,58,0.6)", label: "ПАР", title: "Расслабление", text: "Пар обволакивает, как объятие. Мышцы отпускают, мысли растворяются. Остаётся только тепло и покой." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
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

              <p className="text-base leading-relaxed mt-6 text-justify" style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.0rem", opacity: 0.85 }}>Проект в основе которого лежит Алхимия. Процесс, объединяющий противоположности: обжигающую магму, рвущуюся из глубин земли, и хрустальный иней, сотканный из дыхания зимы — их синергия создаёт Целебный Пар, благодаря которому мы запускаем процесс регенерации.</p>
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
                <path d="M70 135 Q68 120 72 108 Q76 96 73 84" stroke="rgba(200,220,255,0.2)" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-1"/>
                <path d="M90 132 Q88 117 92 105 Q96 93 93 78" stroke="rgba(200,220,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" className="steam-2"/>
                <path d="M108 135 Q106 120 110 108 Q114 96 111 82" stroke="rgba(200,220,255,0.18)" strokeWidth="2" fill="none" strokeLinecap="round" className="steam-3"/>
                <ellipse cx="90" cy="145" rx="60" ry="18" fill="rgba(40,60,80,0.9)" stroke="rgba(200,146,58,0.6)" strokeWidth="1.5"/>
                <path d="M30 145 Q28 185 90 188 Q152 185 150 145 Z" fill="rgba(25,45,65,0.95)" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5"/>
                <ellipse cx="90" cy="148" rx="52" ry="12" fill="rgba(20,40,80,0.9)"/>
                <ellipse cx="90" cy="148" rx="50" ry="10" fill="url(#starwater)" opacity="0.9"/>
                <ellipse cx="75" cy="146" rx="12" ry="3" fill="rgba(180,220,255,0.25)" transform="rotate(-15 75 146)"/>
                <ellipse cx="105" cy="150" rx="8" ry="2" fill="rgba(180,220,255,0.15)" transform="rotate(10 105 150)"/>
                <text x="78" y="150" fontSize="7" fill="rgba(200,230,255,0.7)">★</text>
                <text x="96" y="153" fontSize="5" fill="rgba(200,230,255,0.5)">✦</text>
                <text x="65" y="153" fontSize="4" fill="rgba(200,230,255,0.4)">★</text>
                <rect x="148" y="135" width="45" height="8" rx="4" fill="rgba(40,30,20,0.95)" stroke="rgba(200,146,58,0.5)" strokeWidth="1.5"/>
                <rect x="185" y="131" width="8" height="16" rx="4" fill="rgba(40,30,20,0.95)" stroke="rgba(200,146,58,0.4)" strokeWidth="1"/>
                <path d="M50 165 Q90 170 130 165" stroke="rgba(200,146,58,0.3)" strokeWidth="1" fill="none"/>
              </svg>
            </div>
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] whitespace-nowrap"
              style={{ color: "var(--eth-gold)", opacity: 0.5 }}>Алхимия стихий</p>
            <div className="absolute top-4 right-0 text-2xl animate-float" style={{ color: "var(--eth-gold)", opacity: 0.2 }}>◆</div>
            <div className="absolute bottom-8 left-0 text-xl animate-float delay-300" style={{ color: "var(--eth-gold)", opacity: 0.15 }}>◇</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/ladle:opacity-100 transition-all duration-700 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(10,6,2,0.92) 0%, rgba(10,6,2,0.7) 100%)", borderRadius: "50%", backdropFilter: "blur(2px)" }}>
              <div className="text-center px-4">
                <p className="text-xs uppercase tracking-[0.35em] mb-3" style={{ color: "var(--eth-gold)", opacity: 0.7 }}>◈</p>
                <p className="font-light leading-snug mb-3" style={{ fontFamily: "'Cormorant', serif", fontSize: "1.05rem", color: "var(--eth-gold2)" }}>
                  Бронируйте с пометкой<br /><em style={{ color: "var(--eth-gold)" }}>«Алхимия Стихий»</em>.
                </p>
                <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--eth-smoke)", opacity: 0.85, fontFamily: "'Cormorant', serif", fontSize: "0.9rem", fontStyle: "italic" }}>
                  Тогда программа будет создана специально для вас — каждое действие, каждый элемент, каждая пауза.
                </p>
                <p className="text-sm font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)", letterSpacing: "0.1em" }}>
                  Выдох. Новое начало
                </p>
              </div>
            </div>
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
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>Ждём Вас у Огня</h2>
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

              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={() => navigate("/certificate")}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl text-sm uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, rgba(200,146,58,0.25), rgba(180,100,40,0.18))", color: "var(--eth-gold)", border: "1px solid rgba(200,146,58,0.35)", fontWeight: 600, letterSpacing: "0.1em" }}>
                  <Icon name="Gift" size={16} />
                  Сертификат
                </button>
                <button
                  onClick={() => navigate("/tradition")}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl text-sm uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, rgba(155,127,181,0.2), rgba(100,80,140,0.15))", color: "#b99fd8", border: "1px solid rgba(155,127,181,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>
                  <Icon name="Sparkles" size={16} />
                  Традиция
                </button>
                <button
                  onClick={() => navigate("/perspektiva")}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl text-sm uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, rgba(100,80,200,0.2), rgba(80,60,180,0.12))", color: "rgba(180,160,240,0.85)", border: "1px solid rgba(120,100,200,0.3)", fontWeight: 600, letterSpacing: "0.1em" }}>
                  <Icon name="TreePine" size={16} />
                  Перспектива
                </button>
                <button
                  onClick={() => navigate("/regeneration")}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl transition-all hover:scale-[1.02] hover:shadow-xl text-sm uppercase tracking-wider"
                  style={{ background: "linear-gradient(135deg, rgba(200,146,58,0.15), rgba(212,98,42,0.1))", color: "rgba(232,184,109,0.85)", border: "1px solid rgba(200,146,58,0.25)", fontWeight: 600, letterSpacing: "0.1em" }}>
                  <Icon name="Zap" size={16} />
                  БиоХакинг
                </button>
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
        <p className="text-xs tracking-widest" style={{ color: "var(--eth-stone)", opacity: 0.5 }}>Longevity. Регенеративная банная практика.</p>
      </footer>

      {activeProgram && <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />}
      <Chatbot />
    </div>
  );
}