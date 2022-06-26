import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import BookFeature from "../features/BookFeature";
import CategoriesAndTagsFeature from "../features/CategoriesAndTagsFeature";
import AddUser from "../features/UserFeature/AddUser";
import UserList from "../features/UserFeature/UserList";
import UserStatistic from "../features/UserFeature/UserStatistic";

function BeeRoute(props) {
  return (
    <>
      <Nav />
      <Sidebar />
      <div
        className="bee-main-container"
      >
        <div className="bee-main-content">
          <Switch>
            <Redirect from="/" to="/user/statistic" exact />
            <Route path="/user/statistic" component={UserStatistic} exact />
            <Route path="/user/list" component={UserList} exact />
            <Route path="/user/add" component={AddUser} exact />
            <Route path="/book" component={BookFeature} exact />
            <Route
              path="/categories-tags"
              component={CategoriesAndTagsFeature}
              exact
            />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default BeeRoute;
