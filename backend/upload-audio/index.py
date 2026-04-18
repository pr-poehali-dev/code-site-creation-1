import os
import urllib.request
import hashlib
import hmac
import datetime
import json


def _sign(key, msg):
    return hmac.new(key, msg.encode("utf-8"), hashlib.sha256).digest()


def _upload_s3(data: bytes, key: str, content_type: str) -> str:
    access_key = os.environ["AWS_ACCESS_KEY_ID"]
    secret_key = os.environ["AWS_SECRET_ACCESS_KEY"]
    endpoint_host = "bucket.poehali.dev"
    region = "us-east-1"
    service = "s3"
    bucket = "files"

    now = datetime.datetime.utcnow()
    amz_date = now.strftime("%Y%m%dT%H%M%SZ")
    date_stamp = now.strftime("%Y%m%d")
    canonical_uri = f"/{bucket}/{key}"
    payload_hash = hashlib.sha256(data).hexdigest()

    canonical_headers = (
        f"content-type:{content_type}\n"
        f"host:{endpoint_host}\n"
        f"x-amz-content-sha256:{payload_hash}\n"
        f"x-amz-date:{amz_date}\n"
    )
    signed_headers = "content-type;host;x-amz-content-sha256;x-amz-date"
    canonical_request = "\n".join([
        "PUT", canonical_uri, "",
        canonical_headers, signed_headers, payload_hash,
    ])

    credential_scope = f"{date_stamp}/{region}/{service}/aws4_request"
    string_to_sign = "\n".join([
        "AWS4-HMAC-SHA256", amz_date, credential_scope,
        hashlib.sha256(canonical_request.encode()).hexdigest(),
    ])

    k_date = _sign(("AWS4" + secret_key).encode(), date_stamp)
    k_region = _sign(k_date, region)
    k_service = _sign(k_region, service)
    k_signing = _sign(k_service, "aws4_request")
    signature = hmac.new(k_signing, string_to_sign.encode(), hashlib.sha256).hexdigest()

    authorization = (
        f"AWS4-HMAC-SHA256 Credential={access_key}/{credential_scope}, "
        f"SignedHeaders={signed_headers}, Signature={signature}"
    )

    url = f"https://{endpoint_host}{canonical_uri}"
    req = urllib.request.Request(url, data=data, method="PUT")
    req.add_header("Content-Type", content_type)
    req.add_header("x-amz-content-sha256", payload_hash)
    req.add_header("x-amz-date", amz_date)
    req.add_header("Authorization", authorization)

    with urllib.request.urlopen(req, timeout=20) as resp:
        resp.read()

    return f"https://cdn.poehali.dev/projects/{access_key}/bucket/{key}"


def handler(event: dict, context) -> dict:
    """Скачивает аудио с Suno и сохраняет в S3, возвращает CDN URL."""

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {"Access-Control-Allow-Origin": "*"}, "body": ""}

    suno_url = "https://cdn1.suno.ai/wb5Ch8U1Tx5OzCKY.mp3"

    req = urllib.request.Request(
        suno_url,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Referer": "https://suno.com/",
        },
    )
    with urllib.request.urlopen(req, timeout=25) as resp:
        audio_data = resp.read()

    cdn_url = _upload_s3(audio_data, "audio/ethnic-sound.mp3", "audio/mpeg")

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
        "body": json.dumps({"url": cdn_url, "size": len(audio_data)}),
    }
