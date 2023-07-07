import React, { useEffect, useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles/FormularioUsuario.css"; // Archivo de estilos CSS personalizado

import blinder from "../api/blinder";
import { FiDivide } from "react-icons/fi";

const CreateProfile = () => {
  const [nickname, setNickname] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [tags, setTags] = useState([]);

  const navigate = useNavigate();

  const {
    createProfile,
    getTags,
    setUserNickname,
    userNickname,
    response,
    userData,
    setUserData,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await blinder.get("/tags/");

        if (res.status === 200) {
          console.log(res.data);
          setTags(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, []);

  /*  useEffect(() => {
    const usedTags = async () => {
      try {
        const res = await blinder.get(`profile/${response.data.id}`);
      } catch (err) {
        console.log(err);
      }
    };
    usedTags();
  }, []); */

  const handleClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((e) => e !== tag));
    } else {
      setIsClicked(!isClicked);
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedTags);
    console.log(descripcion);

    try {
      const res = await blinder.put(`/profile/${userData.id}/`, {
        description: descripcion,
        add_tags: selectedTags,
      });

      console.log(res.data + "result");
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
    navigate("/app/profile/");
  };

  const renderedTags = tags.map(({ id, tag_name }) => {
    const isSelected = selectedTags.includes(id);

    return (
      <div className="inline-block" key={id} onClick={() => handleClick(id)}>
        <p
          className={`hover:bg-gray-300 etiqueta ${
            isSelected ? "selected" : ""
          }`}
        >
          {tag_name}
        </p>
      </div>
    );
  });

  return (
    <div className="formulario-container bg-gradient-to-r from-black1 to-black3">
      <h1 className="">Create Profile</h1>

      <form onSubmit={handleSubmit}>
        <label className="label-description text-white" htmlFor="descripcion">
          Description
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="input-descripcion"
          placeholder="Enter your description (max 260 characters)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          cols="50"
          maxLength="260"
          required
        ></textarea>
        <br />
        <br />
        <h1>What are you interested in?</h1>
        <div className="tags formulario-derecha overflow-x-scroll">
          {renderedTags}
        </div>

        <button
          className="bg-epicpink mt-3 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
