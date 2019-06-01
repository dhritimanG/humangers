module.exports = function (app) {
  var bcrypt = require("bcrypt-nodejs");

  var userModel = require('../model/user/user.model.server');

  var passport  = require('passport');
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  app.get('/api/user', findUsers);
  app.get('/api/user/:userId', findUser);
  app.post('/api/user', createUser);
  app.delete('/api/user/:userId', deleteUser);
  app.put('/api/user/:userId', updateUser);

  app.post('/api/logout', logout);
  app.post('/api/loggedIn', loggedIn);
  app.post('/api/register', register);
  app.post('/api/login',
    passport.authenticate('local'), login);


  function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    userModel
      .createUser(user)
      .then(function(user){
        req.login(user, function(err) {
          res.json(user);
        });
      });
  }

  function login(req, res){
    return res.json(req.user);
  }

  function logout(req, res) {
    req.logout();
    res.send(200);
  }

  function loggedIn(req, res) {
    // console.log('hello from server logged in')
    if(req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.send('0');
    }
  }

  function createUser(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
    console.log(user);
    userModel.createUser(user)
      .then(function (user) {
        console.log(user);
        if(user){
          req.login(user, function(err) {
            if(err) {
              res.status(400).send(err);
            } else {
              res.json(user);
            }
          });
        }

        // req.login(user, function(err) {
        //   res.json(user);
        // });

      })
  }


  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  var LocalStrategy = require('passport-local').Strategy;
  passport.use(new LocalStrategy(localStrategy));

  var FacebookStrategy = require('passport-facebook').Strategy;

  if(process.env.clientID) {
    var facebookConfig = {
      clientID     : process.env.clientID,
      clientSecret : process.env.clientSecret,
      callbackURL  : process.env.callbackURL
    };
  }
  else{
    var facebookConfig = {
      clientID     :  '743022872548372',
      clientSecret : '6de338143163fa44ce7ae4db3fc6183d',
      callbackURL  : 'http://localhost:3100/auth/facebook/callback'
    };
  }

  passport.use(
    new FacebookStrategy(facebookConfig, facebookStrategy));

  app.get ('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' }));
  app.get ('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: 'http://localhost:4200/user',
      failureRedirect: 'http://localhost:4200/landing'
    }));

  function facebookStrategy(token, refreshToken, profile, done) {
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {
          if(user) {
            return done(null, user);
          } else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value:"",
              facebook: {
                id:    profile.id,
                token: token
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

  // function localStrategy(usrn, pass, done) {
  //   userModel
  //     .findUserByCredentials(usrn, pass)
  //     .then(
  //       function(user) {
  //         if(user.username === usrn
  //         && bcrypt.compareSync(pass, user.password)) {
  //           // user.username === usrn
  //         // && bcrypt.compareSync(pass, user.password)) {
  //           //user.username === usrn
  //         // && bcrypt.compareSync(pass, user.password)
  //           return done(null, user);
  //         } else {
  //           return done(null, false);
  //         }
  //       }
  //     );
  // }

  function localStrategy(username,password,done) {
    userModel
      .findUserByUsername(username)
      .then(
        function (user) {
          if (user.username === username
            && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );

  }

  function findUsers(req, res) {
    var username = req.query['username'];
    var password = req.query['password'];
    if (username && password) {
      userModel.findUserByCredentials(username, password)
        .then(function (user) {
          if (user) {
            res.json(user);
          } else {
            res.status(400).send({message: "User not found"});
          }
          res.json(user);
        })
    } else if (username) {
      userModel.findUserByUsername(username)
        .then(function (user) {
          res.json(user);
        })
    } else {
      userModel.findAllUsers()
        .then(
          function(users) {
            res.json(users);
          },
          function(err) {
            res.status(400).send(err);
          }
        );
    }
  }

  function deleteUser(req, res) {
    var userId = req.params['userId'];
    userModel.deleteUser(userId)
      .then(function (user) {
        res.json(user);
      });
  }

  function updateUser(req, res) {
    var userId = req.params['userId'];
    var user = req.body;
    userModel.updateUser(userId, user)
      .then(function (user) {
        return userModel.findUserById(userId);
      })
      .then(function (user){
        res.json(user);
        return;
      },function (err) {
        res.sendStatus(404).send(err);
        return;
      });
  }


  function findUser(req, res) {
    var userId = req.params['userId'];
    userModel.findUserById(userId)
      .then(function (user) {
        res.json(user);
      })
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

}
