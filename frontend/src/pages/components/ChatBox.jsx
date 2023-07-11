import { UserContext } from "../../App";
import { useEffect, useState, useContext, useRef } from "react";
import blinder from "../../api/blinder";

const ChatBox = ({ chatId, myUserId, index }) => {
  const [messages, setMessages] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  const [userTwo, setUserTwo] = useState("");
  const { userData, lightMode, setNameH1 } = useContext(UserContext);

  const [refMessage, setRefMessage] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await blinder.get(`/chat/inbox/${userData.id}/`);
        const chat = response.data;

        if (
          Array.isArray(response.data["as user_one"]) &&
          response.data["as user_one"].length === 0
        ) {
          const userMessages = response.data["as user_two"][index].messages.map(
            (message) => message
          );
          const userSenderIds = response.data["as user_two"][
            index
          ].messages.map((message) => message.sender.id);

          const userTwo =
            response.data["as user_two"][index]["user_one"]["user"]["username"];

          setUserTwo(userTwo);

          setSenderIds(userSenderIds);
          setMessages(userMessages);
          setRefMessage(userMessages);
        } else {
          const userMessages = response.data["as user_one"][index].messages.map(
            (message) => message
          );

          const userSenderIds = response.data["as user_one"][
            index
          ].messages.map((message) => message.sender.id);

          const userOne =
            response.data["as user_one"][index]["user_two"]["user"]["username"];

          setUserTwo(userOne);

          setSenderIds(userSenderIds);
          setMessages(userMessages);
          setRefMessage(userMessages);
        }
      } catch (error) {
        console.error("Couldnt load the messages:", error);
      }
    };

    fetchMessages();
  }, [userData.id, refMessage, index]);

  console.log(myUserId + "im user id");

  return (
    <div
      className={lightMode ? "message-container bg-gradient-to-r from-black1 to-black3  " : "message-container-white"}
    >
      <div
        className={
          lightMode
            ? "flex flex-col gap-4 bg-gradient-to-r from-black1 to-black3 h-full  "
            : " flex flex-col gap-4   h-full bg-gradient-to-r from-white to-gray-100 "
        }
      >
        {messages.map((message, index) => {
          const isSender = message.sender.id === myUserId;
          /*    console.log(myUserId === message.sender.id); */
          const chatClassName = isSender
            ? "chat-start"
            : "chat-end flex-row-reverse ";
          const chatAvatar = isSender
            ? "https://robohash.org/" + userData.user.username
            : "https://robohash.org/" + userTwo;

          const chatBubbleClassNameBlack = `chat-bubble ${
            isSender ? "bg-bluechat text-white" : ""
          }`;

          const chatBubbleClassNameWhite = `chat-bubble ${
            isSender ? "bg-bluechat text-white" : ""
          }`;
          /*   console.log(JSON.stringify(message.sender));
        console.log(message.sender.id + " its me"); */

          return (
            <div className={"flex chat " + chatClassName} key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={chatAvatar} alt="Avatar" />
                </div>
              </div>
              <div
                className={
                  lightMode
                    ? chatBubbleClassNameBlack
                    : chatBubbleClassNameWhite
                }
              >
                {message.msg_content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBox;
