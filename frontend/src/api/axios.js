import axios from "axios";

export default axios.create({
    baseURL: 'https://backend-production-cdf0.up.railway.app/'
});