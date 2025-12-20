import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const todosApi = createApi({
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodosByUser: builder.query<Todo[], number>({
      query: (userId) => `/todos?userId=${userId}`,
    }),
  }),
});

export const { useGetTodosByUserQuery } = todosApi;
