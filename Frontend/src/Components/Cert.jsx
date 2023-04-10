import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactTooltip from "react-tooltip";
import { certStatus } from "../Utils/CertStatus";
import "./Cert.scss";
import Loading from './Loading';
import Timeline from './Timeline';

const Cert = ({ domain }) => {
  const { certDisplayCount, certDisplayLink } = window.Config;
  const [certInfo, setCertInfo] = useState();
  useEffect(() => {
    certStatus(domain).then(setCertInfo);
  }, [domain]);

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

  const createTimelineData = (percent) => {
    const timelineData = [];
    for (let i = 0; i < certDisplayCount; i++) {
      if (percent <= 0.00) {
        timelineData.push({ color: "red" });
      } else if (i >= percent * certDisplayCount) {
        timelineData.push({ color: "gray" });
      } else if (percent <= 0.10) {
        timelineData.push({ color: "orange" });
      } else {
        timelineData.push({ color: "green" });
      }
    }
    return timelineData;
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
        <Timeline data={createTimelineData(percent)} />
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
      <Loading />
    </div>
  );
}

export default Cert;