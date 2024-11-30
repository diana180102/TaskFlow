import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import modalReducer from "./modalSlice";
import projectReducer from "./projectSlice";
import dropdownReducer from "./dropdownSlice";

// ...

export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    project: projectReducer,
    dropdown: dropdownReducer
   
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;