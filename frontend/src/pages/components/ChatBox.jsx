import { UserContext } from "../../App";
import { useEffect, useState, useContext } from "react";
import blinder from "../../api/blinder";

const ChatBox = ({ myUserId, index }) => {
  const [messages, setMessages] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  const [userTwo, setUserTwo] = useState("");
  const { userData, lightMode, setNameH1 } = useContext(UserContext);
  const [userOne, setUserOne] = useState("");

  const [refMessage, setRefMessage] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await blinder.get(`/chat/inbox/${userData.id}/`);

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

          const userOne =
            response.data["as user_two"][index]["user_two"]["user"]["username"];

          setUserTwo(userTwo);

          setUserOne(userOne);

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

          const userTwo =
            response.data["as user_one"][index]["user_one"]["user"]["username"];

          setUserTwo(userOne);

          setUserOne(userTwo);

          setSenderIds(userSenderIds);
          setMessages(userMessages);
          setRefMessage(userMessages);
        }
      } catch (error) {
        console.error("Couldnt load the messages:", error);
      }
    };

    fetchMessages();
  }, [userData.id, index]);

  return (
    <div
      className={
        lightMode
          ? "message-container bg-gradient-to-r from-black1 to-black3 h-screen "
          : "message-container-white h-screen"
      }
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
          const chatClassName = isSender
            ? "chat-start"
            : "chat-end flex-row-reverse ";
          const chatAvatar = isSender ? "" : "https://robohash.org/" + userTwo;

          const chatBubbleClassNameBlack = `chat-bubble ${
            isSender ? "bg-pink2 text-white" : ""
          }`;

          const chatBubbleClassNameWhite = `chat-bubble ${
            isSender ? "bg-pink2 text-white" : ""
          }`;

          return (
            <div className={"flex chat " + chatClassName} key={index}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  {isSender ? (
                    ""
                  ) : (
                    <img src={chatAvatar ? chatAvatar : ""} alt="Avatar" />
                  )}
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
