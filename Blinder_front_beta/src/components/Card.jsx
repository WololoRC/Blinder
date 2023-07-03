import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import Loveicon from "../assets/LoveIcon.png";
import Block from "../assets/Block.png";
import Skip from "../assets/Skip.png";
import SideBarST from "./classes/SideBarST.css";
import CardClicked from "./CardClicked";
import CardNoClicked from "./CardNoClicked";

export function Card() {
  const { clicked } = useContext(UserContext);

  return <>{clicked ? <CardNoClicked /> : <CardClicked />}</>;
}
