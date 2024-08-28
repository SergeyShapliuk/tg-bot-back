require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const start_bot = () => {
    bot.setMyCommands([
        {command: 'start', description: 'Запуск бота'},
    ]).then(res => console.log('res', res))

    bot.on('message', async msg => {
        const text = msg.text
        const chat_id = msg.chat.id

        if (text === '/start') {
            await bot.sendSticker(chat_id, `https://data.chpic.su/stickers/h/HelloDigitalWorld/HelloDigitalWorld_001.webp?v=1709113684`)
            await bot.sendMessage(chat_id, `Добро пожаловать ${msg.from.first_name}`, {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'Мое портфолио',
                            web_app: {url: 'https://sergeyshapliuk.github.io/portfolio/'}
                        }, {text: 'Мини игра',web_app:{url: 'https://play.famobi.com/bubble-tower-3d'}}]
                    ], resize_keyboard: true
                }
            })
        }
        if (text === '/portfolio') {
            await bot.sendMessage(chat_id, `https://sergeyshapliuk.github.io/portfolio/`)
        }
        console.log(msg)
    })
}

start_bot()

app.listen(port, () => {
    console.log(`Server is online on port: ${port}`)
})
