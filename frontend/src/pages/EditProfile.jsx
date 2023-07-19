import React, { useEffect, useState } from "react";
import { UserContext } from "../App";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./styles/FormularioUsuario.css";
import { RxCrossCircled } from "react-icons/rx";
import {BsTrash3} from "react-icons/bs"

import blinder from "../api/blinder";
import { MdLightMode } from "react-icons/md";

const EditProfile = () => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [removedTags, setRemovedTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [alertChanges, setAlertChanges] = useState(false);

  const [deleteAccount, setDeleteAccount] = useState(false);

  const navigate = useNavigate();

  const [selected, setSelected] = useState(false);

  const [tags, setTags] = useState([]);

  const { response, userData, setUserData, setTagsGlobal, lightMode } =
    useContext(UserContext);


    const [descripcion, setDescripcion] = useState(userData.description);

  const handleDeleteAccount = async () => {
    try {
      await blinder.delete(`profile/delete/${userData.id}`);
    } catch (err) {
      console.error(err);
    }
    navigate("/");
  };

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
      setSelected(true);
      setRemovedTags((removedTags) => [...removedTags, tag]);
    } else {
      setSelectedTags((selectedTags) => [...selectedTags, tag]);
      setRemovedTags((removedTags) =>
        removedTags.filter((removedTag) => removedTag !== tag)
        
      );
      setSelected(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    console.log(selectedTags);
    console.log(descripcion);
    console.log(removedTags + "its me");

    
    if (selectedTags.length === 0 || tagIds.length > 6 || selectedTags.length > 5) {
      return;
    }

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
        if (isSelected && selected) {
          tagClass += " selected";
        } else {
          tagClass += " bg-pink2 text-white";
        }
      }
    
      return (
        <div className="inline-block" key={id} onClick={() => handleClick(id)}>
          <p className={tagClass}>{tag_name}</p>
        </div>
      );
    });

  return (
    <>
      {deleteAccount && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          className="bg-white text-black absolute pb-10 pt-10 pr-4 pl-4"
        >
          <p className="font-bold text-black">
            Are you sure you want to delete it?
          </p>
          <div className="flex justify-center mt-10 text-center items-center">
            <button className="mr-3" onClick={handleDeleteAccount}>
              Yes
            </button>
            <button className="ml-3" onClick={() => setDeleteAccount(false)}>
              No
            </button>
          </div>
        </div>
      )}
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
      <div className={lightMode ? "formulario-container bg-gradient-to-r from-black1 to-black3" : "formulario-container bg-white"}>
        <Link className="" to="/app/profile/">
          <RxCrossCircled color={lightMode ? "white" : "black"} size={25} />
        </Link>
        <h1 className={lightMode ? "text-white" : "tex-black"}>Edit Profile</h1>

        <form onSubmit={handleSubmit}>
          <label className={lightMode ? "label-description text-white" : "label-description text-black"} htmlFor="descripcion">
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
          <h1 className={lightMode ? "text-white" : "text-white"}>What are you interested in?</h1>
          <div className="tags formulario-derecha overflow-x-scroll ">
            {renderedTags}
          </div>

          <button
            className="bg-epicpink mt-3 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => setDeleteAccount(true)}
            className="ml-4 text-white font-bold"
          >
            <span className={lightMode ? "text-white flex items-center" : "text-black flex items-center"}>Delete account <BsTrash3 color={lightMode ? "white" : "black"} className="ml-1"/></span>
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProfile;