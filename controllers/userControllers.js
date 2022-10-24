const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const express = require('express');

exports.user_signin_post = (req, res) => {

  passport.authenticate('local', {session: false}, (err, user, info) => {
    if(err || !user) {
      return res.status(400).json({
        messsage: 'Something is not right',
        user: user
      });
    }

    req.login(user, {session: false}, (err) => {
      if(err) {
        res.send(err);
      }
    
      const token = jwt.sign(user, 'your_jwt_secret');
      return res.json({user, token});
    });
  })(req,res);
};

exports.user_signout_post = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
};