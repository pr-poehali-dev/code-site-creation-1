import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const services = [
  {
    category: "Биохакинг тела",
    rune: "ᚢ",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.3)",
    items: [
      "Криокапсула",
      "LED-панели для терапии светом",
      "Гидромассажная ванна (с родниковой водой, морской солью, травяными настоями, грязью: сапропелевая / иловая / торфяная)",
      "Бандажные обёртывания водорослевые",
      "Массаж",
      "Альгинатные маски",
      "Маски для волос",
      "Баня со SPA-процедурами: мойка берёзовым веником, перчаткой кесе, медово-травяной пилинг, ароматерапия",
    ],
  },
  {
    category: "Капельницы и инъекционная косметология",
    rune: "ᚱ",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.3)",
    items: [
      "Капельницы",
      "PRP-терапия",
      "NCTF",
      "PDRN",
      "Инъекции микроколост",
      "Мезоай",
      "Мезоксантин",
      "Субцизия от рубцов в сочетании с инъекциями варёной PRP-терапии или собственного жира",
    ],
  },
  {
    category: "Аппаратная косметология",
    rune: "ᛚ",
    color: "#b87a6a",
    glow: "rgba(184,122,106,0.3)",
    items: [
      "Шлифовки лица Fotona, Halo",
      "Лазерная эпиляция",
      "Удаление сосудистых звёздочек, гемангиом, новообразований, винных пятен",
      "Интимное отбеливание",
      "Перманент бровей и губ",
      "Эндосфера",
      "Icoon",
      "Onda",
      "BTL X Wave",
      "ИзоДжей",
      "Процедура тунелизации от целлюлита и растяжек",
    ],
  },
  {
    category: "Лицо и уход",
    rune: "ᚷ",
    color: "#8abeaa",
    glow: "rgba(138,190,170,0.3)",
    items: [
      "HydraFacial + локальная чистка + пилинг + маска",
      "Массаж лица: скульптурный, буккальный + маска",
      "Крио-массаж",
      "Крио-капсула",
    ],
  },
  {
    category: "Тело и фитнес",
    rune: "ᛟ",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.3)",
    items: [
      "Хот-йога",
      "Хот-сайкл",
      "Растяжка",
      "Хот-пилатес",
    ],
  },
  {
    category: "Руки, ноги, волосы",
    rune: "ᚹ",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.3)",
    items: [
      "Кислотный педикюр",
      "Маникюр с восстановлением ногтей",
      "Пилинг головы",
      "Стрижка, укладка",
    ],
  },
  {
    category: "Ясли для собак",
    rune: "ᚫ",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.3)",
    items: [
      "Груминг",
      "SPA",
      "Массаж",
      "Игры и активности",
      "Видеонаблюдение для хозяев",
    ],
  },
];

function Particle({ style }: { style: React.CSSProperties }) {
  return <div className="absolute rounded-full pointer-events-none" style={style} />;
}

function AmbientParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    width: 2 + Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
    dur: 3 + Math.random() * 4,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <Particle
          key={p.id}
          style={{
            width: `${p.width}px`,
            height: `${p.width}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: "rgba(200,146,58,0.6)",
            boxShadow: "0 0 6px rgba(200,146,58,0.4)",
            animation: `pulseGold ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Regeneration() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#0a0806", color: "var(--eth-cream)" }}
    >
      <AmbientParticles />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(200,146,58,0.06) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(122,171,158,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,8,6,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(200,146,58,0.1)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold)" }}
        >
          <Icon name="ArrowLeft" size={18} />
          <span className="text-sm tracking-wider" style={{ fontFamily: "'Cormorant', serif" }}>
            Иней и Магма
          </span>
        </button>
        <span
          className="text-xs uppercase tracking-[0.35em]"
          style={{ color: "rgba(200,146,58,0.5)" }}
        >
          БиоХакинг
        </span>
      </nav>

      {/* Hero */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1a1008 0%, #0d0a06 60%, #0a0806 100%)",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(200,146,58,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          className="relative"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <p
            className="text-xs uppercase tracking-[0.5em] mb-8"
            style={{ color: "rgba(200,146,58,0.6)", letterSpacing: "0.4em" }}
          >
            Иней и Магма corp.
          </p>

          <div className="eth-divider mb-8">
            <span style={{ color: "var(--eth-gold)", fontSize: "1.5rem" }}>ᚢ ᚱ ᛚ ᚷ ᛟ</span>
          </div>

          <h1
            className="text-5xl md:text-8xl font-light leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--eth-gold2)",
              textShadow: "0 0 80px rgba(200,146,58,0.25)",
            }}
          >
            Регенерация
          </h1>

          <p
            className="text-xl md:text-2xl font-light italic mb-4 max-w-2xl mx-auto"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--eth-smoke)",
              lineHeight: 1.6,
            }}
          >
            Создание персонализированных стратегий биохакинга и авторские программы регенеративной практики
          </p>

          <p
            className="text-4xl md:text-5xl font-light mt-6 mb-8 tracking-widest"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--eth-gold)",
              letterSpacing: "0.2em",
              textShadow: "0 0 40px rgba(200,146,58,0.4)",
              fontStyle: "italic",
            }}
          >
            БиоХакинг
          </p>

          <p
            className="text-sm max-w-xl mx-auto leading-relaxed"
            style={{ color: "rgba(200,180,150,0.6)" }}
          >
            Включая комплекс авторских процедур для восстановления тела, лица и духа
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href="https://max.ru/+79186860650"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #5b3bb5, #3d2490)",
                color: "white",
                textDecoration: "none",
                letterSpacing: "0.12em",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z" />
              </svg>
              Написать в Max
            </a>
            <a
              href="tel:+79186860650"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:opacity-70"
              style={{
                border: "1px solid rgba(200,146,58,0.35)",
                color: "var(--eth-gold2)",
                textDecoration: "none",
                letterSpacing: "0.12em",
              }}
            >
              <Icon name="Phone" size={16} />
              Позвонить
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-gold">
          <Icon name="ChevronDown" size={18} color="var(--eth-gold)" />
        </div>
      </section>

      {/* Services */}
      <section className="relative py-20 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="eth-divider mb-6"><span>◆ ◇ ◆</span></div>
            <h2
              className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}
            >
              Авторские программы включают
            </h2>
            <p
              className="text-base italic max-w-xl mx-auto"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", opacity: 0.8 }}
            >
              Полный комплекс восстановления — от клеточного уровня до внешнего преображения
            </p>
          </div>

          <div className="space-y-6">
            {services.map((svc, idx) => (
              <div
                key={svc.category}
                className="rounded-2xl p-7 eth-card"
                style={{
                  background: "var(--eth-bg2)",
                  borderLeft: `3px solid ${svc.color}`,
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + idx * 0.1}s`,
                }}
              >
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-light"
                    style={{
                      background: `rgba(${svc.color.match(/\d+/g)?.join(",")},0.12)`,
                      border: `1.5px solid ${svc.color}40`,
                      boxShadow: `0 0 20px ${svc.glow}`,
                      color: svc.color,
                      fontFamily: "'Cormorant', serif",
                    }}
                  >
                    {svc.rune}
                  </div>
                  <div>
                    <h3
                      className="text-xl font-light"
                      style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}
                    >
                      {svc.category}
                    </h3>
                    <div
                      className="w-8 h-px mt-2"
                      style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 pl-0 md:pl-19">
                  {svc.items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <span
                        className="flex-shrink-0 mt-1.5 text-xs"
                        style={{ color: svc.color, opacity: 0.7 }}
                      >
                        ◆
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--eth-smoke)", opacity: 0.85 }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-6 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, #1a1008 0%, #0a0806 70%)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="eth-divider mb-8"><span style={{ color: "var(--eth-ember)" }}>❧</span></div>
          <h2
            className="text-4xl md:text-5xl font-light mb-4"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}
          >
            Ваша персональная стратегия
          </h2>
          <p
            className="text-lg italic mb-10 leading-relaxed"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", opacity: 0.8 }}
          >
            Каждая программа создаётся индивидуально под ваши цели и особенности организма
          </p>
          <a
            href="https://max.ru/+79186860650"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))",
              color: "white",
              textDecoration: "none",
              letterSpacing: "0.15em",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z" />
            </svg>
            Записаться в Max
          </a>
          <div className="eth-divider mt-10"><span style={{ color: "var(--eth-ember)" }}>❧</span></div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: "1px solid rgba(200,146,58,0.08)" }}
      >
        <p
          className="text-xs tracking-widest"
          style={{ color: "rgba(200,146,58,0.3)", fontFamily: "'Cormorant', serif" }}
        >
          Иней &amp; Магма corp. · Мария · Пармастер
        </p>
      </footer>
    </div>
  );
}
