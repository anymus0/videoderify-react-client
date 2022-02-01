import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div
        className="offcanvas offcanvas-start w-25 secondary-dark-bg"
        tabIndex={-1}
        id="offcanvas"
        data-bs-keyboard="false"
        data-bs-backdrop="false"
      >
        <div className="offcanvas-header">
          <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">
            Menu
          </h6>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-0">
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start"
            id="menu"
          >
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/">
                  <i
                    className="fs-1 bi-house"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas"
                  ></i>
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/library">
                  <i
                    className="fs-1 bi-house"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas"
                  ></i>
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/upload">
                  <i
                    className="fs-1 bi-house"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas"
                  ></i>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <i
        className="bi bi-list fs-4 primary-light-text p-2"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
      ></i>
    </div>
  );
};

export default Navbar;
