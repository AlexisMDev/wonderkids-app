import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
  const [user, setUser] = useState(null);

  useEffect( () => {
    const token = localStorage.getItem('token');
    if(token){
      setUser({token});
    }
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}