import { createSlice, createEntityAdapter, type PayloadAction, type EntityState, type EntityAdapter } from "@reduxjs/toolkit";
import type { Post } from "../types";

const postsAdapter: EntityAdapter<Post, number> = createEntityAdapter<Post, number>({
  selectId: (post) => post.id,
  sortComparer: (a, b) => a.id - b.id,
});

interface PostsState extends EntityState<Post, number> {
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = postsAdapter.getInitialState({
  loading: false,
  error: null,
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      postsAdapter.setAll(state, action.payload);
    },
    addPost: (state, action: PayloadAction<Post>) => {
      postsAdapter.addOne(state, action.payload);
    },
    updatePost: (state, action: PayloadAction<Post>) => {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    },
    removePost: (state, action: PayloadAction<number>) => {
      postsAdapter.removeOne(state, action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, setLoading, setError } = postSlice.actions;
export default postSlice.reducer;

export const postsSelectors = postsAdapter.getSelectors<{
  posts: PostsState;
}>((state) => state.posts);
