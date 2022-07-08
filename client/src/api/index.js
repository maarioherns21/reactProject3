import axios from "axios";
//

const API = axios.create({ baseURL: "https://instamemos.herokuapp.com/"});

/////this is goingt obe a function that is going tohappen in every request //this happen before thereques 
/// this function sents  our token back to the backend server so the backend middlewear can verieid that we are actually logged in 
API.interceptors.request.use((req) => {
 if (localStorage.getItem('profile')){
    ////this allows us to get the token from the profile is been requests token meaning the information from the user like name email passowrd 
    req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
 }
 //this returns the request to be able to make all the future request on the bottom 
 return req;
})

// //this url points towards the backend route
// const url = "http://localhost:3001/post";


//this gets the backend route and returns it 
export const fetchPosts = () => API.get('/post')

 // this creates anew post and axios post tehe new post 
export  const createPost = (newPost) => API.post('/post', newPost) 

///api call for our update 
export const updatePost = (id, updatedPost) => API.patch(`/post/${id}`, updatedPost);

///api call for post to delete
export const deletePost = (id) => API.delete(`/post/${id}`);

///Api call for likePost 
export const likePost = (id) => API.patch(`/post/${id}/likePost`);

////first : component (FORM) => dispatch(something or an action "signin") ths id from redux =>  2nd : it goes to ACTIONS folder =>  than it makes another call to the API to fetch data and return


///Api route for signin// here is where we fetchin the data  into the actions////  
export const signIn = (formData) => API.post('/user/signin', formData);
//this is api call for signup
export const signUp = (formData) => API.post('/user/signup', formData);

//this is for fetching  post  when seraching     ///is a get request becasue we are getting the data // this also handles our tags 
export const fetchPostsBySearch = (searchQuery) => API.get(`/post/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

/// this API fetchest the post partifcularly the post  id so it can bring the details page
export const fetchPost = (id) => API.get(`/post/${id}`)