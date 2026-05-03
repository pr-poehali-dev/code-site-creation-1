import os
import json
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

MAIN_CHAT_ID = "89186860650"


def send_telegram(bot_token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }).encode()
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())


def build_cert_html(style_id: str, value: str, recipient: str, cert_type: str, program: str) -> str:
    styles_map = {
        "ethnic": {
            "bg": "linear-gradient(135deg, #1a1410, #2a1808)",
            "border": "rgba(200,146,58,0.4)",
            "accent": "#c8923a",
            "text": "#f0e6d0",
            "sub": "rgba(240,230,208,0.55)",
        },
        "nature": {
            "bg": "linear-gradient(135deg, #f0ece0, #e8f0e4)",
            "border": "rgba(74,103,65,0.4)",
            "accent": "#4a6741",
            "text": "#2d2820",
            "sub": "rgba(45,40,32,0.55)",
        },
        "luxury": {
            "bg": "linear-gradient(135deg, #0d1f1a, #1a3028)",
            "border": "rgba(192,192,192,0.35)",
            "accent": "#c0c0c0",
            "text": "#f0ece0",
            "sub": "rgba(240,236,224,0.5)",
        },
        "floral": {
            "bg": "linear-gradient(135deg, #fdf0f5, #f5e8f0)",
            "border": "rgba(180,100,130,0.35)",
            "accent": "#b46482",
            "text": "#2d2820",
            "sub": "rgba(45,40,32,0.55)",
        },
    }
    s = styles_map.get(style_id, styles_map["ethnic"])
    display_value = value
    recipient_line = f'<p style="font-size:14px; font-style:italic; color:{s["text"]}; opacity:0.75; font-family:Georgia,serif; margin:8px 0 0;">для {recipient}</p>' if recipient else ""
    program_line = f'<p style="font-size:12px; color:{s["sub"]}; margin:6px 0 0;">{program}</p>' if cert_type == "program" and program else ""

    return f"""
    <div style="max-width:560px; margin:0 auto; font-family:Georgia,serif; background:{s['bg']}; border-radius:20px; overflow:hidden; border:1px solid {s['border']}; padding:0;">
      <div style="padding:48px 40px; text-align:center; position:relative;">
        <p style="font-size:10px; letter-spacing:0.4em; text-transform:uppercase; color:{s['accent']}; opacity:0.7; margin:0 0 8px;">Рябина & Дым Lounge</p>
        <p style="font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:{s['sub']}; margin:0 0 20px;">Подарочный сертификат</p>
        <div style="width:60px; height:1px; margin:0 auto 20px; background:linear-gradient(90deg, transparent, {s['accent']}, transparent);"></div>
        <p style="font-size:42px; font-weight:300; color:{s['accent']}; margin:0;">{display_value}</p>
        {recipient_line}
        {program_line}
        <div style="width:60px; height:1px; margin:20px auto 16px; background:linear-gradient(90deg, transparent, {s['accent']}, transparent);"></div>
        <p style="font-size:11px; color:{s['sub']}; margin:0;">Авторские банные программы</p>
      </div>
      <div style="background:rgba(0,0,0,0.2); padding:24px 40px; border-top:1px solid {s['border']};">
        <p style="font-size:13px; color:{s['text']}; opacity:0.8; margin:0 0 12px; line-height:1.7;">
          Этот сертификат действителен для записи на любую программу Рябина & Дым Lounge.<br/>
          Для активации напишите нам в Max и назовите номинал.
        </p>
        <a href="https://max.ru/+79186860650" style="display:inline-block; padding:10px 24px; border-radius:12px; background:{s['accent']}; color:white; font-size:12px; text-decoration:none; letter-spacing:0.1em; text-transform:uppercase;">Активировать в Max</a>
        <p style="font-size:10px; color:{s['sub']}; margin:16px 0 0; opacity:0.6;">Иней & Магма corp. · Краснодар</p>
      </div>
    </div>
    """


