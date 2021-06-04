const Options= {}

Options.PORT = 3000

Options.MongoOptions={ useNewUrlParser: true,useUnifiedTopology:true }

Options.uri = "mongodb+srv://alaa:0@cluster0.hxpmb.mongodb.net/kconnect?retryWrites=true&w=majority"

Options.AppPath="/client/dist/index.html"

module.exports=Options