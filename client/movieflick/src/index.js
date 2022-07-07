import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App/App";
//keeep tracking of that store from anywhere in the app
import { Provider } from "react-redux";
///
import { applyMiddleware, compose, createStore } from "redux";
///this replace  CreateStore ////
// import { configureStore } from "@reduxjs/toolkit";
///
import thunk from "redux-thunk";
//this import the reducer folder
import reducers from "./reducers";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
