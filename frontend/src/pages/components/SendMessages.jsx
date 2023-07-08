// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { UserContext } from "../../App";
import blinder from "../../api/blinder";
import { IoIosSend } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import "./styles/SendMessage.css";

// import { db } from "../firebase";

const SendMessage = ({ chatId, chat_uid, myUserId }) => {
  const [messages, setMessages] = useState("");

  //const[firstUser, setFisrtUser] = useState(false);

  const { chatOn, setChatOn, lightMode } = useContext(UserContext);

  console.log(myUserId + "my user id");
  console.log(chatId + " CHAT ID EN FOOTER");
  console.log(chat_uid + "chat uid en footer");

  const handleInputChange = (event) => {
    event.target.value;
    setMessages(event.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messages.trim() !== "") {
      const newMessage = {
        sender: myUserId,
        reciever: chatId,
        msg_content: messages,
      };

      try {
        await blinder.put(`/chat/messages/${chat_uid}/`, newMessage);
        // actualizar los mensajes en la ventana de chat
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  return (
    <div
      className={
        lightMode
          ? "inline-block  bg-black4  bottom-0 w-full py-10 shadow-lg"
          : "bg-white inline-block bottom-0 w-full py-10 shadow-lg "
      }
    >
      <form onSubmit={handleSendMessage} className="px-2 flex">
        <input
          onChange={handleInputChange}
          className={
            lightMode
              ? "input w-full focus:outline-none bg-gray-200 rounded-xl  "
              : "input w-full focus:outline-none bg-gray-200 rounded-xl "
          }
          type="text"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="w-auto  text-white rounded-r-lg px-5 text-sm"
        >
          <IoIosSend
            style={
              lightMode
                ? { border: "2px solid white", borderRadius: "100px" }
                : ""
            }
            color="blue"
            size={35}
          />
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
