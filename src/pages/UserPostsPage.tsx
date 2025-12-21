import { useParams, useNavigate } from "react-router-dom";
import type { MouseEventHandler } from "react";
import { useGetUserPostsQuery } from "../entities/post/api/postsApi";
import { useGetUsersQuery } from "../shared/api/api";
import PostCard from "../entities/post/ui/PostCard";
import { ItemList } from "../shared/ui/ItemList/ItemList";
import type { Post } from "../entities/post/model/types";
import type { User } from "../entities/user/model/types";

export default function UserPostsPage() {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: posts, isLoading: postsLoading } = useGetUserPostsQuery(userId);

  const user = users?.find((u) => u.id === userId);
  const userWithAvatar: User | undefined = user
    ? { ...user, avatar: `https://i.pravatar.cc/150?img=${user.id}` }
    : undefined;

  const handleBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  if (usersLoading || postsLoading) return <div>Загрузка...</div>;
  if (!userWithAvatar) return <div>Пользователь не найден</div>;

  return (
    <div>
      <button className="back-btn" onClick={handleBack}>
        Назад
      </button>

      <h2>Посты пользователя {userWithAvatar.name}</h2>

      <ItemList<Post>
        items={posts ?? []}
        className="post-list"
        getKey={(post) => post.id}
        renderItem={(post) => (
          <PostCard
            id={post.id}
            title={post.title}
            body={post.body}
            user={userWithAvatar}
          />
        )}
      />
    </div>
  );
}
