import axios from 'axios';

export const BASE_URL = "http://localhost:5000";
export const GETTODOS = 'GETTODOS';

export function getTodos() {
  const URL = `${BASE_URL}/todos`;
  const request = axios.get(URL).then(function (response) {
    console.log(response);
  });
  // console.log(request);
  return {
      type: GETTODOS,
      payload: request
  };
}
