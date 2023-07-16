import axios from "axios";

const blinder = axios.create({
    // withCredentials: true,
    baseURL: "http://127.0.0.1:8000/api", // development
    //baseURL: "", // production
});

export default blinder;