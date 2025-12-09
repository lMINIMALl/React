import React, { useEffect, useState, useMemo } from "react";
import PostCard from "../../entities/post/ui/PostCard";
import { PostLengthFilter } from "../../features/PostLengthFilter/ui/PostLengthFilter";
import { filterByLength } from "../../features/PostLengthFilter/lib/filterByLength";

export type Post = {
  id: number;
  title: string;
  body: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [maxWords, setMaxWords] = useState(9999);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const filteredPosts = useMemo(() => {
    return filterByLength(posts, maxWords);
  }, [posts, maxWords]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <PostLengthFilter onChange={setMaxWords} />

      <ul className="post-list">
        {filteredPosts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            body={post.body}
          />
        ))}
      </ul>
    </div>
  );
}
