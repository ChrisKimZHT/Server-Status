import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { GetMonitors } from "../Utils/UptimeRobot";
import { formatDuration } from "../Utils/FormatDuration";
import { formatNumber } from "../Utils/FormatNumber";
import { Link } from "react-router-dom";
import "./Uptime.scss";

const Uptime = ({ apiKey }) => {
  const status = {
    ok: "正常",
    good: "一般",
    down: "无法访问",
    unknow: "未知"
  };

  const { uptimeDisplayCount, uptimeDisplayLink } = window.Config;

  const [monitors, setMonitors] = useState();

  useEffect(() => {
    GetMonitors(apiKey, uptimeDisplayCount).then(setMonitors);
  }, [apiKey, uptimeDisplayCount]);

  if (monitors) {
    return monitors.map((site) => (
      <div key={site.id} className="uptime">
        <div className="meta">
          <span className="name" dangerouslySetInnerHTML={{ __html: site.name }} />
          {uptimeDisplayLink && <Link className="link" to={site.url}>{site.name}</Link>}
          <span className={"status " + site.status}>{status[site.status]}</span>
        </div>
        <div className="timeline">
          {site.daily.map((data, index) => {
            let status = "";
            let text = data.date.format("YYYY-MM-DD ");
            if (data.uptime >= 100) {
              status = "ok";
              text += `可用率 ${formatNumber(data.uptime)}%`;
            }
            else if (data.uptime >= 98) {
              status = "good";
              text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`;
            }
            else if (data.uptime <= 0 && data.down.times === 0) {
              status = "none";
              text += "无数据";
            }
            else {
              status = "down";
              text += `故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`;
            }
            return (<i key={index} className={status} data-tip={text} />)
          })}
        </div>
        <div className="summary">
          <span>今天</span>
          <span>
            {site.total.times
              ? `最近 ${uptimeDisplayCount} 天故障 ${site.total.times} 次，累计 ${formatDuration(site.total.duration)}，平均可用率 ${site.average}%`
              : `最近 ${uptimeDisplayCount} 天可用率 ${site.average}%`}
          </span>
          <span>{site.daily[site.daily.length - 1].date.format("YYYY-MM-DD")}</span>
        </div>
        <ReactTooltip className="tooltip" place="top" type="dark" effect="solid" />
      </div>
    ));
  }
  return (
    <div className="uptime">
      <div className="loading" />
    </div>
  );
}

export default Uptime;