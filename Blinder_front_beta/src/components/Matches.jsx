import { Card } from "./Card";
import { UserContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export function Matches() {
  const { userData } = useContext(UserContext);

  const link = "https://robohash.org/" + userData.user.username;

  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center absolute ml-20" id="MyProfile">
        <button
          onClick={() => {
            navigate("/app/profile");
          }}
          className="flex items-center text-white text-sm ml-9 mt-2 mb-2 justify-text"
        >
          <div className="justify-between">
            <img
              className="h-5 mr-1 rounded-full border-white border-solid"
              src={link}
              alt="userAvatar"
            />
          </div>
          {userData.user.username}
        </button>
      </div>
      <Card />
    </>
  );
}
