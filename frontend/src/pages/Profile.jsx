import { useNavigate, useRouteLoaderData, Link } from "react-router-dom";
import { AiTwotoneEdit } from "react-icons/ai";
import { GiPlayerNext } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import blinderDef from "./styles/imgs/b1_721.png";
import { UserContext } from "../App";
import "./styles/Profile.css";
import "./styles/CardProfile.css";
import { FaEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import blinder from "../api/blinder";

import axios from "axios";
import EditProfile from "./EditProfile";
function Profile() {
  const {
    uidSt,
    headerSt,
    setUserNickname,
    setheaderSt,
    response,
    setUserData,
    userData,
    lightMode,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [userData2, setUserData2] = useState("");

  const [tags, setTags] = useState([]);

  const handleIconClick = () => {
    navigate("/");
  };

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const randomizePosition = () => {
      const randomTop = Math.floor(Math.random() * window.innerHeight);
      const randomLeft = Math.floor(Math.random() * window.innerWidth);
      setPosition({ top: randomTop, left: randomLeft });
    };

    randomizePosition();

    window.addEventListener("resize", randomizePosition);

    return () => {
      window.removeEventListener("resize", randomizePosition);
    };
  }, []);

  const renderedTags = tags.map(({ id, tag_name }) => {
    return (
      <button key={id} onClick={() => handleClick(id)}>
        <p className="">{tag_name}</p>
      </button>
    );
  });

  const handleEditClick = () => {
    navigate("/app/editprof/");
  };

  if (headerSt && userData !== null) {
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await blinder.get(`/profile/${userData.id}`, {
            headers: {
              Authorization: `token ${headerSt}`,
            },
          });
          const userDataFromApi = res.data;
          setUserData2(userDataFromApi);
          setTags(res.data.owner_tags);
          console.log(res.data.description);
          setUserData(res.data);
          console.log(headerSt + "its me");
          setUserNickname(userData.user.username);

          // Resto del código...
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  }

  const handleLogout = () => {
    localStorage.removeItem("headerSt"); // Remove token from local storage
    setheaderSt(null);
    navigate("/");
  };

  const link =
    userData2 &&
    userData2.user &&
    "https://robohash.org/" + userData2.user.username;

  const handleSubmit = () => {
    console.log("hello world");
  };

  return (
    <>
      {userData2 && (
        <>
          <div
            className={
              lightMode
                ? "bg-gradient-to-r from-black1 to-black3 pb-96"
                : "pb-96"
            }
          >
            <div className="">
              <div className="w-full">
                <div
                  className={
                    lightMode
                      ? "flex flex-col justify-center max-w-lg mx-auto  bg-black2 shadow-xl rounded-xl p-5"
                      : "flex flex-col justify-center max-w-lg mx-auto bg-white shadow-xl rounded-xl p-5 "
                  }
                >
                  <div>
                    <button>
                      <Link to="/app/feed">
                        <RiLogoutBoxLine color={lightMode ? "white" : ""} />
                      </Link>
                    </button>
                  </div>
                  <div className="">
                    <img
                      className={
                        lightMode
                          ? "w-32 mx-auto shadow-xl border-solid rounded-full profileDark"
                          : "w-32 mx-auto shadow-xl border-solid rounded-full profile"
                      }
                      src={link}
                      alt="Profile face"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-center text-xl sm:text-2xl font-semibold text-red1">
                      {userData2.user.username}
                    </p>
                    <div className="flex justify-end">
                      <button onClick={handleEditClick}>
                        <FaEdit color={lightMode ? "white" : ""} />
                      </button>
                    </div>
                    <p
                      className={
                        lightMode
                          ? "text-xs sm:text-base text-justify text-white pt-2 pb-4 px-5 w-auto inline-block border-b-2"
                          : "text-xs sm:text-base text-justify text-black pt-2 pb-4 px-5 w-auto inline-block border-b-2"
                      }
                    >
                      {userData2.description}
                    </p>

                    <div className="flex align-center justify-center mt-4">
                      {/* {userData2.owner_tags.map(({ id, tag_name }) => {
                        return (
                          <button key={id} onClick={() => handleClick(id)}>
                            <p className="bg-purple2 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-2xl text-white whitespace-nowrap">
                              {tag_name}
                            </p>
                          </button>
                        );
                      })} */}
                    </div>
                    <div className="start-button-div">
                      <button
                        onClick={handleLogout}
                        className="bg-redlol text-white start-button"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
