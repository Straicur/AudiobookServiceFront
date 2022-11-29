import{Navigate} from "react-router-dom";
import { BrowserRouter as Router ,Routes, Route, } from 'react-router-dom';
import { useTokenStore } from './store'

import {Page404} from "./components/Page404/Page404"

import {Audiobooks} from "./Admin/Audibooks/Audiobooks";
import {Category} from "./Admin/Categories/Category";
import {Categories} from "./Admin/Categories/Categories";
import {Login as AdminLogin} from "./Admin/Login/Login";
import {Notifications} from "./Admin/Notifications/Notifications";
import {Users} from "./Admin/Users/Users";

import {Forgot} from "./User/Forgot/Forgot";
import {Help} from "./User/Help/Help";
import {Login as UserLogin} from "./User/Login/Login";
import {Main} from "./User/Main/Main";
import {MyList} from "./User/MyList/MyList";
import {Register} from "./User/Register/Register";
import {Settings} from "./User/Settings/Settings";


function App() {
  const token = useTokenStore((state) => state.token)

  return (
    <Router>
      <Routes>
          {/*Admin*/}
          <Route
              exact
              path="/admin"
              render={() => {
                  return (
                      token ==="" || token === undefined?
                          <Navigate to="/admin/login" /> :
                          <Navigate to="/admin/categories" />
                  )
              }}
          />
          <Route exact path="/admin/login" render={()=> {
              return (<AdminLogin/>)
          }}/>

          <Route exact path="/admin/audiobooks" render={()=> {
              return (<Audiobooks/>)
          }}/>
          <Route exact path="/admin/categories" render={()=> {
              return (<Categories/>)
          }}/>
            <Route exact path="/admin/notifications" render={()=> {
              return (<Notifications/>)
          }}/>
          <Route exact path="/admin/users" render={()=> {
              return (<Users/>)
          }}/>
          <Route exact  path="/admin/category/:token" render={()=>{
              return (<Category/>)
              }}/>

          {/*User*/}
          <Route
              exact
              path="/"
              render={() => {
                  return (
                      token ==="" || token === undefined?
                          <Navigate to="/login" /> :
                          <Navigate to="/main" />
                  )
              }}
          />
          <Route exact path="/login" render={()=> {
              return (<UserLogin/>)
          }}/>
          <Route exact path="/register" render={()=> {
              return (<Register/>)
          }}/>
          <Route exact path="/main" render={()=> {
              return (<Main/>)
          }}/>
          <Route exact path="/myList" render={()=> {
              return (<MyList/>)
          }}/>
          <Route exact path="/help" render={()=> {
              return (<Help/>)
          }}/>
          <Route exact path="/user/settings" render={()=> {
              return (<Settings/>)
          }}/>
          <Route exact  path="/newPassword/:id" render={()=>{
              return (<Forgot/>)
          }}/>
          <Route exact path="/verify/email" render={()=> {
              return (<Page404/>)
          }}/>

          <Route component={Page404}/>
        </Routes>
    </Router>
  );
}

export default App;
