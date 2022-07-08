import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
////routes imported
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
//this initizialize the app
const app = express();
dotenv.config();



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//this cors alwats has to be on top of the ROutes
app.use(cors());

/// this is the routes for the server
app.use("/post", postRoutes);
///we addign the routes for the users 
app.use('/user', userRoutes);

///THIS ONE CONNECTS TO MONGODB DATABASE
const CONNECTION_URL =  process.env.CONNECTION_URL
////this allows  to connect to  the server on port 3001
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app listening on port ${port}`);
});

////this one allows to coonenct to the data base
mongoose.connect('mongodb+srv://maarioherns21:94621Mar@cluster0.h9zud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
// mongoose.connect('mongodb+srv://maarioherns21:94621Mar@cluster0.h9zud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;

// db.on("connected", function () {
//   console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
// });
