import { UserNavBar } from "../../Components/NavBars/UserNavBar";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Settings() {
  return (
    <HelmetProvider>
      <Helmet>
        <style>{"body { background-color: black; }"}</style>
      </Helmet>

      <div className="container-fluid main-container mt-3">
        <div className="card position-relative p-3 mb-5  bg-dark shadow">
          <UserNavBar />
        </div>
      </div>
    </HelmetProvider>
  );
}
