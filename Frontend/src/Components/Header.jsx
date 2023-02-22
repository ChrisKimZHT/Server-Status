import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const currentPath = useLocation().pathname;
  return (
    <div className="header">
      <div className="container">
        <div className="tab">
          <Link className={currentPath == "/" ? "active" : ""} to="/">{window.Config.uptimeTitle}</Link>
          <Link className={currentPath == "/cert" ? "active" : ""} to="/cert">{window.Config.certTitle}</Link>
        </div>
        <div className="nav">
          {window.Config.navbar.map((item, index) => (
            <a key={index} href={item.url} target="_blank">{item.text}</a>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Header;