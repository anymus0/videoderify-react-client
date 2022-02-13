import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AllSeriesResponse } from "./../models/SeriesModel";
import Status from "./../components/Status";
import SeriesCard from "./../components/SeriesCard";
import "./../style/LibraryPage.scss";

const LibraryPage = () => {
  // state variables
  const [allSeriesRes, setAllSeriesRes]: [
    AllSeriesResponse,
    Dispatch<SetStateAction<AllSeriesResponse>>
  ] = useState(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // fetch all serieses
  const fetchAllSerieses = async () => {
    try {
      setIsLoading(true);
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/series/all`;
      const res = await fetch(fetchUrl);
      const seriesResObj = (await res.json()) as Promise<AllSeriesResponse>;
      setIsLoading(false);
      return seriesResObj;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      setErrorMessage("Could not access the server!");
      console.error(error);
      return null;
    }
  };

  // onMount
  useEffect(() => {
    fetchAllSerieses().then((seriesRes) => {
      // handle error
      if (seriesRes.status.success === false) {
        setIsError(true);
        setErrorMessage(seriesRes.status.message);
      }
      setAllSeriesRes(seriesRes);
    });
  }, []);

  return (
    <div className="h-100 mt-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-center text-center">
            <Status isError={isError} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <div className="container-fluid seriesContainer">
        {(isError === false && isLoading === false && allSeriesRes !== null) && allSeriesRes.result.length === 0 && (
          <div className="row">
            <div className="col d-flex justify-content-center">
              <p className="text-warning">Library empty, nothing was uploaded yet!</p>
            </div>
          </div>
        )}
        {(allSeriesRes !== null && allSeriesRes.result.length > 0) && (
          <div className="row">
            {allSeriesRes.result.map((series, index) => (
              <div
                className="col-xxl-2 col-lg-3 col-md-4 col-sm-6 col-12 mb-5 p-xxl-3 p-md-2 p-sm-4 p-5"
                key={index}
              >
                <SeriesCard series={series} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
