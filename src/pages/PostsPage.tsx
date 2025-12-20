import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../shared/lib/theme/useTheme";
import PostList from "../widgets/PostList/PostList";

const PostsPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  React.useEffect(() => {
    document.body.className = theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
    <main>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Список постов</h1>
        <button
          onClick={() => navigate("/users")}
        >
          Перейти к пользователям
        </button>
      </div>

      <PostList />
    </main>
  );
};

export default PostsPage;
