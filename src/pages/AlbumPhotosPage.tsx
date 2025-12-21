import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAlbumPhotosQuery, useGetAlbumByIdQuery } from "../entities/albums/api/albumsApi";
import { ItemList } from "../shared/ui/ItemList";
import type { Photo } from "../entities/albums/model/types";

export const AlbumPhotosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const albumId = Number(id);
  const navigate = useNavigate();

  const { data: album, isLoading: albumLoading, error: albumError } = useGetAlbumByIdQuery(albumId);
  const { data: photos, isLoading: photosLoading, error: photosError } = useGetAlbumPhotosQuery(albumId);

  if (albumLoading || photosLoading) return <div>Загрузка фотографий...</div>;
  if (albumError || photosError) return <div>Ошибка загрузки фото</div>;

  return (
    <div className="album-photos-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        Назад
      </button>

      <h2>Фотографии альбома: {album?.title ?? "Без названия"}</h2>

      <ItemList<Photo>
        items={photos ?? []}
        className="photos-grid"
        getKey={(photo) => photo.id}
        renderItem={(photo) => (
          <li key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        )}
      />
    </div>
  );
};
