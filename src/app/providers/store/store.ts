import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../../../entities/user/model/slice/userSlice";
import postReducer from "../../../entities/post/model/slice/postSlice";

import { postsApi } from "../../../entities/post/api/postsApi";
import { commentsApi } from "../../../entities/comments/api/commentsApi";
import { albumsApi } from "../../../entities/albums/api/albumsApi";
import { todosApi } from "../../../entities/todos/api/todosApi";
import { api } from "../../../shared/api/api";

export const store = configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,

    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
    
    [api.reducerPath]: api.reducer, 
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      postsApi.middleware,
      commentsApi.middleware,
      albumsApi.middleware,
      todosApi.middleware,
      api.middleware, 
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
