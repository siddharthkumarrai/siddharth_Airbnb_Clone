const User = require("../models/user.js");

module.exports.signupform = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.postsignup = async(req,res)=>{
    try {
    let {username,email, password} =  req.body;
    const newUser = new User({username,email});
    let registeredUser = await User.register(newUser,password);
    req.login(registeredUser,(error)=>{
         if (error) {
             return  next(error);
         };
         req.flash("success","welcome to wanderlust");
         res.redirect("/listings");
    })
    } catch (error) {
         req.flash("error",error.message);
         res.redirect("/signup");
    }
};

module.exports.loginform = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.postlogin = async(req,res)=>{
    req.flash("success","Welcome back on Wandarlust");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logOut((error)=>{
         if (error) {
              return next(error);
         };
         req.flash("success","you logged out!");
         res.redirect("/listings");
    })
};
