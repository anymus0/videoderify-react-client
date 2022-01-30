import { Link } from "react-router-dom";

import { Series } from "./../models/SeriesModel";
import "./../style/SeriesCard.scss";

const SeriesCard = (props: { series: Series }) => {
  return (
    <div>
      <div className="card mb-3 primary-light-neon">
        <img src={props.series.thumb} className="card-img-top" alt={`${props.series.name}__thumb`} />
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col">
                <h5 className="card-title">{props.series.name}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p className="card-text">{props.series.description}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col">
                <p className="card-text">
                  Uploaded by:{" "}
                  <span className="text-muted">
                    <i>{props.series.uploadedBy.userName}</i>
                  </span>
                </p>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col d-flex justify-content-center align-content-center">
                <Link to={`/episodes/${props.series._id}`}>
                  <button className="btn secondary-light-bg text-white larger-text">
                    Watch
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

export default SeriesCard;
