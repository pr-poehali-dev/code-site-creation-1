import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const services = [
  {
    category: "БиоХакинг & Персонализированные стратегии",
    color: "#c8923a",
    rune: "ᚦ",
    items: [
      "Создание персонализированных стратегий биохакинга",
      "Авторские программы регенеративной практики",
      "Криокапсула",
      "LED-панели для терапии светом",
      "Гидромассажная ванна (с родниковой водой, морской солью, травяными настоями, грязью: сапропелевая / иловая / торфяная)",
      "Бандажные обёртывания водорослевые",
      "Массаж",
      "Альгинатные маски",
      "Маски для волос",
      "Баня со SPA-процедурами: мойка берёзовым веником, перчаткой кесе, медово-травяной пилинг, ароматерапия",
      "Капельницы",
    ],
  },
  {
    category: "PRP / Инъекционные практики",
    color: "#b87a6a",
    rune: "ᚢ",
    items: [
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
    color: "#7aab9e",
    rune: "ᛚ",
    items: [
      "Шлифовки лица Fotona, Halo",
      "Лазерная эпиляция",
      "Удаление сосудистых звёздочек, гемангиом, новообразований, винных пятен",
      "Интимное отбеливание",
      "Перманент бровей и губ",
      "Эндосфера",
      "Icoon",
      "Onda",
      "BTL X-Wave",
      "ИзоДжей",
      "Процедура тунелизации от целлюлита и растяжек",
    ],
  },
  {
    category: "Хот-Йога & Движение",
    color: "#d4622a",
    rune: "ᚹ",
    items: [
      "Хот-йога",
      "Хот-сайкл",
      "Растяжка",
      "Хот-пилатес",
    ],
  },
  {
    category: "SPA & Уход за лицом",
    color: "#9b7fb5",
    rune: "ᛟ",
    items: [
      "HydraFacial + локальная чистка + пилинг + маска",
      "Массаж лица (скульптурный, буккальный) + маска",
      "Крио-массаж",
      "Крио-капсула",
    ],
  },
  {
    category: "Маникюр & Педикюр & Волосы",
    color: "#e8b86d",
    rune: "ᚠ",
    items: [
      "Кислотный педикюр",
      "Маникюр с восстановлением ногтей",
      "Пилинг головы",
      "Стрижка",
      "Укладка",
    ],
  },
  {
    category: "Ясли для собак",
    color: "#6aaa80",
    rune: "ᛃ",
    items: [
      "Груминг",
      "SPA для питомца",
      "Массаж",
      "Игры",
      "Видео-обзор (онлайн-трансляция)",
    ],
  },
];

export default function Regeneration() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: "var(--eth-bg1, #0f0c08)", color: "var(--eth-cream, #f5ede0)" }}>

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(200,146,58,0.08) 0%, transparent 65%)" }} />
        <button onClick={() => navigate("/tradition")}
          className="inline-flex items-center gap-2 mb-10 text-xs uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
          style={{ color: "var(--eth-stone, #a89070)" }}>
          <Icon name="ArrowLeft" size={12} />
          Традиции
        </button>
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "var(--eth-stone, #a89070)" }}>
            Иней & Магма corp.
          </p>
          <h1 className="text-5xl md:text-7xl font-light leading-none mb-4"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2, #e8b86d)" }}>
            Регенерация
          </h1>
          <div style={{ width: "60px", height: "1px", background: "var(--eth-gold, #c8923a)", margin: "0 auto 1.5rem" }} />
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke, #c8b89a)", fontStyle: "italic" }}>
            Создание персонализированных стратегий биохакинга<br />
            и авторские программы регенеративной практики
          </p>
        </div>
        <p className="text-2xl md:text-3xl font-light tracking-[0.3em] uppercase mt-8"
          style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold, #c8923a)", letterSpacing: "0.35em", textShadow: "0 0 30px rgba(200,146,58,0.4)" }}>
          БиоХакинг
        </p>
      </section>

      {/* Services */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((s, si) => (
            <div key={si} className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}20` }}>
              <div className="px-7 py-5 flex items-center gap-4"
                style={{ background: `linear-gradient(90deg, ${s.color}12, transparent)`, borderBottom: `1px solid ${s.color}15` }}>
                <span className="text-2xl font-light" style={{ color: s.color, fontFamily: "'Cormorant', serif" }}>{s.rune}</span>
                <h2 className="text-xl md:text-2xl font-light"
                  style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2, #e8b86d)" }}>
                  {s.category}
                </h2>
              </div>
              <div className="px-7 py-6">
                <ul className="space-y-2.5">
                  {s.items.map((item, ii) => (
                    <li key={ii} className="flex items-start gap-3 text-sm leading-relaxed"
                      style={{ color: "var(--eth-smoke, #c8b89a)" }}>
                      <span className="mt-0.5 flex-shrink-0 text-xs" style={{ color: s.color, opacity: 0.7 }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <div className="mb-8" style={{ width: "40px", height: "1px", background: "var(--eth-gold, #c8923a)", margin: "0 auto 2rem" }} />
          <p className="text-2xl md:text-3xl font-light mb-8 italic"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2, #e8b86d)" }}>
            Начните свой путь к регенерации
          </p>
          <a
            href="https://max.ru/+79186860650"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl transition-all hover:scale-[1.03] hover:shadow-xl"
            style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
            </svg>
            Написать в Max
          </a>
        </div>
      </section>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <p className="text-xs" style={{ color: "rgba(200,146,58,0.3)", fontFamily: "'Cormorant', serif" }}>
          Иней & Магма corp. · Мария · Пармастер
        </p>
      </footer>
    </div>
  );
}
