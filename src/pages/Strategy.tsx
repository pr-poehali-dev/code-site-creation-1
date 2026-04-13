import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Data ─────────────────────────────────────────────────────────────────────

const allProcedures = [
  { id: "cryo", category: "БиоХакинг", emoji: "❄️", name: "Криокапсула", desc: "Холодовая терапия, регенерация" },
  { id: "led", category: "БиоХакинг", emoji: "💡", name: "LED-терапия", desc: "Световое омоложение" },
  { id: "hydro", category: "БиоХакинг", emoji: "🌊", name: "Гидромассаж", desc: "Детокс и восстановление" },
  { id: "wrap", category: "БиоХакинг", emoji: "🌿", name: "Водорослевые обёртывания", desc: "Питание и коррекция" },
  { id: "massage", category: "БиоХакинг", emoji: "🤲", name: "Авторский массаж", desc: "Расслабление и лимфодренаж" },
  { id: "alginate", category: "БиоХакинг", emoji: "✨", name: "Альгинатные маски", desc: "Лифтинг и увлажнение" },
  { id: "iv", category: "БиоХакинг", emoji: "💧", name: "Капельницы", desc: "Витамины и микроэлементы" },
  { id: "bath", category: "БиоХакинг", emoji: "🔥", name: "SPA-баня", desc: "Веник, пилинг, ароматерапия" },
  { id: "hbo", category: "БиоХакинг", emoji: "🫧", name: "Гипербарическая оксигенация", desc: "Кислород под давлением, регенерация" },
  { id: "prp", category: "Инъекции", emoji: "🩸", name: "PRP-терапия", desc: "Плазмотерапия" },
  { id: "nctf", category: "Инъекции", emoji: "✦", name: "NCTF", desc: "53 компонента молодости" },
  { id: "pdrn", category: "Инъекции", emoji: "🧬", name: "PDRN", desc: "Восстановление ДНК клеток" },
  { id: "meso", category: "Инъекции", emoji: "💉", name: "Микроколост", desc: "Равномерное питание кожи" },
  { id: "mesoeye", category: "Инъекции", emoji: "👁️", name: "Мезоай", desc: "Зона глаз, круги, отёки" },
  { id: "mesox", category: "Инъекции", emoji: "☀️", name: "Мезоксантин", desc: "Антиоксидант и сияние" },
  { id: "subcision", category: "Инъекции", emoji: "🔬", name: "Субцизия от рубцов", desc: "Коррекция рубцов и шрамов" },
  { id: "ozone", category: "Инъекции", emoji: "🌬️", name: "Озонотерапия и ВЛОК", desc: "Озон + лазерное облучение крови" },
  { id: "fotona", category: "Аппаратная", emoji: "⚡", name: "Fotona / Halo", desc: "Лазерная шлифовка лица" },
  { id: "epilate", category: "Аппаратная", emoji: "🌸", name: "Лазерная эпиляция", desc: "Навсегда" },
  { id: "vessels", category: "Аппаратная", emoji: "💎", name: "Удаление сосудов и пятен", desc: "Звёздочки, гемангиомы" },
  { id: "endo", category: "Аппаратная", emoji: "✨", name: "Эндосфера", desc: "Антицеллюлит и подтяжка" },
  { id: "onda", category: "Аппаратная", emoji: "🔥", name: "Onda & Icoon", desc: "Жиросжигание без операции" },
  { id: "btl", category: "Аппаратная", emoji: "💪", name: "BTL X-Wave", desc: "Ударные волны, целлюлит" },
  { id: "tunnel", category: "Аппаратная", emoji: "🌊", name: "ИзоДжей & тунелизация", desc: "Коррекция растяжек" },
  { id: "perm", category: "Аппаратная", emoji: "🌟", name: "Перманент бровей и губ", desc: "Естественный макияж" },
  { id: "yoga", category: "Движение", emoji: "🔥", name: "Хот-йога", desc: "Гибкость и детокс" },
  { id: "cycle", category: "Движение", emoji: "🚴", name: "Хот-сайкл", desc: "Кардио в тепле" },
  { id: "stretch", category: "Движение", emoji: "🌿", name: "Растяжка", desc: "Гибкость суставов" },
  { id: "pilates", category: "Движение", emoji: "🧘", name: "Хот-пилатес", desc: "Мышечный корсет" },
  { id: "meditation", category: "Движение", emoji: "🌙", name: "Медитация осознанности", desc: "Снижение стресса, ясность" },
  { id: "sound", category: "Движение", emoji: "🎵", name: "Звуковые медитации", desc: "Тибетские чаши, 432 Гц" },
  { id: "breath", category: "Движение", emoji: "🌬️", name: "Дыхательные практики", desc: "Пранаяма и Вим Хоф" },
  { id: "hydra", category: "SPA лицо", emoji: "💦", name: "HydraFacial", desc: "Чистка + пилинг + маска" },
  { id: "sculpt", category: "SPA лицо", emoji: "🤲", name: "Скульптурный массаж", desc: "Лифтинг без инъекций" },
  { id: "buccal", category: "SPA лицо", emoji: "👄", name: "Буккальный массаж", desc: "Меняет овал лица" },
  { id: "cryomassage", category: "SPA лицо", emoji: "❄️", name: "Крио-массаж", desc: "Сужает поры, освежает" },
  { id: "pedicure", category: "Красота", emoji: "💅", name: "Кислотный педикюр", desc: "Кожа стоп как у ребёнка" },
  { id: "nails", category: "Красота", emoji: "✨", name: "Восстановление ногтей", desc: "Маникюр + реконструкция" },
  { id: "scalp", category: "Красота", emoji: "🌿", name: "Пилинг головы", desc: "Рост и здоровье волос" },
  { id: "haircut", category: "Красота", emoji: "✂️", name: "Стрижка & укладка", desc: "Авторская стрижка" },
];

