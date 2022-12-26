const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
    class: { type: String , unique: true, required: true},
    studentCount: Number
}, {collection: "classes"})

module.exports = mongoose.model("class", classSchema);