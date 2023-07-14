import React from "react";
import ChatBox from "./components/ChatBox";
import SendMessages from "./components/SendMessages";
import SideBarWCard from "../components/SideBarWCard";
import { UserContext } from "../App";
import "./styles/ChatContainer.css"
import { useContext, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import {BiMenuAltRight} from "react-icons/bi"
import blinder from "../api/blinder";

const ChatContainer = ({ chat_uid, userIndex, myUserId, recieve, chatId }) => {
  console.log(chat_uid);
  console.log(myUserId);

  const [block, setBlock] = useState(false);

  const [blockOn, setBlockOn] = useState(false)

  const handleArrowBack = () => {
    setChatOn(!chatOn);
    console.log("CLICKED");
  };

  const { lightMode, index, nameh1, chatOn, setChatOn, setShowBlock } =
    useContext(UserContext);

  const handleBlock = () =>{
    setBlock(!block)
  }

  useEffect(() => {
    
    const  blockUser = async () => {
    if (blockOn){
      try{
       await blinder.put(`/profile/blocked_list/update/${myUserId}/`,{
          id_list : chatId,
        }
        )
      
      }
      catch(err){
        console.log(err);
      }
     
      setChatOn(false);
      setShowBlock(true);
     
      
      
    }
  }
  blockUser()
  }, [blockOn])
  
 

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
            <IoIosArrowBack color="red" size={20} />
          </button>
        </div>
        <p className={lightMode ? "text-white text-2xl" : "text-black text-lg "}>
          {nameh1} <div className="absolute top-3 right-0"><BiMenuAltRight onClick={handleBlock}  onBlur={() => setBlock(!block)}  color={lightMode ? "white" : "black"} size={20} className="top-3"/>
          <div>
      {block && (
        <button  onClick={() => setBlockOn(!blockOn)} className="bg-white absolute top-4 px-2 right-0">
          <p className="text-black text-sm">
            Block
          </p>
        </button>

      )}      
    </div>
          </div>
        </p>
        <div className="flex justify-end absolute mt-2"></div>
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
