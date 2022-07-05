import * as api from "../api";
import { AUTH } from "../constants/actionTypes"; 

export const signin = (formData, history) => async (dispatch) => {
    try {
       ///destructor the data from the request  and past the form data  ///  this action makes a call to the api
       const { data } = await api.signIn(formData);
        
       dispatch({ type: AUTH, data });
         
  // this is where the page will navigate too
        history('/')
    } catch (error) {
        console.log(error.message)
    }

}



export const signup = (formData, history) => async (dispatch) => {
    try {
       ///destructor the data from the request  and past the form data  ///  this action makes a call to the api
        const { data } = await api.signUp(formData);
        
        dispatch({ type: AUTH, data });
         
// this is where the page will navigate too
        history('/')
    } catch (error) {
        console.log(error.message)
    }

}