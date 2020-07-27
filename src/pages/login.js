import React from 'react';
import GoogleLogin from 'react-google-login'
import { navigate } from "gatsby"


const loginSucces = (res) => {
  console.log('success ======>', res);
  navigate(`/`)
}

const loginFail = (res) => {
  console.log('fail ======>', res);
}

const Login = () => (
  <GoogleLogin
    clientId={process.env.GOOGLE_API_KEY}
    buttonText="Login"
    onSuccess={loginSucces}
    onFailure={loginFail}
  />
);

export default Login;
