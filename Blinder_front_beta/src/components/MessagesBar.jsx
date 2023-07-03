import "./classes/SideBarST2.css";
import { UserContext } from "../App";
import { useContext } from "react";
export function MessagesBar({ name }) {
  const { newMessage } = useContext(UserContext);
  const link = "https://robohash.org/" + name;
  return (
    <>
      <div id="messages" className="h-36 w-auto bg-thisblack items-center">
        <div className="flex items-center ml-2">
          <img
            className="h-20 w-20"
            id={newMessage ? "avatarNew" : "avatar"}
            src={link}
            alt="photo1"
          />
          <div className="ml-2 grid gap-1">
            <p className="mr-20 text-center text-2xl text-gray-300">{name}</p>
            <p className="text-gray-500 text-center text-sm">
              New Match! Say Hello 👋
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
