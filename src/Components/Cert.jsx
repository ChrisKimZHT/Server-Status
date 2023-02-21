import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactTooltip from "react-tooltip";
import { certStatus } from "../Utils/CertStatus";

const Cert = ({ domain }) => {
  const { ShowLink } = window.Config;
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
    const percent = Math.round(remain / length * 90);
    return (<div className="site">
      <div className="meta">
        <span className="name" dangerouslySetInnerHTML={{ __html: domain }} />
        {ShowLink && <a className="link" href={domain}>{domain}</a>}
        <span className={"status"}>这里是状态</span>
      </div>
      <div className="timeline">
        {Array.from({ length: 90 }, (_, index) => {
          return (<i key={index} className={index < percent ? "ok" : "none"} />)
        })}
      </div>
      <div className="summary">
        <span>{expire.format("YYYY/MM/DD HH:mm:ss")}</span>
        <span>{certInfo["subject"]}</span>
        <span>{start.format("YYYY/MM/DD HH:mm:ss")}</span>
      </div>
      <ReactTooltip className="tooltip" place="top" type="dark" effect="solid" />
    </div>);
  }
  else {
    return (
      <div className="site">
        <div className="loading" />
      </div>
    );
  }
}

export default Cert;