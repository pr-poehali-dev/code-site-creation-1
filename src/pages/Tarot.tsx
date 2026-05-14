import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const TELEGRAM_URL = "https://functions.poehali.dev/b19212c6-df7b-49bb-9d3d-e1121d88dacb";

async function sendToTelegram(data: Record<string, string>) {
  const res = await fetch(TELEGRAM_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.ok;
}

// ─── 14 карт — по одной на каждую программу ──────────────────────────────────

const tarotCards = [
  {
    id: "moloko",
    symbol: "🥛",
    archetype: "III",
    name: "Императрица",
    keywords: ["Нежность", "Красота", "Питание"],
    meaning: "Карта говорит: ваше тело жаждет мягкой заботы и питания. Рукавица кесе, берёзовый веник и авторское обёртывание — ритуал для тех, кто хочет ощутить себя любимой.",
    program: "Молочные берега",
    programTagline: "3 ч · женская программа",
    programEffect: "Очищение · Обёртывание · Медитация",
    programPrice: "от 12 000 ₽",
    programGuests: "женская программа · 3 часа",
    procedures: [
      "Знакомство с банькой",
      "Проливка ножек, церемония первого пара, арома‑терапия",
      "Время девичьих секретов, авторского лимонада и наслаждения видами",
      "Лёгкий прогрев дубовыми вениками",
      "Очищение тела рукавицей кесе или омовение берёзовым веником — на выбор",
      "Авторское обёртывание с медитацией колокольчиками",
    ],
    extra: "Завершение: Лёгкость в теле, свобода в мыслях.",
    color: "#e8d5c0",
    glow: "rgba(232,213,192,0.2)",
    bgPattern: "linear-gradient(135deg, #1e180e, #1a1410)",
  },
  {
    id: "rodnik",
    symbol: "🍊",
    archetype: "XVII",
    name: "Звезда",
    keywords: ["Свежесть", "Бодрость", "Очищение"],
    meaning: "Карта говорит: вам нужна яркая, бодрящая перезагрузка. Контрастное парение с грейпфрутом, кислотный пилинг и ритуал пеленания на качелях — тело обновится, как родник после дождя.",
    program: "Терпкий родник",
    programTagline: "3 ч · мужская программа",
    programEffect: "Контраст · Пеленание · Цитрусовый детокс",
    programPrice: "от 8 500 ₽",
    programGuests: "мужская программа · 3 часа",
    procedures: [
      "Знакомство с банькой",
      "Проливка ножек, кислотный пилинг на стопы, церемония первого пара, арома‑терапия",
      "Время травяного чая, дружеских диалогов и наслаждения видами",
      "Глубокое парение с гревами, припарками, выходом в купель и ритуалом пеленания на качелях под звуки колокольчиков «нада», «ручейка»",
      "Время глубоко выдохнуть — от вашей кожи идёт пар, и мы продолжаем",
      "Солевое выкатывание с контрастно‑минеральной проливкой и ледяным грейпфрутом по телу",
    ],
    extra: "Завершение: Обновление done ✓",
    color: "#d4622a",
    glow: "rgba(212,98,42,0.25)",
    bgPattern: "linear-gradient(135deg, #1e0e06, #1a1410)",
  },
  {
    id: "tainy",
    symbol: "🌫",
    archetype: "XVIII",
    name: "Луна",
    keywords: ["Тайна", "Интуиция", "Выбор"],
    meaning: "Карта говорит: прислушайтесь к себе — сегодня ваше тело само укажет, что ему нужно. Банька, купель, качели, фруктовая нарезка и одна процедура на ваш выбор.",
    program: "Тайны тумана",
    programTagline: "4–6 гостей",
    programEffect: "Свобода выбора · Купель · Чаепитие",
    programPrice: "от 9 000 ₽ / гость",
    programGuests: "4–6 гостей",
    procedures: [
      "Знакомство с банькой",
      "Проливка ножек, церемония первого пара",
      "Банька, купель и качели в вашем распоряжении — чай, плед, фруктовая нарезка, орешки и мёд, всё по желанию",
      "Индивидуальная услуга на выбор: медовый скраб, омовение рукавицей кесе или солевое выкатывание",
      "Ледяные фруктовые контрасты 500 ₽ — очень советуем!",
      "Загадываем на ковше тайное желание — отправляем его через пар баньки к исполнению",
    ],
    extra: "",
    color: "#6aaad0",
    glow: "rgba(106,170,208,0.25)",
    bgPattern: "linear-gradient(135deg, #0a1420, #1a1410)",
  },
  {
    id: "vglub",
    symbol: "🌲",
    archetype: "XIV",
    name: "Умеренность",
    keywords: ["Баланс", "Глубина", "Преображение"],
    meaning: "Карта говорит: вы готовы к глубокому путешествию внутрь себя. Бесконтактный прогрев, дубовые веники, пеленание на качелях со звуковой медитацией и нежнейший медово‑травяной скраб.",
    program: "Вглубь лесных троп",
    programTagline: "2 гостя",
    programEffect: "Детокс · Пеленание · Медово‑травяной скраб",
    programPrice: "от 29 000 ₽",
    programGuests: "2 гостя",
    procedures: [
      "Проливка ножек, церемония первого пара, арома‑терапия",
      "Время чая или авторского лимонада, тишина или приятное общение, облака и шелест деревьев",
      "Бесконтактный прогрев",
      "Классическое парение с дубовыми вениками и ароматными грейпфрутами",
      "Время холодной купели, пледа, пеленания на качелях и звуковой медитации",
      "Нежнейшее медово‑травяное скрабирование",
      "Видовая площадка: ореховая маска на волосы, молочная ванночка с клюквой для ног",
    ],
    extra: "К завершению программы вы полностью обновлены — и мы будем рады видеть вас снова.",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.25)",
    bgPattern: "linear-gradient(135deg, #1c1308, #1a1410)",
  },
  {
    id: "svezhest",
    symbol: "🌿",
    archetype: "VI",
    name: "Влюблённые",
    keywords: ["Нежность", "Гармония", "Единство"],
    meaning: "Карта говорит: мягкая перезагрузка с ароматом трав, медовым прикосновением и холодной хвойной вуалью. Завершение — пеленание на качелях со звуковой медитацией.",
    program: "Свежесть полей",
    programTagline: "2 гостя",
    programEffect: "Хвойный дом · Пеленание · Медовый скраб",
    programPrice: "от 21 000 ₽",
    programGuests: "2 гостя",
    procedures: [
      "Знакомство с банькой",
      "Проливка ножек, церемония первого пара, арома‑терапия",
      "Время чаепития, приятных разговоров, наслаждения видами",
      "Бесконтактный прогрев",
      "Классическое парение с холодным хвойным домиком из веников",
      "Контрастные обливания, травяной чай или холодная купель и пеленание на качелях — на выбор. Пеленание можно дополнить звуковой медитацией",
      "Лёгкое скрабирование распаренными травами и тёплым мёдом с контрастом из ледяных ароматных шариков",
    ],
    extra: "",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.25)",
    bgPattern: "linear-gradient(135deg, #0e1a14, #1a1410)",
  },
  {
    id: "shepot",
    symbol: "ᛟ",
    archetype: "V",
    name: "Иерофант",
    keywords: ["Традиция", "Мудрость", "Единство"],
    meaning: "Карта говорит: сила — в общем ритуале. Первый пар с травами, ледяные шарики, звуковая медитация — это баня как церемония, где каждый обретает покой.",
    program: "Шёпот предков",
    programTagline: "4–6 гостей",
    programEffect: "Звуковая медитация · Этнические ароматы · Ледяные шарики",
    programPrice: "от 6 500 ₽ / гость",
    programGuests: "4–6 гостей",
    procedures: [
      "Знакомство с банькой",
      "Проливка ножек, бесконтактный прогрев под этническое музыкальное сопровождение и ароматы трав",
      "Банька, купель и качели в вашем распоряжении — чай, плед, фруктовая нарезка и мёд, всё по желанию",
      "Завершение: густой пар с ледяными шариками для самообтирания и звуковая медитация",
    ],
    extra: "",
    color: "#9b7fb5",
    glow: "rgba(155,127,181,0.25)",
    bgPattern: "linear-gradient(135deg, #180e22, #1a1410)",
  },
  {
    id: "arbuz",
    symbol: "🍉",
    archetype: "XIX",
    name: "Солнце",
    keywords: ["Радость", "Свежесть", "Сияние"],
    meaning: "Карта говорит: сегодня ваше тело ждёт праздника. Арбузный аромат, цитрусовое орошение и ледяное масло по телу — ритуал чистой летней радости.",
    program: "Арбузный лимонад",
    programTagline: "3–4 ч · для всех",
    programEffect: "Арома · Цитрусовый пилинг · Арбузное масло",
    programPrice: "от 24 000 ₽",
    programGuests: "для всех · 3–4 часа",
    procedures: [
      "Прогрев в парной с ароматами арбуза и цитрусовых (15 мин)",
      "Парение «Полосатая свежесть»: дубовый веник, холодная пихта под голову, орошение лимонно‑травяным отваром (15 мин)",
      "Купель (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость) (20 мин): комплексный пилинг с цедрой лимона, морской солью и мёдом; отдых в парной",
      "Кубики льда в шёлковом мешочке и нанесение арбузного масла по телу (10 мин)",
      "В завершение: дольки свежего арбуза и лимона",
    ],
    extra: "",
    color: "#e05a6a",
    glow: "rgba(224,90,106,0.25)",
    bgPattern: "linear-gradient(135deg, #200a10, #1a1410)",
  },
  {
    id: "kokos",
    symbol: "🥥",
    archetype: "XXI",
    name: "Мир",
    keywords: ["Полнота", "Тропики", "Обновление"],
    meaning: "Карта говорит: вы достигли точки полного обновления. Кокос, манго, бамбуковые палочки и кокосовое обёртывание — путешествие к экзотическому совершенству.",
    program: "Морозный кокос",
    programTagline: "3–4 ч · TOP‑программа",
    programEffect: "Лимфодренаж · Кокосовое обёртывание · Экзотика",
    programPrice: "от 35 000 ₽",
    programGuests: "1–2 гостя · 3–4 часа",
    procedures: [
      "Тропический прогрев: кокос и манго, мягкое опахивание пальмовым листом (15 мин)",
      "Экспресс‑массаж бамбуковыми палочками с лимфодренажем, орошение кокосовой водой (15 мин)",
      "Скраб «Экзотический фрукт»: тростниковый сахар и мякоть манго, холодная пихта под голову (10 мин)",
      "Купель (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "Обёртывание «Кокосовая нега» с кокосовым орехом, отдых в парной (25 мин)",
      "В завершение: коктейль манго‑маракуйя и десертные шарики с кокосовой стружкой",
    ],
    extra: "TOP‑программа",
    color: "#4ab8d8",
    glow: "rgba(74,184,216,0.25)",
    bgPattern: "linear-gradient(135deg, #081620, #1a1410)",
  },
  {
    id: "stone",
    symbol: "🗿",
    archetype: "IV",
    name: "Император",
    keywords: ["Сила", "Устойчивость", "Минерал"],
    meaning: "Карта говорит: вам нужна опора и мощь земли. Горячие камни, эвкалипт и пихта — терапия, восстанавливающая самые глубокие слои тела.",
    program: "Eucalyptus Stone Therapy",
    programTagline: "2–3 ч · минеральный ритуал",
    programEffect: "Эвкалипт · Горячие камни · Контраст",
    programPrice: "от 26 000 ₽",
    programGuests: "1–2 гостя · 2–3 часа",
    procedures: [
      "Минеральный прогрев: аромапрогрев с эвкалиптом и пихтой (15 мин)",
      "Парение «Кристаллы»: парение вениками с контрастами, тонкоструйные лейки (15 мин)",
      "Погружение в купель с кедровыми шишками и пихтой (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "Стоун‑терапия горячими камнями (35 мин)",
      "В завершение: фруктовый салат с мятой",
    ],
    extra: "",
    color: "#7aab9e",
    glow: "rgba(122,171,158,0.25)",
    bgPattern: "linear-gradient(135deg, #0e1a18, #1a1410)",
  },
  {
    id: "rahat",
    symbol: "🍮",
    archetype: "IX",
    name: "Отшельник",
    keywords: ["Восток", "Тишина", "Нега"],
    meaning: "Карта говорит: уйдите вглубь себя — в пряный покой. Шоколад, кардамон, масло сандала — восточный обряд для души, которая устала от суеты.",
    program: "Рахат‑лукум",
    programTagline: "2–4 ч · восточный ритуал",
    programEffect: "Пилинг кесе · Обёртывание · Сандал",
    programPrice: "от 12 500 ₽",
    programGuests: "1–3 гостя · 2–4 часа",
    procedures: [
      "Аромапрогрев (15 мин)",
      "Пилинг кесе или кофейной гущей с орошением розовой водой (15 мин)",
      "Обёртывание «Султанское»: шоколад с корицей и кардамоном, отдых в тепле (20 мин)",
      "Купель (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "Нанесение масла сандала и жасмина (10 мин)",
      "В завершение: чаепитие с рахат‑лукумом",
    ],
    extra: "",
    color: "#c8923a",
    glow: "rgba(200,146,58,0.25)",
    bgPattern: "linear-gradient(135deg, #1c1208, #1a1410)",
  },
  {
    id: "tykva",
    symbol: "🎃",
    archetype: "X",
    name: "Колесо Фортуны",
    keywords: ["Осень", "Золото", "Перемены"],
    meaning: "Карта говорит: пришло время золотого перехода. Тыква, мёд и куркума — обряд сезонного обновления, когда тело отпускает старое и принимает новое.",
    program: "Тыквенное золото",
    programTagline: "2–4 ч · осенний ритуал",
    programEffect: "Тыквенный пар · Пилинг · Золотая маска",
    programPrice: "от 25 000 ₽",
    programGuests: "для всех · 2–4 часа",
    procedures: [
      "Тыквенный прогрев с ароматами тыквы и корицы (15 мин)",
      "Парение «Осенний урожай»: дубовый веник с орошением тыквенным отваром (15 мин)",
      "Купель (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "Пилинг: тыквенные семечки, тростниковый сахар и масло тмина (10 мин)",
      "Маска из тыквенного пюре, мёда и куркумы на лицо (25 мин)",
      "В завершение: тыквенный латте с корицей",
    ],
    extra: "",
    color: "#e8922a",
    glow: "rgba(232,146,42,0.25)",
    bgPattern: "linear-gradient(135deg, #1e1206, #1a1410)",
  },
  {
    id: "klubnika",
    symbol: "🍓",
    archetype: "II",
    name: "Жрица",
    keywords: ["Свежесть", "Интуиция", "Чистота"],
    meaning: "Карта говорит: тело знает — ему нужна свежесть и нежная очистка. Клубника, мята и огуречный лёд — ритуал для тех, кто слышит себя.",
    program: "Клубничное мохито",
    programTagline: "3–4 ч · для всех",
    programEffect: "Огуречный компресс · Клубничная маска · Мята",
    programPrice: "от 22 000 ₽",
    programGuests: "для всех · 3–4 часа",
    procedures: [
      "Прогрев в парной, компрессы из охлаждённых ломтиков огурца на лицо и шею (15 мин)",
      "Парение «Хрустящая поляна»: дубовый веник с орошением мятным отваром (15 мин)",
      "Купель (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "Комплексный пилинг: измельчённый огурец и кофейная гуща/сахар (15 мин)",
      "Питательная маска: клубника, мёд, йогурт (15 мин)",
      "Кубики льда с огуречным отваром и клубничное масло по телу (10 мин)",
      "В завершение: клубничное мохито",
    ],
    extra: "",
    color: "#e05a80",
    glow: "rgba(224,90,128,0.25)",
    bgPattern: "linear-gradient(135deg, #1e0810, #1a1410)",
  },
  {
    id: "romashka",
    symbol: "🌼",
    archetype: "VII",
    name: "Колесница",
    keywords: ["Семья", "Путь", "Единство"],
    meaning: "Карта говорит: самое важное — рядом с вами. Ромашковый пар, берёзовые веники для детей и пикник с мёдом — баня как семейный праздник.",
    program: "Ромашковое поле",
    programTagline: "3 ч · семейная",
    programEffect: "Ромашковый пар · Нежный уход · Пикник",
    programPrice: "от 18 000 ₽",
    programGuests: "семья с детьми · 3 часа",
    procedures: [
      "Лёгкий прогрев с ромашковым паром",
      "Мягкое парение: берёзовые веники для детей, дубовые для взрослых",
      "Обливание прохладным травяным настоем",
      "Медово‑травяной пилинг или солевое выкатывание для взрослых; молочко из сметаны, мёда и ягод для ребёнка",
      "Купель для взрослых (можно дополнить пеленанием на качелях с медитацией — +3 500 ₽/гость)",
      "В завершение: пикник с фруктами, сушками, мёдом и морсом",
    ],
    extra: "Профессиональная фотосессия с ламинированными фото для семейного альбома — +4 000 ₽",
    color: "#e8d86a",
    glow: "rgba(232,216,106,0.25)",
    bgPattern: "linear-gradient(135deg, #1c1a06, #1a1410)",
  },
];

