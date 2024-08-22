import { createContext, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const AuthContext = createContext({});

export const LOGIN_URL = "users/login";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState("");

  async function loginUser({ email, password }) {
    try {
      const { data: res } = await axios.post(`${BASE_URL}/${LOGIN_URL}`, {
        email,
        password,
      });
      const accessToken = res.data.accessToken;
      setUser(res.data.user);
      setAuth({ user, accessToken });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, loginUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
