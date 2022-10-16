if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Read dotenv file
};

const express = require('express');
const app = express();
const methodOverride = require('method-override'); // Use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
const path = require('path');
const { User, Group } = require("./models/user");
const userRoutes = require("./routes/users.js");
const ejsMate = require("ejs-mate"); // Use ejsMate to enable and create boilerplate
const session = require("express-session");
const MongoDBStore = require('connect-mongo'); // Store session in mongo
const passport = require("passport"); // Create user model
const LocalStrategy = require("passport-local"); // Module lets you authenticate using a username and password
const flash = require("connect-flash"); // Flash a message
const ExpressError = require("./utils/ExpressError"); // A function to handle error
const exp = require("constants");
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Microcredentialed-learning'
const secret = process.env.SECRET || "THis is a better secret"

const sessionConfig = {      
    store: MongoDBStore.create({
        mongoUrl: dbUrl,
        touchAfter: 24 * 3600  // time period in seconds
      }),             
    // Session configuration
    secret,
    name: "session",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(methodOverride('_method')); // Must be placed before any HTTP verb
app.use(flash());
app.use(session(sessionConfig)); // Use session to remember information

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use session to remember login must be after session
passport.use(new LocalStrategy(User.authenticate())); // Use authenticate function in passport-local
passport.serializeUser(User.serializeUser()); // How to store user in a session
passport.deserializeUser(User.deserializeUser()); // How to get user in a session



app.use(express.static((__dirname, "public"))); //  serve static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate); // Use ejsMate to enable and create boilerplate
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse req.body!!!

app.use((req, res, next) => {                   // Set local variables
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();                                 // Rememeber to use next, otherwise it will stop in here
})

app.use("/", userRoutes);  // Use User route

app.get('/', (req, res) => {
    res.render("home.ejs");
});

app.all("*", (req, res, next) => {          // Handle Error (router doesn't exist) and pass to the next function
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {          // Handle Error (id doesn't exist)
    const { message = "something went wrong", statusCode = 500 } = err;
    res.status(statusCode).send(message);
})

module.exports = app;