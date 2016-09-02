// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_music = {Title: "Shiver", Artist: "Coldplay"};

db.Music.create(new_music, function(err, music){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new music", music._id)
  process.exit(); // we're all done! Exit the program.
})
