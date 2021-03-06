const db = require('../database/db');

const taiItemQuery = (msg) => {
  db.taiFindOne(msg.content.slice(5)).then(doc => {
    return doc.toJSON();
  })
    .then(item => {

      const materials = {
        fields: []
      };

      const itemMat = item.materials.split('x ')
      let correctData = [itemMat[0]];

      for (let i = 1; i < itemMat.length - 1; i++) {
        let reformatSplit = itemMat[i].split(' ');
        correctData.push(reformatSplit.slice(0, reformatSplit.length - 1).join(' '), reformatSplit[reformatSplit.length - 1]);
      }

      correctData.push(itemMat[itemMat.length - 1]);

      for (let i = 0; i < correctData.length; i = i + 2) {
        materials.fields.push(
          {
            name: correctData[i + 1],
            value: correctData[i],
            inline: false
          }
        );
      }

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