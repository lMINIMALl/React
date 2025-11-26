import MainLayout from "../shared/layouts/MainLayout";
import PostList from "../widgets/PostList/PostList";

function App() {
  const posts = [
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
    <MainLayout>
      <PostList posts={posts} />
    </MainLayout>
  );
}

export default App;