// ─── 3D Tarot Deck ────────────────────────────────────────────────────────────

function TarotDeck({
  cards,
  onSelect,
  deckOpen,
  onOpenDeck,
  hoveredCard,
  onHover,
  flippingCard,
}: {
  cards: typeof tarotCards;
  onSelect: (card: typeof tarotCards[0]) => void;
  deckOpen: boolean;
  onOpenDeck: () => void;
  hoveredCard: string | null;
  onHover: (id: string | null) => void;
  flippingCard: string | null;
}) {
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      const m = window.innerWidth < 768;
      isMobileRef.current = m;
      setIsMobile(m);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!deckOpen) {
    // Thick stacked closed deck
    return (
      <div className="flex flex-col items-center" style={{ perspective: "800px" }}>
        {/* Sparkles */}
        <div className="relative" style={{ width: 140, height: 200 }}>
          {[
            { top: "-24px", left: "-28px", delay: "0s", size: "14px" },
            { top: "-18px", right: "-32px", delay: "0.4s", size: "10px" },
            { top: "50%", left: "-36px", delay: "0.8s", size: "12px" },
            { top: "50%", right: "-38px", delay: "1.2s", size: "10px" },
            { bottom: "-20px", left: "-22px", delay: "0.6s", size: "11px" },
            { bottom: "-16px", right: "-26px", delay: "1.5s", size: "13px" },
          ].map((s, i) => (
            <span
              key={i}
              className="absolute pointer-events-none"
              style={{
                ...s,
                color: "#c8923a",
                fontSize: s.size,
                animation: `pulseGold ${2 + i * 0.3}s ease-in-out ${s.delay} infinite`,
                filter: "drop-shadow(0 0 6px rgba(200,146,58,0.8))",
              }}
            >✦</span>
          ))}

          {/* Stack layers bottom → top */}
          {Array.from({ length: 10 }).map((_, i) => {
            const offset = (9 - i) * 2;
            const lightness = 18 + i * 2;
            return (
              <div
                key={i}
                className="absolute rounded-xl"
                style={{
                  width: 120,
                  height: 170,
                  left: "50%",
                  transform: `translateX(-50%) translateY(${offset}px)`,
                  background: `linear-gradient(160deg, #${lightness.toString(16).padStart(2,"0")}1810, #1a1410)`,
                  border: "1px solid rgba(200,146,58,0.25)",
                  zIndex: i,
                }}
              />
            );
          })}

          {/* Top card — clickable */}
          <button
            onClick={onOpenDeck}
            aria-label="Открыть колоду"
            className="absolute rounded-xl flex flex-col items-center justify-center overflow-hidden"
            style={{
              width: 120,
              height: 170,
              left: "50%",
              transform: "translateX(-50%) translateY(0px)",
              background: "linear-gradient(160deg, #2e2418, #1a1410)",
              border: "1px solid rgba(200,146,58,0.45)",
              boxShadow: "0 0 40px rgba(200,146,58,0.25), 0 12px 40px rgba(0,0,0,0.7)",
              zIndex: 11,
              animation: "pulseGold 2.5s ease-in-out infinite",
              cursor: "pointer",
            }}
          >
            <div className="absolute inset-0 opacity-[0.05]"
              style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 12px)" }} />
            <div className="absolute inset-3 rounded-lg opacity-25"
              style={{ border: "1px solid #c8923a" }} />
            <span className="text-4xl relative z-10"
              style={{ color: "#c8923a", filter: "drop-shadow(0 0 12px rgba(200,146,58,0.9))" }}>◆</span>
            <div className="w-8 h-px my-2 relative z-10" style={{ background: "rgba(200,146,58,0.4)" }} />
            <span className="text-xs uppercase tracking-[0.35em] relative z-10 opacity-50" style={{ color: "#c8923a" }}>Таро</span>
          </button>

          {/* Shadow under deck */}
          <div className="absolute"
            style={{
              bottom: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 100,
              height: 14,
              background: "radial-gradient(ellipse, rgba(0,0,0,0.6), transparent 70%)",
              borderRadius: "50%",
              zIndex: 0,
            }} />
        </div>

        <p className="mt-8 text-xs uppercase tracking-[0.3em] opacity-50 text-center"
          style={{ color: "var(--eth-stone)" }}>
          Нажмите чтобы открыть колоду
        </p>
      </div>
    );
  }

  // ── Mobile fallback: 2-col grid ─────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {cards.map(card => {
          const isFlipping = flippingCard === card.id;
          return (
            <button
              key={card.id}
              onClick={() => onSelect(card)}
              onMouseEnter={() => onHover(card.id)}
              onMouseLeave={() => onHover(null)}
              className="relative rounded-xl overflow-hidden focus:outline-none"
              style={{
                aspectRatio: "2/3",
                background: isFlipping ? card.bgPattern : "linear-gradient(160deg, #2e2418, #1a1410)",
                border: `1px solid ${hoveredCard === card.id ? "rgba(200,146,58,0.6)" : "rgba(200,146,58,0.22)"}`,
                boxShadow: hoveredCard === card.id
                  ? "0 0 30px rgba(200,146,58,0.55)"
                  : "0 4px 20px rgba(0,0,0,0.5)",
                transition: "all 0.3s ease",
                transform: isFlipping ? "rotateY(180deg)" : "none",
              }}
            >
              {isFlipping ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                  <span className="text-3xl mb-1" style={{ color: card.color }}>{card.symbol}</span>
                  <p className="text-xs text-center font-light"
                    style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{card.name}</p>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.04]"
                    style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 12px)" }} />
                  <div className="absolute inset-2 rounded-lg opacity-20"
                    style={{ border: "1px solid #c8923a" }} />
                  <span className="text-3xl relative z-10 opacity-30" style={{ color: "#c8923a" }}>◆</span>
                  <span className="text-xs uppercase tracking-[0.3em] relative z-10 opacity-25 mt-1"
                    style={{ color: "#c8923a" }}>Таро</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // ── Desktop fan ──────────────────────────────────────────────────────────────
  const total = cards.length;
  const spreadX = 520;
  const cardW = 90;
  const cardH = 130;

  return (
    <div
      className="relative mx-auto"
      style={{
        perspective: "1200px",
        height: 260,
        width: "100%",
        maxWidth: 1100,
      }}
    >
      {cards.map((card, i) => {
        const offset = total > 1 ? (i / (total - 1)) * 2 - 1 : 0; // -1 to +1
        const tx = offset * spreadX;
        const ty = Math.abs(offset) * 0.15 * 80;
        const rY = offset * 25;
        const rZ = offset * 18;
        const isHovered = hoveredCard === card.id;
        const isFlipping = flippingCard === card.id;
        const distFromCenter = Math.abs(offset);
        const zBase = Math.round((1 - distFromCenter) * 14);

        const translateY = isHovered ? ty - 30 : ty;
        const scale = isHovered ? 1.15 : 0.85;
        const zIndex = isHovered ? 50 : zBase;

        const transform = isFlipping
          ? `translateX(${tx}px) translateY(${translateY}px) rotateZ(${rZ}deg) rotateY(180deg) scale(${scale})`
          : `translateX(${tx}px) translateY(${translateY}px) rotateY(${rY}deg) rotateZ(${rZ}deg) scale(${scale})`;

        return (
          <div
            key={card.id}
            onClick={() => onSelect(card)}
            onMouseEnter={() => onHover(card.id)}
            onMouseLeave={() => onHover(null)}
            className="absolute rounded-xl overflow-hidden cursor-pointer"
            style={{
              width: cardW,
              height: cardH,
              left: "50%",
              top: "50%",
              marginLeft: -cardW / 2,
              marginTop: -cardH / 2,
              transform,
              transformStyle: "preserve-3d",
              transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, z-index 0s",
              zIndex,
              boxShadow: isHovered
                ? "0 0 40px rgba(200,146,58,0.8), 0 12px 40px rgba(0,0,0,0.6)"
                : "0 4px 20px rgba(0,0,0,0.5)",
              background: isFlipping
                ? card.bgPattern
                : "linear-gradient(160deg, #2e2418, #1a1410)",
              border: `1px solid ${isHovered ? "rgba(200,146,58,0.65)" : "rgba(200,146,58,0.22)"}`,
            }}
          >
            {isFlipping ? (
              // Front face after flip
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2"
                style={{ background: card.bgPattern }}>
                <div className="absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(ellipse at 50% 30%, ${card.glow}, transparent 65%)` }} />
                <span className="text-2xl relative z-10 mb-1" style={{ color: card.color }}>{card.symbol}</span>
                <p className="text-xs text-center font-light relative z-10 leading-tight"
                  style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{card.name}</p>
              </div>
            ) : (
              // Card back
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="absolute inset-0 opacity-[0.05]"
                  style={{ background: "repeating-linear-gradient(45deg, #c8923a, #c8923a 1px, transparent 1px, transparent 12px)" }} />
                <div className="absolute inset-2 rounded-lg opacity-20"
                  style={{ border: "1px solid #c8923a" }} />
                <span className="text-2xl relative z-10 opacity-30" style={{ color: "#c8923a" }}>◆</span>
                <div className="w-5 h-px my-1 relative z-10 opacity-30" style={{ background: "#c8923a" }} />
                <span className="text-[8px] uppercase tracking-[0.3em] relative z-10 opacity-25"
                  style={{ color: "#c8923a" }}>Таро</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Program detail panel ─────────────────────────────────────────────────────

function ProgramPanel({ card, onBook, onReset }: {
  card: typeof tarotCards[0];
  onBook: () => void;
  onReset: () => void;
}) {
  return (
    <div className="animate-slide-up mt-10 rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${card.color}30`, background: "var(--eth-bg2)" }}>

      {/* Top glow header */}
      <div className="px-6 md:px-10 py-8 text-center relative"
        style={{ background: `radial-gradient(ellipse at 50% 0%, ${card.glow}, transparent 70%)` }}>
        <p className="text-xs uppercase tracking-[0.4em] mb-3 opacity-60" style={{ color: card.color }}>Ваша карта</p>
        <span className="text-6xl block mb-3" style={{ color: card.color }}>{card.symbol}</span>
        <h3 className="text-3xl md:text-4xl font-light mb-1" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          {card.name}
        </h3>
        <p className="text-xs mb-5" style={{ color: "var(--eth-stone)" }}>Аркан {card.archetype}</p>

        {/* Meaning */}
        <p className="text-base md:text-lg leading-relaxed italic max-w-lg mx-auto"
          style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", fontSize: "1.15rem" }}>
          «{card.meaning}»
        </p>
      </div>

      {/* Program info */}
      <div className="px-6 md:px-10 py-8" style={{ borderTop: `1px solid ${card.color}15` }}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--eth-stone)" }}>Рекомендованная программа</p>
            <h4 className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              {card.program}
            </h4>
            <p className="text-sm italic mt-1" style={{ color: card.color }}>{card.programTagline}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{card.programPrice}</p>
            <p className="text-xs mt-1" style={{ color: "var(--eth-stone)" }}>{card.programGuests}</p>
          </div>
        </div>

        {/* Effects */}
        <div className="flex flex-wrap gap-2 mb-6">
          {card.programEffect.split(" · ").map(e => (
            <span key={e} className="text-xs px-3 py-1 rounded-full"
              style={{ background: `${card.color}12`, color: card.color, border: `1px solid ${card.color}25` }}>
              {e}
            </span>
          ))}
        </div>

        {/* Procedures */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--eth-stone)" }}>Состав программы</p>
          <ul className="space-y-2.5">
            {card.procedures.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--eth-smoke)" }}>
                <span className="mt-1 flex-shrink-0 text-xs" style={{ color: card.color }}>◆</span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Extra */}
        {card.extra && (
          <div className="rounded-xl px-4 py-3 mb-6"
            style={{ background: `${card.color}08`, border: `1px solid ${card.color}18` }}>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--eth-stone)" }}>Можно дополнить</p>
            <p className="text-sm" style={{ color: card.color }}>{card.extra}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onBook}
            className="flex-1 py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, var(--eth-ember), var(--eth-gold))", color: "white", letterSpacing: "0.12em" }}>
            Записаться на программу
          </button>
          <button onClick={onReset}
            className="flex-1 py-3.5 rounded-xl text-sm tracking-widest uppercase transition-all hover:opacity-70"
            style={{ border: "1px solid rgba(200,146,58,0.25)", color: "var(--eth-gold2)", letterSpacing: "0.12em" }}>
            Выбрать другую карту
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tarot Booking Form ───────────────────────────────────────────────────────

function TarotBookingForm({ selectedCard }: { selectedCard: typeof tarotCards[0] | null }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [intention, setIntention] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("loading");
    const ok = await sendToTelegram({
      name, phone,
      program: selectedCard ? selectedCard.program : "Таро-консультация",
      comment: intention,
      source: "Таро-страница",
      ...(selectedCard ? { tarotCard: `${selectedCard.symbol} ${selectedCard.name}` } : {}),
    });
    setStatus(ok ? "ok" : "err");
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl p-10 text-center"
        style={{ background: "rgba(155,127,181,0.06)", border: "1px solid rgba(155,127,181,0.2)" }}>
        <p className="text-5xl mb-4">✨</p>
        <h3 className="text-2xl font-light mb-2" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
          Заявка отправлена!
        </h3>
        <p className="text-sm" style={{ color: "var(--eth-stone)" }}>
          Мария свяжется с вами и мы проведём ваш особенный ритуал
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-8"
      style={{ background: "rgba(200,146,58,0.04)", border: "1px solid rgba(200,146,58,0.15)" }}>
      <div className="space-y-4">
        <input required value={name} onChange={e => setName(e.target.value)}
          placeholder="Ваше имя" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        <input required value={phone} onChange={e => setPhone(e.target.value)}
          placeholder="Телефон или Telegram" type="text"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        {selectedCard && (
          <div className="px-4 py-3 rounded-xl flex items-center gap-2"
            style={{ background: `${selectedCard.color}10`, border: `1px solid ${selectedCard.color}25` }}>
            <span style={{ color: selectedCard.color }}>{selectedCard.symbol}</span>
            <p className="text-sm" style={{ color: "var(--eth-smoke)" }}>
              Карта: <strong style={{ color: selectedCard.color }}>{selectedCard.name}</strong> → {selectedCard.program}
            </p>
          </div>
        )}
        <textarea value={intention} onChange={e => setIntention(e.target.value)}
          placeholder="Расскажите о своём намерении — чего хотите достичь на сеансе" rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
          style={{ background: "rgba(255,255,255,0.04)", color: "var(--eth-cream)", border: "1px solid rgba(200,146,58,0.2)", fontFamily: "'Golos Text', sans-serif" }} />
        {status === "err" && (
          <p className="text-sm text-center" style={{ color: "#e57373" }}>Ошибка. Напишите Марии напрямую в Telegram.</p>
        )}
        <button type="submit" disabled={status === "loading"}
          className="w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
          style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.15em" }}>
          {status === "loading" ? "Отправляем..." : "Отправить заявку"}
        </button>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Tarot() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<typeof tarotCards[0] | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [deck] = useState(() => shuffle(tarotCards));
  const [deckOpen, setDeckOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [flippingCard, setFlippingCard] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function handleCardClick(card: typeof tarotCards[0]) {
    if (flippingCard === card.id) return;
    setFlippingCard(card.id);
    setSelected(null);
    setShowBooking(false);
    setTimeout(() => {
      setSelected(card);
      setTimeout(() => {
        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }, 700);
  }

  function handleReset() {
    setFlippingCard(null);
    setSelected(null);
    setShowBooking(false);
    setDeckOpen(false);
  }

  function handleBook() {
    setShowBooking(true);
    setTimeout(() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" }), 100);
  }

  return (
    <div style={{ background: "var(--eth-bg)", color: "var(--eth-cream)", minHeight: "100vh" }}>

      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 px-6 py-4 flex items-center justify-between"
        style={{ background: "rgba(26,20,16,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(200,146,58,0.12)" }}>
        <button onClick={() => navigate("/")}
          className="flex items-center gap-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold2)" }}>
          <Icon name="ArrowLeft" size={18} />
          <span className="text-sm tracking-wider" style={{ fontFamily: "'Cormorant', serif" }}>Иней & Магма corp.</span>
        </button>
        <p className="text-xs uppercase tracking-[0.3em]" style={{ color: "var(--eth-stone)" }}>Таро</p>
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
        style={{ background: "radial-gradient(ellipse at 50% 40%, #2a1808 0%, #1a1410 55%, #0a0806 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #9b7fb5, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #c8923a, transparent 70%)", filter: "blur(50px)" }} />
        </div>

        <div className="relative text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.4))" }} />
            <span className="text-sm tracking-[0.4em]" style={{ color: "var(--eth-gold)", opacity: 0.5 }}>◆ ◇ ◆</span>
            <div className="h-px flex-1 max-w-16" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.4))" }} />
          </div>

          <p className="text-xs uppercase tracking-[0.5em] mb-5" style={{ color: "var(--eth-stone)" }}>Индивидуальный подход</p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight mb-4 animate-fade-up"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Шелест Карт<br /><em>и ваша программа</em>
          </h1>

          <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.2))" }} />
            <span style={{ color: "var(--eth-gold)", opacity: 0.4 }}>✦</span>
            <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.2))" }} />
          </div>

          <p className="text-base md:text-lg leading-relaxed mb-4 animate-fade-up delay-100"
            style={{ color: "var(--eth-smoke)", fontFamily: "'Cormorant', serif", fontSize: "1.2rem", fontStyle: "italic" }}>
            Каждый человек уникален, и его путь к гармонии должен быть особенным.
          </p>
          <p className="text-sm leading-relaxed mb-4 animate-fade-up delay-200"
            style={{ color: "var(--eth-smoke)", opacity: 0.75, maxWidth: "500px", margin: "0 auto 1rem" }}>Карты помогут раскрыть ваши текущие потребности и желания.</p>
          <p className="text-sm leading-relaxed mb-10 animate-fade-up delay-300"
            style={{ color: "var(--eth-smoke)", opacity: 0.75, maxWidth: "460px", margin: "0 auto 2.5rem" }}>На основе карты для вас будет выбрана программа, которая резонирует именно с вами — обеспечивая тотальное обновление организма.</p>

          <button onClick={() => document.getElementById("spread")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 rounded-full text-sm tracking-widest uppercase transition-all hover:scale-105 hover:shadow-2xl animate-fade-up delay-400"
            style={{ background: "linear-gradient(135deg, #6b4080, #9b7fb5)", color: "white", letterSpacing: "0.12em" }}>
            Вытянуть карту
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse-gold">
          <Icon name="ChevronDown" size={18} color="var(--eth-gold)" />
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Как это работает
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "I", title: "Выберите карту", text: "Сосредоточьтесь на своём состоянии. Какая из шести карт притягивает взгляд — та и ваша." },
              { num: "II", title: "Читайте послание", text: "Карта откроется и расскажет о ваших текущих потребностях — и порекомендует программу именно для вас." },
              { num: "III", title: "Запишитесь", text: "Запись на программу онлайн с предоплатой и сертификатом на почту." },
            ].map(s => (
              <div key={s.num} className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: "rgba(155,127,181,0.1)", border: "1px solid rgba(155,127,181,0.3)" }}>
                  <span className="text-lg" style={{ fontFamily: "'Cormorant', serif", color: "#9b7fb5" }}>{s.num}</span>
                </div>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--eth-stone)" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Card Spread ─────────────────────────────────── */}
      <section id="spread" className="py-24 px-6"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1e1530 0%, #0f0c08 60%)" }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: "var(--eth-stone)" }}>Расклад</p>
            <h2 className="text-4xl md:text-5xl font-light mb-4"
              style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
              Выберите свою карту
            </h2>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--eth-stone)" }}>
              {deckOpen
                ? "Сосредоточьтесь. Какая карта притягивает взгляд?"
                : "Сосредоточьтесь на своём состоянии. Нажмите на колоду."}
            </p>
          </div>

          {/* 3D Deck */}
          <TarotDeck
            cards={deck}
            onSelect={handleCardClick}
            deckOpen={deckOpen}
            onOpenDeck={() => setDeckOpen(true)}
            hoveredCard={hoveredCard}
            onHover={setHoveredCard}
            flippingCard={flippingCard}
          />

          {/* Hint */}
          {deckOpen && !flippingCard && (
            <p className="text-center mt-8 text-xs tracking-widest uppercase animate-pulse-gold"
              style={{ color: "var(--eth-stone)", opacity: 0.45 }}>
              Нажмите на карту, которая притягивает
            </p>
          )}

          {/* Program panel */}
          <div ref={panelRef}>
            {selected && (
              <ProgramPanel
                card={selected}
                onBook={handleBook}
                onReset={handleReset}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Quote ───────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: "var(--eth-bg2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl block mb-8 opacity-30" style={{ color: "#9b7fb5" }}>◆</span>
          <p className="md:text-3xl font-light italic leading-relaxed mb-4 text-3xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
            Парная ведунья,<br />
            трав знахарка, огня хранительница.
          </p>
          <p className="md:text-xl font-light italic leading-relaxed mb-4 text-2xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-smoke)", opacity: 0.85 }}>
            Веник шепчет, мёд питает, чаша поёт —<br />
            Тело очищается, душа покой обретёт.
          </p>
          <p className="md:text-lg font-light italic leading-relaxed text-2xl"
            style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-stone)" }}>
            Каждому — свой путь, каждому — свой пар,<br />
            По обычаю древнему, по сердцу и в дар.
          </p>
        </div>
      </section>

      {/* ── Booking ─────────────────────────────────────── */}
      {showBooking && (
        <section id="booking" className="py-24 px-6"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #2a1808 0%, #1a1410 60%, #0f0c08 100%)" }}>
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(200,146,58,0.3))" }} />
                <span style={{ color: "var(--eth-gold)", opacity: 0.4 }}>◆ ◇ ◆</span>
                <div className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(200,146,58,0.3))" }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant', serif", color: "var(--eth-gold2)" }}>
                Записаться<br /><em>на сеанс</em>
              </h2>
              <p className="mt-4 text-sm" style={{ color: "var(--eth-stone)" }}>
                Мария свяжется с вами и мы выберем удобное время
              </p>
            </div>
            <TarotBookingForm selectedCard={selected} />

            {/* Telegram button */}
            <div className="mt-4 text-center">
              <p className="text-xs mb-3" style={{ color: "var(--eth-stone)" }}>или напишите напрямую</p>
              <a href="https://max.ru/+79186860650" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #5b3bb5, #3d2490)", color: "white", textDecoration: "none" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 6.5l-1.75 8.25c-.125.575-.475.725-.95.45l-2.625-1.925-1.275 1.225c-.138.138-.263.263-.538.263l.188-2.663 4.875-4.413c.213-.188-.05-.288-.325-.1l-6.025 3.8-2.588-.8c-.563-.175-.575-.563.125-.838L16 8.05c.463-.163.875.113.5.45z"/>
                </svg>
                <span className="text-sm font-medium">Написать в Max</span>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="py-8 px-6 text-center" style={{ background: "#0f0c08", borderTop: "1px solid rgba(200,146,58,0.08)" }}>
        <button onClick={() => navigate("/")}
          className="text-sm tracking-widest hover:opacity-70 transition-opacity"
          style={{ color: "var(--eth-gold)", opacity: 0.5, letterSpacing: "0.1em" }}>
          ← Вернуться к программам
        </button>
      </footer>
    </div>
  );
}