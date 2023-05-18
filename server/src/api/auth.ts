import { apiAxios } from "../infra/apiAxios"


export type UserServer = {
	username: string;
	email: string;
	about_me: string | null;
	profile_pic: string | null;
}

export async function getUserAuthenticationInformation(): Promise<UserServer> {
	const response = await apiAxios.get("/api/user");
	return response.data.user;
}

export async function userSignUp(
	name: string,
	email: string,
	password1: string,
	_password2: string
	): Promise<UserServer> {
	const response = await apiAxios.post("/api/register", {
		username: name,
		email,
		password: password1
	});

	return response.data;
}

export async function userLogin(email: string, password: string): Promise<UserServer> {
	const response = await apiAxios.post("/api/login", {
		email,
		password
	});

	return response.data;
}

export async function userLogout() {
	await apiAxios.post("/api/logout");
}