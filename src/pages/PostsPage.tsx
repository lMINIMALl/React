import React from "react";
import { useTheme } from "../shared/lib/theme/useTheme";
import PostList from "../widgets/PostList/PostList";

const PostsPage = () => {
  const { theme } = useTheme();

  React.useEffect(() => {
    document.body.className = theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  return (
      <main>
        <h1>Список постов</h1>
        <PostList />
      </main>
  );
};

export default PostsPage;
