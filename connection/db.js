const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/management';

async function connection() {
    await mongoose.connect(URL)
        .then(() => console.log("Succesfully Connected to database"))
        .catch((err) => console.log("failed to connect to database", err))
}

module.exports = connection;