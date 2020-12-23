import axios from "axios";

export default async function applyHeaders(headers) {
  const {
    pageRange,
    position,
    rangeValue,
    titlesList,
    headerText,
    startingPageNumber,
  } = headers;
  const data = new FormData();
  data.append("pageRange", JSON.stringify(pageRange));
  data.append("position", position);
  data.append("rangeValue", rangeValue);
  data.append("titlesList", titlesList);
  data.append("headerText", headerText);
  data.append("startingPageNumber", startingPageNumber);

  const config = {
    method: "POST",
    url: "/headers",
    headers: { "Access-Control-Allow-Origin": "*" },
    data,
    responseType: "blob",
  };

  try {
    const res = await axios(config);
    const { data } = res;
    return { blob: data, status: 200 };
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
