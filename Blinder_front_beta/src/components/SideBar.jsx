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
import { BsChatDots } from "react-icons/bs";

function SideBar({ feedData }) {
  const [componentes, setComponentes] = useState([]);
  const [hideComponent, setHideComponent] = useState(false);

  const [chatId, setChatId] = useState("");

  const [chat_uid, setChatUid] = useState("");

  const [myUserId, setMyUserId] = useState("");

  const [users, setUsers] = useState([]);

  const [userOneState, setUserOneState] = useState("");

  const [userTwoState, setUserTwoState] = useState("");

  const [userIndex, setUserIndex] = useState(0);

  const {
    clicked,
    setClicked,
    navbarState,
    setNavbarState,
    globalName,
    userData,
    globalSkipIndex,
    chatOn,
    setChatOn,
    usersData,
    setUsersData,
  } = useContext(UserContext);

  const toggleHide = () => {
    setHideComponent((prevHideComponent) => !prevHideComponent);
    setClicked(!clicked);
  };

  const handleClickMessage = (index) => {
    setUserIndex(index);
    setChatOn(true);

    console.log(JSON.stringify(usersData[userIndex]) + " IM USER DATA INDEX");
  };

  /*   const agregarComponente = (name) => {
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
  }; */

  const agregarComponente = (name) => {
    if (name) {
      setComponentes((prevComponentes) => [
        ...prevComponentes,
        <MessagesBar name={name} />,
      ]);
    }
  };

  /*   useEffect(() => {
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
    
    };
    getChats();
  }, [userData.id]); */

  /*   useEffect(() => {
    const getChats = async () => {
      try {
        const response = await blinder.get(`/chat/inbox/${userData.id}/`);
        const data = response.data;

        const userOneChats = data["as user_one"] || [];
        const userTwoChats = data["as user_two"] || [];

        const userOneNames = userOneChats.map(
          (chat) => chat["user_two"]["user"]["username"]
        );
        const userTwoNames = userTwoChats.map(
          (chat) => chat["user_one"]["user"]["username"]
        );

        const allUsers = [...userOneNames, ...userTwoNames];
        setUsers(allUsers);

        userOneChats.forEach((chat) => {
          const userId = chat["user_two"]["id"];
          setChatId(userId);
          const messageId = chat.id;
          console.log(messageId);
          setChatUid(messageId);
          agregarComponente(chat["user_two"]["user"]["username"]);
        });

        userTwoChats.forEach((chat) => {
          const userId = chat["user_one"]["id"];
          setChatId(userId);
          const messageId = chat.id;
          console.log(messageId);
          setChatUid(messageId);
          agregarComponente(chat["user_one"]["user"]["username"]);
        });

        setMyUserId(userData.id);
      } catch (error) {
        console.error("Could not fetch chats:", error);
      }
    };

    getChats();
  }, [userData.id]); */

  useEffect(() => {
    const getChats = async () => {
      try {
        const response = await blinder.get(`/chat/inbox/${userData.id}/`);
        const data = response.data;

        const userOneChats = data["as user_one"] || [];
        const userTwoChats = data["as user_two"] || [];

        const allUsersData = [
          ...userOneChats.map((chat) => chat["user_two"]["id"]),
          ...userTwoChats.map((chat) => chat["user_one"]["id"]),
        ];
        setUsersData(allUsersData);

        userOneChats.forEach((chat) => {
          const userId = chat["user_two"]["id"];
          // setChatId(userId);
          const messageId = chat.id;
          console.log(messageId);
          setChatUid(messageId);
          agregarComponente(chat["user_two"]["user"]["username"]);
        });

        userTwoChats.forEach((chat) => {
          const userId = chat["user_one"]["id"];
          setChatId(userId);
          const messageId = chat.id;
          console.log(messageId);
          // setChatUid(messageId);
          agregarComponente(chat["user_one"]["user"]["username"]);
        });

        setMyUserId(userData.id);
      } catch (error) {
        console.error("Could not fetch chats:", error);
      }
    };

    getChats();
  }, [usersData.id]);

  const renderedComponents = componentes.map((component, index) => (
    <div key={index} onClick={() => handleClickMessage(index)}>
      {component}
    </div>
  ));

  if (chatOn) {
    return (
      <ChatContainer
        /*   chatId={chatId} */
        chat_uid={chat_uid}
        myUserId={myUserId}
        userIndex={userIndex}
      />
    );
  }

  return (
    <>
      <div className="drawer bg-gradient-to-r from-black1 to-black3">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Matches />
          <label
            htmlFor="my-drawer"
            className="bg-epicblack text-white absolute top-0 left-0 ml-20 mt-2"
          >
            <BsChatDots />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-epicblack text-base-content">
            <div className="flex flex-col bg-epicblack border-solid sidebar-container h-screen overflow-y-auto flex-shrink ">
              <div>{renderedComponents}</div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
