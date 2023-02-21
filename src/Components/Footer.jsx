import React from 'react';
import Package from "../../package.json";

const Footer = () => {
  const { icpLicense } = window.Config;
  return (
    <div id="footer">
      <p><a to="https://beian.miit.gov.cn/">{icpLicense}</a></p>
      <p>Server-Status by <a href="https://github.com/ChrisKimZHT">ChrisKimZHT</a>, Version {Package.version}</p>
    </div>
  );
}

export default Footer;