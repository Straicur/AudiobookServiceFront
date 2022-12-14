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

  return (
    <>
      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <AdminNavBar setNavState={setState} navState={state} />
          <div className="p-5">
            <div className="p-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
