import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// ─── Leaf particle ────────────────────────────────────────────────────────────

const LEAF_SHAPES = ["🍂", "🍁", "🌿", "🍃", "🍂", "🍁"];

function Leaf({ style, shape }: { style: React.CSSProperties; shape: string }) {
  return (
    <span
      className="fixed pointer-events-none select-none z-10"
      style={{ fontSize: "clamp(14px,2vw,22px)", ...style }}
    >
      {shape}
    </span>
  );
}

function FallingLeaves() {
  const [leaves, setLeaves] = useState<
    { id: number; left: number; delay: number; dur: number; shape: string; cls: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      dur: 7 + Math.random() * 8,
      shape: LEAF_SHAPES[Math.floor(Math.random() * LEAF_SHAPES.length)],
      cls: ["leaf-fall-1", "leaf-fall-2", "leaf-fall-3"][i % 3],
    }));
    setLeaves(generated);
  }, []);

  return (
    <>
      {leaves.map((l) => (
        <Leaf
          key={l.id}
          shape={l.shape}
          style={{
            left: `${l.left}%`,
            top: "-40px",
            animationName: l.cls.replace("leaf-fall-", "") === "1"
              ? "leaf-fall-1"
              : l.cls.replace("leaf-fall-", "") === "2"
              ? "leaf-fall-2"
              : "leaf-fall-3",
            animationDuration: `${l.dur}s`,
            animationDelay: `${l.delay}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
            animationFillMode: "both",
          }}
        />
      ))}
    </>
  );
}

// ─── Wind streaks ─────────────────────────────────────────────────────────────

function WindStreaks() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${20 + i * 28}%`,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(168,184,144,0.12) 40%, rgba(168,184,144,0.08) 70%, transparent 100%)",
            animation: `wind-sweep ${3.5 + i * 0.8}s ease-in-out ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Forest Spirit SVG ────────────────────────────────────────────────────────

function ForestSpirit({ side = "right" }: { side?: "left" | "right" }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    function cycle() {
      const wait = 8000 + Math.random() * 10000;
      timerRef.current = setTimeout(() => {
        setVisible(true);
        setTimeout(() => { setVisible(false); cycle(); }, 4000);
      }, wait);
    }
    cycle();
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="fixed bottom-[15%] z-20 pointer-events-none"
      style={{
        [side]: side === "right" ? "0" : "0",
        transition: "transform 1.2s cubic-bezier(0.34,1.56,0.64,1), opacity 1s ease",
        transform: visible
          ? "translateX(0)"
          : side === "right"
          ? "translateX(110%)"
          : "translateX(-110%)",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="spirit-float spirit-glow">
        <svg width="90" height="130" viewBox="0 0 90 130" fill="none">
          {/* Tree trunk */}
          <rect x="35" y="70" width="20" height="55" rx="4" fill="#3d2e1a" />
          <rect x="40" y="70" width="8" height="55" rx="3" fill="#5a4228" opacity="0.5" />
          {/* Canopy */}
          <ellipse cx="45" cy="55" rx="30" ry="38" fill="#1e2e14" />
          <ellipse cx="45" cy="45" rx="22" ry="30" fill="#253818" />
          <ellipse cx="38" cy="38" rx="14" ry="20" fill="#2e4820" />
          {/* Spirit face peering */}
          <ellipse cx="55" cy="58" rx="14" ry="16" fill="rgba(122,184,138,0.15)" />
          <circle cx="51" cy="54" r="3.5" fill="rgba(122,184,138,0.7)" />
          <circle cx="59" cy="56" r="2.8" fill="rgba(122,184,138,0.6)" />
          <circle cx="51.8" cy="53.2" r="1" fill="rgba(200,240,210,0.9)" />
          <circle cx="59.8" cy="55.2" r="0.8" fill="rgba(200,240,210,0.9)" />
          <path d="M50 63 Q55 66 60 63" stroke="rgba(122,184,138,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Leaves on spirit */}
          <text x="18" y="35" fontSize="12" style={{ fill: "rgba(180,120,40,0.7)" }}>🍂</text>
          <text x="58" y="28" fontSize="10" style={{ fill: "rgba(180,80,20,0.6)" }}>🍁</text>
          {/* Moss sparkles */}
          <circle cx="30" cy="60" r="1.5" fill="rgba(122,184,138,0.5)" />
          <circle cx="68" cy="48" r="1" fill="rgba(122,184,138,0.4)" />
        </svg>
        <p
          className="text-center text-xs mt-1"
          style={{
            fontFamily: "'Cormorant', serif",
            color: "rgba(122,184,138,0.7)",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          лесной дух
        </p>
      </div>
    </div>
  );
}

// ─── Mist layer ───────────────────────────────────────────────────────────────

function Mist() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0" style={{ height: "220px" }}>
      <div
        className="mist-drift absolute inset-0 rounded-t-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(100,130,80,0.18) 0%, rgba(60,80,40,0.08) 50%, transparent 80%)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}

// ─── Trees silhouette ─────────────────────────────────────────────────────────

function TreeSilhouettes() {
  return (
    <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-0" style={{ height: "35vh" }}>
      <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className="w-full h-full">
        <g className="tree-sway" style={{ animationDelay: "0s" }}>
          <path d="M60 300 L60 150 L30 150 L60 80 L90 150 L60 150" fill="#0d1109" />
          <path d="M60 300 L60 120 L40 120 L60 50 L80 120 L60 120" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.5s" }}>
          <path d="M200 300 L200 160 L165 160 L200 70 L235 160 L200 160" fill="#0d1109" />
          <path d="M200 300 L200 130 L175 130 L200 40 L225 130 L200 130" fill="#111508" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.8s" }}>
          <path d="M380 300 L380 170 L350 170 L380 90 L410 170 L380 170" fill="#0d1109" />
          <path d="M380 300 L380 140 L360 140 L380 60 L400 140 L380 140" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2s" }}>
          <path d="M600 300 L600 155 L568 155 L600 75 L632 155 L600 155" fill="#0a0d06" />
          <path d="M600 300 L600 120 L578 120 L600 40 L622 120 L600 120" fill="#0d1109" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.2s" }}>
          <path d="M820 300 L820 165 L792 165 L820 85 L848 165 L820 165" fill="#0d1109" />
          <path d="M820 300 L820 130 L800 130 L820 50 L840 130 L820 130" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "2.5s" }}>
          <path d="M1020 300 L1020 158 L990 158 L1020 78 L1050 158 L1020 158" fill="#0d1109" />
          <path d="M1020 300 L1020 125 L1000 125 L1020 45 L1040 125 L1020 125" fill="#111508" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "0.4s" }}>
          <path d="M1240 300 L1240 162 L1210 162 L1240 82 L1270 162 L1240 162" fill="#0d1109" />
          <path d="M1240 300 L1240 128 L1220 128 L1240 48 L1260 128 L1240 128" fill="#141a0e" />
        </g>
        <g className="tree-sway" style={{ animationDelay: "1.8s" }}>
          <path d="M1400 300 L1400 150 L1376 150 L1400 70 L1424 150 L1400 150" fill="#0a0d06" />
          <path d="M1400 300 L1400 118 L1382 118 L1400 38 L1418 118 L1400 118" fill="#0d1109" />
        </g>
      </svg>
    </div>
  );
}

// ─── Fireflies ────────────────────────────────────────────────────────────────

function Fireflies() {
  const flies = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: 5 + Math.random() * 90,
    top: 20 + Math.random() * 55,
    delay: Math.random() * 5,
    dur: 2 + Math.random() * 3,
    size: 2 + Math.random() * 3,
  }));

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
            background: "rgba(180, 220, 120, 0.9)",
            boxShadow: "0 0 6px 2px rgba(180,220,120,0.5)",
            animationDuration: `${f.dur}s`,
            animationDelay: `${f.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Shop data ────────────────────────────────────────────────────────────────

// ─── Mendacium Veritas Modal ──────────────────────────────────────────────────

const PRACTICE_STEPS = [
  {
    id: "intro",
    icon: "🔥",
    title: "Mendacium Veritas",
    accent: "rgba(220,80,30,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(220,80,30,0.14) 0%, transparent 65%)",
    text: "Embark on an extraordinary journey where the lines between truth and illusion blur, unlocking the door to self-discovery.\n\nExplore a captivating deck of cards that will guide you through the intricate maze of your own consciousness.\n\n— — —\n\nОтправьтесь в необыкновенное путешествие, где грань между правдой и иллюзией стирается, открывая дверь к познанию себя.\n\nИсследуйте завораживающую колоду карт, которая проведёт вас сквозь запутанный лабиринт вашего собственного сознания.",
  },
  {
    id: "mirror",
    icon: "🪞",
    title: "Зеркало истины · Монеты перемен",
    accent: "rgba(140,80,200,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(140,80,200,0.13) 0%, transparent 65%)",
    text: "Представьте себе зеркало, отражающее не вашу привычную внешность, а вашу суть..\n\nВглядитесь.. Что вы видите? Кого вы видите в нём?.. Отражается ли то что вы хотели бы? Может наоборот то что точно не планировали увидеть.. Присмотритесь ещё раз..\n\nК вам подошли и положили в ваши ладони крупные тяжёлые монетки — это бонусы, используя которые вы можете изменить то что видите в этом зеркале, улучшить или полностью перепрошить, так сказать.\n\nРешившись на изменения, вы подкидываете монетку в воздух и она растворяется.. Взмах вашей руки или клик компьютерной мышки — и отражение изменилось. Вам нравятся новые перемены? Или требуется применить ctrl+z для отмены результата?",
  },
  {
    id: "cards",
    icon: "🃏",
    title: "Карты колоды",
    accent: "rgba(100,140,220,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(80,120,200,0.13) 0%, transparent 65%)",
    text: "Отшельник · Путь внутрь себя, уединение и мудрость тишины. Тот, кто ищет свет в темноте собственного пути.\n\nИмператрица · Сила плодородия и созидания. Всё живое тянется к ней — она источник и исток.\n\nСмерть · Не конец, а великое преображение. Старое уходит, освобождая место для нового.\n\nМир · Завершённость цикла. Птицы, взмывающие ввысь сквозь огонь — свобода после испытания.\n\nДьявол · Искушение и зеркало теней. Та, что стоит между двух миров и смотрит прямо в глаза.\n\nКолесо Фортуны · Шар в старой библиотеке — силы, которые вращают судьбу. Твой момент перемен.",
  },
  {
    id: "journey",
    icon: "🌿",
    title: "Путешествие · Густой туман",
    accent: "rgba(80,160,120,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(60,140,100,0.11) 0%, transparent 65%)",
    text: "Вы вышли на улицу после занятия на террасе крыши. Лёгкое чувство эйфории, вы в предвкушении — возможно вы даже сможете стать новатором, применив информацию в своей сфере.. За вашей спиной академия Ice Fire.\n\nДует свежий тёплый ветер, моросит дождь. Вашему взгляду попадается удивительный цветок — лилия с прозрачными лепестками и огнём в сердцевине. Вы дотрагиваетесь до лепестка..\n\nВремя остановилось. Густой туман заполнил парк, воздух словно подтолкнул вас вперёд. Сомнений не было: раз ведут энергии — то пойдём, а там на месте уже разберёмся..\n\nПарковая зона закончилась. Вы увидели улицу и ничем не примечательную сталинку. Но вас подталкивало именно к ней — до самой двери у торца. Коричневая деревянная дверь. Вы повернули ручку и вошли.",
  },
  {
    id: "shop",
    icon: "🏚",
    title: "Маленькая лавка · Примерочная",
    accent: "rgba(180,120,60,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(180,120,60,0.12) 0%, transparent 65%)",
    text: "Приглушённый туманом солнечный луч наполнял комнату своим светом, запах деревянной мебели и хвои. Книжная полка, статуэтки, вешалка с текстурными вещами. За прилавком — женщина в тёплом этническом платке.\n\n— Помочь?\n\nДа, нет — вы поджали губы и отрицательно мотнули головой. «С чем тут поможешь, когда я вообще здесь оказался случайно» — подумали вы.\n\nВы провели рукой по висящей кофте — нежная ткань лесного зелёного. Следующая вещь — гладкая холодная чёрная кожа. Вы решили примерить несколько моделей. Выйдя из примерочной, встали перед зеркалом. Чёрный кожаный корсет с вышитыми цветами — вы такое не носили прежде, но теперь видите, как это вам идёт..\n\nВы обернулись — и в этот момент ваше мировосприятие преобразилось. Нет, в лавке ничего не изменилось. Изменились ваши ощущения.\n\nЛавка с самыми уникальными предметами вселенной..",
  },
  {
    id: "book",
    icon: "📖",
    title: "Mendacium Veritas",
    accent: "rgba(100,140,220,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(80,120,200,0.13) 0%, transparent 65%)",
    text: "Женщина улыбнулась своим мыслям, сняла с себя платок, положив его на высокий стул, и подошла к книжной полке. Среди множества статуэток и книг она выбрала одну и подошла к вам.\n\nОна протягивает её вам. Возьмёте ли?\n\nЖенщина держит руку на весу, протягивая вам книгу. Светло-голубая обложка с серебряной гравировкой и рисунок — ледяной мост над пропастью, через который перепрыгивает сурикат.. Занятно.\n\nУ людей не принято ждать долго, пора решаться. Вы сегодня вообще не планировали покупки, верно? Это всё странный ветер да туман — это они виновники того, что вы открыли дверь лавки. Решайтесь. Выбор за вами.\n\nВы протянули руку взять книгу — не потому что решились, а потому что не произнесли «нет».",
  },
  {
    id: "payment",
    icon: "🪙",
    title: "Три монеты",
    accent: "rgba(200,146,58,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(200,146,58,0.13) 0%, transparent 65%)",
    text: "Вы подошли к прилавку с корсетом и книгой, протягивая купюры. Цены нигде не указаны. Женщина смотрит на синие бумажки, протянутые вами.\n\n— Не пойдёт..\n\nВы в недоумении. Карты нет. Женщина улыбается, вздыхает и стучит пальцем по стеклянной банке, в которой горстка монет — таких же монет, что вручил вам незнакомец несколько дней назад, когда вы встретили своё истинное отражение..\n\nВы нашупали монеты в кармане джинс. Достали три.\n\n— Сколько за корсет?\n— Три монеты.\n— Так дорого — подметили вы, вспомнив, что изменения вашей внутренней сути стоили вам всего одну монету..\n\nЖенщина вновь улыбнулась, словно прочитав ваши мысли..",
  },
  {
    id: "price",
    icon: "⚖️",
    title: "Цена внутреннего и внешнего",
    accent: "rgba(160,100,220,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(140,80,200,0.13) 0%, transparent 65%)",
    text: "Монета, которую ты отдала за свои глубинные изменения — это не просто монета. Она олицетворяла: твоё время, дисциплину, твёрдую уверенность в необходимости перемен, работу над эго, твоё осознание. Внутренние перемены стоят очень дорого, верно. А внешние ещё дороже.\n\nЭти три монеты не олицетворяют ни дисциплину, ни упорство, ни дух характера — нет, но они тот инструмент, благодаря которому ты можешь взаимодействовать со многими. Эти три монеты — плата за восприятие тебя окружающим миром.\n\nТы покупаешь не корсет с вышитыми цветами, не просто дизайнерскую ручную работу, на которую ушли месяцы жизни автора — ты приобретаешь самопроявление своей внутренней сути в мир. Люди будут видеть тебя той самой, настоящей, кем ты являешься, той, кем ты видела себя в отражении..\n\nС таким приобретением твои люди будут видеть тебя всегда, а не растворяться в вечернем сумраке, уходя по улице города под светом фонарей. Стоит ли это того — решать тебе..",
  },
  {
    id: "practice",
    icon: "✨",
    title: "Вернитесь к зеркалу",
    accent: "rgba(180,140,255,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(160,110,255,0.14) 0%, transparent 65%)",
    text: "Хозяйка с мягкой улыбкой наблюдала, как вы с любопытством бродите по старой лавке, изучая предметы и вещи на полках. Таинственная атмосфера магазина наполняет предвкушением новых открытий. Каждая книга и каждая вещь в этой лавке хранит свою историю.\n\nТы решилась? Отлично. С тебя три монеты.\n\nСамоуважение, потенциал, таланты — эти три монеты промелькнули у вас в мыслях. Вы протянули их. Хозяйка скинула монеты в банку — они чуть звякнули. Женщина протянула вам пакет с корсетом и книгой — и нет, она вовсе не забыла взять с вас оплату за книгу, она отдала её вам в дар.\n\nВернитесь к зеркалу, с которого началось ваше преображение..\n\nВы готовы к тому, что люди в вас увидят эту же картину? Может быть, вы хотите что-то ещё доработать — у вас есть на это пара монет, или всё уже готово?\n\nПодумайте, не спешите, и когда решитесь — пойдём дальше..",
  },
  {
    id: "epilogue",
    icon: "🌧",
    title: "На вас так странно смотрят прохожие..",
    accent: "rgba(120,160,200,0.9)",
    bg: "radial-gradient(ellipse at 50% 0%, rgba(100,140,180,0.1) 0%, transparent 65%)",
    text: "Вы кивнули, пожелали хорошего дня и вышли на улицу. Дождь уже прекратился, мимо проезжали машины..\n\nВы замешкались на пороге, думая, что всё-таки следовало бы заплатить за книжку, и вновь открыли дверь — но там уже не было старинной лавки. Это был обычный продуктовый магазин с бумажными пакетами молока, свежим хлебом и солью на витрине.\n\nВы вдохнули аромат свежего тёплого хлеба и не удержались. Ещё один холщовый пакет в ваших руках.\n\nВы возвращаетесь в академию. Вот только одно..\n\nНа вас так странно смотрят прохожие..",
  },
];

function FloatingCoin({ style }: { style: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none select-none" style={style}>
      <div style={{
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        background: "radial-gradient(circle at 35% 35%, #f0d080, #c8923a 60%, #8a5a10)",
        boxShadow: "0 0 12px rgba(200,146,58,0.6), inset 0 1px 2px rgba(255,240,180,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
      }}>✦</div>
    </div>
  );
}

function Campfire3D({ visible }: { visible: boolean }) {
  const [lit, setLit] = useState(false);
  const [fullBlaze, setFullBlaze] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setLit(true), 300);
    const t2 = setTimeout(() => setFullBlaze(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  return (
    <div style={{ position: "relative", width: "180px", height: "200px", margin: "0 auto 8px", perspective: "600px" }}>
      {/* Ground glow */}
      <div style={{
        position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
        width: fullBlaze ? "160px" : "60px", height: fullBlaze ? "30px" : "12px",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(220,80,20,0.5) 0%, rgba(200,60,10,0.2) 50%, transparent 80%)",
        filter: "blur(8px)",
        transition: "all 1.2s ease",
      }} />

      {/* 3D Log base */}
      <div style={{
        position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%) rotateX(55deg)",
        width: "100px", transformStyle: "preserve-3d",
      }}>
        {/* Log 1 */}
        <div style={{
          position: "absolute", bottom: 0, left: "10px",
          width: "80px", height: "16px", borderRadius: "8px",
          background: "linear-gradient(90deg, #3d1a08, #6b3010, #3d1a08)",
          transform: "rotate(-25deg) translateY(8px)",
          boxShadow: lit ? "0 2px 12px rgba(200,80,20,0.6)" : "none",
          transition: "box-shadow 0.8s ease",
        }} />
        {/* Log 2 */}
        <div style={{
          position: "absolute", bottom: 0, left: "10px",
          width: "80px", height: "16px", borderRadius: "8px",
          background: "linear-gradient(90deg, #4a2010, #7a3818, #4a2010)",
          transform: "rotate(25deg) translateY(8px)",
          boxShadow: lit ? "0 2px 12px rgba(200,80,20,0.6)" : "none",
          transition: "box-shadow 0.8s ease 0.2s",
        }} />
        {/* Embers log top */}
        <div style={{
          position: "absolute", bottom: "6px", left: "30px",
          width: "40px", height: "10px", borderRadius: "5px",
          background: lit ? "linear-gradient(90deg,#8b3010,#d4500a,#8b3010)" : "#3d1a08",
          boxShadow: lit ? "0 0 16px rgba(220,80,20,0.9), 0 0 6px rgba(255,140,40,0.5)" : "none",
          transition: "all 1s ease 0.4s",
        }} />
      </div>

      {/* Flame layers — CSS 3D */}
      <div style={{
        position: "absolute", bottom: "52px", left: "50%", transform: "translateX(-50%)",
        width: "70px", height: fullBlaze ? "120px" : lit ? "60px" : "0px",
        transition: "height 1s ease 0.6s",
        transformStyle: "preserve-3d",
      }}>
        {/* Core flame */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
          width: fullBlaze ? "50px" : "28px",
          height: "100%",
          background: "radial-gradient(ellipse at 50% 80%, #ff8020 0%, #ff4000 40%, #ff6010 70%, transparent 100%)",
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          filter: "blur(2px)",
          animation: lit ? "flicker 0.8s ease-in-out infinite alternate" : "none",
          transition: "width 0.8s ease",
          opacity: lit ? 1 : 0,
        }} />
        {/* Outer flame */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%", transform: "translateX(-52%)",
          width: fullBlaze ? "70px" : "40px",
          height: fullBlaze ? "90%" : "70%",
          background: "radial-gradient(ellipse at 50% 85%, rgba(255,140,0,0.7) 0%, rgba(255,60,0,0.5) 45%, transparent 80%)",
          borderRadius: "50% 50% 30% 30% / 60% 60% 40% 40%",
          filter: "blur(4px)",
          animation: lit ? "flicker 1.1s ease-in-out 0.15s infinite alternate" : "none",
          transition: "width 0.9s ease 0.1s, height 0.9s ease 0.1s",
          opacity: lit ? 0.85 : 0,
        }} />
        {/* Tip flame — blue-white */}
        <div style={{
          position: "absolute", bottom: "40%", left: "50%", transform: "translateX(-50%)",
          width: fullBlaze ? "22px" : "12px",
          height: fullBlaze ? "55%" : "40%",
          background: "radial-gradient(ellipse at 50% 90%, rgba(255,220,120,0.9) 0%, rgba(255,100,20,0.6) 60%, transparent 100%)",
          borderRadius: "50% 50% 30% 30% / 70% 70% 30% 30%",
          filter: "blur(1px)",
          animation: lit ? "flicker 0.6s ease-in-out 0.3s infinite alternate" : "none",
          opacity: fullBlaze ? 1 : 0,
          transition: "opacity 0.6s ease 1s, width 0.8s ease",
        }} />
      </div>

      {/* Sparks */}
      {fullBlaze && [...Array(7)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          bottom: `${70 + i * 12}px`,
          left: `${50 + (i % 2 === 0 ? 1 : -1) * (8 + i * 5)}%`,
          width: "3px", height: "3px",
          borderRadius: "50%",
          background: i % 3 === 0 ? "#ffdd60" : i % 3 === 1 ? "#ff8020" : "#ff4400",
          boxShadow: "0 0 4px rgba(255,160,40,0.8)",
          animation: `spirit-float ${1 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
          opacity: 0.9,
        }} />
      ))}

      {/* English title glow text */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "200px", textAlign: "center",
        opacity: fullBlaze ? 1 : 0, transition: "opacity 1s ease 1.5s",
      }}>
        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "0.7rem",
          letterSpacing: "0.35em",
          color: "rgba(255,140,40,0.7)",
          textTransform: "uppercase",
          textShadow: "0 0 20px rgba(220,80,20,0.5)",
        }}>Truth · Illusion · Self</p>
      </div>
    </div>
  );
}

function Mirror3D({ visible }: { visible: boolean }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div style={{ perspective: "900px", width: "160px", height: "200px", margin: "0 auto 10px", position: "relative" }}>
      {/* Outer ambient halo */}
      <div style={{
        position: "absolute", inset: "-20px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(140,80,200,0.22) 0%, transparent 65%)",
        opacity: revealed ? 1 : 0, transition: "opacity 1s ease 0.8s", pointerEvents: "none",
        animation: revealed ? "pulseGold 3s ease-in-out infinite" : "none",
      }} />

      {/* 3D card that flips into view */}
      <div style={{
        width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transform: revealed ? "rotateY(0deg) rotateX(0deg)" : "rotateY(75deg) rotateX(-10deg)",
        transition: "transform 1.3s cubic-bezier(0.22,1,0.36,1)",
        position: "relative",
      }}>
        {/* FRONT — mirror surface, no emoji */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          borderRadius: "50% 50% 46% 46% / 42% 42% 58% 58%",
          overflow: "hidden",
          border: "2px solid rgba(190,140,255,0.5)",
          boxShadow: revealed
            ? "0 0 90px rgba(140,80,200,0.55), inset 0 0 50px rgba(120,70,200,0.18), 0 20px 50px rgba(0,0,0,0.7)"
            : "0 0 20px rgba(100,60,160,0.2)",
          transition: "box-shadow 0.9s ease 0.9s",
        }}>
          {/* Deep glass base */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(170deg, #18082e 0%, #0c0520 45%, #160a2a 100%)",
          }} />
          {/* Diagonal shimmer */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(118deg, rgba(220,200,255,0.13) 0%, transparent 38%, rgba(100,70,200,0.07) 80%, transparent 100%)",
          }} />
          {/* Main glare — top-left oval */}
          <div style={{
            position: "absolute", top: "6%", left: "12%",
            width: "38%", height: "42%",
            background: "radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.14) 0%, rgba(200,170,255,0.06) 50%, transparent 80%)",
            borderRadius: "50%", transform: "rotate(-22deg)",
          }} />
          {/* Secondary glare — bottom-right */}
          <div style={{
            position: "absolute", bottom: "10%", right: "8%",
            width: "22%", height: "28%",
            background: "radial-gradient(ellipse, rgba(180,140,255,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }} />
          {/* Inner depth gradient */}
          <div style={{
            position: "absolute", inset: "12px",
            borderRadius: "48% 48% 44% 44% / 40% 40% 56% 56%",
            background: "radial-gradient(ellipse at 50% 40%, rgba(160,120,255,0.1) 0%, rgba(80,50,160,0.05) 60%, transparent 100%)",
          }} />
          {/* Floating light orb — centre */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(220,190,255,0.25) 0%, transparent 70%)",
            animation: revealed ? "pulseGold 2.5s ease-in-out infinite" : "none",
          }} />
          {/* Particle dust */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: i % 3 === 0 ? "4px" : "2px",
              height: i % 3 === 0 ? "4px" : "2px",
              borderRadius: "50%",
              background: `rgba(${195 + i * 7},${160 + i * 5},255,${0.3 + i * 0.07})`,
              left: `${14 + i * 10}%`,
              top: `${22 + (i % 4) * 15}%`,
              animation: revealed ? `pulseGold ${1.9 + i * 0.32}s ease-in-out ${i * 0.24}s infinite` : "none",
            }} />
          ))}
        </div>

        {/* BACK face */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden",
          borderRadius: "50% 50% 46% 46% / 42% 42% 58% 58%",
          background: "linear-gradient(160deg, #06020e, #0c0618)",
          border: "2px solid rgba(90,50,140,0.25)",
          transform: "rotateY(180deg)",
        }} />
      </div>

      {/* Oval frame around mirror */}
      <div style={{
        position: "absolute", inset: "-3px",
        borderRadius: "50% 50% 46% 46% / 42% 42% 58% 58%",
        border: "1px solid rgba(170,120,255,0.18)",
        pointerEvents: "none",
        opacity: revealed ? 1 : 0, transition: "opacity 0.8s ease 1.2s",
      }} />

      {/* Floor shadow ellipse */}
      <div style={{
        position: "absolute", bottom: "-22px", left: "50%", transform: "translateX(-50%)",
        width: "100px", height: "14px", borderRadius: "50%",
        background: "rgba(140,80,200,0.28)", filter: "blur(12px)",
        opacity: revealed ? 1 : 0, transition: "opacity 0.9s ease 0.9s",
      }} />
    </div>
  );
}

function HutOnLegs({ visible }: { visible: boolean }) {
  const [risen, setRisen] = useState(false);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setRisen(true), 200);
    const t2 = setTimeout(() => setGlowing(true), 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  return (
    <div style={{ position: "relative", width: "190px", height: "190px", margin: "0 auto 8px", perspective: "700px" }}>
      {/* Ground glow */}
      <div style={{
        position: "absolute", bottom: "8px", left: "50%", transform: "translateX(-50%)",
        width: glowing ? "150px" : "60px", height: "16px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(180,130,60,0.4) 0%, transparent 75%)",
        filter: "blur(8px)", transition: "width 1.2s ease 0.8s",
      }} />

      {/* The hut group — rises up */}
      <div style={{
        position: "absolute", bottom: "20px", left: "50%",
        transform: risen ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(30px)",
        opacity: risen ? 1 : 0,
        transition: "transform 1s cubic-bezier(0.22,1,0.36,1), opacity 0.8s ease",
        transformStyle: "preserve-3d",
        width: "120px",
      }}>
        {/* ── Chicken Legs ── */}
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: "28px" }}>
          {[{ lx: -2, rx: 8 }, { lx: 2, rx: -8 }].map((leg, li) => (
            <div key={li} style={{ position: "relative", width: "10px", height: "44px" }}>
              {/* Upper leg */}
              <div style={{
                position: "absolute", bottom: "16px", left: "50%", transform: `translateX(-50%) rotate(${leg.lx}deg)`,
                width: "7px", height: "28px", borderRadius: "4px 4px 2px 2px",
                background: "linear-gradient(180deg, #6b4a1a, #3d2808)",
                boxShadow: glowing ? "0 0 8px rgba(180,120,40,0.4)" : "none",
                transition: "box-shadow 0.6s ease",
              }} />
              {/* Knee joint */}
              <div style={{
                position: "absolute", bottom: "14px", left: "50%", transform: "translateX(-50%)",
                width: "9px", height: "9px", borderRadius: "50%",
                background: "radial-gradient(circle, #8b6020, #4a2c08)",
                border: "1px solid rgba(200,140,40,0.3)",
              }} />
              {/* Lower leg */}
              <div style={{
                position: "absolute", bottom: "3px", left: "50%", transform: `translateX(-50%) rotate(${leg.rx}deg)`,
                width: "6px", height: "20px", borderRadius: "3px 3px 1px 1px",
                background: "linear-gradient(180deg, #5a3c14, #2e1c04)",
              }} />
              {/* Claw foot */}
              {[-12, 0, 12].map((angle, ci) => (
                <div key={ci} style={{
                  position: "absolute", bottom: 0, left: "50%",
                  transform: `translateX(-50%) rotate(${angle}deg)`,
                  transformOrigin: "top center",
                  width: "2px", height: "10px", borderRadius: "1px",
                  background: "#2a1604",
                }} />
              ))}
            </div>
          ))}
        </div>

        {/* ── Hut Body ── */}
        <div style={{
          position: "absolute", bottom: "42px", left: "50%", transform: "translateX(-50%)",
          width: "96px", height: "62px",
          background: "linear-gradient(160deg, #5a3c18 0%, #3a2408 60%, #4a3010 100%)",
          border: "1.5px solid rgba(200,140,40,0.35)",
          borderRadius: "6px 6px 4px 4px",
          boxShadow: glowing
            ? "0 0 30px rgba(180,120,40,0.35), inset 0 0 20px rgba(120,70,10,0.2)"
            : "0 4px 20px rgba(0,0,0,0.6)",
          transition: "box-shadow 0.8s ease",
          overflow: "hidden",
        }}>
          {/* Wood plank lines */}
          {[20, 35, 50].map(t => (
            <div key={t} style={{
              position: "absolute", top: `${t}%`, left: 0, right: 0, height: "1px",
              background: "rgba(0,0,0,0.25)",
            }} />
          ))}
          {/* Window — glowing */}
          <div style={{
            position: "absolute", top: "14px", left: "50%", transform: "translateX(-50%)",
            width: "22px", height: "22px", borderRadius: "3px",
            background: glowing
              ? "radial-gradient(circle, rgba(255,200,80,0.9) 0%, rgba(220,140,20,0.7) 60%, transparent 100%)"
              : "rgba(40,20,5,0.8)",
            border: "1px solid rgba(200,140,40,0.5)",
            boxShadow: glowing ? "0 0 20px rgba(255,180,40,0.8), 0 0 8px rgba(220,120,20,0.6)" : "none",
            transition: "all 0.8s ease 0.6s",
          }}>
            {/* Cross window divider */}
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "rgba(0,0,0,0.3)" }} />
            <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "rgba(0,0,0,0.3)" }} />
          </div>
          {/* Door */}
          <div style={{
            position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
            width: "18px", height: "28px",
            background: "linear-gradient(180deg, #2a1608, #1a0c04)",
            borderRadius: "4px 4px 0 0",
            border: "1px solid rgba(180,100,20,0.3)",
          }} />
        </div>

        {/* ── Roof ── */}
        <div style={{
          position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "58px solid transparent",
          borderRight: "58px solid transparent",
          borderBottom: "50px solid #4a2e0e",
          filter: glowing ? "drop-shadow(0 -4px 16px rgba(180,120,40,0.3))" : "none",
          transition: "filter 0.8s ease",
        }} />
        {/* Roof overlay — darker sides */}
        <div style={{
          position: "absolute", bottom: "100px", left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "54px solid transparent",
          borderRight: "54px solid transparent",
          borderBottom: "46px solid #3a2008",
          marginBottom: "2px",
        }} />
        {/* Chimney */}
        <div style={{
          position: "absolute", bottom: "140px", left: "calc(50% + 12px)",
          width: "12px", height: "20px",
          background: "linear-gradient(180deg, #2a1806, #1a0e04)",
          border: "1px solid rgba(140,80,20,0.3)",
          borderRadius: "2px 2px 0 0",
        }}>
          {glowing && (
            <div style={{
              position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
              width: "8px", height: "16px",
              background: "radial-gradient(ellipse at 50% 90%, rgba(255,120,20,0.8) 0%, rgba(255,80,0,0.4) 60%, transparent 100%)",
              borderRadius: "50% 50% 30% 30%", filter: "blur(2px)",
              animation: "flicker 0.9s ease-in-out infinite alternate",
            }} />
          )}
        </div>
      </div>

      {/* Floating sparkles around hut */}
      {glowing && [...Array(5)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${20 + i * 14}%`,
          top: `${15 + (i % 3) * 20}%`,
          width: "3px", height: "3px", borderRadius: "50%",
          background: i % 2 === 0 ? "rgba(255,200,80,0.8)" : "rgba(200,140,40,0.6)",
          boxShadow: "0 0 6px rgba(255,180,40,0.6)",
          animation: `spirit-float ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite`,
        }} />
      ))}
    </div>
  );
}

function MendaciumModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [coins, setCoins] = useState([
    { id: 1, x: 15, y: 20, dissolved: false },
    { id: 2, x: 75, y: 35, dissolved: false },
    { id: 3, x: 45, y: 10, dissolved: false },
  ]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(true), 80);
    return () => { document.body.style.overflow = ""; clearTimeout(t); };
  }, []);

  const total = PRACTICE_STEPS.length;
  const current = PRACTICE_STEPS[step];

  const dissolveACoin = () => {
    const alive = coins.filter(c => !c.dissolved);
    if (alive.length === 0) return;
    const idx = coins.findIndex(c => c.id === alive[0].id);
    setCoins(prev => prev.map((c, i) => i === idx ? { ...c, dissolved: true } : c));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(20px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Floating coins ambient */}
      {[
        { top: "8%", left: "6%", animation: "spirit-float 4s ease-in-out infinite" },
        { top: "12%", right: "8%", animation: "spirit-float 5s ease-in-out 1s infinite" },
        { bottom: "15%", left: "10%", animation: "spirit-float 3.5s ease-in-out 0.5s infinite" },
        { bottom: "10%", right: "12%", animation: "spirit-float 4.5s ease-in-out 1.5s infinite" },
        { top: "45%", left: "3%", animation: "spirit-float 6s ease-in-out 2s infinite" },
        { top: "35%", right: "4%", animation: "spirit-float 5.5s ease-in-out 0.8s infinite" },
      ].map((s, i) => (
        <FloatingCoin key={i} style={{ ...s, opacity: coins.filter(c => !c.dissolved).length > 0 ? 0.4 : 0.15, transition: "opacity 1s ease" }} />
      ))}

      <div
        className="relative w-full max-w-lg max-h-[94vh] overflow-y-auto rounded-3xl"
        style={{
          background: "linear-gradient(170deg,#0b0712 0%,#110b1c 50%,#080b12 100%)",
          border: `1px solid ${current.accent.replace("0.9", "0.3")}`,
          boxShadow: `0 0 140px ${current.accent.replace("0.9", "0.2")}, 0 0 60px ${current.accent.replace("0.9", "0.1")}`,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(50px) scale(0.94)",
          transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Top shimmer line — accent color */}
        <div style={{ height: "2px", background: `linear-gradient(90deg,transparent,${current.accent.replace("0.9","0.8")},rgba(200,146,58,0.4),${current.accent.replace("0.9","0.8")},transparent)`, transition: "background 0.6s ease" }} />

        {/* Step bg — from PRACTICE_STEPS data */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "24px", pointerEvents: "none", zIndex: 0,
          background: current.bg,
          transition: "background 0.8s ease",
        }} />

        {/* Header */}
        <div className="relative px-7 pt-7 pb-3 text-center" style={{ zIndex: 1 }}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all hover:scale-110 hover:rotate-90"
            style={{ background: "rgba(140,80,200,0.12)", color: "rgba(180,140,255,0.65)", border: "1px solid rgba(140,80,200,0.22)", transition: "all 0.3s ease" }}
          >
            ✕
          </button>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {PRACTICE_STEPS.map((s, i) => (
              <div key={i} onClick={() => i < step && setStep(i)}
                className="rounded-full transition-all duration-500"
                style={{
                  width: i === step ? "26px" : "5px",
                  height: "5px",
                  cursor: i < step ? "pointer" : "default",
                  background: i === step
                    ? current.accent.replace("0.9", "0.9")
                    : i < step
                    ? current.accent.replace("0.9", "0.4")
                    : "rgba(180,180,200,0.12)",
                  transition: "all 0.4s ease",
                }} />
            ))}
          </div>

          {/* Campfire for intro step (step 0) */}
          {step === 0 && <Campfire3D visible={visible} />}

          {/* Mirror for step 1 */}
          {step === 1 && <Mirror3D visible={visible} />}

          {/* Coins for step 2 */}
          {step === 2 && (
            <div className="relative mx-auto mb-4" style={{ width: "200px", height: "110px" }}>
              {/* Glow base */}
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "140px", height: "20px", borderRadius: "50%",
                background: "rgba(200,146,58,0.2)", filter: "blur(10px)",
              }} />
              {coins.map((coin, idx) => (
                <div
                  key={coin.id}
                  onClick={dissolveACoin}
                  style={{
                    position: "absolute",
                    left: `${coin.x}%`,
                    top: `${coin.y}%`,
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    background: coin.dissolved ? "transparent" : "radial-gradient(circle at 35% 30%, #fff8c0, #f0c840 30%, #c8923a 60%, #8a5010 90%)",
                    boxShadow: coin.dissolved ? "none" : "0 0 20px rgba(200,146,58,0.8), 0 0 8px rgba(200,146,58,0.5), inset 0 1px 4px rgba(255,245,180,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "18px",
                    cursor: coin.dissolved ? "default" : "pointer",
                    opacity: coin.dissolved ? 0 : 1,
                    transform: coin.dissolved
                      ? "translateY(-50px) scale(0) rotate(180deg)"
                      : `scale(1) rotate(0deg)`,
                    transition: "all 0.9s cubic-bezier(0.34,1.2,0.64,1)",
                    animation: coin.dissolved ? "none" : `spirit-float ${2.2 + idx * 0.5}s ease-in-out ${idx * 0.4}s infinite`,
                  }}
                >
                  {!coin.dissolved && <span style={{ filter: "drop-shadow(0 0 4px rgba(255,200,60,0.6))", lineHeight: 1 }}>✦</span>}
                </div>
              ))}
              <p className="absolute bottom-0 w-full text-center" style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(200,146,58,0.5)" }}>
                {coins.filter(c => !c.dissolved).length > 0 ? "нажмите — монета растворится" : "✦ монеты растворились ✦"}
              </p>
            </div>
          )}

          {/* Hut on chicken legs for shop step (id="shop", index 4) */}
          {step === 4 && <HutOnLegs visible={visible} />}

          {/* Cards fan for book step (id="book", index 5 now) */}
          {step === 5 && (
            <div className="relative mx-auto mb-4 flex items-center justify-center" style={{ height: "150px", width: "220px" }}>
              {DECK_CARDS.map((card, i) => {
                const t = DECK_CARDS.length;
                const d = ((i - (step % t) + t) % t);
                const nd = d > t / 2 ? d - t : d;
                const isCtr = nd === 0;
                const isL = nd === -1;
                const isR = nd === 1;
                const vis = isCtr || isL || isR;
                const tx = isCtr ? 0 : isL ? -60 : 60;
                const rot = isCtr ? 0 : isL ? -15 : 15;
                return (
                  <div key={i} style={{
                    position: "absolute",
                    width: "88px", height: "120px",
                    borderRadius: "9px", overflow: "hidden",
                    transform: `translateX(${tx}px) rotate(${rot}deg)`,
                    zIndex: isCtr ? 10 : isL ? 5 : 3,
                    opacity: vis ? 1 : 0,
                    pointerEvents: vis ? "auto" : "none",
                    transition: "all 0.6s ease",
                    boxShadow: isCtr
                      ? "0 6px 36px rgba(140,80,200,0.7), 0 0 16px rgba(140,80,200,0.4)"
                      : "0 4px 16px rgba(0,0,0,0.7)",
                    border: isCtr ? "1px solid rgba(180,140,255,0.55)" : "1px solid rgba(140,80,200,0.15)",
                  }}>
                    <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    {!isCtr && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.38)" }} />}
                    {isCtr && (
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(10,6,22,0.9),transparent)", padding: "4px", textAlign: "center" }}>
                        <span style={{ fontSize: "8px", letterSpacing: "0.15em", color: "rgba(200,180,255,0.85)", textTransform: "uppercase" }}>{card.label}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{
                position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)",
                width: "140px", height: "16px", borderRadius: "50%",
                background: "rgba(140,80,200,0.25)", filter: "blur(10px)",
              }} />
            </div>
          )}

          {/* Icon for other steps */}
          {step !== 0 && step !== 1 && step !== 2 && step !== 4 && step !== 5 && (
            <div className="text-4xl mb-4" style={{ filter: "drop-shadow(0 0 16px rgba(140,80,200,0.6))", animation: "spirit-float 4s ease-in-out infinite" }}>
              {current.icon}
            </div>
          )}

          {/* Step label + title */}
          <div className="mb-1">
            <p className="text-xs uppercase tracking-[0.45em] mb-3" style={{ color: "rgba(160,110,255,0.55)", letterSpacing: "0.4em" }}>
              {step + 1} из {total} · Истинная Подмена Понятий
            </p>
            <h3 style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              fontWeight: 300,
              color: "rgba(230,215,255,0.97)",
              letterSpacing: "0.02em",
              lineHeight: 1.2,
              marginBottom: "4px",
            }}>
              {current.title}
            </h3>
            {/* Decorative line */}
            <div style={{ height: "1px", width: "60px", margin: "12px auto 0", background: "linear-gradient(90deg,transparent,rgba(160,110,255,0.5),transparent)" }} />
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pb-7" style={{ position: "relative", zIndex: 1 }}>

          {/* Text block */}
          <div style={{
            borderRadius: "20px",
            padding: "24px 26px",
            marginBottom: "20px",
            background: "rgba(140,80,200,0.06)",
            border: "1px solid rgba(160,110,255,0.14)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Left accent bar */}
            <div style={{
              position: "absolute", left: 0, top: "16px", bottom: "16px", width: "2px",
              background: "linear-gradient(to bottom, transparent, rgba(160,110,255,0.5), transparent)",
              borderRadius: "2px",
            }} />
            {current.text.split("\n\n").map((para, i) => (
              <p key={i} style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
                color: i === 0 ? "rgba(230,215,255,0.9)" : "rgba(200,185,245,0.75)",
                fontStyle: "italic",
                lineHeight: "1.95",
                marginBottom: i < current.text.split("\n\n").length - 1 ? "16px" : 0,
                letterSpacing: "0.01em",
              }}>
                {para}
              </p>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3 mt-2">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3.5 rounded-full text-sm transition-all hover:opacity-80"
                style={{ border: "1px solid rgba(140,80,200,0.28)", color: "rgba(180,140,255,0.75)", background: "rgba(140,80,200,0.06)", letterSpacing: "0.05em" }}
              >
                ← назад
              </button>
            )}
            {step < total - 1 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex-1 py-3.5 rounded-full text-sm tracking-wider transition-all hover:scale-[1.02] hover:shadow-2xl"
                style={{ background: `linear-gradient(135deg,${current.accent.replace("0.9","0.85")},${current.accent.replace("0.9","0.7")})`, color: "white", letterSpacing: "0.12em", boxShadow: `0 0 30px ${current.accent.replace("0.9","0.3")}`, transition: "background 0.5s ease, box-shadow 0.5s ease" }}
              >
                далее →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full text-sm tracking-wider uppercase transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,rgba(150,90,220,0.9),rgba(200,146,58,0.65))", color: "white", letterSpacing: "0.14em", boxShadow: "0 0 40px rgba(140,80,200,0.35)" }}
              >
                ✦ завершить практику
              </button>
            )}
          </div>
        </div>

        {/* Bottom shimmer */}
        <div style={{ height: "2px", background: "linear-gradient(90deg,transparent,rgba(200,146,58,0.35),rgba(160,110,255,0.5),transparent)" }} />
      </div>
    </div>
  );
}

