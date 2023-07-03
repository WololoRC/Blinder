import { IoAddCircleOutline } from "react-icons/io5";
export function DiscoverMatches() {
  return (
    <>
      <div className="bg-gray-300 h-40 flex items-center">
        <div className="bg-gray-300">
          <IoAddCircleOutline  className="h-10 w-10 ml-5"/>
        </div>

        <div>
          <h1 className="display: flex justify-even ml-16">Discover new matches</h1>
          <p className="display: flex justify-center ml-9 text-xs text-gray-500">Start sweeping to connect with new people!</p>
        </div>
      
      </div>
      <hr></hr>
    </>
  );
}
