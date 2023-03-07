import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { useTokenStore } from "../../store";
import { useMutation, useQuery, queryCache } from "react-query";
import { HandleFetch } from "../../Components/HandleFetch";

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
