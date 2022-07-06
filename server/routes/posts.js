import express from 'express';

//this  import the controllers 
import { getPostsBySearch, getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";



const router = express.Router();

//this  middelware is added  to routes that require authentification 
import auth from "../middleware/auth.js";
//this is what we need to search for the post 
router.get( "/search", getPostsBySearch);
//this one is only for the post 
router.get( "/", getPost);
///this route is posting a post // creating
router.post('/', auth,  createPost);
///this is to update exisisting documents
router.patch('/:id', auth, updatePost);
//this is  the route to delete the post 
router.delete('/:id', auth, deletePost);
// patch is a updating  the post 
router.patch('/:id/likePost', auth, likePost);

//this exports the router
export default router;





// import express from "express";

// //this  import the controllers 
// import { getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
// //this  middelware is added  to routes that require authentification 
// import auth from "../middleware/auth.js";


// const router = express.Router();

// router.get( "/", getPost);
// ///this route is posting a post // creating
// router.post( "/", auth, createPost);
// ///this is to update exisisting documents
// router.patch('/:id',auth, updatePost);
// //this is  the route to delete the post 
// router.delete("/:id",auth, deletePost);
// // patch is a updating  the post 
// router.patch("/:id/likePost",auth, likePost);

// //this exports the router
// export default router;
