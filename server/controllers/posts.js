import mongoose from "mongoose";
import PostMessage from "../models/post.js";

///this is a asyncrinist function becasue it has to wait for the data
/// res means respond  and req means request!!
export const getPost = async (req, res) => {
  //if everything is successful
  try {
    //this is to find something on a model
    const postMessage = await PostMessage.find();

    // console.log(PostMessage);
    //// the 200 means everyhting when well and JSON returns an erray of everything we have
    res.status(200).json(postMessage);
  } catch (error) {
    //if we get an erros
    res.status(404).json({ message: error.message });
  }
};
//this on is the one that search for the post or tags 
//// query MEANS = search  -> /post/?page=1 -> page =1  //params -> /post/:id ->  123
export const getPostsBySearch = async (req, res) => {
      //we goign tot get the data from the query or search from  the frontend 
      const { searchQuery, tags } = req.query;
    
  try {      
    //// RegEXp = Regula Expression  = is easier mongodb  moonge to search the data base
        const title = new RegExp(searchQuery, "i"); /// i stand for ignore test 
    //////this fsearch in the post\\  the $or =  either findme the title or the tags
    // tags is if there is tags that match the current tag if yes then we want tp display ourpost 
     const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
     
     res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}



///this creates the logic for a new post  ///also asyncronist  becasue it has to wait for the information
export const createPost = async (req, res) => {
  ///requesting the  new post
  const post = req.body;
  ///function creates the new post  
  //------NEW >>> we spread the values of a specifict  post we have to set the creator of a post /  our backend specifies the creator of a specific post 
  ///createAdd this will make sure the value is shown when it was created
  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


// ///this creates the logic for a new post  ///also asyncronist  becasue it has to wait for the information
// export const createPost = async (req, res) => {
//   ///requesting the  new post
//   const post = req.body;
//   ///function creates the new post
//   const newPost = new PostMessage(post);
//   try {
//     await newPost.save();

//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };




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

    // req.userId... this is imported from middleware and past trought routes  we can use it in controllers becasue of that
    //if  is the user is not auth then render this message //
    if (!req.userId) {
      return res.json({ message: "Unauthenticated" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    // this finds the post we looking it returns our post  
    const post = await PostMessage.findById(id);
    ///if the user id is already in the like section // this loops through all the id from a specific person ///
    ///if this is the case the ID is already in that like 
    const index = post.likes.findIndex((id) => id ===String(req.userId));

    ///only if the id is not in the like post // 
    if (index === -1) {
      //just pushing his id if he hasnt like the post 
      post.likes.push(req.userId);
    }
    else {
   /// this removes the id if he doesnt like it  //this accepts a callback functiona nd it loops through all the ids //filters the users ID//
   //the callback return only the likes from other people //
   post.likes = post.likes.filter((id) => id !== String(req.userId));

    }
  ///this adds an updated count to  our post witch is been fetch 
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
     ///
     res.status(200).json(updatedPost);
}