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

const Application = ({ userStatus, userData }) => {
  useAuth(userStatus);

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
      <Route path="create_profile" element={<CreateProfile />} />
      <Route path="profile" element={<Profile />} />
      <Route path="feed" element={<Feed />} />
      <Route path="editprof" element={<EditProfile />} />
    </Routes>
  );
};

export default Application;
