import { useParams, useNavigate } from "react-router-dom";
import { useGetUserPostsQuery } from "../entities/post/api/postsApi";
import { useGetUsersQuery } from "../shared/api/api";
import PostCard from "../entities/post/ui/PostCard";

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: posts, isLoading: postsLoading } = useGetUserPostsQuery(userId);


  const user = users?.find(u => u.id === userId);
  const userWithAvatar = user
    ? { ...user, avatar: `https://i.pravatar.cc/150?img=${user.id}` }
    : undefined;

  if (usersLoading || postsLoading) return <div>Загрузка...</div>;
  if (!userWithAvatar) return <div>Пользователь не найден</div>;

  return (
    <div>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Назад
      </button>
      <h2>Посты пользователя {userWithAvatar.name}</h2>
      <ul className="post-list">
        {posts?.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={userWithAvatar}
          />
        ))}
      </ul>
    </div>
  );
}
