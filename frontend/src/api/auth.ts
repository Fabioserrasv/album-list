import { apiAxios } from "../infra/apiAxios"


export type UserServer = {
	name: string;
	email: string;
}

export async function getUserAuthenticationInformation(): Promise<UserServer> {
	const response = await apiAxios.get("/api/user");
	return response.data;
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