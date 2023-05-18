import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

import { PageLoading } from "../../page-loading/PageLoading";
import { useAuth } from "../../../hooks/contexts/useAuth";

import "./signup.style.css";

type SignUpFormatter = {
	name: string;
	email: string;
	password1: string;
	password2: string;
}

export function Signup() {
	const [isLoadingSingUp, setIsLoadingSingUp] = useState(false);
	const { signup } = useAuth()

	async function handleUserSignUp(data: SignUpFormatter) {
		try {
			setIsLoadingSingUp(true);
			await signup(data.name, data.email, data.password1, data.password2);
		} catch(err) {
			message.error("Não foi possivel registra o usuario!");
		} finally {
			setIsLoadingSingUp(false);
		}
	}

	return (
		<>
			{isLoadingSingUp && <PageLoading inOtherPage />}
			<div className="center">
				<Card title="Registre sua conta" style={{ width: 400 }}>

					<Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
						onFinish={handleUserSignUp}
						autoComplete="off"
					>
						<Form.Item
							label="Email"
							name="email"
							rules={[{ required: true, message: 'Please input your email!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Nome"
							name="name"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Senha"
							name="password1"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item
							label="Digite sua senha novamente"
							name="password2"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>


						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button type="primary" htmlType="submit">
								Enviar
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		</>
	)
}