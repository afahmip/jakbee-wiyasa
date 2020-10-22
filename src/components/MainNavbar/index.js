import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Nav, Navbar } from "shards-react";

// import NavbarSearch from "./NavbarSearch";
import Notifications from "./Notifications";
import UserActions from "./UserActions";

class MainNavbar extends React.Component {
  render() {
    const { stickyTop } = this.props;
    const classes = classNames(
      "main-navbar",
      "px-5",
      stickyTop && "sticky-top"
    );

    return (
      <div className={classes}>
        <Navbar type="light" className="align-items-stretch flex-md-nowrap p-0">
          {/* <NavbarSearch /> */}
          <Nav navbar className="flex-row">
            <Notifications />
            <UserActions />
          </Nav>
          <nav className="nav">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              onClick={this.props.onToggle}
              className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
              <i className="material-icons">&#xE5D2;</i>
            </a>
          </nav>
        </Navbar>
      </div>
    );
  }
};

MainNavbar.propTypes = {
  /* The layout type where the MainNavbar is used. */
  layout: PropTypes.string,
  /* Whether the main navbar is sticky to the top, or not. */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
