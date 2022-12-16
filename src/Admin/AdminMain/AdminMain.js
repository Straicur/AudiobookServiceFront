import React, { useState } from "react";
import { AdminNavBar } from "../../components/AdminNavBar";
import { useTokenStore } from "../../store";

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
  //Dodaj jakiś bg i do tego po prostu opis co można robić i tyle 
  return (
    <>
      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <AdminNavBar/>
          <div className="p-5">
            <div className="p-3">
              <div className="p-3 text-light"><h1>Strona Administracji</h1></div>
              <div className="p-3 text-light">Wybierz odpowiednie zagadnienie w pasku nawigacji</div>
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
