///this hash the password to  make them secure and noone can see them on the browers
import bcrypt from "bcrypt";
///this allows to stored a users  for a certain amount of time  or been logged in 
import jwt from "jsonwebtoken";

///this is importing the model of user into the controllers
import User from "../models/user.js";

///this is a asyncrinist function becasue it has to wait for the data
/// res means respond  and req means request!!
export const signin = async (req, res) => {
    ////this is how we get our data becasue we requesting from the body "email and passowrd that it should be inthe data base"
    const { email, password } = req.body;
    //if everything is successful the try code will run 
  try {
    //this is to find only ONE USER  EXISTING USER IN THE DATA Base
    const existingUser = await User.findOne({ email});

    if(!existingUser) return  res.status(404).json({ message: "User doesn't exist."})
     ////this compares if the passswords are the same  the existing password with the password tha tis been typed
    const isPasswordCorrect =  await   bcrypt.compare( password, existingUser.password )
  ///this checks if the password is not correct
    if(!isPasswordCorrect) return  res.status(404).json({ message: "Invalid Credentials."})
    
 //this keeps the User loggin for  what ever  time is inputed with expiresIn  this is our token //////the secret word is whats going to be pass to the middleware which is test
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test' , {expiresIn: "1h"})

    //// the 200 means everyhting when well and we sending the existin user and the token that we created with 1hr expiration
    res.status(200).json({ result : existingUser, token });
  } catch (error) {
    //if we get an erros is undifyin server error
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const signup = async (req, res) => {
    //this is distructuring// from requesting the body from the fron end
    const { firstName, lastName , email, password, confirmPassword } = req.body;
    
    //if everything is successful
    try {
      //this is to find something on a model
      const existingUser = await User.findOne({ email });
   /// this is if  you creating a user that already exist and stored  in the server
    if(existingUser) return res.status(404).json({ message: "User does exist."})
   /////this is if when we are creating the password in the form if the current password is not the same as the confirmpassword
      if(password !== confirmPassword) return  res.status(400).json({ message: "Passwords don't match."})
    ////this                         ////this is thelevel of dificulty to has password 
      const hashedPassword = await bcrypt.hash(password, 12)

    ////this is creating the User // this is the format
    const result = await User.create({ email, password: hashedPassword, name :`${firstName} ${lastName}`})
   
    //this keeps the User loggin for  what ever  time is inputed with expiresIn  this is our token
    const token = jwt.sign({ email: result.email, id: result._id }, 'test' , {expiresIn: "1h"})

    //// the 200 means everyhting when well and we sending  created user which is the result of the creation 
    res.status(200).json({ result, token });

    } 
    catch (error) {
      //if we get an error error 500 will populate something when wrong
      res.status(500).json({ message: 'Something went wrong creating the profile!' });
    }
  };



  
//   ///this hash the password to  make them secure and noone can see them on the browers
// import bcrypt from "bcrypt";
// ///this allows to stored a users  for a certain amount of time  or been logged in 
// import jwt from "jsonwebtoken";

// ///this is importing the model of user into the controllers
// import User from "../models/user.js";

// ///this is a asyncrinist function becasue it has to wait for the data
// /// res means respond  and req means request!!
// export const signin = async (req, res) => {
//     ////this is how we get our data becasue we requesting from the body "email and passowrd that it should be inthe data base"
//     const { email, password } = req.body;
//     console.log(req.body)
//     //if everything is successful the try code will run 
//   try {
//     //this is to find only ONE USER  EXISTING USER IN THE DATA Base
//     const oldUser = await User.findOne({ email });

//     if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
//      ////this compares if the passswords are the same  the existing password with the password tha tis been typed
//      const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
//   ///this checks if the password is not correct
//   if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })
    
//  //this keeps the User loggin for  what ever  time is inputed with expiresIn  this is our token //////the secret word is whats going to be pass to the middleware which is 'test'
//  const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

//     //// the 200 means everyhting when well and we sending the existin user and the token that we created with 1hr expiration
//     res.status(200).json({ result: oldUser, token });
//   } catch (error) {
//     //if we get an erros is undifyin server error
//     res.status(500).json({ message: "Something went wrong!!!!!!" });
//   }
// };

// export const signup = async (req, res) => {
//     //this is distructuring// from requesting the body from the fron end
//     const { email, password, firstName, lastName, confirmPassword } = req.body;
//     console.log(req.body)
//     //if everything is successful
//     try {
//       //this is to find something on a model
//       const oldUser = await User.findOne({ email });
//    /// this is if  you creating a user that already exist and stored  in the server
//    if (oldUser) return res.status(400).json({ message: "User already exists" });
//    /////this is if when we are creating the password in the form if the current password is not the same as the confirmpassword
//       if(password !== confirmPassword) return  res.status(400).json({ message: "Passwords don't match."})
//     ////this                         ////this is thelevel of dificulty to has password 
//     const hashedPassword = await bcrypt.hash(password, 12);

//     ////this is creating the User // this is the format
//     const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })
//     //this keeps the User loggin for  what ever  time is inputed with expiresIn  this is our token
//     const token = jwt.sign( { email: result.email, id: result._id }, 'test', { expiresIn: "1h" } );

//     //// the 200 means everyhting when well and we sending  created user which is the result of the creation 
//     res.status(201).json({ result, token });

//     } catch (error) {
//       //if we get an error error 500 will populate something when wrong
//       res.status(500).json({ message: "Something went wrongSSS" });
//     }
//   };