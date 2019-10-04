require('dotenv').config();
const Discord = require('discord.js');

const bot = new Discord.Client();
const db = require('./database/db');

bot.on('ready', () => {
  console.log('Bot is online!');
});

bot.on('message', msg => {
  if (msg.content.startsWith('!tai ')) {
    if (isNaN(parseInt(msg.content[5]))) {
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
            thumbnail: {
              url: item.thumbnail
            },
            title: item.itemName,
            url: item.itemLink,
            fields: materials.fields,
            timestamp: new Date(),
          };

          console.log(`Serving request from ${msg.author}`)
          msg.reply({ embed: itemEmbed })
        })
    } else {
      const numRange = msg.content.slice(5).split('-');

      if (parseInt(numRange[0]) > parseInt(numRange[1])) {
        return msg.reply('Nice range, nerd.')
      }
      db.taiFindMany(parseInt(numRange[0]), parseInt(numRange[1]))
        .then(data => {
          return data.map(item => {
            return item.toJSON();
          })
        })
        .then(results => {
          const itemNames = {
            fields: []
          };
          
          results.map(item => {
            itemNames.fields.push({
              name: `${item.itemName} — ${item.levelRequired}`,
              value: item.itemLink,
            });
          });
          
          const itemsEmbed = {
            color: 0x0099ff,
            fields: itemNames.fields,
            timestamp: new Date(),
          };

          msg.reply({ embed: itemsEmbed })
        })
    }
  }
});

bot.login(process.env.BOT_TOKEN); 