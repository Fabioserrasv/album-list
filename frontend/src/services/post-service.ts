import { PostServer } from "../api/post";
import { Post } from "../entities/post";

export function convertPostServerToPost(post: PostServer): Post {
  return {
    "id": post.id,
    "content": post.content,
    "user": {
      "username": post.user.username,
    },
    "likes": post.likes,
    "deslikes": post.deslikes
  }
}