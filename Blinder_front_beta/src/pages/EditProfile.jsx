import React, { useEffect, useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles/FormularioUsuario.css";
import { RxCrossCircled } from "react-icons/rx";

import blinder from "../api/blinder";

const EditProfile = () => {
  const [descripcion, setDescripcion] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [alertChanges, setAlertChanges] = useState(false);

  const [tags, setTags] = useState([]);

  const { response, userData, setUserData, setTagsGlobal } =
    useContext(UserContext);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await blinder.get("/tags/");

        if (res.status === 200) {
          console.log(res.data);
          setTags(res.data);
          setTagsGlobal(res.data);
          console.log(JSON.stringify(userData) + "Hola mundo");
          {
            const names = userData.owner_tags.map((tag) => tag.tag_name);
            const ids = userData.owner_tags.map((tag) => tag.id);
            setTagNames(names);
            setTagIds(ids);
            console.log(tagNames);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, []);

  const handleSubmitAlert = () => {
    setAlertChanges(true);

    setTimeout(() => {
      setAlertChanges(false);
    }, 3000);
  };

  const handleClick = (tag) => {
    if (tagIds.includes(tag)) {
      setSelectedTags((selectedTags) =>
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
      setRemovedTags((removedTags) => [...removedTags, tag]);
    } else {
      setSelectedTags((selectedTags) => [...selectedTags, tag]);
      setRemovedTags((removedTags) =>
        removedTags.filter((removedTag) => removedTag !== tag)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedTags);
    console.log(descripcion);
    console.log(removedTags + "its me");

    try {
      const res = await blinder.put(`/profile/${response.data.id}/`, {
        description: descripcion,
        add_tags: selectedTags,
      });

      const resp = await blinder.put(`/profile/${response.data.id}/`, {
        description: descripcion,
        remove_tags: removedTags,
      });
      console.log(res.data);
      setUserData(res.data);
    } catch (err) {
      console.error(err);
    }
    handleSubmitAlert();
  };

  const renderedTags = tags.map(({ id, tag_name }) => {
    const isSelected = selectedTags.includes(id);
    const hasTags = tagNames.includes(tag_name);
    let tagClass = "etiqueta";

    if (hasTags) {
      tagClass = isSelected ? "etiqueta" : "bg-gray-300 etiqueta";
    }

    return (
      <button key={id} onClick={() => handleClick(id)}>
        <p className={tagClass}>{tag_name}</p>
      </button>
    );
  });

  return (
    <>
      {alertChanges && (
        <div className="alert alert-success absolute mx-auto w-96 ml-96">
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
          <span>Changes applied succesfully</span>
        </div>
      )}
      <div className="formulario-container bg-gradient-to-r from-black1 to-black3">
        <Link className="" to="/app/profile/">
          <RxCrossCircled color="white" size={25} />
        </Link>
        <h1 className="">Edit Profile</h1>

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
    </>
  );
};

export default EditProfile;
