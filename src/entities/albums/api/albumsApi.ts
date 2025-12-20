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

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const encodeText = (text: string) => encodeURIComponent(text);

export const albumsApi = createApi({
  reducerPath: "albumsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder) => ({
    getAlbumById: builder.query<Album, number>({
      query: (albumId) => `/albums/${albumId}`,
    }),

    getAlbumPhotos: builder.query<Photo[], number>({
      query: (albumId) => `/albums/${albumId}/photos`,
      transformResponse: (response: Photo[]) =>
        response.map(photo => {
          const color = getRandomColor();
          const text = encodeText(photo.title); 
          const url = `https://placehold.co/150/${color}/000000/png?text=${text}`;
          return {
            ...photo,
            url,
            thumbnailUrl: url,
          };
        }),
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
