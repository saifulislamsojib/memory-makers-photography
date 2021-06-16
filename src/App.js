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
import { auth, getToken } from "./components/Login/Login/authManager";
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

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
    AOS.refresh();
  }, []);

  useEffect(() => {
    const unsubscribe = auth()
    .onAuthStateChanged(user => {
      if (user) {
        const {email, displayName, photoURL, emailVerified} = user;

        const newUser = {
            email,
            name: displayName,
            photo: photoURL,
            emailVerified
        };
        getToken()
        .then(idToken => {
          if(idToken) {
              sessionStorage.setItem('Photography/idToken', `Bearer ${idToken}`);
              setLoggedInUser(newUser);
              setLoading(false);
          }
        })
      }
      else {
        setLoading(false);
      }
    })
    return unsubscribe;
  }, []);

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