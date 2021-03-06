import * as api from "../api";
import {FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from "../constants/actionTypes";
/// redux thunk allows to add async  adn add dispatch
//actions creators
export const getPost = (id) => async (dispatch) => {
  try {
    ///we getting the reponse from the api /we getting the post with this!!
    //this fetch the data
    const { data } = await api.fetchPost(id);
    ///// we sent the data through the payload ///
    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    console.log(error);
  }
};

// we require Asyncronist data becasue it has to wait for the data
export const getPosts = () => async (dispatch) => {
  try {
    ///we getting the reponse from the api /we getting the post with this!!
    //this fetch the data
    const { data } = await api.fetchPosts();
    ///// we sent the data through the payload ///
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
   ///this is for searching our tags 
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
        
       try {
        ////this comunicate with  our api backend // this search for queries 
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
         /// this dispatch allowed for the data to be able to be manipulted in the fornend 
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
      } 
      catch (error) {
        console.log(error);
      }
};



/// this creates the post 
export const createPost = (post) => async (dispatch) => {
  try {
    //this gets the data  gets a post request to our backend server
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
///thi is going to update the post
export const updatePost = (id, post) => async (dispatch) => {
  //   we need an api request to update the post // we distructor to get the {data} import instant
  try {
    const { data } = await api.updatePost(id, post);
    ///passing an action of type of UPDATE
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
/// this is what is going to be going towards the frontend 
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};


 export const likePost = (id) => async (dispatch) => {
   try {
     /// we only prove the id because we only liking the post
     const { data } = await api.likePost(id);

     dispatch({ type: LIKE, payload: data });
   } catch (error) {
     console.log(error.message);
   }
 };