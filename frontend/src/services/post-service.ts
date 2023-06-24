import { PostServer, createPost, getHomePosts } from "../api/post";
import { Post } from "../entities/post";

export function convertPostServerToPost(post: PostServer): Post {
  return {
    "id": post.id,
    "content": post.content,
    "user": {
      "username": post.user.username,
      "profilePic": post.user.profile_pic
    },
    "likes": post.likes,
    "deslikes": post.deslikes
  }
}

export class PostService {
  static async getAllHomePosts(): Promise<Post[]> {
    const post = await getHomePosts();
    return post.map(convertPostServerToPost)
  }

  static async add(text: string): Promise<Post> {
    const post = await createPost(text);
    return convertPostServerToPost(post);
  }
}