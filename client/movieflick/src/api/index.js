import axios from "axios";
//this url points towards the backend route
const url = "http://localhost:3001/post";

//this gets the backend route and returns it 
 export const fetchPosts = () => axios.get(url)

