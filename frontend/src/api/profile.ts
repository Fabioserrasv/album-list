import { apiAxios } from "../infra/apiAxios";
import { AlbumServer } from "./album";
import { PostServer } from "./post";

export type ProfileData = {
	"email": string,
	"username": string,
	"about_me": string | null,
	"profile_pic": string | null,
	"posts": PostServer[],
	"albums": AlbumServer[]
}

export async function getUserProfileInformation(username:string): Promise<ProfileData> {
	const response = await apiAxios.get(`/api/profile?username=${username}`);
	return response.data;
}