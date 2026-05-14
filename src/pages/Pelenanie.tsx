import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Data ──────────────────────────────────────────────────────────────────────

const PROCEDURES = [
  {
    id: "pelenanie",
    top: true,
    title: "Пеленание",
    subtitle: "TOP‑процедура",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.3)",
    description:
      "Резкий глоток холода ледяной купели сменяется теплом заботливо наброшенных пледов. Вы опускаетесь на качели, отдаётесь плавному покачиванию и погружаетесь в звуковой поток медитации, которую ведёт пармастер (колокольчики нада, коши, ручеёк).",
    icon: "✦",
  },
  {
    id: "alginat",
    top: false,
    title: "Альгинатная маска для лица",
    subtitle: "",
    duration: "20 мин",
    price: "1 500 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.15)",
    description: "",
    icon: "◇",
  },
  {
    id: "kislota",
    top: false,
    title: "Кислотный пилинг для стоп",
    subtitle: "",
    duration: "15 мин",
    price: "1 500 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.15)",
    description: "",
    icon: "◇",
  },
  {
    id: "aromapara",
    top: false,
    title: "Аромапарение",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.15)",
    description: "Донник, багульник, тысячелистник, мята и др.",
    icon: "◈",
  },
  {
    id: "kese",
    top: false,
    title: "Омовение перчаткой кесе",
    subtitle: "Лучшее скрабирование",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#e8d5c0",
    glow: "rgba(232,213,192,0.15)",
    description: "Мягкий пилингующий массаж с ароматным мылом. Идеально перед обёртыванием.",
    icon: "◆",
  },
  {
    id: "sol",
    top: false,
    title: "Солевое детокс-выкатывание",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#6aaad0",
    glow: "rgba(106,170,208,0.15)",
    description: "Прокатывание соли по телу, очищение пор и эффект детоксикации.",
    icon: "◈",
  },
  {
    id: "vetiver",
    top: false,
    title: "Освежающий скраб для тела",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.15)",
    description: "Ветивер, с проливкой травяным настоем.",
    icon: "◇",
  },
  {
    id: "tsvetok",
    top: false,
    title: "Маска для лица «Цветок жизни»",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#b87a6a",
    glow: "rgba(184,122,106,0.15)",
    description: "Лён, травы и глина — увлажнение и питание.",
    icon: "✿",
  },
  {
    id: "volosi",
    top: false,
    title: "Церемония ухода за волосами",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.15)",
    description:
      "Пилинг для кожи головы с массажем силиконовыми и деревянными гребнями + маска для волос.",
    icon: "◆",
  },
  {
    id: "vannochka",
    top: false,
    title: "Ванночка для ног",
    subtitle: "",
    duration: "15 мин",
    price: "2 500 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.15)",
    description: "С молоком и ягодами или травами на выбор.",
    icon: "◇",
  },
  {
    id: "klassika",
    top: false,
    title: "Классическое парение",
    subtitle: "Любимое гостями",
    duration: "15 мин",
    price: "3 500 ₽",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.15)",
    description: "Глубокое парение с двух сторон дубовыми вениками с контрастами.",
    icon: "✦",
  },
  {
    id: "penno",
    top: false,
    title: "Пенно-берёзовое омовение",
    subtitle: "",
    duration: "20 мин",
    price: "3 500 ₽",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.15)",
    description:
      "Воздушная шапка из тёплой пены наносится и растирается свежим берёзовым веником по всему телу с двух сторон.",
    icon: "◈",
  },
  {
    id: "med",
    top: false,
    title: "Пилинг травами и глазирование мёдом",
    subtitle: "Лучший уход",
    duration: "20 мин",
    price: "4 500 ₽",
    color: "#e8b86d",
    glow: "rgba(232,184,109,0.15)",
    description:
      "Распаренные травы мягко скрабируют и питают, тёплый мёд наполняет кожу витаминами.",
    icon: "◆",
  },
  {
    id: "yagody",
    top: false,
    title: "Обёртывание тела «Нежность ягод»",
    subtitle: "",
    duration: "40 мин",
    price: "3 500 ₽",
    color: "#e05a80",
    glow: "rgba(224,90,128,0.15)",
    description: "Сметана, мёд и тёртые сезонные ягоды наносятся на всё тело.",
    icon: "✿",
  },
  {
    id: "glina",
    top: false,
    title: "Обёртывание тела глиной «Цветок жизни»",
    subtitle: "",
    duration: "40 мин",
    price: "3 500 ₽",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.15)",
    description: "Лён, травы и глина наносятся на все зоны, питая и увлажняя.",
    icon: "✿",
  },
  {
    id: "bandazh_zones",
    top: false,
    title: "Бандажное обёртывание (по зонам)",
    subtitle: "",
    duration: "35 мин",
    price: "3 500 ₽",
    color: "#b87a6a",
    glow: "rgba(184,122,106,0.15)",
    description:
      "Бёдра / ягодицы / живот / руки. Эластичные бинты, пропитанные активными компонентами. Уменьшение объёмов, сокращение целлюлита, выравнивание рельефа, снижение отёчности, упругость кожи.",
    icon: "◆",
  },
  {
    id: "bandazh_full",
    top: false,
    title: "Бандажное обёртывание (всё тело)",
    subtitle: "",
    duration: "50 мин",
    price: "5 500 ₽",
    color: "#b87a6a",
    glow: "rgba(184,122,106,0.15)",
    description: "",
    icon: "◆",
  },
  {
    id: "klassika2",
    top: false,
    title: "Классика 2.0",
    subtitle: "",
    duration: "30 мин",
    price: "6 500 ₽",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.15)",
    description:
      "Глубокое парение с двух сторон, с выходом в купель и догревом в парной. При дополнении пеленанием со звуковой медитацией (2 500 ₽) — молочная ванночка для ног в подарок.",
    icon: "✦",
  },
  {
    id: "kofe",
    top: false,
    title: "Медово-лимонно-кофейный пилинг с прогревом",
    subtitle: "",
    duration: "15 мин",
    price: "6 500 ₽",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.15)",
    description:
      "Пилингующие частицы с ярким ароматом наносятся массирующими движениями. Углубляем проникновение минералов лёгким парением дубовыми вениками.",
    icon: "◈",
  },
  {
    id: "chai",
    top: false,
    title: "Чайная церемония с угощениями",
    subtitle: "",
    duration: "1 час",
    price: "9 500 ₽",
    color: "#e8b86d",
    glow: "rgba(232,184,109,0.15)",
    description: "Дегустация различных чаёв.",
    icon: "✿",
  },
];

