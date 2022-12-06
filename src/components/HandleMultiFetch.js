export function HandleMultiFetch(data) {

    data.forEach(fetchData => {
        
    });


    const dataFetch = async () => {
      return await fetch(url, {
          method: method,
          body: JSON.stringify(jsonData),
      })};
  
    return dataFetch();
  }