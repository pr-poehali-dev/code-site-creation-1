import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { shopCategories } from "./Shop";

// ─── Leaf particle (reused here with deeper forest feel) ──────────────────────

const DEEP_LEAF_SHAPES = ["🍂", "🍁", "🌿", "🍃", "🍂", "🍁", "🍃", "🍂"];

function FallingLeaves({ accent }: { accent: string }) {
  const [leaves] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 14,
      dur: 8 + Math.random() * 10,
      shape: DEEP_LEAF_SHAPES[Math.floor(Math.random() * DEEP_LEAF_SHAPES.length)],
      animIdx: i % 3,
      opacity: 0.5 + Math.random() * 0.5,
    }))
  );

  const anims = ["leaf-fall-1", "leaf-fall-2", "leaf-fall-3"];

  return (
    <>
      {leaves.map((l) => (
        <span
          key={l.id}
          className="fixed pointer-events-none select-none z-10"
          style={{
            left: `${l.left}%`,
            top: "-40px",
            fontSize: "clamp(12px,1.8vw,20px)",
            opacity: l.opacity,
            color: accent,
            animationName: anims[l.animIdx],
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        >
          {l.shape}
        </span>
      ))}
    </>
  );
}

// ─── Forest Spirit (deep forest variant) ─────────────────────────────────────

function DeepSpirit({ accentColor }: { accentColor: string }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function cycle() {
      const wait = 10000 + Math.random() * 12000;
      timerRef.current = setTimeout(() => {
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          cycle();
        }, 4500);
      }, wait);
    }
    cycle();
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="fixed bottom-[12%] left-0 z-20 pointer-events-none"
      style={{
        transition: "transform 1.4s cubic-bezier(0.34,1.56,0.64,1), opacity 1.2s ease",
        transform: visible ? "translateX(0)" : "translateX(-110%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="spirit-float" style={{ filter: `drop-shadow(0 0 14px ${accentColor})` }}>
        <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
          <rect x="30" y="60" width="18" height="48" rx="4" fill="#3d2e1a" />
          <ellipse cx="38" cy="48" rx="26" ry="34" fill="#1a2810" />
          <ellipse cx="38" cy="38" rx="19" ry="26" fill="#223218" />
          <ellipse cx="32" cy="30" rx="12" ry="18" fill="#2a3e20" />
          <ellipse cx="48" cy="50" rx="12" ry="14" fill={`${accentColor}22`} />
          <circle cx="44" cy="46" r="3" fill={`${accentColor}bb`} />
          <circle cx="51" cy="48" r="2.4" fill={`${accentColor}99`} />
          <circle cx="44.8" cy="45.2" r="0.9" fill="rgba(220,240,220,0.9)" />
          <circle cx="51.8" cy="47.2" r="0.7" fill="rgba(220,240,220,0.9)" />
          <path
            d="M43 56 Q47 59 52 56"
            stroke={`${accentColor}88`}
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <text x="12" y="28" fontSize="10" style={{ fill: "rgba(180,120,40,0.65)" }}>🍁</text>
          <text x="52" y="22" fontSize="8" style={{ fill: "rgba(140,80,20,0.55)" }}>🍂</text>
        </svg>
        <p
          className="text-center text-xs mt-1"
          style={{
            fontFamily: "'Cormorant', serif",
            color: `${accentColor}99`,
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
          }}
        >
          дух глубин
        </p>
      </div>
    </div>
  );
}

// ─── Stream / Creek animation ─────────────────────────────────────────────────

function Creek() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-0"
      style={{ height: "6px" }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(80,140,200,0.3) 20%, rgba(100,180,220,0.5) 50%, rgba(80,140,200,0.3) 80%, transparent 100%)",
          animation: "mist-drift 8s ease-in-out infinite",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

// ─── Wind streaks ─────────────────────────────────────────────────────────────

