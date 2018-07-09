import React, { Component } from "react";

class HeaderDropDownMenu extends Component {
  logout = () => {
    const { logout } = this.props;
    logout();
  };

  render() {
    return (
      <div id="userDrop" className="user-dropdown-content show">
        <a onClick={this.logout}>Sign Out</a>
      </div>
    );
  }
}

export default HeaderDropDownMenu;
