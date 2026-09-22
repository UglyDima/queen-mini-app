
import os
import asyncio
from threading import Thread

from fastapi import FastAPI
import uvicorn

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart
from aiogram.types import (
    Message,
    CallbackQuery,
    WebAppInfo,
    InlineKeyboardButton,
)
from aiogram.utils.keyboard import InlineKeyboardBuilder
from aiogram.enums import ChatMemberStatus


BOT_TOKEN = os.getenv("BOT_TOKEN")
WEB_APP_URL = os.getenv("WEB_APP_URL")
PORT = int(os.getenv("PORT", "10000"))

CHANNEL_USERNAME = "@queensocialgame"
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


async def is_subscribed(user_id: int) -> bool:
    try:
        member = await bot.get_chat_member(
            chat_id=CHANNEL_USERNAME,
            user_id=user_id,
        )

        return member.status in {
            ChatMemberStatus.CREATOR,
            ChatMemberStatus.ADMINISTRATOR,
            ChatMemberStatus.MEMBER,
        }

    except Exception as error:
        print(f"Subscription check error: {error}")
        return False


def subscription_keyboard():
    builder = InlineKeyboardBuilder()

    builder.row(
        InlineKeyboardButton(
            text="📲 Подписаться на канал",
            url=CHANNEL_URL,
        )
    )

    builder.row(
        InlineKeyboardButton(
            text="✅ Проверить подписку",
            callback_data="check_subscription",
        )
    )

    return builder.as_markup()


def queen_keyboard():
    builder = InlineKeyboardBuilder()

    builder.button(
        text="👑 Открыть Queen",
        web_app=WebAppInfo(url=WEB_APP_URL),
    )

    return builder.as_markup()


async def send_start(message: Message):
    if not await is_subscribed(message.from_user.id):
        await message.answer(
            "👑 Добро пожаловать в Queen!\n\n"
            "Подпишись на наш канал, чтобы продолжить.",
            reply_markup=subscription_keyboard(),
        )
        return

    await message.answer(
        "👑 Добро пожаловать в Queen!",
        reply_markup=queen_keyboard(),
    )


@dp.message(CommandStart())
async def start(message: Message):
    await send_start(message)


@dp.callback_query(F.data == "check_subscription")
async def check_subscription(callback: CallbackQuery):
    if await is_subscribed(callback.from_user.id):
        await callback.message.edit_text(
            "✅ Подписка подтверждена!\n\n"
            "Теперь можешь открыть Queen.",
            reply_markup=queen_keyboard(),
        )

        await callback.answer("Подписка подтверждена!")

    else:
        await callback.answer(
            "Сначала подпишись на канал.",
            show_alert=True,
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
