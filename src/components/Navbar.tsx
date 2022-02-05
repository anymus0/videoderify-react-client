import { Link } from "react-router-dom";
import './../style/navbar.scss';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark secondary-dark-bg p-4">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">
                <span className="bi bi-house fs-1 secondary-light-text navIcon"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/library">
                <span className="bi bi-play-btn fs-1 secondary-light-text navIcon"></span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload">
                <span className="bi bi-arrow-bar-up fs-1 secondary-light-text navIcon"></span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
