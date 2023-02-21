import React from 'react';
import Uptime from "../Components/Uptime";

const UptimePage = () => {
  const apiKeys = window.Config.apiKeys;
  return (
    <div id="uptime" className="page">
      {apiKeys.map((key) => <Uptime key={key} apikey={key} />)}
    </div>
  );
}

export default UptimePage;