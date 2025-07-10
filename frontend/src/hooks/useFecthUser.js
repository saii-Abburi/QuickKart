import { jwtDecode } from "jwt-decode";
import axios from "axios";
const fetchUserDetails = async () => {
  const token = window.localStorage.getItem('token');
  const decoded = jwtDecode(token);
  try {
    const endpoint = `http://localhost:3000/app/v1/users/${decoded.userId}`;
    const response = await axios.get(endpoint);
    const userData = response.data.user[0];
    return userData;
  } catch (error) {
    console.error("Failed to fetch user", error);
  }
};

export default fetchUserDetails;
