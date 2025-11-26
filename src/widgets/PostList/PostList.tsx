import PostCard from "../../entities/post/ui/PostCard";

type Post = {
  id: number;
  title: string;
  text: string;
};

type Props = {
  posts: Post[];
};

function PostList({ posts }: Props) {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} text={post.text} />
      ))}
    </div>
  );
}

export default PostList;
