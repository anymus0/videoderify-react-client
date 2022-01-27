import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
      <ul
        className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
        id="menu"
      >
        <li className="nav-item p-4">
          <a href="#" className="nav-link align-middle px-0">
            <i className="fs-2 bi-house"></i>
          </a>
        </li>
        <li className="nav-item p-4">
          <a href="#" className="nav-link align-middle px-0">
            <i className="fs-2 bi bi-caret-right-square-fill"></i>
          </a>
        </li>
        <li className="nav-item p-4">
          <a href="#" className="nav-link align-middle px-0">
            <i className="fs-2 bi bi-cloud-upload"></i>
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown pb-4">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt="hugenerd"
            width="30"
            height="30"
            className="rounded-circle"
          />
          <span className="d-none d-sm-inline mx-1">loser</span>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
