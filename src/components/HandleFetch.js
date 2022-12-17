import { useTokenStore } from "../store";

export function HandleFetch(url, method, jsonData = null, token = null) {
  const dataFetch = async () => {

    let headers = {
      'Content-Type': 'application/json'
    }

    if(token != null){
      headers.authorization = token
    }

    let content = {
      method: method,
      headers: headers
    }

    if(jsonData != null){
      content.body = JSON.stringify(jsonData)
    }

    const response = await fetch(url,content);

    if (response.ok) {
      console.log(response)
      return response;
    } else {
      const error = new Error(response.status.toString() ?? "unknown");
      return Promise.reject(error);
    }
  };

  return dataFetch();
}
