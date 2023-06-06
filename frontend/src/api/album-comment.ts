import { apiAxios } from "../infra/apiAxios";

export type AlbumCommentServer =
	{
		"id": number,
		"text": string,
		"descendents": AlbumCommentServer[],
		"user": {
			"profile_pic": string,
			"username": string
		},
		"likes": number,
		"deslikes": number,
		"intention": -1 | 0 | 1
	}

export async function getAlbumComments(artist: string, album: string): Promise<AlbumCommentServer[]> {
	const response = await apiAxios.get(`/comment/list-album-comments?artist_name=${artist}&album_name=${album}`);
	return response.data;
}

export async function addAlbumComment(artist: string, album: string, text: string, context: number | null): Promise<AlbumCommentServer> {
	const response = await apiAxios.post("/comment/create-album-comment", {
		"artist_name": artist,
		"album_name": album,
		"context": context,
		"text": text
	});
	return response.data;
}

export async function putAlbumCommentLike(commentId: number, likeType: "like" | "deslike"): Promise<void> {
	await apiAxios.put('/comment/put-album-like', {
		"comment_id": commentId,
		"like_type": likeType
	});
}