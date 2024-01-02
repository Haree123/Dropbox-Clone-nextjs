"use client";

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import filesReducer from "./reducers/files.reducer";

const rootReducer = combineReducers({
  file: filesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
