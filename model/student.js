const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: String,
    classId: Number
})

module.exports = mongoose.model("student", studentSchema);