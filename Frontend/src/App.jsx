import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import UptimePage from "./Views/UptimePage";
import CertStatusPage from "./Views/CertStatusPage";
import Footer from "./Components/Footer";
import NotFound from "./Views/NotFound";

const App = () => {
  useEffect(() => {
    document.title = window.Config.title;
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<UptimePage />}></Route>
          <Route path="/cert" element={<CertStatusPage />} ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter >
  );
}

export default App;