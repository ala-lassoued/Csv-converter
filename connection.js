const Options = require("./options.js");
const mongoose = require("mongoose");

module.exports = {

    Db_Connection : async function (callback){
        try {
          mongoose.connect(Options.uri, Options.MongoOptions);
        }catch(error){
          callback(error)
        }
      
    }
      
}