import axios from "axios";

export default async function uploadFile(file) {
  const data = new FormData();
  data.append("file", file);

  const config = {
    method: "POST",
    url: "/upload",
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
    responseType: "blob",
  };

  try {
    const res = await axios(config);
    const { data } = res;
    return data;
  } catch (err) {
    console.log(err);
  }
}
