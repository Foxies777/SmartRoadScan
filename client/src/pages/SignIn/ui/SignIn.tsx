import { LoginForm } from "@widgets/LoginForm";
import styles from '../styles/style.module.css'
import { useUnit } from "effector-react";
import { $isAuth } from "@entities/user/model";

const SignIn = () => {
  const isAuth = useUnit($isAuth)
  console.log(isAuth);
  
  return (
    <div className={styles.container}>
      <h1>Вход</h1>
      <LoginForm />
    </div>
  );
};

export default SignIn;
