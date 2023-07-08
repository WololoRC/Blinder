import { useEffect, useState } from "react";
import { useContext } from "react";
import Loveicon from "../assets/LoveIcon.png";
import Block from "../assets/Block.png";
import Skip from "../assets/Skip.png";
import SideBarST2 from "./classes/SideBarST2.css";
import CardClickedST from "./classes/CardClickedST.css";
import myimage from "../assets/b1_720.png";
import { BiChevronsLeft } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

function CardNoClicked() {
  const [data, setData] = useState([]);
  const [currentElement, setCurrentElement] = useState(1);
  const {
    backClick,
    setBackClick,
    setNavbarState,
    switchArrow,
    setSwitchArrow,
    navbarState,
  } = useContext(UserContext);

  const handleNavbarState = () => {
    setNavbarState(!navbarState);

    setSwitchArrow(!switchArrow);
  };

  const changeClicked = () => {
    console.log("you clicked me");
    setBackClick(!backClick);
  };

  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum my name is gustavo fring and im the los pllos hermanos chain lorem ipsum 123 estoy en tu cesped nevercracker O.o lol las ias son como loros l";

  const handleNext = () => {
    setCurrentElement(currentElement + 1);
    // Logic for matches here
  };

  useEffect(() => {
    async function gatherData() {
      const res = await cardAPI();
      console.log(res);
      setData(res.data);
      console.log(data);
    }
    gatherData();
  }, []);

  useEffect(() => {
    const pTags = document.getElementById("tags").getElementsByTagName("p");

    for (let i = 0; i < pTags.length; i++) {
      const pTag = pTags[i];
      pTag.style.animationDelay = `${i * 0.2}s`;
      pTag.classList.add("opacity-0");
      pTag.addEventListener("animationend", () => {
        pTag.style.opacity = "1";
      });
    }

    setTimeout(() => {
      for (let i = 0; i < pTags.length; i++) {
        const pTag = pTags[i];
        pTag.style.animation = "fade-in 0.3s ease forwards";
      }
    }, 300);
  }, []);

  return (
    <>
      <div>
        <img className="flex h-20" src={myimage} alt="iconDef" />
      </div>
      {/* <div>
        {switchArrow ? (
          <div className="chevron-down">
            <button onClick={handleNavbarState}>
              <FaChevronDown />
            </button>
          </div>
        ) : (
          <div>
            <button onClick={handleNavbarState}>
              <FaChevronUp />
            </button>
          </div>
        )}
      </div>
      <div></div>
      <div className="gradient-purple-simple card-containerNO border-slate-50 ">
        <h2 className="text-white text-xl font-bold mb-2 text-center">
          {data.map((item) => (
            <p key={item.user}>
              {item.user === currentElement ? item.user : ""}
            </p>
          ))}
        </h2>
        <span>
          <p className="text-white text-center">
            {data.map((item) => (
              <span key={item.user} className="text-ls">
                {item.user === currentElement ? item.age : ""}
              </span>
            ))}
          </p>
          <div id="name-age-container" className="text-black text-2xl mb-9">
            <h1 className="name-age-container2">Agustin 18 😳</h1>
          </div>
          <div
            id="description"
            className="flex description-container2 justify-center text-black text-base pl-10 pr-10 text-justify"
          >
            <span>
              <p>{lorem}</p>
            </span>
          </div>
        </span>
        <div id="tags" className="flex justify-between text-white text-xl mt-3">
          <span>
            <p className="text-black tags-container border-solid t border-1 ml-5 hover:bg-purple-500 hover:text-white transition-colors duration-100">
              Adventurer
            </p>
          </span>
          <span>
            <p className="text-black tags-container border-solid  border-1 hover:bg-purple-500 hover:text-white transition-colors duration-100">
              Animal Lover
            </p>
          </span>
          <span>
            <p className="text-black tags-container border-solid  border-1 hover:bg-purple-500 hover:text-white transition-colors duration-100">
              Memes
            </p>
          </span>
          <span>
            <p className="text-black tags-container opacity-0 transition-opacity duration-100 delay-50  border-solid border-1 hover:bg-purple-500 hover:text-white transition-colors duration-100">
              Coding
            </p>
          </span>
          <span>
            <p className="text-black tags-container border-solid border-1  mr-5 hover:bg-purple-500 hover:text-white transition-colors duration-100">
              Cinema
            </p>
          </span>
        </div>
      </div>

      <div className="buttons-container2" id="buttons">
        <span>
          <button className="shrink-10 grow-5 rounded-full back-gray2 mr-5 hover:scale-110">
            <img className="h-11" src={Loveicon} alt="Like icon" />
          </button>
        </span>
        <span>
          <button className="shrink-10 grow-5 rounded-full back-gray2 mt-5 b hover:scale-110">
            <img className="h-11" src={Block} alt="Block icon" />
          </button>
        </span>
        <span>
          <button
            className="border-circle shrink-10 grow-5 rounded-full back-gray2 ml-5 hover:scale-110"
            onClick={handleNext}
          >
            <img className="h-11" src={Skip} alt="Next icon" />
          </button>
        </span>
      </div> */}
    </>
  );
}

export default CardNoClicked;
