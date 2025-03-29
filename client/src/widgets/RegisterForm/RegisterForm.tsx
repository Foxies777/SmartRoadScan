import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useRegister } from "features/register-user";
import { SmartRoadScanRoutes } from "shared/utils/const";
import MaskedInput from "antd-mask-input";
const RegisterForm = () => {
  const [register, loading] = useRegister();
  return (
    <Form
      className="form"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={register}
    >
      <Form.Item
        label="Фамилия"
        name="surname"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Имя"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Отчество"
        name="patronymic"
        rules={[
          {
            required: false,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
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
        label="Телефон"
        name="phone"
        rules={[
          {
            required: true,
            message: "Пожалуйста, введите ваш телефон!",
          },
          {
            pattern: /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
            message: "Телефон должен быть в формате +7 (___) ___-__-__",
          },
        ]}
      >
        <MaskedInput
          mask="+7 (000) 000-00-00"
          placeholder="+7 (___) ___-__-__"
        />
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
        <div className="buttons">
          <Button type="primary" htmlType="submit" loading={loading}>
            Регистрация
          </Button>
          <Link className="button" to={SmartRoadScanRoutes.LOGIN}>
            Войти
          </Link>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