// ─── Mendacium card for shop ──────────────────────────────────────────────────

const DECK_CARDS = [
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/cc1ae69e-e626-4176-a15f-e83b7dddd6cc.png",
    label: "Отшельник",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/81a367f5-2915-42f4-a4f1-03bacba54650.png",
    label: "Императрица",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/66b42de5-7e80-464a-8da0-30b106859196.png",
    label: "Смерть",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/e84c4cbe-b93a-4126-aa77-dc3b215ee030.png",
    label: "Мир",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/6dd3f4e9-c256-4878-b69d-8b473e9357eb.png",
    label: "Дьявол",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/efb17863-b875-40f7-b476-0f98aabbf2b6.png",
    label: "Колесо Фортуны",
  },
];

function MendaciumCard({ onOpen }: { onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveCard(a => (a + 1) % DECK_CARDS.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="forest-card rounded-2xl text-left w-full group overflow-hidden relative"
      style={{
        background: hovered
          ? "radial-gradient(ellipse at 40% 60%, #160a24 0%, #0d0a16 60%)"
          : "rgba(12,8,20,0.95)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${hovered ? "rgba(140,80,200,0.5)" : "rgba(140,80,200,0.2)"}`,
        boxShadow: hovered ? "0 0 80px rgba(140,80,200,0.25), 0 0 30px rgba(140,80,200,0.1)" : "0 0 20px rgba(140,80,200,0.05)",
        transition: "all 0.5s ease",
      }}
    >
      {/* Fan of 3 cards */}
      <div className="relative overflow-hidden" style={{ height: "220px", background: "linear-gradient(180deg,#0a0616 0%,#120d1e 100%)" }}>
        {/* Ambient purple glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 80%, rgba(140,80,200,0.18) 0%, transparent 65%)",
          transition: "opacity 0.5s",
          opacity: hovered ? 1 : 0.6,
        }} />

        {/* Cards fan — always show active + prev + next */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "800px" }}>
          {DECK_CARDS.map((card, i) => {
            const total = DECK_CARDS.length;
            const diff = ((i - activeCard + total) % total);
            const normDiff = diff > total / 2 ? diff - total : diff;
            const isActive = normDiff === 0;
            const isPrev = normDiff === -1;
            const isNext = normDiff === 1;
            const isVisible = isActive || isPrev || isNext;

            const offset = isActive ? 0 : isPrev ? -68 : isNext ? 68 : 0;
            const rotate = isActive ? 0 : isPrev ? -20 : isNext ? 20 : 0;
            const scale = isActive ? 1.07 : 0.8;
            const zIndex = isActive ? 10 : 3;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "100px",
                  height: "140px",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transform: `translateX(${offset}px) rotate(${rotate}deg) scale(${scale})`,
                  zIndex,
                  opacity: isVisible ? 1 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                  transition: "all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  boxShadow: isActive
                    ? "0 8px 40px rgba(140,80,200,0.6), 0 0 20px rgba(140,80,200,0.3)"
                    : "0 4px 20px rgba(0,0,0,0.6)",
                  border: isActive ? "1px solid rgba(180,140,255,0.5)" : "1px solid rgba(140,80,200,0.15)",
                }}
              >
                <img src={card.img} alt={card.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: isActive ? "none" : "rgba(0,0,0,0.35)",
                  transition: "background 0.5s",
                }} />
                {isActive && (
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    background: "linear-gradient(to top, rgba(10,6,22,0.9), transparent)",
                    padding: "6px 6px 4px",
                    textAlign: "center",
                  }}>
                    <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(200,180,255,0.8)", textTransform: "uppercase" }}>{card.label}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 z-20">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{ background: "linear-gradient(135deg,rgba(140,80,200,0.95),rgba(100,50,200,1))", color: "white", letterSpacing: "0.12em", fontSize: "0.65rem" }}>
            NEW
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs"
            style={{ background: "rgba(200,146,58,0.12)", color: "rgba(200,146,58,0.85)", border: "1px solid rgba(200,146,58,0.22)", backdropFilter: "blur(8px)", fontSize: "0.65rem" }}>
            Практика
          </span>
        </div>

        {/* Card dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {DECK_CARDS.map((_, i) => (
            <div key={i} style={{
              width: i === activeCard ? "16px" : "4px",
              height: "4px",
              borderRadius: "2px",
              background: i === activeCard ? "rgba(180,140,255,0.9)" : "rgba(140,80,200,0.3)",
              transition: "all 0.4s ease",
            }} />
          ))}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xl font-light leading-tight" style={{ fontFamily: "'Cormorant', serif", color: "rgba(230,210,255,0.97)", letterSpacing: "0.02em" }}>
              Mendacium Veritas
            </h3>
            <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: "rgba(140,80,200,0.65)" }}>
              Истинная Подмена Понятий
            </p>
          </div>
          {/* Animated coin cluster */}
          <div className="flex gap-1 flex-shrink-0">
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: "14px", height: "14px", borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #f0d080, #c8923a 60%, #8a5010)",
                boxShadow: "0 0 6px rgba(200,146,58,0.6)",
                animation: `spirit-float ${2.2+i*0.4}s ease-in-out ${i*0.35}s infinite`,
              }} />
            ))}
          </div>
        </div>

        <p className="text-xs leading-relaxed mb-4 italic"
          style={{ fontFamily: "'Cormorant', serif", color: "rgba(190,170,240,0.6)", fontSize: "0.88rem", lineHeight: "1.7" }}>
          Embark on an extraordinary journey where the lines between truth and illusion blur, unlocking the door to self-discovery.
        </p>

        <p className="text-xs leading-relaxed"
          style={{ color: "rgba(140,80,200,0.38)", borderTop: "1px solid rgba(140,80,200,0.1)", paddingTop: "0.65rem", letterSpacing: "0.05em" }}>
          колода · практика · зеркало · ледяной мост
        </p>

        <div className="flex items-center gap-2 mt-4 text-xs tracking-wider uppercase transition-all group-hover:gap-3"
          style={{ color: "rgba(170,130,255,0.75)" }}>
          <span style={{ fontFamily: "'Golos Text',sans-serif" }}>Открыть практику</span>
          <Icon name="ArrowRight" size={13} />
        </div>
      </div>
    </button>
  );
}

