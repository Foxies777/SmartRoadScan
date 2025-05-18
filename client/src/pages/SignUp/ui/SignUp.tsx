import { RegisterForm } from "widgets/RegisterForm"
import styles from '../styles/style.module.css'
const SignUp = () => {
  return (
    <div className={styles.container}>
    <h1>Регистрация</h1>
    <RegisterForm />
  </div>
  )
}

export default SignUp