function WindStreaks({ accent }: { accent: string }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${30 + i * 35}%`,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, ${accent.replace("0.5", "0.1")} 40%, ${accent.replace("0.5", "0.06")} 70%, transparent 100%)`,
            animation: `wind-sweep ${4 + i}s ease-in-out ${i * 1.6}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Fireflies ────────────────────────────────────────────────────────────────

function Fireflies({ color }: { color: string }) {
  const [flies] = useState(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      top: 15 + Math.random() * 60,
      delay: Math.random() * 5,
      dur: 2 + Math.random() * 3,
      size: 2 + Math.random() * 2.5,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {flies.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full firefly"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: color,
            boxShadow: `0 0 6px 2px ${color.replace("0.9", "0.5")}`,
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Tree silhouettes (denser, deeper) ───────────────────────────────────────

function DeepTrees() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" style={{ bottom: 0, top: "auto", height: "45vh" }}>
      <svg viewBox="0 0 1440 350" preserveAspectRatio="none" className="w-full h-full absolute bottom-0">
        <g className="tree-sway" style={{ animationDelay: "0s" }}>
          <path d="M80 350 L80 140 L50 140 L80 60 L110 140 L80 140" fill="#080c05" />
          <path d="M80 350 L80 110 L58 110 L80 30 L102 110 L80 110" fill="#0a0f06" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.8s" }}>
          <path d="M240 350 L240 150 L205 150 L240 55 L275 150 L240 150" fill="#080c05" />
          <path d="M240 350 L240 120 L215 120 L240 35 L265 120 L240 120" fill="#0d1109" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.6s" }}>
          <path d="M430 350 L430 160 L400 160 L430 70 L460 160 L430 160" fill="#080c05" />
          <path d="M430 350 L430 130 L410 130 L430 45 L450 130 L430 130" fill="#0a0f06" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2.2s" }}>
          <path d="M650 350 L650 145 L618 145 L650 62 L682 145 L650 145" fill="#060a04" />
          <path d="M650 350 L650 112 L628 112 L650 32 L672 112 L650 112" fill="#080c05" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.0s" }}>
          <path d="M870 350 L870 155 L840 155 L870 68 L900 155 L870 155" fill="#080c05" />
          <path d="M870 350 L870 122 L848 122 L870 38 L892 122 L870 122" fill="#0a0f06" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2.8s" }}>
          <path d="M1080 350 L1080 148 L1050 148 L1080 65 L1110 148 L1080 148" fill="#080c05" />
          <path d="M1080 350 L1080 116 L1058 116 L1080 36 L1102 116 L1080 116" fill="#0d1109" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.3s" }}>
          <path d="M1300 350 L1300 152 L1272 152 L1300 66 L1328 152 L1300 152" fill="#060a04" />
          <path d="M1300 350 L1300 118 L1280 118 L1300 40 L1320 118 L1300 118" fill="#080c05" />
        </g>
      </svg>
    </div>
  );
}

// ─── Products data ────────────────────────────────────────────────────────────

const productsData: Record<string, {
  name: string;
  description: string;
  price: string;
  tags: string[];
  emoji: string;
  badge?: string;
}[]> = {
  tarot: [
    { emoji: "🃏", name: "Авторская колода «Лес»", description: "78 карт. Иллюстрации от руки — тушь, акварель. Каждая карта — существо леса. В комплекте: мешочек из льна и инструкция-сказка.", price: "4 800 ₽", tags: ["78 карт", "авторская", "ручная работа"], badge: "Бестселлер" },
    { emoji: "📖", name: "Книга-гид по колоде", description: "Авторские интерпретации. Лесная символика, сезонные расклады, ритуалы с колодой под открытым небом.", price: "1 200 ₽", tags: ["120 страниц", "иллюстрации"] },
    { emoji: "🎁", name: "Набор «Колода + книга»", description: "Полный комплект для погружения. Упакован в шкатулку из тёмного дерева с тиснёным орнаментом.", price: "5 600 ₽", tags: ["комплект", "шкатулка", "подарок"], badge: "Хит" },
    { emoji: "🌙", name: "Мини-колода «Ночного леса»", description: "36 карт. Сумеречная палитра — синий, чёрный, серебро. Для ночных ритуалов и лунных раскладов.", price: "2 400 ₽", tags: ["36 карт", "ночная палитра"] },
    { emoji: "✨", name: "Коллекционная карта-оберег", description: "Отдельная карта формата A5, ламинат матовый. Авторский архетип — «Дух осеннего леса».", price: "480 ₽", tags: ["коллекционная", "A5"] },
    { emoji: "🃏", name: "Колода «Четыре стихии»", description: "56 карт малого аркана. Стихии: Огонь, Вода, Земля, Воздух — каждая масть в своей цветовой теме.", price: "3 200 ₽", tags: ["56 карт", "стихии"] },
  ],
  candles: [
    { emoji: "🕯️", name: "Свеча «Пихта и полынь»", description: "Кедровый воск. Аромат хвои и горькой полыни. Горит 40 часов. Ручная работа, фитиль из хлопка.", price: "680 ₽", tags: ["40 ч", "кедровый воск"], badge: "Любимая" },
    { emoji: "🕯️", name: "Свеча «Мелисса и мёд»", description: "Соевый воск, мёд пчелиный. Лёгкий медовый аромат с нотой лимонной мелиссы. Успокаивает и согревает.", price: "620 ₽", tags: ["соевый воск", "медовый аромат"] },
    { emoji: "🕯️", name: "Свеча «Можжевельник»", description: "Очищающий аромат. Можжевельник + морская соль. Идеально для медитации и банных ритуалов.", price: "700 ₽", tags: ["очищение", "медитация"] },
    { emoji: "🕯️", name: "Набор «Четыре сезона»", description: "4 свечи: Весна (ландыш), Лето (смородина), Осень (яблоко+корица), Зима (хвоя+апельсин).", price: "2 200 ₽", tags: ["набор", "4 аромата"], badge: "Подарок" },
    { emoji: "🕯️", name: "Свеча-столбик «Лесной ручей»", description: "Высокая, 28 см. Синяя с вкраплениями слюды. Аромат: чистая вода и мята. Горит 60 часов.", price: "1 100 ₽", tags: ["60 ч", "28 см", "декоративная"] },
    { emoji: "🕯️", name: "Свеча «Дым и янтарь»", description: "Копчёный пачули + янтарная смола. Глубокий, тёплый, чувственный аромат. Тёмная деревянная крышка.", price: "750 ₽", tags: ["пачули", "янтарь"] },
  ],
  amulets: [
    { emoji: "🔮", name: "Оберег «Лесной страж»", description: "Кожа, кость, нить. Намотан вручную под новолуние. Защищает дом и укрепляет намерение.", price: "1 400 ₽", tags: ["защита", "кожа", "кость"], badge: "Авторский" },
    { emoji: "🌿", name: "Амулет из трав «Удача»", description: "Льняной мешочек с набором трав: зверобой, чабрец, мята, полынь. Зашит по старинному обряду.", price: "580 ₽", tags: ["травяной", "лён"] },
    { emoji: "🔮", name: "Оберег «Иней»", description: "Белые нити, кварц, серебристые бусины. Для сна, ясности мысли, лёгкого дыхания.", price: "1 200 ₽", tags: ["кварц", "нити", "сон"] },
    { emoji: "🔮", name: "Оберег «Магма»", description: "Красная нить, обсидиан, медная спираль. Для энергии, смелости, начинаний.", price: "1 350 ₽", tags: ["обсидиан", "медь", "сила"] },
    { emoji: "🌿", name: "Набор оберегов «Три стихии»", description: "Огонь, Вода, Земля — три амулета в берестяной коробочке. Подарочное оформление.", price: "3 200 ₽", tags: ["набор", "подарок"], badge: "Хит" },
    { emoji: "🔮", name: "Ловец снов «Лесная паутина»", description: "Ива, лён, перья. Диаметр 22 см. Ловит сны и отгоняет ночные тревоги.", price: "1 800 ₽", tags: ["ловец снов", "ива"] },
  ],
  crystals: [
    { emoji: "💎", name: "Аметист «Лесное сердце»", description: "Кристалл аметиста, ~60–80г. Для медитации, снятия стресса. Каждый камень уникален.", price: "1 600 ₽", tags: ["аметист", "60–80г"], badge: "Популярный" },
    { emoji: "💎", name: "Горный хрусталь «Чистота»", description: "Прозрачный кристалл, ~40–60г. Усиливает намерение, очищает пространство.", price: "1 100 ₽", tags: ["хрусталь", "40–60г"] },
    { emoji: "💎", name: "Обсидиан «Ночь леса»", description: "Чёрный обсидиан, ~50г. Защитный камень, поглощает негативную энергию.", price: "900 ₽", tags: ["обсидиан", "защита"] },
    { emoji: "💎", name: "Лабрадор «Лунный переливы»", description: "Серо-синий лабрадорит с радужным перламутром. ~70г. Камень интуиции и магии.", price: "2 200 ₽", tags: ["лабрадор", "интуиция"], badge: "Редкий" },
    { emoji: "💎", name: "Розовый кварц «Нежность»", description: "Нежно-розовый кристалл. ~50г. Камень любви и самопринятия.", price: "1 300 ₽", tags: ["розовый кварц", "50г"] },
    { emoji: "💎", name: "Набор «Четыре стихии»", description: "Огненный опал, аквамарин, малахит, дымчатый кварц. В деревянной шкатулке.", price: "4 800 ₽", tags: ["набор", "шкатулка", "подарок"] },
  ],
  salt: [
    { emoji: "✦", name: "Соль «Сибирская тайга»", description: "Каменная соль + кедровая хвоя + пихтовое масло. 500г. Для бани и ванн. Восстанавливает и тонизирует.", price: "480 ₽", tags: ["500г", "хвоя", "тонус"], badge: "Основа" },
    { emoji: "✦", name: "Соль «Медовая баня»", description: "Морская соль + мёд + ромашка. 500г. Питает и смягчает кожу. Нежный медовый аромат.", price: "520 ₽", tags: ["500г", "мёд", "ромашка"] },
    { emoji: "✦", name: "Соль «Горные травы»", description: "Гималайская розовая + тимьян + лаванда + мята. 500г. Очищение и гармония.", price: "560 ₽", tags: ["гималайская", "500г"] },
    { emoji: "✦", name: "Соль «Чёрный лес»", description: "Чёрная гавайская соль + активированный уголь + можжевельник. 300г. Детокс и глубокое очищение.", price: "640 ₽", tags: ["300г", "детокс", "уголь"] },
    { emoji: "✦", name: "Набор «Все сезоны»", description: "4 вида соли в стеклянных банках: весна, лето, осень, зима. Подарочная деревянная корзинка.", price: "1 900 ₽", tags: ["набор", "4 вида", "подарок"], badge: "Подарок" },
    { emoji: "✦", name: "Соль скраб «Магма»", description: "Крупная морская соль + масло ши + красный перец + апельсин. 400г. Пробуждает и согревает.", price: "680 ₽", tags: ["скраб", "400г", "масло ши"] },
  ],
  brooms: [
    { emoji: "🌿", name: "Веник берёзовый авторский", description: "Собран в экологической зоне, высушен при правильной температуре. Мягкий, душистый. Берёза, мята, зверобой.", price: "380 ₽", tags: ["берёза", "мята"], badge: "Классика" },
    { emoji: "🌿", name: "Веник дубовый «Сила»", description: "Дуб + хрен + смородина. Тонизирующий. Для тех, кто ценит жёсткий пар и глубокий прогрев.", price: "420 ₽", tags: ["дуб", "тонус", "прогрев"] },
    { emoji: "🌿", name: "Веник пихтовый «Тайга»", description: "Пихта + кедр. Хвойный эфирный пар. Для дыхания и очищения лёгких. Рекомендован при простудах.", price: "450 ₽", tags: ["пихта", "хвоя", "дыхание"] },
    { emoji: "🌿", name: "Веник эвкалиптовый «Экзотика»", description: "Эвкалипт + мята + лемонграсс. Освежающий аромат. Антибактериальный, снимает мышечное напряжение.", price: "500 ₽", tags: ["эвкалипт", "мята", "мышцы"] },
    { emoji: "🌿", name: "Набор «Все стихии» (4 веника)", description: "Берёза, дуб, пихта, эвкалипт. Полный набор для авторского парения. В льняной авоське.", price: "1 500 ₽", tags: ["набор", "4 шт", "авоська"], badge: "Полный набор" },
    { emoji: "🌿", name: "Веник сухой с полынью", description: "Полынь + лаванда + ромашка. Тонкий целебный аромат. Для нежного парения и успокоения.", price: "360 ₽", tags: ["полынь", "лаванда"] },
  ],
  fans: [
    { emoji: "🪭", name: "Веер «Птица леса»", description: "Войлок, кожаная рукоять. Этнический орнамент. 40×30 см. Создаёт мощный направленный поток пара.", price: "1 800 ₽", tags: ["войлок", "кожа", "40×30"], badge: "Авторский" },
    { emoji: "🪭", name: "Веер из бересты «Старый лес»", description: "Берёста, деревянная рукоять. Лёгкий и прочный. Традиционная техника плетения.", price: "1 200 ₽", tags: ["берёста", "дерево", "традиционный"] },
    { emoji: "🪭", name: "Веер «Магма» (двусторонний)", description: "Тёмная кожа + красное сукно. Двустороннее использование. Фирменный логотип тиснением. 45×35 см.", price: "2 400 ₽", tags: ["кожа", "двусторонний", "45×35"] },
    { emoji: "🪭", name: "Веер хвойный«Тайга»", description: "Основа из пихтовых веток, обшитых льном. Дарит дополнительный хвойный аромат при взмахе.", price: "980 ₽", tags: ["пихта", "лён", "аромат"] },
    { emoji: "🪭", name: "Мини-веер «Иней»", description: "Белый войлок, серебристые нити. 25×20 см. Для деликатного парения, детей и новичков.", price: "800 ₽", tags: ["войлок", "25×20", "мини"] },
    { emoji: "🪭", name: "Набор «Пармастер» (веник + веер)", description: "Дубовый веник + авторский войлочный веер в подарочной упаковке. Комплект для настоящего парения.", price: "2 600 ₽", tags: ["набор", "подарок", "комплект"], badge: "Подарок" },
  ],
  zaparka: [
    { emoji: "🫖", name: "Запарка «Дыхание тайги»", description: "Пихта, кедровая хвоя, можжевельник. Насыщает пар смолистым ароматом, очищает дыхательные пути. 50г.", price: "320 ₽", tags: ["50г", "пихта", "хвоя"], badge: "Хит" },
    { emoji: "🫖", name: "Запарка «Луговые травы»", description: "Душица, чабрец, мята, зверобой. Мягкий цветочно-травяной аромат. Успокаивает и расслабляет. 50г.", price: "280 ₽", tags: ["50г", "чабрец", "мята"] },
    { emoji: "🫖", name: "Запарка «Эвкалиптовая»", description: "Эвкалипт + мята + лемонграсс. Антибактериальная, освежающая. Незаменима при простуде. 40г.", price: "350 ₽", tags: ["40г", "эвкалипт", "антибакт."] },
    { emoji: "🫖", name: "Запарка «Медовый сбор»", description: "Ромашка, лаванда, мелисса, липовый цвет. Нежный медово-цветочный аромат. Снимает стресс. 50г.", price: "300 ₽", tags: ["50г", "ромашка", "лаванда"] },
    { emoji: "🫖", name: "Запарка «Огонь и лёд»", description: "Красный перец, имбирь — для жара, плюс мята и эвкалипт — для прохлады. Контрастный аромат. 45г.", price: "380 ₽", tags: ["45г", "контраст", "тонус"], badge: "Авторская" },
    { emoji: "🫖", name: "Набор запарок «Четыре стихии»", description: "Огонь (перец+гвоздика), Вода (мята+мелисса), Земля (чабрец+душица), Воздух (эвкалипт+пихта). 4×40г.", price: "1 100 ₽", tags: ["набор", "4×40г", "подарок"], badge: "Подарок" },
  ],
};

// ─── Add to cart notification ─────────────────────────────────────────────────

function ToastNotif({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl text-sm animate-slide-up"
      style={{
        background: "rgba(14,22,10,0.96)",
        border: "1px solid rgba(122,184,138,0.3)",
        color: "var(--forest-spirit)",
        fontFamily: "'Cormorant', serif",
        fontSize: "1rem",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.5), 0 0 30px rgba(80,140,60,0.1)",
      }}
    >
      🌿 {msg}
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({
  product,
  accent,
  onAdd,
}: {
  product: { name: string; description: string; price: string; tags: string[]; emoji: string; badge?: string };
  accent: string;
  onAdd: (name: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="forest-card mushroom-glow rounded-2xl p-6 relative flex flex-col"
      style={{ background: "rgba(10,14,8,0.9)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.badge && (
        <span
          className="absolute top-4 right-4 text-xs px-2.5 py-1 rounded-full tracking-wider"
          style={{
            background: `${accent.replace("0.5", "0.15")}`,
            color: accent.replace("0.5", "0.9"),
            border: `1px solid ${accent.replace("0.5", "0.3")}`,
            fontFamily: "'Golos Text', sans-serif",
          }}
        >
          {product.badge}
        </span>
      )}

      <div
        className="text-4xl mb-4 transition-transform duration-500 inline-block"
        style={{ transform: hovered ? "scale(1.2) rotate(-8deg)" : "scale(1) rotate(0)" }}
      >
        {product.emoji}
      </div>

      <h3
        className="text-xl font-light mb-2 leading-snug"
        style={{ fontFamily: "'Cormorant', serif", color: "var(--forest-cream)" }}
      >
        {product.name}
      </h3>

      <p
        className="text-sm leading-relaxed mb-4 flex-1"
        style={{ color: "rgba(168,184,144,0.65)", fontSize: "0.88rem" }}
      >
        {product.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {product.tags.map((t) => (
          <span
            key={t}
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: `${accent.replace("0.5", "0.08")}`,
              color: accent.replace("0.5", "0.7"),
              border: `1px solid ${accent.replace("0.5", "0.15")}`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span
          className="text-xl font-light"
          style={{ fontFamily: "'Cormorant', serif", color: accent.replace("0.5", "0.9") }}
        >
          {product.price}
        </span>
        <button
          onClick={() => onAdd(product.name)}
          className="px-4 py-2 rounded-xl text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
          style={{
            background: `linear-gradient(135deg, ${accent.replace("0.5", "0.2")}, ${accent.replace("0.5", "0.1")})`,
            border: `1px solid ${accent.replace("0.5", "0.3")}`,
            color: accent.replace("0.5", "0.85"),
          }}
        >
          Написать
        </button>
      </div>
    </div>
  );
}

// ─── Main ShopCategory page ───────────────────────────────────────────────────

export default function ShopCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const cat = shopCategories.find((c) => c.id === category);
  const products = productsData[category || ""] || [];

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  if (!cat) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--forest-bg)", color: "var(--forest-cream)" }}
      >
        <div className="text-center">
          <p className="text-6xl mb-4">🌿</p>
          <p style={{ fontFamily: "'Cormorant', serif", fontSize: "1.5rem" }}>
            Тропинка не найдена
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="mt-4 text-sm underline"
            style={{ color: "var(--forest-spirit)" }}
          >
            Вернуться в лес
          </button>
        </div>
      </div>
    );
  }

  const accentRaw = cat.accent;
  const flyColor = cat.leafColor.replace("0.6", "0.9");

  function handleAdd(name: string) {
    setToast(`«${name}» — напишите Марии для заказа`);
  }

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--forest-deep)", color: "var(--forest-cream)" }}
    >
      {/* Atmospheric background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: cat.bg }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(10,20,6,0.9) 0%, transparent 60%)",
        }}
      />

      <DeepTrees />
      <Creek />
      <WindStreaks accent={accentRaw} />
      <FallingLeaves accent={cat.leafColor} />
      <Fireflies color={flyColor} />
      <DeepSpirit accentColor={accentRaw.replace("0.5", "0.7")} />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(6,8,4,0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: `1px solid ${accentRaw.replace("0.5", "0.12")}`,
        }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: accentRaw.replace("0.5", "0.8") }}
          >
            <Icon name="ArrowLeft" size={18} />
            <span className="text-sm tracking-wider" style={{ fontFamily: "'Cormorant', serif" }}>
              Лесная лавка
            </span>
          </button>
          <span style={{ color: "rgba(168,184,144,0.25)" }}>·</span>
          <span
            className="text-sm"
            style={{ fontFamily: "'Cormorant', serif", color: "rgba(168,184,144,0.5)" }}
          >
            {cat.title}
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-xs tracking-wider hover:opacity-70 transition-opacity"
          style={{ color: "rgba(168,184,144,0.4)" }}
        >
          Домой
        </button>
      </nav>

      {/* Hero section for category */}
      <section
        className="relative min-h-[55vh] flex flex-col items-center justify-center pt-20 px-6"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Depth path */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            {["/shop", cat.title].map((step, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && <Icon name="ChevronRight" size={12} color="rgba(168,184,144,0.3)" />}
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: i === 0 ? "rgba(168,184,144,0.4)" : accentRaw.replace("0.5", "0.7") }}
                >
                  {i === 0 ? "Лесная тропа" : step}
                </span>
              </span>
            ))}
          </div>

          <div className="text-6xl mb-5 inline-block" style={{ animation: "spirit-float 3s ease-in-out infinite" }}>
            {cat.emoji}
          </div>

          <p
            className="text-xs uppercase tracking-[0.5em] mb-3"
            style={{ color: accentRaw.replace("0.5", "0.6") }}
          >
            {cat.depth}
          </p>

          <h1
            className="text-4xl md:text-6xl font-light leading-tight mb-4"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--forest-cream)",
              textShadow: `0 0 60px ${accentRaw.replace("0.5", "0.25")}`,
            }}
          >
            {cat.title}
          </h1>

          <p
            className="text-lg italic mb-2"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "rgba(200,220,170,0.65)",
            }}
          >
            {cat.tagline}
          </p>

          <p
            className="text-xs"
            style={{ color: "rgba(168,184,144,0.4)" }}
          >
            {cat.featured}
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-pulse-gold"
          style={{ color: accentRaw.replace("0.5", "0.4") }}
        >
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* Products grid */}
      <section className="relative py-16 px-6 z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            style={{
              opacity: entered ? 1 : 0,
              transition: "opacity 1s ease 0.3s",
            }}
          >
            {products.map((product, i) => (
              <div
                key={product.name}
                style={{
                  opacity: entered ? 1 : 0,
                  transform: entered ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.07}s`,
                }}
              >
                <ProductCard
                  product={product}
                  accent={accentRaw}
                  onAdd={handleAdd}
                />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-16 text-center p-8 rounded-2xl"
            style={{
              background: "rgba(10,14,8,0.8)",
              border: `1px solid ${accentRaw.replace("0.5", "0.15")}`,
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              className="text-2xl font-light mb-3"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--forest-cream)" }}
            >
              Нет нужного?
            </p>
            <p
              className="text-sm mb-6"
              style={{ color: "rgba(168,184,144,0.55)" }}
            >
              Напишите Марии — создам специально для вас с учётом ваших пожеланий.
            </p>
            <a
              href="https://t.me/+79186860650"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl text-sm tracking-wider transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #1a3a8a, #1060b0)",
                color: "white",
                textDecoration: "none",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.04 9.613c-.15.672-.546.836-1.107.52l-3.07-2.262-1.48 1.424c-.164.164-.3.3-.616.3l.22-3.11 5.67-5.12c.247-.22-.054-.342-.382-.122L7.34 14.6l-3.01-.94c-.654-.205-.667-.654.137-.968l11.726-4.522c.546-.197 1.023.133.87.078z" />
              </svg>
              Написать Марии
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-10 px-6 text-center z-10"
        style={{
          borderTop: `1px solid ${accentRaw.replace("0.5", "0.08")}`,
          background: "rgba(4,6,3,0.95)",
        }}
      >
        <button
          onClick={() => navigate("/shop")}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4"
          style={{ color: accentRaw.replace("0.5", "0.6") }}
        >
          <Icon name="ArrowLeft" size={14} />
          Вернуться в лесную лавку
        </button>
        <p
          className="text-xs block"
          style={{ color: "rgba(168,184,144,0.25)" }}
        >
          Иней и Магма corp. · Мария · Пармастер
        </p>
      </footer>

      {toast && <ToastNotif msg={toast} onClose={() => setToast(null)} />}
    </div>
  );
}