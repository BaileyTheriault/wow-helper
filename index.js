require('dotenv').config();
const Discord = require('discord.js');
const tai = require('./professions/tailoring.js');

const bot = new Discord.Client();

bot.on('ready', () => {
  console.log('Bot is online!');
});

bot.on('message', msg => {
  switch (msg.content.slice(0, 4)) {
    case '!tai':
      isNaN(parseInt(msg.content[5])) ? tai.taiItemQuery(msg) : tai.taiRangeQuery(msg)
  }
});

bot.login(process.env.BOT_TOKEN); 