import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import { uptimeStatus } from "../Utils/UptimeStatus";
import { formatDuration } from "../Utils/FormatDuration";
import { formatNumber } from "../Utils/FormatNumber";
import "./Uptime.scss";
import Loading from "./Loading";
import Timeline from "./Timeline";

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
    uptimeStatus(apiKey, uptimeDisplayCount).then(setMonitors);
  }, [apiKey, uptimeDisplayCount]);

  const createTimelineData = (monitorData) => {
    const timelineData = [];
    for (const data of monitorData) {
      const date = data.date.format("YYYY-MM-DD");
      if (data.uptime >= 100) {
        timelineData.push({
          color: "green",
          text: `${date} 可用率 ${formatNumber(data.uptime)}%`
        })
      } else if (data.uptime >= 98) {
        timelineData.push({
          color: "orange",
          text: `${date} 故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`
        })
      } else if (data.uptime <= 0 && data.down.times === 0) {
        timelineData.push({
          color: "gray",
          text: "无数据"
        })
      } else {
        timelineData.push({
          color: "red",
          text: `${date} 故障 ${data.down.times} 次，累计 ${formatDuration(data.down.duration)}，可用率 ${formatNumber(data.uptime)}%`
        })
      }
    }
    return timelineData;
  }

  if (monitors) {
    return monitors.map((site, index) => (
      <div key={index} className="uptime">
        <div className="meta">
          <span className="name">{site.name}</span>
          {uptimeDisplayLink && <a className="link" href={"//" + site.url}>{site.name}</a>}
          <span className={"status " + site.status}>{status[site.status]}</span>
        </div>
        <Timeline data={createTimelineData(site.daily)} />
        <div className="summary">
          <span>今天</span>
          <span className="hide-600">
            {site.total.times
              ? `最近 ${uptimeDisplayCount} 天故障 ${site.total.times} 次，累计 ${formatDuration(site.total.duration)}，平均可用率 ${site.average}%`
              : `最近 ${uptimeDisplayCount} 天可用率 ${site.average}%`}
          </span>
          <span className="show-600">
            {`可用率 ${site.average} %`}
          </span>
          <span>{site.daily[site.daily.length - 1].date.format("YYYY-MM-DD")}</span>
        </div>
        <ReactTooltip className="tooltip" place="top" type="dark" effect="solid" />
      </div>
    ));
  }
  return (
    <div className="uptime">
      <Loading />
    </div>
  );
}

export default Uptime;