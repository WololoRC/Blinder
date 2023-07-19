import blinder from "../api/blinder";
import "./classes/SideBarST.css";
import "./classes/CardClickedST.css";
import "./classes/Rain.css";
import greenHeart from "../assets/likeIcon.png";
import blockCross from "../assets/blockCross.png";
import redArrow from "../assets/redArrow.png";
import redHeart from "../assets/redHeart.png";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

function CardClicked() {
  const [currentUserId, setCurrentUserId] = useState("");
  const [tags, setTags] = useState([]);
  const [userNickname, setUserNickname] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [ownAllTags, setOwnAllTags] = useState(null);
  const [userId, setUserId] = useState([]);
  const [resFeedData, setResFeedData] = useState([]);
  const [skipIndex, setSkipIndex] = useState(0);
  const [makeAlert, setMakeAlert] = useState(false);
  const [makeAlertBlock, setMakeAlertBlock] = useState(false);
  const [makeAlertLike, setMakeAlertLike] = useState(false);
  const [cardTransition, setCardTransition] = useState(false);
  const [skipedUserName, setSkipedUserName] = useState("");
  const [sureBlock, setSureBlock] = useState(false);
  const [alertBlock, setAlertBlock] = useState(false);
  const [userAge, setUserAge] = useState("");

  const {
    userData,
    setGlobalName,
    setChatId,
    setGlobalSkipIndex,
    lightMode,
    showBlock,
    setShowBlock,
  } = useContext(UserContext);

  const handleYesBlock = () => {
    setMakeAlertBlock(false);
    setSureBlock(!sureBlock);
    setAlertBlock(true);

    setTimeout(() => {
      setCardTransition(false);
    }, 500);

    setTimeout(() => {
      setAlertBlock(false);
    }, 600);
  };

  const handleSkip = () => {
    setSkipIndex(skipIndex + 1);
    setGlobalSkipIndex(skipIndex + 1);
    setCardTransition(!cardTransition);
  };

  useEffect(() => {
    async function getTags() {
      const resFeed = await blinder.get(`/profile/feed/${userData.id}`);
      setOwnAllTags(resFeed.data.owner_tags);
      setResFeedData(resFeed.data);

      if (resFeed.data.length > 0) {
        const firstUser = resFeed.data[skipIndex];
        const tagNames = firstUser.owner_tags.map((tag) => tag.tag_name);
        const descName = firstUser.description;
        const nickname = firstUser.user.username;
        const age = firstUser.age;
        const userId = firstUser.id;

        const tagsSplited = tagNames.map((tagName) => tagName.split(","));

        setCurrentUserId(userId);
        setChatId(userId);
        setTags(tagsSplited);
        setUserAge(age);
        setUserNickname(nickname);
        setSkipedUserName(nickname);
        setUserDescription(descName);
      }
      if (skipIndex === resFeed.data.length - 1) {
        setSkipIndex(0);
      }
    }

    getTags();
  }, [skipIndex, makeAlert]);

  useEffect(() => {
    setUserId(userData.id);
  }, [userId]);

  const likeUser = async () => {
    console.log(currentUserId + "im the current user");
    setMakeAlertLike(true);
    setTimeout(() => {
      setCardTransition(false);
    }, 10);

    setTimeout(() => {
      setMakeAlertLike(false);
    }, 900);

    blinder.put(`/profile/like_list/update/${userData.id}/`, {
      like_id: currentUserId,
    });
    const res = await blinder.get(`/profile/like_list/${userData.id}`);
    const res2 = await blinder.get(`/profile/like_list/${currentUserId}`);

    const likeList = res.data.like_list;
    likeList.forEach((id, index) => {
      console.log(`ID ${index + 1}: ${id}`);
    });

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
    console.log(hasCommonId + "Im has common ID");
    if (hasCommonId) {
      setGlobalName(userNickname);

      if (makeAlertLike) {
        setMakeAlert(false);
        setTimeout(() => {
          setMakeAlert(true);
          setTimeout(() => {
            setMakeAlert(false);
          }, 2000);
        }, 200);
      } else {
        setTimeout(() => {
          setMakeAlert(true);
          npm;
          setTimeout(() => {
            setMakeAlert(false);
          }, 2000);
        }, 700);
      }
    }
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
        setCardTransition(false);
      }, 500);
      setSkipIndex(skipIndex + 1);
    }
  };

  if (showBlock) {
    setTimeout(() => {
      setShowBlock(false);
    }, 2000);
  }

  return (
    <>
      <div className="flex relative text-center">
        <div className="div">
          {makeAlert && (
            <div
              class="mb-4 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700 flex justify-center absolute center mt-12"
              role="alert"
              style={{ zIndex: 1 }}
            >
              You have made a new match!
            </div>
          )}
        </div>
        {makeAlertLike && (
          <div
            class="mb-4 mt-12 rounded-lg bg-success-100 px-6 py-5 text-base text-success-700 absolute center "
            role="alert"
            style={{ zIndex: 1 }}
          >
            <span class="flex items-center">
              Liked {skipedUserName}
              <img src={redHeart} class="h-5 ml-1" alt="greenHeart" />
            </span>
          </div>
        )}
        {showBlock && (
          <div
            class="mb-4 mt-12 center absolute rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700"
            role="alert"
            style={{ zIndex: 1 }}
          >
            <span className="flex items-center">
              Blocked {skipedUserName}{" "}
              <img src={blockCross} class="h-5 ml-1" alt="blockCross" />
            </span>
          </div>
        )}
      </div>

      {makeAlertBlock ? (
        <>
          <div class="flex flex-wrap place-items-center h-screen medidas">
            <div
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
                  src={blockCross}
                  alt="block-button"
                  onClick={blockUser}
                />
                <img
                  className="h-12 transform transition-all duration-300 hover:scale-110"
                  src={greenHeart}
                  alt="like-button"
                  onClick={likeUser}
                />
                <img
                  className="h-12 transform transition-all duration-300 hover:scale-110"
                  src={redArrow}
                  onClick={handleSkip}
                  alt="skip-button"
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="flex flex-wrap place-items-center h-screen medidas">
            {lightMode ? (
              <div
                className={`overflow-hidden cardblack shadow-sm transition-transform duration-500 ease-in-out transform hover:-translate-y-5 rounded-lg h-100 w-80 cursor-pointer m-auto ${
                  cardTransition ? "scale-95" : ""
                }`}
              >
                <a href="#" class="w-full block h-full">
                  <div class={"bg-black2 w-full p-4"}>
                    <p
                      class={
                        "text-indigo-500 text-2xl text-cente font-custom text-white name-age-container pt-5 font-extrabold"
                      }
                    >
                      {userNickname}, {userAge}
                    </p>

                    <p class={"text-graygr2 font-custom h-60"}>
                      {userDescription}
                    </p>

                    <div class="flex items-center mt-2">
                      <div class="pl-3">
                        <div class="text-pink2 text-sm new-tags font-custom">
                          {tags.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="buttons2">
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={blockCross}
                    alt="block-button"
                    onClick={blockUser}
                  />
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={greenHeart}
                    alt="like-button"
                    onClick={likeUser}
                  />
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={redArrow}
                    onClick={handleSkip}
                    alt="skip-button"
                  />
                </div>
              </div>
            ) : (
              <div
                className={`border-graygr2 overflow-hidden shadow-2xl transition-transform duration-500 ease-in-out transform hover:-translate-y-5  rounded-lg h-100 w-80 cursor-pointer m-auto  ${
                  cardTransition ? "scale-95" : ""
                }`}
              >
                <a href="#" class="w-full block h-full">
                  <div class={"bg-white w-full p-4"}>
                    <p
                      class={
                        "text-indigo-500 text-2xl text-cente font-custom text-black2 name-age-container2 pt-5 font-extrabold "
                      }
                    >
                      {userNickname}, {userAge}
                    </p>

                    <p class={"text-graygr2 font-custom h-60"}>
                      {userDescription}
                    </p>

                    <div class="flex items-center mt-2">
                      <div class="pl-3">
                        <div class="text-pink2 text-sm font-custom ">
                          {tags.join(", ")}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                <div className="buttons">
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={blockCross}
                    alt="block-button"
                    onClick={blockUser}
                  />
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={greenHeart}
                    alt="like-button"
                    onClick={likeUser}
                  />
                  <img
                    className="h-12 transform transition-all duration-300 hover:scale-110"
                    src={redArrow}
                    onClick={handleSkip}
                    alt="skip-button"
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default CardClicked;
