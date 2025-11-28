import MainLayout from "../shared/layouts/MainLayout";
import PostList from "../widgets/PostList/PostList";

import { ThemeProvider } from "../shared/lib/theme/ThemeContext";
import { useTheme } from "../shared/lib/theme/useTheme";

import "./App.css";

type Post = {
  id: number;
  title: string;
  text: string;
};

type MainContentProps = {
  posts: Post[];
};

const MainContent = ({ posts }: MainContentProps) => {
  const { theme } = useTheme();

  return (
    <main className={theme === "светлая" ? "light-theme" : "dark-theme"}>
      <h1>Список постов</h1>
      <PostList posts={posts} />
    </main>
  );
};

export const App = () => {
const posts: Post[] = [
  { id: 1, title: "Пост 1", text: "Текст поста 1" },
  { id: 2, title: "Пост 2", text: "Текст поста 2" },
  { id: 3, title: "Пост 3", text: "Текст поста 3" },
  { id: 4, title: "Пост 4", text: "Текст поста 4" },
  { id: 5, title: "Пост 5", text: "Текст поста 5" },
  { id: 6, title: "Пост 6", text: "Текст поста 6" },
  { id: 7, title: "Пост 7", text: "Текст поста 7" },
  { id: 8, title: "Пост 8", text: "Текст поста 8" },
];

  return (
    <ThemeProvider>
      <MainLayout>

        <MainContent posts={posts} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
