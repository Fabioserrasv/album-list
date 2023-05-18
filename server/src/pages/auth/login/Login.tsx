
import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Card, message } from "antd";

import { PageLoading } from "../../page-loading/PageLoading";
import { useAuth } from "../../../hooks/contexts/useAuth";

import { ROUTE } from "../../../config/route";


import './login.style.css';

type LoginFormatter = {
	email: string;
	password: string;
}

export function Login() {
	const [isLoadingLogin, setIsLoadingLogin] = useState(false);
	const { login } = useAuth();

	async function handleUserLogin(data: LoginFormatter) {
		try {
			setIsLoadingLogin(true);
			await login(data.email, data.password);
		} catch(err) {
			message.error("Não foi possivel fazer o login!");
		} finally {
			setIsLoadingLogin(false);
		}
	}

	return (
		<>
			{isLoadingLogin && <PageLoading inOtherPage />}
			<div className="center">
				<Card title="Login" style={{ width: 400 }}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						onFinish={handleUserLogin}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Senha"
							name="password"
							rules={[
								{ required: true, message: 'Please input your password!' },
								{ min: 8, message: "12"}
							]}
						>
							<Input.Password />
						</Form.Item>


						<Form.Item wrapperCol={{ offset: 12, span: 24 }}>
							<Button type="primary" htmlType="submit">
								Enviar
							</Button>
						</Form.Item>
						<Link to={ROUTE.APP.SIGN_UP}>Registre-se</Link>
					</Form>
				</Card>
			</div>
		</>
	)
}