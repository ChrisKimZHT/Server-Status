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

  const timelineColor = (index, percent) => {
    if (percent <= 0.00)
      return "red";
    if (index >= percent * certDisplayCount)
      return "gray";
    if (percent <= 0.10)
      return "orange";
    return "green";
  }

  const statusColor = (percent) => {
    if (percent <= 0.00)
      return "expired";
    if (percent <= 0.10)
      return "expiring";
    return "ok";
  }

  const statusText = (percent) => {
    if (percent <= 0.00)
      return "过期";
    if (percent <= 0.10)
      return "临期";
    return "正常";
  }

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
          <span className="name">{domain}</span>
          {certDisplayLink && <a className="link" href={"//" + domain}>{domain}</a>}
          <span className={`status ${statusColor(percent)}`}>{statusText(percent)}</span>
        </div>
        <div className="timeline">
          {Array.from({ length: certDisplayCount }, (_, index) => {
            return (
              <i
                key={index}
                className={timelineColor(index, percent)}
              />
            )
          })}
        </div>
        <div className="summary">
          <span data-tip={certInfo["start date"]}>{expire.format("YYYY/MM/DD")}</span>
          <span className="hide-600" data-tip={certInfo["issuer"]}>
            {`有效期 ${Math.round(length / 86400)} 天，剩余 ${(remain / 86400).toFixed(1)} 天 (${(percent * 100).toFixed(1)}%)`}
          </span>
          <span className="show-600">
            {`剩余 ${(remain / 86400).toFixed(1)} 天`}
          </span>
          <span data-tip={certInfo["expire date"]}>{start.format("YYYY/MM/DD")}</span>
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