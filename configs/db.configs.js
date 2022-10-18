require("dotenv").config();
const mongoose = require("mongoose");

const { DB_URI } = process.env;

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URI);
    } catch (err) {
        console.log(err.message);
    }
};

dbConnect();

let testDB = mongoose.connection;
testDB;

testDB.on("connected", () => {
    console.log(
        `SUCCESSFULLY established connection with database : ${testDB._connectionString}`
    );
});

testDB.on("error", (err) => {
    console.log(err);
});

testDB.on("disconnected", () => {
    console.log("Connection terminated with database SUCCESSFULLY!");
});

process.on("SIGINT", async () => {
    await testDB.close();
    process.exit(0);
});

module.exports = testDB;
