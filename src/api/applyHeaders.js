import axios from "axios";

export default async function applyHeaders(headers) {
  const { pageRange, position, rangeValue, titlesList } = headers;
  const data = new FormData();
  data.append("pageRange", pageRange);
  data.append("position", position);
  data.append("rangeValue", rangeValue);
  data.append("titlesList", titlesList);

  const config = {
    method: "POST",
    url: "/headers",
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
    responseType: "blob",
  };

  const res = await axios(config);
  console.log(res);
}
