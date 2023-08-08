import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from "react"
import NavBar from "./NavBar.js"
import {Route, Switch} from "react-router-dom";
import Authentication from "./Authentication";
import Home from "./Home"
import HikePage from "./HikePage"
import Social from "./Social"

function App() {
  return (
    <div className="App">
      <Authentication />
      <NavBar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/hikes'>
          <HikePage />
        </Route>
        <Route path='/social'>
          <Social />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
