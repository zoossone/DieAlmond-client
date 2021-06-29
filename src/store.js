import { createStore } from "redux";
import {createAction, creatorReducer} from "@reduxjs/toolkit";

const reducer = createReducer()

const store = createStore(reducer);

export default store;