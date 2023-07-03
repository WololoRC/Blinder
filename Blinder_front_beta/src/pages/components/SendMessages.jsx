// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../App";
import blinder from "../../api/blinder";
import { IoIosArrowBack } from "react-icons/io";

// import { db } from "../firebase";

const SendMessage = ({ chat_uid, myUserId, userIndex }) => {
  const [messages, setMessages] = useState("");

  const [newId, setNewId] = useState("");

  //const[firstUser, setFisrtUser] = useState(false);

  const { chatOn, setChatOn, usersData } = useContext(UserContext);

  console.log(userIndex);
  console.log(myUserId + "my user id");
  /*  console.log(chatId + " CHAT ID EN FOOTER"); */
  console.log(chat_uid + "chat uid en footer");
  console.log(
    JSON.stringify(usersData[userIndex]) + " Its me im below chat uid"
  );

  const handleArrowBack = () => {
    setChatOn(!chatOn);
  };

  const handleInputChange = (event) => {
    event.target.value;
    setMessages(event.target.value);
  };

  useEffect(() => {
    setNewId(usersData[userIndex]);
  }, [usersData, usersData]);

  const handleSendMessage = async (e) => {
    if (usersData[userIndex]) {
      e.preventDefault();
      if (messages.trim() !== "") {
        const newMessage = {
          sender: myUserId,
          reciever: newId,
          msg_content: messages,
        };

        try {
          await blinder.put(`/chat/messages/${chat_uid}/`, newMessage);
          // actualizar los mensajes en la ventana de chat
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
        }
      }
    }
  };

  return (
    <div className=" bg-black2 fixed bottom-0 w-full py-10 shadow-lg">
      <div className="absolute top-3">
        <IoIosArrowBack onClick={handleArrowBack} />
      </div>
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input
          onChange={handleInputChange}
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
        />
        <button
          type="submit"
          className="w-auto bg-gray-100 text-black rounded-r-lg px-5 text-sm border-black border-solid"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
