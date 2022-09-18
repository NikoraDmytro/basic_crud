import React from "react";
import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";

import styles from "./UserLayout.module.scss";

const renderNavLink = (text: string, path: string) => {
  const className = ({ isActive }: { isActive: boolean }) => {
    return classNames({
      [styles.navBarLink]: true,
      [styles.activeLink]: isActive,
    });
  };

  return (
    <NavLink className={className} to={path} end>
      {text}
    </NavLink>
  );
};

export const UserLayout = () => (
  <div className={styles.mainBox}>
    <nav className={styles.navBar}>
      <li>{renderNavLink("Users", "")}</li>
      <li>{renderNavLink("Add user", "add")}</li>
    </nav>

    <Outlet />
  </div>
);
