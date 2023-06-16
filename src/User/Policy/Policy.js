import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Footer } from "../../Components/Footers/Footer";
import "./Policy.css";

export default function Policy() {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>
      <div className="container-fluid main-container policy_page_container mt-3">
        <div className="card position-relative p-3 bg-dark shadow policy_page text-center text-white">
          <div className="row fs-2">{t("privacyPolicyDesc")}</div>
        </div>
      </div>
      <Footer />
    </HelmetProvider>
  );
}
