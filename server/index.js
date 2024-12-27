// imports
const express = require("express");
const dbConnect = require("./config/database");
const router = require("./routes/router.app");

require("dotenv").config();

const app = express();      //

var cors = require("cors");

const PORT = 4000;        //

app.use(    ///
  cors({
    origin: "*",
  })
);

// mount middlewares
app.use(express.json());         ///

app.use("/api/v1", router);

// connecting to database
dbConnect()
.then(()=>{
  // activate server
  app.listen(PORT , ()=>{
      console.log(`app is running at port ${PORT}`);
  })
})


// dummy home page link
app.get("/",(req,res)=>{
    res.send("<h1> Home Page</h1>");
})


module.exports = app;
