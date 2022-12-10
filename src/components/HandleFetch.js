export function HandleFetch(url, jsonData, method) {

  const dataFetch = async () => {
    return await fetch(url, {
        method: method,
        body: JSON.stringify(jsonData),
    })};

  return dataFetch();
}