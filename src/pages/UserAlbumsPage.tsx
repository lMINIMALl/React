import { useParams, useNavigate, Link } from "react-router-dom";
import type { MouseEventHandler } from "react";
import { useGetAlbumsByUserQuery } from "../entities/albums/api/albumsApi";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import type { Album } from "../entities/albums/model/types";
import type { User } from "../entities/user/model/types";

export const UserAlbumsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { users } = useUsers();
  const user: User | undefined = users.find(u => u.id === userId);

  const { data: albums, isLoading, error } = useGetAlbumsByUserQuery(userId);

  const handleBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isLoading) return <div>Загрузка альбомов...</div>;
  if (error) return <div>Ошибка загрузки альбомов</div>;

  return (
    <div className="albums-page">
      <button onClick={handleBack} className="back-btn">
        Назад
      </button>

      <h2>Альбомы пользователя {user?.name ?? "Unknown"}</h2>

      <div className="albums-grid">
        {albums?.map((album: Album) => (
          <Link key={album.id} to={`/albums/${album.id}/photos`} className="album-card">
            <div className="album-title">{album.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
