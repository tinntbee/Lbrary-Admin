import React from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import ReportChart from "./components/ReportChart";
import UsersList from "./components/UsersList";

UserFeature.propTypes = {};

function UserFeature(props) {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Người dùng</h1>
            </div>
          </div>
        </div>
      </div>
      <section className="content">
        <div className="container-fluid">
          <Header />
          <ReportChart />
          <UsersList />
        </div>
      </section>
    </div>
  );
}

export default UserFeature;