export const shopCategories = [
  {
    id: "tarot",
    emoji: "🃏",
    title: "Авторская колода",
    subtitle: "Таро",
    tagline: "Прочитай своё отражение в зеркале леса",
    depth: "Опушка леса",
    bg: "radial-gradient(ellipse at 40% 60%, #1a0e28 0%, #0d1109 60%)",
    accent: "rgba(140,80,200,0.5)",
    leafColor: "rgba(140,80,200,0.6)",
    path: "/shop/tarot",
    featured: "78 карт · авторские иллюстрации · полотняный мешочек",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/6c355651-fe2a-4e52-a62e-9bb7b9ae512a.jpg",
  },
  {
    id: "candles",
    emoji: "🕯️",
    title: "Свечи с травами",
    subtitle: "Ручная работа",
    tagline: "Огонь хранит память трав",
    depth: "Первые деревья",
    bg: "radial-gradient(ellipse at 60% 40%, #2a1808 0%, #0d1109 60%)",
    accent: "rgba(200,146,58,0.5)",
    leafColor: "rgba(200,146,58,0.6)",
    path: "/shop/candles",
    featured: "пихта · полынь · мелисса · можжевельник",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/98b1cbd3-8930-4e1b-90bb-0eb3cb7a854d.jpg",
  },
  {
    id: "amulets",
    emoji: "🔮",
    title: "Авторские амулеты",
    subtitle: "Обереги",
    tagline: "Лес знает, что тебе нужно",
    depth: "Сердце леса",
    bg: "radial-gradient(ellipse at 50% 50%, #0e1e0a 0%, #0d1109 60%)",
    accent: "rgba(122,184,138,0.5)",
    leafColor: "rgba(122,184,138,0.6)",
    path: "/shop/amulets",
    featured: "дерево · камень · нить · намерение",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/e4c67db1-2476-460f-a1ed-361bf5077a60.jpg",
  },
  {
    id: "brooms",
    emoji: "🌾",
    title: "Банные веники",
    subtitle: "Авторские",
    tagline: "Вязанные с молитвой и знанием",
    depth: "Берёзовая роща",
    bg: "radial-gradient(ellipse at 40% 40%, #1a2808 0%, #0d1109 60%)",
    accent: "rgba(120,180,60,0.5)",
    leafColor: "rgba(120,180,60,0.6)",
    path: "/shop/brooms",
    featured: "берёза · дуб · пихта · эвкалипт",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/a4e36eff-4a1f-4abf-9628-55465ec5ae09.jpg",
  },
  {
    id: "fans",
    emoji: "ᚠ",
    title: "Банные веера",
    subtitle: "Ручная работа",
    tagline: "Ветер слушается умелых рук",
    depth: "Глубокий лес",
    bg: "radial-gradient(ellipse at 60% 60%, #200e08 0%, #0d1109 60%)",
    accent: "rgba(200,80,40,0.5)",
    leafColor: "rgba(200,80,40,0.6)",
    path: "/shop/fans",
    featured: "войлок · кожа · дерево · этнический орнамент",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/2ba7e7ff-265c-4c4f-bc6a-9849a6a54472.jpg",
  },
  {
    id: "zaparka",
    emoji: "ᚹ",
    title: "Банные запарки",
    subtitle: "Авторские сборы",
    tagline: "Лес, настоянный на пару",
    depth: "Тайная поляна",
    bg: "radial-gradient(ellipse at 35% 55%, #0a1a0e 0%, #0d1109 60%)",
    accent: "rgba(80,160,100,0.5)",
    leafColor: "rgba(80,160,100,0.6)",
    path: "/shop/zaparka",
    featured: "душица · чабрец · пихта · эвкалипт · мята",
    image: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/files/5c47b605-df9a-4182-aa60-f05c8c76cc18.jpg",
  },
];