const ADDONS = [
  {
    title: "Проливка холодной газированной водой/квасом на голову",
    note: "мы знаем, что вам понравится",
    duration: "5 мин",
    price: "500 ₽",
  },
  {
    title: "Контраст ледяными грейпфрутами/льдом",
    note: "для любителей ярких впечатлений",
    duration: "5 мин",
    price: "500 ₽",
  },
  {
    title: "Холодный хвойный веник под голову",
    note: "глубокий аромат хвои останется в ваших воспоминаниях надолго",
    duration: "на всё время процедуры",
    price: "500 ₽",
  },
  {
    title: "Сенной полог",
    note: "для полного расслабления окунитесь в аромат луговых трав на сенном матрасе",
    duration: "на всё время процедуры",
    price: "4 500 ₽",
  },
  {
    title: "Пихтовый полог",
    note: "пихтовый аромат окутает каждый сантиметр вашего тела",
    duration: "на всё время процедуры",
    price: "8 000 ₽",
  },
];

// ─── FadeIn ────────────────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Pelenanie() {
  const navigate = useNavigate();
  const regularProcedures = PROCEDURES.filter((p) => !p.top);
  const topProcedure = PROCEDURES.find((p) => p.top)!;

  return (
    <div
      style={{
        background: "#0a0806",
        color: "var(--eth-cream, rgba(240,225,200,0.95))",
        minHeight: "100vh",
        fontFamily: "'Golos Text', sans-serif",
      }}
    >
      {/* Ambient background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse at 20% 10%, rgba(200,146,58,0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 80%, rgba(155,127,181,0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 50%, rgba(14,10,6,0.6) 0%, transparent 80%)",
          ].join(","),
        }}
      />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,8,6,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,146,58,0.1)",
        }}
      >
        <button
          onClick={() => navigate("/regeneration")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "rgba(200,146,58,0.8)" }}
        >
          <Icon name="ArrowLeft" size={18} />
          <span
            className="text-sm tracking-wider"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Рябина &amp; Дым Lounge
          </span>
        </button>
        <button
          onClick={() => navigate("/booking")}
          className="text-xs uppercase tracking-widest px-4 py-2 rounded-xl transition-all hover:scale-[1.03]"
          style={{
            background: "rgba(200,146,58,0.12)",
            border: "1px solid rgba(200,146,58,0.25)",
            color: "rgba(200,146,58,0.9)",
          }}
        >
          Записаться
        </button>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 pt-32 pb-16 px-6 text-center">
        <FadeIn delay={0}>
          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "rgba(200,146,58,0.5)" }}
          >
            Рябина &amp; Дым Lounge
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1
            className="text-5xl md:text-6xl font-light mb-4 leading-tight"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "rgba(240,225,200,0.97)",
            }}
          >
            Процедуры
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{ background: "rgba(200,146,58,0.25)" }}
            />
            <span
              className="text-xs tracking-[0.35em] uppercase"
              style={{ color: "rgba(200,146,58,0.5)" }}
            >
              авторские ритуалы
            </span>
            <div
              className="h-px flex-1 max-w-[80px]"
              style={{ background: "rgba(200,146,58,0.25)" }}
            />
          </div>
        </FadeIn>
      </section>

      {/* ── TOP Procedure: Пеленание ─────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-12 max-w-3xl mx-auto">
        <FadeIn delay={0.1}>
          <div
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(26,18,8,0.98) 0%, rgba(20,14,6,0.95) 100%)",
              border: "1px solid rgba(200,146,58,0.35)",
              boxShadow:
                "0 0 60px rgba(200,146,58,0.12), 0 0 120px rgba(200,146,58,0.06)",
              animation: "pulseGold 3s ease-in-out infinite",
            }}
          >
            {/* Glow orb */}
            <div
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(200,146,58,0.12) 0%, transparent 70%)",
              }}
            />

            {/* TOP badge */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl"
                  style={{ color: "rgba(200,146,58,0.7)" }}
                >
                  {topProcedure.icon}
                </span>
                <div>
                  <span
                    className="inline-block text-xs uppercase tracking-[0.4em] px-3 py-1 rounded-full mb-2"
                    style={{
                      background: "rgba(200,146,58,0.15)",
                      border: "1px solid rgba(200,146,58,0.3)",
                      color: "#c8923a",
                    }}
                  >
                    {topProcedure.subtitle}
                  </span>
                  <h2
                    className="text-3xl md:text-4xl font-light leading-tight"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "rgba(240,225,200,0.97)",
                    }}
                  >
                    {topProcedure.title}
                  </h2>
                </div>
              </div>
            </div>

            <p
              className="text-base leading-relaxed mb-8"
              style={{
                color: "rgba(220,200,180,0.75)",
                fontFamily: "'Cormorant', serif",
                fontSize: "1.1rem",
                fontStyle: "italic",
              }}
            >
              {topProcedure.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "rgba(200,146,58,0.5)" }}
                  >
                    Длительность
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "rgba(240,225,200,0.85)" }}
                  >
                    {topProcedure.duration}
                  </p>
                </div>
                <div
                  className="w-px h-8 self-center"
                  style={{ background: "rgba(200,146,58,0.2)" }}
                />
                <div>
                  <p
                    className="text-xs uppercase tracking-wider mb-1"
                    style={{ color: "rgba(200,146,58,0.5)" }}
                  >
                    Стоимость
                  </p>
                  <p
                    className="text-xl font-light"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: "#c8923a",
                    }}
                  >
                    {topProcedure.price}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/booking")}
                className="px-6 py-3 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,146,58,0.35), rgba(180,100,40,0.25))",
                  border: "1px solid rgba(200,146,58,0.4)",
                  color: "rgba(240,200,140,0.97)",
                }}
              >
                Записаться
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── All Procedures Grid ───────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-16 max-w-6xl mx-auto">
        <FadeIn delay={0}>
          <div className="flex items-center gap-4 mb-10">
            <div
              className="h-px flex-1"
              style={{ background: "rgba(200,146,58,0.12)" }}
            />
            <p
              className="text-xs uppercase tracking-[0.4em]"
              style={{ color: "rgba(200,146,58,0.4)" }}
            >
              все процедуры
            </p>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(200,146,58,0.12)" }}
            />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regularProcedures.map((proc, i) => (
            <FadeIn key={proc.id} delay={Math.min(i * 0.05, 0.4)}>
              <div
                className="rounded-2xl p-5 h-full flex flex-col transition-all duration-300 hover:scale-[1.015]"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${proc.color}28`,
                  boxShadow: `0 0 0 0 ${proc.glow}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 0 30px ${proc.glow}`;
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    `${proc.color}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 0 0 0 ${proc.glow}`;
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    `${proc.color}28`;
                }}
              >
                {/* Icon + title row */}
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="text-xl flex-shrink-0 mt-0.5"
                    style={{ color: proc.color, opacity: 0.8 }}
                  >
                    {proc.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    {proc.subtitle && (
                      <span
                        className="inline-block text-[10px] uppercase tracking-[0.35em] px-2 py-0.5 rounded-full mb-1.5"
                        style={{
                          background: `${proc.color}18`,
                          border: `1px solid ${proc.color}35`,
                          color: proc.color,
                        }}
                      >
                        {proc.subtitle}
                      </span>
                    )}
                    <h3
                      className="text-base font-light leading-snug"
                      style={{
                        fontFamily: "'Cormorant', serif",
                        color: "rgba(240,225,200,0.93)",
                        fontSize: "1.05rem",
                      }}
                    >
                      {proc.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                {proc.description && (
                  <p
                    className="text-xs leading-relaxed mb-4 flex-1"
                    style={{ color: "rgba(220,200,180,0.55)" }}
                  >
                    {proc.description}
                  </p>
                )}

                {/* Footer: duration + price */}
                <div
                  className="flex items-center justify-between mt-auto pt-3"
                  style={{ borderTop: `1px solid ${proc.color}18` }}
                >
                  <span
                    className="text-xs"
                    style={{ color: "rgba(220,200,180,0.4)" }}
                  >
                    {proc.duration}
                  </span>
                  <span
                    className="text-sm font-light"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      color: proc.color,
                      fontSize: "1rem",
                    }}
                  >
                    {proc.price}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Add-ons ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-4xl mx-auto">
        <FadeIn delay={0}>
          <div className="flex items-center gap-4 mb-8">
            <div
              className="h-px flex-1"
              style={{ background: "rgba(200,146,58,0.12)" }}
            />
            <p
              className="text-xs uppercase tracking-[0.4em] text-center"
              style={{ color: "rgba(200,146,58,0.4)" }}
            >
              Дополнительно к любой процедуре
            </p>
            <div
              className="h-px flex-1"
              style={{ background: "rgba(200,146,58,0.12)" }}
            />
          </div>
        </FadeIn>

        <div className="space-y-3">
          {ADDONS.map((addon, i) => (
            <FadeIn key={addon.title} delay={i * 0.06}>
              <div
                className="rounded-2xl px-5 py-4 flex items-start justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px solid rgba(200,146,58,0.1)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm mb-1"
                    style={{ color: "rgba(240,225,200,0.85)" }}
                  >
                    {addon.title}
                  </p>
                  {addon.note && (
                    <p
                      className="text-xs italic"
                      style={{ color: "rgba(200,146,58,0.5)" }}
                    >
                      {addon.note}
                    </p>
                  )}
                  <p
                    className="text-xs mt-1"
                    style={{ color: "rgba(220,200,180,0.35)" }}
                  >
                    {addon.duration}
                  </p>
                </div>
                <span
                  className="text-sm font-light flex-shrink-0"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "#c8923a",
                    fontSize: "1rem",
                  }}
                >
                  {addon.price}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-24 text-center">
        <FadeIn delay={0}>
          <div
            className="inline-block rounded-3xl px-10 py-10 max-w-lg mx-auto"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(26,18,8,0.95), rgba(10,8,6,0.95))",
              border: "1px solid rgba(200,146,58,0.2)",
            }}
          >
            <p
              className="text-xs uppercase tracking-[0.5em] mb-3"
              style={{ color: "rgba(200,146,58,0.5)" }}
            >
              Рябина &amp; Дым Lounge
            </p>
            <h3
              className="text-3xl font-light mb-3"
              style={{
                fontFamily: "'Cormorant', serif",
                color: "rgba(240,225,200,0.97)",
              }}
            >
              Выберите свой ритуал
            </h3>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{ color: "rgba(220,200,180,0.5)" }}
            >
              Запишитесь онлайн — пармастер подберёт и согласует
              <br />
              идеальную комбинацию процедур под ваш запрос
            </p>
            <button
              onClick={() => navigate("/booking")}
              className="px-10 py-4 rounded-2xl text-sm uppercase tracking-widest transition-all hover:scale-[1.04] hover:opacity-90"
              style={{
                background:
                  "linear-gradient(135deg, rgba(200,146,58,0.4), rgba(180,100,40,0.3))",
                border: "1px solid rgba(200,146,58,0.4)",
                color: "rgba(240,200,140,0.97)",
                fontWeight: 600,
              }}
            >
              Записаться
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        className="py-8 px-6 text-center"
        style={{
          background: "#070504",
          borderTop: "1px solid rgba(200,146,58,0.07)",
        }}
      >
        <button
          onClick={() => navigate("/regeneration")}
          className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          style={{ color: "rgba(200,146,58,0.4)", letterSpacing: "0.1em" }}
        >
          ← Вернуться
        </button>
      </footer>

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes pulseGold {
          0%, 100% {
            box-shadow: 0 0 60px rgba(200,146,58,0.12), 0 0 120px rgba(200,146,58,0.06);
          }
          50% {
            box-shadow: 0 0 80px rgba(200,146,58,0.22), 0 0 160px rgba(200,146,58,0.1), 0 0 0 1px rgba(200,146,58,0.15);
          }
        }
      `}</style>
    </div>
  );
}
