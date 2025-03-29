import { useLogin } from "@features/login-user";
import { SmartRoadScanRoutes } from "@shared/utils/const";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [login, loading] = useLogin();
  return (
    <Form
      className="form"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={login}
    >
      <Form.Item
        label="Почта"
        name="email"
        rules={[
            {
              required: true,
              type: "email",
              pattern: new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
              message: "Заполните правильно почту!",
            },
          ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            min: 8,
            message: "Длина пароля должна составлять не менее 8 символов",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>Войти</Button>
        <Link className="button" to={SmartRoadScanRoutes.REGISTRATION}>
          Регистрация
          </Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
