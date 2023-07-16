import React, { useEffect } from "react";
import { AdminNavBar } from "../../../Components/NavBars/AdminNavBar";
import { useQuery } from "react-query";
import { HandleFetch } from "../../../Components/HandleFetch";
import { useTranslation } from "react-i18next";
import Card from "react-bootstrap/Card";

export default function InfoContainer(props) {
  const { t, i18n } = useTranslation();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "data",
    () =>
      HandleFetch(
        "/admin/statistic/main",
        "GET",
        null,
        props.token,
        i18n.language
      ),
    {
      retry: 1,
      retryDelay: 500,
      refetchOnWindowFocus: false,
      onError: (e) => {
        props.setInfoState({
          ...props.infoState,
          error: e,
        });
      },
      onSuccess: (data) => {
        props.setInfoState({
          ...props.infoState,
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
    if (props.infoState.error != null) {
      throw props.infoState.error;
    }
  }, [props.infoState.error]);

  return (
    <div className="container-fluid main-container mt-3">
      <div className="card position-relative p-3 mb-5 shadow">
        <AdminNavBar />
        <div className="p-5">
          <div className="p-3">
            <div className="p-3">
              <div className="text-center fs-4">
                <p className="fs-1 fw-bold">{t("administrationPage")} </p>
                <p className="fs-1 fw-bold">{t("chooseNabOptions")}</p>
              </div>
            </div>
            <div className="text-center fs-4">
              <p className="p-3">{t("currentApp")}</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-6">
                <Card className="info_card">
                  <Card.Body className="info_card_body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col align-self-center border-end border-dark">
                        <div className="row info_card_body_el">
                          <p className="text-center">{t("categories")}</p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {props.infoState.categories}
                          </p>
                        </div>
                      </div>
                      <div className="col align-self-center border-end border-dark">
                        <div className="row info_card_body_el">
                          <p className="text-center">{t("audiobooks")}</p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {props.infoState.audiobooks}
                          </p>
                        </div>
                      </div>
                      <div className="col align-self-center">
                        <div className="row info_card_body_el">
                          <p className="text-center">{t("users")}</p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">{props.infoState.users}</p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
            <div className="text-center fs-4">
              <p className="p-3">{t("lastWeek")}</p>
            </div>
            <div className="row justify-content-center">
              <div className="col-6">
                <Card className="info_card">
                  <Card.Body className="info_card_body">
                    <div className="row align-items-center justify-content-center">
                      <div className="col align-self-center border-end border-dark">
                        <div className="row info_card_body_el">
                          <p className="text-center">{t("registered")}</p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {props.infoState.lastWeekRegistered}
                          </p>
                        </div>
                      </div>
                      <div className="col align-self-center border-end border-dark">
                        <div className="row info_card_body_el">
                          <p className="text-center">{t("loggedIn")}</p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {props.infoState.lastWeekLogins}
                          </p>
                        </div>
                      </div>
                      <div className="col align-self-center">
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {t("wasCreatedNotifications")}
                          </p>
                        </div>
                        <div className="row info_card_body_el">
                          <p className="text-center">
                            {props.infoState.lastWeekNotifications}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
