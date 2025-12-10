import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Photo = { id: number; title: string; thumbnailUrl: string; url: string };
type Album = { id: number; title: string };

export const AlbumPhotosPage = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);

  const navigate = useNavigate();

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const shuffle = <T,>(array: T[]) =>
    [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    if (!albumId) return;

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then((res) => res.json())
      .then((data: Album) => setAlbum(data));

    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`)
      .then((res) => res.json())
      .then((data: Photo[]) => {
        const randomPhotos = shuffle(data);
        setPhotos(randomPhotos);
        setIsLoading(false);
      });
  }, [albumId]);

  if (!albumId) return <div>Invalid album ID</div>;
  if (isLoading) return <div>Loading photos...</div>;

  const handleBack = () => navigate(-1);

  return (
    <div>
      <button onClick={handleBack}>
        Назад
      </button>

      <h2>Фотографии альбома: {album?.title ?? "Без названия"}</h2>

        <div className="photos-grid">
          {photos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img src={photo.thumbnailUrl} alt={photo.title} />
              <p>{photo.title}</p>
            </div>
          ))}
        </div>
    </div>
  );
};
