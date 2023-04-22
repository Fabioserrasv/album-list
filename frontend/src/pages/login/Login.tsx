
import { Form, Input, Button} from "antd";
import { PageLoading } from "../page-loading/PageLoading";

import { useAuth } from "../../hooks/contexts/useAuth";

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
    <div>
      <PageLoading />
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


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}