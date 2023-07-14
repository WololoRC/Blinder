import React, { useContext } from "react";
import useAuth from "./hooks/useAuth";
import CreateProfile from "./pages/CreateProfile";
import Profile from "./pages/Profile";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import EditProfile from "./pages/EditProfile";
import ChatContainer from "./pages/ChatContainer";
import Feed from "./pages/Feed";
import { ProtectedRoutes } from "./context/ProtectedRoutes";

const Application = ({ userStatus, userData }) => {
  const {headerSt} = useContext(UserContext);
/*   useAuth(headerSt); */

  /*  const { response } = useContext(UserContext);
  console.log(response.data.id); */

  return (
    <Routes>
      <Route index />
      {/* <Route path="feed" element={<Feed />} /> */}
      {/* <Route
          path="profile"
          element={
            <div className="">
              <Profile />
            </div>
          }
        /> */}
   <Route path="create_profile" element={ <ProtectedRoutes><CreateProfile /></ProtectedRoutes> } />
    <Route path="profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>  } />
  <Route path="feed" element={ <ProtectedRoutes><Feed /></ProtectedRoutes>  } />
  <Route path="editprof" element={  <ProtectedRoutes><EditProfile /></ProtectedRoutes>  } />
    </Routes>
  );
};

export default Application;
