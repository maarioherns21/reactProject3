import jwt from "jsonwebtoken";
/// AUth  middleware  confirms or denies the request //if everything goes well with the auth function than allows you the user to like  controller 
/// like button  =>  auth middleware =>  like controller//
const secret = 'test';

/////request , respond and move to the nextthing  
const auth =  async (req,res, next) => {
  try {
    // console.log(req.headers)//this has to return the authorizaxion token 
     
    //this is to get the token from the frontend 
     ///  we split it , the token is in the first positioning of the array
     //this is lowerCase
     const token = req.headers.authorization.split(" ")[1];
     console.log(token)
    ///this is how we fing if is greater 500  is googleAuth,  if is under 500 it means is oyr custom Auth
    const isCustomAuth = token.length < 500;
    // this is the data we want to get from the token itself
    let decodedData;
    ///if we have the token and the token is our own or google 
    if (token && isCustomAuth) {
        ///this gives us the data from each specific token  {username and id } // we pass the secret on the varible 
        decodedData = jwt.verify(token, secret)
  //this is where we going to store the data from the token 
        req.userId = decodedData?.id;
    }
    else { 
        ///this is if we are logging in with googleAuth
        decodedData = jwt.decode(token)

        //this is where we going to store the data from the token  //sub is google name for specific id.
        req.userId = decodedData?.sub;
    }
    //this pass the action to the second thing 
    next();
    }
       catch (error) {
    console.log(error)
  }
}

export default auth;