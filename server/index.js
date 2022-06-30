import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

////routes imported
import postRoutes from "./routes/posts.js";

//this initizialize the app
const app = express();

/// this is the routes for the server
app.use("/post", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

///THIS ONE CONNECTS TO MONGODB DATABASE
const CONNECTION_URL =
  "mongodb+srv://maarioherns21:94621Mar@cluster0.h9zud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
////this allows  to connect to  the server on port 3001
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});

////this one allows to coonenct to the data base
mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
///THIS THEN WILL CONSOLE.LOG() WHERRE THE PORT IS RUNNING WHICH IS ON PORT 5000
const db = mongoose.connection;

// database connection event
db.on("connected", function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});

// ////THIS WILL MAKE SURE THERE IS NO WORNINGS
// mongoose.set('useFindAndModify', false);
