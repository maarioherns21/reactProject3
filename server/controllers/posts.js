import mongoose from "mongoose";
import PostMessage from "../models/post.js";

///this is a asyncrinist function becasue it has to wait for the data
/// res means respond  and req means request!!
export const getPost = async (req, res) => {
  //if everything is successful
  try {
    //this is to find something on a model
    const postMessage = await PostMessage.find();

    console.log(PostMessage);
    //// the 200 means everyhting when well and JSON returns an erray of everything we have
    res.status(200).json(postMessage);
  } catch (error) {
    //if we get an erros
    res.status(404).json({ message: error.message });
  }
};
///this creates the logic for a new post  ///also asyncronist  becasue it has to wait for the information
export const createPost = async (req, res) => {
  ///requesting the  new post
  const post = req.body;
  ///function creates the new post
  const newPost = new PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

//this will req and respond to deleteding a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};


//this is the function for the likePost
export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    // this finds the post we looking it returns our post  
    const post = await PostMessage.findById(id);
  ///this adds an updated count to  our post witch is been fetch 
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
     ///
    res.json(updatedPost);
}