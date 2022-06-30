import axios from "axios";
//this url points towards the backend route
const url = "http://localhost:3001/post";

//this gets the backend route and returns it 
 export const fetchPosts = () => axios.get(url)

 // this creates anew post and axios post tehe new post 
export  const createPost = (newPost) =>axios.post(url, newPost) 