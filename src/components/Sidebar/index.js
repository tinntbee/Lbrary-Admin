import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import adminAPI from "../../api/adminAPI";
import { useLocation, useHistory } from "react-router-dom";
import "./style.scss";
import tabs from "./listTabs";
import Tab from "./components/Tab/Tab";

Sidebar.propTypes = {};

function Sidebar(props) {
  const location = useLocation();
  const [listTabs, setListTabs] = useState(tabs);
  const history = useHistory();
  const [admin, setAdmin] = useState({
    avatar: "dist/img/user2-160x160.jpg",
    name: "Admin",
  });
  React.useEffect(() => {
    let newTabs = [...listTabs];
    newTabs.forEach((tab) => {
      tab.active = false;
      if (location.pathname.includes(tab.path)) {
        tab.active = true;
      }
      let isHad = false;
      tab.subTabs.forEach((subTab) => {
        subTab.active = false;
        if (!isHad && location.pathname.includes(subTab.path)) {
          subTab.active = true;
          isHad = true;
        }
      });
    });
    setListTabs([...newTabs]);
  }, [location.pathname]);
  useEffect(() => {
    let unmounted = false;
    adminAPI
      .reSign()
      .then((res) => {
        if (!unmounted) {
          setAdmin(res.admin);
        }
      })
      .catch((error) => {
        if (!unmounted) {
          if (error.response && error.response.status === 403) {
            history.replace("/login");
          }
        }
      });
    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <aside>
      <div className="sidebar">
        <div className="user-container">
          <div
            className="avatar"
            style={{ backgroundImage: `url("${admin.avatar}")` }}
          ></div>
          <div className="info">
            <p className="name">{admin.name}</p>
            <p className="mail">{"trungtin27132000@gmail.com"}</p>
          </div>
        </div>
        <div className="path"></div>

        <div className="tabs-container">
          <ul className="tabs">
            {listTabs.map((item, index) => {
              return (
                <Tab
                  icon={item.icon}
                  title={item.title}
                  active={item.active}
                  subTabs={item.subTabs}
                  path={item.path}
                  key={index}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
