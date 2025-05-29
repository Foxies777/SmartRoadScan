import { LockOutlined, UserOutlined } from "@ant-design/icons";
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
    initialValues={{ remember: true }}
    autoComplete="off"
    labelAlign="left"
    onFinish={login}
  >
   <Form.Item
        label="Логин"
        name="login"
        rules={[
          {
            required: true,
            message: "Напишите логин пользователя!",
          },
        ]}
      >
        <Input placeholder="Логин"/>
      </Form.Item>
    <Form.Item
      label="Пароль"
      name="password"
      rules={[
        {
          required: true,
          min: 8,
          message: "Длина пароля должна составлять не менее 8 символов",
        },
      ]}
    >
      <Input.Password prefix={<LockOutlined />} />
    </Form.Item>

    <Form.Item>
      <Button block type="primary" htmlType="submit" loading={loading}>
        Войти
      </Button>
      или <Link to={SmartRoadScanRoutes.REGISTRATION}>Зарегестрироваться!</Link>
    </Form.Item>
  </Form>
  );
};

export default LoginForm;
