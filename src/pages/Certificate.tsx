import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TELEGRAM_URL = "https://functions.poehali.dev/b19212c6-df7b-49bb-9d3d-e1121d88dacb";
const CERT_URL = "https://functions.poehali.dev/a92f621c-1452-42d8-899e-d1a6dbe2e5bd";

async function sendToTelegram(data: Record<string, string>) {
  const res = await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

async function sendCertificate(data: Record<string, string>) {
  const res = await fetch(CERT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const programCerts = [
  {
    id: "svezhest",
    symbol: "🌿",
    name: "Свежесть полей",
    tagline: "3 часа · 2 гостя",
    price: "от 21 000 ₽",
    guests: "2 гостя",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.2)",
    bg: "linear-gradient(135deg, #0e1a18, #1a1410)",
  },
  {
    id: "shepot",
    symbol: "ᛟ",
    name: "Шёпот предков",
    tagline: "3 часа · 4–6 гостей",
    price: "от 6 500 ₽/гость",
    guests: "4–6 гостей",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.2)",
    bg: "linear-gradient(135deg, #12101e, #1a1410)",
  },
  {
    id: "les",
    symbol: "🌲",
    name: "Вглубь лесных троп",
    tagline: "4 часа · 2 гостя",
    price: "от 29 000 ₽",
    guests: "2 гостя",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.2)",
    bg: "linear-gradient(135deg, #1c1608, #1a1410)",
  },
  {
    id: "tuman",
    symbol: "🌫",
    name: "Тайны тумана",
    tagline: "4 часа · 4–6 гостей",
    price: "от 9 000 ₽/гость",
    guests: "4–6 гостей",
    color: "#6aaad0",
    glow: "rgba(106,170,208,0.2)",
    bg: "linear-gradient(135deg, #0e1620, #1a1410)",
  },
  {
    id: "moloko",
    symbol: "🥛",
    name: "Молочные берега",
    tagline: "3 часа · 2 гостя",
    price: "от 12 000 ₽",
    guests: "2 гостя",
    color: "#e8d5c0",
    glow: "rgba(232,213,192,0.2)",
    bg: "linear-gradient(135deg, #1e1a16, #1a1410)",
  },
  {
    id: "rodnik",
    symbol: "🍊",
    name: "Терпкий родник",
    tagline: "3 часа · 2 гостя",
    price: "от 8 500 ₽",
    guests: "2 гостя",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.2)",
    bg: "linear-gradient(135deg, #1e1008, #1a1410)",
  },
];

const amountCerts = [
  { id: "a8500", amount: "8 500 ₽", desc: "Свежесть полей — будни до 18:00 · 2 гостя" },
  { id: "a10500", amount: "10 500 ₽", desc: "Терпкий родник — вечер / выходные · 2 гостя" },
  { id: "a12000", amount: "12 000 ₽", desc: "Молочные берега — будни до 18:00 · 2 гостя" },
  { id: "a21000", amount: "21 000 ₽", desc: "Свежесть полей — полная стоимость · 2 гостя" },
  { id: "a29000", amount: "29 000 ₽", desc: "Вглубь лесных троп — будни до 18:00 · 2 гостя" },
  { id: "custom", amount: "Своя сумма", desc: "Укажите любую удобную сумму" },
];

