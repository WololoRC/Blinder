import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (userStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStatus) {
      navigate("/login");
    }
  }, [userStatus, navigate]);
};

export default useAuth;
