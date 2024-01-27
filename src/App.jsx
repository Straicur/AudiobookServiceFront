import React from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTokenStore } from './Store/store';
import { QueryClientProvider, QueryClient } from 'react-query';
import Page404 from './Page/Page404/Page404';
import Audiobooks from './Page/Admin/AdminAudiobooks/Audiobooks';
import Audiobook from './Page/Admin/AdminAudiobook/Audiobook';
import AdminMain from './Page/Admin/AdminMain/AdminMain';
import Category from './Page/Admin/AdminCategory/Category';
import Categories from './Page/Admin/AdminCategories/Categories';
import Notifications from './Admin/Notifications/Notifications';
import Users from './Page/Admin/AdminUsers/Users';
import Forgot from './Page/User/UserForgot/Forgot';
import Help from './Page/User/UserHelp/Help';
import About from './Page/User/UserAbout/About';
import Policy from './Page/User/UserPolicy/Policy';
import UserLogin from './Page/User/UserLogin/UserLogin';
import Main from './Page/User/UserMain/Main';
import MyList from './Page/User/UserMyList/MyList';
import Register from './Page/User/UserRegister/Register';
import Settings from './Page/User/UserSettings/Settings';
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
            element={<Audiobooks />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/audiobook/:audiobookId'
            element={<Audiobook />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/categories'
            element={<Categories />}
            errorElement={<Page404 />}
          />
          <Route
            exact
            path='/admin/notifications'
            element={<Notifications />}
            errorElement={<Page404 />}
          />
          <Route exact path='/admin/users' element={<Users />} errorElement={<Page404 />} />
          <Route
            exact
            path='/admin/category/:categoryKey'
            element={<Category />}
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
          <Route exact path='/register' element={<Register />} errorElement={<Page404 />} />
          <Route exact path='/main' element={<Main />} errorElement={<Page404 />} />
          <Route exact path='/myList' element={<MyList />} errorElement={<Page404 />} />
          <Route exact path='/help' element={<Help />} errorElement={<Page404 />} />
          <Route exact path='/about' element={<About />} errorElement={<Page404 />} />
          <Route exact path='/policy' element={<Policy />} errorElement={<Page404 />} />
          <Route exact path='/user/settings' element={<Settings />} errorElement={<Page404 />} />
          <Route
            exact
            path='/user/reset/password/:id'
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
