import { useMemo, useState} from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { PostLengthFilter } from "../../features/PostLengthFilter/ui/PostLengthFilter";
import { filterByLength } from "../../features/PostLengthFilter/lib/filterByLength";
import { usePosts } from "../../features/PostList/model/hooks/usePosts";
import { useUsers } from "../../features/PostList/model/hooks/useUsers";
import { ItemList } from "../../shared/ui/ItemList";
import type { Post } from "../../entities/post/model/types";
import type { User } from "../../entities/user/model/types";

type PostWithUser = Post & {
  user?: User;
};

export default function PostList() {
  const { posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { users, isLoading: usersLoading, error: usersError } = useUsers();
  const [maxWords, setMaxWords] = useState<number>(9999);

  const filteredPosts: Post[] = useMemo(
    () => filterByLength(posts, maxWords),
    [posts, maxWords]
  );

  const postsWithUsers: PostWithUser[] = useMemo(() => {
    if (users.length === 0) return [];
    return filteredPosts.map((post) => ({
      ...post,
      user: users.find((u) => u.id === post.userId),
    }));
  }, [filteredPosts, users]);

  const handleMaxWordsChange: (value: number) => void = setMaxWords;

  if (postsLoading || usersLoading) return <div>Загрузка...</div>;
  if (postsError) return <div>Ошибка загрузки постов: {postsError}</div>;
  if (usersError) return <div>Ошибка загрузки пользователей: {usersError}</div>;

  return (
    <div>
      <PostLengthFilter onChange={handleMaxWordsChange} />

      <ItemList<PostWithUser>
        items={postsWithUsers}
        className="post-list"
        getKey={(post) => post.id}
        renderItem={(post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={post.user}
          />
        )}
      />
    </div>
  );
}
