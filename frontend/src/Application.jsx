import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Feed from "./pages/Feed";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./App";
import { ProtectedRoutes } from "./context/ProtectedRoutes";
const Application = ({ userStatus, userData }) => {
  const {headerSt} = useContext(UserContext);

  return (
    <Routes>
      <Route index />
   <Route path="create_profile" element={ <ProtectedRoutes><CreateProfile /></ProtectedRoutes> } />
    <Route path="profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>  } />
  <Route path="feed" element={ <ProtectedRoutes><Feed /></ProtectedRoutes>  } />
  <Route path="editprof" element={  <ProtectedRoutes><EditProfile /></ProtectedRoutes>  } />
    </Routes>
  );
};

export default Application;
