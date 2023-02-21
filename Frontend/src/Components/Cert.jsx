import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactTooltip from "react-tooltip";
import { certStatus } from "../Utils/CertStatus";
import "./Cert.scss";

const Cert = ({ domain }) => {
  const { certDisplayCount, certDisplayLink } = window.Config;
  const [certInfo, setCertInfo] = useState();
  useEffect(() => {
    certStatus(domain).then(setCertInfo);
  }, [domain]);

  if (certInfo) {
    const now = dayjs();
    const start = dayjs(certInfo["start date"]);
    const expire = dayjs(certInfo["expire date"]);
    const length = expire.unix() - start.unix();
    const remain = expire.unix() - now.unix();
    const percent = remain / length;
    return (
      <div className="cert">
        <div className="meta">
          <span className="name" dangerouslySetInnerHTML={{ __html: domain }} />
          {certDisplayLink && <a className="link" href={"//" + domain}>{domain}</a>}
          <span className={`status ${remain > 0 ? "ok" : "expire"}`}>{remain > 0 ? "正常" : "过期"}</span>
        </div>
        <div className="timeline">
          {Array.from({ length: certDisplayCount }, (_, index) => {
            return (<i key={index} className={index < percent * certDisplayCount ? "green" : "gray"} />)
          })}
        </div>
        <div className="summary">
          <span>{expire.format("YYYY/MM/DD HH:mm:ss")}</span>
          <span data-tip={certInfo["issuer"]}>{certInfo["subject"]}</span>
          <span>{start.format("YYYY/MM/DD HH:mm:ss")}</span>
        </div>
        <ReactTooltip className="tooltip" place="bottom" type="dark" effect="solid" />
      </div>
    );
  }
  return (
    <div className="cert">
      <div className="loading" />
    </div>
  );
}

export default Cert;