def handler(event: dict, context) -> dict:
    """Отправка подарочного сертификата на email покупателя и уведомление владельцу."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    email = body.get("email", "")
    recipient = body.get("recipient", "")
    cert_value = body.get("certValue", "—")
    cert_type = body.get("certType", "amount")
    cert_style = body.get("certStyle", "ethnic")
    program = body.get("program", "")
    wishes = body.get("wishes", "")

    smtp_email = os.environ.get("SMTP_EMAIL", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    owner_email = os.environ.get("OWNER_EMAIL", "")
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")

    errors = []

    cert_html = build_cert_html(cert_style, cert_value, recipient, cert_type, program)

    # --- Отправить сертификат покупателю ---
    if email and smtp_email and smtp_password:
        full_html = f"""
        <div style="font-family:Georgia,serif; max-width:600px; margin:0 auto; background:#0f0c08; color:#f0e6d0; padding:40px;">
          <p style="color:#c8923a; font-size:11px; letter-spacing:0.4em; text-transform:uppercase; margin:0 0 6px;">Рябина & Дым Lounge</p>
          <h1 style="font-size:28px; font-weight:300; color:#e8d0a0; margin:0 0 24px;">Ваш подарочный сертификат</h1>
          {cert_html}
          <p style="color:rgba(240,230,208,0.6); font-size:13px; line-height:1.8; margin:28px 0 0;">
            Покажите это письмо или назовите номинал при записи.<br/>
            По всем вопросам: <a href="https://max.ru/+79186860650" style="color:#c8923a;">написать в Max</a>
          </p>
          <p style="color:rgba(200,146,58,0.4); font-size:10px; letter-spacing:0.2em; text-transform:uppercase; margin:24px 0 0;">Иней & Магма corp. · Рябина & Дым Lounge</p>
        </div>
        """
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Ваш подарочный сертификат · {cert_value} · Рябина & Дым Lounge"
            msg["From"] = f"Рябина & Дым Lounge <{smtp_email}>"
            msg["To"] = email
            msg.attach(MIMEText(full_html, "html", "utf-8"))
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(smtp_email, smtp_password)
                server.sendmail(smtp_email, email, msg.as_bytes())
        except Exception as e:
            errors.append(f"email_cert: {str(e)}")

    # --- Уведомление владельцу ---
    if owner_email and smtp_email and smtp_password:
        try:
            msg2 = MIMEMultipart("alternative")
            msg2["Subject"] = f"Новый сертификат: {name} · {cert_value}"
            msg2["From"] = f"Рябина & Дым Lounge <{smtp_email}>"
            msg2["To"] = owner_email
            owner_html = f"""
            <div style="font-family:Georgia,serif; padding:30px; max-width:500px;">
              <h2 style="color:#c8923a;">🎁 Новый сертификат</h2>
              <p><b>Покупатель:</b> {name}</p>
              <p><b>Телефон:</b> {phone}</p>
              <p><b>Email:</b> {email or '—'}</p>
              <p><b>Получатель:</b> {recipient or '—'}</p>
              <p><b>Номинал:</b> {cert_value}</p>
              <p><b>Тип:</b> {'На программу: ' + program if cert_type == 'program' else 'На сумму'}</p>
              <p><b>Стиль:</b> {cert_style}</p>
              {"<p><b>Пожелания:</b> " + wishes + "</p>" if wishes else ""}
            </div>
            """
            msg2.attach(MIMEText(owner_html, "html", "utf-8"))
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(smtp_email, smtp_password)
                server.sendmail(smtp_email, owner_email, msg2.as_bytes())
        except Exception as e:
            errors.append(f"email_owner: {str(e)}")

    # --- Telegram уведомление ---
    if bot_token:
        lines = [
            "🎁 *Новый сертификат — Рябина & Дым*",
            "",
            f"👤 *Покупатель:* {name}",
            f"📞 *Телефон:* {phone}",
            f"📧 *Email:* {email or '—'}",
            f"🎀 *Получатель:* {recipient or '—'}",
            f"💰 *Номинал:* {cert_value}",
            f"🎨 *Стиль:* {cert_style}",
        ]
        if cert_type == "program" and program:
            lines.append(f"🌿 *Программа:* {program}")
        if wishes:
            lines.append(f"💬 *Пожелания:* {wishes}")
        try:
            send_telegram(bot_token, MAIN_CHAT_ID, "\n".join(lines))
        except Exception as e:
            errors.append(f"telegram: {str(e)}")

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "errors": errors}),
    }
