import * as api from "../api";
/// redux thunk allows to add async  adn add dispatch
//actions creators
// we require Asyncronist data becasue it has to wait for the data
export const getPosts = () => async (dispatch) => {
  try {
    ///we getting the reponse from the api /we getting the post with this!!
    //this fetch the data
    const { data } = await api.fetchPosts();
    ///// we sent the data through the payload ///
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    //this gets the data  gets a post request to our backend server
    const { data } = await api.createPost(post);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
     console.log(error.message)
  }
};
