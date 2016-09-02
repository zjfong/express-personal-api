var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var MusicSchema = new Schema({
  Title: String,
  Artist: String
});

var Music = mongoose.model('Music', MusicSchema);

module.exports = Music;
