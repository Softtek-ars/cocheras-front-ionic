var express = require('express');                 // framework

var bodyParser = require('body-parser');          // parse json
var mongoose = require('mongoose');               // use mongodb
var methodOverride = require("method-override");  // deploy and custom http verb 

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();

router.get("/", function(req, res){
  res.send("Hello World .Nodejs");
});

app.use(router);

// Dependence of Controller tvshows
require('./models/TVShow');

// Controllers
var TVShowCtrl = require("./controllers/tvshows");
var tvshows = express.Router();

// On GET
tvshows.route("/tvshows")
  .get(TVShowCtrl.findAllTVShows);

// On POST
tvshows.route("/tvshows")
  .post(TVShowCtrl.addTVShow);

// On GET/PUT/DELETE
tvshows.route("/tvshows/:id")
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use("/api", tvshows);

// Connect to local mongodb
mongoose.connect('mongodb://localhost/tvshows', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(8080, function() {
    console.log("Node server running on http://localhost:8080");
  });

});