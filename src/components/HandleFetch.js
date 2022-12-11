export function HandleFetch(url, jsonData, method) {
  const dataFetch = async () => {
    const response = await fetch(url, {
      method: method,
      body: JSON.stringify(jsonData),
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
