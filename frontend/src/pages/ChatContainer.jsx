import React from "react";
import ChatBox from "./components/ChatBox";
import SendMessages from "./components/SendMessages";
import SideBarWCard from "../components/SideBarWCard";
import { UserContext } from "../App";
import "./styles/ChatContainer.css"
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
        <div className="  z-10  text-neutral-content">
        <div className="absolute top-3">
          <button onClick={handleArrowBack}>
            {" "}
            <IoIosArrowBack color="blue" size={20} />
          </button>
        </div>
        <p className={lightMode ? "text-white text-2xl" : "text-black text-lg "}>
          {nameh1}
        </p>
      </div></div> 
    <div className="bg-gradient-to-r from-black1 to-black3 h-full mx-auto ">
    <div className="">
      <div
        className={
          lightMode ? "  bg-white" : "  h-screen bg-gradient-to-l from-black1 to-black3"
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
      </div>
      </div>
    </>
  );
};
export default ChatContainer;
