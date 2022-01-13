import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import BookFeature from "./features/BookFeature";
import CategoriesAndTagsFeature from "./features/CategoriesAndTagsFeature";
import LoginFeature from "./features/LoginFeature";
import UserFeature from "./features/UserFeature";

function App() {
  return (
    <>
      <Route
        render={({ location }) =>
          ["/login"].includes(location.pathname) ? null : (
            <>
              <Nav />
              <Sidebar />
            </>
          )
        }
      />

      <Switch>
        <Redirect from="/" to="/user" exact />
        <Route path="/login" component={LoginFeature} exact />
        <Route path="/user" component={UserFeature} exact />
        <Route path="/book" component={BookFeature} exact />
        <Route path="/categories-tags" component={CategoriesAndTagsFeature} exact />
      </Switch>
    </>
  );
}

export default App;
