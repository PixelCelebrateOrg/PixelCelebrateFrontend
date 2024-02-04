import logo from './logo.svg';
import './App.css';

import React, {createContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes, Switch} from 'react-router-dom'
import Home from './home/home';
import UserPageContainer from './userPage/userPage-container'

import ErrorPage from './commons/errorhandling/error-page';
import {AppProvider} from "./AppContext";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailLoggedUser, setEmailLoggedUser] = useState("");

  useEffect(() => {
    //Repunerea datelor:
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    setIsAdmin(localStorage.getItem("isAdmin"));
    setEmailLoggedUser(localStorage.getItem("emailLoggedUser"));
  })

  return (
      <AppProvider
          value={{ isAdmin, isLoggedIn, emailLoggedUser, setIsAdmin, setIsLoggedIn, setEmailLoggedUser,}}
      >
        <div className="App">
          <Router>
            <div>
              <Switch>

                <Route
                    exact
                    path='/'
                    render={() => <Home/>}
                />

                <Route
                    exact
                    path='/userPage'
                    render={() => <UserPageContainer/>}
                />

                {/*Error*/}
                <Route
                    exact
                    path='/error'
                    render={() => <ErrorPage/>}
                />

                <Route render={() =><ErrorPage/>} />
              </Switch>
            </div>
          </Router>
        </div>
       </AppProvider>
  );
}

export default App;
