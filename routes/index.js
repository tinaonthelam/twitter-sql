'use strict';
var express = require('express');
var router = express.Router();
var client = require('../db');

// a reusable function
function respondWithAllTweets (req, res, next){
  client.query('SELECT * FROM tweets', function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweets = result.rows;
    console.log(tweets);

    res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
  });
}

// here we basically treet the root view and tweets view as identical
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// single-user page
router.get('/users/:username', function(req, res, next){
  var userID = 0;

  client.query('SELECT id FROM users WHERE name = $1 ', [req.params.username], function(err, result){
    if(err) return next(err);

    userID = result.rows[0].id;

    client.query('SELECT * FROM tweets WHERE tweets.user_id = $1', [userID], function(err, result){
      if(err) return next(err);
      var tweets = result.rows;

      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true })
     });
   });
});

// single-tweet page
router.get('/tweets/:id', function(req, res, next){
  var tweetID = 0;

  client.query('SELECT id FROM tweets WHERE id = $1 ', [req.params.id], function(err, result){
    if(err) return next(err);
    tweetID = result.rows[0].id;

    client.query('SELECT * FROM tweets WHERE tweets.id = $1', [tweetID], function(err, result){
      if(err) return next(err);
      var tweets = result.rows;

      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true })
     });
   });
});

// create a new tweet
router.post('/tweets', function(req, res, next){
  var userID = 0;

  client.query('SELECT id FROM users WHERE name = $1 ', [req.body.name], function(err, result){
    if(err) return next(err);

    userID = result.rows[0].id;

    client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)', [ userID, req.body.text], function(err, result){
      if(err) return next(err);
      res.redirect('/');
     });
   });
})

// // replaced this hard-coded route with general static routing in app.js
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
// });

module.exports = router;
