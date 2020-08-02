export const getUser = () =>(
  window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {}
)

const setUser = user =>(
  window.localStorage.setItem("user", JSON.stringify(user))
)

export const handleLogin = (user) => {
  setUser(user)
  console.log('hasta aca llegas');
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.email
}
