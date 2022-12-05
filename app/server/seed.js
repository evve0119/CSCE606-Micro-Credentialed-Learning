if (process.env.NODE_ENV !== "production") {
    require("dotenv").config(); // Read dotenv file
};
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Microcredentialed-learning'
const mongoose = require("mongoose");
const User = require("./models").User;

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;                 // Mongoose connect and handle error

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    const testStudent = new User({
        profile: {
            firstName: "Student",
            lastName: "A"
        },
        email: "testStudent@gmail.com",
        username: "testStudent",
        password: "testStudent",
        role: "student",
        verified: true,
    });
    await testStudent.save();
    const testInstructor = new User({
        profile: {
            firstName: "Instructor",
            lastName: "A"
        },
        email: "testInstructor@gmail.com",
        username: "testInstructor",
        password: "testInstructor",
        role: "instructor",
        verified: true,
    });
    await testInstructor.save();
    const testRecruiter = new User({
        profile: {
            firstName: "Recruiter",
            lastName: "A"
        },
        email: "testRecruiter@gmail.com",
        username: "testRecruiter",
        password: "testRecruiter",
        role: "recruiter",
        verified: true,
    });
    await testRecruiter.save();
};

seedDB()
.then(() => {
    mongoose.connection.close()
    console.log("Successfully insert")
}).catch((err)=>{
    console.log(err)
})