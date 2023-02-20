import React, { useMemo } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Package from "../package.json";
import UptimePage from "./Views/UptimePage";
import CertStatusPage from "./Views/CertStatusPage";

const App = () => {
  const apikeys = useMemo(() => {
    const { ApiKeys } = window.Config;
    if (Array.isArray(ApiKeys)) return ApiKeys;
    if (typeof ApiKeys === "string") return [ApiKeys];
    return [];
  }, []);

  const { IcpLicense } = window.Config;

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<UptimePage apikeys={apikeys} />}></Route>
          <Route path="/cert" element={<CertStatusPage />}></Route>
        </Routes>
        <div id="footer">
          <p><Link to="https://beian.miit.gov.cn/">{IcpLicense}</Link></p>
          <p>基于 <Link to="https://uptimerobot.com/">UptimeRobot</Link> 接口制作，检测频率 5 分钟</p>
          <p>&copy; 2020 <Link to="https://status.org.cn/">STATUS.ORG.CN</Link>, Version {Package.version}</p>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;