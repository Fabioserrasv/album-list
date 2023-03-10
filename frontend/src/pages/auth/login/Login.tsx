import React from "react";
import { Form, Input, Button, Card} from "antd";

import { useAuth } from "../../../contexts/auth-context";

import './login.style.css';
import { Link } from "react-router-dom";
import { ROUTE } from "../../../config/route";

type LoginFormatter = {
    email: string;
    password: string;
}

export function Login() {
    const { login } = useAuth()

    async function handleUserLogin(data: LoginFormatter) {
        console.log(data)
        await login(data.email, data.password);
    } 

    return (
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
											rules={[{ required: true, message: 'Please input your password!' }]}
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
    )
}