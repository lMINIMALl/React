import { useParams, useNavigate } from "react-router-dom";
import { useGetAlbumPhotosQuery, useGetAlbumByIdQuery } from "../entities/albums/api/albumsApi";

export const AlbumPhotosPage = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const navigate = useNavigate();

  const { data: album } = useGetAlbumByIdQuery(albumId);
  const { data: photos, isLoading, error } = useGetAlbumPhotosQuery(albumId);

  if (isLoading) return <div>Загрузка фотографий...</div>;
  if (error) return <div>Ошибка загрузки фото</div>;

  return (
    <div className="album-photos-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        Назад
      </button>

      <h2>Фотографии альбома: {album?.title ?? "Без названия"}</h2>

      <div className="photos-grid">
        {photos?.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
