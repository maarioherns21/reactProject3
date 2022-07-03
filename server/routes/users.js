import express from "express";
const router = express.Router();

import { signin, signup } from "../controllers/users.js";


/// this is a post route because you have to send the  login dataForm to the backend , you have to send all the details to server // this signs in the User
router.post("/signin", signin);

//this is a post because is posting  a user from the dataForm and it sents it to the backend 
router.post("/signup", signup);



export default router;