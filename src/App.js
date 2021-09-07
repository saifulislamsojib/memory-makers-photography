import AOS from "aos";
import "aos/dist/aos.css";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.css';
import { auth, getToken, setUser } from "./components/Login/Login/authManager";
import './components/Shared/Navbar/Navbar.css';
import Spinner from "./components/Shared/Spinner/Spinner";

const Home = lazy(()=> import("./components/Home/Home/Home"));
const Dashboard = lazy(()=> import("./components/Dashboard/Dashboard/Dashboard"));
const Login = lazy(()=> import("./components/Login/Login/Login"));
const PrivateRoute = lazy(()=> import("./components/Login/PrivateRoute/PrivateRoute"));
const NotFound = lazy(()=> import("./components/NotFound/NotFound"));

export const context = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [adminLoaded, setAdminLoaded] = useState(false);

  const [services, setServices] = useState([]);

  const [userCalled, setUserCalled] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("dark-mode"))||false);

  const setDarkMode = () => {
    setIsDarkMode(preValue => !preValue);
    localStorage.setItem("dark-mode", !isDarkMode);
  };

  useEffect(() => {
    const className = isDarkMode?"dark-mode":"";
    window.document.body.className = className;
  }, [isDarkMode]);

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
      setAdminLoaded,
      setDarkMode,
      isDarkMode
    };
  
  return (
    <context.Provider value={contextValue}>
      <Router>
        <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
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
        </Suspense>
      </Router>
    </context.Provider>
  );
};

export default App;