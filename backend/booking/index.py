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


def send_email(smtp_email: str, smtp_password: str, to_email: str, subject: str, html_body: str):
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"Рябина & Дым Lounge <{smtp_email}>"
    msg["To"] = to_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_email, smtp_password)
        server.sendmail(smtp_email, to_email, msg.as_bytes())


def handler(event: dict, context) -> dict:
    """Обработка онлайн-записи: отправляет письмо гостю и уведомление владельцу в Max/Telegram."""

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
    program = body.get("program", "—")
    date = body.get("date", "—")
    time_slot = body.get("time", "—")
    comment = body.get("comment", "")

    errors = []

    smtp_email = os.environ.get("SMTP_EMAIL", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    owner_email = os.environ.get("OWNER_EMAIL", "")
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")

    # --- Уведомление гостю на email ---
    if email and smtp_email and smtp_password:
        guest_html = f"""
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a1410; color: #f0e6d0; padding: 40px; border-radius: 16px;">
          <p style="color: #c8923a; font-size: 12px; letter-spacing: 0.4em; text-transform: uppercase; margin-bottom: 8px;">Рябина & Дым Lounge</p>
          <h1 style="font-size: 32px; font-weight: 300; color: #e8d0a0; margin-bottom: 24px;">Вы записаны!</h1>
          <div style="border-top: 1px solid rgba(200,146,58,0.3); border-bottom: 1px solid rgba(200,146,58,0.3); padding: 24px 0; margin-bottom: 24px;">
            <p style="margin: 8px 0;"><span style="color: #c8923a;">Программа:</span> {program}</p>
            <p style="margin: 8px 0;"><span style="color: #c8923a;">Дата:</span> {date}</p>
            <p style="margin: 8px 0;"><span style="color: #c8923a;">Время:</span> {time_slot}</p>
            <p style="margin: 8px 0;"><span style="color: #c8923a;">Имя:</span> {name}</p>
            <p style="margin: 8px 0;"><span style="color: #c8923a;">Телефон:</span> {phone}</p>
          </div>
          <p style="color: rgba(240,230,208,0.7); font-size: 14px; line-height: 1.8;">
            Ждём вас в назначенное время. За несколько часов до визита вы получите QR-код и кодовый пароль на дверь.<br/><br/>
            По всем вопросам: <a href="https://max.ru/+79186860650" style="color: #c8923a;">написать в Max</a>
          </p>
          <p style="margin-top: 32px; color: rgba(200,146,58,0.5); font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;">Иней & Магма corp · Рябина & Дым Lounge</p>
        </div>
        """
        try:
            send_email(smtp_email, smtp_password, email,
                       f"Вы записаны: {program} · {date} {time_slot}", guest_html)
        except Exception as e:
            errors.append(f"email_guest: {str(e)}")

    # --- Уведомление владельцу на email ---
    if owner_email and smtp_email and smtp_password:
        owner_html = f"""
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a1410; color: #f0e6d0; padding: 40px;">
          <h2 style="color: #c8923a;">🔥 Новая онлайн-запись</h2>
          <p><b>Имя:</b> {name}</p>
          <p><b>Телефон:</b> {phone}</p>
          <p><b>Email:</b> {email or "—"}</p>
          <p><b>Программа:</b> {program}</p>
          <p><b>Дата:</b> {date}</p>
          <p><b>Время:</b> {time_slot}</p>
          {"<p><b>Пожелания:</b> " + comment + "</p>" if comment else ""}
        </div>
        """
        try:
            send_email(smtp_email, smtp_password, owner_email,
                       f"Новая запись: {name} · {program} · {date} {time_slot}", owner_html)
        except Exception as e:
            errors.append(f"email_owner: {str(e)}")

    # --- Уведомление в Telegram/Max ---
    if bot_token:
        lines = [
            "🔥 *Новая онлайн-запись — Рябина & Дым*",
            "",
            f"👤 *Имя:* {name}",
            f"📞 *Телефон:* {phone}",
            f"📧 *Email:* {email or '—'}",
            f"🌿 *Программа:* {program}",
            f"📅 *Дата:* {date}",
            f"⏰ *Время:* {time_slot}",
        ]
        if comment:
            lines.append(f"💬 *Пожелания:* {comment}")
        try:
            send_telegram(bot_token, MAIN_CHAT_ID, "\n".join(lines))
        except Exception as e:
            errors.append(f"telegram: {str(e)}")

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True, "errors": errors}),
    }
