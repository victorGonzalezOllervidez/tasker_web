import { useRouter } from 'next/router'

const Router = ({ component: Component, ...rest }) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (!(document.cookie && document.cookie.includes('authed')) && router.pathname !== '/app/login') {
      router.push('/app/login')
      return null
    }
    // else if (router.pathname === '/app/login') {
    //   router.push('/app/dashboard')
    // }
  }
    return (
      <Component {...rest} />
    )
}

export default Router
