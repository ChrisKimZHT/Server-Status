import React from 'react';
import Uptime from "../Components/Uptime";

const UptimePage = ({ apikeys }) => {
  return (
    <div id="uptime" className="page">
      {apikeys.map((key) => (
        <Uptime key={key} apikey={key} />
      ))}
    </div>
  );
}

export default UptimePage;