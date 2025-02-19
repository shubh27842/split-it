import React, { useReducer } from "react";
import { reducer } from "./reducer";
import PropTypes from "prop-types";

const initialState = {
  user: null,
};

export const AppContext = React.createContext({
  user: null,
});

export const AppContextProvider = ({ children }) => {
  const [context, dispatch] = useReducer(reducer, initialState);

  const addUser = (user) => {
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };

  const removeUser = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  };
  return (
    <AppContext.Provider
      value={{
        store: context,
        login: addUser,
        logout: removeUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
