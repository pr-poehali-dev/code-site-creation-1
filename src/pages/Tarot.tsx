import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TELEGRAM_URL = "https://functions.poehali.dev/b19212c6-df7b-49bb-9d3d-e1121d88dacb";

async function sendToTelegram(data: Record<string, string>) {
  const res = await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

// ─── 6 карт — по одной на каждую программу ───────────────────────────────────

const tarotCards = [
  {
    id: "svezhest",
    symbol: "🌿",
    archetype: "VI",
    name: "Влюблённые",
    keywords: ["Нежность", "Гармония", "Единство"],
    meaning: "Карта говорит: вам нужна мягкая перезагрузка вдвоём. Тепло, которое объединяет и исцеляет — аромат трав, медовое прикосновение, дубовый вениковый ритуал восстановят ваш внутренний баланс.",
    program: "Свежесть полей",
    programTagline: "3 часа · 2 гостя",
    programEffect: "Мягкое восстановление · Ароматерапия · Медовый уход",
    programPrice: "от 21 000 ₽",
    programGuests: "2 гостя · 3 часа",
    procedures: [
      "Церемония первого пара с арома-травами",
      "Классическое парение дубовыми вениками с переворотом",
      "Медово-травяной массаж-скраб",
    ],
    extra: "При дополнении чаном — 1 час в подарок. Чан: 7 000 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.25)",
    bgPattern: "linear-gradient(135deg, #0e1a14, #1a1410)",
  },
  {
    id: "shepot",
    symbol: "ᛟ",
    archetype: "V",
    name: "Иерофант",
    keywords: ["Традиция", "Мудрость", "Единство"],
    meaning: "Карта говорит: сила — в общем ритуале. Тёплый чан, звуковая медитация, первый пар с травами — это не просто баня, это церемония, где каждый из вашей группы обретает покой.",
    program: "Шёпот предков",
    programTagline: "3 часа · 4–6 гостей",
    programEffect: "Звуковая медитация · Чан с травами · Ароматный пар",
    programPrice: "от 6 500 ₽ / гость",
    programGuests: "4–6 гостей · 3 часа",
    procedures: [
      "Тёплый чан с травами и фруктами",
      "Церемония первого пара с арома-травами",
      "Звуковая медитация",
    ],
    extra: "",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.25)",
    bgPattern: "linear-gradient(135deg, #180e22, #1a1410)",
  },
  {
    id: "vglub",
    symbol: "🌲",
    archetype: "XIV",
    name: "Умеренность",
    keywords: ["Баланс", "Глубина", "Преображение"],
    meaning: "Карта говорит: вы готовы к глубокому путешествию внутрь себя. Пихтовые веники, солевой скраб, медовый массаж в парной и авторский лимонад — полное погружение без компромиссов.",
    program: "Вглубь лесных троп",
    programTagline: "4 часа · 2 гостя",
    programEffect: "Детокс · Медовый массаж · Пихтовое парение",
    programPrice: "от 29 000 ₽",
    programGuests: "2 гостя · 4 часа",
    procedures: [
      "Тёплый чан с травами и фруктами",
      "Церемония первого пара с арома-травами",
      "Солевое выкатывание-скраб",
      "Классическое парение на пихтовых вениках",
      "Медовый массаж в парной",
      "Холодный авторский лимонад",
    ],
    extra: "",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.25)",
    bgPattern: "linear-gradient(135deg, #1c1308, #1a1410)",
  },
  {
    id: "tainy",
    symbol: "🌫",
    archetype: "XVIII",
    name: "Луна",
    keywords: ["Тайна", "Интуиция", "Выбор"],
    meaning: "Карта говорит: прислушайтесь к себе — сегодня ваше тело само укажет, что ему нужно. Чан с фруктами, первый пар и одна процедура на ваш выбор — ритуал, который вы создаёте сами.",
    program: "Тайны тумана",
    programTagline: "4 часа · 4–6 гостей",
    programEffect: "Чан с фруктами · Персональный выбор · Групповой ритуал",
    programPrice: "от 9 000 ₽ / гость",
    programGuests: "4–6 гостей · 4 часа",
    procedures: [
      "Тёплый чан с травами и фруктами",
      "Церемония первого пара с арома-травами",
      "Одна услуга на выбор: лёгкое парение / медовая ладка / омовение мылом и рукавицей / солевое выкатывание с контрастами",
    ],
    extra: "",
    color: "#6aaad0",
    glow: "rgba(106,170,208,0.25)",
    bgPattern: "linear-gradient(135deg, #0a1420, #1a1410)",
  },
  {
    id: "moloko",
    symbol: "🥛",
    archetype: "III",
    name: "Императрица",
    keywords: ["Нежность", "Красота", "Питание"],
    meaning: "Карта говорит: ваше тело жаждет мягкой заботы и питания. Молочко для кожи, рукавица кесе и классическое парение с пихтой под голову — ритуал для тех, кто хочет ощутить себя любимой.",
    program: "Молочные берега",
    programTagline: "3 часа · 2 гостя",
    programEffect: "Питание кожи · Кесе очищение · Нежный пар",
    programPrice: "от 12 000 ₽",
    programGuests: "2 гостя · 3 часа",
    procedures: [
      "Прогрев в парной",
      "Парение классическое с холодной пихтой под голову",
      "Очищение тела рукавицей кесе",
      "Молочко для тела",
    ],
    extra: "",
    color: "#e8d5c0",
    glow: "rgba(232,213,192,0.2)",
    bgPattern: "linear-gradient(135deg, #1e180e, #1a1410)",
  },
  {
    id: "rodnik",
    symbol: "🍊",
    archetype: "XVII",
    name: "Звезда",
    keywords: ["Свежесть", "Бодрость", "Очищение"],
    meaning: "Карта говорит: вам нужна яркая, бодрящая перезагрузка. Контрастное парение с грейпфрутом, мыльный spa-уход берёзовыми вениками — тело обновится, как родник после дождя.",
    program: "Терпкий родник",
    programTagline: "3 часа · 2 гостя",
    programEffect: "Контрастное парение · Мыльный уход · Цитрусовый детокс",
    programPrice: "от 8 500 ₽",
    programGuests: "2 гостя · 3 часа",
    procedures: [
      "Прогрев в парной",
      "Парение классическое контрастно-минеральное с грейпфрутом",
      "Мыльный spa-уход по телу берёзовыми вениками",
    ],
    extra: "",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.25)",
    bgPattern: "linear-gradient(135deg, #1e0e06, #1a1410)",
  },
];

