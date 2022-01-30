import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { SeriesResponse } from "./../models/SeriesModel";
import VideoPlayer from "./../components/VideoPlayer";

const EpisodesPage = () => {
  const { seriesId } = useParams();
  const [seriesRes, setSeriesRes]: [
    SeriesResponse,
    Dispatch<SetStateAction<SeriesResponse>>
  ] = useState(null);
  const [selectedEpisode, setSelectedEpisode]: [
    number,
    Dispatch<SetStateAction<number>>
  ] = useState(0);
  const [isError, setIsError] = useState(false);

  const fetchSeriesById = async () => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/series/get/${seriesId}`;
      const res = await fetch(fetchUrl);
      const seriesResObj = (await res.json()) as Promise<SeriesResponse>;
      return seriesResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  // onMount
  useEffect(() => {
    fetchSeriesById().then((seriesRes) => {
      setSeriesRes(seriesRes);
    });
  }, []);

  const selectEpisodeHandler = (episode: number) => {
    setSelectedEpisode(episode);
  };

  return (
    <div>
      {isError && (
        <div>
          <p>Error</p>
        </div>
      )}
      {!isError && seriesRes !== null && (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="text-center">{seriesRes.result.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <VideoPlayer
                fileName={seriesRes.result.mediaFiles[selectedEpisode].filename}
              ></VideoPlayer>
            </div>
          </div>
          <div className="row mt-5">
            {seriesRes.result.mediaFiles.map((mediaFile, index) => (
              <div className="col" key={index}>
                <button
                  className="btn primary-light-bg text-white shadow"
                  onClick={() => {
                    selectEpisodeHandler(index);
                  }}
                >
                  {index + 1}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesPage;
