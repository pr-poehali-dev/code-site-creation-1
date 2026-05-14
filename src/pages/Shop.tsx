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
    text: "Каждая карта — это зеркало.\n\nОна не предсказывает — она отражает то, что уже живёт внутри тебя.\n\nЛистай и смотри.",
  },
  {
    id: "journey",
    icon: "🌿",
    title: "✦ Практика II · Путешествие сквозь туман",
    accent: "rgba(160,200,240,0.9)",
    bg: "radial-gradient(ellipse at 50% 100%, rgba(60,100,160,0.18) 0%, rgba(80,130,180,0.06) 50%, transparent 80%)",
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

function FootprintTrail() {
  // activeStep: index of the foot currently "landing" (0..7), cycles every 600ms
  const [activeStep, setActiveStep] = useState(-1);
  const [visible, setVisible] = useState<boolean[]>(Array(8).fill(false));

  // 8 footstep positions bottom→top with perspective
  const footsteps: { y: number; side: "L" | "R" }[] = [
    { y: 90, side: "L" },
    { y: 78, side: "R" },
    { y: 66, side: "L" },
    { y: 54, side: "R" },
    { y: 42, side: "L" },
    { y: 30, side: "R" },
    { y: 18, side: "L" },
    { y:  7, side: "R" },
  ];

  useEffect(() => {
    let step = 0;
    const tick = () => {
      setActiveStep(step);
      setVisible(prev => {
        const next = [...prev];
        next[step] = true;
        return next;
      });
      step = (step + 1) % footsteps.length;
      // When we loop back to 0 — reset all to false first
      if (step === 0) {
        setTimeout(() => {
          setVisible(Array(8).fill(false));
          setActiveStep(-1);
        }, 400);
      }
    };
    const id = setInterval(tick, 420);
    return () => clearInterval(id);
  }, []);

  const FootSVG = ({ side, scale }: { side: "L" | "R"; scale: number }) => (
    <svg
      width={Math.round(26 * scale)}
      height={Math.round(32 * scale)}
      viewBox="0 0 26 32"
      fill="none"
      style={{
        filter: "drop-shadow(0 0 8px rgba(210,170,255,1)) drop-shadow(0 0 18px rgba(180,100,255,0.8))",
        transform: side === "R" ? "scaleX(-1)" : "none",
      }}
    >
      {/* Heel + arch + ball — organic foot sole */}
      <path
        d="M13 30 C7 30 4 26 4 21 C4 16 6 13 9 11 C10 8 9 4 11 2 C12 1 14 1 15 2 C17 4 16 8 17 11 C20 13 22 16 22 21 C22 26 19 30 13 30 Z"
        fill="rgba(210,170,255,0.8)"
        stroke="rgba(230,200,255,0.95)"
        strokeWidth="1.2"
      />
      {/* Toes */}
      <ellipse cx="8"  cy="9"  rx="2.8" ry="3.5" fill="rgba(210,170,255,0.75)" stroke="rgba(230,200,255,0.9)" strokeWidth="1.1" />
      <ellipse cx="11.5" cy="7" rx="2.6" ry="3.3" fill="rgba(210,170,255,0.75)" stroke="rgba(230,200,255,0.9)" strokeWidth="1.1" />
      <ellipse cx="15" cy="6.5" rx="2.5" ry="3.2" fill="rgba(210,170,255,0.75)" stroke="rgba(230,200,255,0.9)" strokeWidth="1.1" />
      <ellipse cx="18.5" cy="8" rx="2.2" ry="2.8" fill="rgba(210,170,255,0.7)"  stroke="rgba(230,200,255,0.85)" strokeWidth="1.1" />
      <ellipse cx="21.5" cy="11" rx="1.7" ry="2.2" fill="rgba(210,170,255,0.65)" stroke="rgba(230,200,255,0.8)" strokeWidth="1.0" />
    </svg>
  );

  return (
    <div style={{
      position: "relative", width: "100%", height: "120px",
      marginTop: "16px", overflow: "hidden",
    }}>
      {/* Center path — vanishing upward */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "2px",
        background: "linear-gradient(to top, rgba(180,120,255,0.35), rgba(180,120,255,0.15) 60%, transparent)",
        pointerEvents: "none",
      }} />
      {/* Vanishing glow */}
      <div style={{
        position: "absolute", top: "-4px", left: "50%", transform: "translateX(-50%)",
        width: "60px", height: "40px",
        background: "radial-gradient(ellipse, rgba(200,150,255,0.35) 0%, transparent 75%)",
        pointerEvents: "none",
      }} />

      {footsteps.map((fp, i) => {
        const isLeft = fp.side === "L";
        const scale = 0.42 + (fp.y / 100) * 0.58;
        const xOffset = (isLeft ? -1 : 1) * (5 + (fp.y / 100) * 12);
        const isActive = i === activeStep;
        const isShown = visible[i];

        return (
          <div key={i} style={{
            position: "absolute",
            left: `calc(50% + ${xOffset}px)`,
            top: `${fp.y}%`,
            transform: `translate(-50%, -50%) rotate(${isLeft ? -5 : 5}deg)`,
            opacity: isShown ? (isActive ? 1 : 0.55) : 0,
            transition: isActive ? "opacity 0.08s ease" : "opacity 0.9s ease 0.3s",
          }}>
            <FootSVG side={fp.side} scale={scale} />
            {/* Landing pulse ring */}
            {isActive && (
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px", height: "22px",
                borderRadius: "50%",
                border: "1.5px solid rgba(210,170,255,0.8)",
                animation: "footLand 0.5s ease-out forwards",
                pointerEvents: "none",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CardsSlideshow({ visible }: { visible: boolean }) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hovered, setHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goNext = () => {
    setPrev(current);
    setDirection(1);
    setCurrent(c => (c + 1) % DECK_CARDS.length);
  };
  const goPrev = () => {
    setPrev(current);
    setDirection(-1);
    setCurrent(c => (c - 1 + DECK_CARDS.length) % DECK_CARDS.length);
  };

  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setPrev(c => c);
      setDirection(1);
      setCurrent(c => (c + 1) % DECK_CARDS.length);
    }, 2800);
    return () => clearInterval(id);
  }, [visible]);

  // When current changes, clear prev after transition
  useEffect(() => {
    const t = setTimeout(() => setPrev(null), 700);
    return () => clearTimeout(t);
  }, [current]);

  return (
    <div
      style={{
        position: "relative", width: "180px", height: "240px",
        margin: "0 auto 14px", perspective: "600px",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (diff > 40) goPrev();
        else if (diff < -40) goNext();
        touchStartX.current = null;
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: "-18px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(100,140,220,0.2) 0%, transparent 65%)",
        animation: visible ? "pulseGold 3s ease-in-out infinite" : "none",
        pointerEvents: "none",
      }} />

      {/* Floor shadow */}
      <div style={{
        position: "absolute", bottom: "-14px", left: "50%", transform: "translateX(-50%)",
        width: "120px", height: "14px", borderRadius: "50%",
        background: "rgba(100,140,220,0.2)", filter: "blur(10px)",
      }} />

      {/* Previous card — slides/fades out */}
      {prev !== null && (
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: "12px", overflow: "hidden",
          border: "1px solid rgba(120,160,255,0.2)",
          transform: `translateX(${direction * -60}px) rotate(${direction * -8}deg) scale(0.88)`,
          opacity: 0,
          transition: "all 0.65s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 1,
        }}>
          <img src={DECK_CARDS[prev].img} alt={DECK_CARDS[prev].label}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      )}

      {/* Current card — slides in */}
      <div key={current} style={{
        position: "absolute", inset: 0,
        borderRadius: "12px", overflow: "hidden",
        border: "1.5px solid rgba(120,160,255,0.45)",
        boxShadow: "0 0 40px rgba(100,140,220,0.45), 0 12px 40px rgba(0,0,0,0.6)",
        animation: "cardSlideIn 0.65s cubic-bezier(0.22,1,0.36,1) forwards",
        zIndex: 2,
      }}>
        <img src={DECK_CARDS[current].img} alt={DECK_CARDS[current].label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Shimmer overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, rgba(180,210,255,0.07) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Left arrow */}
      <button
        onClick={goPrev}
        style={{
          position: "absolute", left: "-28px", top: "50%", transform: "translateY(-50%)",
          zIndex: 10, width: "24px", height: "24px", borderRadius: "50%",
          background: "rgba(20,20,40,0.65)", border: "1px solid rgba(120,160,255,0.3)",
          color: "rgba(180,210,255,0.85)", fontSize: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
        }}
      >‹</button>

      {/* Right arrow */}
      <button
        onClick={goNext}
        style={{
          position: "absolute", right: "-28px", top: "50%", transform: "translateY(-50%)",
          zIndex: 10, width: "24px", height: "24px", borderRadius: "50%",
          background: "rgba(20,20,40,0.65)", border: "1px solid rgba(120,160,255,0.3)",
          color: "rgba(180,210,255,0.85)", fontSize: "12px",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", opacity: hovered ? 1 : 0, transition: "opacity 0.3s ease",
        }}
      >›</button>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: "-30px", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "5px",
      }}>
        {DECK_CARDS.map((_, i) => (
          <div key={i} style={{
            width: i === current ? "16px" : "4px", height: "4px",
            borderRadius: "2px",
            background: i === current ? "rgba(140,180,255,0.8)" : "rgba(140,180,255,0.2)",
            transition: "all 0.4s ease",
          }} />
        ))}
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

function Corset3D({ visible }: { visible: boolean }) {
  const [risen, setRisen] = useState(false);
  const [glowing, setGlowing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setRisen(true), 200);
    const t2 = setTimeout(() => setGlowing(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [visible]);

  // Embroidered flowers: left half and right half (symmetric)
  const flowers = [
    { cx: 72,  cy: 52,  r: 7,  color: "#e8607a", petals: 6 },
    { cx: 52,  cy: 78,  r: 6,  color: "#c878e0", petals: 5 },
    { cx: 88,  cy: 82,  r: 5,  color: "#6eb0f0", petals: 6 },
    { cx: 60,  cy: 110, r: 5,  color: "#f0a050", petals: 5 },
    { cx: 90,  cy: 118, r: 4,  color: "#78d090", petals: 6 },
    { cx: 50,  cy: 140, r: 4,  color: "#e870a8", petals: 5 },
    // mirrored right half
    { cx: 148, cy: 52,  r: 7,  color: "#e8607a", petals: 6 },
    { cx: 168, cy: 78,  r: 6,  color: "#c878e0", petals: 5 },
    { cx: 132, cy: 82,  r: 5,  color: "#6eb0f0", petals: 6 },
    { cx: 160, cy: 110, r: 5,  color: "#f0a050", petals: 5 },
    { cx: 130, cy: 118, r: 4,  color: "#78d090", petals: 6 },
    { cx: 170, cy: 140, r: 4,  color: "#e870a8", petals: 5 },
  ];

  return (
    <div style={{
      position: "relative", width: "220px", height: "220px",
      margin: "0 auto 10px",
      opacity: risen ? 1 : 0,
      transform: risen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
      transition: "opacity 0.9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
    }}>
      {/* Outer glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 60%, rgba(180,80,140,0.22) 0%, transparent 70%)",
        opacity: glowing ? 1 : 0, transition: "opacity 1s ease",
        animation: glowing ? "pulseGold 4s ease-in-out infinite" : "none",
        pointerEvents: "none",
      }} />

      {/* SVG corset — realistic silhouette */}
      <svg width="220" height="210" viewBox="0 0 220 210" fill="none" style={{ position: "absolute", top: 0, left: 0 }}>
        <defs>
          <linearGradient id="leatherL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a2a2e" />
            <stop offset="40%" stopColor="#111114" />
            <stop offset="100%" stopColor="#1e1e22" />
          </linearGradient>
          <linearGradient id="leatherR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#222226" />
            <stop offset="40%" stopColor="#0e0e12" />
            <stop offset="100%" stopColor="#1a1a1e" />
          </linearGradient>
          <linearGradient id="sheen" x1="0%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <filter id="glowF">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Left panel ── wide at top/bottom, narrow at waist */}
        <path
          d="M110 8 C85 8 50 18 32 36 C18 50 14 68 16 88 C18 108 28 122 34 138 C40 156 40 172 44 192 L110 192 Z"
          fill="url(#leatherL)"
          stroke="rgba(80,60,100,0.5)" strokeWidth="1"
        />
        {/* ── Right panel ── mirror */}
        <path
          d="M110 8 C135 8 170 18 188 36 C202 50 206 68 204 88 C202 108 192 122 186 138 C180 156 180 172 176 192 L110 192 Z"
          fill="url(#leatherR)"
          stroke="rgba(80,60,100,0.5)" strokeWidth="1"
        />
        {/* Sheen overlay left */}
        <path
          d="M110 8 C85 8 50 18 32 36 C18 50 14 68 16 88 L110 88 Z"
          fill="url(#sheen)"
        />

        {/* ── Boning lines — left ── */}
        {[0.28, 0.42, 0.56, 0.7].map((t, i) => {
          const x = 32 + t * 78;
          return (
            <line key={i}
              x1={x} y1="22" x2={x - 4} y2="188"
              stroke="rgba(100,80,140,0.22)" strokeWidth="1"
            />
          );
        })}
        {/* ── Boning lines — right ── */}
        {[0.28, 0.42, 0.56, 0.7].map((t, i) => {
          const x = 188 - t * 78;
          return (
            <line key={i}
              x1={x} y1="22" x2={x + 4} y2="188"
              stroke="rgba(100,80,140,0.22)" strokeWidth="1"
            />
          );
        })}

        {/* ── Lace center ── */}
        <line x1="110" y1="10" x2="110" y2="190" stroke="rgba(160,120,200,0.35)" strokeWidth="2" />
        {/* Lace eyelets + X cross-lacing */}
        {[22, 42, 62, 82, 102, 122, 142, 162, 180].map((y, li) => (
          <g key={li}>
            {/* Eyelet left */}
            <circle cx="102" cy={y} r="3" fill="#111" stroke="rgba(160,120,200,0.5)" strokeWidth="1.2" />
            {/* Eyelet right */}
            <circle cx="118" cy={y} r="3" fill="#111" stroke="rgba(160,120,200,0.5)" strokeWidth="1.2" />
            {/* X lace cross */}
            {li < 8 && (
              <>
                <line x1="105" y1={y + 2} x2="115" y2={y + 18} stroke="rgba(180,140,220,0.45)" strokeWidth="1.2" />
                <line x1="115" y1={y + 2} x2="105" y2={y + 18} stroke="rgba(180,140,220,0.45)" strokeWidth="1.2" />
              </>
            )}
          </g>
        ))}

        {/* ── Top sweetheart neckline edge ── */}
        <path
          d="M32 36 Q50 12 80 16 Q95 18 110 28 Q125 18 140 16 Q170 12 188 36"
          stroke="rgba(120,90,160,0.5)" strokeWidth="1.5" fill="none"
        />
        {/* ── Bottom scallop hem ── */}
        {[44, 68, 92, 116, 140, 164, 176].map((x, i) => (
          <path key={i}
            d={`M${x} 192 Q${x + 12} 202 ${x + 24} 192`}
            stroke="rgba(120,90,160,0.4)" strokeWidth="1.2" fill="none"
          />
        ))}

        {/* ── Embroidered flowers ── */}
        {flowers.map((f, fi) => (
          <g key={fi} style={{
            opacity: glowing ? 1 : 0.5,
            transition: `opacity 0.5s ease ${fi * 0.06}s`,
            filter: glowing ? `url(#glowF)` : "none",
          }}>
            {Array.from({ length: f.petals }).map((_, pi) => {
              const a = (pi / f.petals) * Math.PI * 2;
              const px = f.cx + Math.cos(a) * f.r * 1.4;
              const py = f.cy + Math.sin(a) * f.r * 1.4;
              return (
                <ellipse key={pi}
                  cx={px} cy={py}
                  rx={f.r * 0.65} ry={f.r * 0.45}
                  fill={f.color}
                  fillOpacity="0.88"
                  transform={`rotate(${(a * 180) / Math.PI + 90}, ${px}, ${py})`}
                />
              );
            })}
            <circle cx={f.cx} cy={f.cy} r={f.r * 0.42} fill="rgba(255,245,200,0.95)" />
            {/* Leaf stems */}
            <path
              d={`M${f.cx - f.r} ${f.cy + f.r * 0.6} Q${f.cx - f.r * 1.8} ${f.cy + f.r * 1.8} ${f.cx - f.r * 0.4} ${f.cy + f.r * 2}`}
              stroke="rgba(100,180,80,0.6)" strokeWidth="0.9" fill="none"
            />
          </g>
        ))}

        {/* ── Overall border glow ── */}
        <path
          d="M110 8 C85 8 50 18 32 36 C18 50 14 68 16 88 C18 108 28 122 34 138 C40 156 40 172 44 192 L176 192 C180 172 180 156 186 138 C192 122 202 108 204 88 C206 68 202 50 188 36 C170 18 135 8 110 8 Z"
          stroke={glowing ? "rgba(160,100,200,0.55)" : "rgba(80,60,100,0.3)"}
          strokeWidth="1.5" fill="none"
          style={{ transition: "stroke 0.8s ease" }}
        />
      </svg>

      {/* Floating glow petals */}
      {glowing && [...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${12 + i * 14}%`,
          top: `${8 + (i % 3) * 22}%`,
          width: "5px", height: "3px", borderRadius: "50%",
          background: flowers[i % flowers.length].color,
          boxShadow: `0 0 8px ${flowers[i % flowers.length].color}`,
          animation: `spirit-float ${2 + i * 0.35}s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}

      {/* Floor shadow */}
      <div style={{
        position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)",
        width: "130px", height: "14px", borderRadius: "50%",
        background: "rgba(120,60,120,0.3)", filter: "blur(12px)",
        opacity: risen ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
      }} />
    </div>
  );
}

function Book3D({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);
  const [pageFlip, setPageFlip] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const t1 = setTimeout(() => setOpen(true), 300);
    return () => clearTimeout(t1);
  }, [visible]);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setPageFlip(p => p + 1), 1800);
    return () => clearInterval(id);
  }, [open]);

  const pageAngle = (pageFlip % 2 === 0) ? -160 : 0;

  return (
    <div style={{ perspective: "800px", width: "200px", height: "160px", margin: "0 auto 12px", position: "relative" }}>
      {/* Glow under book */}
      <div style={{
        position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)",
        width: "160px", height: "20px", borderRadius: "50%",
        background: "rgba(100,140,220,0.3)", filter: "blur(14px)",
        opacity: open ? 1 : 0, transition: "opacity 0.8s ease",
      }} />

      {/* Book container */}
      <div style={{
        position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)",
        width: "160px", height: "130px",
        transformStyle: "preserve-3d",
        transform: open
          ? "translateX(-50%) rotateX(20deg) rotateY(-10deg)"
          : "translateX(-50%) rotateX(40deg) rotateY(-30deg)",
        transition: "transform 1.2s cubic-bezier(0.22,1,0.36,1)",
      }}>
        {/* Back cover */}
        <div style={{
          position: "absolute", width: "80px", height: "120px",
          background: "linear-gradient(160deg, #0e1830 0%, #0a1020 100%)",
          border: "1px solid rgba(100,140,220,0.3)",
          borderRadius: "3px 8px 8px 3px",
          left: "80px", top: 0,
          boxShadow: "4px 4px 20px rgba(0,0,0,0.6)",
        }} />

        {/* Pages stack */}
        <div style={{
          position: "absolute", width: "76px", height: "116px",
          left: "82px", top: "2px",
          background: "linear-gradient(90deg, #e8e0d0, #f0ead8)",
          borderRadius: "0 4px 4px 0",
          boxShadow: "inset -2px 0 8px rgba(0,0,0,0.15)",
        }}>
          {/* Page lines */}
          {[15,25,35,45,55,65,75,85,95].map(t => (
            <div key={t} style={{
              position: "absolute", top: `${t}%`, left: "10%", right: "10%",
              height: "1px", background: "rgba(100,80,60,0.12)",
            }} />
          ))}
        </div>

        {/* Spine */}
        <div style={{
          position: "absolute", width: "12px", height: "120px",
          left: "68px", top: 0,
          background: "linear-gradient(90deg, #0a0e1c, #121830, #0e1428)",
          borderRadius: "3px 0 0 3px",
          boxShadow: "inset 2px 0 6px rgba(0,0,0,0.5)",
          border: "1px solid rgba(80,120,200,0.2)",
        }}>
          {/* Spine lines */}
          <div style={{ position: "absolute", top: "12px", left: "2px", right: "2px", height: "1px", background: "rgba(100,140,220,0.4)" }} />
          <div style={{ position: "absolute", bottom: "12px", left: "2px", right: "2px", height: "1px", background: "rgba(100,140,220,0.4)" }} />
        </div>

        {/* Front cover */}
        <div style={{
          position: "absolute", width: "80px", height: "120px",
          background: "linear-gradient(160deg, #0e1830 0%, #060e20 60%, #0c1428 100%)",
          border: "1px solid rgba(100,140,220,0.45)",
          borderRadius: "3px 8px 8px 3px",
          left: "80px", top: 0,
          boxShadow: "0 0 30px rgba(80,120,220,0.3), inset 0 0 20px rgba(60,100,180,0.08)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px",
        }}>
          {/* Cover decoration */}
          <div style={{
            width: "50px", height: "50px", borderRadius: "50%",
            border: "1px solid rgba(120,160,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(80,120,220,0.3)",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(100,140,255,0.2) 0%, transparent 70%)",
              border: "1px solid rgba(100,140,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "16px", filter: "drop-shadow(0 0 8px rgba(140,180,255,0.8))" }}>✦</span>
            </div>
          </div>
          <p style={{
            fontSize: "6px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(140,180,255,0.7)", textAlign: "center", lineHeight: 1.6,
            textShadow: "0 0 8px rgba(100,150,255,0.5)",
          }}>MENDACIUM<br/>VERITAS</p>
        </div>

        {/* Flipping page */}
        <div style={{
          position: "absolute", width: "74px", height: "116px",
          left: "82px", top: "2px",
          transformStyle: "preserve-3d",
          transformOrigin: "left center",
          transform: `rotateY(${pageAngle}deg)`,
          transition: "transform 1.1s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 10,
        }}>
          {/* Page front */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, #f0ead8, #e8e0cc)",
            borderRadius: "0 4px 4px 0",
            backfaceVisibility: "hidden",
            padding: "8px",
            boxShadow: "2px 0 10px rgba(0,0,0,0.2)",
          }}>
            {[10,22,34,46,58,70,82].map(t => (
              <div key={t} style={{
                position: "absolute", top: `${t}%`, left: "12%",
                right: `${8 + (t % 3) * 5}%`,
                height: "1px", background: "rgba(60,40,20,0.15)",
              }} />
            ))}
          </div>
          {/* Page back */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(160deg, #e8e0cc, #ddd4bc)",
            borderRadius: "0 4px 4px 0",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "8px",
          }}>
            {[12,24,36,48,60,72,84].map(t => (
              <div key={t} style={{
                position: "absolute", top: `${t}%`, left: "8%",
                right: `${12 + (t % 4) * 4}%`,
                height: "1px", background: "rgba(60,40,20,0.12)",
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating sparkles */}
      {open && [...Array(4)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${25 + i * 16}%`,
          top: `${10 + (i % 2) * 25}%`,
          width: "3px", height: "3px", borderRadius: "50%",
          background: i % 2 === 0 ? "rgba(140,180,255,0.9)" : "rgba(100,150,220,0.7)",
          boxShadow: "0 0 8px rgba(120,160,255,0.7)",
          animation: `spirit-float ${2 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
        }} />
      ))}
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
  const navigate = useNavigate();
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

          {/* Cards slideshow for step 2 (id="cards") */}
          {step === 2 && <CardsSlideshow visible={visible} />}

          {/* Coins — shown on mirror step (step=1, id="mirror") below the mirror */}
          {step === 1 && (
            <div className="relative mx-auto mb-4" style={{ width: "200px", height: "80px" }}>
              <div style={{
                position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                width: "140px", height: "20px", borderRadius: "50%",
                background: "rgba(200,146,58,0.15)", filter: "blur(10px)",
              }} />
              {coins.map((coin, idx) => (
                <div
                  key={coin.id}
                  onClick={dissolveACoin}
                  style={{
                    position: "absolute",
                    left: `${coin.x}%`,
                    top: `${coin.y}%`,
                    width: "38px", height: "38px",
                    borderRadius: "50%",
                    background: coin.dissolved ? "transparent" : "radial-gradient(circle at 35% 30%, #fff8c0, #f0c840 30%, #c8923a 60%, #8a5010 90%)",
                    boxShadow: coin.dissolved ? "none" : "0 0 16px rgba(200,146,58,0.8), inset 0 1px 4px rgba(255,245,180,0.7)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px",
                    cursor: coin.dissolved ? "default" : "pointer",
                    opacity: coin.dissolved ? 0 : 1,
                    transform: coin.dissolved ? "translateY(-50px) scale(0) rotate(180deg)" : "scale(1) rotate(0deg)",
                    transition: "all 0.9s cubic-bezier(0.34,1.2,0.64,1)",
                    animation: coin.dissolved ? "none" : `spirit-float ${2.2 + idx * 0.5}s ease-in-out ${idx * 0.4}s infinite`,
                  }}
                >
                  {!coin.dissolved && <span style={{ filter: "drop-shadow(0 0 4px rgba(255,200,60,0.6))", lineHeight: 1 }}>✦</span>}
                </div>
              ))}
              <p className="absolute bottom-0 w-full text-center" style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(200,146,58,0.45)" }}>
                {coins.filter(c => !c.dissolved).length > 0 ? "нажмите — монета растворится" : "✦ монеты растворились ✦"}
              </p>
            </div>
          )}

          {/* Hut on chicken legs for shop step (id="shop", index 4) */}
          {step === 4 && <HutOnLegs visible={visible} />}

          {/* 3D Book for book step (id="book", index 5) */}
          {step === 5 && <Book3D visible={visible} />}

          {/* Corset for epilogue step (id="epilogue", index 9) */}
          {step === 9 && <Corset3D visible={visible} />}

          {/* Journey chapter banner for step 3 */}
          {step === 3 && (
            <div style={{
              textAlign: "center", padding: "8px 0 4px",
              fontFamily: "'Cormorant', serif",
              fontSize: "11px", letterSpacing: "0.5em", textTransform: "uppercase",
              color: "rgba(160,210,255,0.55)",
            }}>
              ✦ &nbsp; Начало второй практики &nbsp; ✦
            </div>
          )}

          {/* Icon for other steps */}
          {step !== 0 && step !== 1 && step !== 2 && step !== 4 && step !== 5 && step !== 9 && (
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
            {current.text.split("\n\n").map((para, i) => {
              if (current.id === "intro" && para.trim() === "— — —") {
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(220,80,30,0.6))" }} />
                    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      {(["◆", "◇", "◆"] as string[]).map((s, si) => (
                        <span key={si} style={{
                          fontSize: si === 1 ? "8px" : "10px",
                          color: si === 1 ? "rgba(220,80,30,0.5)" : "rgba(220,80,30,0.8)",
                          filter: "drop-shadow(0 0 6px rgba(220,80,30,0.6))"
                        }}>{s}</span>
                      ))}
                    </div>
                    <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(220,80,30,0.6), transparent)" }} />
                  </div>
                );
              }
              return (
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
              );
            })}
            {current.id === "mirror" && <FootprintTrail />}
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
                onClick={() => {
                  onClose();
                  navigate("/veritas");
                }}
                className="flex-1 py-3.5 rounded-full text-sm tracking-wider uppercase transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,rgba(200,146,58,0.9),rgba(150,90,220,0.75))", color: "white", letterSpacing: "0.12em", boxShadow: "0 0 40px rgba(200,146,58,0.4), 0 0 20px rgba(140,80,200,0.25)" }}
              >
                ✦ продолжить историю
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
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/4c2d6537-5077-40cb-9e13-65319ec9ada4.png",
    label: "Звезда",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/5b0f10cb-9662-4d07-90f2-f917cf7d4261.png",
    label: "Сила",
  },
  {
    img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/2f91c33a-5c4b-4165-aa6b-0373b5bcf909.png",
    label: "Маг",
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

          <div id="shop-products" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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