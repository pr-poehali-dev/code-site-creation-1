import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const zones = [
  {
    icon: "🛁",
    title: "Гидромассажная ванна",
    color: "#6aaad0",
    colorDim: "rgba(106,170,208,0.1)",
    border: "rgba(106,170,208,0.2)",
    desc: "Встроенная система пузырькового и гидромассажа. Регулировка интенсивности, температуры и подсветки воды. Добавьте бомбочку или травяной сбор — и ванна превратится в ритуал.",
    features: ["Хромотерапия воды", "Пузырьковый + гидромассаж", "Автоматы с бомбочками рядом", "Регулировка температуры до 1°C"],
  },
  {
    icon: "🌲",
    title: "Русская баня",
    color: "#c8923a",
    colorDim: "rgba(200,146,58,0.1)",
    border: "rgba(200,146,58,0.2)",
    desc: "Настоящая русская баня с дровяным жаром и берёзовым духом. На стенах — видео-картины, которые показывают, как правильно пользоваться баней: от разогрева до веника и купели. Всё интуитивно, даже для новичков.",
    features: ["Дровяной жар — настоящий русский пар", "Видео-картины на стенах — инструкция в образах", "Берёзовые брёвна как декор и атмосфера", "Температура 60–100°C · управление встроенное"],
  },
  {
    icon: "🚿",
    title: "Душ впечатлений",
    color: "#9b7fb5",
    colorDim: "rgba(155,127,181,0.1)",
    border: "rgba(155,127,181,0.2)",
    desc: "Иммерсивная кабина с тропическим, арктическим и лесным сценариями. Каждый сценарий — уникальное сочетание звука, аромата и световой температуры. Переключение одной кнопкой.",
    features: ["3 сценария: Тропик · Арктика · Лес", "Аромадиффузор встроен в потолок", "Динамики по периметру кабины", "Хромосвет от 2700K до 6500K"],
  },
  {
    icon: "🧖",
    title: "LED-панель",
    color: "#7ab870",
    colorDim: "rgba(122,184,112,0.1)",
    border: "rgba(122,184,112,0.2)",
    desc: "Профессиональная LED-панель светотерапии. Красный и инфракрасный свет стимулирует выработку коллагена, улучшает микроциркуляцию и омолаживает кожу. Идеально после парной — поры открыты, воздействие максимально.",
    features: [
      "Красный + инфракрасный спектр",
      "Стимуляция выработки коллагена",
      "Улучшение микроциркуляции кожи",
      "Антивозрастной эффект после первого сеанса",
    ],
  },
  {
    icon: "📹",
    title: "Roll-shaper",
    color: "#8B5E3C",
    colorDim: "rgba(139,94,60,0.1)",
    border: "rgba(139,94,60,0.2)",
    desc: "Роликовый тренажёр для коррекции фигуры, лимфодренажа и борьбы с целлюлитом. Сочетает механическое воздействие роликов с инфракрасным прогреванием — разбивает жировые отложения, активирует лимфоток, разглаживает кожу.",
    features: [
      "Роликовый массаж + инфракрасное прогревание",
      "Коррекция фигуры и борьба с целлюлитом",
      "Лимфодренаж и улучшение кровообращения",
      "Видимый результат уже после первого курса",
    ],
  },
];

const automats = [
  { emoji: "🌿", name: "Банные запарки, травы и скрабы", desc: "Авторские запарки, лекарственные травы, натуральные скрабы и уходовая косметика — выбирайте прямо перед парной." },
  { emoji: "🌸", name: "Свежие цветы и напитки", desc: "Фруктовые и овощные соки, салаты и заправки к ним — всё свежее, без консервантов, оплата по QR-коду." },
  { emoji: "🌾", name: "Безглютеновая выпечка и суперфуды", desc: "Безглютеновая выпечка, проростки, семечки и лечебные бады — питание для восстановления после бани." },
  { emoji: "🔬", name: "Новинки биохакинга", desc: "Селанк, семакс и прочие нейропептиды и добавки — передовые решения для тех, кто заботится о ресурсе тела и ума." },
];

