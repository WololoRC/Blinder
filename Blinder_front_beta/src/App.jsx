import "./App.css";
import { useState, useEffect, CSSProperties } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ClipLoader from "react-spinners/BeatLoader";
import Loading from "./Loading";
// import { Feed } from "./pages/Feed";
import Register from "./components/Auth/Register";
import { Home } from "./pages/Home";
import { createContext } from "react";
import Feed from "./pages/Feed";
import ChatContainer from "./pages/ChatContainer";
import Login from "./components/Auth/Login";
import Application from "./Application";
import { AiOutlineUnorderedList } from "react-icons/ai";

// import { Profile } from "./pages/Profile";
/* import { ProtectedRoute } from "./components/Login/ProtectedRoute"; */
// import { CreateProfile } from "./pages/CreateProfile";
// import { ProtectedRoutes } from "./context/ProtectedRoutes";

export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [response, setResponse] = useState({});
  const [userNickname, setUserNickname] = useState("");
  const [navbarState, setNavbarState] = useState(true);
  const [tagsGlobal, setTagsGlobal] = useState([]);
  const [switchArrow, setSwitchArrow] = useState(false);
  const [globalName, setGlobalName] = useState("");
  const [chatId, setChatId] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [headerSt, setheaderSt] = useState(localStorage.getItem("headerSt"));
  const [globalSkipIndex, setGlobalSkipIndex] = useState(0);
  const [chatOn, setChatOn] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, [4000]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        globalSkipIndex,
        chatOn,
        newMessage,
        setNewMessage,
        setChatOn,
        setGlobalSkipIndex,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        response,
        setResponse,
        userNickname,
        setUserNickname,
        navbarState,
        setNavbarState,
        switchArrow,
        setSwitchArrow,
        tagsGlobal,
        setTagsGlobal,
        globalName,
        setGlobalName,
        chatId,
        setChatId,
        messages,
        setMessages,
        isLogin,
        setIsLogin,
        headerSt,
        setheaderSt,
        usersData,
        setUsersData,
      }}
    >
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/*   <Route path="chat" element={<ChatContainer />} /> */}
            <Route path="register" element={<Register />} />

            <Route
              path="app/*"
              element={<Application userStatus={isLoggedIn} id={userData} />}
            />
            <Route path="*" element={<div>Error 404 not found</div>} />
          </Routes>
        </BrowserRouter>
      )}
    </UserContext.Provider>
  );
}
export default App;