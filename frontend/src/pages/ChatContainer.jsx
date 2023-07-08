import React from "react";
import ChatBox from "./components/ChatBox";
import SendMessages from "./components/SendMessages";
import SideBarWCard from "../components/SideBarWCard";
import { UserContext } from "../App";

import { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";

const ChatContainer = ({ chat_uid, userIndex, myUserId, recieve, chatId }) => {
  console.log(chat_uid);
  console.log(myUserId);

  const handleArrowBack = () => {
    setChatOn(!chatOn);
    console.log("CLICKED");
  };

  const { lightMode, index, nameh1, chatOn, setChatOn } =
    useContext(UserContext);

  return (
    <>
      <div
        className={
          lightMode
            ? "bg-gradient-to-r from-black1 to-black3 pb-4 text-center"
            : "bg-white pb-4 text-center"
        }
      >
        <div className="absolute top-3">
          <button onClick={handleArrowBack}>
            {" "}
            <IoIosArrowBack color="blue" size={20} />
          </button>
        </div>
        <p className={lightMode ? "text-white text-lg" : "text-black text-lg"}>
          {nameh1}
        </p>
      </div>
      <div
        className={
          lightMode ? "  bg-white" : "  bg-gradient-to-l from-black1 to-black3"
        }
      >
        <ChatBox
          chatid={chatId}
          myUserId={myUserId}
          userIndex={userIndex}
          index={index}
        />
        <SendMessages
          chatId={chatId}
          chat_uid={chat_uid}
          myUserId={myUserId}
          userIndex={userIndex}
        />
      </div>
    </>
  );
};
export default ChatContainer;
