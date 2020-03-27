import React, { createContext, useState } from 'react';

const AppContext = createContext({
  employees: [],
  isLoading: false,
  error: false
});

function AppProvider(props) {
  const [employees, setEmployees] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(false)
  const {children} = props;

  return (
    <AppContext.Provider
      value={{
        employees,
        setEmployees,
        isFetching,
        setIsFetching,
        setError,
        error
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider };