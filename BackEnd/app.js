var express = require('express');                 // framework

var bodyParser = require('body-parser');          // parse json
var mongoose = require('mongoose');               // use mongodb
var methodOverride = require("method-override");  // deploy and custom http verb
var morgan = require("morgan");                   // log every request to the console
var cors = require('cors');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());

// Dependence of Controllers
require('./models/Login');
require('./models/Session');
require('./models/garage');

// Controllers
var LoginCtrl = require("./controllers/logins");
var SessionsCtrl = require("./controllers/sessions");
var GaragesCtrl = require('./controllers/garages');

// Router
var router = express.Router();

// Route of login (GET/PUT)
router.route("/login")
      .get(LoginCtrl.findById)
      .put(LoginCtrl.updateLogin);

// Route of session (GET/POST/PUT/DELETE)
router.route("/session")
      .get(SessionsCtrl.findById)
      .post(SessionsCtrl.addSession)
      .put(SessionsCtrl.updateSession)
      .delete(SessionsCtrl.deleteSession);

router.route('/garages')
	  .get(GaragesCtrl.findAll)
	  .post(GaragesCtrl.add);

router.route('/garages/:id') 
	  .get(GaragesCtrl.findById)
	  .put(GaragesCtrl.update)
	  .delete(GaragesCtrl.delete);
	  
// Use api
app.use("/api", router);

// Connect to local mongodb
mongoose.connect('mongodb://localhost/Cocheras', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }

  app.listen(8080, function() {
    console.log("Node server running on http://localhost:8080");
  });
});