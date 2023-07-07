import React from "react";
import ChatBox from "./components/ChatBox";
import SendMessages from "./components/SendMessages";
import SideBarWCard from "../components/SideBarWCard";
import { UserContext } from "../App";

import { useContext } from "react";

const ChatContainer = ({ chat_uid, userIndex, myUserId, recieve, chatId }) => {
  console.log(chat_uid);
  console.log(myUserId);

  const { lightMode, index } = useContext(UserContext);

  return (
    <>
      <div
        className={
          lightMode
            ? "h-screen  bg-white"
            : "h-screen  bg-gradient-to-l from-black1 to-black3"
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
