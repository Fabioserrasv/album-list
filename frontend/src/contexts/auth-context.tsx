import React, { createContext, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message, notification } from "antd";

import { PageLoading } from "../pages/page-loading/PageLoading";

import { User } from "../entities/user";
import { AuthenticationService } from "../services/authentication-service";

import { ROUTE } from "../config/route";

interface AuthProviderProps {
	children: React.ReactNode;
}

interface AuthContextInterface {
	user: User | null;
	authed: boolean;
	signup(name: string, email: string, password1: string, password2: string): Promise<void>;
	login(email: string, password: string): Promise<void>;
	logout(): Promise<void>;
}

export const AuthContext = createContext({} as AuthContextInterface);
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>({
		email: "teste.da",
		name: "Leandrp"
	});
	const [authed, setAuthed] = useState(true);
	const [loading, setLoading] = useState(false);

	const location = useLocation()
	const navigate = useNavigate();

	useEffect(() => {
		async function fecthUserAuthenticationInformation() {
			// try {
			// 	setLoading(true);
			// 	const user = await AuthenticationService.getUserInformation();
				
			// 	setUser(user);
			// 	setAuthed(true);
			// } catch (error: any) {
			// 	if (location.pathname !== ROUTE.APP.LOGIN) {
			// 		notification.error({
			// 			message: "Usuário não autenticado",
			// 			description:
			// 				"Parece que você não está autenticado. Faça o login novamente",
			// 		});
			// 		navigate(ROUTE.APP.LOGIN);
			// 	}
			// } finally {
			// 	setLoading(false);
			// }
		}

		fecthUserAuthenticationInformation();
	}, []);

	const signup = useCallback(async (name: string, email: string, password1: string, password2: string) => {
		try {
			await AuthenticationService.signup(name, email, password1, password2);

			navigate(ROUTE.APP.LOGIN);
		} catch (error: any) {
			setAuthed(false);
			notification.error({
				message: "Dados incorretos.",
				description: "Dados incorretos, tente novamente.",
			});
		}
	}, [])

	const login = useCallback(async (username: string, password: string) => {
		if (authed) {
			return;
		}

		try {
			const user = await AuthenticationService.login(username, password);

			setUser(user);
			setAuthed(true);

			navigate(ROUTE.APP.HOME);

		} catch (error: any) {
			console.log(error);
			console.log(error.response)
			setAuthed(false);
			notification.error({
				message: "Não autorizado",
				description: "Usuário ou senha incorreto, tente novamente.",
			});
		}
	}, [authed]);

	const logout = useCallback(async () => {
		try {
			await AuthenticationService.logout();

			setUser(null);
			setAuthed(false);
			navigate(ROUTE.APP.LOGIN);
		} catch (error: any) {
			message.error("Ocorreu um error ao realizar o logout")
			console.log(error)
		}
	}, [navigate]);

	// const goToLogin = useCallback(async () => {
	// 	setUser(null);
	// 	setAuthed(false);
	// }, []);

	return (
		<AuthContext.Provider value={{ authed, signup, user, login, logout }}>
			{loading ? (<PageLoading />) : children}
		</AuthContext.Provider>
	);
};