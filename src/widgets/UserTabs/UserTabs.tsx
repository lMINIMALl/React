import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { UserTab } from "../../entities/user/model/types"; 

type Props = {
  userId: number;
};

export const UserTabs: React.FC<Props> = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs: UserTab[] = [
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
