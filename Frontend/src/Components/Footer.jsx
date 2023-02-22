import React from 'react';
import Package from "../../package.json";
import "./Footer.scss";

const Footer = () => {
  const { icpLicense } = window.Config;
  return (
    <div className="footer">
      <p><a href="https://beian.miit.gov.cn/">{icpLicense}</a></p>
      <p>Server-Status by <a href="https://github.com/ChrisKimZHT/Server-Status">ChrisKimZHT</a>, Version {Package.version}</p>
    </div>
  );
}

export default Footer;