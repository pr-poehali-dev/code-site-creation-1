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


def build_discount_html(name: str, program: str) -> str:
    return f"""
    <div style="font-family:Georgia,serif; max-width:600px; margin:0 auto; background:linear-gradient(135deg,#1a1410,#2a1808); color:#f0e6d0; border-radius:20px; overflow:hidden; border:1px solid rgba(200,146,58,0.3);">
      <div style="padding:48px 40px 32px; text-align:center;">
        <p style="font-size:10px; letter-spacing:0.45em; text-transform:uppercase; color:rgba(200,146,58,0.7); margin:0 0 6px;">Рябина &amp; Дым Lounge</p>
        <div style="width:50px; height:1px; margin:14px auto; background:linear-gradient(90deg,transparent,rgba(200,146,58,0.5),transparent);"></div>
        <p style="font-size:11px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(240,230,208,0.5); margin:0 0 28px;">Эксклюзивные программы парения · NEW</p>

        <div style="display:inline-block; padding:10px 28px; border-radius:40px; background:linear-gradient(135deg,#d4622a,#c8923a); margin-bottom:28px;">
          <p style="font-size:11px; letter-spacing:0.35em; text-transform:uppercase; color:white; margin:0;">ПРЕДБРОНИРОВАНИЕ</p>
        </div>

        <h1 style="font-size:64px; font-weight:300; color:#c8923a; margin:0 0 4px; line-height:1;">19%</h1>
        <p style="font-size:14px; color:rgba(240,225,200,0.65); margin:0 0 28px; letter-spacing:0.1em;">ваша персональная скидка на программу парения</p>

        <div style="border-radius:14px; background:rgba(200,146,58,0.07); border:1px solid rgba(200,146,58,0.18); padding:20px 24px; margin-bottom:28px; text-align:left;">
          <p style="font-size:10px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(200,146,58,0.6); margin:0 0 8px;">Программа:</p>
          <p style="font-size:20px; color:#e8d0a0; margin:0; font-style:italic;">{program}</p>
        </div>

        <p style="font-size:15px; color:rgba(240,225,200,0.9); line-height:1.8; margin:0 0 10px;">
          {name}, благодарим за интерес к нашим ритуалам!
        </p>
        <p style="font-size:13px; color:rgba(240,225,200,0.6); line-height:1.9; margin:0 0 28px;">
          Скидка 19% закреплена за вашим именем.<br/>
          Просто назовите своё имя при записи — и скидка применится автоматически.
        </p>

        <div style="border-radius:14px; background:rgba(200,146,58,0.05); border:1px solid rgba(200,146,58,0.12); padding:18px 24px; margin-bottom:32px; text-align:left;">
          <p style="font-size:10px; text-transform:uppercase; letter-spacing:0.3em; color:rgba(200,146,58,0.5); margin:0 0 10px;">В каждую программу входит:</p>
          <p style="font-size:13px; color:rgba(240,225,200,0.65); line-height:2; margin:0;">
            🧹 Аренда бани &nbsp;·&nbsp; 🛁 Купель<br/>
            🍵 Чай, мёд, сушки<br/>
            🩴 Халаты, полотенца, шапочки, тапочки и одноразовое бельё
          </p>
        </div>

        <a href="https://max.ru/+79186860650" style="display:inline-block; padding:14px 36px; border-radius:40px; background:linear-gradient(135deg,#d4622a,#c8923a); color:white; font-size:12px; text-decoration:none; letter-spacing:0.15em; text-transform:uppercase;">Записаться в Max</a>

        <div style="width:50px; height:1px; margin:32px auto 20px; background:linear-gradient(90deg,transparent,rgba(200,146,58,0.4),transparent);"></div>
        <p style="font-size:10px; color:rgba(200,146,58,0.3); letter-spacing:0.25em; text-transform:uppercase; margin:0;">Иней &amp; Магма corp. · Краснодар</p>
      </div>
    </div>
    """


def handler(event: dict, context) -> dict:
    """Обработка онлайн-записи и предбронирования эксклюзивных программ с отправкой email и уведомлением владельцу."""

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
    booking_type = body.get("type", "booking")

    name = body.get("name", "—")
    phone = body.get("phone", "—")
    email = body.get("email", "")
    program = body.get("program", "—")
    comment = body.get("comment", "")

    errors = []

    smtp_email = os.environ.get("SMTP_EMAIL", "")
    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    owner_email = os.environ.get("OWNER_EMAIL", "")
    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")

    # ── ПРЕДБРОНИРОВАНИЕ (скидка 19%) ──────────────────────────────────────────
    if booking_type == "prebooking":
        discount_html = build_discount_html(name, program)

        if email and smtp_email and smtp_password:
            full_html = f"""
            <div style="font-family:Georgia,serif; max-width:640px; margin:0 auto; background:#0f0c08; padding:40px 20px;">
              {discount_html}
              <p style="color:rgba(200,146,58,0.35); font-size:10px; text-align:center; margin:20px 0 0; letter-spacing:0.2em;">Рябина &amp; Дым Lounge · Краснодар</p>
            </div>
            """
            try:
                send_email(smtp_email, smtp_password, email,
                           f"Ваша скидка 19% на «{program}» · Рябина & Дым Lounge", full_html)
            except Exception as e:
                errors.append(f"email_guest: {str(e)}")

        if owner_email and smtp_email and smtp_password:
            owner_html = f"""
            <div style="font-family:Georgia,serif; padding:30px; max-width:500px; background:#1a1410; color:#f0e6d0; border-radius:16px;">
              <h2 style="color:#c8923a; margin:0 0 20px;">🔥 Предбронирование NEW программы</h2>
              <p style="margin:8px 0;"><b style="color:#c8923a;">Имя:</b> {name}</p>
              <p style="margin:8px 0;"><b style="color:#c8923a;">Телефон:</b> {phone}</p>
              <p style="margin:8px 0;"><b style="color:#c8923a;">Email:</b> {email or '—'}</p>
              <p style="margin:8px 0;"><b style="color:#c8923a;">Программа:</b> {program}</p>
              {"<p style='margin:8px 0;'><b style='color:#c8923a;'>Комментарий:</b> " + comment + "</p>" if comment else ""}
              <div style="margin-top:20px; padding:14px; border-radius:10px; background:rgba(200,146,58,0.08); border:1px solid rgba(200,146,58,0.2);">
                <p style="margin:0; font-size:13px; color:rgba(240,230,208,0.7);">Гость получил письмо со скидкой 19% ✅</p>
              </div>
            </div>
            """
            try:
                send_email(smtp_email, smtp_password, owner_email,
                           f"🔥 Предбронирование: {name} · {program}", owner_html)
            except Exception as e:
                errors.append(f"email_owner: {str(e)}")

        if bot_token:
            lines = [
                "🔥 *Предбронирование NEW — Рябина & Дым*",
                "",
                f"👤 *Имя:* {name}",
                f"📞 *Телефон:* {phone}",
                f"📧 *Email:* {email or '—'}",
                f"🧖 *Программа:* {program}",
            ]
            if comment:
                lines.append(f"💬 *Комментарий:* {comment}")
            lines += ["", "✅ Скидка 19% отправлена гостю на email"]
            try:
                send_telegram(bot_token, MAIN_CHAT_ID, "\n".join(lines))
            except Exception as e:
                errors.append(f"telegram: {str(e)}")

        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
            "body": json.dumps({"success": True, "type": "prebooking", "errors": errors}),
        }

    # ── ОБЫЧНАЯ ЗАПИСЬ ──────────────────────────────────────────────────────────
    date = body.get("date", "—")
    time_slot = body.get("time", "—")

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
