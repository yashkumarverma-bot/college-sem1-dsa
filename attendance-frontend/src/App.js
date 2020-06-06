import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

// importing pages
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
// import Marker from "./pages/Marker";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

// <Route exact path="/mark" component={Marker} />
export default App;
