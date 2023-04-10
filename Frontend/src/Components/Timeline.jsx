import React from "react";
import "./Timeline.scss";

const Timeline = ({ data }) => {
  console.log(data);
  return (
    <div className="timeline">
      {data?.map((ele, index) => (
        <i key={index} className={ele.color} data-tip={ele.text} />
      ))}
    </div>
  );
}

export default Timeline;