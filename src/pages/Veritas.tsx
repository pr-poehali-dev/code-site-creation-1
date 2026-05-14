import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DECK_CARDS = [
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/cc1ae69e-e626-4176-a15f-e83b7dddd6cc.png", label: "Отшельник" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/81a367f5-2915-42f4-a4f1-03bacba54650.png", label: "Императрица" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/66b42de5-7e80-464a-8da0-30b106859196.png", label: "Смерть" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/e84c4cbe-b93a-4126-aa77-dc3b215ee030.png", label: "Мир" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/6dd3f4e9-c256-4878-b69d-8b473e9357eb.png", label: "Дьявол" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/efb17863-b875-40f7-b476-0f98aabbf2b6.png", label: "Колесо Фортуны" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/4c2d6537-5077-40cb-9e13-65319ec9ada4.png", label: "Звезда" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/5b0f10cb-9662-4d07-90f2-f917cf7d4261.png", label: "Сила" },
  { img: "https://cdn.poehali.dev/projects/da18a679-098e-494d-8de1-a558d89808d6/bucket/2f91c33a-5c4b-4165-aa6b-0373b5bcf909.png", label: "Маг" },
];

// Fan of 3 cards preview
function CardFan() {
  const centerIdx = 4; // Дьявол in center
  const leftIdx = 2;   // Смерть left
  const rightIdx = 6;  // Звезда right

  return (
    <div style={{ position: "relative", width: "180px", height: "220px", margin: "0 auto 24px" }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: "-20px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(140,80,200,0.25) 0%, transparent 65%)",
        animation: "pulseGold 3s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      {/* Floor shadow */}
      <div style={{
        position: "absolute", bottom: "-10px", left: "50%", transform: "translateX(-50%)",
        width: "120px", height: "12px", borderRadius: "50%",
        background: "rgba(140,80,200,0.25)", filter: "blur(10px)",
      }} />
      {/* Left card */}
      <div style={{
        position: "absolute", top: "20px", left: "-10px",
        width: "100px", height: "150px",
        borderRadius: "8px", overflow: "hidden",
        border: "1px solid rgba(140,80,200,0.3)",
        transform: "rotate(-14deg) translateY(12px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
        zIndex: 1,
      }}>
        <img src={DECK_CARDS[leftIdx].img} alt={DECK_CARDS[leftIdx].label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Right card */}
      <div style={{
        position: "absolute", top: "20px", right: "-10px",
        width: "100px", height: "150px",
        borderRadius: "8px", overflow: "hidden",
        border: "1px solid rgba(140,80,200,0.3)",
        transform: "rotate(14deg) translateY(12px)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
        zIndex: 1,
      }}>
        <img src={DECK_CARDS[rightIdx].img} alt={DECK_CARDS[rightIdx].label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      {/* Center card */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "110px", height: "165px",
        borderRadius: "10px", overflow: "hidden",
        border: "1.5px solid rgba(185,159,216,0.6)",
        boxShadow: "0 0 40px rgba(140,80,200,0.5), 0 16px 40px rgba(0,0,0,0.7)",
        zIndex: 2,
        animation: "spirit-float 4s ease-in-out infinite",
      }}>
        <img src={DECK_CARDS[centerIdx].img} alt={DECK_CARDS[centerIdx].label}
          style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {/* Shimmer */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, rgba(200,170,255,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
      </div>
    </div>
  );
}

// Static Book visual
function BookVisual() {
  return (
    <div style={{ position: "relative", width: "160px", height: "180px", margin: "0 auto 24px", perspective: "700px" }}>
      {/* Glow */}
      <div style={{
        position: "absolute", bottom: "-8px", left: "50%", transform: "translateX(-50%)",
        width: "130px", height: "16px", borderRadius: "50%",
        background: "rgba(100,140,220,0.3)", filter: "blur(12px)",
      }} />
      {/* Book 3D */}
      <div style={{
        position: "absolute", bottom: "10px", left: "50%",
        width: "140px", height: "110px",
        transformStyle: "preserve-3d",
        transform: "translateX(-50%) rotateX(22deg) rotateY(-12deg)",
        animation: "spirit-float 5s ease-in-out infinite",
      }}>
        {/* Back cover */}
        <div style={{
          position: "absolute", width: "70px", height: "105px",
          background: "linear-gradient(160deg, #0e1830 0%, #0a1020 100%)",
          border: "1px solid rgba(100,140,220,0.3)",
          borderRadius: "3px 8px 8px 3px",
          left: "70px", top: 0,
          boxShadow: "4px 4px 20px rgba(0,0,0,0.6)",
        }} />
        {/* Pages */}
        <div style={{
          position: "absolute", width: "66px", height: "101px",
          left: "72px", top: "2px",
          background: "linear-gradient(90deg, #e8e0d0, #f0ead8)",
          borderRadius: "0 4px 4px 0",
          boxShadow: "inset -2px 0 8px rgba(0,0,0,0.15)",
        }}>
          {[15, 28, 41, 54, 67, 80].map(t => (
            <div key={t} style={{
              position: "absolute", top: `${t}%`, left: "10%", right: "10%",
              height: "1px", background: "rgba(100,80,60,0.12)",
            }} />
          ))}
        </div>
        {/* Spine */}
        <div style={{
          position: "absolute", width: "10px", height: "105px",
          left: "60px", top: 0,
          background: "linear-gradient(90deg, #0a0e1c, #121830, #0e1428)",
          borderRadius: "3px 0 0 3px",
          border: "1px solid rgba(80,120,200,0.2)",
        }}>
          <div style={{ position: "absolute", top: "10px", left: "2px", right: "2px", height: "1px", background: "rgba(100,140,220,0.4)" }} />
          <div style={{ position: "absolute", bottom: "10px", left: "2px", right: "2px", height: "1px", background: "rgba(100,140,220,0.4)" }} />
        </div>
        {/* Front cover */}
        <div style={{
          position: "absolute", width: "70px", height: "105px",
          background: "linear-gradient(160deg, #0e1830 0%, #060e20 60%, #0c1428 100%)",
          border: "1px solid rgba(100,140,220,0.45)",
          borderRadius: "3px 8px 8px 3px",
          left: "70px", top: 0,
          boxShadow: "0 0 30px rgba(80,120,220,0.35), inset 0 0 20px rgba(60,100,180,0.08)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px",
        }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "50%",
            border: "1px solid rgba(120,160,255,0.35)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 14px rgba(80,120,220,0.35)",
          }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(100,140,255,0.2) 0%, transparent 70%)",
              border: "1px solid rgba(100,140,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "13px", filter: "drop-shadow(0 0 8px rgba(140,180,255,0.8))" }}>✦</span>
            </div>
          </div>
          <p style={{
            fontSize: "5px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(140,180,255,0.7)", textAlign: "center", lineHeight: 1.6,
            textShadow: "0 0 8px rgba(100,150,255,0.5)",
          }}>MENDACIUM<br />VERITAS</p>
        </div>
      </div>
    </div>
  );
}

// Order modal
function OrderModal({ product, onClose }: { product: string; onClose: () => void }) {
  const waText = `Хочу+заказать+${encodeURIComponent(product)}+Veritas`;
  const waLink = `https://wa.me/79999999999?text=${waText}`;

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(4,2,12,0.88)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease forwards",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "rgba(14,10,26,0.98)",
        border: "1px solid rgba(140,80,200,0.35)",
        borderRadius: "24px",
        padding: "40px 36px",
        maxWidth: "380px",
        width: "100%",
        boxShadow: "0 0 80px rgba(140,80,200,0.25), 0 30px 60px rgba(0,0,0,0.8)",
        position: "relative",
        textAlign: "center",
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            width: "30px", height: "30px", borderRadius: "50%",
            background: "rgba(140,80,200,0.1)", border: "1px solid rgba(140,80,200,0.25)",
            color: "rgba(185,159,216,0.7)", cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >×</button>

        {/* Decorative top line */}
        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(200,146,58,0.5),rgba(140,80,200,0.5),transparent)", marginBottom: "24px" }} />

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "rgba(200,146,58,0.6)",
          marginBottom: "10px",
        }}>Mendacium Veritas</p>

        <h3 style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "1.7rem",
          fontWeight: 300,
          color: "rgba(230,215,255,0.97)",
          marginBottom: "6px",
          lineHeight: 1.2,
        }}>{product}</h3>

        <div style={{ height: "1px", width: "50px", margin: "14px auto 20px", background: "linear-gradient(90deg,transparent,rgba(140,80,200,0.5),transparent)" }} />

        <p style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "1.1rem",
          fontStyle: "italic",
          color: "rgba(200,185,245,0.7)",
          marginBottom: "28px",
          lineHeight: 1.7,
        }}>
          Для заказа напишите нам в WhatsApp — мы ответим в течение дня и оформим доставку.
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "14px 20px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(37,211,102,0.22), rgba(37,211,102,0.12))",
            border: "1px solid rgba(37,211,102,0.35)",
            color: "rgba(120,230,160,0.95)",
            textDecoration: "none",
            fontSize: "0.95rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
            transition: "all 0.3s ease",
            boxShadow: "0 0 30px rgba(37,211,102,0.1)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(37,211,102,0.25)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(37,211,102,0.1)";
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Написать в WhatsApp
        </a>

        <p style={{
          marginTop: "18px",
          fontSize: "0.72rem",
          color: "rgba(185,159,216,0.35)",
          letterSpacing: "0.05em",
        }}>
          или по номеру +7 999 999-99-99
        </p>

        <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(140,80,200,0.25),transparent)", marginTop: "20px" }} />
      </div>
    </div>
  );
}

