import { createContext, useState } from "react";

export const authcontext = createContext();

export default function AuthContextprovider({ children }) {
  const [userislogin, setuserislogin] = useState(
    !!localStorage.getItem("token")
  );

  //  if(localStorage.getItem('token')!=null){
  //     setuserislogin(true)
  //  }

  return (
    <authcontext.Provider value={{ userislogin, setuserislogin }}>
      {children}
    </authcontext.Provider>
  );
}
