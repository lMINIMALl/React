import { useParams, useLocation } from "react-router-dom";
import PostCard from "../entities/post/ui/PostCard";
import { useGetPostByIdQuery } from "../entities/post/api/postsApi";
import { useSelector } from "react-redux";
import { usersSelectors } from "../entities/user/model/slice/userSlice";
import type { User } from "../entities/user/model/slice/userSlice";

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const { data: post, isLoading: postLoading, error: postError } = useGetPostByIdQuery(postId);
  const users = useSelector(usersSelectors.selectAll);

  const location = useLocation();
  const passedUser = location.state?.user as User | undefined;

  if (postLoading) return <div>Loading...</div>;
  if (postError) return <div>Error loading post</div>;
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
