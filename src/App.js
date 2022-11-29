import{Redirect} from "react-router-dom";
import { BrowserRouter as Router ,Switch, Route, } from 'react-router-dom';
import { useTokenStore } from './store'






function App() {
  const token = useTokenStore((state) => state.token)

  return (
    <Router>
      <Switch>
          {/*Admin*/}
          <Route
              exact
              path="/admin"
              render={() => {
                  return (
                      count ==="" || count === undefined?
                          <Redirect to="/admin/login" /> :
                          <Redirect to="/admin/sets" />
                  )
              }}
          />
          <Route exact path="/admin/login" render={()=> {
              return (<Login/>)
          }}/>

          <Route exact path="/admin/sets" render={()=> {
              return (<Sets/>)
          }}/>
          <Route exact path="/admin/users" render={()=> {
              return (<Users/>)
          }}/>
          <Route exact  path="/admin/set/:token" render={()=>{
              return (<Set/>)
              }}/>

          {/*User*/}
          <Route
              exact
              path="/"
              render={() => {
                  return (
                      count ==="" || count === undefined?
                          <Redirect to="/login" /> :
                          <Redirect to="/main" />
                  )
              }}
          />
          <Route exact path="/login" render={()=> {
              return (<LoginUser/>)
          }}/>
          <Route exact path="/register" render={()=> {
              return (<RegisterUser/>)
          }}/>
          <Route exact path="/main" render={()=> {
              return (<UserMain/>)
          }}/>
          <Route exact path="/myList" render={()=> {
              return (<UserMyList/>)
          }}/>
          <Route exact path="/help" render={()=> {
              return (<UserHelp/>)
          }}/>
          <Route exact path="/user/settings" render={()=> {
              return (<UserSettings/>)
          }}/>
          <Route exact  path="/newPassword/:id" render={()=>{
              return (<UserNewPassword/>)
          }}/>
          <Route exact path="/verify/email" render={()=> {
              return (<Page404/>)
          }}/>

          <Route component={Page404}/>
        </Switch>
    </Router>
  );
}

export default App;
