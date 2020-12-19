import axios from "axios";

export default async function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);

  const config = {
    method: "POST",
    url: "/upload",
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
  };

  try {
    const res = await axios(config);
    const { data } = res;
    return { ...data, status: 200 };
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data,
      };
    } else {
      return {
        status: 400,
        message: "Bad request!",
      };
    }
  }
}
