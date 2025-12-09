import type { Post } from "../../../widgets/PostList/PostList";

const countWords = (title: string) => {
  return title.trim().split(/\s+/).length;
};

export const filterByLength = (posts: Post[], maxWords: number) => {
  return posts.filter((post) => countWords(post.title) <= maxWords);
};
