import { useTranslation } from "react-i18next";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Footer } from "../../Components/Footers/Footer";

export default function Policy() {
  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>

      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 bg-dark shadow"></div>
      </div>
      <Footer />
    </HelmetProvider>
  );
}