const styles = [
  {
    id: "ethnic",
    name: "Этнический",
    desc: "Тёмный фон, золотые орнаменты, мистическая атмосфера",
    preview: {
      bg: "linear-gradient(135deg, #1a1410, #2a1808)",
      border: "rgba(200,146,58,0.4)",
      accent: "#c8923a",
      pattern: true,
    },
    emoji: "◆",
  },
  {
    id: "nature",
    name: "Природный",
    desc: "Светлый кремовый фон, зелёные акценты, органичные формы",
    preview: {
      bg: "linear-gradient(135deg, #f0ece0, #e8f0e4)",
      border: "rgba(74,103,65,0.4)",
      accent: "#4a6741",
      pattern: false,
    },
    emoji: "🌿",
  },
  {
    id: "luxury",
    name: "Люкс",
    desc: "Глубокий тёмно-зелёный, серебро, элегантная типографика",
    preview: {
      bg: "linear-gradient(135deg, #0d1f1a, #1a3028)",
      border: "rgba(192,192,192,0.35)",
      accent: "#c0c0c0",
      pattern: false,
    },
    emoji: "✦",
  },
  {
    id: "floral",
    name: "Цветочный",
    desc: "Пудровые оттенки, цветочные мотивы, нежность и романтика",
    preview: {
      bg: "linear-gradient(135deg, #fdf0f5, #f5e8f0)",
      border: "rgba(180,100,130,0.35)",
      accent: "#b46482",
      pattern: false,
    },
    emoji: "🌸",
  },
];

// ─── Style preview card ───────────────────────────────────────────────────────

function StylePreview({ style, selected, onClick }: {
  style: typeof styles[0];
  selected: boolean;
  onClick: () => void;
}) {
  const p = style.preview;
  const isDark = style.id === "ethnic" || style.id === "luxury";

  return (
    <button onClick={onClick}
      className="text-left rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        border: selected ? `2px solid ${p.accent}` : "1px solid rgba(200,146,58,0.12)",
        boxShadow: selected ? `0 0 30px ${p.accent}30` : "none",
      }}>
      {/* Visual preview */}
      <div className="h-28 relative flex items-center justify-center overflow-hidden" style={{ background: p.bg }}>
        {style.id === "ethnic" && (
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 10px)" }} />
        )}
        {/* Mini certificate */}
        <div className="relative z-10 px-5 py-3 rounded-lg text-center"
          style={{ border: `1px solid ${p.accent}40`, background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)" }}>
          <p className="text-lg mb-0.5" style={{ color: p.accent }}>{style.emoji}</p>
          <p className="text-xs font-medium tracking-widest uppercase"
            style={{ color: isDark ? p.accent : p.accent, fontSize: "9px", letterSpacing: "0.2em" }}>
            Подарочный сертификат
          </p>
          <div className="w-10 h-px mx-auto mt-1" style={{ background: p.accent, opacity: 0.4 }} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4" style={{ background: "var(--eth-bg2)" }}>
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium" style={{ color: "var(--eth-gold2)", fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
            {style.name}
          </p>
          {selected && (
            <span className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${p.accent}20`, color: p.accent }}>
              Выбран
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed" style={{ color: "var(--eth-stone)" }}>{style.desc}</p>
      </div>
    </button>
  );
}

// ─── Cert preview (decorative) ────────────────────────────────────────────────

function CertPreview({ certStyle, value, recipientName }: {
  certStyle: typeof styles[0];
  value: string;
  recipientName: string;
}) {
  const p = certStyle.preview;
  const isDark = certStyle.id === "ethnic" || certStyle.id === "luxury";
  const textColor = isDark ? "#f0e6d0" : "#2d2820";
  const subColor = isDark ? "rgba(240,230,208,0.5)" : "rgba(45,40,32,0.5)";

  return (
    <div className="rounded-2xl overflow-hidden relative" style={{ background: p.bg, border: `1px solid ${p.accent}35`, aspectRatio: "1.6/1" }}>
      {certStyle.id === "ethnic" && (
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 10px)" }} />
      )}
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 80% 50%, ${p.accent}15, transparent 60%)` }} />

      {/* Inner border */}
      <div className="absolute inset-3 rounded-xl pointer-events-none" style={{ border: `1px solid ${p.accent}20` }} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: p.accent, opacity: 0.7 }}>
          Иней &amp; Магма corp
        </p>
        <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: subColor }}>
          Подарочный сертификат
        </p>

        <div className="w-16 h-px mb-3" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

        <p className="font-light mb-1 leading-tight" style={{ fontFamily: "'Cormorant', serif", color: p.accent, fontSize: value && value.length > 10 ? "1.25rem" : "2rem" }}>
          {value || "Программа"}
        </p>

        {recipientName && (
          <p className="text-sm italic mt-2" style={{ color: textColor, opacity: 0.7, fontFamily: "'Cormorant', serif" }}>
            для {recipientName}
          </p>
        )}

        <div className="w-16 h-px mt-3 mb-2" style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />

        <p className="text-xs" style={{ color: subColor }}>Авторские банные программы</p>
      </div>
    </div>
  );
}

