import "./styles/Profile.css";
import "./styles/CardProfile.css";
import blinder from "../api/blinder";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { FaEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

function Profile() {
  const {
    headerSt,
    setUserNickname,
    setheaderSt,
    setUserData,
    userData,
    lightMode,
  } = useContext(UserContext);

  const navigate = useNavigate();

  const [userData2, setUserData2] = useState("");

  const [tags, setTags] = useState([]);

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
          setUserData(res.data);
          setUserNickname(userData.user.username);
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

                    <div className="flex align-center justify-center mt-4"></div>
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
