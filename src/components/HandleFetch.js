import DataNotFoundError from "../Errors/Errors/DataNotFoundError";
import AuthenticationError from "../Errors/Errors/AuthenticationError";
import InvalidJsonDataError from "../Errors/Errors/InvalidJsonDataError";
import ServiceUnaviableError from "../Errors/Errors/ServiceUnaviableError";
import PermissionError from "../Errors/Errors/PermissionError";

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
    const errJson = await response.json();

    let error;
    
    switch (response.status) {
      case 400:
        error = new InvalidJsonDataError(errJson.error, errJson.data);
        break;
      case 401:
        error = new AuthenticationError(errJson.error);
        break;
      case 403:
        error = new PermissionError(errJson.error);
        break;
      case 404:
        error = new DataNotFoundError(errJson.error, errJson.data);
        break;
      case 500:
        error = new ServiceUnaviableError(errJson.error);
        break;
    }

    return Promise.reject(error);
  }
};
