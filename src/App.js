import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTokenStore } from "./store";
import { QueryClientProvider, QueryClient } from "react-query";

import Page404 from "./Components/Page404";

import Audiobooks from "./Admin/Audibooks/Audiobooks";
import Audiobook from "./Admin/Audibooks/Audiobook";
import AdminMain from "./Admin/AdminMain/AdminMain";
import Category from "./Admin/Categories/Category";
import Categories from "./Admin/Categories/Categories";
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
  const queryClient = new QueryClient();

  //tutaj muszę sprawdzać czy jest auth, wykorzystaj nowy endpoint
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/*Admin*/}
          {/* <Route
          exact
          path="/admin/"
          element={
            token == "" || token == undefined ? (
              <Navigate to="/login" 
               replace={true} 
               />
            ) : (
              <Navigate to="/admin"  
              replace={true} 
              />
            )
          }
        /> */}
          <Route
            exact
            path="/admin"
            element={<AdminMain />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/audiobooks"
            element={<Audiobooks />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/audiobook/:audiobookId"
            element={<Audiobook />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/categories"
            element={<Categories />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/notifications"
            element={<Notifications />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/users"
            element={<Users />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/admin/category/:categoryKey"
            element={<Category />}
            errorElement={<Page404 />}
          />

          {/*User*/}
          <Route
            exact
            path="/"
            element={
              token == "" || token == undefined ? (
                <Navigate to="/login" replace={true} />
              ) : (
                <Navigate to="/main" replace={true} />
              )
            }
          />
          <Route
            exact
            path="/login"
            element={<UserLogin />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/register"
            element={<Register />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/main"
            element={<Main />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/myList"
            element={<MyList />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/help"
            element={<Help />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/user/settings"
            element={<Settings />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path="/user/reset/password/:id"
            element={<Forgot />}
            errorElement={<Page404 />}
          />

          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
