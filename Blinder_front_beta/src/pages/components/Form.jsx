import React, { useEffect, useState } from "react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/FormularioUsuario.css"; // Archivo de estilos CSS personalizado

function Form({ handleSubmit }) {
  const [nickname, setNickname] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isClicked, setIsClicked] = useState(true);
  const [tagNames, setTagNames] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);

  const [tags, setTags] = useState([]);

  const {
    createProfile,
    getTags,
    setUserNickname,
    userNickname,
    response,
    userData,
  } = useContext(UserContext);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await blinder.get("/tags/");

        if (res.status === 200) {
          console.log(res.data);
          setTags(res.data);
          console.log(JSON.stringify(userData) + "Hola mundo");
          {
            const names = userData.owner_tags.map((tag) => tag.tag_name);
            setTagNames(names);
            console.log(tagNames);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, []);

  const handleClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) =>
        prevTags.filter((selectedTag) => selectedTag !== tag)
      );
      setRemovedTags((prevTags) => [...prevTags, tag]);
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  const renderedTags = tags.map(({ id, tag_name }) => {
    const isSelected = selectedTags.includes(id);
    const tagClass = isSelected ? "bg-indigo etiqueta" : "etiqueta";

    return (
      <button key={id} onClick={() => handleClick(id)}>
        <p className={tagClass}>{tag_name}</p>
      </button>
    );
  });

  return (
    <div className="formulario-container">
      <Link to="/app/profile/">Profile </Link>
      <h1 className="">Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <label className="label-description" htmlFor="descripcio ">
          Description
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          className="input-descripcion"
          placeholder="Enter your description (max 600 characters)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          cols="50"
          maxLength="600"
        ></textarea>
        <br />
        <br />
        <h1>What are you interested in?</h1>
        <div className="tags formulario-derecha overflow-x-scroll ">
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
}
export default Form;
