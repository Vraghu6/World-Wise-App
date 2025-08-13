import axios from "axios";

const instance = axios.create({
  baseURL:
    "http://worldwiseapp-env.eba-iav3hwxm.us-east-2.elasticbeanstalk.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
