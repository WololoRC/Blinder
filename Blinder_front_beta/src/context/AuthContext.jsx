import React, { useState } from "react";
// import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import blinder from "../api/blinder";

export const UserState = (props) => {
  const [headerSt, setheaderSt] = useState(localStorage.getItem("headerSt"));

  const [uidSt, setuidSt] = useState(localStorage.getItem("uidSt"));

  const [clicked, setClicked] = useState(false);

  const [searchTrue, setSearchTrue] = useState(false);

  const [backClicked, setBackClicked] = useState(true);

  const [navbarState, setNavbarState] = useState(true);

  const [switchArrow, setSwitchArrow] = useState(false);

  const [userDescription, setDescription] = useState("");

  const [userNickname, setUserNickname] = useState("");

  const [tagsId, setTags] = useState([]);

  const navigate = useNavigate();

  const login = async (user, password) => {
    console.log({ email: user, password });

    try {
      const res = await blinder.post("/login", {
        username: user,
        password: password,
      });

      console.log(res);

      const token = res.data.token;
      const id = res.data.id;
      setheaderSt(token);
      setuidSt(id);
      navigate("/createprofile");
      localStorage.setItem("headerSt", token);
      localStorage.setItem("uidSt", id);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (email, password) => {
    // alert("register in");
    navigate("/login");
    // console.log(email);
    // console.log(password);

    const res = await axios.post("http://127.0.0.1:8000/api/signup/", {
      username: email,
      password: password,
      birth_date: "1980-5-5",
    });
    // console.log(res);
    const token = res.data.token;
    setheaderSt(token);
    localStorage.setItem("headerSt", token); // Store token in local storage
  };

  const makeLogOut = () => {
    alert("Acoount created succesfully");
    localStorage.removeItem("headerSt"); // Remove token from local storage
    setheaderSt(null);
    navigate("/");
  };

  const getTags = (name) => {
    fetch("http://127.0.0.1:8000/api/tags/")
      .then((response) => response.json())
      .then((data) => {
        const folkTag = data.find((tag) => tag.tag_name === name);
        setTags(folkTag.id);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createProfile = (description) => {
    setDescription(description);
    console.log(userDescription);
    console.log(tagsId + "soy el tag id");

    const res = axios.put(`http://127.0.0.1:8000/api/profile/${uidSt}/`, {
      description: description,
      add_tags: [...tagsId],
    });
    console.log(res);
  };

  return (
    <UserContext.Provider
      value={{
        login,
        makeLogOut,
        register,
        headerSt,
        uidSt,
        clicked,
        setClicked,
        searchTrue,
        setSearchTrue,
        backClicked,
        setBackClicked,
        navbarState,
        setNavbarState,
        switchArrow,
        setSwitchArrow,
        createProfile,
        userDescription,
        getTags,
        userNickname,
        setUserNickname,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
