const User = require('../models/user');

exports.user_signin_post = (req, res) => {
    passport.authenticate("local", {
        successfulRedirect: "/posts",
        failureRedirect: "/"
    })
};

exports.user_signout_post = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
};