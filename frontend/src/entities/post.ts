export type Post = {
	"id": number,
	"content": string,
	"user": {
		"username": string
	},
	"likes": number,
	"deslikes": number
}