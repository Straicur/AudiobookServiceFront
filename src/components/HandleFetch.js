import { useTokenStore } from "../store";

export const HandleFetch = async (
  url,
  method,
  jsonData = null,
  token = null
) => {
  let headers = {
    "Content-Type": "application/json",
  };

  if (token != null) {
    headers.authorization = token;
  }

  let content = {
    method: method,
    headers: headers,
  };

  if (jsonData != null) {
    content.body = JSON.stringify(jsonData);
  }

  const response = await fetch(url, content);

  if (response.ok) {
    if (response.headers.get("content-length") != 0) {
      return response.json();
    } else {
      return {};
    }
  } else {
    const error = new Error(response.status.toString() ?? "unknown");
    return Promise.reject(error);
  }
};
