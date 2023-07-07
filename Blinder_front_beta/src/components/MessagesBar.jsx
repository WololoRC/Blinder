import "./classes/SideBarST2.css";
import { UserContext } from "../App";
import { useContext } from "react";
export function MessagesBar({ name }) {
  const { newMessage, lightMode } = useContext(UserContext);
  const link = "https://robohash.org/" + name;
  return (
    <>
      <div
        className={
          lightMode
            ? "messages h-36 w-auto bg-thisblack items-center"
            : "messages2 h-36 w-auto bg-white items-center"
        }
      >
        <div className="flex items-center ml-2">
          <img
            className="h-20 w-20"
            id={newMessage ? "avatarNew" : "avatar"}
            src={link}
            alt="photo1"
          />
          <div className="ml-2 grid gap-1">
            <p
              className={
                lightMode
                  ? "mr-20 text-center text-2xl text-white"
                  : "mr-20 text-center text-2xl text-black2"
              }
            >
              {name}
            </p>
            <p
              className={
                lightMode
                  ? "text-gray-300 text-center text-sm"
                  : "text-black text-center text-sm"
              }
            >
              New Match! Say Hello 👋
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
