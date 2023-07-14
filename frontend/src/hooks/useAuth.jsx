import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (userStatus) => {
  const navigate = useNavigate();

  console.log(userStatus + "HOLAAAAAAAAAAAAAAAAAA");

  useEffect(() => {
    if (userStatus) {
        return;
    }
    else{
      navigate("/login")
    }
  }, []);
};

export default useAuth;
