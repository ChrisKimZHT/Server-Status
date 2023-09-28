import React from 'react';
import Package from "../../package.json";
import "./Footer.scss";

const Footer = () => {
  const { icpLicense, policeLicenseCode, policeLicenseText } = window.Config;
  return (
    <div className="footer">
      <p>Server-Status by <a href="https://github.com/ChrisKimZHT/Server-Status">ChrisKimZHT</a>, Version {Package.version}</p>
      <p>
        {icpLicense.length ? <a href="https://beian.miit.gov.cn/">{icpLicense}</a> : ""}
        {icpLicense.length && policeLicenseText.length ? " | " : ""}
        {policeLicenseText.length ? <a href={`https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${policeLicenseCode}`}>{policeLicenseText}</a> : ""}
      </p>
    </div>
  );
}

export default Footer;