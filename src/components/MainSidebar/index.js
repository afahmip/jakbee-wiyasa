import React from "react";
import classNames from "classnames";
import { Col } from "shards-react";

import SidebarNavItems from "./SidebarNavItems";

class MainSidebar extends React.Component {
  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.props.mobileMenuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{ size: 2 }}
        md={{ size: 3 }}
      >
        <div className="dashboard-logo">
          <img
            id="main-logo"
            src={require("../../images/logo.svg")}
            alt="Agamoto"
          />
        </div>
        <SidebarNavItems />
      </Col>
    );
  }
}

export default MainSidebar;