const services = [
  { icon: "🌿", title: "Авторское парение", desc: "Программа выстраивается специально под вас — мастер банного дела приезжает к вам с веником, паром и ритуалом. 60–90 минут индивидуального парения." },
  { icon: "💆", title: "СПА-массаж в парной", desc: "Массаж прямо в бане — горячий пар открывает поры, масла глубже проникают. Тишина, тепло и профессиональные руки мастера." },
  { icon: "🍯", title: "Солевое выкатывание · медовый пилинг · пенно-берёзовое омовение", desc: "Три ритуала для тела: соль снимает отёки и выводит токсины, мёд питает и разглаживает, берёзовая пена смягчает кожу до шёлка." },
  { icon: "🛁", title: "Отдых без услуг", desc: "Просто ваше пространство. Пришли своей компанией — никто не беспокоит. Музыка, ванна, пар — в вашем ритме." },
];

export default function Banya() {
  const navigate = useNavigate();
  const [activeZone, setActiveZone] = useState(0);
  const [steamPos, setSteamPos] = useState([
    { x: 30, y: 80 }, { x: 55, y: 70 }, { x: 80, y: 85 }, { x: 20, y: 60 }, { x: 70, y: 75 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSteamPos(prev => prev.map(p => ({
        x: p.x + (Math.random() - 0.5) * 4,
        y: p.y - 0.3 < 0 ? 90 : p.y - 0.3,
      })));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: "linear-gradient(180deg, #0a0608 0%, #0e080c 50%, #080812 100%)", minHeight: "100vh", color: "#e8e0f0", fontFamily: "'Inter', sans-serif" }}>

      {/* Навигация назад */}
      <div className="fixed top-4 left-4 z-50">
        <button onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all hover:opacity-70"
          style={{ background: "rgba(20,10,30,0.85)", border: "1px solid rgba(200,146,58,0.2)", color: "rgba(200,180,240,0.7)", backdropFilter: "blur(10px)" }}>
          <Icon name="ArrowLeft" size={14} />
          Назад
        </button>
      </div>

      {/* Герой */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center">

        {/* Анимированный пар */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
          {steamPos.map((p, i) => (
            <ellipse key={i} cx={`${p.x}%`} cy={`${p.y}%`} rx="8" ry="20"
              fill="rgba(200,146,58,0.3)"
              style={{ filter: "blur(12px)", animation: `steam-drift ${3 + i * 0.7}s ease-in-out infinite alternate` }} />
          ))}
        </svg>

        {/* Фоновое свечение */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 50% 60%, rgba(200,146,58,0.06) 0%, rgba(100,60,200,0.04) 40%, transparent 70%)"
        }} />

        <FadeIn className="relative max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.7em] mb-6" style={{ color: "rgba(200,146,58,0.5)" }}>
            Иней & Магма · Новаторский формат
          </p>
          <h1 className="text-6xl md:text-8xl font-light mb-6 leading-none" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.97)", textShadow: "0 0 80px rgba(200,146,58,0.2)" }}>
            Рябина<br />
            <em style={{ color: "rgba(200,146,58,0.9)", fontStyle: "italic" }}>& Дым</em><br />
            <span className="text-5xl md:text-6xl" style={{ color: "rgba(220,200,255,0.7)" }}>Lounge</span>
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed mb-8" style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.65)", fontStyle: "italic" }}>Приватная баня нового формата.
· Парная · Душ впечатлений · Led-панель · Roll-shaper · Гидромассаж  · </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Только по предзаписи", "Кодовый вход", "Полная приватность", "До 4 человек"].map((t, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                style={{ background: "rgba(200,146,58,0.08)", border: "1px solid rgba(200,146,58,0.2)", color: "rgba(200,146,58,0.7)" }}>
                {t}
              </span>
            ))}
          </div>

          <a href={`https://max.ru/+79186860650?text=${encodeURIComponent("Здравствуйте! Хочу забронировать Рябина & Дым Lounge в центре Иней и Магма")}`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04]"
            style={{ background: "linear-gradient(135deg, rgba(200,146,58,0.35), rgba(180,100,40,0.25))", color: "rgba(240,200,140,0.95)", textDecoration: "none", border: "1px solid rgba(200,146,58,0.4)", boxShadow: "0 0 40px rgba(200,146,58,0.15)", fontWeight: 600 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
            </svg>
            Забронировать
          </a>
        </FadeIn>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(200,146,58,0.3)" }}>
          <Icon name="ChevronDown" size={22} />
        </div>
      </section>

      {/* Зоны */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ background: "rgba(8,5,18,0.98)" }}>

        {/* Анимированные берёзовые брёвна — фон */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { left: "1%",  width: 52, delay: 0,   opacity: 0.22 },
            { left: "8%",  width: 38, delay: 0.9,  opacity: 0.15 },
            { left: "15%", width: 58, delay: 1.6,  opacity: 0.18 },
            { left: "77%", width: 46, delay: 0.4,  opacity: 0.20 },
            { left: "86%", width: 40, delay: 1.2,  opacity: 0.16 },
            { left: "93%", width: 54, delay: 2.1,  opacity: 0.19 },
          ].map((b, i) => (
            <div key={i} className="absolute top-0 bottom-0"
              style={{
                left: b.left,
                width: `${b.width}px`,
                opacity: b.opacity,
                background: `linear-gradient(90deg,
                  rgba(30,22,14,0) 0%,
                  rgba(220,205,185,0.85) 18%,
                  rgba(245,235,215,1) 42%,
                  rgba(210,195,175,0.9) 58%,
                  rgba(180,165,145,0.7) 78%,
                  rgba(30,22,14,0) 100%)`,
                borderRadius: "50%",
                animation: `birch-sway ${5.5 + i * 0.6}s ease-in-out ${b.delay}s infinite alternate`,
              }}>
              {[12, 26, 41, 57, 72, 86].map((top, j) => (
                <div key={j} className="absolute"
                  style={{
                    top: `${top}%`,
                    left: j % 2 === 0 ? "8%" : "20%",
                    width: j % 2 === 0 ? "65%" : "55%",
                    height: `${5 + (j % 3) * 2}px`,
                    background: "rgba(15,10,6,0.75)",
                    borderRadius: "40%",
                    transform: `rotate(${j % 2 === 0 ? -3 : 4}deg)`,
                  }} />
              ))}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto relative">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.5)" }}>Что внутри</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>
              Пять зон — одно пространство
            </h2>
          </FadeIn>

          {/* Табы зон */}
          <div className="flex gap-2 flex-wrap justify-center mb-8">
            {zones.map((z, i) => (
              <button key={i} onClick={() => setActiveZone(i)}
                className="px-4 py-2 rounded-xl text-sm transition-all"
                style={{
                  background: i === activeZone ? z.colorDim : "rgba(255,255,255,0.03)",
                  border: `1px solid ${i === activeZone ? z.border : "rgba(255,255,255,0.07)"}`,
                  color: i === activeZone ? z.color : "rgba(200,185,255,0.35)",
                  fontFamily: "'Cormorant', serif", fontSize: "0.95rem",
                }}>
                {z.icon} {z.title}
              </button>
            ))}
          </div>

          {/* Контент активной зоны */}
          <FadeIn key={activeZone} className="rounded-3xl overflow-hidden"
            style={{ border: `1px solid ${zones[activeZone].border}`, background: "rgba(10,7,20,0.85)" }}>
            <div className="px-7 py-6 flex items-center gap-4"
              style={{ borderBottom: `1px solid ${zones[activeZone].border}`, background: zones[activeZone].colorDim }}>
              <span className="text-5xl">{zones[activeZone].icon}</span>
              <div>
                <h3 className="text-2xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "#f0e8d8" }}>
                  {zones[activeZone].title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(220,200,255,0.5)" }}>
                  {zones[activeZone].desc}
                </p>
              </div>
            </div>
            <div className="px-7 py-6 grid sm:grid-cols-2 gap-3">
              {zones[activeZone].features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "rgba(220,210,255,0.65)" }}>
                  <span style={{ color: zones[activeZone].color, opacity: 0.7, flexShrink: 0 }}>◆</span>
                  {f}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Интерьер */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.5)" }}>Атмосфера</p>
            <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>
              Уникальный интерьер
            </h2>
            <p className="text-lg italic" style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.45)" }}>
              Красота — это часть восстановления
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { emoji: "✦", title: "Зеркало с неоновой подсветкой", desc: "Арт-объект в раздевалке. Мягкое свечение, уникальный дизайн — идеально для фото и создания атмосферы." },
              { emoji: "🌿", title: "Живые растения повсюду", desc: "Тропические листья, папоротники, мхи. Живой воздух, живой интерьер — природа заходит внутрь пространства." },
              { emoji: "🪡", title: "Этнические ковры", desc: "Узоры народных орнаментов, натуральная шерсть, ручная работа. Тепло под ногами — и история в каждом узоре." },
              { emoji: "🎬", title: "Видео-картины в парной", desc: "На стенах бани — живые видео: как правильно париться, дышать, использовать веник. Красота и польза одновременно." },
              { emoji: "💡", title: "Умное освещение", desc: "Тёплый янтарь в ванной, холодный лёд в душе, мягкий рассвет в раздевалке. Свет настраивает настроение." },
              { emoji: "🎵", title: "Пространственный звук", desc: "Колонки встроены в потолок и стены. Терапевтические частоты, живая природа, этнические звуки — выбирайте." },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}
                className="rounded-2xl p-6"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(200,146,58,0.1)" }}>
                <span className="block text-4xl mb-3">{item.emoji}</span>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.9)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(220,210,255,0.45)" }}>
                  {item.desc}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Автоматы */}
      <section className="py-20 px-6" style={{ background: "rgba(8,5,18,0.98)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.5)" }}>Умные автоматы</p>
            <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>
              Всё необходимое — по QR-коду
            </h2>
            <p className="text-base italic" style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.45)" }}>
              Четыре автомата прямо в пространстве бани. Без кассы, без очередей
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {automats.map((a, i) => (
              <FadeIn key={i} delay={i * 0.1}
                className="rounded-2xl p-6 flex items-start gap-4"
                style={{ background: "rgba(200,146,58,0.04)", border: "1px solid rgba(200,146,58,0.12)" }}>
                <span className="text-4xl flex-shrink-0">{a.emoji}</span>
                <div>
                  <h3 className="text-lg font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.9)" }}>
                    {a.name}
                  </h3>
                  <p className="text-sm" style={{ color: "rgba(220,210,255,0.45)" }}>{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Банные программы */}
      <section className="py-20 px-6" style={{ background: "rgba(14,8,22,0.99)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.5)" }}>банные ритуалы</p>
            <h2 className="text-4xl md:text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>
              Программы и путь к обновлению
            </h2>
            <p className="text-base italic mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.45)" }}>
              Пригласите пармастера — и каждый ритуал станет персональным. Или приходите соло, или со своей компанией — пространство полностью ваше.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {["Пармастер по запросу", "Соло или компания", "До 4 человек"].map((t, i) => (
                <span key={i} className="px-4 py-1.5 rounded-full text-xs uppercase tracking-wider"
                  style={{ background: "rgba(200,146,58,0.08)", border: "1px solid rgba(200,146,58,0.2)", color: "rgba(200,146,58,0.7)" }}>
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                symbol: "🌿", title: "Свежесть полей", duration: "3 часа", guests: "2 гостя",
                color: "#7aab9e",
                procedures: [
                  "Церемония первого пара с арома-травами",
                  "Классическое парение дубовыми вениками с переворотом",
                  "Медово-травяной массаж-скраб",
                ],
                note: "При дополнении чаном — 1 час в подарок. Чан: 7 000 ₽ на всё время аренды",
                prices: [
                  { label: "Будни до 18:00", value: "21 000 ₽" },
                  { label: "Вечер / выходные", value: "23 000 ₽" },
                ],
              },
              {
                symbol: "ᛟ", title: "Шёпот предков", duration: "3 часа", guests: "4–6 гостей",
                color: "#9b7fb5",
                procedures: [
                  "Тёплый чан с травами и фруктами",
                  "Церемония первого пара с арома-травами",
                  "Звуковая медитация",
                ],
                note: null,
                prices: [
                  { label: "Будни до 18:00", value: "6 500 ₽ / гость" },
                  { label: "Вечер / выходные", value: "8 500 ₽ / гость" },
                ],
              },
              {
                symbol: "🌲", title: "Вглубь лесных троп", duration: "4 часа", guests: "2 гостя",
                color: "#c8923a",
                procedures: [
                  "Тёплый чан с травами и фруктами",
                  "Церемония первого пара с арома-травами",
                  "Солевое выкатывание-скраб",
                  "Классическое парение на пихтовых вениках",
                  "Медовый массаж в парной",
                  "Холодный авторский лимонад",
                ],
                note: null,
                prices: [
                  { label: "Будни до 18:00", value: "29 000 ₽" },
                  { label: "Вечер / выходные", value: "32 000 ₽" },
                ],
              },
              {
                symbol: "🌫", title: "Тайны тумана", duration: "4 часа", guests: "4–6 гостей",
                color: "#6aaad0",
                procedures: [
                  "Тёплый чан с травами и фруктами",
                  "Церемония первого пара с арома-травами",
                  "Одна услуга на выбор: лёгкое парение / медовая ладка / омовение мылом и рукавицей / солевое выкатывание с контрастами",
                ],
                note: null,
                prices: [
                  { label: "Будни до 18:00", value: "9 000 ₽ / гость" },
                  { label: "Вечер / выходные", value: "11 000 ₽ / гость" },
                ],
              },
              {
                symbol: "🥛", title: "Молочные берега", duration: "3 часа", guests: "2 гостя",
                color: "#e8d5c0",
                procedures: [
                  "Прогрев в парной",
                  "Парение классическое с холодной пихтой под голову",
                  "Очищение тела рукавицей кесе",
                  "Молочко для тела",
                ],
                note: null,
                prices: [
                  { label: "Будни до 18:00", value: "12 000 ₽" },
                  { label: "Вечер / выходные", value: "14 500 ₽" },
                ],
              },
              {
                symbol: "🍊", title: "Терпкий родник", duration: "3 часа", guests: "2 гостя",
                color: "#d4622a",
                procedures: [
                  "Прогрев в парной",
                  "Парение классическое контрастно-минеральное с грейпфрутом",
                  "Мыльный spa-уход по телу берёзовыми вениками",
                ],
                note: null,
                prices: [
                  { label: "Будни до 18:00", value: "8 500 ₽" },
                  { label: "Вечер / выходные", value: "10 500 ₽" },
                ],
              },
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.07} className="rounded-2xl flex flex-col"
                style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${p.color}28` }}>
                {/* Header */}
                <div className="px-6 pt-6 pb-4" style={{ borderBottom: `1px solid ${p.color}18` }}>
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl" style={{ color: p.color }}>{p.symbol}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full uppercase tracking-wider"
                      style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}>
                      {p.guests}
                    </span>
                  </div>
                  <h3 className="text-xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>{p.title}</h3>
                  <p className="text-xs" style={{ color: "rgba(200,180,255,0.4)" }}>{p.duration}</p>
                </div>

                {/* Procedures */}
                <div className="px-6 py-4 flex-1">
                  <ul className="space-y-2 mb-3">
                    {p.procedures.map((proc, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "rgba(220,210,255,0.6)" }}>
                        <span className="flex-shrink-0 mt-1" style={{ color: p.color, fontSize: "0.4rem" }}>◆</span>
                        {proc}
                      </li>
                    ))}
                  </ul>
                  {p.note && (
                    <p className="text-xs italic leading-relaxed mt-3 px-3 py-2 rounded-xl"
                      style={{ color: "rgba(200,146,58,0.7)", background: "rgba(200,146,58,0.06)", border: "1px solid rgba(200,146,58,0.12)" }}>
                      * {p.note}
                    </p>
                  )}
                </div>

                {/* Prices */}
                <div className="px-6 pb-6 space-y-2">
                  {p.prices.map((pr, j) => (
                    <div key={j} className="flex items-center justify-between">
                      <span className="text-xs" style={{ color: "rgba(200,180,255,0.4)" }}>{pr.label}</span>
                      <span className="text-base font-light" style={{ fontFamily: "'Cormorant', serif", color: p.color }}>{pr.value}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-10 text-center">
            <a href={`https://max.ru/+79186860650?text=${encodeURIComponent("Здравствуйте! Хочу узнать подробнее о банных программах в Рябина & Дым Lounge")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04]"
              style={{ background: "linear-gradient(135deg, rgba(200,146,58,0.3), rgba(180,100,40,0.2))", color: "rgba(240,200,140,0.95)", textDecoration: "none", border: "1px solid rgba(200,146,58,0.35)", fontWeight: 600 }}>
              Узнать про программы
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Как работает бронирование */}
      <section className="py-20 px-6" style={{ background: "rgba(8,5,18,0.98)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(200,146,58,0.5)" }}>Приватность прежде всего</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.95)" }}>
              Как попасть
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: "01", title: "Запись", desc: "Пишете нам в Telegram или по телефону. Выбираете дату и время." },
              { n: "02", title: "Оплата", desc: "Подтверждаете бронь. Получаете QR-код и кодовый пароль на дверь." },
              { n: "03", title: "Вход", desc: "Приходите в выбранное время. Набираете код — пространство ваше." },
              { n: "04", title: "Отдых", desc: "До 3–4 часов в полной приватности. Никто не входит без вашего разрешения." },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.1} className="text-center">
                <div className="text-5xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,146,58,0.3)" }}>
                  {step.n}
                </div>
                <h3 className="text-lg font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.85)" }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: "rgba(220,210,255,0.4)" }}>{step.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(200,146,58,0.07) 0%, transparent 65%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <FadeIn>
            <span className="block text-5xl mb-6">🔥</span>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(240,225,200,0.97)" }}>
              Зарезервируйте<br />своё время
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(220,200,255,0.5)", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
              Рябина & Дым Lounge открыта для постоянных гостей центра Иней & Магма corp.<br />
              и новых посетителей. Слоты ограничены — один сеанс, одна компания.
            </p>
            <a href={`https://max.ru/+79186860650?text=${encodeURIComponent("Здравствуйте! Хочу записаться в Рябина & Дым Lounge (баня) в центре Иней и Магма")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, rgba(200,146,58,0.45), rgba(180,100,40,0.35))", color: "rgba(240,200,140,0.97)", textDecoration: "none", fontWeight: 700, letterSpacing: "0.12em", border: "1px solid rgba(200,146,58,0.45)", boxShadow: "0 0 50px rgba(200,146,58,0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/>
              </svg>
              Записаться в Max
            </a>
            <p className="mt-4 text-xs" style={{ color: "rgba(200,146,58,0.35)" }}>
              Рябина & Дым Lounge · Новаторский формат
            </p>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <button onClick={() => navigate("/")} className="text-xs hover:opacity-60 transition-opacity"
          style={{ color: "rgba(200,146,58,0.35)", fontFamily: "'Cormorant', serif" }}>
          Иней & Магма corp. · Рябина & Дым Lounge
        </button>
      </footer>

      <style>{`
        @keyframes steam-drift {
          0% { transform: translateY(0) scaleX(1); opacity: 0.2; }
          50% { transform: translateY(-20px) scaleX(1.3); opacity: 0.5; }
          100% { transform: translateY(-40px) scaleX(0.8); opacity: 0; }
        }
        @keyframes birch-sway {
          0% { transform: rotate(-1.5deg) scaleX(0.97); }
          100% { transform: rotate(1.5deg) scaleX(1.03); }
        }
      `}</style>
    </div>
  );
}