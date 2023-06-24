export type Post = {
	"id": number,
	"content": string,
	"user": {
		"username": string,
		"profilePic": string | null
	},
	"likes": number,
	"deslikes": number
}