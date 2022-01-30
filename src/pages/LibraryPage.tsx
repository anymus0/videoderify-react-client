import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AllSeriesResponse } from "./../models/SeriesModel";
import SeriesCard from "./../components/SeriesCard";

const LibraryPage = () => {
  // state variables
  const [allSeriesRes, setAllSeriesRes]: [
    AllSeriesResponse,
    Dispatch<SetStateAction<AllSeriesResponse>>
  ] = useState(null);
  const [isError, setIsError] = useState(false);

  // fetch all serieses
  const fetchAllSerieses = async () => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/series/all`;
      const res = await fetch(fetchUrl);
      const seriesResObj = (await res.json()) as Promise<AllSeriesResponse>;
      return seriesResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  // onMount
  useEffect(() => {
    fetchAllSerieses().then((seriesRes) => {
      setAllSeriesRes(seriesRes);
    });
  }, []);

  const renderLibrary = () => {
    const loadingTemplate = (
      <div className="container-fluid  h-100 d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );

    const errorTemplate = (
      <div className="container-fluid  h-100 d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col">
            <p>Could not load because an error has occured.</p>
          </div>
        </div>
      </div>
    );

    const emptyTemplate = (
      <div className="container-fluid  h-100 d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col">
            <p>Nothing is uploaded yet.</p>
          </div>
        </div>
      </div>
    );

    // conditionally render templates
    if (allSeriesRes === null && isError === false) {
      return loadingTemplate;
    } else if (isError) {
      return errorTemplate;
    } else if (allSeriesRes.result.length === 0) {
      return emptyTemplate;
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            {allSeriesRes.result.map((series, index) => (
              <div className="col" key={index}>
                <SeriesCard series={series} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  return <div className="h-100">{renderLibrary()}</div>;
};

export default LibraryPage;
