const STORAGE = {
  TOKEN: "token",
  USER_INFO: "user-info",
  REMEMBER_LOGIN: "remember-login",
  KEY_MENU_ACTIVE: "key-active",
}

export const getStorage = name => {
  const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  let data
  if (remember) {
    data =
      typeof window !== "undefined" && name !== undefined
        ? localStorage.getItem(name)
        : ""
  } else {
    data =
      typeof window !== "undefined" && name !== undefined
        ? sessionStorage.getItem(name)
        : ""
  }
  try {
    if (data) return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const setStorage = (name, value) => {
  const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  const stringify = typeof value !== "string" ? JSON.stringify(value) : value
  if (remember) {
    return localStorage.setItem(name, stringify)
  } else {
    return sessionStorage.setItem(name, stringify)
  }
}

export const deleteStorage = name => {
  const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  if (remember) {
    return localStorage.removeItem(name)
  } else {
    return sessionStorage.removeItem(name)
  }
}

export const clearStorage = () => {
  const remember = localStorage.getItem(STORAGE.REMEMBER_LOGIN)
  if (remember) {
    return localStorage.clear()
  } else {
    return sessionStorage.clear()
  }
}

export default STORAGE
