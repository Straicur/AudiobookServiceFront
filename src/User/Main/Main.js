import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../components/UserNavBar";
import { useTokenStore } from "../../store";
import { useMutation, useQuery, queryCache } from "react-query";
import { HandleFetch } from "../../components/HandleFetch";

export default function Main() {
  const token = useTokenStore((state) => state.token);

  const [state, setState] = useState({
    isButtonDisabled: false,
    helperText: 0,
    updated: false,
    errors: 0,
    redirect: false,
    redirectTo: "",
  });

  // const [mutate, info] = useMutation(UpdatePost, {
  //   onSuccess: (data) => {
  //     queryCache.setQueryData(["posts", {id: id}], (prev) => {
  //       return {
  //         ...prev,
  //         name: data.name,
  //         body: data.body
  //       }
  //     })
  //     refetch()
  //   }
  // })

  const { isLoading, error, data, isFetching, refetch} = useQuery(
    "data",
    () => {
      const url = "http://127.0.0.1:8000/api/user/audiobooks";
      const jsonData = {
        page: 1,
        limit: 10,
      };
      const method = "POST";

      HandleFetch(url, method, jsonData, token)
        .then((resData) => {
          if (resData) {
            console.log(resData);
          }
        });
    },
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        // setState({
        //   name: data.name,
        //   body: data.body,
        // });
      },
    }
  );
  //mutate umożliwia mi zmianę a info pobranie tych danych 
  // Można wykorzystać przy dodawaniu jakichś danych, doda do cache i wyświe jednocześnie 
  // const update = async () => {
  //   try {
  //     await mutate({
  //       id: id,
  //       body: state
  //     })
  //   } catch (e) {}
  // }
  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <UserNavBar />
          <div className="p-5">
            <div className="p-3"></div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}
