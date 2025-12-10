import { Routes, Route, Navigate } from "react-router-dom";
import PostsPage from "../../../pages/PostsPage";
import PostDetailPage from "../../../pages/PostDetailPage";
import { UserAlbumsPage } from "../../../pages/UserAlbumsPage";
import { AlbumPhotosPage } from "../../../pages/AlbumPhotosPage";
import { UserTodosPage } from "../../../pages/UserTodosPage";
import UserPostsPage from "../../../pages/UserPostsPage";
import { UserPage } from "../../../pages/UserPage";
import MainLayout from "../../../shared/layouts/MainLayout";


import { UsersList } from "../../../entities/user/ui/UsersList";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace />} />

      <Route
        path="/posts"
        element={
          <MainLayout>
            <PostsPage />
          </MainLayout>
        }
      />

      <Route
        path="/posts/:id"
        element={
          <MainLayout>
            <PostDetailPage />
          </MainLayout>
        }
      />

      <Route
        path="/users"
        element={
          <MainLayout>
            <UsersList />
          </MainLayout>
        }
      />

      <Route
        path="/users/:id/*"
        element={
          <MainLayout>
            <UserPage />
          </MainLayout>
        }
      />

      <Route
        path="/users/:id/albums"
        element={
          <MainLayout>
            <UserAlbumsPage />
          </MainLayout>
        }
      />

      <Route
        path="/albums/:id/photos"
        element={
          <MainLayout>
            <AlbumPhotosPage />
          </MainLayout>
        }
      />

      <Route
        path="/users/:id/todos"
        element={
          <MainLayout>
            <UserTodosPage />
          </MainLayout>
        }
      />

      <Route
        path="/users/:id/posts"
        element={
          <MainLayout>
            <UserPostsPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};
