import { apiAxios } from "../infra/apiAxios"


export type UserServer = {

}

export async function getUserAuthenticationInformation(): Promise<UserServer> {
	const response = await apiAxios.get("/auth/user-information");
	return response.data;
}

export async function userLogin(email: string, password: string): Promise<UserServer> {
	const response = await apiAxios.post("/auth/login", {
		email,
		password
	});

	return response.data;
}

export async function userLogout() {
	await apiAxios.get("/auth/logout");
}