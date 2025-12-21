import { Link, useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../../shared/api/api";
import type { User } from "../../../entities/user/model/types";
import { ItemList } from "../../../shared/ui/ItemList";

export const UsersList = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading) return <div>Загрузка пользователей...</div>;
  if (error) return <div>Ошибка при загрузке пользователей</div>;
  if (!users || users.length === 0) return <div>Пользователи не найдены</div>;

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Назад
      </button>

      <h1>Список пользователей</h1>

      <ItemList<User>
        items={users}
        className="post-list" 
        getKey={(user) => user.id}
        renderItem={(user) => (
          <li className="post-card">
            <div className="post-author">
              <img
                src={user.avatar || `https://i.pravatar.cc/150?img=${user.id}`}
                alt={user.name}
                className="post-avatar"
              />
              <Link to={`/users/${user.id}`} className="post-author-link">
                {user.name}
              </Link>
            </div>
          </li>
        )}
      />
    </div>
  );
};
