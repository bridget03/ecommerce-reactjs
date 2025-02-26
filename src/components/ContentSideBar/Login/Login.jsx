import { useState } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import styles from './styles.module.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div>
      <h2 className={styles.title}>Sign in</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.boxInput}>
          <label>
            Email <span>*</span>
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <p className={styles.error}>{formik.errors.email}</p>
          )}
        </div>

        <div className={styles.boxInput}>
          <label>
            Password <span>*</span>
          </label>
          <input
            id='password'
            name='password'
            type={isShowPassword ? 'text' : 'password'}
            placeholder='Password'
            className={styles.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className={styles.btnIcon} onClick={handleShowPassword}>
            {isShowPassword ? <FiEyeOff /> : <FiEye />}
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className={styles.error}>{formik.errors.password}</p>
          )}
        </div>

        <div className={styles.checkBox}>
          <input
            id='password'
            type='checkbox'
            // onBlur={handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
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
