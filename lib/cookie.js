import { serialize } from "cookie"

const TOKEN_NAME = "api_token"
const MAX_AGE = 60 * 60 * 8

function createCookie(name, data, options = {}) {
  return serialize(name, data, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...options,
  })
}

export const setTokenCookie = (res, token, user_id) => {
  res.setHeader("Set-Cookie", [
    createCookie(TOKEN_NAME, token),
    createCookie("authed", true, { httpOnly: false }),
    createCookie("user_id", user_id, { httpOnly: false })
  ])
}

export const getAuthToken = (cookies) => {
  return cookies[TOKEN_NAME]
}

export const destroyCookies = (res, cookies) => {
  const newCookies = [];
  for (let prop in cookies) {
    if (cookies.hasOwnProperty(prop)) {
      newCookies.push(serialize(prop, '', {
        maxAge: -1,
        path: '/',
      }))
    }
  }
  res.setHeader('Set-Cookie', newCookies);
  res.end();
}
