import express from "express";

//this  import the controllers 
import { getPost, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";
const router = express.Router();

router.get( "/", getPost);
///this route is posting a post // creating
router.post( "/", createPost);
///this is to update exisisting documents
router.patch('/:id', updatePost);
//this is  the route to delete the post 
router.delete("/:id", deletePost);
// patch is a updating  the post 
router.patch("/:id/likePost", likePost);

//this exports the router
export default router;
