import { useEffect, useState, useContext } from "react";
import Loveicon from "../assets/LoveIcon.png";
import Block from "../assets/Block.png";
import Skip from "../assets/Skip.png";
import SideBarST from "./classes/SideBarST.css";
import "./classes/CardClickedST.css";
import "./classes/Rain.css";
import myimage from "../assets/B‌linderDef.png";
import { UserContext } from "../App";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import blinder from "../api/blinder";
import { IoTerminalSharp } from "react-icons/io5";
import { FiTrendingUp } from "react-icons/fi";

function CardClicked() {
  const [data, setData] = useState([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const [myUser, setMyUser] = useState({});
  const [nextUser, setNextUser] = useState({});
  const [prevUserTags, setPrevUserTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [allTags, setAllTags] = useState("");
  const [ownAllTags, setOwnAllTags] = useState(null);
  const [userId, setUserId] = useState([]);
  const [resFeedData, setResFeedData] = useState([]);
  const [skipIndex, setSkipIndex] = useState(0);
  const [likedId, setLikedId] = useState("");
  const [makeAlert, setMakeAlert] = useState(false);
  const [makeAlertBlock, setMakeAlertBlock] = useState(false);
  const [makeAlertLike, setMakeAlertLike] = useState(false);
  const [cardTransition, setCardTransition] = useState(false);
  const [skipedUserName, setSkipedUserName] = useState("");
  const [sureBlock, setSureBlock] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);

  const {
    clicked,
    navbarState,
    setNavbarState,
    switchArrow,
    setSwitchArrow,
    userData,
    setGlobalName,
    setChatId,
    setGlobalSkipIndex,
  } = useContext(UserContext);

  const handleYesBlock = () => {
    setMakeAlertBlock(false);
    setSureBlock(true);
    setAlertBlock(true);

    setTimeout(() => {
      setCardTransition(false);
    }, 500); // Delay the state update to match the transition duration

    // Set makeAlertSkip to false after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setAlertBlock(false);
    }, 600);
  };

  const handleSkip = () => {
    console.log(skipIndex);
    setSkipIndex(skipIndex + 1);
    setGlobalSkipIndex(skipIndex + 1);
    setCardTransition(!cardTransition);
  };

  useEffect(() => {
    async function getTags() {
      const res = await blinder.get("/tags/");
      const resFeed = await blinder.get(`/profile/feed/${userData.id}`);
      setOwnAllTags(resFeed.data.owner_tags);
      setResFeedData(resFeed.data);

      console.log(JSON.stringify(resFeed));

      // Acceder al primer usuario de la lista
      if (resFeed.data.length > 0) {
        console.log(skipIndex);
        const firstUser = resFeed.data[skipIndex]; // Accede al primer elemento
        const tagNames = firstUser.owner_tags.map((tag) => tag.tag_name);
        const descName = firstUser.description;
        const nickname = firstUser.user.username;
        const userId = firstUser.id;
        setCurrentUserId(userId);
        setChatId(userId);
        setTags(tagNames);
        setUserNickname(nickname);
        setSkipedUserName(nickname);
        setUserDescription(descName);
      }
    }

    getTags();
  }, [skipIndex, makeAlert]);

  useEffect(() => {
    setUserId(userData.id);
  }, [userId]);

  const handleNavbarState = () => {
    setNavbarState(!navbarState);

    setSwitchArrow(!switchArrow);
  };

  const blockUser = async () => {
    setMakeAlertBlock(true);
    if (sureBlock) {
      try {
        await blinder.put(`/profile/blocked_list/update/${userData.id}/`, {
          id_list: currentUserId,
        });
      } catch (err) {
        console.error(err);
      }
      setCardTransition(!cardTransition);
      setTimeout(() => {
        setSkipIndex(skipIndex + 1);
        setCardTransition(false);
      }, 500);
    }
  };

  const likeUser = async () => {
    console.log(currentUserId + "im the current user");
    setMakeAlertLike(true);
    setTimeout(() => {
      setCardTransition(false);
    }, 500); // Delay the state update to match the transition duration

    // Set makeAlertSkip to false after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setMakeAlertLike(false);
    }, 900);

    console.log("liked");
    blinder.put(`/profile/like_list/update/${userData.id}/`, {
      like_id: currentUserId,
    });
    const res = await blinder.get(`/profile/like_list/${userData.id}`);
    const res2 = await blinder.get(`/profile/like_list/${currentUserId}`);

    const likeList = res.data.like_list;
    likeList.forEach((id, index) => {
      console.log(`ID ${index + 1}: ${id}`);
    });

    useEffect(() => {
      console.log(globaSkipIndex);
    }, [setGlobalSkipIndex]);

    setCardTransition(!cardTransition);
    setTimeout(() => {
      setSkipIndex(skipIndex + 1);
      setCardTransition(false);
    }, 500);

    const likeList2 = res2.data.like_list;
    likeList2.forEach((id, index) => {
      console.log(`ID22 ${index + 1}: ${id}`);
    });

    const hasCommonId = likeList2.includes(userData.id);

    if (hasCommonId) {
      setGlobalName(userNickname);
      setMakeAlert(!makeAlert);
    } else {
      console.log("No common IDs");
    }
  };

  return (
    <>
      {/*  <div>
        {switchArrow ? (
          <button onClick={handleNavbarState}>
            <FaChevronDown />
          </button>
        ) : (
          <button onClick={handleNavbarState}>
            <FaChevronUp />
          </button>
        )}
      </div> */}
      <div className="flex relative text-center">
        <div className="div">
          {makeAlert && (
            <div className="alert alert-success absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>You have made a match!</span>
            </div>
          )}
        </div>
        {makeAlertLike && (
          <div
            class="mb-4 mt-12 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700 absolute center"
            role="alert"
          >
            <span>Liked {skipedUserName}</span>
          </div>
        )}
        {alertBlock && (
          <div
            class="mb-4 mt-12 center absolute rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
            role="alert"
          >
            <span>Blocked {skipedUserName}</span>
          </div>
        )}
      </div>

      {makeAlertBlock ? (
        <>
          <div class="flex flex-wrap place-items-center h-screen medidas">
            <div
              id="card-background"
              className={`overflow-hidden shadow-transparent transition-transform duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-100 w-80 md:w-80 cursor-pointer m-auto ${
                cardTransition ? "scale-95" : ""
              }`}
            >
              <a href="#" class="w-full block h-full">
                <div class="bg-gradient-to-l from-pink2 to-redlol w-full p-4 h-72">
                  <p class="text-lg text-cente text-white text-center pt-5 font-extrabold">
                    <div className="flex flex-col bg-epicblack pb-28 mx-1 rounded-2xl">
                      Are you sure you want to block {skipedUserName}?
                      <div className="flex justify-center mt-10">
                        <button onClick={handleYesBlock} className="mr-5">
                          Yes
                        </button>
                        <button
                          onClick={() => setMakeAlertBlock(false)}
                          className="ml-5"
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </p>
                </div>
              </a>

              <div className="buttons">
                <img
                  className="h-12 transform transition-all duration-300 hover:scale-110"
                  src={Block}
                  alt="block-button"
                  onClick={blockUser}
                />
                <img
                  className="h-12 transform transition-all duration-300 hover:scale-110"
                  src={Loveicon}
                  alt="like-button"
                  onClick={likeUser}
                />
                <img
                  className="h-12 transform transition-all duration-300 hover:scale-110"
                  src={Skip}
                  onClick={handleSkip}
                  alt="skip-button"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div class="flex flex-wrap place-items-center h-screen medidas">
          <div
            id="card-background"
            className={`overflow-hidden shadow-transparent transition-transform duration-500 ease-in-out transform hover:-translate-y-5 hover:shadow-2xl rounded-lg h-100 w-80 cursor-pointer m-auto ${
              cardTransition ? "scale-95" : ""
            }`}
          >
            <a href="#" class="w-full block h-full">
              <div class="bg-black2 w-full p-4">
                <p class="text-indigo-500 text-2xl text-cente font-custom text-white name-age-container pt-5 font-extrabold">
                  {userNickname}
                </p>

                <p class="text-white font-custom h-60">{userDescription}</p>

                <div class="flex items-center mt-2">
                  <div class="pl-3">
                    <div class="text-gray-600 text-sm new-tags">
                      {tags.map(({ id, tag_name }) => {
                        return (
                          <button key={id}>
                            <p className="tag-style mx-3">{tag_name}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </a>

            <div className="buttons">
              <img
                className="h-12 transform transition-all duration-300 hover:scale-110"
                src={Block}
                alt="block-button"
                onClick={blockUser}
              />
              <img
                className="h-12 transform transition-all duration-300 hover:scale-110"
                src={Loveicon}
                alt="like-button"
                onClick={likeUser}
              />
              <img
                className="h-12 transform transition-all duration-300 hover:scale-110"
                src={Skip}
                onClick={handleSkip}
                alt="skip-button"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardClicked;
