import logo from "./logo.svg";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import UserFeature from "./features/UserFeature";
import BookFeature from "./features/BookFeature";

function App() {
  return (
    <>
      <Nav />
      <Sidebar />
      <Switch>
        <Route path="/user" component={UserFeature} exact />
        <Route path="/book" component={BookFeature} exact />
      </Switch>
    </>
  );
}

export default App;
