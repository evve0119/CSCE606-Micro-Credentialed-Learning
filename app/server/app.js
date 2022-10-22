if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Read dotenv file
};

const express = require('express');
const app = express();
const methodOverride = require('method-override'); // Use HTTP verbs such as PUT or DELETE in places where the client doesn’t support it.
const { userRoutes, studentRoutes, instructorRoutes, courseRoutes } = require("./routes/index.js");
const ExpressError = require("./utils/ExpressError"); // A function to handle error
const cors = require("cors")

// app.use(methodOverride('_method')); // Must be placed before any HTTP verb
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse req.body!!!
app.use(cors()); // Enable to run two localhost ports

app.use("/api/user", userRoutes);  // Use User route
app.use("/api/instructors", instructorRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/students", studentRoutes);

app.all("*", (req, res, next) => {          // Handle Error (router doesn't exist) and pass to the next function
    next(new ExpressError("Page not found", 404));
})

app.use((err, req, res, next) => {          // Handle Error (id doesn't exist)
    const { message = "something went wrong", statusCode = 500 } = err;
    res.status(statusCode).send(message);
})

module.exports = app;
