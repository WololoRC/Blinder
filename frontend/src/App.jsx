import "./App.css";
import Login from "./components/Auth/Login";
import Application from "./Application";
import { useState, useEffect} from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Loading from "./Loading";
import Register from "./components/Auth/Register";
import { Home } from "./pages/Home";
import { createContext } from "react";
export const UserContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
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
  const [lightMode, setLightMode] = useState(true);
  const [userTwoTyping, setUserTwoTyping] = useState("");
  const [makeAlert, setMakeAlert] = useState(false);
  const [index, setIndex] = useState(0);
  const [nameh1, setNameH1] = useState("");
  const [showBlock, setShowBlock] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, [2000]);
  }, []);

  return (
    <UserContext.Provider
      value={{
        showBlock,
        setShowBlock,
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
        lightMode,
        setLightMode,
        userTwoTyping,
        setUserTwoTyping,
        makeAlert,
        setMakeAlert,
        index,
        setIndex,
        nameh1,
        setNameH1,
      }}
    >
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
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
