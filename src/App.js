import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoginFeature from "./features/LoginFeature";
import BeeRoute from "./route";

function App() {
  return (
    <>
      <Route
        render={({ location }) =>
          ["/login"].includes(location.pathname) ? null : <BeeRoute />
        }
      />

      <Switch>
        <Redirect from="/" to="/user/statistic" exact />
        <Route path="/login" component={LoginFeature} exact />
      </Switch>
    </>
  );
}

export default App;
