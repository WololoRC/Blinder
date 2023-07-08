import "./styles/Login.css";
import { useEffect, useState } from "react";
import blinder from "../../api/blinder";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import blinderBack from "../../assets/blinderback2.jpg";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);

  const handleSignUpClick = () => {
    navigate("/register");
  };

  const {
    isLoggedIn,
    setIsLoggedIn,
    setUserData,
    setResponse,
    isLogin,
    setIsLogin,
    setheaderSt,
  } = useContext(UserContext);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password) {
        const res = await blinder.post("/login/", {
          username: user,
          password: password,
        });

        if (res.status === 200) {
          //auth user
          setIsLoggedIn(true);
          setUserData(res.data);
          setResponse(res);
          console.log(res);
          navigate("/app/profile");
          const token = res.data.token;
          setheaderSt(token);
          localStorage.setItem("headerSt", token);
        }
      }
    } catch (err) {
      console.error(err);
      setError(!error);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={blinderBack}
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50 login-screen-container">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] login-screen mx-auto py-16">
              <h1 className="text-3xl font-bold text-center">Sign In</h1>
              {error ? (
                <p className="p-3 bg-redlol my-2 rounded">
                  Username or Password Incorrect
                </p>
              ) : null}
              <form
                onSubmit={handleSubmit}
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 my-2 bg-gray-700 rounded"
                  type="password"
                  placeholder="Password"
                  value={password}
                  autoComplete="current-password"
                  minLength={8}
                />

                <button className="bg-violet-700 py-3 my-6 rounded font-bold">
                  Sign In
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">Dont have an account?</span>{" "}
                  <button onClick={handleSignUpClick}>Sign Up</button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*   <div className="background-container-login bg-fantasyli">
        <div>
          <h3 className="h1-new">Don't have an account?</h3>
          <button
            className="h2-try text-white bg-epicpink"
            onClick={() => setIsLogin(!isLogin)}
          >
            Register
          </button>
        </div>
        <div>
          <div className="form-container bg-fantasyviolet">
            <h1 className="text-white">Start Matching Now!</h1>
            <form onSubmit={handleSubmit}>
              <label className="text-white" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                name="username"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                className="text-white"
              />
              <label className="text-white" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="text-white"
              />
              <button className="submit-button-login bg-epicpink" type="submit">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Login;
