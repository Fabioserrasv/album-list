
import { AlbumCommentServer, addAlbumComment, putAlbumCommentLike } from "../api/album-comment";
import { getAlbumComments } from "../api/album-comment";
import { ID } from "../entities/app-types";
import { Comment } from "../entities/comment";

export function convertAlbumCommentServerToComment(comment: AlbumCommentServer): Comment {
  return {
    id: comment?.id,
    username: comment.user.username,
    text: comment.text,
    replies: comment.descendents.map(convertAlbumCommentServerToComment),
    userPic: comment.user.profile_pic,
    deslikes: comment.deslikes,
    likes: comment.likes,
    intention: comment.intention
  }
}

type Interaction = 'LIKE' | "DESLIKE";

export class AlbumCommentService {
  static async add(
    album: string,
    artist: string,
    commentParentId: ID | null,
    text: string
  ): Promise<Comment> {
    const comment = await addAlbumComment(
      artist,
      album,
      text,
      (commentParentId === null ? null : Number(commentParentId))
    );
    return convertAlbumCommentServerToComment(comment)
  }

  static async getCommentsBy(
    album: string,
    artist: string
  ): Promise<Comment[]> {
    const comments = await getAlbumComments(artist, album)

    return comments.map(convertAlbumCommentServerToComment)
  }

  static async setInteraction(commentId: ID, interaction: Interaction) {
    console.log('chegou')
    await putAlbumCommentLike(Number(commentId), interaction.toLowerCase() as "like" | "deslike")
  }
}