var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  return res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.post('/', function (req, res, next) {
  //Check if User Exists
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next("User Not Registered...");
    }
    if (user) {
      if (req.body.password == user.password) {
      //  req.session.userId = user._id;
        return res.redirect('/home');
      } else {
        return next("Wrong Password!");
      }
    }
  });
});

module.exports = router;