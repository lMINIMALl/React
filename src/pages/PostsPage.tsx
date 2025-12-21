import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { MouseEventHandler } from "react";
import { useTheme } from "../shared/lib/theme/useTheme";
import PostList from "../widgets/PostList/PostList";

const PostsPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  const handleNavigateUsers: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate("/users");
  };

  return (
    <main>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Список постов</h1>
        <button onClick={handleNavigateUsers}>
          Перейти к пользователям
        </button>
      </div>

      <PostList />
    </main>
  );
};

export default PostsPage;
