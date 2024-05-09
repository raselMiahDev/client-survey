const BASE_URL = "https://client-survey.onrender.com";
import axios from "axios";

export const GET_SERVEY = async () => {
  try {
    const URL = BASE_URL + "/get-servey";
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    return [];
  }
};
