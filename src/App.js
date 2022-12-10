import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTokenStore } from "./store";

import Page404 from "./components/Page404";

import Audiobooks from "./Admin/Audibooks/Audiobooks";
import Category from "./Admin/Categories/Category";
import Categories from "./Admin/Categories/Categories";
import AdminLogin from "./Admin/Login/AdminLogin";
import Notifications from "./Admin/Notifications/Notifications";
import Users from "./Admin/Users/Users";

import Forgot from "./User/Forgot/Forgot";
import Help from "./User/Help/Help";
import UserLogin from "./User/Login/UserLogin";
import Main from "./User/Main/Main";
import MyList from "./User/MyList/MyList";
import Register from "./User/Register/Register";
import Settings from "./User/Settings/Settings";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  const token = useTokenStore((state) => state.token);

  return (
    <Router>
      <Routes>
        {/*Admin*/}
        <Route
          exact
          path="/admin"
          element={
            token === "" || token === undefined ? (
              <Navigate to="/admin/login" />
            ) : (
              <Navigate to="/admin/categories" />
            )
          }
        />
        <Route exact path="/admin/login" element={<AdminLogin />} />

        <Route exact path="/admin/audiobooks" element={<Audiobooks />} />
        <Route exact path="/admin/categories" element={<Categories />} />
        <Route exact path="/admin/notifications" element={<Notifications />} />
        <Route exact path="/admin/users" element={<Users />} />
        <Route exact path="/admin/category/:token" element={<Category />} />

        {/*User*/}
        <Route
          exact
          path="/"
          element={
            token === "" || token === undefined ? (
              <Navigate to="/login" />
            ) : (
              <Navigate to="/main" />
            )
          }
        />
        <Route exact path="/login" element={<UserLogin />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/main" element={<Main />} />
        <Route exact path="/myList" element={<MyList />} />
        <Route exact path="/help" element={<Help />} />
        <Route exact path="/user/settings" element={<Settings />} />
        <Route exact path="/newPassword/:id" element={<Forgot />} />

        <Route exact path="/verify/email" element={<Page404 />} />

        <Route component={Page404} />
      </Routes>
    </Router>
  );
}

export default App;
