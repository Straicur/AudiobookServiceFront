import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTokenStore } from 'Store/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import Page404 from 'Page/Page404/Page404';
import AdminAudiobooks from 'Page/Admin/AdminAudiobooks/AdminAudiobooks';
import AdminAudiobook from 'Page/Admin/AdminAudiobook/AdminAudiobook';
import AdminMain from 'Page/Admin/AdminMain/AdminMain';
import AdminCategory from 'Page/Admin/AdminCategory/AdminCategory';
import AdminCategories from 'Page/Admin/AdminCategories/AdminCategories';
import AdminNotifications from 'Admin/Notifications/AdminNotifications';
import AdminUsers from 'Page/Admin/AdminUsers/AdminUsers';
import UserForgot from 'Page/User/UserForgot/UserForgot';
import UserHelp from 'Page/User/UserHelp/UserHelp';
import UserAbout from 'Page/User/UserAbout/UserAbout';
import UserPolicy from 'Page/User/UserPolicy/UserPolicy';
import UserLogin from 'Page/User/UserLogin/UserLogin';
import UserMain from 'Page/User/UserMain/UserMain';
import UserMyList from 'Page/User/UserMyList/UserMyList';
import UserRegister from 'Page/User/UserRegister/UserRegister';
import UserSettings from 'Page/User/UserSettings/UserSettings';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const token = useTokenStore((state) => state.token);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/*Admin*/}
          <Route exact path='/admin' element={<AdminMain />} errorElement={<Page404 />} />
          <Route
            exact
            path='/admin/audiobooks'
            element={<AdminAudiobooks />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/audiobook/:audiobookId'
            element={<AdminAudiobook />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/categories'
            element={<AdminCategories />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/notifications'
            element={<AdminNotifications />}
            errorElement={<Page404 />}
          />
          <Route exact path='/admin/users' element={<AdminUsers />} errorElement={<Page404 />} />
          <Route
            exact
            path='/admin/category/:categoryKey'
            element={<AdminCategory />}
            errorElement={<Page404 />}
          />

          {/*User*/}
          <Route
            exact
            path='/'
            element={
              token == '' || token == undefined ? (
                <Navigate to='/login' replace={true} />
              ) : (
                <Navigate to='/main' replace={true} />
              )
            }
          />
          <Route exact path='/login' element={<UserLogin />} errorElement={<Page404 />} />
          <Route exact path='/register' element={<UserRegister />} errorElement={<Page404 />} />
          <Route exact path='/main' element={<UserMain />} errorElement={<Page404 />} />
          <Route exact path='/myList' element={<UserMyList />} errorElement={<Page404 />} />
          <Route exact path='/help' element={<UserHelp />} errorElement={<Page404 />} />
          <Route exact path='/about' element={<UserAbout />} errorElement={<Page404 />} />
          <Route exact path='/policy' element={<UserPolicy />} errorElement={<Page404 />} />
          <Route
            exact
            path='/user/settings'
            element={<UserSettings />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/user/reset/password/:id'
            element={<UserForgot />}
            errorElement={<Page404 />}
          />

          <Route element={<Page404 />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
