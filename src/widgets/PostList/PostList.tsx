import React, { useMemo, useState } from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { PostLengthFilter } from "../../features/PostLengthFilter/ui/PostLengthFilter";
import { filterByLength } from "../../features/PostLengthFilter/lib/filterByLength";
import { usePosts } from "../../features/PostList/model/hooks/usePosts";
import { useUsers } from "../../features/PostList/model/hooks/useUsers";

export default function PostList() {
  const { posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { users, isLoading: usersLoading, error: usersError } = useUsers();
  const [maxWords, setMaxWords] = useState(9999);

  const filteredPosts = useMemo(
    () => filterByLength(posts, maxWords),
    [posts, maxWords]
  );

  const postsWithUsers = useMemo(() => {
    if (users.length === 0) return [];
    return filteredPosts.map(post => {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      return { ...post, user: randomUser };
    });
  }, [filteredPosts, users]);

  if (postsLoading || usersLoading) return <div>Loading...</div>;
  if (postsError) return <div>Error posts: {postsError}</div>;
  if (usersError) return <div>Error users: {usersError}</div>;

  return (
    <div>
      <PostLengthFilter onChange={setMaxWords} />

      <ul className="post-list">
        {postsWithUsers.map(post => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
            user={post.user} 
          />
        ))}
      </ul>
    </div>
  );
}
