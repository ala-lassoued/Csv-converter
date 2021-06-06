module.exports = function(app){
    
const Transactions = require("./mongo.js");
  
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
        console.log("called")
      let StartDate = req.query.StartDate + "T00:00:00";
      let EndDate = req.query.EndDate + "T23:59:00";
  
      let transactions = await Transactions.find({
        createdAt: { $gte: new Date(StartDate), $lte: new Date(EndDate) },
      });
  
      res.end(JSON.stringify(transactions));
  
    } catch (error) {
      res.end(JSON.stringify(error));
    }
  })
 
}