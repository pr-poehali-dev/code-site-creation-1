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

// ─── Tarot cards data ─────────────────────────────────────────────────────────

const tarotCards = [
  {
    id: "star",
    symbol: "✦",
    name: "Звезда",
    archetype: "XVIII",
    keywords: ["Надежда", "Обновление", "Свет"],
    meaning: "Вы ищете глубокое восстановление и внутренний свет. Тело просит нежности и питания.",
    program: "Кабы я была... Царица",
    programDesc: "Цветочный пар, уход за волосами и кожей, звуковая медитация",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.3)",
  },
  {
    id: "empress",
    symbol: "♛",
    name: "Императрица",
    archetype: "III",
    keywords: ["Изобилие", "Женственность", "Расцвет"],
    meaning: "Пришло время окружить себя красотой и заботой. Ваше тело жаждет роскоши и тепла.",
    program: "Кабы я была... Царица",
    programDesc: "Королевский уход, питание волос и кожи, чан с травами",
    color: "#b87a6a",
    glow: "rgba(184,122,106,0.3)",
  },
  {
    id: "moon",
    symbol: "☽",
    name: "Луна",
    archetype: "XVIII",
    keywords: ["Интуиция", "Глубина", "Очищение"],
    meaning: "Вы готовы к глубокому очищению — физическому и эмоциональному. Пора выпустить всё лишнее.",
    program: "Летний Бриз",
    programDesc: "Медовый пилинг, медитация погружения, парафинотерапия",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.3)",
  },
  {
    id: "sun",
    symbol: "☀",
    name: "Солнце",
    archetype: "XIX",
    keywords: ["Радость", "Энергия", "Ясность"],
    meaning: "Тело просит лёгкости и тепла. Вы готовы к возрождению — яркому и радостному.",
    program: "Летний Бриз",
    programDesc: "Лёгкий травяной пар, бодрящий пилинг, контрастные прикосновения",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.35)",
  },
  {
    id: "world",
    symbol: "◉",
    name: "Мир",
    archetype: "XXI",
    keywords: ["Завершение", "Гармония", "Целостность"],
    meaning: "Вы на пороге нового цикла. Тело готово к полному обновлению и перезагрузке.",
    program: "Сладкая Япония",
    programDesc: "Японские техники очищения, контрастные купели, звуки ханга",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.3)",
  },
  {
    id: "hermit",
    symbol: "🕯",
    name: "Отшельник",
    archetype: "IX",
    keywords: ["Покой", "Уединение", "Мудрость"],
    meaning: "Вам нужна тишина и глубокий покой. Тело просит уединения и внутренней работы.",
    program: "Сладкая Япония",
    programDesc: "Медитативный пар, звуковые практики, церемония сада камней",
    color: "#8a7a65",
    glow: "rgba(138,122,101,0.3)",
  },
  {
    id: "wheel",
    symbol: "⊛",
    name: "Колесо Фортуны",
    archetype: "X",
    keywords: ["Перемены", "Цикл", "Удача"],
    meaning: "Время перемен. Ваш организм готов к мощному обновлению на всех уровнях.",
    program: "Сдобная Баня",
    programDesc: "Полная программа на ваш выбор, звуковая медитация на сеновале",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.3)",
  },
  {
    id: "strength",
    symbol: "∞",
    name: "Сила",
    archetype: "XI",
    keywords: ["Сила", "Стойкость", "Страсть"],
    meaning: "В вас живёт огромная внутренняя сила. Дайте телу мощную перезагрузку, которую оно заслуживает.",
    program: "Сдобная Баня",
    programDesc: "Глубокое парение, глубокотканный массаж, контраст купелей",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.35)",
  },
];

// ─── Card component ───────────────────────────────────────────────────────────

