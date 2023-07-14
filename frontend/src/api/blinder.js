import axios from "axios";

const blinder = axios.create({
    // withCredentials: true,
    baseURL: "http://ec2-3-144-14-139.us-east-2.compute.amazonaws.com:8000/api", // development
    //baseURL: "", // production
});

export default blinder;