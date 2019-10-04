require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const db = require('./database/db');

bot.on('ready', () => {
  console.log('Bot is online!');
});

bot.on('message', msg => {
  if (msg.content.startsWith('!tai ')) {
    db.taiFindOne(msg.content.slice(5)).then(doc => {
      return doc.toJSON();
    })
      .then(item => {

        const materials = {
          fields: []
        };

        item.materials.map(mat => {
          materials.fields.push(
            {
              name: mat[0],
              value: mat[1],
              inline: true
            }
          ) 
        });

        const itemEmbed = {
          color: 0x0099ff,
          title: item.itemName,
          url: item.itemLink,
          fields: materials.fields,
          timestamp: new Date(),
        };
       
        console.log(`Serving request ${msg.content}`)
        msg.reply({ embed: itemEmbed })
      })
  }
});

bot.login(process.env.BOT_TOKEN); 