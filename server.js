const Options = require("./options.js");
const express = require("express");
const mongoose = require("mongoose");
const Transactions = require("./mongo.js");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/client/dist"));
app.use(express.urlencoded({ extended: false }));

try {
  mongoose.connect(Options.uri, Options.MongoOptions);
} catch (error) {
  console.log(error);
}


 /* description:Fetch transactins by date;
   EndPoint: /Transactions;
   Method: get;
   URL Params:
   -StartDate: string;
   -EndDate: string;
   Success Response:Transactions Array;
   Error Response:Error Msg;
  */

app.get("/Transactions", async (req, res) => {
  try {
    let StartDate = req.query.StartDate + "T00:00:00";
    let EndDate = req.query.EndDate + "T23:59:00";

    let transactions = await Transactions.find({
      createdAt: { $gte: new Date(StartDate), $lte: new Date(EndDate) },
    });

    res.end(JSON.stringify(transactions));

  } catch (error) {
    res.end(JSON.stringify(error));
  }
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + Options.AppPath);
});

app.listen(Options.PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", Options.PORT);
});