// ─── Order form ───────────────────────────────────────────────────────────────

function OrderForm({ certStyle, certValue, certType, selectedProgram }: {
  certStyle: typeof styles[0] | null;
  certValue: string;
  certType: "program" | "amount";
  selectedProgram?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [recipient, setRecipient] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [wishes, setWishes] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    const finalValue = certValue === "Своя сумма" ? customAmount : certValue;

    const ok = await sendCertificate({
      name,
      phone,
      email,
      recipient,
      certValue: finalValue,
      certType,
      certStyle: certStyle?.id || "ethnic",
      program: selectedProgram || "",
      wishes,
    });

    if (!ok) {
      await sendToTelegram({
        name, phone,
        program: `Сертификат: ${finalValue}`,
        comment: `Email: ${email || "не указан"}\nПолучатель: ${recipient || "не указан"}\nСтиль: ${certStyle?.name || "не выбран"}\nПожелания: ${wishes}`,
        source: "Страница сертификатов",
      });
    }

    setStatus("ok");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(200,146,58,0.05)", border: "1px solid rgba(200,146,58,0.2)" }}>
        <p className="text-5xl mb-4">🎁</p>
        <h3 className="text-2xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          Сертификат оформлен!
        </h3>
        {email ? (
          <p className="text-sm leading-relaxed" style={{ color: "var(--eth-stone)" }}>
            Сертификат отправлен на <span style={{ color: "var(--eth-gold)" }}>{email}</span>.<br/>
            Проверьте почту — там всё готово к дарению.
          </p>
        ) : (
          <p className="text-sm" style={{ color: "var(--eth-stone)" }}>
            Мария свяжется с вами для передачи сертификата.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input required value={name} onChange={e => setName(e.target.value)}
          placeholder="Ваше имя" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        <input required value={phone} onChange={e => setPhone(e.target.value)}
          placeholder="Телефон или Telegram" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
      </div>

      <input value={email} onChange={e => setEmail(e.target.value)}
        placeholder="Email для получения сертификата на почту" type="email"
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />

      <input value={recipient} onChange={e => setRecipient(e.target.value)}
        placeholder="Имя получателя (необязательно)" type="text"
        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
        style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />

      {certValue === "Своя сумма" && (
        <input required value={customAmount} onChange={e => setCustomAmount(e.target.value)}
          placeholder="Укажите сумму, например: 4 000 ₽" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
      )}

      {/* Summary */}
      <div className="rounded-xl px-4 py-3 space-y-1"
        style={{ background: "rgba(200,146,58,0.06)", border: "1px solid rgba(200,146,58,0.15)" }}>
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--eth-stone)" }}>
          <span>Номинал</span>
          <span style={{ color: "var(--eth-gold)" }}>{certValue || "—"}</span>
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--eth-stone)" }}>
          <span>Стиль</span>
          <span style={{ color: "var(--eth-gold)" }}>{certStyle?.name || "не выбран"}</span>
        </div>
        <div className="flex items-center justify-between text-xs" style={{ color: "var(--eth-stone)" }}>
          <span>Тип</span>
          <span style={{ color: "var(--eth-gold)" }}>{certType === "program" ? "На программу" : "На сумму"}</span>
        </div>
      </div>

      <textarea value={wishes} onChange={e => setWishes(e.target.value)}
        placeholder="Пожелания для сертификата (текст, дата вручения и т.д.)" rows={3}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
        style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />

      {status === "err" && (
        <p className="text-sm text-center" style={{ color: "#e57373" }}>Ошибка. Напишите напрямую в Max.</p>
      )}

      <button type="submit" disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
        style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.15em" }}>
        {status === "loading" ? "Отправляем..." : "Получить сертификат на почту"}
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Certificate() {
  const navigate = useNavigate();
  const [certType, setCertType] = useState<"program" | "amount">("program");
  const [selectedProgram, setSelectedProgram] = useState<typeof programCerts[0] | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<typeof amountCerts[0] | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<typeof styles[0] | null>(null);
  const [recipientPreview, setRecipientPreview] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  const certValue = certType === "program"
    ? (selectedProgram?.name ?? "")
    : (selectedAmount?.amount ?? "");

  const canProceed = certValue && selectedStyle;

  function handleProceed() {
    setShowOrder(true);
    setTimeout(() => document.getElementById("order")?.scrollIntoView({ behavior: "smooth" }), 100);
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
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--eth-stone)" }}>Сертификаты</p>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 60%, #1e1808 0%, #1a1410 55%, #0a0806 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c8923a, transparent 70%)", filter: "blur(60px)" }} />
        </div>

        <div className="relative text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.4))" }} />
            <span style={{ color: "var(--eth-gold)", opacity: 0.5 }}>◆ ◇ ◆</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.4))" }} />
          </div>

          <p className="text-xs uppercase tracking-[0.5em] mb-5" style={{ color: "var(--eth-stone)" }}>Подарок, который запомнится</p>
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-5 animate-fade-up"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Подарочный<br /><em>сертификат</em>
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--eth-smoke)", opacity: 0.8, fontFamily: "'Cormorant', serif", fontSize: "1.1rem", fontStyle: "italic" }}>
            Подарите близкому человеку ритуал восстановления. Выберите программу или сумму, стиль оформления — и мы подготовим красивый сертификат.
          </p>
        </div>
      </section>

      {/* ── Step 1: Type ─────────────────────────────────── */}
      <section className="py-16 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,146,58,0.15)", border: "1px solid rgba(200,146,58,0.3)" }}>
              <span className="text-sm" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)" }}>1</span>
            </div>
            <h2 className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Выберите тип сертификата
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { id: "program" as const, label: "На программу", desc: "Сертификат на конкретный ритуал из нашего меню", icon: "Sparkles" },
              { id: "amount" as const, label: "На сумму", desc: "Получатель сам выберет подходящую программу", icon: "Banknote" },
            ].map(t => (
              <button key={t.id} onClick={() => { setCertType(t.id); setSelectedProgram(null); setSelectedAmount(null); }}
                className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.01]"
                style={{
                  background: certType === t.id ? "rgba(200,146,58,0.08)" : "var(--eth-bg3)",
                  border: certType === t.id ? "1px solid rgba(200,146,58,0.4)" : "1px solid rgba(200,146,58,0.1)",
                }}>
                <Icon name={t.icon} size={22} color={certType === t.id ? "var(--eth-gold)" : "var(--eth-stone)"} />
                <p className="text-base font-medium mt-3 mb-1"
                  style={{ fontFamily: "'Cormorant', serif", color: certType === t.id ? "var(--eth-gold2)" : "var(--eth-smoke)", fontSize: "1.1rem" }}>
                  {t.label}
                </p>
                <p className="text-xs" style={{ color: "var(--eth-stone)" }}>{t.desc}</p>
              </button>
            ))}
          </div>

          {/* Programs */}
          {certType === "program" && (
            <div className="grid sm:grid-cols-2 gap-4 animate-slide-up">
              {programCerts.map(p => (
                <button key={p.id} onClick={() => setSelectedProgram(p)}
                  className="rounded-2xl p-5 text-left transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: selectedProgram?.id === p.id ? `${p.color}10` : "var(--eth-bg3)",
                    border: selectedProgram?.id === p.id ? `1px solid ${p.color}45` : "1px solid rgba(200,146,58,0.1)",
                  }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl" style={{ color: p.color }}>{p.symbol}</span>
                    {selectedProgram?.id === p.id && (
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${p.color}20`, color: p.color }}>Выбрана</span>
                    )}
                  </div>
                  <p className="text-base mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)", fontSize: "1.05rem" }}>{p.name}</p>
                  <p className="text-xs mb-3" style={{ color: "var(--eth-stone)" }}>{p.tagline} · {p.guests}</p>
                  <p className="text-xl font-light" style={{ fontFamily: "'Cormorant', serif", color: p.color }}>{p.price}</p>
                </button>
              ))}
            </div>
          )}

          {/* Amounts */}
          {certType === "amount" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-slide-up">
              {amountCerts.map(a => (
                <button key={a.id} onClick={() => setSelectedAmount(a)}
                  className="rounded-2xl p-4 text-left transition-all duration-200 hover:scale-[1.01]"
                  style={{
                    background: selectedAmount?.id === a.id ? "rgba(200,146,58,0.1)" : "var(--eth-bg3)",
                    border: selectedAmount?.id === a.id ? "1px solid rgba(200,146,58,0.45)" : "1px solid rgba(200,146,58,0.1)",
                  }}>
                  <p className="text-xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{a.amount}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--eth-stone)" }}>{a.desc}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Step 2: Style ────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(200,146,58,0.15)", border: "1px solid rgba(200,146,58,0.3)" }}>
              <span className="text-sm" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)" }}>2</span>
            </div>
            <h2 className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Выберите стиль оформления
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {styles.map(s => (
              <StylePreview key={s.id} style={s}
                selected={selectedStyle?.id === s.id}
                onClick={() => setSelectedStyle(s)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Step 3: Preview ──────────────────────────────── */}
      {(certValue || selectedStyle) && (
        <section className="py-16 px-6 animate-slide-up" style={{ background: "var(--eth-bg2)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(200,146,58,0.15)", border: "1px solid rgba(200,146,58,0.3)" }}>
                <span className="text-sm" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)" }}>3</span>
              </div>
              <h2 className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Предпросмотр сертификата
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {selectedStyle ? (
                  <CertPreview certStyle={selectedStyle} value={certValue} recipientName={recipientPreview} />
                ) : (
                  <div className="rounded-2xl flex items-center justify-center"
                    style={{ aspectRatio: "1.6/1", background: "var(--eth-bg3)", border: "1px dashed rgba(200,146,58,0.2)" }}>
                    <p className="text-sm" style={{ color: "var(--eth-stone)" }}>Выберите стиль</p>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-sm" style={{ color: "var(--eth-stone)" }}>Имя получателя (для предпросмотра)</p>
                <input value={recipientPreview} onChange={e => setRecipientPreview(e.target.value)}
                  placeholder="например: Маша" type="text"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />

                <div className="space-y-2 pt-2">
                  {[
                    { label: "Тип", value: certType === "program" ? "На программу" : "На сумму" },
                    { label: "Номинал", value: certValue || "—" },
                    { label: "Стиль", value: selectedStyle?.name || "—" },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm py-1"
                      style={{ borderBottom: "1px solid rgba(200,146,58,0.08)" }}>
                      <span style={{ color: "var(--eth-stone)" }}>{row.label}</span>
                      <span style={{ color: "var(--eth-gold2)" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <button onClick={handleProceed} disabled={!canProceed}
                  className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
                  {canProceed ? "Оформить сертификат →" : "Выберите номинал и стиль"}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Step 4: Order form ───────────────────────────── */}
      {showOrder && (
        <section id="order" className="py-16 px-6 animate-slide-up"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #2a1808 0%, #1a1410 60%, #0f0c08 100%)" }}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(200,146,58,0.15)", border: "1px solid rgba(200,146,58,0.3)" }}>
                <span className="text-sm" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold)" }}>4</span>
              </div>
              <h2 className="text-2xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Получить на почту
              </h2>
            </div>

            <OrderForm certStyle={selectedStyle} certValue={certValue} certType={certType} selectedProgram={selectedProgram?.name} />

            <div className="mt-6 text-center">
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