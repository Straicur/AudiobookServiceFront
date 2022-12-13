import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { UserNavBar } from "../../components/UserNavBar";
import Button from "react-bootstrap/Button";
import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HandleFetch } from "../../components/HandleFetch";
import { useTokenStore } from "../../store";

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

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>

      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <UserNavBar setNavState={setState} navState={state} />
          <div className="p-5">
            <div className="p-3"></div>
          </div>
        </div>
      </div>
      {state.redirect ? (
        <Navigate
          to={state.redirectTo !== undefined ? state.redirectTo : ""}
          replace={true} 
        />
      ) : null}
    </HelmetProvider>
  );
}
