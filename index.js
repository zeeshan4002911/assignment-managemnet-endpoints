const connection = require("./connection/db.js");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection();

app.use("/v1/myClass", require("./routes/myClass.js"))

app.listen(PORT, () => console.log("Server is running on port", PORT));