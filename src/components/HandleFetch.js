
import {useState, useEffect} from 'react';

export const HandleFetch = (url,jsonData,method) => {
  const [state, setState] = useState("");

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url,
        {
          method:method,
          body: JSON.stringify(jsonData)
        }
        )).json();

        //todo tu zostaje obsałużenie do errora
      setState(data);
    };

    dataFetch();
  }, [url]);

  return { data: state };
};