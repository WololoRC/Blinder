import { UserContext } from "../App";
 import { useContext } from "react";
 import { Navigate } from "react-router-dom";

export function ProtectedRoutes({ children }) {
   const { headerSt } = useContext(UserContext);
   console.log(headerSt);

   if (headerSt) {
     return <>{children}</>;
   } else {
     return <Navigate to="/login" />;   }

}