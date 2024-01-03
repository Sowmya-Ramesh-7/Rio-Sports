import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import reducer from '../reducer/userReducer.js'

const UserContext = createContext();

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
    
  const setUser = async (user) => {
    dispatch({ type: 'SET_LOADING' });
    try {
      dispatch({ type: 'SET_API_DATA', payload: user });
    } catch (error) {
      dispatch({ type: 'API_ERROR', payload: error });
    }
  };

  return (
    <UserContext.Provider value={{ ...state , setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };