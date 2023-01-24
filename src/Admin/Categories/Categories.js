import React, { useState } from "react";
import { useTokenStore } from "../../store";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";
import CategoriesList from "./components/CategoriesList";
import { useQuery } from "react-query";
import { HandleFetch } from "../../components/HandleFetch";


export default function Categories() {
  const token = useTokenStore((state) => state.token);

  const [infoState, setInfoState] = useState({
    users: 0,
    categories: 0,
    audiobooks: 0,
    lastWeekRegistered: 0,
    lastWeekLogins: 0,
    lastWeekNotifications: 0,
    error: null,
  });
  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/categories",
        "GET",
        null,
        token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
      },
      onSuccess: (data) => {
        console.log(data)
      },
    }
  );
  return (
    <ErrorBoundary
      FallbackComponent={ErrorHandlerModal}
      onReset={() => {
        setInfoState({
          ...infoState,
          error: null,
        });
      }}
    >
      <CategoriesList
        infoState={infoState}
        setInfoState={setInfoState}
        token={token}
      />
    </ErrorBoundary>
  );
}