import { cardAPI } from "../api/CardData";
import { useEffect, useState } from "react";

export function Card() {
  const [data, setData] = useState([]);
  const [currentElement, setCurrentElement] = useState(1);

  const handleNext = () => {
    setCurrentElement(currentElement + 1);
    // Match logic here
  };

  useEffect(() => {
    async function gatherData() {
      const res = await cardAPI();
      setData(res.data);
    }
    gatherData();
  }, []);

  return (
    <div className="bg-gray-800 w-full">
      <h1 className="text-white">Hola matches</h1>
      <div className="flex justify-center bg-brightpink"></div>
      <div className="h-80 overflow-y-auto">
        {data.map((item) => {
          if (item.user === currentElement) {
            return (
              <div
                key={item.user}
                className="flex w-50 bg-emerald-500 p-4 rounded-lg ml-80 mr-80 mt-20 py-10"
              >
                <h2 className="text-white text-xl font-bold mb-2 text-center">
                  {item.user}
                </h2>
                <p className="text-white text-center">{item.age}</p>
                <div className="">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </div>
                <div className="flex col nowrap text-white">
                  <p className="">Tag 1</p>
                  <p className="">Tag 2</p>
                  <p className="">Tag 3</p>
                  <p className="">Tag 4</p>s
                  <p className="">Tag 5</p>
                  <button onClick={handleNext}>Next</button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}