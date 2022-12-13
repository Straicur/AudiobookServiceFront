import { useTokenStore } from "../store";

export function HandleFetch(url, jsonData, method, token = null) {
  const dataFetch = async () => {

    let headers = {
      'Content-Type': 'application/json'
    }

    if(token != null){
      headers.authorization = token
    }

    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(jsonData),
      headers: headers
    });

    if (response.ok) {
      return response;
    } else {
      const error = new Error(response.status.toString() ?? "unknown");
      return Promise.reject(error);
    }
  };

  return dataFetch();
}
