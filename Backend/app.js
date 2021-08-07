const express = require('express')
const cors = require ('cors');
const mongoose = require('mongoose');
const path = require("path");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cors());
app.use("/files",
express.static(path.join("backend/files")));

mongoose.connect(
  "mongodb+srv://dbUser2:HbGBRBWwr2cnZQOc@cluster0.cfbzw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  ).then(()=>{
    console.log("Estamos conectados a nuestra DB")
  }).catch(()=>{
    console.log("Tenemos un problema")
  });


app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
