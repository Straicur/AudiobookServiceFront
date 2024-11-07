import DataNotFoundError from 'Errors/Errors/DataNotFoundError';
import AuthenticationError from 'Errors/Errors/AuthenticationError';
import InvalidJsonDataError from 'Errors/Errors/InvalidJsonDataError';
import ServiceUnaviableError from 'Errors/Errors/ServiceUnaviableError';
import PermissionError from 'Errors/Errors/PermissionError';
import SystemError from 'Errors/Errors/SystemError';
import UserDeletedError from 'Errors/Errors/UserDeletedError';
// import { useTechnicalBreakStore, useTokenStore } from 'Store/store';

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

  const response = await fetch(url, content);

  if (response.ok) {
    let technicalBreak = response.headers.get('technical-break');

    if (response.headers.get('content-type') !== 'application/json') {
      return await response.blob();
    }

    let responseBody = '';

    for await (const chunk of response.body) {
      responseBody += new TextDecoder().decode(chunk);
    }

    if (responseBody.trim()) {
      let json = JSON.parse(responseBody);

      if (technicalBreak !== undefined && technicalBreak !== null) {
        json.technicalBreak = true;
      }

      return json;
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
      case 409:
        error = new UserDeletedError(errJson.error, errJson.data);
        break;
      case 500:
        error = new SystemError(errJson.error);
        break;
      case 503:
        error = new ServiceUnaviableError(errJson.error);
        break;
    }

    throw error;
  }
};
