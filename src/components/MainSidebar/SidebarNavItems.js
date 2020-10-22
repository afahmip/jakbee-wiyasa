import React from "react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink } from "shards-react";

class SidebarNavItems extends React.Component {
  state = {
    navItems: [
      {
        title: "Overview",
        icon: 'dashboard',
        to: "/",
      },
      {
        title: "Example 1",
        icon: 'credit_card',
        to: "/payments",
      },
      {
        title: "Example 2",
        icon: 'line_style',
        to: "/example"
      }
    ]
  };

  render() {
    const { navItems } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {navItems.map((item, idx) => (
            <NavItem key={idx}>
              <NavLink tag={RouteNavLink} exact to={item.to}>
                <div className="d-inline-block item-icon-wrapper">
                  <i className="material-icons">{item.icon}</i>
                </div>
                <span>{item.title}</span>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
