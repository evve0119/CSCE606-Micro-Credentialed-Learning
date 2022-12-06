if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Read dotenv file
};

const app = require("./app")
const mongoose = require('mongoose');
//const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Microcredentialed-learning'
const dbUrl = 'mongodb://localhost:27017/Microcredentialed-learning'
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;                 // Mongoose connect and handle error

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});



const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Serving on port ${port}`)
});

