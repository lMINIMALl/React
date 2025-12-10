import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: "LIST" }]
          : [{ type: "Posts", id: "LIST" }],
    }),

    getPostById: builder.query<Post, number>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),

    getUserPosts: builder.query<Post[], number>({
      query: (userId) => `posts?userId=${userId}`,
      providesTags: (result, error, userId) =>
        result
          ? [...result.map(({ id }) => ({ type: "Posts" as const, id })), { type: "Posts", id: `USER-${userId}` }]
          : [{ type: "Posts", id: `USER-${userId}` }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useGetUserPostsQuery } = postsApi;