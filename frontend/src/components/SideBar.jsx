import "./classes/SideBarST2.css";
import React, { useState, useEffect } from "react";
import { MessagesBar } from "./MessagesBar";
import { Matches } from "./Matches";
import { useContext } from "react";
import { UserContext } from "../App";
import blinder from "../api/blinder";
import ChatContainer from "../pages/ChatContainer";
import { BsChatDots } from "react-icons/bs";

function SideBar() {
  const [componentes, setComponentes] = useState([]);

  const [chatId, setChatId] = useState("");

  const [chat_uid, setChatUid] = useState("");

  const [myUserId, setMyUserId] = useState("");

  const [userOneState, setUserOneState] = useState("");

  const {
    userData,
    lightMode,
    setIndex,
    chatOn,
    setChatOn,
    setNameH1,
    globalName,
  } = useContext(UserContext);

  const handleClickMessage = (index) => {
    setChatOn(true);
    setIndex(index);
  };

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

      if (
        Array.isArray(res.data["as user_one"]) &&
        res.data["as user_one"].length > 0
      ) {
        res.data["as user_one"].forEach((chatData) => {
          const userTwo = chatData["user_two"]["user"]["username"];
          const userId = chatData["user_two"]["id"];
          const messageId = chatData.id;

          setChatId(userId);
          setChatUid(messageId);
          setNameH1(userTwo);
          agregarComponente(userTwo);
        });
      } else if (
        Array.isArray(res.data["as user_two"]) &&
        res.data["as user_two"].length > 0
      ) {
        res.data["as user_two"].forEach((chatData) => {
          const userOne = chatData["user_one"]["user"]["username"];
          const userId = chatData["user_one"]["id"];
          const messageId = chatData.id;

          setChatId(userId);
          setChatUid(messageId);
          setNameH1(userOne);
          agregarComponente(userOne);
          setUserOneState(userOne);
        });
      }
      setMyUserId(userData.id);
    };
    getChats();
  }, [globalName]);

  const renderedComponents = componentes.map((component, index) => (
    <div key={index} onClick={() => handleClickMessage(index)}>
      {component}
    </div>
  ));

  if (chatOn) {
    return (
      <ChatContainer chatId={chatId} chat_uid={chat_uid} myUserId={myUserId} />
    );
  }

  return (
    <>
      <div
        className={
          lightMode
            ? "drawer bg-gradient-to-r from-black1 to-black3"
            : "drawer bg-gradient-to-r from-white to-gray-300"
        }
      >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Matches />
          <label
            htmlFor="my-drawer"
            className={
              lightMode
                ? "bg-epicblack text-black absolute top-0 left-0 ml-20 mt-2"
                : "bg-white text-white absolute top-0 left-0 ml-20 mt-2"
            }
          >
            <BsChatDots color={lightMode ? "white" : "black"} />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul
            className={
              lightMode
                ? "menu p-4 w-80 h-full bg-black2 text-base-content"
                : "menu p-4 w-80 h-full bg-white text-base-content"
            }
          >
            <div
              className={
                lightMode
                  ? "flex flex-col bg-black2 border-solid sidebar-container h-screen overflow-y-auto flex-shrink"
                  : "flex flex-col bg-white border-solid sidebar-container h-screen overflow-y-auto flex-shrink"
              }
            >
              <div>{renderedComponents}</div>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