// ─── Main Shop page ───────────────────────────────────────────────────────────

export default function Shop() {
  const navigate = useNavigate();
  const [entered, setEntered] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mendaciumOpen, setMendaciumOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--forest-bg)", color: "var(--forest-cream)" }}
    >
      {/* Ambient layers — richer, deeper */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(20,35,14,0.95) 0%, transparent 55%)",
            "radial-gradient(ellipse at 85% 65%, rgba(14,22,10,0.8) 0%, transparent 45%)",
            "radial-gradient(ellipse at 50% 100%, rgba(140,80,200,0.04) 0%, transparent 50%)",
            "radial-gradient(ellipse at 10% 80%, rgba(80,120,60,0.06) 0%, transparent 40%)",
          ].join(","),
        }}
      />
      <TreeSilhouettes />
      <Mist />
      <WindStreaks />
      <FallingLeaves />
      <Fireflies />
      <ForestSpirit side="right" />

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(10,13,6,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(122,184,138,0.12)",
        }}
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--forest-spirit)" }}
        >
          <Icon name="ArrowLeft" size={18} />
          <span
            className="text-sm tracking-wider"
            style={{ fontFamily: "'Cormorant', serif" }}
          >
            Мария · Пармастер
          </span>
        </button>
        <p
          className="text-xs uppercase tracking-[0.35em]"
          style={{ color: "rgba(168,184,144,0.6)" }}
        >
          Лесная лавка
        </p>
      </nav>

      {/* Hero — Entrance to the forest */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #1a2210 0%, #0d1109 55%, #0a0d06 100%)",
        }}
      >
        {/* Moon */}
        <div
          className="absolute top-16 right-1/4 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(220,210,170,0.12) 0%, transparent 70%)",
            boxShadow:
              "0 0 60px rgba(220,210,170,0.08), 0 0 120px rgba(180,200,140,0.04)",
          }}
        />

        <div
          className="relative text-center max-w-2xl mx-auto z-10"
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(30px)",
            transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(122,184,138,0.4))",
              }}
            />
            <span
              className="text-sm tracking-[0.4em]"
              style={{ color: "rgba(122,184,138,0.5)" }}
            >
              🌿 ✦ 🌿
            </span>
            <div
              className="h-px flex-1 max-w-16"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(122,184,138,0.4))",
              }}
            />
          </div>

          <p
            className="text-xs uppercase tracking-[0.5em] mb-5"
            style={{ color: "rgba(168,184,144,0.6)" }}
          >{"Тропа рябины и дыма"}</p>

          <h1
            className="text-5xl md:text-7xl font-light leading-tight mb-6"
            style={{
              fontFamily: "'Cormorant', serif",
              color: "var(--forest-cream)",
              textShadow:
                "0 0 60px rgba(122,184,138,0.2), 0 0 120px rgba(80,120,60,0.1)",
            }}
          >
            Лесная<br />
            <em style={{ color: "var(--forest-spirit)" }}>лавка</em>
          </h1>

          <p
            className="text-base md:text-lg leading-relaxed mb-3"
            style={{
              color: "rgba(200,220,170,0.75)",
              fontFamily: "'Cormorant', serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
            }}
          >
            Войди. Лес давно тебя ждал.
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(168,184,144,0.55)", maxWidth: "420px", margin: "0 auto" }}
          >Авторские изделия, сотканные из шепотков, трав и древнего знания. Каждый предмет создан вручную с намерением.</p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div
              className="h-px flex-1 max-w-20"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(122,184,138,0.2))",
              }}
            />
            <span style={{ color: "rgba(122,184,138,0.4)" }}>✦</span>
            <div
              className="h-px flex-1 max-w-20"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(122,184,138,0.2))",
              }}
            />
          </div>

          <button
            onClick={() =>
              document
                .getElementById("categories")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(40,60,28,0.9), rgba(60,80,40,0.8))",
              border: "1px solid rgba(122,184,138,0.3)",
              color: "var(--forest-spirit)",
              letterSpacing: "0.2em",
              boxShadow: "0 0 30px rgba(80,120,60,0.15)",
            }}
          >
            Войти в лес
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-gold"
          style={{ color: "rgba(122,184,138,0.4)" }}
        >
          <span className="text-xs tracking-widest">глубже</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* Categories — The forest path */}
      <section id="categories" className="relative py-24 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p
              className="text-xs uppercase tracking-[0.5em] mb-4"
              style={{ color: "rgba(122,184,138,0.5)" }}
            >
              тропы
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{
                fontFamily: "'Cormorant', serif",
                color: "var(--forest-cream)",
              }}
            >
              Что хранит лес
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <MendaciumCard onOpen={() => setMendaciumOpen(true)} />
            {shopCategories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => navigate(cat.path)}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="forest-card rounded-2xl text-left w-full group overflow-hidden"
                style={{
                  background:
                    hoveredId === cat.id
                      ? cat.bg.replace("0d1109", "111a0c")
                      : "rgba(14,18,10,0.85)",
                  animationDelay: `${i * 0.08}s`,
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Photo */}
                {"image" in cat && cat.image && (
                  <div className="relative overflow-hidden" style={{ height: "180px" }}>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,14,8,0.85) 0%, rgba(10,14,8,0.1) 60%, transparent 100%)" }} />
                    <p className="absolute bottom-3 left-4 text-xs tracking-[0.35em] uppercase" style={{ color: cat.leafColor, opacity: 0.9 }}>{cat.depth}</p>
                  </div>
                )}

                <div className="p-6">
                {!("image" in cat) && (
                  <p className="text-xs tracking-[0.35em] mb-4 uppercase" style={{ color: cat.leafColor, opacity: 0.7 }}>{cat.depth}</p>
                )}

                {/* Emoji */}
                <div
                  className="text-4xl mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 inline-block"
                >
                  {cat.emoji}
                </div>

                <h3
                  className="text-2xl font-light mb-1"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "var(--forest-cream)",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ color: cat.leafColor, opacity: 0.6 }}
                >
                  {cat.subtitle}
                </p>

                <p
                  className="text-sm leading-relaxed mb-5 italic"
                  style={{
                    fontFamily: "'Cormorant', serif",
                    color: "rgba(200,220,170,0.7)",
                    fontSize: "0.95rem",
                  }}
                >
                  {cat.tagline}
                </p>

                <p
                  className="text-xs leading-relaxed"
                  style={{
                    color: "rgba(168,184,144,0.5)",
                    borderTop: `1px solid ${cat.accent.replace("0.5", "0.15")}`,
                    paddingTop: "0.75rem",
                  }}
                >
                  {cat.featured}
                </p>

                <div
                  className="flex items-center gap-2 mt-5 text-xs tracking-wider uppercase transition-all group-hover:gap-3"
                  style={{ color: cat.leafColor, opacity: 0.8 }}
                >
                  <span>Войти</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
                </div>{/* /p-6 */}
              </button>
            ))}
          </div>
        </div>
      </section>

      {mendaciumOpen && <MendaciumModal onClose={() => setMendaciumOpen(false)} />}

      {/* Footer */}
      <footer
        className="relative py-10 px-6 text-center z-10"
        style={{
          borderTop: "1px solid rgba(122,184,138,0.08)",
          background: "rgba(6,8,4,0.9)",
        }}
      >
        <p
          className="text-sm mb-1"
          style={{
            fontFamily: "'Cormorant', serif",
            color: "rgba(122,184,138,0.5)",
          }}
        >
          🌿 Лесная лавка · Мария · Пармастер
        </p>
        <p
          className="text-xs"
          style={{ color: "rgba(168,184,144,0.3)" }}
        >
          Всё создано вручную с любовью и намерением
        </p>
      </footer>
    </div>
  );
}