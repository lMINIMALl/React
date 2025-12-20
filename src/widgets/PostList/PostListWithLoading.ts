import PostList from "./PostList";         
import { withLoading } from "../../shared/lib/hoc/withLoading";  

export const PostListWithLoading = withLoading(PostList);
