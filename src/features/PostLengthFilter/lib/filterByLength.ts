import type { Post } from "../../../entities/post/model/types"; 

const countWords = (title: string) => {
  return title.trim().split(/\s+/).length;
};

export const filterByLength = (posts: Post[], maxWords: number) => {
  return posts.filter((post) => countWords(post.title) <= maxWords);
};