function TarotCard({ card, isFlipped, onClick }: {
  card: typeof tarotCards[0];
  isFlipped: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative group"
      style={{ perspective: "1000px", width: "100%", aspectRatio: "2/3" }}
    >
      <div
        className="w-full h-full transition-all duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
        }}
      >
        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1410, #2a1f14)",
            border: "1px solid rgba(200,146,58,0.2)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.5)",
          }}
        >
          {/* Ornamental back pattern */}
          <div className="w-full h-full rounded-2xl flex flex-col items-center justify-center p-4"
            style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(200,146,58,0.03) 8px, rgba(200,146,58,0.03) 16px)" }}>
            <span className="text-4xl mb-3 opacity-40" style={{ color: "var(--eth-gold)" }}>◆</span>
            <div className="w-12 h-px mb-2" style={{ background: "rgba(200,146,58,0.3)" }} />
            <span className="text-xs uppercase tracking-[0.3em] opacity-40" style={{ color: "var(--eth-gold)" }}>Таро</span>
            <div className="w-12 h-px mt-2" style={{ background: "rgba(200,146,58,0.3)" }} />
          </div>
          {/* Hover hint */}
          <div className="absolute bottom-3 opacity-0 group-hover:opacity-60 transition-opacity">
            <p className="text-xs tracking-widest" style={{ color: "var(--eth-gold)" }}>открыть</p>
          </div>
        </div>

        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-4"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `radial-gradient(ellipse at 50% 30%, ${card.glow}, transparent 70%), linear-gradient(135deg, #211b14, #1a1410)`,
            border: `1px solid ${card.color}40`,
            boxShadow: `0 0 30px ${card.glow}, 0 4px 30px rgba(0,0,0,0.5)`,
          }}
        >
          <p className="text-xs mb-3 tracking-widest opacity-50" style={{ color: card.color }}>{card.archetype}</p>
          <span className="text-5xl mb-3 block" style={{ color: card.color }}>{card.symbol}</span>
          <h3 className="text-xl font-light mb-3 text-center" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            {card.name}
          </h3>
          <div className="flex flex-wrap gap-1 justify-center mb-3">
            {card.keywords.map(k => (
              <span key={k} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${card.color}15`, color: card.color, fontSize: "10px" }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

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
          <p className="text-sm text-center" style={{ color: "#e57373" }}>
            Ошибка. Напишите Марии напрямую в Telegram.
          </p>
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

export default function Tarot() {
  const navigate = useNavigate();
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [selectedCard, setSelectedCard] = useState<typeof tarotCards[0] | null>(null);
  const [step, setStep] = useState<"intro" | "spread" | "result">("intro");
  const [shuffling, setShuffling] = useState(false);

  function handleShuffle() {
    setShuffling(true);
    setFlippedCards(new Set());
    setSelectedCard(null);
    setTimeout(() => setShuffling(false), 800);
    setStep("spread");
  }

  function handleCardClick(card: typeof tarotCards[0]) {
    if (step !== "spread") return;
    if (flippedCards.has(card.id)) {
      setSelectedCard(card);
      setStep("result");
      return;
    }
    // Flip only one at a time
    setFlippedCards(new Set([card.id]));
    setTimeout(() => {
      setSelectedCard(card);
      setStep("result");
    }, 900);
  }

  function reset() {
    setStep("intro");
    setFlippedCards(new Set());
    setSelectedCard(null);
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

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #9b7fb5, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c8923a, transparent 70%)", filter: "blur(50px)" }} />
        </div>

        <div className="relative text-center max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.4))" }} />
              <span className="text-sm tracking-[0.4em] uppercase" style={{ color: "var(--eth-gold)", opacity: 0.6 }}>◆ ◇ ◆</span>
              <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.4))" }} />
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.5em] mb-5 animate-fade-up" style={{ color: "var(--eth-stone)" }}>
            Индивидуальный подход
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-4 animate-fade-up delay-100"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Магия Таро<br /><em>и ваша программа</em>
          </h1>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.25))" }} />
            <span style={{ color: "var(--eth-gold)", opacity: 0.5 }}>✦</span>
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.25))" }} />
          </div>

          <p className="text-base md:text-lg leading-relaxed mb-5 animate-fade-up delay-200"
            style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.2rem", fontStyle: "italic" }}>
            Каждый человек уникален, и его путь к гармонии должен быть особенным.
          </p>
          <p className="text-sm leading-relaxed mb-5 animate-fade-up delay-300"
            style={{ color: "var(--eth-smoke)", opacity: 0.8, maxWidth: "520px", margin: "0 auto 1.25rem" }}>
            Я верю, что интуиция и мудрость карт Таро могут стать прекрасным дополнением к процессу выбора идеальной спа-программы. Перед началом сеанса мы обращаемся к картам — чтобы раскрыть ваши текущие потребности и желания.
          </p>
          <p className="text-sm leading-relaxed animate-fade-up delay-400"
            style={{ color: "var(--eth-smoke)", opacity: 0.8, maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            На основе этого я составлю программу, которая будет резонировать именно с вами, обеспечивая тотальное обновление организма.
          </p>

          <button
            onClick={() => document.getElementById("spread")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl animate-fade-up delay-500"
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
              { num: "I", title: "Встреча", text: "Перед сеансом мы садимся вместе. Вы задаёте намерение — чего хотите достичь: расслабления, очищения, восстановления сил." },
              { num: "II", title: "Карта", text: "Вы вытягиваете карту. Я читаю её в контексте вашего состояния и потребностей — не гадание, а язык образов и интуиции." },
              { num: "III", title: "Программа", text: "На основе карты я составляю или корректирую программу специально для вас: выбираю травы, техники, ароматы и ритмы сеанса." },
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

      {/* ── Card spread ─────────────────────────────────── */}
      <section id="spread" className="py-24 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e1530 0%, #0f0c08 60%)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Интерактивный расклад</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Выберите свою карту
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--eth-stone)" }}>
              Сосредоточьтесь на своём состоянии прямо сейчас. Какая карта притягивает взгляд?
            </p>
          </div>

          {/* Step: intro */}
          {step === "intro" && (
            <div className="text-center">
              {/* Preview cards stacked */}
              <div className="flex justify-center mb-10">
                <div className="relative w-32" style={{ height: "190px" }}>
                  {[0,1,2].map(i => (
                    <div key={i} className="absolute w-full rounded-2xl"
                      style={{
                        height: "190px",
                        top: `${-i * 4}px`,
                        left: `${i * 2}px`,
                        background: "linear-gradient(135deg, #1a1410, #2a1f14)",
                        border: "1px solid rgba(200,146,58,0.2)",
                        zIndex: 3 - i,
                        transform: `rotate(${(i - 1) * 3}deg)`,
                      }}>
                      <div className="w-full h-full rounded-2xl flex items-center justify-center"
                        style={{ background: "repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(200,146,58,0.03) 8px, rgba(200,146,58,0.03) 16px)" }}>
                        <span className="text-3xl opacity-30" style={{ color: "var(--eth-gold)" }}>◆</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleShuffle}
                className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.12em" }}>
                Перетасовать колоду
              </button>
            </div>
          )}

          {/* Step: spread */}
          {step === "spread" && (
            <div>
              <div className={`grid grid-cols-4 gap-3 md:gap-4 mb-8 transition-all duration-700 ${shuffling ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
                {tarotCards.map(card => (
                  <TarotCard
                    key={card.id}
                    card={card}
                    isFlipped={flippedCards.has(card.id)}
                    onClick={() => handleCardClick(card)}
                  />
                ))}
              </div>
              <p className="text-center text-xs tracking-widest uppercase" style={{ color: "var(--eth-stone)", opacity: 0.5 }}>
                Нажмите на карту, которая притягивает
              </p>
            </div>
          )}

          {/* Step: result */}
          {step === "result" && selectedCard && (
            <div className="max-w-2xl mx-auto animate-slide-up">
              <div className="rounded-2xl overflow-hidden mb-8"
                style={{ background: "var(--eth-bg2)", border: `1px solid ${selectedCard.color}30` }}>

                {/* Card result header */}
                <div className="px-8 py-8 text-center"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${selectedCard.glow}, transparent 70%)` }}>
                  <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: selectedCard.color, opacity: 0.7 }}>
                    Ваша карта
                  </p>
                  <span className="text-7xl block mb-4" style={{ color: selectedCard.color }}>{selectedCard.symbol}</span>
                  <h3 className="text-4xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                    {selectedCard.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: "var(--eth-stone)" }}>Аркан {selectedCard.archetype}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedCard.keywords.map(k => (
                      <span key={k} className="text-xs px-3 py-1 rounded-full"
                        style={{ background: `${selectedCard.color}15`, color: selectedCard.color, border: `1px solid ${selectedCard.color}25` }}>
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-6" style={{ borderTop: "1px solid rgba(200,146,58,0.1)" }}>
                  {/* Reading */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--eth-stone)" }}>Послание карты</p>
                    <p className="text-lg leading-relaxed italic"
                      style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", fontSize: "1.2rem" }}>
                      «{selectedCard.meaning}»
                    </p>
                  </div>

                  {/* Recommended program */}
                  <div className="rounded-xl p-5"
                    style={{ background: `${selectedCard.color}08`, border: `1px solid ${selectedCard.color}20` }}>
                    <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--eth-stone)" }}>
                      Рекомендованная программа
                    </p>
                    <h4 className="text-2xl font-light mb-2"
                      style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                      {selectedCard.program}
                    </h4>
                    <p className="text-sm" style={{ color: "var(--eth-smoke)", opacity: 0.8 }}>{selectedCard.programDesc}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex-1 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
                  Записаться на сеанс
                </button>
                <button onClick={reset}
                  className="flex-1 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:opacity-70"
                  style={{ border: "1px solid rgba(200,146,58,0.3)", color: "var(--eth-gold2)", letterSpacing: "0.12em" }}>
                  Другая карта
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Quote ───────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl block mb-8 opacity-40" style={{ color: "#9b7fb5" }}>◆</span>
          <p className="text-3xl md:text-4xl font-light italic leading-relaxed mb-6"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            «Карты не предсказывают будущее — они отражают то, что уже живёт внутри вас. Они помогают мне услышать вас точнее»
          </p>
          <p className="text-sm" style={{ color: "var(--eth-stone)" }}>— Мария, пармастер</p>
        </div>
      </section>

      {/* ── Booking ─────────────────────────────────────── */}
      <section id="booking" className="py-24 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #2a1808 0%, #1a1410 60%, #0f0c08 100%)" }}>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.3))" }} />
              <span style={{ color: "var(--eth-gold)", opacity: 0.5 }}>◆ ◇ ◆</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.3))" }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Записаться<br /><em>на таро-сеанс</em>
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--eth-stone)" }}>
              Я свяжусь с вами и мы вместе выберем время и формат
            </p>
          </div>

          <TarotBookingForm selectedCard={selectedCard} />
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <button onClick={() => navigate("/")}
          className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold)", opacity: 0.6, letterSpacing: "0.1em" }}>
          ← Вернуться к программам
        </button>
      </footer>
    </div>
  );
}