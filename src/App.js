import AOS from 'aos';
import "aos/dist/aos.css";
import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import Book from "./components/Book/Book/Book";
import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import Home from "./components/Home/Home/Home";
import { auth, getToken, setUser } from "./components/Login/Login/authManager";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";
import NotFound from "./components/NotFound/NotFound";

export const context = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [adminLoaded, setAdminLoaded] = useState(false);

  const [services, setServices] = useState([]);

  const [userCalled, setUserCalled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    let unsubscribe;
    if (!userCalled){
      unsubscribe = auth()
      .onAuthStateChanged(user => {
        if (user) {
          const newUser = setUser(user);
          getToken()
          .then(idToken => {
            if(idToken) {
                sessionStorage.setItem('Photography/idToken', `Bearer ${idToken}`);
                setLoggedInUser(newUser);
                setLoading(false);
                setUserCalled(true);
            }
          })
        }
        else {
          setLoading(false);
          setUserCalled(true);
        }
      })
    }
    return unsubscribe;
  }, [userCalled]);

    const contextValue = {
      loggedInUser,
      setLoggedInUser,
      loading,
      services,
      setServices,
      isAdmin,
      setIsAdmin,
      adminLoaded,
      setAdminLoaded
    };
  
  return (
    <context.Provider value={contextValue}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/book/:id">
            <Book />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </context.Provider>
  );
};

export default App;