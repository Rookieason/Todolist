import React from 'react'
import SigninPage from './Container/signinPage.js'
import Homepage from './Container/homepage.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <SigninPage />
          </Route>
          <Route exact path="/homepage">
            <Homepage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
