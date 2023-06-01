import { ScoreAlbum } from "./album"
import { Post } from "./post"

export type Profile = {
	email: string,
	username: string,
	aboutMe: string | null,
	profilePic: string | null,
	posts: Post[],
	albums: ScoreAlbum[]
}