import { useContext } from "react";
import { UserContext } from "../App";
import CardClicked from "./CardClicked";


export function Card() {
  const { clicked } = useContext(UserContext);

  return <CardClicked />;
}
