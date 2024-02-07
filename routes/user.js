const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewares.js");
const userController = require("../controller/user.js");

router
.route("/signup")
.get(userController.signupform)
.post(wrapAsync(userController.postsignup));

router
.route("/login")
.get(userController.loginform)
.post(saveRedirectUrl,
passport.authenticate("local",{ failureRedirect : "/login" , failureFlash: true}),
userController.postlogin
);

router.get("/logout",userController.logout);

module.exports = router;