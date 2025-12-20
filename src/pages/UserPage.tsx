import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import { UserTabs } from "../widgets/UserTabs/UserTabs";
import "./global.css";

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { users, isLoading, error } = useUsers();
  const user = users.find((u) => u.id === userId);

  const handleBack = () => navigate(-1);

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-page">
      <button className="back-btn" onClick={handleBack}>
        Назад
      </button>

      <div className="user-header">
        <img src={user.avatar} alt={user.name} />
        <h1>{user.name}</h1>
      </div>

      <UserTabs userId={userId} />
    </div>
  );
};
