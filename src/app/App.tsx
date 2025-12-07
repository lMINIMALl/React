import { useEffect, useState } from "react";
import MainLayout from "../shared/layouts/MainLayout";
import { ThemeProvider } from "../shared/lib/theme/ThemeContext";
import { useTheme } from "../shared/lib/theme/useTheme";
import { PostListWithLoading } from "../widgets/PostList/PostListWithLoading";
import { PostLengthFilter } from "../features/PostLengthFilter/ui/PostLengthFilter";

import "./App.css";

type Post = {
  id: number;
  title: string;
  body: string;
};

const MainContent = ({ posts, isLoading }: { posts: Post[], isLoading: boolean }) => {
  const [ascending, setAscending] = useState(true);

  const sortedPosts = [...posts].sort((a, b) =>
    ascending ? a.title.length - b.title.length : b.title.length - a.title.length
  );

  return (
    <main>
      <h1>Список постов</h1>

      <PostLengthFilter onChangeOrder={setAscending} />

      <PostListWithLoading isLoading={isLoading} posts={sortedPosts} />
    </main>
  );
};


const AppContent = () => {
  const { theme } = useTheme();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.className =
      theme === "светлая" ? "light-theme" : "dark-theme";
  }, [theme]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <MainLayout>
      <MainContent posts={posts} isLoading={isLoading} />
    </MainLayout>
  );
};


const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
