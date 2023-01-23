import React, { useEffect, useState } from "react";
import { AdminNavBar } from "../../components/AdminNavBar";
import { useTokenStore } from "../../store";
import { useQuery } from "react-query";
import { HandleFetch } from "../../components/HandleFetch";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorHandlerModal } from "../../Errors/ErrorHandlerModal";

export default function InfoContainer(props) {
  const { t } = useTranslation();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "http://127.0.0.1:8000/api/admin/statistic/main",
        "GET",
        null,
        props.token
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        setInfoState({
          ...infoState,
          error: e,
        });
      },
      onSuccess: (data) => {
        setInfoState({
          ...infoState,
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

  useEffect(() => {
    if (infoState.error != null) {
      throw infoState.error;
    }
  }, [infoState.error]);

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5  bg-dark shadow">
        <AdminNavBar />
        <div className="p-5">
          <div className="p-3">
            <div className="p-3 text-light">
              <h1>{t("administrationPage")} </h1>
              <h2>{t("chooseNabOptions")}</h2>
            </div>

            <div className="p-3 text-light">{t("currentApp")}</div>
            <div className="p-3 text-light">
              {t("categories")} :{infoState.categories}
            </div>
            <div className="p-3 text-light">
              {t("audiobooks")} :{infoState.audiobooks}
            </div>
            <div className="p-3 text-light">
              {t("users")} :{infoState.users}
            </div>

            <div className="p-3 text-light">{t("lastWeek")}</div>
            <div className="p-3 text-light">
              {t("registered")} {infoState.lastWeekRegistered} {t("smallUsers")}
            </div>
            <div className="p-3 text-light">
              {t("loggedIn")} {infoState.lastWeekLogins}
            </div>
            <div className="p-3 text-light">
              {t("wasCreated")} {infoState.lastWeekNotifications}{" "}
              {t("smallNotifications")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
