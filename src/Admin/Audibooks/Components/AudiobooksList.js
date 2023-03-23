import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";


export default function AudiobooksList(props) {
  const { t } = useTranslation();

  return(
    <div className="container-fluid main-container mt-3">
    <div className="card position-relative p-3 mb-5  shadow">
      <AdminNavBar />
      <hr className="line" />
      </div>
    </div>
  )
}