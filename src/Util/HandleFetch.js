import DataNotFoundError from 'Errors/Errors/DataNotFoundError';
import AuthenticationError from 'Errors/Errors/AuthenticationError';
import InvalidJsonDataError from 'Errors/Errors/InvalidJsonDataError';
import ServiceUnaviableError from 'Errors/Errors/ServiceUnaviableError';
import PermissionError from 'Errors/Errors/PermissionError';

export const HandleFetch = async (
  url,
  method,
  jsonData = null,
  token = null,
  language = null,
  headers = {},
) => {
  headers['Content-Type'] = 'application/json';

  if (language != null) {
    headers['Accept-Language'] = language;
  }

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

  url = process.env.REACT_APP_API_URL + '/api' + url;
  console.log('content');
  console.log(content);
  const response = await fetch(url, content);
  console.log('response');
  console.log(response);
  if (response.ok) {
    // if (
    //   response.headers.has('content-length') &&
    //   parseInt(response.headers.get('content-length')) != 0
    // ) {
    if (response.headers.get('content-type') != 'application/json') {
      return response.blob();
    }
    console.log(response);
    return response.json();
    // } else {
    //   return {};
    // }
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
    //TODO sprawdź czy tu może być jeszcze ten return
    //return Promise.reject(error);

    throw error;
  }
};
