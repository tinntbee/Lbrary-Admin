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
import BookStatistic from "../features/BookFeature/BookStatistic";
import BookList from "../features/BookFeature/BookList";
import AddBook from "../features/BookFeature/AddBook";
import CategoriesList from "../features/CategoriesAndTagsFeature/CategoriesList";
import TagsList from "../features/CategoriesAndTagsFeature/TagsList";

function BeeRoute(props) {
  return (
    <>
      <Nav />
      <Sidebar />
      <div className="bee-main-container">
        <div className="bee-main-content">
          <Switch>
            <Redirect from="/" to="/user/statistic" exact />
            <Redirect from="/user" to="/user/statistic" exact />
            <Route path="/user/statistic" component={UserStatistic} exact />
            <Route path="/user/list" component={UserList} exact />
            <Route path="/user/add" component={AddUser} exact />
            <Redirect from="/book" to="/book/statistic" exact />
            <Route path="/book/statistic" component={BookStatistic} exact />
            <Route path="/book/list" component={BookList} exact />
            <Route path="/book/add" component={AddBook} exact />
            <Redirect
              from="/categories-tags"
              to="/categories-tags/tags-list"
              exact
            />
            <Route
              path="/categories-tags/categories-list"
              component={CategoriesList}
              exact
            />
            <Route
              path="/categories-tags/tags-list"
              component={TagsList}
              exact
            />
            <Redirect from="/" to="/user/statistic" />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default BeeRoute;
