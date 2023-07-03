import React from "react";
import ChatBox from "./components/ChatBox";
import SendMessages from "./components/SendMessages";
import SideBarWCard from "../components/SideBarWCard";

const ChatContainer = ({ chat_uid, userIndex, myUserId }) => {
  console.log(chat_uid);
  console.log(myUserId);
  return (
    <>
    <div className="h-screen  bg-gradient-to-l from-black1 to-black3">
      <ChatBox
  
        /* chatid={chatId} */
        myUserId={myUserId}
        userIndex={userIndex}
      />
      <SendMessages
        /* chatId={chatId} */
        chat_uid={chat_uid}
        myUserId={myUserId}
        userIndex={userIndex}
      />
    </div>
    </>
  
  );
};
export default ChatContainer;
