import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

import { PageLoading } from "../../page-loading/PageLoading";
import { useAuth } from "../../../hooks/contexts/useAuth";

import {
	alphanumericInput,
	confirmInput,
	minimumCharactersInput,
	noSpaceInput,
	requireInput
} from "../../../utils/rules-antd";

import "./signup.style.css";

type SignUpFormatter = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export function Signup() {
	const [isLoadingSingUp, setIsLoadingSingUp] = useState(false);
	const { signup } = useAuth()

	async function handleUserSignUp(data: SignUpFormatter) {
		try {
			setIsLoadingSingUp(true);
			await signup(data.name, data.email, data.password, data.confirmPassword);
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
							rules={[requireInput('Por favor, preencha a e-mail')]}
						>
							<Input />
						</Form.Item>

						<Form.Item
							label="Nome"
							name="name"
							rules={[requireInput('Por favor, preencha a nome do usuário')]}
						>
							<Input />
						</Form.Item>

						<Form.Item														
							name="password"
							label="Senha"
							rules={[
								requireInput("Por favor, preencha a senha"),
								noSpaceInput("A senha não pode conter espaços"),
								minimumCharactersInput(8, "A senha deve ter no mínimo 8 caracteres"),
								alphanumericInput("A senha deve conter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caracter especial")
							]}
						>
							<Input.Password placeholder="Senha" />
						</Form.Item>

						<Form.Item
							name="confirmPassword"
							label="Confirmar Senha"
							rules={[
								requireInput("Por favor, preencha o confirmar senha"),
								noSpaceInput("O confirmar senha não pode conter espaços"),
								minimumCharactersInput(8, "O confirmar senha deve ter no mínimo 8 caracteres"),
								alphanumericInput("O confirmar senha deve conter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caracter especial"),
								confirmInput("password", "Confirmar senha diferente de senha")
							]}
						>
							<Input.Password placeholder="Confirmar Senha"/>
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