import "./styles/Register.css";
import { useState } from "react";
import blinder from "../../api/blinder";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";
import blinderBack from "../../assets/blinderback2.jpg";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  // const [fechaNacimiento, setFechaNacimiento] = useState(""); // implementar

  const [confirmPass, setConfirmPass] = useState("");

  const [passError, setPassError] = useState(false);

  const [age, setAge] = useState("");

  const { setIsLoggedIn, setUserData, setIsLogin, isLogin, setheaderSt } =
    useContext(UserContext);

  const handleSignInClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmPass == password) {
      try {
        const res = await blinder.post("/signup/", {
          username: user,
          password: password,
          birth_date: age,
        });

        if (res.status === 201) {
          //auth user
          setIsLoggedIn(true);
          setUserData(res.data);
          navigate("/app/create_profile");
          const token = res.data.token;
          setheaderSt(token);

          /*  var checkbox = document.getElementById("myCheckbox"); */
          /* 
          if (checkbox.checked) {
            localStorage.setItem("headerSt", token);
          } */
        }
      } catch (err) {
        console.error(err);
        setError(true);
      }
    } else {
      setPassError(true);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-start justify-center bg-cover bg-center bg-blinderBack">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={blinderBack}
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen "></div>
        <div className="fixed w-full px-4 py-12 z-50 login-screen-container">
          <div className="max-w-[450px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-8">
              <h1 className="text-3xl font-bold text-center">Sign Up</h1>
              {error ? (
                <p className="p-3 bg-red-500 my-2 rounded">
                  Username or Password Incorrect
                </p>
              ) : null}
              {passError ? (
                <p className="p-3 bg-red-500 my-2 rounded">
                  Passwords do not match
                </p>
              ) : null}
              <form
                onSubmit={handleSubmit}
                id="register-form"
                className="w-full flex flex-col py-4"
              >
                <input
                  onChange={(e) => setUser(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="text"
                  placeholder="Username"
                  autoComplete="user"
                  value={user}
                />

                <input
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  minLength={8}
                  value={confirmPass}
                />

                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Confirm password"
                  value={password}
                  autoComplete="current-password"
                />

                <label className="" htmlFor="fechaNacimiento">
                  Select your birthdate:
                </label>
                <br />
                <input
                  type="date"
                  id="fechaNacimiento"
                  className="birthdate-container text-black"
                  name="fechaNacimiento"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />

                <button className="bg-violet-700 py-3 my-6 rounded font-bold">
                  Sign Up
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" id="myCheckBox" />
                    Remember me
                  </p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already have an account?
                  </span>{" "}
                  <button onClick={handleSignInClick}>Sign In</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
