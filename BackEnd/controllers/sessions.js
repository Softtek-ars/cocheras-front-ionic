var mongoose = require("mongoose");
var md5 = require('md5');

var Session = mongoose.model("Session");

//GET - Return a Session with specified ID
exports.findById = function(req, res) {  
    TVShow.findById(req.params.id, function(err, session) {
        if(err){
            return res.send(500, err.message);
        }
        else{
            console.log('GET /session/' + req.params.id);
            res.status(200).jsonp(session);
        }
    });
};

//POST - Insert a new TVShow in the DB
exports.addSession = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    // Verify access
    //var LoginCtrl = require("./controllers/logins");
    //LoginCtrl.findById(req, res);

    // Check LDAP access
    //TODO: 

    var session = new Session({
        id:             req.body.username,
        token:          md5(req.body.username + req.body.password + Date.now()),
        lastConnect:    Date.now()
    });

    session.save(function(err, session) {
        if(err){
            return res.status(500).send( err.message);
        }
        else{
            res.status(200).jsonp(session);
        }
    });
};

//PUT - Update a register already exists
exports.updateSession = function(req, res) {  
    Session.findById(req.params.id, function(err, session) {
        session.lastConnect = req.body.lastConnect;

        tvshow.save(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }
            else{
                res.status(200).jsonp(session);
            }
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteSession = function(req, res) {  
    Session.findById(req.params.id, function(err, session) {
        session.remove(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }
            else{
                res.status(200).send();
            }
        })
    });
};