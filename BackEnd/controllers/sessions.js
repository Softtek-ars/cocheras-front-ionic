var mongoose = require("mongoose");
var md5 = require('md5');
var ldap = require('ldap');

var Session = mongoose.model("Session");

//GET - Return a Session with specified ID
exports.findById = function(req, res) {  
    Session.findById(req.params.id, function(err, session) {
        if(err){
            return res.send(500, err.message);
        }
        else{
            console.log('GET /session/' + req.params.id);
            res.status(200).jsonp(session);
        }
    });
};

//POST - Insert a new Session in the DB
exports.addSession = function(req, res) {  
    console.log('POST - Session.addSession\n\n');
    
    var username = req.body.username;
    var password = req.body.password;
    var date = Date.now();

    console.log('Username: ' + username);
    console.log('Password: ' + password);
    console.log('Date: ' + date);

    // Check session open
    Session.find({id: username}).exec(function(err, session) {
        if(err){
            console.log('HTTP Error [500]: ' + err.message);
            return res.status(500).send(err.message);
        }
        else{
            // Verify access
            //var LoginCtrl = require("./controllers/logins");
            //LoginCtrl.findById(req, res);

            // Check LDAP access

            /*            
            ## LDAP Properties
            ldap.url=ldap://192.168.0.16:389                                        OK
            ldap.base=dc=softtek,dc=com                                             OK
            ldap.fullUrl=ldap://192.168.0.16:389/dc=softtek,dc=com
            ldap.dn=MCS
            ldap.password=STKmcs2011
            ldap.user.search.base=OU=Usuarios,OU=Softtek Argentina                  OK
            ldap.user.search.filter=(sAMAccountName={0})                            OK
            */
/*
            console.log('\n\nCreating LDAP client...');

            // Client
            var client = ldap.createClient({
                url: 'ldap://192.168.0.16:389'
            });

            var opts = {
                filter: '(sAMAccountName={' + username + '})',
                scope: 'dc=softtek,dc=com'
                //attributes: ['dn', 'sn', 'cn'] -> get all attributes
            };
            
            // Binding
            console.log('\nBinding to LDAP Server...');

            client.bind('MCS', 'STKmcs2011', function (error) {
                console.log('\nSearching "' + username + '"...');

                client.search('dc=softtek,dc=com', opts, function(err, res) {
                    assert.ifError(err);

                    res.on('searchEntry', function(entry) {
                        console.log('entry: ' + JSON.stringify(entry.object));
                    });

                    res.on('searchReference', function(referral) {
                        console.log('referral: ' + referral.uris.join());
                    });

                    res.on('error', function(err) {
                        console.error('error: ' + err.message);
                    });
                    
                    res.on('end', function(result) {
                        console.log('status: ' + result.status);
                    });
                });
            });

            //Unbinding
            console.log('\nUnbinding to LDAP Server...');
            client.unbind(function(error) {
                if(error){
                    console.log(error.message);
                } 
                else{
                    console.log('client disconnected');
                }
            });
*/
            console.log('\n\nSession found: \n\n' + session);

            var sessionId = "";
            var token = "";

            if (session.length > 0)
            {
                sessionId = session[0]._id;
                token = session[0].token;
            }

            // New session
            if (!token){
                //create token
                token = md5(username + password + date);

                var newSession = new Session({
                    id:             username,
                    token:          token,
                    lastConnect:    date
                });

                console.log('\nSession to create: \n\n' + newSession);

                newSession.save(function(err, session) {
                    if(err){
                        console.log("\nSession can't save. Error: " + err.message);
                        return res.status(500).send(err.message);
                    }
                    else{
                        console.log("\nSession save successfully!");
                        return res.status(200).jsonp(session);
                    }
                });
            }
            else{
                Session.findById(sessionId, function(err, session) {
                    session.lastConnect = date;

                    console.log('\nSession to update: \n\n' + session);
                    
                    session.save(function(err) {
                        if(err){
                            console.log("\nSession can't save. Error: " + err.message);
                            return res.status(500).send(err.message);
                        }
                        else{
                            console.log("\nSession save successfully!");
                            return res.status(200).jsonp(session);
                        }
                    });
                });
            }
        }
    });
};

//PUT - Update a register already exists
exports.updateSession = function(req, res) {  
    Session.findById(req.params.id, function(err, session) {
        session.lastConnect = req.body.lastConnect;

        session.save(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }
            else{
                res.status(200).jsonp(session);
            }
        });
    });
};

//DELETE - Delete a Session with specified ID
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