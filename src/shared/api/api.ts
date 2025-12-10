import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "../../entities/user/model/slice/userSlice";
import type { Post } from "../../entities/post/api/postsApi";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: ["Users", "Posts"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Users" as const, id })), { type: "Users", id: "LIST" }]
          : [{ type: "Users", id: "LIST" }],
    }),

    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),

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

    addPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: "posts",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Posts", id: "LIST" }],
    }),

    updatePost: builder.mutation<Post, Partial<Post> & { id: number }>({
      query: ({ id, ...body }) => ({
        url: `posts/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Posts", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
} = api;
