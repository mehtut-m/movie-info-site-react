import { useEffect, useRef } from 'react';
import './header.scss';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../assets/tmovie.png';

const headerNav = [
  { display: 'Home', path: '/' },
  { display: 'Movies', path: '/movie' },
  { display: 'TV Series', path: '/tv' },
];

function Header() {
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((el) => el.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }

      window.addEventListener('scroll', shrinkHeader);
    };
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
          <Link to="/">tMovies</Link>
        </div>
        <ul className="header__nav">
          {headerNav.map((element, index) => (
            <li
              key={`nav-${index}`}
              className={`${index === active ? 'active' : ''}`}
            >
              <Link to={element.path}>{element.display}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Header;
