'use strict';
var express = require('express');
var router = express.Router();
var client = require('../db');

// a reusable function
function respondWithAllTweets (req, res, next){
  client.query('SELECT * FROM tweets', function (err, result) {
    if (err) return next(err); // pass errors to Express
    var tweets = result.rows;

      tweets.forEach(function(value){
     res.render('index', {tweets: value.content});
    })
  });

}

// here we basically treet the root view and tweets view as identical
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// single-user page
router.get('/users/:username', function(req, res, next){

  // client.query()




  // var tweetsForName = tweetBank.find({ name: req.params.username });
  // res.render('index', {
  //   title: 'Twitter.js',
  //   tweets: tweetsForName,
  //   showForm: true,
  //   username: req.params.username
  // });
});

// single-tweet page
router.get('/tweets/:id', function(req, res, next){
  var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
  res.render('index', {
    title: 'Twitter.js',
    tweets: tweetsWithThatId // an array of only one element ;-)
  });
});

// create a new tweet
router.post('/tweets', function(req, res, next){
  //inserting a username/tweet into db
  var userID = 0
 client.query('SELECT id FROM users WHERE name = $1 ', [req.body.name], function(err, result){
    if(err) return next(err)
    console.log(result.rows[0].id, 'ID')

     userID = result.rows[0].id

     client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2)', [ userID,  req.body.text], function(err, result){
       if(err) return next(err);
       res.redirect('/')
     } )
   });
  })





  // tweetBank.add(req.body.name, req.body.text);
  // res.redirect('/');

// // replaced this hard-coded route with general static routing in app.js
// router.get('/stylesheets/style.css', function(req, res, next){
//   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
// });

module.exports = router;
