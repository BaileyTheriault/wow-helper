const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/pusheen_assistant', { useNewUrlParser: true, useUnifiedTopology: true });

const Tailoring = mongoose.model('Tailoring', new mongoose.Schema(), 'tailoring');

async function taiFindOne(item) {
  return Tailoring.findOne({ itemName: item }, (err, doc) => {
    return doc;
  })
};

module.exports = {
  taiFindOne,
}