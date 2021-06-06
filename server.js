const Options = require("./options.js");
const express = require("express");
const connection = require ('./connection')

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/client/dist"));
app.use(express.urlencoded({ extended: false }));

 /* Import Routers */
require('./router.js')(app);

  /* MongoDb Connection */
 connection.Db_Connection((error)=>{throw error})


app.get("*", (req, res) => {
  res.sendFile(__dirname + Options.AppPath);
});

app.listen(Options.PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", Options.PORT);
});
