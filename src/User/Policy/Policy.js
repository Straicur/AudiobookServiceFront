import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Footer } from "../../View/User/Common/Footer";
import "./Policy.css";

export default function Policy() {
  const { t, i18n } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className="container-fluid main-container policy_page_container mt-3">
        <div className="card position-relative p-3 bg-dark shadow policy_page text-white">
          <div className="row justify-content-end  align-items-center">
            <div className="col-2">
              <ButtonGroup className="ps-5 ms-5">
                <Button
                  name="pl"
                  size="sm"
                  className={
                    i18n.language == "pl"
                      ? "btn  m-1 button_light"
                      : "btn  m-1 button_dark"
                  }
                  onClick={() => i18n.changeLanguage("pl")}
                >
                  PL
                </Button>
                <Button
                  name="en"
                  size="sm"
                  className={
                    i18n.language == "en"
                      ? "btn  m-1 button_light"
                      : "btn  m-1 button_dark"
                  }
                  onClick={() => i18n.changeLanguage("en")}
                >
                  EN
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <div className="row">
            <p className="fs-1 fw-bold text-center">{t("privacyPolicy")}</p>
          </div>
          <div className="fs-5 px-3">
            <p className="text-start">{t("privacyPolicyDesc1")}</p>
            <p className="text-start">{t("privacyPolicyDesc2")}</p>
            <hr />
            <ol>
              <li className="styled_list text-start">
                {t("privacyPolicyDesc3")}
                <p>{t("privacyPolicyDesc4")}</p>
                <p>{t("privacyPolicyDesc5")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc6")}
                <p>{t("privacyPolicyDesc7")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc8")}
                <p>{t("privacyPolicyDesc9")}</p>
                <p>{t("privacyPolicyDesc10")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc11")}
                <p>{t("privacyPolicyDesc12")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc13")}
                <p>{t("privacyPolicyDesc14")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc15")}
                <p>{t("privacyPolicyDesc16")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc17")}
                <p>{t("privacyPolicyDesc18")}</p>
              </li>
              <hr />
              <li className="styled_list text-start">
                {t("privacyPolicyDesc19")}
                <p>
                  {t("privacyPolicyDesc20")} <a href="/help">{t("help")}</a>.
                </p>
              </li>
              <hr />
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </HelmetProvider>
  );
}
