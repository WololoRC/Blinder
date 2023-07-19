import image from "./assets/b1_720.png";

const Loading = ({ loading }) => {
  return (
    <div className="loading-screen bg-gradient-to-l from-pink2 to-redlol">
      <img className="loading-image h-32" src={image} alt="Loading" />
    </div>
  );
};
export default Loading;
