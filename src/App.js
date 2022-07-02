import { Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoginFeature from "./features/LoginFeature";
import BeeRoute from "./route";
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide";

function App() {
  return (
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      TransitionComponent={Slide}
    >
      <Route
        render={({ location }) =>
          ["/login"].includes(location.pathname) ? null : <BeeRoute />
        }
      />

      <Switch>
        <Redirect from="/" to="/user/statistic" exact />
        <Route path="/login" component={LoginFeature} exact />
      </Switch>
    </SnackbarProvider>
  );
}

export default App;
