import React from 'react';
import Cert from '../Components/Cert';

const CertStatusPage = () => {
  const monitorDomains = window.Config.monitorDomains;
  return (
    <div id="cert" className="page">
      {monitorDomains.map((domain) => <Cert domain={domain} />)}
    </div>
  );
}

export default CertStatusPage;