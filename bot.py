import os
import asyncio
from threading import Thread

from fastapi import FastAPI
import uvicorn

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder


BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")
PORT = int(os.getenv("PORT", "10000"))

CHANNEL_URL = "https://t.me/queensocialgame"


if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN is not configured")

if not WEB_APP_URL:
    raise RuntimeError("WEB_APP_URL is not configured")


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()
app = FastAPI()


@app.get("/")
async def home():
    return {"status": "Queen backend is running"}


def queen_keyboard():
    builder = InlineKeyboardBuilder()

    builder.button(
        text="👑 Открыть Queen",
        web_app=WebAppInfo(url=WEB_APP_URL),
    )

    builder.button(
        text="📲 Канал Queen",
        url=CHANNEL_URL,
    )

    builder.adjust(1)

    return builder.as_markup()


@dp.message(CommandStart())
async def start(message: Message):
    await message.answer(
        "👑 Добро пожаловать в Queen!",
        reply_markup=queen_keyboard(),
    )


def run_server():
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=PORT,
    )


async def main():
    Thread(
        target=run_server,
        daemon=True,
    ).start()

    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
