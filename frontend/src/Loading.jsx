import { useState, useEffect, CSSProperties } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ClipLoader from "react-spinners/BeatLoader";
import image from "./assets/b1_720.png";

const Loading = ({ loading }) => {
  return (
    <div className="loading-screen bg-gradient-to-l from-pink2 to-redlol">
      <img className="loading-image h-32" src={image} alt="Loading" />
    </div>
  );
  {
    /* <div className="flex flex-col items-center justify-center bg-epicblack h-screen">
      <img className="h-32" src="./src/assets/b1_720.png" alt="" />
      <ClipLoader
        color={"#393939"}
        className="mt-4"
        loading={loading}
        size={90}
        override={""}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div> */
  }
};
export default Loading;
