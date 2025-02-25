import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import styles from './styles.module.scss';

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div>
      <h2 className={styles.title}>Sign in</h2>
      <form className={styles.form}>
        <div className={styles.boxInput}>
          <label>
            Email <span>*</span>
          </label>
          <input type='text' placeholder='Email' />
        </div>
        <div className={styles.boxInput}>
          <label>
            Password <span>*</span>
          </label>
          <input
            type={isShowPassword ? 'text' : 'password'}
            placeholder='Password'
            className={styles.password}
          />
          <div className={styles.btnIcon} onClick={handleShowPassword}>
            {isShowPassword ? <FiEyeOff /> : <FiEye />}
          </div>
        </div>

        <div className={styles.checkBox}>
          <input type='checkbox' />
          <span>Remember me</span>
        </div>

        <div className={styles.btnGroup}>
          <button type='submit'>Login</button>
        </div>

        <div className={styles.forgotPassword}>Lost your password?</div>
      </form>
    </div>
  );
}

export default Login;
