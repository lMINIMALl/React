import React, { useMemo, useCallback } from "react";
import PostCard from "../../entities/post/ui/PostCard";

export type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  posts: Post[];
};

function PostList({ posts }: Props) {
  const renderedPosts = useMemo(() => {
    return posts.map((post) => (
      <PostCardMemo
        key={post.id}
        id={post.id}
        title={post.title}
        body={post.body}
      />
    ));
  }, [posts]);

  return <div className="post-list">{renderedPosts}</div>;
}

type PostCardProps = {
  id: number;
  title: string;
  body: string;
};

const PostCardMemo = ({ id, title, body }: PostCardProps) => {
  const handleClick = useCallback(() => {
    console.log("Clicked post id:", id);
  }, [id]);

  return (
    <PostCard
      id={id}
      title={title}
      body={body}
      onClick={handleClick}
    />
  );
};

const PostCardMemoized = Object.assign(React.memo(PostCardMemo), { displayName: "PostCardMemo" });

export default PostList;
