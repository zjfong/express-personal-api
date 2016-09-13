// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');



var profile =
  {
    name: "Zachary Fong",
    githubLink: "https://github.com/zjfong",
    githubProfileImage: "http://puu.sh/qGUIw/67a88e9996.jpg",
    personalSiteLink: "https://zjfong.github.io",
    currentCity: "San Francisco",
    pets: {
      name: "Ray",
      type: "Fish",
      breed: "Gold"
    }
  };


/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/zjfong/express-personal-api", // CHANGE ME
    baseUrl: "https://warm-atoll-72220.herokuapp.com/", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "GET", path: "/api/music", description: "View music library"}, // CHANGE ME
      {method: "POST", path: "/api/music", description: "Add to music library"},
      {method: "DELETE", path: "/api/music/:_id", description: "Delete from music library"},
    ]
  })
});

//profile
app.get('/api/profile', function api_profile(req, res){
  res.json(profile)
});

// api.get('/api/pets', function pets(req, res){
//   res.json({pets});
// });

//get all
app.get('/api/music/', function musicIndex(req, res){
  db.Music.find( function index(err, music){
    if(err){
      console.log("index error: " + err);
    }
    res.json(music);
  });
});

//find one
app.get('/api/music/:id', function musicShow(req, res){
  var id = req.params.id;
  db.Music.findOne({_id: id}, function show(err, music){
    if(err){
      console.log("show error: " + err);
    }
    res.json(music);
  })
});

//create
app.post('/api/music', function musicCreate(req, res){
  var newMusic = new db.Music ({
    title: req.body.title,
    artist: req.body.artist
  });
  newMusic.save();
  res.json(newMusic)
});

//update
app.put('/api/music/:id', function(req,res){
  var musicId = req.params.id;
  console.log('body ', req.body);
  db.Music.findOne({_id: musicId}, function(err, music){
    if(err){
      return console.log("update error: " + err);
    };
    music.title = req.body.title;
    music.artist = req.body.artist;
    music.image = req.body.image;
    music.save(function (err, saveMusic){
      res.send(saveMusic);
    });
  })
});

//delete
app.delete('/api/music/:id', function musicDelete(req, res) {
  var musicId = req.params.id;

  db.Music.findOneAndRemove({_id: musicId}, function(err, music){
    if(err){
      return console.log("delete error: " + err);
    }
    //console.log(music)
    res.send(music);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
