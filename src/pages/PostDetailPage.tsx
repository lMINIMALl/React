import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import PostCard from "../entities/post/ui/PostCard";
import { useUsers } from "../features/PostList/model/hooks/useUsers";
import type { User } from "../features/PostList/model/hooks/useUsers";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const location = useLocation();
  const passedUser = location.state?.user as User | undefined; 

  const [post, setPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<string | null>(null);

  const { users, isLoading: usersLoading, error: usersError } = useUsers();

  useEffect(() => {
    if (!postId) return;

    setPostLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then(data => setPost(data))
      .catch(err => setPostError(err.message))
      .finally(() => setPostLoading(false));
  }, [postId]);

  if (postLoading || usersLoading) return <div>Loading...</div>;
  if (postError) return <div>Error loading post: {postError}</div>;
  if (usersError) return <div>Error loading users: {usersError}</div>;
  if (!post) return <div>Post not found</div>;

  const user = passedUser || users.find(u => u.id === post.userId);

  return (
    <ul>
        <PostCard
          id={post.id}
          title={post.title}
          body={post.body}
          user={user}
          showBackButton={true}
          showComments={true} 
        />
    </ul>
  );
};

export default PostDetailPage;
