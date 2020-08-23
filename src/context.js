import React, { useState } from "react";

export const Context = React.createContext();

export function Provider(props) {
  const [results, setResults] = useState(null);

  return (
    <Context.Provider value={[results, setResults]}>
      {props.children}
    </Context.Provider>
  );
}
