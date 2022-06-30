const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();

const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Mongodb connected");
  } catch (err) {
    console.log(err.message);

    //Exit process with Failure
    process.exit(1);
  }
};

// for err handling even after initial connection

const db2 = mongoose.connection;

db2.on("error", console.error.bind(console, "Error connecting to mongodb"));

db2.once("open", function () {
  console.log("connected to Database :: MongoDB");
});

module.exports = connectDB;