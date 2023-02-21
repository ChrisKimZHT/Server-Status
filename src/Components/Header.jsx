import React from "react";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const currentPath = useLocation().pathname;
  return (
    <div id="header">
      <div className="container">
        <div className="tabs">
          <Link className={`tab ${currentPath == "/" ? "active" : ""}`} to="/">服务状态</Link>
          <Link className={`tab ${currentPath == "/cert" ? "active" : ""}`} to="/cert">证书状态</Link>
        </div>
        <div className="navi">
          {window.Config.navbar.map((item, index) => (
            <a key={index} href={item.url} target="_blank">{item.text}</a>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Header;