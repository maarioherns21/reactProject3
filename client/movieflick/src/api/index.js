import axios from "axios";
//this url points towards the backend route
const url = "http://localhost:3001/post";

//this gets the backend route and returns it 
 export const fetchPosts = () => axios.get(url)

 // this creates anew post and axios post tehe new post 
export  const createPost = (newPost) =>axios.post(url, newPost) 

///api call for our update 
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

///api call for post to delete
export const deletePost = (id) => axios.delete(`${url}/${id}`);

///Api call for likePost 
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);