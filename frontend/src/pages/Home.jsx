import blinder from "./styles/imgs/b1_721.png";
import "./styles/Home.css";
import { useState } from "react";
import { IoLanguageOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";

export function Home() {
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleBackClick = () => {
    setShowRegister(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    try {
      setFormData({ username: "", password: "" });
      const response = register(formData.username, formData.password);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="background-img min-h-screen">
      <div className="logo-div">
        <img className="img-selector" src={blinder} alt="myimage" />
        <h2 className="text-white absolute ml-16 font-extrabold text-4xl">
          Blinder
        </h2>
        <div className="language-register">
          <div className="mr-3">
            <IoLanguageOutline className="lang-icon" />
          </div>
          <h2 className="lang">Language</h2>
          <button onClick={handleRegisterClick}>Register</button>
        </div>
      </div>

      <div className="s">
        <div className="h1-home">
          <h1 className="h1-main"> The New way of connecting</h1>
        </div>
        <Link to="/login" className="login-button">
          Log In
        </Link>
      </div>
    </div>
  );
}
