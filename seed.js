// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_music = [
  {title: "Shiver", artist: "Coldplay"},
  {title: "Don't Panic", artist: "Coldplay"}
]

db.Music.remove({}, function(err){
  console.log("removing db")
})

db.Music.create(new_music, function(err, music){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new music", new_music)
  process.exit(); // we're all done! Exit the program.
})
