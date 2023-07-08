import React, { useState, useEffect } from "react";
import { SideBarProfile } from "./SideBarProfile";
import { DiscoverMatches } from "./DiscoverMatches";
import { MessagesBar } from "./MessagesBar";
import { Matches } from "./Matches";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import SideBarST2 from "./classes/SideBarST2.css";
import { CiCircleChevDown } from "react-icons/ci";
import { CiChat2 } from "react-icons/ci";
import { FiChevronsDown } from "react-icons/fi";
import { BiMoon } from "react-icons/bi";
import { FaRegWindowClose, FaAdjust, FaBell } from "react-icons/fa";
import blinder from "../api/blinder";
import ChatContainer from "../pages/ChatContainer";
import { current } from "tailwindcss/colors";

function SideBarWCard({ feedData }) {
  const [componentes, setComponentes] = useState([]);
  const [hideComponent, setHideComponent] = useState(false);

  const [chatOn, setChatOn] = useState(false);

  const [chatId, setChatId] = useState("");

  const [chat_uid, setChatUid] = useState("");

  const [myUserId, setMyUserId] = useState("");

  const [userOneState, setUserOneState] = useState("");

  const [userTwoState, setUserTwoState] = useState("");

  const {
    clicked,
    setClicked,
    navbarState,
    setNavbarState,
    globalName,
    userData,
  } = useContext(UserContext);

  const toggleHide = () => {
    setHideComponent((prevHideComponent) => !prevHideComponent);
    setClicked(!clicked);
  };

  const handleClickMessage = () => {
    setChatOn(true);
  };

  const navigate = useNavigate();

  const agregarComponente = (name) => {
    if (name) {
      const nuevoComponente = (
        <div onClick={handleClickMessage}>
          <MessagesBar name={name} />{" "}
        </div>
      );
      setComponentes((prevComponentes) => [
        ...prevComponentes,
        nuevoComponente,
      ]);
    }
  };

  useEffect(() => {
    const getChats = async () => {
      const res = await blinder.get(`/chat/inbox/${userData.id}/`);
      console.log(JSON.stringify(res) + "soy el chat");

      if (
        Array.isArray(res.data["as user_one"]) &&
        res.data["as user_one"].length === 0
      ) {
        const userTwo =
          res.data["as user_two"][0]["user_one"]["user"]["username"];

        const userId = res.data["as user_two"][0]["user_one"]["id"];
        setChatId(userId);

        const messageId = res.data["as user_two"][0].id;
        console.log(messageId);
        setChatUid(messageId);

        agregarComponente(userTwo);
      } else {
        const userOne =
          res.data["as user_one"][0]["user_two"]["user"]["username"];

        setMyUserId(userOne);
        const userId = res.data["as user_one"][0]["user_two"]["id"];
        setChatId(userId);
        const messageId = res.data["as user_one"][0].id;

        console.log(messageId);
        setChatUid(messageId);
        agregarComponente(userOne);
        setUserOneState(userOne);
      }
      setMyUserId(userData.id);
      // !!! Puede que no funcione para 1 de los 2 perfiles
      // setChatUid(messageId);
    };
    getChats();
  }, [userData.id]);

  if (chatOn) {
    return (
      <ChatContainer chatId={chatId} chat_uid={chat_uid} myUserId={myUserId} />
    );
  }

  return (
    <>
      <div
        className={
          navbarState ? "navbar-hidecomponent hidden" : "navbar-hidecomponent"
        }
      >
        {" "}
        <div className="left-icon">
          <FaAdjust />
        </div>
        <button className="" onClick={toggleHide} id="">
          {hideComponent ? (
            <CiChat2 size={30} />
          ) : (
            <div className="right-icon">
              <FaRegWindowClose size={30} />
            </div>
          )}
        </button>
      </div>
      <div className="flex">
        {!hideComponent && (
          <div className="flex flex-col bg-epicblack border-r-2 border-gray-500 border-solid sidebar-container h-screen overflow-y-auto ml-50">
            <div>
              <SideBarProfile />
            </div>

            {/*    <div>
              <DiscoverMatches />
            </div>
 */}
            <div>
              {/* <div className="flex items-center">
                <h1 className="text-brightpink opacity-70 text-xl">Messages</h1>
                <div className="ring-bell ml-2">
                  <FaBell />
                </div>
              </div> */}
              {componentes}
              {/* <form onLoad={handleSubmit}>
                <input type="text" name="name" placeholder="Enter name" />
              </form> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SideBarWCard;
