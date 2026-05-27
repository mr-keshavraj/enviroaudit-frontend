import axios from "axios";

/*
-----------------------------------------
Central Axios Configuration
-----------------------------------------
*/

const api = axios.create({

  baseURL:
    process.env.NEXT_PUBLIC_API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

export default api;