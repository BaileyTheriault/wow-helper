const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pusheen_assistant', { useNewUrlParser: true, useUnifiedTopology: true });

const Tailoring = mongoose.model('Tailoring', new mongoose.Schema(), 'tailoring');

const taiFindOne = (item) => {
  const data = new RegExp(`${item}`, 'i')
  return Tailoring.findOne({ itemName: data }, (err, doc) => {
    if (err) return console.error(err);
    console.log(doc)
    return doc;
  })
};

const taiFindMany = (startNum, endNum) => {
  return Tailoring.find({$and: [{levelRequired: {$gte: startNum}}, {levelRequired: {$lte: endNum}}]}, (err, results) => {
    if (err) return console.error(err);
    return results;
  });
}

module.exports = {
  taiFindOne,
  taiFindMany
}