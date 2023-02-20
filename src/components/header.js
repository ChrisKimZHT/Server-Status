import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

function Header() {
  const currentPath = useLocation().pathname;

  useEffect(() => {
    document.title = window.Config.SiteName;
  }, []);

  return (
    <div id='header'>
      <div className='container'>
        <div className='tabs'>
          <Link className={`tab ${currentPath == "/" ? "active" : ""}`} to="/">服务状态</Link>
          <Link className={`tab ${currentPath == "/cert" ? "active" : ""}`} to="/cert">证书状态</Link>
        </div>
        <div className='navi'>
          {window.Config.Navi.map((item, index) => (
            <Link key={index} to={item.url}>{item.text}</Link>
          ))}
        </div>
      </div>
    </div >
  );
}

export default Header;