// ─── Single card with flip ────────────────────────────────────────────────────

function TarotCard({
  card,
  isFlipped,
  onClick,
}: {
  card: typeof tarotCards[0];
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative group focus:outline-none"
      style={{ perspective: "1200px", width: "100%", aspectRatio: "2/3.2" }}
      aria-label={`Карта ${card.name}`}
    >
      <div
        className="w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
        }}
      >
        {/* ── Back ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(160deg, #211b14, #1a1410)",
            border: "1px solid rgba(200,146,58,0.18)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          }}
        >
          {/* Diagonal stripe texture */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 12px)" }} />
          {/* Inner border */}
          <div className="absolute inset-3 rounded-xl opacity-20"
            style={{ border: "1px solid #c8923a" }} />

          <span className="text-5xl mb-3 opacity-30 relative z-10" style={{ color: "#c8923a" }}>◆</span>
          <div className="w-10 h-px mb-2 relative z-10" style={{ background: "rgba(200,146,58,0.3)" }} />
          <span className="text-xs uppercase tracking-[0.35em] opacity-30 relative z-10" style={{ color: "#c8923a" }}>Таро</span>
          <div className="w-10 h-px mt-2 relative z-10" style={{ background: "rgba(200,146,58,0.3)" }} />

          {/* Hover hint */}
          <p className="absolute bottom-4 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-50 transition-all duration-300"
            style={{ color: "#c8923a" }}>открыть</p>
        </div>

        {/* ── Front ── */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-3 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: card.bgPattern,
            border: `1px solid ${card.color}35`,
            boxShadow: `0 0 40px ${card.glow}, 0 8px 40px rgba(0,0,0,0.6)`,
          }}
        >
          <div className="absolute inset-0 opacity-20"
            style={{ background: `radial-gradient(ellipse at 50% 30%, ${card.glow}, transparent 65%)` }} />

          <p className="text-xs tracking-widest relative z-10 mb-2 opacity-50" style={{ color: card.color }}>{card.archetype}</p>
          <span className="text-5xl block mb-2 relative z-10" style={{ color: card.color }}>{card.symbol}</span>
          <h3 className="text-lg font-light text-center relative z-10 leading-tight"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            {card.name}
          </h3>
          <div className="flex flex-wrap gap-1 justify-center mt-2 relative z-10">
            {card.keywords.map(k => (
              <span key={k} className="rounded-full px-2 py-0.5"
                style={{ background: `${card.color}18`, color: card.color, fontSize: "9px", letterSpacing: "0.05em" }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Program detail panel ─────────────────────────────────────────────────────

function ProgramPanel({ card, onBook, onReset }: {
  card: typeof tarotCards[0];
  onBook: () => void;
  onReset: () => void;
}) {
  return (
    <div className="animate-slide-up mt-10 rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${card.color}30`, background: "var(--eth-bg2)" }}>

      {/* Top glow header */}
      <div className="px-6 md:px-10 py-8 text-center relative"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.glow}, transparent 70%)` }}>
        <p className="text-xs uppercase tracking-[0.4em] mb-3 opacity-60" style={{ color: card.color }}>Ваша карта</p>
        <span className="text-6xl block mb-3" style={{ color: card.color }}>{card.symbol}</span>
        <h3 className="text-3xl md:text-4xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          {card.name}
        </h3>
        <p className="text-xs mb-5" style={{ color: "var(--eth-stone)" }}>Аркан {card.archetype}</p>

        {/* Meaning */}
        <p className="text-base md:text-lg leading-relaxed italic max-w-lg mx-auto"
          style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", fontSize: "1.15rem" }}>
          «{card.meaning}»
        </p>
      </div>

      {/* Program info */}
      <div className="px-6 md:px-10 py-8" style={{ borderTop: `1px solid ${card.color}15` }}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--eth-stone)" }}>Рекомендованная программа</p>
            <h4 className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              {card.program}
            </h4>
            <p className="text-sm italic mt-1" style={{ color: card.color }}>{card.programTagline}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{card.programPrice}</p>
            <p className="text-xs mt-1" style={{ color: "var(--eth-stone)" }}>{card.programGuests}</p>
          </div>
        </div>

        {/* Effects */}
        <div className="flex flex-wrap gap-2 mb-6">
          {card.programEffect.split(" · ").map(e => (
            <span key={e} className="text-xs px-3 py-1 rounded-full"
              style={{ background: `${card.color}12`, color: card.color, border: `1px solid ${card.color}25` }}>
              {e}
            </span>
          ))}
        </div>

        {/* Procedures */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--eth-stone)" }}>Состав программы</p>
          <ul className="space-y-2.5">
            {card.procedures.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--eth-smoke)" }}>
                <span className="mt-1 flex-shrink-0 text-xs" style={{ color: card.color }}>◆</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Extra */}
        {card.extra && (
          <div className="rounded-xl px-4 py-3 mb-6"
            style={{ background: `${card.color}08`, border: `1px solid ${card.color}18` }}>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--eth-stone)" }}>Можно дополнить</p>
            <p className="text-sm" style={{ color: card.color }}>{card.extra}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onBook}
            className="flex-1 py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
            Записаться на программу
          </button>
          <button onClick={onReset}
            className="flex-1 py-3.5 rounded-xl text-sm tracking-widest uppercase transition-all hover:opacity-70"
            style={{ border: "1px solid rgba(200,146,58,0.25)", color: "var(--eth-gold2)", letterSpacing: "0.12em" }}>
            Выбрать другую карту
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tarot Booking Form ───────────────────────────────────────────────────────

function TarotBookingForm({ selectedCard }: { selectedCard: typeof tarotCards[0] | null }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intention, setIntention] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    const ok = await sendToTelegram({
      name, phone,
      program: selectedCard ? selectedCard.program : "Таро-консультация",
      comment: intention,
      source: "Таро-страница",
      ...(selectedCard ? { tarotCard: `${selectedCard.symbol} ${selectedCard.name}` } : {}),
    });
    setStatus(ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(155,127,181,0.06)", border: "1px solid rgba(155,127,181,0.2)" }}>
        <p className="text-5xl mb-4">✨</p>
        <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          Заявка отправлена!
        </h3>
        <p className="text-sm" style={{ color: "var(--eth-stone)" }}>
          Мария свяжется с вами и мы проведём ваш особенный ритуал
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-8"
      style={{ background: "rgba(200,146,58,0.04)", border: "1px solid rgba(200,146,58,0.15)" }}>
      <div className="space-y-4">
        <input required value={name} onChange={e => setName(e.target.value)}
          placeholder="Ваше имя" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        <input required value={phone} onChange={e => setPhone(e.target.value)}
          placeholder="Телефон или Telegram" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        {selectedCard && (
          <div className="px-4 py-3 rounded-xl flex items-center gap-2"
            style={{ background: `${selectedCard.color}10`, border: `1px solid ${selectedCard.color}25` }}>
            <span style={{ color: selectedCard.color }}>{selectedCard.symbol}</span>
            <p className="text-sm" style={{ color: "var(--eth-smoke)" }}>
              Карта: <strong style={{ color: selectedCard.color }}>{selectedCard.name}</strong> → {selectedCard.program}
            </p>
          </div>
        )}
        <textarea value={intention} onChange={e => setIntention(e.target.value)}
          placeholder="Расскажите о своём намерении — чего хотите достичь на сеансе" rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        {status === "err" && (
          <p className="text-sm text-center" style={{ color: "#e57373" }}>Ошибка. Напишите Марии напрямую в Telegram.</p>
        )}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.15em" }}>
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Tarot() {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState<string | null>(null);
  const [selected, setSelected] = useState<typeof tarotCards[0] | null>(null);
  const [showBooking, setShowBooking] = useState(false);

  function handleCardClick(card: typeof tarotCards[0]) {
    if (flipped === card.id) return; // already flipped
    setFlipped(card.id);
    setSelected(null);
    setShowBooking(false);
    // small delay so flip animation plays before panel appears
    setTimeout(() => setSelected(card), 500);
  }

  function handleReset() {
    setFlipped(null);
    setSelected(null);
    setShowBooking(false);
  }

  function handleBook() {
    setShowBooking(true);
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  return (
    <div style={{ background: "var(--eth-bg)", color: "var(--eth-cream)", minHeight: "100vh" }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(26,20,16,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,146,58,0.12)" }}>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold2)" }}>
          <Icon name="ArrowLeft" size={18} />
          <span className="text-sm tracking-wider" style={{ fontFamily: "'Cormorant', serif" }}>Мария · Пармастер</span>
        </button>
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--eth-stone)" }}>Таро</p>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 40%, #2a1808 0%, #1a1410 55%, #0a0806 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #9b7fb5, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c8923a, transparent 70%)", filter: "blur(50px)" }} />
        </div>

        <div className="relative text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.4))" }} />
            <span className="text-sm tracking-[0.4em]" style={{ color: "var(--eth-gold)", opacity: 0.5 }}>◆ ◇ ◆</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.4))" }} />
          </div>

          <p className="text-xs uppercase tracking-[0.5em] mb-5" style={{ color: "var(--eth-stone)" }}>Индивидуальный подход</p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-4 animate-fade-up"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Шелест Карт<br /><em>и ваша программа</em>
          </h1>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.2))" }} />
            <span style={{ color: "var(--eth-gold)", opacity: 0.4 }}>✦</span>
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.2))" }} />
          </div>

          <p className="text-base md:text-lg leading-relaxed mb-4 animate-fade-up delay-100"
            style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.2rem", fontStyle: "italic" }}>
            Каждый человек уникален, и его путь к гармонии должен быть особенным.
          </p>
          <p className="text-sm leading-relaxed mb-4 animate-fade-up delay-200"
            style={{ color: "var(--eth-smoke)", opacity: 0.75, maxWidth: "500px", margin: "0 auto 1rem" }}>Карты помогут раскрыть ваши текущие потребности и желания.</p>
          <p className="text-sm leading-relaxed mb-10 animate-fade-up delay-300"
            style={{ color: "var(--eth-smoke)", opacity: 0.75, maxWidth: "460px", margin: "0 auto 2.5rem" }}>На основе карты для вас будет выбрана программа, которая резонирует именно с вами — обеспечивая тотальное обновление организма.</p>

          <button onClick={() => document.getElementById("spread")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl animate-fade-up delay-400"
            style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.12em" }}>
            Вытянуть карту
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse-gold">
          <Icon name="ChevronDown" size={18} color="var(--eth-gold)" />
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Как это работает
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "I", title: "Выберите карту", text: "Сосредоточьтесь на своём состоянии. Какая из шести карт притягивает взгляд — та и ваша." },
              { num: "II", title: "Читайте послание", text: "Карта откроется и расскажет о ваших текущих потребностях — и порекомендует программу именно для вас." },
              { num: "III", title: "Запишитесь", text: "Запись на программу онлайн с предоплатой и сертификатом на почту." },
            ].map(s => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(155,127,181,0.1)", border: "1px solid rgba(155,127,181,0.3)" }}>
                  <span className="text-lg" style={{ fontFamily: "'Cormorant', serif", color: "#9b7fb5" }}>{s.num}</span>
                </div>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--eth-stone)" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Card Spread ─────────────────────────────────── */}
      <section id="spread" className="py-24 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e1530 0%, #0f0c08 60%)" }}>
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Расклад</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Выберите свою карту
            </h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--eth-stone)" }}>
              Сосредоточьтесь. Какая из шести карт притягивает взгляд?
            </p>
          </div>

          {/* 6 cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {tarotCards.map(card => (
              <TarotCard
                key={card.id}
                card={card}
                isFlipped={flipped === card.id}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>

          {/* Hint */}
          {!flipped && (
            <p className="text-center mt-6 text-xs tracking-widest uppercase animate-pulse-gold"
              style={{ color: "var(--eth-stone)", opacity: 0.45 }}>
              Нажмите на карту, которая притягивает
            </p>
          )}

          {/* Program panel */}
          {selected && (
            <ProgramPanel
              card={selected}
              onBook={handleBook}
              onReset={handleReset}
            />
          )}
        </div>
      </section>

      {/* ── Quote ───────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl block mb-8 opacity-30" style={{ color: "#9b7fb5" }}>◆</span>
          <p className="md:text-3xl font-light italic leading-relaxed mb-4 text-3xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Парная ведунья,<br />
            трав знахарка, огня хранительница.
          </p>
          <p className="md:text-xl font-light italic leading-relaxed mb-4 text-2xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", opacity: 0.85 }}>
            Веник шепчет, мёд питает, чаша поёт —<br />
            Тело очищается, душа покой обретёт.
          </p>
          <p className="md:text-lg font-light italic leading-relaxed text-2xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-stone)" }}>
            Каждому — свой путь, каждому — свой пар,<br />
            По обычаю древнему, по сердцу и в дар.
          </p>
        </div>
      </section>

      {/* ── Booking ─────────────────────────────────────── */}
      {showBooking && (
        <section id="booking" className="py-24 px-6"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #2a1808 0%, #1a1410 60%, #0f0c08 100%)" }}>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.3))" }} />
                <span style={{ color: "var(--eth-gold)", opacity: 0.4 }}>◆ ◇ ◆</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.3))" }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Записаться<br /><em>на сеанс</em>
              </h2>
              <p className="mt-4 text-sm" style={{ color: "var(--eth-stone)" }}>
                Мария свяжется с вами и мы выберем удобное время
              </p>
            </div>
            <TarotBookingForm selectedCard={selected} />

            {/* Telegram button */}
            <div className="mt-4 text-center">
              <p className="text-xs mb-3" style={{ color: "var(--eth-stone)" }}>или напишите напрямую</p>
              <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
                </svg>
                <span className="text-sm font-medium">Написать в Max</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <button onClick={() => navigate("/")}
          className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold)", opacity: 0.5, letterSpacing: "0.1em" }}>
          ← Вернуться к программам
        </button>
      </footer>
    </div>
  );
}