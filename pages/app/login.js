import GoogleLogin from 'react-google-login';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const loginHandler = async (res) => {
    fetch('/api/login', {
      method: 'POST',
      headers: { Authorization: `Barer ${res.tokenId}` },
    }).then(() => {
      router.push('/app/docs/home')
      localStorage.setItem('user', JSON.stringify(res.profileObj))
    })
  }

  const errorHandler = (res) => {
    console.log('vemos que onda');
  }
  return (
  <GoogleLogin
    clientId={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
    buttonText="Login"
    onSuccess={loginHandler}
    onFailure={errorHandler}
  />
)};

export default Login;
