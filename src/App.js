import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ShiftList from "./ShiftList";
import ShiftEdit from "./Shiftedit";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={ShiftList} />
          <Route path="/shifts/:id" component={ShiftEdit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
