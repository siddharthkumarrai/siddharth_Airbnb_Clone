const User = require("../models/user.js");
const passport = require("passport");

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

module.exports.postlogin = async (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        console.log("ERR:", err);
        console.log("USER:", user);
        console.log("INFO:", info);
        
        if (err) return next(err);

        if (!user) {
            if (info && info.name === "IncorrectUsernameError") {
                req.flash("error", "No account found with that username. Please sign up!");
                return res.redirect("/signup");
            }
            req.flash("error", "Incorrect password. Please try again.");
            return res.redirect("/login");
        }

        req.login(user, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome back to Wanderlust!");
            let redirectUrl = req.session.redirectUrl || "/listings";
            delete req.session.redirectUrl;
            return res.redirect(redirectUrl);
        });
    })(req, res, next);
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
