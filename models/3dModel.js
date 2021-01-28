const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  name: String,
  modelUrl: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = new mongoose.model('Model', modelSchema);
