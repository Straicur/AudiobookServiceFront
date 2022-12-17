import React, { useState } from "react";
import { AdminNavBar } from "../../components/AdminNavBar";
import { useTokenStore } from "../../store";
import { useMutation, useQuery, queryCache } from "react-query";
import { HandleFetch } from "../../components/HandleFetch";

export default function AdminMain() {
  const token = useTokenStore((state) => state.token);

  const [state, setState] = useState({
    isButtonDisabled: false,
    helperText: 0,
    updated: false,
    errors: 0,
    redirect: false,
    redirectTo: "",
  });
  // Dodaj jakiś bg i do tego po prostu opis co można robić i tyle

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () => {
      const url = "http://127.0.0.1:8000/api/admin/statistic/main";
      const jsonData = {};
      const method = "GET";

      HandleFetch(url, method, null, token)
        .then((resData) => resData.json())
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
        // console.log("Łdadzia");
        // setState({
        //   name: data.name,
        //   body: data.body,
        // });
      },
    }
  );
  const {
    isLoading: isLoadingSecond,
    error: errorSecond,
    data: dataSecond,
    isFetching: isFetchingSecond,
    refetch: refetchSecond,
  } = useQuery(
    "data",
    () => {
      const url = "http://127.0.0.1:8000/api/admin/statistic/best/audiobooks";
      const method = "GET";

      HandleFetch(url, method, null, token)
        // .then((resData) => resData.json())
        .then((resData) => {
          if (resData) {
            console.log("audiobooks");
            // console.log(resData);
          }
        })
    },
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        // console.log("Łdadzia");
        // setState({
        //   name: data.name,
        //   body: data.body,
        // });
      },
    }
  );

  return (
    <>
      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <AdminNavBar />
          <div className="p-5">
            <div className="p-3">
              <div className="p-3 text-light">
                <h1>Strona Administracji</h1>
              </div>
              <div className="p-3 text-light">
              
                Wybierz odpowiednie zagadnienie w pasku nawigacji
              </div>
              <div className="p-3 text-light">Aktualnie posiada:</div>
              <div className="p-3 text-light">... Kategorii</div>
              <div className="p-3 text-light">... Audiobooków</div>
              <div className="p-3 text-light">... Użytkowników</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
