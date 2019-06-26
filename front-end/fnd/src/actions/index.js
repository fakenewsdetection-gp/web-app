import axios from 'axios';

export const BASE_URL = "http://localhost:5000";
export const ANALYZE = 'ANALYZE';

export function analyze(article) {
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  const URL = `${BASE_URL}/analysis`;
  const request = axios.put(URL, article);
  return {
      type: ANALYZE,
      payload: request
  };
}
