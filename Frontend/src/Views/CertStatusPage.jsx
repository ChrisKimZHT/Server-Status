import React from 'react';
import Cert from '../Components/Cert';

const CertStatusPage = () => {
  const monitorDomains = window.Config.monitorDomains;
  return (
    <div className="page">
      {monitorDomains.map((domain) => <Cert key={domain} domain={domain} />)}
    </div>
  );
}

export default CertStatusPage;