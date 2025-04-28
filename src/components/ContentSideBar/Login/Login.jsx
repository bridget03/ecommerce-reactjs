import { useState, useContext } from 'react';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import styles from './styles.module.scss';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import Button from '@components/Button/Button';
import { ToastContext } from '@/contexts/ToastProvider';

import { register, signIn, getInfo } from '@/apis/authService';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/StoreProvider';
import Cookies from 'js-cookie';

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useContext(ToastContext);
  const { setIsOpen, handleGetListProductCart } = useContext(SideBarContext);
  const { setUserId } = useContext(StoreContext);

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string(),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      cfPassword: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'Passwords must match'
      ),
    }),
    onSubmit: async (values) => {
      if (isLoading) return;

      const { username, email, password } = values;
      setIsLoading(true);

      if (!isRegistered) {
        await register({ username, password })
          .then((res) => {
            toast.success(res.data.message);
            setIsLoading(false);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            setIsLoading(false);
          });
      }

      if (isRegistered) {
        await signIn({ username, password })
          .then((res) => {
            setIsLoading(false);
            const { id, token, refreshToken } = res.data;
            setUserId(id);
            Cookies.set('token', token);
            Cookies.set('refreshToken', refreshToken);
            Cookies.set('userId', id);
            toast.success('Login successful');
            setIsOpen(false);
            handleGetListProductCart(id, 'cart');
          })
          .catch((err) => {
            setIsLoading(false);
            toast.error('Login false');
          });
      }
    },
  });

  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const handleToggle = () => {
    setIsRegistered(!isRegistered);
    formik.resetForm();
  };

  return (
    <div>
      <h2 className={styles.title}>{isRegistered ? 'Sign In' : 'Sign Up'}</h2>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {/* <div className={styles.boxInput}>
          <label>
            User name <span>*</span>
          </label>
          <input
            id='username'
            type='text'
            placeholder='Username'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username && (
            <p className={styles.error}>{formik.errors.username}</p>
          )}
        </div> */}

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
        {!isRegistered ? (
          <div className={styles.boxInput}>
            <label>
              Confirm Password <span>*</span>
            </label>
            <input
              id='cfPassword'
              name='cfPassword'
              type={isShowPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              className={styles.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.cfPassword}
              isRequired
            />
            <div className={styles.btnIcon} onClick={handleShowPassword}>
              {isShowPassword ? <FiEyeOff /> : <FiEye />}
            </div>
            {formik.errors.cfPassword && formik.touched.cfPassword && (
              <p className={styles.error}>{formik.errors.cfPassword}</p>
            )}
          </div>
        ) : null}
        {isRegistered ? (
          <div className={styles.checkBox}>
            <input
              id='rememberMe'
              type='checkbox'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span>Remember me</span>
          </div>
        ) : null}

        <div className={styles.btnGroup}>
          <div
            className={styles.btn}
            // onClick={() => {
            //   toast.success('Success');
            // }}
          >
            <Button
              type='submit'
              content={
                isLoading ? 'Loading...' : isRegistered ? 'Login' : 'Register'
              }
            />
          </div>
          <div className={styles.btn} onClick={handleToggle}>
            <Button
              type='button'
              isPrimary={false}
              content={
                isRegistered
                  ? "Don't have an account?"
                  : 'Already have an account?'
              }
            />
          </div>
        </div>
      </form>

      <div className={styles.forgotPassword}>Lost your password?</div>
    </div>
  );
}

export default Login;
