var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MusicSchema = new Schema({
  title: String,
  artist: String
});

var Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
