import { useParams, useNavigate } from "react-router-dom";
import type { MouseEventHandler } from "react";
import { useGetUserByIdQuery } from "../shared/api/api";
import { UserTabs } from "../widgets/UserTabs/UserTabs";
import "./global.css";

export const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetUserByIdQuery(userId);

  const handleBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (isLoading) return <div>Loading user...</div>;
  if (error) return <div>Error: {(error as { status?: number | string })?.status}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-page">
      <button className="back-btn" onClick={handleBack}>
        Назад
      </button>

      <div className="user-header">
        <img src={`https://i.pravatar.cc/150?img=${user.id}`} alt={user.name} />
        <h1>{user.name}</h1>
      </div>

      <UserTabs userId={userId} />
    </div>
  );
};
