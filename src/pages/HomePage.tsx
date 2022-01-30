import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12">
          <h1 className="glow text-center">Videoderify</h1>
        </div>
        <div className="col-12 d-flex justify-content-center align-content-center">
          <div className="row">
            <div className="col-12 text-center">
              <div className="secondary-dark-bg p-5 rounded-3 shadow-lg ">
                <h2>
                  <strong>Start Derifying</strong>
                </h2>
                <p className="h4">Maybe you want to upload something new?</p>
                <button className="btn secondary-light-bg text-white m-3 larger-text">
                  <strong>Login</strong>
                </button>
                <p className="h4 mt-3">
                  Or you can just browse from the library:
                </p>
                <Link to="/library">
                  <button className="btn secondary-light-bg text-white m-3 larger-text">
                    <strong>WATCH NOW!</strong>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
