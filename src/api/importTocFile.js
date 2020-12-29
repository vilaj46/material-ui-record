import axios from "axios";

async function importTocFile(file) {
  const data = new FormData();
  data.append("file", file);

  const config = {
    method: "POST",
    url: "/toc",
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

export default importTocFile;