const desiredResults = [
  { id: "young", emoji: "🌸", label: "Омоложение лица" },
  { id: "slim", emoji: "✦", label: "Коррекция фигуры" },
  { id: "skin", emoji: "💎", label: "Красивая кожа" },
  { id: "relax", emoji: "🌿", label: "Глубокое расслабление" },
  { id: "energy", emoji: "⚡", label: "Энергия и тонус" },
  { id: "detox", emoji: "💧", label: "Детокс и очищение" },
  { id: "hair", emoji: "✨", label: "Здоровье волос и ногтей" },
  { id: "sport", emoji: "🔥", label: "Спортивная форма" },
  { id: "stress", emoji: "☀️", label: "Снятие стресса" },
  { id: "anti", emoji: "🧬", label: "Антивозрастная программа" },
];

const categories = ["Все", "БиоХакинг", "Инъекции", "Аппаратная", "Движение", "SPA лицо", "Красота"];

const LOGO_URL = "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/857bca83-d97b-47ea-9a5c-781078db15e4.png";

// ─── Steps ───────────────────────────────────────────────────────────────────

const STEPS = ["Процедуры", "Результат", "Контакт"];

export default function Strategy() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selected, setSelected] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const filtered = activeCategory === "Все" ? allProcedures : allProcedures.filter(p => p.category === activeCategory);

  function toggleProc(id: string) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }
  function toggleResult(id: string) {
    setResults(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  const selectedProcs = allProcedures.filter(p => selected.includes(p.id));
  const selectedResults = desiredResults.filter(r => results.includes(r.id));

  async function handleSend() {
    if (!name.trim() || !phone.trim()) return;
    setSending(true);

    const procsList = selectedProcs.map(p => `• ${p.emoji} ${p.name}`).join("\n");
    const resultsList = selectedResults.map(r => `• ${r.emoji} ${r.label}`).join("\n");

    const text = [
      "✦ *Персональная стратегия — запрос с сайта*",
      "",
      `👤 *Имя:* ${name}`,
      `📞 *Телефон/Telegram:* ${phone}`,
      "",
      `🔬 *Выбранные процедуры:*\n${procsList || "не выбраны"}`,
      "",
      `🌟 *Желаемые результаты:*\n${resultsList || "не указаны"}`,
      "",
      "📍 *Источник:* Конструктор стратегии",
    ].join("\n");

    const msg = encodeURIComponent(text);
    window.open(`https://max.ru/+79186860650?text=${msg}`, "_blank");
    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: "#0f0c08" }}>
        <img src={LOGO_URL} alt="Иней и Магма" className="w-32 h-32 object-contain mb-8" style={{ mixBlendMode: "screen", filter: "drop-shadow(0 0 20px rgba(200,146,58,0.4))" }} />
        <span className="text-6xl mb-6" style={{ color: "#c8923a" }}>✦</span>
        <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
          Стратегия отправлена!
        </h2>
        <p className="text-lg mb-10 max-w-md" style={{ color: "#c8bca8", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
          Ваше обновление уже на пути к вам — ждите сообщения
        </p>
        <button onClick={() => navigate("/regeneration")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-105"
          style={{ background: "linear-gradient(135deg, #c8923a, #e8b86d)", color: "#0f0c08", fontWeight: 700 }}>
          <Icon name="ArrowLeft" size={14} /> Вернуться
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0f0c08", color: "#f0e6d0" }}>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(15,12,8,0.96)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,146,58,0.1)" }}>
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate("/regeneration")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "#c8923a" }}>
          <Icon name="ArrowLeft" size={18} />
          <span style={{ fontFamily: "'Cormorant', serif" }}>{step > 0 ? "Назад" : "Регенерация"}</span>
        </button>
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: i <= step ? "#c8923a" : "rgba(200,146,58,0.1)",
                    color: i <= step ? "#0f0c08" : "#8a7a65",
                    border: `1px solid ${i <= step ? "#c8923a" : "rgba(200,146,58,0.2)"}`,
                  }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className="hidden md:block text-xs" style={{ color: i === step ? "#c8923a" : "#8a7a65" }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div className="w-4 h-px" style={{ background: i < step ? "#c8923a" : "rgba(200,146,58,0.2)" }} />}
            </div>
          ))}
        </div>
        <div style={{ width: "80px" }} />
      </nav>

      <div className="pt-24 pb-16 px-4 md:px-6 max-w-4xl mx-auto">

        {/* ── Step 0: Procedures ── */}
        {step === 0 && (
          <div>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "#8a7a65" }}>Шаг 1 из 3</p>
              <h1 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
                Выберите процедуры
              </h1>
              <p className="text-base" style={{ color: "#8a7a65", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                Нажмите на всё, что вас интересует
              </p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all"
                  style={{
                    background: activeCategory === cat ? "#c8923a" : "rgba(200,146,58,0.08)",
                    color: activeCategory === cat ? "#0f0c08" : "#8a7a65",
                    border: `1px solid ${activeCategory === cat ? "#c8923a" : "rgba(200,146,58,0.15)"}`,
                    fontWeight: activeCategory === cat ? 700 : 400,
                  }}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Procedures grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {filtered.map(proc => {
                const isSelected = selected.includes(proc.id);
                return (
                  <button key={proc.id} onClick={() => toggleProc(proc.id)}
                    className="text-left rounded-2xl p-4 transition-all hover:scale-[1.02] active:scale-95"
                    style={{
                      background: isSelected ? "rgba(200,146,58,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${isSelected ? "#c8923a" : "rgba(200,146,58,0.1)"}`,
                      boxShadow: isSelected ? "0 0 20px rgba(200,146,58,0.15)" : "none",
                    }}>
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{proc.emoji}</span>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: isSelected ? "#c8923a" : "rgba(200,146,58,0.1)", border: `1px solid ${isSelected ? "#c8923a" : "rgba(200,146,58,0.2)"}` }}>
                        {isSelected && <Icon name="Check" size={11} color="#0f0c08" />}
                      </div>
                    </div>
                    <p className="text-sm font-light leading-snug mb-1" style={{ fontFamily: "'Cormorant', serif", color: isSelected ? "#e8b86d" : "#c8bca8" }}>
                      {proc.name}
                    </p>
                    <p className="text-xs" style={{ color: "#8a7a65" }}>{proc.desc}</p>
                  </button>
                );
              })}
            </div>

            {/* Selected summary */}
            {selected.length > 0 && (
              <div className="rounded-2xl p-4 mb-6 flex items-center justify-between"
                style={{ background: "rgba(200,146,58,0.08)", border: "1px solid rgba(200,146,58,0.2)" }}>
                <p className="text-sm" style={{ color: "#c8923a" }}>
                  Выбрано: <strong>{selected.length}</strong> {selected.length === 1 ? "процедура" : selected.length < 5 ? "процедуры" : "процедур"}
                </p>
                <button onClick={() => setSelected([])} className="text-xs hover:opacity-70 transition-opacity" style={{ color: "#8a7a65" }}>
                  Сбросить
                </button>
              </div>
            )}

            <button onClick={() => setStep(1)}
              className="w-full py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{
                background: selected.length > 0 ? "linear-gradient(135deg, #c8923a, #e8b86d)" : "rgba(200,146,58,0.1)",
                color: selected.length > 0 ? "#0f0c08" : "#8a7a65",
                fontWeight: 700,
                letterSpacing: "0.12em",
                border: `1px solid ${selected.length > 0 ? "transparent" : "rgba(200,146,58,0.15)"}`,
              }}>
              {selected.length > 0 ? "Далее — выбрать результат →" : "Выберите хотя бы одну процедуру"}
            </button>
            {selected.length === 0 && (
              <button onClick={() => setStep(1)} className="w-full mt-2 text-xs hover:opacity-70 transition-opacity py-2"
                style={{ color: "#8a7a65" }}>
                Пропустить этот шаг
              </button>
            )}
          </div>
        )}

        {/* ── Step 1: Results ── */}
        {step === 1 && (
          <div>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "#8a7a65" }}>Шаг 2 из 3</p>
              <h1 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
                Какой результат хотите?
              </h1>
              <p className="text-base" style={{ color: "#8a7a65", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                Выберите всё, что важно для вас
              </p>
            </div>

            {/* Selected procedures recap */}
            {selectedProcs.length > 0 && (
              <div className="rounded-2xl p-4 mb-8" style={{ background: "rgba(200,146,58,0.05)", border: "1px solid rgba(200,146,58,0.1)" }}>
                <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8a7a65" }}>Ваши процедуры:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProcs.map(p => (
                    <span key={p.id} className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(200,146,58,0.1)", color: "#c8923a", border: "1px solid rgba(200,146,58,0.2)" }}>
                      {p.emoji} {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
              {desiredResults.map(r => {
                const isSelected = results.includes(r.id);
                return (
                  <button key={r.id} onClick={() => toggleResult(r.id)}
                    className="text-center rounded-2xl p-5 transition-all hover:scale-[1.03] active:scale-95"
                    style={{
                      background: isSelected ? "rgba(200,146,58,0.15)" : "rgba(255,255,255,0.03)",
                      border: `1.5px solid ${isSelected ? "#c8923a" : "rgba(200,146,58,0.1)"}`,
                      boxShadow: isSelected ? "0 0 20px rgba(200,146,58,0.15)" : "none",
                    }}>
                    <span className="block text-3xl mb-2">{r.emoji}</span>
                    <p className="text-sm font-light" style={{ fontFamily: "'Cormorant', serif", color: isSelected ? "#e8b86d" : "#c8bca8" }}>
                      {r.label}
                    </p>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center mx-auto mt-2"
                        style={{ background: "#c8923a" }}>
                        <Icon name="Check" size={9} color="#0f0c08" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button onClick={() => setStep(2)}
              className="w-full py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] hover:shadow-xl"
              style={{
                background: results.length > 0 ? "linear-gradient(135deg, #c8923a, #e8b86d)" : "rgba(200,146,58,0.1)",
                color: results.length > 0 ? "#0f0c08" : "#8a7a65",
                fontWeight: 700,
                letterSpacing: "0.12em",
                border: `1px solid ${results.length > 0 ? "transparent" : "rgba(200,146,58,0.15)"}`,
              }}>
              {results.length > 0 ? "Далее — оформить запрос →" : "Выберите хотя бы один результат"}
            </button>
            {results.length === 0 && (
              <button onClick={() => setStep(2)} className="w-full mt-2 text-xs hover:opacity-70 transition-opacity py-2"
                style={{ color: "#8a7a65" }}>
                Пропустить этот шаг
              </button>
            )}
          </div>
        )}

        {/* ── Step 2: Contact ── */}
        {step === 2 && (
          <div>
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "#8a7a65" }}>Шаг 3 из 3</p>
              <h1 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "#e8b86d" }}>
                Куда отправить стратегию?
              </h1>
              <p className="text-base" style={{ color: "#8a7a65", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
                Мария лично свяжется и составит программу
              </p>
            </div>

            {/* Summary */}
            <div className="rounded-2xl p-6 mb-8" style={{ background: "#16120e", border: "1px solid rgba(200,146,58,0.12)" }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8a7a65" }}>Ваш запрос:</p>
              {selectedProcs.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs mb-2" style={{ color: "rgba(200,146,58,0.6)" }}>Процедуры ({selectedProcs.length}):</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProcs.map(p => (
                      <span key={p.id} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(200,146,58,0.1)", color: "#c8923a" }}>
                        {p.emoji} {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedResults.length > 0 && (
                <div>
                  <p className="text-xs mb-2" style={{ color: "rgba(200,146,58,0.6)" }}>Результаты:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedResults.map(r => (
                      <span key={r.id} className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(200,146,58,0.1)", color: "#c8923a" }}>
                        {r.emoji} {r.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedProcs.length === 0 && selectedResults.length === 0 && (
                <p className="text-sm italic" style={{ color: "#8a7a65" }}>Запрос на персональную консультацию</p>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#8a7a65" }}>Ваше имя</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Как к вам обращаться?"
                  className="w-full px-5 py-3.5 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "#16120e",
                    border: "1px solid rgba(200,146,58,0.15)",
                    color: "#f0e6d0",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(200,146,58,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(200,146,58,0.15)"}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2" style={{ color: "#8a7a65" }}>Телефон или Telegram</label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-5 py-3.5 rounded-2xl text-sm outline-none transition-all"
                  style={{
                    background: "#16120e",
                    border: "1px solid rgba(200,146,58,0.15)",
                    color: "#f0e6d0",
                    fontFamily: "'Golos Text', sans-serif",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(200,146,58,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(200,146,58,0.15)"}
                />
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={!name.trim() || !phone.trim() || sending}
              className="w-full py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
              style={{
                background: name && phone ? "linear-gradient(135deg, #c8923a, #e8b86d)" : "rgba(200,146,58,0.1)",
                color: name && phone ? "#0f0c08" : "#8a7a65",
                fontWeight: 700,
                letterSpacing: "0.12em",
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
              </svg>
              {sending ? "Отправляем..." : "Отправить мою стратегию"}
            </button>
            <p className="text-center mt-3 text-xs" style={{ color: "#8a7a65" }}>
              Ваше обновление уже ждёт · Ответим быстро
            </p>
          </div>
        )}
      </div>
    </div>
  );
}