import React, { useContext, useState } from "react";
import { HandleFetch } from "../../HandleFetch";

const Context = React.createContext();

export const AudiobookDataProvider = ({ children,props }) => {

  const [comments, setComments] = useState();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories",
        "GET",
        null,
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setCategoiesState({
          ...props.categoiesState,
          error: e,
        });
      },
      onSuccess: (data) => {
        //I tu ustawiam state, tylko muszę jeszczę podać mu id audiobookai klucz kategorii chyba 
    
        // setState({ ...state, json: data.categories });
      },
    }
  );

  return (
    <Context.Provider value={comments}>
      {children}
    </Context.Provider>
  )
}

export const useComments = () => useContext(Context);