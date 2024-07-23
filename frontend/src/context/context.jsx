import { createContext, useEffect, useState } from "react";

const Context = createContext();

const Provider = (props) => {
  const [isLoggedIn, setLog] = useState(false);
  const [login, setLogin] = useState(false);

  const update = (flag) => {
    setLog(flag);
    localStorage.setItem("loggedIn", flag);
  };
  const updateLogin = (flag) => {
    setLogin(flag);
    localStorage.setItem("login", flag);
  };
  useEffect(() => {
    setLog(localStorage.getItem("loggedIn") || false);
    setLogin(localStorage.getItem("login") || false);
  }, [isLoggedIn, login]);
  return (
    <Context.Provider
      value={{ isLoggedIn, update, login, setLogin, updateLogin }}
    >
      {props.children}
    </Context.Provider>
  );
};
export { Context, Provider };
