import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import type { User } from "../features/PostList/model/hooks/useUsers";
import "./global.css";

type Album = { id: number; title: string };

export const UserAlbumsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { users, isLoading: usersLoading, error: usersError } = useUsers();
  const user = users.find((u: User) => u.id === userId);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
        setIsLoading(false);
      });
  }, [userId]);

  const handleBack = () => navigate(-1); 

  if (isLoading || usersLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  if (usersError) return <div>Error loading user: {usersError}</div>;

  return (
    <div className="albums-page">
      <button className="btn-back" onClick={handleBack}>Назад</button>
      <h2>Альбомы пользователя {user.name}</h2>
      <div className="albums-grid">
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/albums/${album.id}/photos`}
            className="album-card"
          >
            <div className="album-title">{album.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};
