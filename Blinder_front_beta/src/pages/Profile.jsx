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
function Profile() {
  const {
    uidSt,
    headerSt,
    setUserNickname,
    setheaderSt,
    response,
    setUserData,
    userData,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [userData2, setUserData2] = useState("");

  const [tags, setTags] = useState([]);

  const handleIconClick = () => {
    navigate("/");
  };

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
          <div className="body bg-gradient-to-l from-black1 to-black3 h-screen">
            <div className="start-button-div">
              <button className="start-button">
                <Link to="/app/feed">Start Matching</Link>
                <GiPlayerNext className="ml-5" />
              </button>
            </div>
          </div>
          <div class="center bg-gradient-to-l from-black1 to-black3 flex h-screen w-screen justify-center">
            <div class="card">
              <div class="additional">
                <div class="user-card">
                  <div className="avatar2">
                    {" "}
                    <img src={link} alt="" />{" "}
                  </div>
                  <div class="points center">{userData2.user.username}</div>

                  <defs>
                    <clipPath id="scene">
                      <circle cx="125" cy="125" r="115" />
                    </clipPath>
                    <clipPath id="lips">
                      <path d="M 106,132 C 113,127 125,128 125,132 125,128 137,127 144,132 141,142  134,146  125,146  116,146 109,142 106,132 Z" />
                    </clipPath>
                  </defs>
                  <circle cx="125" cy="125" r="120" fill="rgba(0,0,0,0.15)" />
                </div>
                <div class="more-info">
                  <h1 className="mr-5">Tags</h1>
                  <div class="coords">
                    <div class="mt-5 tags">
                      {userData2.owner_tags.map(({ id, tag_name }) => {
                        return (
                          <button key={id} onClick={() => handleClick(id)}>
                            <p className="tag-style text-xs mr-5">{tag_name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div class="general bg-black2 text-white">
                <h1 className="">Description</h1>
                <p className="user-desc">{userData2.description}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex-container">
              <RiLogoutBoxLine size={25} className="" />
              <h3 className="flex-item">Log Out</h3>
            </button>
            <div className="edit-btn">
              <button onClick={handleEditClick}>
                <FaEdit color="white" />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
