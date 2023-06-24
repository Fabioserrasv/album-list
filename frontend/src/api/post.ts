import { apiAxios } from "../infra/apiAxios";

export type PostServer = {
	"id": number,
	"content": string,
	"user": {
		"username": string,
		"profile_pic": string | null
	},
	"likes": number,
	"deslikes": number
}

export async function getHomePosts(): Promise<PostServer[]> {
	const response = await apiAxios.get(`/post/list`);
	return response.data;
}

export async function createPost(text: string): Promise<PostServer> {
	const response = await apiAxios.post("/post/create", {
		"content": text
	});
	return response.data;
}

// export async function putAlbumCommentLike(commentId: number, likeType: "like" | "deslike"): Promise<void> {
// 	await apiAxios.put('/comment/put-album-like', {
// 		"comment_id": commentId,
// 		"like_type": likeType
// 	});
// }