import os
import json
import urllib.request
import urllib.parse

MAIN_CHAT_ID = "89186860650"


def send_message(bot_token: str, chat_id: str, text: str) -> dict:
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }).encode()
    req = urllib.request.Request(url, data=data, method="POST")
    with urllib.request.urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())


def handler(event: dict, context) -> dict:
    """Отправка заявок и заказов из лавки в Telegram. Заказы из лавки идут в группу 'Заказы'."""

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
    order_items = body.get("items", "")

    is_shop_order = source == "Лавка" or bool(order_items)

    if is_shop_order:
        lines = [
            "🛒 *Новый заказ из Лавки*",
            "",
            f"👤 *Имя:* {name}",
            f"📞 *Телефон/Telegram:* {phone}",
        ]
        if order_items:
            lines.append(f"📦 *Товар:* {order_items}")
        elif program and program != "—":
            lines.append(f"📦 *Товар:* {program}")
        if comment:
            lines.append(f"💬 *Пожелания:* {comment}")
        lines += ["", f"📍 *Источник:* {source}"]

        text = "\n".join(lines)

        orders_chat_id = os.environ.get("TELEGRAM_ORDERS_CHAT_ID", "")
        target_chat = orders_chat_id if orders_chat_id else MAIN_CHAT_ID

        result = send_message(bot_token, target_chat, text)
        if orders_chat_id and result.get("ok"):
            send_message(bot_token, MAIN_CHAT_ID, text)
    else:
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
        result = send_message(bot_token, MAIN_CHAT_ID, text)

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
