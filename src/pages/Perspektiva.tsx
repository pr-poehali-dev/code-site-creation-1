import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import TerritoryWalk from "@/components/TerritoryWalk";

// ─── Data ─────────────────────────────────────────────────────────────────────

const programBlocks = [
  {
    icon: "🌊",
    title: "Очищение",
    desc: "Мягкий, но глубокий перезапуск всех систем. Выведение накопленного, освобождение пространства внутри.",
  },
  {
    icon: "🌿",
    title: "Исцеление",
    desc: "Восстановление того, что устало или болело. Клетки помнят путь к здоровью — мы помогаем им вспомнить.",
  },
  {
    icon: "✦",
    title: "Обновление",
    desc: "Тело и ум возвращают молодость, упругость, ясность. Это не маска — это настоящее изменение изнутри.",
  },
  {
    icon: "🔥",
    title: "Наполнение",
    desc: "Энергия, которой давно не было. Радость от тела. Желание жить полно — каждый день, а не в отпуске.",
  },
];

const variants = [
  {
    id: "fasting",
    icon: "💧",
    color: "#6aaad0",
    colorDim: "rgba(106,170,208,0.12)",
    border: "rgba(106,170,208,0.25)",
    title: "Программа с выходом на голодание",
    subtitle: "Путь инея — чистота и ясность",
    tag: "Глубокое очищение",
    desc: "Ступенчатый переход к терапевтическому голоданию под медицинским наблюдением. Детоксикация на клеточном уровне, запуск аутофагии, очищение кишечника, перезагрузка иммунитета. Выход — плавный, с поддержкой нутрициолога.",
    highlights: [
      "Ступенчатая подготовка и сопровождение",
      "Запуск аутофагии — «уборка» на уровне клеток",
      "Отвары, травяные чаи, минеральная вода",
      "Плавный выход под контролем специалиста",
    ],
  },
  {
    id: "broths",
    icon: "🍵",
    color: "#d4922a",
    colorDim: "rgba(212,146,42,0.12)",
    border: "rgba(212,146,42,0.25)",
    title: "Программа с выходом на бульоны и отвары",
    subtitle: "Путь магмы — тепло и восстановление",
    tag: "Мягкое восстановление",
    desc: "Питательные костные бульоны, целебные отвары трав, фитонастои по сезону. Максимальная биодоступность нутриентов, восстановление слизистых, укрепление суставов и кожи. Идеально для тех, кто хочет восстановления без стресса для тела.",
    highlights: [
      "Костные бульоны и травяные отвары",
      "Персональный состав под ваши задачи",
      "Коллаген, минералы, противовоспалительные фитокомплексы",
      "Мягкий, тёплый путь к обновлению",
    ],
  },
];

const included = [
  { emoji: "🏊", label: "Плавание в природном бассейне" },
  { emoji: "🌲", label: "Прогулки по лесу (шинрин-йоку)" },
  { emoji: "🔥", label: "Баня с чаном и купелью" },
  { emoji: "🤲", label: "Аюрведические массажи с маслами" },
  { emoji: "🌿", label: "Травяные мешочки и обливания" },
  { emoji: "💦", label: "SPA и бальнеотерапия" },
  { emoji: "💧", label: "Капельницы и нутрицевтики" },
  { emoji: "🧬", label: "Полная диагностика организма" },
  { emoji: "🥗", label: "Индивидуальный план питания" },
  { emoji: "😴", label: "Режим сна и циркадные ритмы" },
  { emoji: "🧘", label: "Медитации и дыхательные практики" },
  { emoji: "❄️", label: "Криотерапия и контрасты" },
  { emoji: "⚡", label: "LED и лазерные процедуры" },
  { emoji: "🫧", label: "Гипербарическая оксигенация" },
  { emoji: "🩸", label: "PRP и озонотерапия" },
  { emoji: "🦴", label: "Мануальная терапия и остеопатия" },
  { emoji: "🪨", label: "Стоун-терапия горячими камнями" },
  { emoji: "🦷", label: "Профессиональная чистка зубов" },
  { emoji: "🎨", label: "Творческие практики и ремёсла" },
  { emoji: "👨‍⚕️", label: "Консультации всех специалистов включены" },
];

