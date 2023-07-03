import { UserContext } from "../../App";
import { useEffect, useState, useContext } from "react";
import blinder from "../../api/blinder";

const ChatBox = ({ chatId, myUserId, userIndex }) => {
  const [messages, setMessages] = useState([]);
  const [senderIds, setSenderIds] = useState([]);
  const [userTwo, setUserTwo] = useState("");
  const { userData } = useContext(UserContext);

  const [refMessage, setRefMessage] = useState([]);

  console.log(userIndex + "im the user index");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await blinder.get(`/chat/inbox/${userData.id}/`);
        const chat = response.data;

        console.log(JSON.stringify(response.data) + "im the text messages");

        if (
          Array.isArray(response.data["as user_one"]) &&
          response.data["as user_one"].length === 0
        ) {
          const userMessages = response.data["as user_two"][
            userIndex
          ].messages.map((message) => message);
          const userSenderIds = response.data["as user_two"][
            userIndex
          ].messages.map((message) => message.sender.id);

          const userTwo =
            response.data["as user_two"][userIndex]["user_one"]["user"][
              "username"
            ];

          setUserTwo(userTwo);

          setSenderIds(userSenderIds);
          setMessages(userMessages);
          setRefMessage(userMessages);
        } else {
          const userMessages = response.data["as user_one"][
            userIndex
          ].messages.map((message) => message);

          const userSenderIds = response.data["as user_one"][
            userIndex
          ].messages.map((message) => message.sender.id);

          const userOne =
            response.data["as user_one"][userIndex]["user_two"]["user"][
              "username"
            ];

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
  }, [userIndex, userData]);

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-r h-full from-black1 to-black3 ">
      {messages.map((message, index) => {
        const isSender = message.sender.id === myUserId;
        /*    console.log(myUserId === message.sender.id); */
        const chatClassName = isSender
          ? "chat-start"
          : "chat-end flex-row-reverse ";
        const chatAvatar = isSender
          ? "https://robohash.org/" + userData.user.username
          : "https://robohash.org/" + userTwo;

        /*   console.log(JSON.stringify(message.sender));
        console.log(message.sender.id + " its me"); */

        return (
          <div className={"flex chat " + chatClassName} key={index}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img src={chatAvatar} alt="Avatar" />
              </div>
            </div>
            <div className="chat-bubble">{message.msg_content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatBox;
