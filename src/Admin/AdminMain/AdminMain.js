import React, { useState } from "react";
import { AdminNavBar } from "../../components/AdminNavBar";
import { useTokenStore } from "../../store";
import { useQuery} from "react-query";
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

  const [infoState, setInfoState] = useState({
    users: 0,
    categories: 0,
    audiobooks: 0,
    lastWeekRegistered: 0,
    lastWeekLogins: 0,
    lastWeekNotifications: 0,
  });

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/statistic/main",
        "GET",
        null,
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: () => {
        console.log("Error");
      },
      onSuccess: (data) => {
        setInfoState({
          users: data.users,
          categories: data.categories,
          audiobooks: data.audiobooks,
          lastWeekRegistered: data.lastWeekRegistered,
          lastWeekLogins: data.lastWeekLogins,
          lastWeekNotifications: data.lastWeekNotifications,
        });
      },
    }
  );
  // TODO to jest do dokończenia
  // const {
  //   isLoading: isLoadingSecond,
  //   error: errorSecond,
  //   data: dataSecond,
  //   isFetching: isFetchingSecond,
  //   refetch: refetchSecond,
  // } = useQuery(
  //   "dataSecond",
  //   () =>
  //     HandleFetch(
  //       "http://127.0.0.1:8000/api/admin/statistic/best/audiobooks",
  //       "GET",
  //       null,
  //       token
  //     ),
  //   {
  //     retry: 1,
  //     retryDelay: 500,
  //     refetchOnWindowFocus: false,
  //     onError: () => {
  //       console.log("Error");
  //     },
  //     onSuccess: (data) => {
  //       console.log(data);
  //       if (
  //         data &&
  //         Object.keys(data).length === 0 &&
  //         Object.getPrototypeOf(data) === Object.prototype
  //       ) {
  //         setState({
  //           name: data.name,
  //           body: data.body,
  //         });
  //       }
  //     },
  //   }
  // );

  return (
    <>
      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <AdminNavBar />
          <div className="p-5">
            <div className="p-3">
              <div className="p-3 text-light">
                <h1>Strona Administracji </h1><h2>Wybierz odpowiednie zagadnienie w pasku nawigacji</h2>
              </div>
          
              <div className="p-3 text-light">Aktualnie posiada:</div>
              <div className="p-3 text-light">{infoState.categories} Kategorii</div>
              <div className="p-3 text-light">{infoState.audiobooks} Audiobooków</div>
              <div className="p-3 text-light">{infoState.users} Użytkowników</div>

              <div className="p-3 text-light">W ostatnim tygodniu:</div>
              <div className="p-3 text-light">Zarejsetrowało się {infoState.lastWeekRegistered} użytkowników</div>
              <div className="p-3 text-light">Zalogowało się {infoState.lastWeekLogins} użytkowników</div>
              <div className="p-3 text-light">Zaostało stworzonych {infoState.lastWeekNotifications} powiadomień</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
