import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Comment } from "../model/types"; 

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getComments: builder.query<Comment[], void>({ 
      query: () => "/comments",
    }),
    getCommentsByPost: builder.query<Comment[], number>({
      query: (postId: number) => `/comments?postId=${postId}`,
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentsByPostQuery,
} = commentsApi;
