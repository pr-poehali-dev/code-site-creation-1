import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "@/components/ui/icon";

const BOOKING_URL = "https://functions.poehali.dev/4dd43fc7-c646-4678-982b-a88d1a76f014";

const PROGRAMS = [
  "Свежесть полей · 3 ч · 2 гостя",
  "Шёпот предков · 3 ч · 4–6 гостей",
  "Вглубь лесных троп · 4 ч · 2 гостя",
  "Тайны тумана · 4 ч · 4–6 гостей",
  "Молочные берега · 3 ч · 2 гостя",
  "Терпкий родник · 3 ч · 2 гостя",
];

// Слоты времени
const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDate() {
  const d = new Date();
  d.setMonth(d.getMonth() + 3);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", weekday: "long" });
}

export default function Booking() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselectedProgram = params.get("program") || "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: preselectedProgram,
    date: "",
    time: "",
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const canStep1 = form.name.trim() && form.phone.trim() && form.email.includes("@");
  const canStep2 = form.program && form.date && form.time;

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setDone(true);
      } else {
        setError("Что-то пошло не так. Попробуйте ещё раз или напишите нам в Max.");
      }
    } catch {
      setError("Ошибка соединения. Проверьте интернет или напишите нам в Max.");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "radial-gradient(ellipse at 50% 30%, #2a1808 0%, #0f0c08 80%)" }}>
        <div className="text-6xl mb-6" style={{ filter: "drop-shadow(0 0 20px rgba(200,146,58,0.5))" }}>🔥</div>
        <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.6)" }}>Запись подтверждена</p>
        <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,220,180,0.97)" }}>
          Вы записаны!
        </h1>
        <div className="rounded-2xl px-8 py-6 mb-8 max-w-md w-full text-left space-y-3"
          style={{ background: "rgba(200,146,58,0.06)", border: "1px solid rgba(200,146,58,0.2)" }}>
          <p className="text-sm" style={{ color: "rgba(240,220,180,0.8)" }}>
            <span style={{ color: "#c8923a" }}>Программа:</span> {form.program.split(" · ")[0]}
          </p>
          <p className="text-sm" style={{ color: "rgba(240,220,180,0.8)" }}>
            <span style={{ color: "#c8923a" }}>Дата:</span> {formatDate(form.date)}
          </p>
          <p className="text-sm" style={{ color: "rgba(240,220,180,0.8)" }}>
            <span style={{ color: "#c8923a" }}>Время:</span> {form.time}
          </p>
        </div>
        <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: "rgba(220,200,180,0.55)", fontFamily: "'Cormorant', serif", fontSize: "1rem", fontStyle: "italic" }}>
          Письмо с подтверждением отправлено на {form.email}. За несколько часов до визита вы получите QR-код и пароль на дверь.
        </p>
        <button onClick={() => navigate("/banya")}
          className="px-8 py-3 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.03]"
          style={{ background: "rgba(200,146,58,0.15)", color: "rgba(240,200,140,0.9)", border: "1px solid rgba(200,146,58,0.3)" }}>
          Вернуться
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-16" style={{ background: "radial-gradient(ellipse at 50% 0%, #1a1008 0%, #0f0c08 70%)" }}>
      <div className="max-w-xl mx-auto">

        {/* Back */}
        <button onClick={() => navigate("/banya")} className="flex items-center gap-2 mb-10 opacity-50 hover:opacity-80 transition-opacity"
          style={{ color: "rgba(200,146,58,0.8)" }}>
          <Icon name="ArrowLeft" size={16} />
          <span className="text-xs uppercase tracking-wider">Назад</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.5em] mb-3" style={{ color: "rgba(200,146,58,0.5)" }}>Рябина & Дым Lounge</p>
          <h1 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.97)" }}>
            Онлайн-запись
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
                style={{
                  background: step >= s ? "rgba(200,146,58,0.25)" : "rgba(255,255,255,0.04)",
                  border: step >= s ? "1px solid rgba(200,146,58,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  color: step >= s ? "#c8923a" : "rgba(255,255,255,0.25)",
                }}>
                {s}
              </div>
              {s < 3 && <div className="w-8 h-px" style={{ background: step > s ? "rgba(200,146,58,0.4)" : "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </div>

        {/* Step 1: Данные гостя */}
        {step === 1 && (
          <div className="space-y-5">
            <p className="text-center text-sm mb-6" style={{ color: "rgba(200,180,255,0.4)", fontFamily: "'Cormorant', serif", fontSize: "1.05rem", fontStyle: "italic" }}>
              Шаг 1 · Ваши данные
            </p>
            {[
              { label: "Имя", key: "name", type: "text", placeholder: "Как вас зовут?" },
              { label: "Телефон", key: "phone", type: "tel", placeholder: "+7 (___) ___-__-__" },
              { label: "Email", key: "email", type: "email", placeholder: "для подтверждения записи" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(200,146,58,0.6)" }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  className="w-full px-5 py-3.5 rounded-xl outline-none transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(200,146,58,0.2)",
                    color: "rgba(240,225,200,0.9)",
                    fontSize: "0.95rem",
                  }}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(200,146,58,0.6)" }}>
                Пожелания (необязательно)
              </label>
              <textarea
                placeholder="Особые запросы, аллергии, пожелания к программе..."
                value={form.comment}
                onChange={e => set("comment", e.target.value)}
                rows={3}
                className="w-full px-5 py-3.5 rounded-xl outline-none transition-all resize-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,146,58,0.2)",
                  color: "rgba(240,225,200,0.9)",
                  fontSize: "0.95rem",
                }}
              />
            </div>
            <button
              onClick={() => setStep(2)}
              disabled={!canStep1}
              className="w-full py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: canStep1 ? "linear-gradient(135deg, rgba(200,146,58,0.4), rgba(180,100,40,0.3))" : "rgba(255,255,255,0.05)",
                color: "rgba(240,200,140,0.95)",
                border: "1px solid rgba(200,146,58,0.3)",
                fontWeight: 600,
              }}>
              Далее →
            </button>
          </div>
        )}

        {/* Step 2: Программа, дата и время */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-center text-sm mb-6" style={{ color: "rgba(200,180,255,0.4)", fontFamily: "'Cormorant', serif", fontSize: "1.05rem", fontStyle: "italic" }}>
              Шаг 2 · Программа и время
            </p>

            {/* Программа */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(200,146,58,0.6)" }}>
                Программа
              </label>
              <div className="space-y-2">
                {PROGRAMS.map((prog) => (
                  <button key={prog} onClick={() => set("program", prog)}
                    className="w-full text-left px-5 py-3.5 rounded-xl transition-all"
                    style={{
                      background: form.program === prog ? "rgba(200,146,58,0.15)" : "rgba(255,255,255,0.03)",
                      border: form.program === prog ? "1px solid rgba(200,146,58,0.45)" : "1px solid rgba(200,146,58,0.1)",
                      color: form.program === prog ? "rgba(240,200,140,0.95)" : "rgba(220,200,180,0.55)",
                      fontSize: "0.9rem",
                    }}>
                    {prog}
                  </button>
                ))}
              </div>
            </div>

            {/* Дата */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: "rgba(200,146,58,0.6)" }}>
                Дата
              </label>
              <input
                type="date"
                value={form.date}
                min={getMinDate()}
                max={getMaxDate()}
                onChange={e => set("date", e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl outline-none"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,146,58,0.2)",
                  color: "rgba(240,225,200,0.9)",
                  fontSize: "0.95rem",
                  colorScheme: "dark",
                }}
              />
              {form.date && (
                <p className="mt-2 text-xs italic" style={{ color: "rgba(200,146,58,0.6)" }}>{formatDate(form.date)}</p>
              )}
            </div>

            {/* Время */}
            <div>
              <label className="block text-xs uppercase tracking-wider mb-3" style={{ color: "rgba(200,146,58,0.6)" }}>
                Время начала
              </label>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.map((t) => (
                  <button key={t} onClick={() => set("time", t)}
                    className="py-2.5 rounded-xl text-sm transition-all"
                    style={{
                      background: form.time === t ? "rgba(200,146,58,0.2)" : "rgba(255,255,255,0.03)",
                      border: form.time === t ? "1px solid rgba(200,146,58,0.5)" : "1px solid rgba(200,146,58,0.1)",
                      color: form.time === t ? "rgba(240,200,140,0.95)" : "rgba(220,200,180,0.5)",
                    }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(220,200,180,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                ← Назад
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canStep2}
                className="flex-[2] py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: canStep2 ? "linear-gradient(135deg, rgba(200,146,58,0.4), rgba(180,100,40,0.3))" : "rgba(255,255,255,0.05)",
                  color: "rgba(240,200,140,0.95)",
                  border: "1px solid rgba(200,146,58,0.3)",
                  fontWeight: 600,
                }}>
                Далее →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Подтверждение */}
        {step === 3 && (
          <div className="space-y-6">
            <p className="text-center text-sm mb-6" style={{ color: "rgba(200,180,255,0.4)", fontFamily: "'Cormorant', serif", fontSize: "1.05rem", fontStyle: "italic" }}>
              Шаг 3 · Подтверждение
            </p>

            <div className="rounded-2xl p-6 space-y-4"
              style={{ background: "rgba(200,146,58,0.05)", border: "1px solid rgba(200,146,58,0.2)" }}>
              {[
                { label: "Имя", val: form.name },
                { label: "Телефон", val: form.phone },
                { label: "Email", val: form.email },
                { label: "Программа", val: form.program.split(" · ")[0] },
                { label: "Дата", val: formatDate(form.date) },
                { label: "Время", val: form.time },
                ...(form.comment ? [{ label: "Пожелания", val: form.comment }] : []),
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-start gap-4">
                  <span className="text-xs uppercase tracking-wider flex-shrink-0" style={{ color: "rgba(200,146,58,0.6)" }}>{label}</span>
                  <span className="text-sm text-right" style={{ color: "rgba(240,225,200,0.85)" }}>{val}</span>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-sm text-center px-4 py-3 rounded-xl"
                style={{ color: "#e87070", background: "rgba(232,112,112,0.08)", border: "1px solid rgba(232,112,112,0.2)" }}>
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:opacity-70"
                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(220,200,180,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                ← Назад
              </button>
              <button
                onClick={submit}
                disabled={loading}
                className="flex-[2] py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.02] disabled:opacity-60"
                style={{
                  background: "linear-gradient(135deg, rgba(200,146,58,0.5), rgba(180,100,40,0.4))",
                  color: "rgba(240,200,140,0.97)",
                  border: "1px solid rgba(200,146,58,0.4)",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                }}>
                {loading ? "Отправляем..." : "Записаться"}
              </button>
            </div>

            <p className="text-center text-xs" style={{ color: "rgba(200,146,58,0.35)" }}>
              После записи вам придёт письмо на {form.email}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
