import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from "../../hooks/auth-provider";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const { onLogin } = useAuthDataContext();

  const onSubmit = (data) => {
    console.log(data);
    onLogin(data);
    history.push('/');
  }

  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <label>Email</label>
        <input name="email" ref={register({ required: true})} />
        {errors.email?.type === "required" &&
        "Email is required"}
        <label>Password</label>
        <input name="password" ref={register({ required: true})} />
        {errors.password?.type === "required" &&
        "Password is required"}
        <input type="submit" />
      </form>
    </div>
  )
}

export default LoginPage;