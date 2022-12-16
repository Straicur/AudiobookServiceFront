import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../components/UserNavBar";
import { useTokenStore } from "../../store";
import { useQuery } from "react-query";
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

  const {  isLoading, error, data, isFetching } = useQuery("data", () => {
    const url = "http://127.0.0.1:8000/api/user/audiobooks";
    const jsonData = {
      page: 1,
      limit: 10,
    };
    const method = "POST";

    HandleFetch(url, jsonData, method, token)
      .then((resData) => resData.json())
      .then((resData) => {
        if (resData) {
          console.log(resData);
        }
      });
  });

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      {console.log(data)}
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