export default function Veritas() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<string | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#080512", color: "rgba(230,215,255,0.95)" }}>
      {/* Ambient background radials */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(ellipse at 20% 20%, rgba(140,80,200,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(100,60,180,0.06) 0%, transparent 55%)",
      }} />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "fixed",
          left: `${10 + i * 16}%`,
          top: `${15 + (i % 3) * 25}%`,
          width: i % 2 === 0 ? "2px" : "3px",
          height: i % 2 === 0 ? "2px" : "3px",
          borderRadius: "50%",
          background: i % 3 === 0 ? "rgba(185,159,216,0.5)" : i % 3 === 1 ? "rgba(200,146,58,0.5)" : "rgba(140,100,220,0.4)",
          boxShadow: `0 0 8px ${i % 3 === 0 ? "rgba(185,159,216,0.6)" : "rgba(200,146,58,0.5)"}`,
          animation: `spirit-float ${3 + i * 0.7}s ease-in-out ${i * 0.5}s infinite`,
          pointerEvents: "none",
          zIndex: 0,
        }} />
      ))}

      {/* Navigation */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 24px",
        display: "flex", alignItems: "center", gap: "16px",
        background: "rgba(8,5,18,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(140,80,200,0.12)",
      }}>
        <button
          onClick={() => navigate("/shop")}
          style={{
            display: "flex", alignItems: "center", gap: "8px",
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(185,159,216,0.75)",
            fontFamily: "'Cormorant', serif",
            fontSize: "0.9rem",
            letterSpacing: "0.08em",
            transition: "color 0.3s ease",
            padding: "6px 0",
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "rgba(185,159,216,1)"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "rgba(185,159,216,0.75)"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Магазин
        </button>
        <div style={{ flex: 1 }} />
        <span style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "0.75rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(200,146,58,0.5)",
        }}>Mendacium Veritas</span>
      </nav>

      {/* Main content */}
      <main style={{ position: "relative", zIndex: 1, paddingTop: "80px" }}>

        {/* Hero section */}
        <section style={{ textAlign: "center", padding: "60px 24px 48px" }}>
          {/* Ornament */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.5))" }} />
            <span style={{ color: "rgba(200,146,58,0.6)", fontSize: "10px", letterSpacing: "6px" }}>◆ ◇ ◆</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, rgba(200,146,58,0.5), transparent)" }} />
          </div>

          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "0.72rem",
            letterSpacing: "0.55em",
            textTransform: "uppercase",
            color: "rgba(185,159,216,0.5)",
            marginBottom: "16px",
          }}>Авторская коллекция</p>

          <h1 style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(2.8rem, 8vw, 5rem)",
            fontWeight: 300,
            color: "rgba(230,215,255,0.97)",
            letterSpacing: "0.04em",
            lineHeight: 1.1,
            marginBottom: "16px",
            textShadow: "0 0 60px rgba(140,80,200,0.3)",
          }}>Mendacium Veritas</h1>

          <p style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(1rem, 3vw, 1.3rem)",
            fontStyle: "italic",
            color: "rgba(185,159,216,0.6)",
            letterSpacing: "0.15em",
            marginBottom: "32px",
          }}>Колода · Практика · Трансформация</p>

          {/* Divider */}
          <div style={{ height: "1px", maxWidth: "320px", margin: "0 auto", background: "linear-gradient(90deg,transparent,rgba(140,80,200,0.35),transparent)" }} />
        </section>

        {/* Product cards */}
        <section style={{ padding: "0 24px 64px", maxWidth: "960px", margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "32px",
          }}>

            {/* Card 1: Колода */}
            <div style={{
              background: "rgba(14,10,26,0.95)",
              border: "1px solid rgba(140,80,200,0.25)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(140,80,200,0.08), 0 20px 50px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Visual area */}
              <div style={{
                padding: "36px 24px 20px",
                background: "linear-gradient(180deg, rgba(20,10,36,0.9) 0%, rgba(14,10,26,0) 100%)",
                borderBottom: "1px solid rgba(140,80,200,0.12)",
              }}>
                <CardFan />
              </div>

              {/* Content */}
              <div style={{ padding: "28px 28px 0", flex: 1 }}>
                <p style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(185,159,216,0.4)",
                  marginBottom: "8px",
                }}>Авторская колода</p>
                <h2 style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.9rem",
                  fontWeight: 300,
                  color: "rgba(230,215,255,0.97)",
                  marginBottom: "4px",
                  lineHeight: 1.2,
                }}>Колода Veritas</h2>
                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "rgba(185,159,216,0.5)",
                  marginBottom: "16px",
                }}>9 карт + инструкция</p>

                <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(140,80,200,0.3),transparent)", marginBottom: "16px" }} />

                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "rgba(200,185,245,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}>
                  Авторская колода для практики самопознания. Каждая карта — зеркало, которое отражает то, что уже живёт внутри тебя.
                </p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["9 уникальных карт", "Плотный матовый картон", "Авторские иллюстрации", "Инструкция по практике"].map((f, i) => (
                    <li key={i} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      fontSize: "0.88rem",
                      color: "rgba(210,195,255,0.65)",
                    }}>
                      <span style={{ color: "rgba(185,159,216,0.7)", fontSize: "0.45rem", flexShrink: 0 }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div style={{ padding: "0 28px 28px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                  <span style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    color: "rgba(200,146,58,0.9)",
                  }}>2 900 ₽</span>
                </div>
                <button
                  onClick={() => setModal("Колода Veritas")}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(140,80,200,0.3), rgba(100,60,180,0.2))",
                    border: "1px solid rgba(185,159,216,0.35)",
                    color: "rgba(220,205,255,0.97)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 30px rgba(140,80,200,0.15)",
                    fontWeight: 600,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(140,80,200,0.35)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(140,80,200,0.15)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  Заказать
                </button>
              </div>
            </div>

            {/* Card 2: Книга */}
            <div style={{
              background: "rgba(14,10,26,0.95)",
              border: "1px solid rgba(140,80,200,0.25)",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(100,140,220,0.08), 0 20px 50px rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* Visual area */}
              <div style={{
                padding: "36px 24px 20px",
                background: "linear-gradient(180deg, rgba(10,14,30,0.9) 0%, rgba(14,10,26,0) 100%)",
                borderBottom: "1px solid rgba(100,140,220,0.12)",
              }}>
                <BookVisual />
              </div>

              {/* Content */}
              <div style={{ padding: "28px 28px 0", flex: 1 }}>
                <p style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "rgba(140,180,255,0.4)",
                  marginBottom: "8px",
                }}>Авторская книга</p>
                <h2 style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.9rem",
                  fontWeight: 300,
                  color: "rgba(230,215,255,0.97)",
                  marginBottom: "4px",
                  lineHeight: 1.2,
                }}>Книга практик</h2>
                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "rgba(140,180,255,0.5)",
                  marginBottom: "16px",
                }}>Продолжение истории</p>

                <div style={{ height: "1px", background: "linear-gradient(90deg,transparent,rgba(100,140,220,0.3),transparent)", marginBottom: "16px" }} />

                <p style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  color: "rgba(200,185,245,0.7)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}>
                  Авторская книга с практиками самопознания. Продолжение путешествия, которое началось в зеркале истины.
                </p>

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  {["Авторские практики", "Медитации и упражнения", "Продолжение истории Mendacium Veritas", "Мягкая обложка, 120 стр."].map((f, i) => (
                    <li key={i} style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      fontSize: "0.88rem",
                      color: "rgba(210,195,255,0.65)",
                    }}>
                      <span style={{ color: "rgba(140,180,255,0.7)", fontSize: "0.45rem", flexShrink: 0 }}>◆</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price + CTA */}
              <div style={{ padding: "0 28px 28px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                  <span style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: "2.2rem",
                    fontWeight: 300,
                    color: "rgba(200,146,58,0.9)",
                  }}>1 900 ₽</span>
                </div>
                <button
                  onClick={() => setModal("Книга практик")}
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, rgba(100,140,220,0.25), rgba(80,110,200,0.15))",
                    border: "1px solid rgba(140,180,255,0.3)",
                    color: "rgba(200,220,255,0.97)",
                    fontSize: "0.82rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 30px rgba(100,140,220,0.12)",
                    fontWeight: 600,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 50px rgba(100,140,220,0.3)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px rgba(100,140,220,0.12)";
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>

          {/* Bundle card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(20,12,34,0.98) 0%, rgba(14,10,26,0.98) 100%)",
            border: "1px solid rgba(200,146,58,0.3)",
            borderRadius: "24px",
            padding: "32px 36px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            boxShadow: "0 0 60px rgba(200,146,58,0.1), 0 20px 50px rgba(0,0,0,0.5)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Background radial */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 30% 50%, rgba(200,146,58,0.07) 0%, transparent 60%)",
            }} />

            <div style={{ position: "relative" }}>
              <p style={{
                fontSize: "0.65rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "rgba(200,146,58,0.5)",
                marginBottom: "6px",
              }}>Специальное предложение</p>
              <h3 style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "1.8rem",
                fontWeight: 300,
                color: "rgba(230,215,255,0.97)",
                marginBottom: "4px",
              }}>Колода + Книга</h3>
              <p style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "0.95rem",
                fontStyle: "italic",
                color: "rgba(185,159,216,0.5)",
              }}>Полный набор для практики самопознания</p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "28px", flexWrap: "wrap", position: "relative" }}>
              <div>
                <span style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "1rem",
                  color: "rgba(185,159,216,0.35)",
                  textDecoration: "line-through",
                  marginRight: "10px",
                }}>4 800 ₽</span>
                <span style={{
                  fontFamily: "'Cormorant', serif",
                  fontSize: "2.4rem",
                  fontWeight: 300,
                  color: "rgba(200,146,58,0.95)",
                }}>4 200 ₽</span>
              </div>
              <button
                onClick={() => setModal("Колода + Книга практик")}
                style={{
                  padding: "14px 32px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(200,146,58,0.35), rgba(160,90,220,0.25))",
                  border: "1px solid rgba(200,146,58,0.45)",
                  color: "rgba(240,220,180,0.97)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 40px rgba(200,146,58,0.2)",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px rgba(200,146,58,0.4)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.03)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(200,146,58,0.2)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                ✦ Получить набор
              </button>
            </div>
          </div>
        </section>

        {/* Bottom quote */}
        <section style={{
          padding: "40px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}>
          {/* Ornament */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "32px" }}>
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(140,80,200,0.35))" }} />
            <span style={{ color: "rgba(185,159,216,0.3)", fontSize: "10px", letterSpacing: "8px" }}>✦ ✦ ✦</span>
            <div style={{ width: "80px", height: "1px", background: "linear-gradient(90deg, rgba(140,80,200,0.35), transparent)" }} />
          </div>

          <blockquote style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(1.2rem, 3.5vw, 1.7rem)",
            fontStyle: "italic",
            fontWeight: 300,
            color: "rgba(200,185,245,0.55)",
            lineHeight: 1.8,
            letterSpacing: "0.02em",
            maxWidth: "600px",
            margin: "0 auto",
          }}>
            "Женщина протянула вам книгу.. Возьмёте ли?"
          </blockquote>

          <div style={{ marginTop: "28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, rgba(200,146,58,0.3))" }} />
            <span style={{ color: "rgba(200,146,58,0.25)", fontSize: "9px", letterSpacing: "5px" }}>◆ ◇ ◆</span>
            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, rgba(200,146,58,0.3), transparent)" }} />
          </div>
        </section>
      </main>

      {/* Modal */}
      {modal && (
        <OrderModal product={modal} onClose={() => setModal(null)} />
      )}
    </div>
  );
}
