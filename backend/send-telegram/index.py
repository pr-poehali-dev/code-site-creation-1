import os
import json
import urllib.request
import urllib.parse

CHAT_ID = "89186860650"


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта пармастера Марии в Telegram."""

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

    bot_token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    if not bot_token:
        return {
            "statusCode": 500,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Бот не настроен"}),
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "—")
    phone = body.get("phone", "—")
    program = body.get("program", "—")
    comment = body.get("comment", "")
    source = body.get("source", "Сайт")
    tarot_card = body.get("tarotCard", "")

    lines = [
        "🔥 *Новая заявка — Мария Пармастер*",
        "",
        f"👤 *Имя:* {name}",
        f"📞 *Телефон/Telegram:* {phone}",
        f"🌿 *Программа:* {program}",
    ]

    if tarot_card:
        lines.append(f"🃏 *Карта Таро:* {tarot_card}")

    if comment:
        lines.append(f"💬 *Пожелания:* {comment}")

    lines += ["", f"📍 *Источник:* {source}"]

    text = "\n".join(lines)

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "Markdown",
    }).encode()

    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())

    if result.get("ok"):
        return {
            "statusCode": 200,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"success": True}),
        }
    else:
        return {
            "statusCode": 502,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": result.get("description", "Ошибка Telegram")}),
        }
