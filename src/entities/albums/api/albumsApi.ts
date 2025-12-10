import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getAlbumById: builder.query<Album, number>({
      query: (albumId) => `/albums/${albumId}`,
    }),

    getAlbumPhotos: builder.query<Photo[], number>({
      query: (albumId) => `/albums/${albumId}/photos`,
    }),

    getAlbumsByUser: builder.query<Album[], number>({
      query: (userId) => `/albums?userId=${userId}`,
    }),
  }),
});

export const {
  useGetAlbumByIdQuery,
  useGetAlbumPhotosQuery,
  useGetAlbumsByUserQuery, 
} = albumsApi;
