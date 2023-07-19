import blinder from "../api/blinder";
import { Card } from "./Card";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
export function Matches() {
  const { userData, lightMode, setLightMode, headerSt } =
    useContext(UserContext);

  const [userDataFrom, setUserDataFrom] = useState({});

  if (headerSt) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await blinder.get(`/profile/${userData.id}`, {
            headers: {
              Authorization: `token ${headerSt}`,
            },
          });
          const userDataFromApi = res.data;
          setUserDataFrom(userDataFromApi);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  }

  const link =
    userDataFrom &&
    userDataFrom.user &&
    "https://robohash.org/" + userDataFrom.user.username;

  const name = userDataFrom && userDataFrom.user && userDataFrom.user.username;

  const navigate = useNavigate();
  return (
    <>
      <div
        className="flex items-center justify-between absolute ml-20"
        id="MyProfile"
      >
        <button
          onClick={() => {
            navigate("/app/profile");
          }}
          className={
            lightMode
              ? "flex items-center text-white text-sm ml-9 mt-2 mb-2"
              : "flex items-center text-black text-sm ml-9 mt-2 mb-2"
          }
        >
          <div className="mr-1">
            <img
              className="h-5 rounded-full border-black border-solid"
              src={link}
              alt="userAvatar"
            />
          </div>
          {name}
        </button>
        <div className="">
          <button
            onClick={() => {
              setLightMode(!lightMode);
            }}
            className="ml-3 mt-1"
          >
            {lightMode ? (
              <MdDarkMode color="white" />
            ) : (
              <CiDark color="black" />
            )}
          </button>
        </div>
      </div>

      <Card />
    </>
  );
}
