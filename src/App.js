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

export const userContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (loggedInUser.email) {
          const token = sessionStorage.getItem('Photography/idToken');
          fetch(`http://localhost:4000/isAdmin?email=${loggedInUser.email}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  authorization: token
              }
          })
          .then(res => res.json())
          .then(data => setIsAdmin(data))
        }
    }, [loggedInUser])

  useEffect(() => {
    auth()
    .onAuthStateChanged(user => {
      if (user) {
        const {email, displayName, photoURL} = user;

        const newUser = {
            email,
            name: displayName,
            photo: photoURL
        };
        getToken()
        .then(res => res && setLoading(false))
        setLoggedInUser(newUser);
      }
      else {
        setLoading(false);
      }
    })
  }, []);
  
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser, loading]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/book/:id">
            <Book />
          </PrivateRoute>
          <PrivateRoute path="/dashboard">
            <Dashboard isAdmin={isAdmin} />
          </PrivateRoute>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
};

export default App;