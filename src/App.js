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
import Spinner from "./components/Shared/Spinner/Spinner";

export const context = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [adminLoading, setAdminLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [services, setServices] = useState([]);

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
    AOS.refresh();
  }, []);
  
    useEffect(() => {
      setIsAdmin(false);
        if (loggedInUser.email) {
          const token = sessionStorage.getItem('Photography/idToken');
          fetch(`https://memory-makers-photography.herokuapp.com/isAdmin?email=${loggedInUser.email}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  authorization: token
              }
          })
          .then(res => res.json())
          .then(data => {
            setIsAdmin(data);
            setAdminLoading(false);
          })
        }
    }, [loggedInUser])

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
      setServices
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
            {adminLoading ? 
            <Spinner />
            :<Dashboard isAdmin={isAdmin} />}
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