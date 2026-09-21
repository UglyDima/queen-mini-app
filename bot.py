import os
import asyncio

from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo
from aiogram.utils.keyboard import InlineKeyboardBuilder


BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")

if not BOT_TOKEN:
    raise RuntimeError("BOT_TOKEN is not configured")

if not WEB_APP_URL:
    raise RuntimeError("WEB_APP_URL is not configured")


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message(CommandStart())
async def start(message: Message):
    keyboard = InlineKeyboardBuilder()

    keyboard.button(
        text="👑 Открыть Queen",
        web_app=WebAppInfo(url=WEB_APP_URL)
    )

    await message.answer(
        "👑 Добро пожаловать в Queen!",
        reply_markup=keyboard.as_markup()
    )


async def main():
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
