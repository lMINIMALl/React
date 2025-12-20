import { useParams, useNavigate } from "react-router-dom";
import { usePosts } from "../features/PostList/model/hooks/usePosts";
import type { Post } from "../features/PostList/model/hooks/usePosts";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import type { User } from "../features/PostList/model/hooks/useUsers";
import PostCard from "../entities/post/ui/PostCard";

const UserPostsPage = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { users, isLoading: usersLoading, error: usersError } = useUsers();

  const user = users.find((u: User) => u.id === userId);

  if (postsLoading || usersLoading) return <div>Loading...</div>;
  if (postsError) return <div>Error loading posts: {postsError}</div>;
  if (usersError) return <div>Error loading users: {usersError}</div>;
  if (!user) return <div>User not found</div>;

  const userPosts = posts.filter((post: Post) => post.userId === userId);

  const handleBack = () => navigate(-1); 

  return (
    <div>
      <button onClick={handleBack}>
        Назад
      </button>

      <h2>Посты пользователя {user.name}</h2>
      <ul className="post-list">
        {userPosts.map((post: Post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserPostsPage;