const bioSections = [
  {
    title: "Криотерапия и термовоздействия",
    color: "#6aaad0",
    items: [
      { name: "Криованны / криосауны", desc: "До −150°C — воспаление уходит, иммунитет пробуждается, кожа подтягивается. Вы выходите — и тело чувствует себя новым." },
      { name: "Контрастные процедуры — чан и купель", desc: "Раскалённый деревянный чан с травяными настоями и ледяная лесная купель. Чередование разгоняет сосуды, активирует термогенез и даёт невероятный прилив энергии." },
      { name: "Термотерапия (баня на дровах)", desc: "Пот уносит токсины, мышцы расслабляются, кровообращение восстанавливается. Берёзовый веник, душистые травы, медовый пилинг — древнейший и лучший детокс." },
      { name: "Бальнеотерапия", desc: "Целебные ванны с минеральными солями, грязями, травяными экстрактами и эфирными маслами. Глубокое прогревание суставов, снятие отёков, восстановление кожного барьера." },
    ],
  },
  {
    title: "Аюрведа и древние практики тела",
    color: "#c8923a",
    items: [
      { name: "Абхьянга — аюрведический массаж с маслами", desc: "Тёплые масла с травами наносятся в ритме дыхания. Растворяет накопленное напряжение, питает ткани, восстанавливает дошу и выводит токсины через кожу." },
      { name: "Широдхара — обливание головы", desc: "Тонкая струя тёплого травяного масла льётся на третий глаз непрерывным потоком. Нервная система растворяется в покое — глубокий психофизический сброс." },
      { name: "Панчакарма с травяными мешочками (Пиндасвед)", desc: "Горячие мешочки с рисом, молоком и травами бережно прорабатывают суставы и мышцы. Восстанавливает нервную проводимость, питает глубокие ткани." },
      { name: "Обливание молоком и травяными составами", desc: "Ритуал «Кширадхара» — обливание тела тёплым молоком с шафраном, ашвагандой и травами. Кожа мягчеет, ум успокаивается, тело наполняется." },
      { name: "Удвартана — пудинговый пилинг", desc: "Сухой массаж порошком трав против шерсти лимфатических путей. Расщепляет жировые отложения, выводит шлаки через кожу, даёт упругость." },
    ],
  },
  {
    title: "Мануальная терапия и остеопатия",
    color: "#7aab9e",
    items: [
      { name: "Остеопатия — работа с первопричиной", desc: "Мягкие техники остеопата устраняют ограничения подвижности костей, фасций и органов. Снимает хронические боли, нормализует работу нервной системы." },
      { name: "Мануальная терапия позвоночника", desc: "Коррекция смещений позвонков, восстановление правильных изгибов, снятие компрессии нервных корешков. Тело выпрямляется — буквально и фигурально." },
      { name: "Краниосакральная терапия", desc: "Работа с ритмом спинномозговой жидкости через лёгкие прикосновения. Снимает последствия травм, стрессов и перегрузок — на самом глубоком уровне." },
      { name: "Висцеральная остеопатия", desc: "Мягкая работа с внутренними органами восстанавливает их подвижность и кровоснабжение. Устраняет застои, нормализует пищеварение и гормональный фон." },
    ],
  },
  {
    title: "Световые и лазерные технологии",
    color: "#e8b86d",
    items: [
      { name: "Красный свет (LED, 630–660 нм)", desc: "Коллаген и эластин синтезируются быстрее — кожа буквально молодеет. Раны заживают, тон выравнивается." },
      { name: "Инфракрасный свет (810–850 нм)", desc: "Проникает глубоко в ткани — снимает воспаление, обезболивает, восстанавливает мышцы и суставы без таблеток." },
      { name: "Лазерное облучение крови (ВЛОК)", desc: "Лазер изнутри — снижает воспаление, улучшает текучесть крови, запускает восстановление на молекулярном уровне." },
    ],
  },
  {
    title: "Стоун-терапия и минеральные практики",
    color: "#9b8a7a",
    items: [
      { name: "Классическая стоун-терапия базальтом", desc: "Горячие вулканические камни расплавляют глубокие мышечные зажимы, нормализуют лимфоток, насыщают тепловой энергией каждую клетку тела." },
      { name: "Криостоун — мраморные холодные камни", desc: "Холодный мрамор сужает сосуды, снимает отёчность, тонизирует кожу. В чередовании с горячими камнями — мощнейший контрастный эффект." },
      { name: "Шиацу с нефритовыми роллерами", desc: "Нефрит балансирует энергетику тела согласно TCM. Прохладная тяжесть камня успокаивает нервную систему и выравнивает тон кожи." },
    ],
  },
  {
    title: "Оксигенация и восстановление крови",
    color: "#7aab9e",
    items: [
      { name: "Гипербарическая оксигенация (ГБО)", desc: "Дыхание чистым кислородом под давлением — ткани насыщаются так, как не бывает в обычной жизни. Заживление, когнитивный подъём, снятие хронической усталости." },
      { name: "Озонотерапия", desc: "Озонированная кровь уничтожает патогены, улучшает микроциркуляцию, стимулирует иммунитет — вы чувствуете прилив сил буквально после первой процедуры." },
      { name: "PRP-терапия", desc: "Факторы роста из вашей собственной крови запускают регенерацию там, где она нужна больше всего." },
      { name: "Внутривенные витаминные коктейли", desc: "Персональные инфузии — мегадозы витамина C, глутатион, NAD+, цинк. Мгновенное восстановление — после первой капельницы ощущаешь себя иначе." },
    ],
  },
  {
    title: "Полость рта и стоматологическое здоровье",
    color: "#c87a9b",
    items: [
      { name: "Профессиональная ультразвуковая чистка зубов", desc: "Удаление зубного камня, налёта и пигментации. Здоровье дёсен и зубов — это системное здоровье: патогены в полости рта влияют на сердце и суставы." },
      { name: "Отбеливание и реминерализация", desc: "Щадящее отбеливание с последующим насыщением эмали кальцием и фтором. Зубы становятся не только белее — но и крепче." },
      { name: "Нормализация прикуса и снятие бруксизма", desc: "Стресс живёт в зубах — ночной скрежет изнашивает эмаль и перегружает шею. Нейромышечная коррекция расслабляет жевательные мышцы и снимает головные боли." },
    ],
  },
  {
    title: "Физическая активность и движение",
    color: "#d4622a",
    items: [
      { name: "Хот-йога и пилатес", desc: "Гибкость, баланс, глубокие мышцы — и при этом полный покой в голове. Тело учится быть лёгким." },
      { name: "Скандинавская ходьба и бег по лесу", desc: "Фитонциды деревьев, свежий воздух, мягкое движение — для мозга и нервной системы лучшего лекарства не существует." },
      { name: "Велопрогулки", desc: "По живописным дорожкам через лес — радость движения без нагрузки на суставы. Кардио, свежий воздух и хорошее настроение." },
      { name: "Аквааэробика и плавание", desc: "Вода снимает нагрузку с суставов и позвоночника — движение становится лёгким даже для тех, кому на земле тяжело. Восстановление и тонус одновременно." },
    ],
  },
  {
    title: "Питание и нутрицевтики",
    color: "#9b7fb5",
    items: [
      { name: "Персонализированное питание", desc: "Протокол разрабатывается по результатам анализов — кетодиета, интервальное голодание, FODMAP или палео. Не тренды, а ваша биохимия." },
      { name: "Коллаген, пробиотики, адаптогены", desc: "Гидролизованный коллаген укрепляет суставы и кожу. Пробиотики восстанавливают микробиом. Ашваганда и родиола дают устойчивость к стрессу." },
      { name: "Митохондриальная поддержка", desc: "Коэнзим Q10, PQQ, альфа-липоевая кислота — топливо для клеточных «электростанций». Энергия без кофе и стимуляторов." },
      { name: "Функциональные продукты и суперфуды", desc: "Ферментированные продукты, пророщенные злаки, живые масла холодного отжима, дикоросы — питание как лекарство, а не просто еда." },
    ],
  },
  {
    title: "Нервная система и психоэмоциональное восстановление",
    color: "#c8923a",
    items: [
      { name: "Медитация, майндфулнесс и звуковые ванны", desc: "Тибетские поющие чаши, частоты 432 Гц, практики осознанности — кортизол снижается, нейронные паттерны перестраиваются. Мозг буквально обновляется." },
      { name: "Дыхательные практики (пранаяма, метод Вима Хофа)", desc: "Осознанное дыхание управляет вегетативной нервной системой. Стресс, тревога, боль — становятся управляемыми без таблеток." },
      { name: "Цифровой детокс и нормализация сна", desc: "Без экранов, без уведомлений — только лес, тишина и ритуалы вечера. За 7–10 дней сон восстанавливается, мозг перезапускается." },
      { name: "Нейрографика и арт-терапия", desc: "Творчество как метод работы с глубинными паттернами. Рисунок, глина, плетение — правое полушарие берёт слово и растворяет блоки, к которым ум не подобраться." },
    ],
  },
  {
    title: "Консультации специалистов — все включены",
    color: "#6aaa70",
    items: [
      { name: "Врач-остеопат и мануальный терапевт", desc: "Диагностика структурных нарушений и работа с первопричиной хронических болей и функциональных нарушений." },
      { name: "Нутрициолог и диетолог", desc: "Разработка протокола питания под ваши задачи, анализ дефицитов, подбор нутрицевтиков и суперфудов." },
      { name: "Психолог и коуч по восстановлению", desc: "Работа с эмоциональными причинами физических симптомов, формирование новых привычек и выход из состояния хронического стресса." },
      { name: "Врач-косметолог и специалист по аюрведе", desc: "Индивидуальный подбор процедур с учётом типа кожи, доши и текущего состояния организма. Никаких шаблонов — только персональный подход." },
    ],
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Perspektiva() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);
  const [openSection, setOpenSection] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#07050f", color: "#f0e6d0" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(7,5,15,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(120,100,200,0.15)" }}>
        <button onClick={() => navigate("/tradition")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity" style={{ color: "rgba(160,140,220,0.8)" }}>
          <Icon name="ArrowLeft" size={18} />
          <span style={{ fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>Традиция</span>
        </button>
        <p className="text-xs uppercase tracking-[0.4em]" style={{ color: "rgba(120,100,200,0.5)" }}>Перспектива</p>
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(120,100,200,0.15)", color: "rgba(160,140,220,0.8)", border: "1px solid rgba(120,100,200,0.3)" }}>
          В разработке
        </span>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden">
        {/* bg particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(100,80,200,0.12) 0%, transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(60,120,180,0.08) 0%, transparent 55%)" }} />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                width: `${100 + i * 90}px`, height: `${100 + i * 90}px`,
                border: `1px solid rgba(120,100,200,${0.06 - i * 0.01})`,
                top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                animation: `regen-spin ${18 + i * 7}s linear infinite ${i % 2 ? "reverse" : ""}`,
              }} />
          ))}
        </div>

        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease, transform 1s ease" }}>
          {/* Dev badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: "rgba(120,100,200,0.15)", border: "1px solid rgba(120,100,200,0.35)", color: "rgba(180,160,240,0.9)" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "rgba(160,140,220,0.8)" }} />
            <span className="text-xs uppercase tracking-[0.4em]">Проект на стадии разработки</span>
          </div>

          <p className="text-xs uppercase tracking-[0.6em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Иней & Магма corp.</p>

          <h1 className="text-6xl md:text-9xl font-light leading-none mb-3"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.95)", textShadow: "0 0 60px rgba(120,100,200,0.4)" }}>
            Перспектива
          </h1>
          <p className="text-xl md:text-2xl font-light tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(140,120,220,0.7)" }}>
            new
          </p>

          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-4"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.8)", fontStyle: "italic" }}>
            Два углублённых варианта программ — от и до.<br />
            С проживанием на территории целительского центра<br />
            <strong style={{ fontStyle: "normal", color: "rgba(200,180,255,0.95)" }}>Иней & Магма corp.</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8 mb-12">
            {["Очищение", "Исцеление", "Обновление", "Наполнение"].map((w, i) => (
              <span key={i} className="text-sm px-4 py-1.5 rounded-full"
                style={{ background: "rgba(120,100,200,0.1)", color: "rgba(180,160,240,0.8)", border: "1px solid rgba(120,100,200,0.2)", fontFamily: "'Cormorant', serif", fontSize: "1rem" }}>
                {w}
              </span>
            ))}
          </div>

          <button onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, rgba(100,80,200,0.3), rgba(80,60,180,0.2))", border: "1px solid rgba(120,100,200,0.4)", color: "rgba(180,160,240,0.9)", letterSpacing: "0.12em" }}>
            Узнать о программе
            <Icon name="ChevronDown" size={16} />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" style={{ color: "rgba(120,100,200,0.3)" }}>
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* ── Dev notice ── */}
      <section className="py-12 px-6" style={{ background: "rgba(15,10,30,0.8)", borderTop: "1px solid rgba(120,100,200,0.1)", borderBottom: "1px solid rgba(120,100,200,0.1)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-4xl mb-4">🚧</p>
          <p className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
            Этот проект сейчас рождается
          </p>
          <p className="text-base leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif", fontStyle: "italic", fontSize: "1.1rem" }}>
            Мы собираем уникальную программу, которой ещё нет в России — погружение с проживанием, где каждый день расписан под ваш организм. Оставьте заявку первыми и получите специальные условия раннего бронирования.
          </p>
        </div>
      </section>

      {/* ── Четыре столпа ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Суть программы</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Четыре шага<br /><em style={{ color: "rgba(140,120,220,0.8)" }}>к себе настоящему</em>
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {programBlocks.map((b, i) => (
              <FadeIn key={i} delay={i * 0.1} className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.15)" }}>
                <span className="block text-4xl mb-4">{b.icon}</span>
                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(180,160,240,0.55)" }}>{b.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Два варианта ── */}
      <section id="programs" className="py-20 px-6" style={{ background: "rgba(10,7,25,0.9)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Выберите свой путь</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Два варианта программы
            </h2>
            <p className="mt-4 text-base italic" style={{ color: "rgba(180,160,240,0.5)", fontFamily: "'Cormorant', serif" }}>
              Оба ведут к одной цели — через разные пути
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {variants.map((v, i) => (
              <FadeIn key={v.id} delay={i * 0.15}>
                <div className="rounded-3xl overflow-hidden h-full"
                  style={{ background: v.colorDim, border: `1px solid ${v.border}`, boxShadow: `0 0 60px ${v.colorDim}` }}>
                  <div className="px-7 pt-7 pb-5" style={{ borderBottom: `1px solid ${v.border}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{v.icon}</span>
                      <span className="text-xs px-3 py-1 rounded-full"
                        style={{ background: `${v.colorDim}`, color: v.color, border: `1px solid ${v.border}` }}>
                        {v.tag}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light mb-1"
                      style={{ fontFamily: "'Cormorant', serif", color: "rgba(220,200,255,0.95)" }}>
                      {v.title}
                    </h3>
                    <p className="text-sm italic mb-4" style={{ color: "rgba(180,160,240,0.5)" }}>{v.subtitle}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(200,190,230,0.7)" }}>{v.desc}</p>
                  </div>
                  <div className="px-7 py-5">
                    <ul className="space-y-2.5">
                      {v.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(200,190,230,0.75)" }}>
                          <span style={{ color: v.color, fontSize: "0.6rem", marginTop: "5px", flexShrink: 0 }}>◆</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Что включено ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Каждый день программы</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Всё включено
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {included.map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div className="rounded-2xl p-4 text-center"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.12)" }}>
                  <span className="block text-2xl mb-2">{item.emoji}</span>
                  <p className="text-xs leading-snug" style={{ color: "rgba(180,160,240,0.65)", fontFamily: "'Cormorant', serif", fontSize: "0.9rem" }}>{item.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Полная научная база ── */}
      <section className="py-20 px-6" style={{ background: "rgba(10,7,25,0.9)" }}>
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.5em] mb-4" style={{ color: "rgba(120,100,200,0.6)" }}>Что за этим стоит</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
              Научная основа программы
            </h2>
            <p className="text-base italic" style={{ color: "rgba(180,160,240,0.5)", fontFamily: "'Cormorant', serif" }}>
              Каждый метод — не мода. Каждый метод — доказанный инструмент регенерации
            </p>
          </FadeIn>

          <div className="space-y-4">
            {bioSections.map((sec, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="rounded-2xl overflow-hidden"
                  style={{ border: `1px solid ${sec.color}22`, background: "rgba(255,255,255,0.015)" }}>
                  <button
                    className="w-full px-6 py-4 flex items-center justify-between text-left transition-all hover:opacity-80"
                    onClick={() => setOpenSection(openSection === i ? null : i)}>
                    <span className="text-lg font-light" style={{ fontFamily: "'Cormorant', serif", color: "rgba(210,195,255,0.9)" }}>
                      <span style={{ color: sec.color, marginRight: "10px", fontSize: "0.7rem" }}>◆</span>
                      {sec.title}
                    </span>
                    <span style={{ color: sec.color, transform: openSection === i ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.3s ease" }}>›</span>
                  </button>
                  {openSection === i && (
                    <div className="px-6 pb-5 space-y-4" style={{ borderTop: `1px solid ${sec.color}15` }}>
                      {sec.items.map((item, j) => (
                        <div key={j} className="pt-4">
                          <p className="text-base font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: sec.color }}>{item.name}</p>
                          <p className="text-sm leading-relaxed" style={{ color: "rgba(180,165,220,0.65)" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Творческие курсы ── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="rounded-3xl p-8 text-center"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(120,100,200,0.15)" }}>
              <span className="block text-4xl mb-4">🎨</span>
              <h3 className="text-2xl md:text-3xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.9)" }}>
                Творческие практики
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif" }}>
                Дополнительно — авторские курсы по работе с глиной, живописи, работе с образами. Творчество включает правое полушарие, снимает ментальные блоки и становится ещё одним языком исцеления.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Territory Walk ── */}
      <TerritoryWalk />

      {/* ── CTA ── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(100,80,200,0.08) 0%, transparent 65%)" }} />
        <div className="max-w-2xl mx-auto relative">
          <FadeIn>
            <span className="block text-5xl mb-6">✦</span>
            <h2 className="text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: "'Cormorant', serif", color: "rgba(200,180,255,0.95)" }}>
              Хотите быть первыми?
            </h2>
            <p className="text-lg mb-10 leading-relaxed" style={{ color: "rgba(180,160,240,0.6)", fontFamily: "'Cormorant', serif", fontStyle: "italic" }}>
              Программа открывается для ограниченного числа участников.<br />
              Оставьте заявку сейчас — и получите специальные условия первой волны.
            </p>
            <a href={`https://max.ru/+79186860650?text=${encodeURIComponent("Здравствуйте! Хочу узнать о программе Перспектива — с проживанием в центре Иней и Магма")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-sm uppercase tracking-wider transition-all hover:scale-[1.04] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, rgba(100,80,200,0.5), rgba(80,60,180,0.4))", color: "rgba(200,185,255,0.95)", textDecoration: "none", fontWeight: 700, letterSpacing: "0.12em", border: "1px solid rgba(120,100,200,0.5)", boxShadow: "0 0 40px rgba(100,80,200,0.2)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
              </svg>
              Хочу на программу
            </a>
            <p className="mt-4 text-xs" style={{ color: "rgba(120,100,200,0.5)" }}>Проживание · Питание · Все процедуры включены</p>
          </FadeIn>
        </div>
      </section>

      <footer className="py-8 px-6 text-center" style={{ borderTop: "1px solid rgba(120,100,200,0.08)" }}>
        <button onClick={() => navigate("/")} className="text-xs hover:opacity-60 transition-opacity"
          style={{ color: "rgba(120,100,200,0.4)", fontFamily: "'Cormorant', serif" }}>
          Иней & Магма corp. · Мария · Пармастер
        </button>
      </footer>

      <style>{`
        @keyframes regen-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}