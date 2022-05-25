import React, { useReducer } from 'react';
import { Actions, AppState, defaultState, reducer } from 'src/store/reducer';

const AppContext = React.createContext<[AppState, React.Dispatch<Actions>]>([
  defaultState,
  () => undefined,
]);

export const useAppContext = () => React.useContext(AppContext);

const AppProvider: React.FC = ({ children }) => {
  const useReducerReturn = useReducer(reducer, defaultState);

  return (
    <AppContext.Provider value={useReducerReturn}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
