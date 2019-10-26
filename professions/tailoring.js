const db = require('../database/db');

const taiItemQuery = (msg) => {
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
}

const taiRangeQuery = (msg) => {
  const numRange = msg.content.slice(5).split('-');

  if (parseInt(numRange[0]) > parseInt(numRange[1])) {
    return msg.reply('Nice range, nerd.')
  }
  db.taiFindMany(parseInt(numRange[0]), parseInt(numRange[1]))
    .then(data => {
      return data.map(item => (
        item.toJSON()
      ))
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

module.exports = {
  taiItemQuery,
  taiRangeQuery
}