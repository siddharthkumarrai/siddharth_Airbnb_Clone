const express = require("express");
const MongoStore = require('connect-mongo');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");
const { error } = require('console');

const DB_URL = `mongodb+srv://siddharthkumarrai777:QOcneLRD4y1diZcR@cluster0.yjhd9gi.mongodb.net/?retryWrites=true&w=majority`;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended :true}));
app.use(methodOverride("_method"));
app.engine(`ejs`,ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl: DB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on(error,(error)=>{
    console.log("Error IN MONGOSESSION STORE",error);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
})

main()
.then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log(error);
})
async function main(){
    await mongoose.connect(DB_URL);
};

 app.use("/listings",listingsRouter);
 app.use("/listings/:id/reviews/",reviewsRouter);
 app.use("/",usersRouter);


app.all("*",(request,response,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use((error,request,response,next)=>{
    let {statusCode = 500,message = "something went wrong"} = error;
    response.status(statusCode).render("error.ejs",{message});
});


const port = 8080;
app.listen(8080,()=>{
    console.log(`app is listining on ${port}`)
})
