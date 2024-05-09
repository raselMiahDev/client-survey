const BASE_URL = "http://localhost:5000";
import axios from "axios";

// export const CREATE_SERVEY = async (surveyData) => {
//   try {
//     const URL = BASE_URL + "/servey";
//     const postBody = {
//       full_name,
//       factory_name,
//       timely_manner,
//       expected_timeline,
//       customer_service,
//       rate_overall,
//       suggestion,
//     };
//     const response = await axios.post(URL, surveyData);
//     if (response.status === "201") {
//       console.log(response.message);
//     }
//     return response;
//   } catch (error) {
//     return [];
//   }
// };

export const GET_SERVEY = async () => {
  try {
    const URL = BASE_URL + "/get-servey";
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    return [];
  }
};
