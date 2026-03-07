if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const usersRouter = require("./routes/user.js");


const DB_URL = process.env.MONGO_ATLAS_URL;

// Database Connection
main()
    .then(() => {
        console.log("Connection successful to MongoDB Atlas");
    })
    .catch((err) => {
        console.log("DB Connection Error:", err);
    });

async function main() {
    await mongoose.connect(DB_URL);
}

// App Settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Mongo Session Store Configuration
const store = MongoStore.create({
    mongoUrl: DB_URL,
    secret: process.env.SECRET,
    touchAfter: 24 * 3600, // session update interval
    autoRemove: 'native',
});

// Fix: store.on error handling
store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

// Middlewares
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if (req.path.startsWith('/css') || req.path.startsWith('/js') || req.path === '/favicon.ico') {
        return next(); // skip flash for static files
    }
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    console.log(`${req.method} ${req.path} - Flash:`, res.locals.success); // ← change this
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.get("/flashtest", (req, res) => {
    req.flash("success", "TEST MESSAGE");
    res.redirect("/listings");
});

// Routes
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews/", reviewsRouter);
app.use("/", usersRouter);

// 404 Route
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // Check headers to prevent "Cannot set headers after they are sent"
    if (!res.headersSent) {
        res.status(statusCode).render("error.ejs", { message });
    }
});

const port = 8080;
app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
});