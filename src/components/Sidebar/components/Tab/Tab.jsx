import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ArrowDownIcon from "../../../Icon/ArrowDownIcon";
import ArrowUpIcon from "../../../Icon/ArrowUpIcon";
import PeopleIcon from "../../../Icon/PeopleIcon";
import "./style.scss";

Tab.defaultProps = {
  icon: <PeopleIcon />,
  title: "Người dùng",
  subTabs: [],
  active: true,
  path: "#",
};

function Tab(props) {
  const { icon, title, subTabs, active, path } = props;
  const [showSubTabs, setShowSubTabs] = React.useState(active);
  React.useEffect(() => {
    if (active === true) {
      setShowSubTabs(active);
    }
  }, [active]);
  return (
    <li className={active ? "tab active" : "tab"}>
      <div className="tab-link">
        {icon}
        <Link to={path}>{title}</Link>
        {subTabs.length > 0 && (
          <div
            className="showSubTabs"
            onClick={() => setShowSubTabs(!showSubTabs)}
          >
            <ArrowDownIcon className={showSubTabs ? "show" : ""} />
          </div>
        )}
      </div>
      <ul
        className={showSubTabs ? "sub-tabs show" : "sub-tabs"}
        style={{ "--sub-tabs-number": subTabs.length }}
      >
        {subTabs.map((item, index) => {
          return (
            <li
              className={item.active ? "sub-tab active" : "sub-tab"}
              key={index}
            >
              <Link to={item.path} className="tab-link">
                {item.icon}
                <p>{item.title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
}

export default Tab;
