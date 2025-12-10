import { useNavigate, useLocation } from "react-router-dom";
import "./UserTabs.css";

type Props = {
  userId: number;
};

export const UserTabs = ({ userId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Посты", path: `/users/${userId}/posts` },
    { label: "Альбомы", path: `/users/${userId}/albums` },
    { label: "Задачи", path: `/users/${userId}/todos` },
  ];

  return (
    <nav className="user-tabs">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <button
            key={tab.label}
            onClick={() => navigate(tab.path)}
            className={isActive ? "active" : ""}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
};
