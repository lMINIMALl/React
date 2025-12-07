import type { Post } from "../../../widgets/PostList/PostList";

export const filterByLength = (posts: Post[], minLength: number) => {
  return posts.filter((post) => post.title.length >= minLength);
};
