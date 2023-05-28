import { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  web3: null,
  contract: null,
  address: null,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider
      value={{
        web3: state.web3,
        contract: state.contract,
        address: state.address,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
