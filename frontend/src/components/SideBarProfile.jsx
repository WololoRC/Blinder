import { AiFillMeh } from "react-icons/ai";
import { IoSearchCircle } from "react-icons/io5";
import { TbSettingsFilled } from "react-icons/tb";
import { redirect, useNavigate } from "react-router-dom";
import { indigo } from "tailwindcss/colors";
import SideBar from "./SideBar";
import SideBarST from "./classes/SideBarST.css";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useContext } from "react";

export function SideBarProfile() {
  

  const [busqueda, setBusqueda] = useState("");

  const search = (e) => {
    console.log(e.target.valye);
    setBusqueda(e.target.value);

    setSearchTrue(!searchTrue);
    console.log("im here");
  };

  const navigate = useNavigate();

  const handleClick = () => {
    <SideBar className="flex bg-indigo mt-50" />;
    console.log("im here");
  };

  return (
    <div className="bg-crazygray h-12 flex items-center" id="MyProfile">
      <div className="h-6 w-6 text-white ml-4">
        <AiFillMeh onClick={handleClick} />
      </div>
      <button
        onClick={() => {
          navigate("/app/profile");
        }}
        className="text-white text-sm ml-4 mb-1 justify-text"
      >
        My Profile
      </button>
      <div className="diplsay: flex justify-end ml-40">
        <button onClick={() => {navigate("/app/editprof")}}
        
        >
          <TbSettingsFilled className="h-10 w-10 ml-40" />
        </button>
      </div>
    </div>
  );
}
