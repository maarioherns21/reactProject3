import express from "express";

//this  import the controllers 
import { getPost, createPost, updatePost, deletePost } from "../controllers/posts.js";
const router = express.Router();

router.get( "/", getPost);

router.post( "/", createPost);
///this is to update exisisting documents
router.patch('/:id', updatePost);

//this is  the route to delete the post 
router.delete("/:id", deletePost);
export default router;
