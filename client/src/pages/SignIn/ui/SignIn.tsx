import { LoginForm } from "@widgets/LoginForm";
import styles from '../styles/style.module.css'

const SignIn = () => {
  return (
    <div className={styles.container}>
      <h1>Вход</h1>
      <LoginForm />
    </div>
  );
};

export default SignIn;
