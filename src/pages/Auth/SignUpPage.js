import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from "../../hooks/auth-provider";

const SignUpPage = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const { onSignUp } = useAuthDataContext();

  const onSubmit = (data) => {
    console.log(data);
    onSignUp(data);
    history.push('/login');
  }

  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign Up</h1>
        <label>Name</label>
        <input name="name" ref={register({ required: true})} />
        {errors.name?.type === "required" &&
        "Name is required"}
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

export default SignUpPage;