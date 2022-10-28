if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Read dotenv file
};
const express = require('express');
const app = express();
const methodOverride = require('method-override'); // Use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
const { userRoutes, studentRoutes, instructorRoutes, courseRoutes } = require("./routes/index.js");
const ExpressError = require("./utils/ExpressError"); // A function to handle error
const cors = require("cors")
const path = require('path');


/// Kill the React host and transfer react to static page
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use(methodOverride('_method')); // Must be placed before any HTTP verb

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse req.body!!!

/// For production mode not required two hosts, cors not required
if (process.env.NODE_ENV !== "production") {
    app.use(cors()); // Enable to run two localhost ports
};

app.use("/api/user", userRoutes);  // Use User route
app.use("/api/instructors", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);
// Handle React routing, return all requests to React app



if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}


app.use((err, req, res, next) => {          // Handle Error (id doesn't exist)
    const { message = "something went wrong", statusCode = 500 } = err;
    res.status(statusCode).send(message);
})

app.all("*", (req, res, next) => {          // Handle Error (router doesn't exist) and pass to the next function
    next(new ExpressError("Page not found", 404));
});

module.exports = app;
