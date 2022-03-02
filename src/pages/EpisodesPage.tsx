import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useParams } from "react-router-dom";
import { SeriesResponse } from "./../models/SeriesModel";
import { DefaultResponseStatus } from "./../models/ResponseStatus";
import Status from "./../components/Status";
import VideoPlayer from "./../components/VideoPlayer";
import { CommentResponse, Comment } from "./../models/CommentModel";
import CommentComp from "./../components/Comment";
import CommentForm from "./../components/CommentForm";
import { UserInfoResponse, UserInfo } from "./../models/UserModel";
import "./../style/EpisodesPage.scss";

const EpisodesPage = () => {
  const { seriesId } = useParams();
  const [seriesRes, setSeriesRes]: [
    SeriesResponse,
    Dispatch<SetStateAction<SeriesResponse>>
  ] = useState(null);
  const [comments, setComments]: [
    Comment[],
    Dispatch<SetStateAction<Comment[]>>
  ] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [loggedInUserInfo, setLoggedInUserInfo]: [
    UserInfo,
    Dispatch<SetStateAction<UserInfo>>
  ] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // fetches

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

  const fetchLoggedInUser = async () => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/user/getAuthenticatedUser`;
      const res = await fetch(fetchUrl, {
        method: "GET",
        credentials: "include",
      });
      const userInfoResObj = (await res.json()) as Promise<UserInfoResponse>;
      return userInfoResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  const addCommentFetch = async (text: string) => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/comment/addComment/${seriesId}`;
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: text })
      });
      const addCommentResObj = (await res.json()) as Promise<CommentResponse>;
      return addCommentResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  const deleteCommentFetch = async (commentId: string) => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/comment/deleteComment/${seriesId}/${commentId}`;
      const res = await fetch(fetchUrl, {
        method: "DELETE",
        credentials: "include",
      });
      const deleteCommentResObj =
        (await res.json()) as Promise<DefaultResponseStatus>;
      return deleteCommentResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  const deleteCommentAdminFetch = async (commentId: string) => {
    try {
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/comment/deleteCommentAdmin/${seriesId}/${commentId}`;
      const res = await fetch(fetchUrl, {
        method: "DELETE",
        credentials: "include",
      });
      const deleteCommentAdminResObj =
        (await res.json()) as Promise<DefaultResponseStatus>;
      return deleteCommentAdminResObj;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return null;
    }
  };

  const onMount = async () => {
    setIsLoading(true);
    const seriesRes = await fetchSeriesById();
    // seriesRes flow
    if (!seriesRes.status.success) {
      setIsError(true);
      setErrorMessage(seriesRes.status.message);
    } else {
      setSeriesRes(seriesRes);
      setSelectedEpisode(seriesRes.result.mediaFiles[0].filename);
      setComments(seriesRes.result.comments);
    }

    // userInfo flow
    const userInfoRes = await fetchLoggedInUser();
    if (userInfoRes.status.success) setLoggedInUserInfo(userInfoRes.result);

    setIsLoading(false);
  };

  // onMount
  useEffect(() => {
    onMount().then();
  }, []);

  // on comment change
  useEffect(() => {
    // TODO: array operations...
  }, [comments]);

  // handlers

  const selectEpisodeHandler = (episode: number) => {
    setSelectedEpisode(seriesRes.result.mediaFiles[episode].filename);
  };

  const addCommentHandler = async (commentText: string) => {
    const addedCommentRes = await addCommentFetch(commentText);
    if (addedCommentRes.status.success) {
      const modifiedComments: Comment[] = [];
      comments.forEach(comment => {
        modifiedComments.push(comment)
      });
      modifiedComments.push(addedCommentRes.result);
      setComments(modifiedComments);
    }
    // TODO: toast notifs
  };

  const deleteCommentHandler = async (commentId: string) => {
    const deletedCommentResObj = await deleteCommentFetch(commentId);
    if (deletedCommentResObj.status.success) {
      const modifiedComments: Comment[] = [];
      comments.forEach((comment) => {
        if (comment._id !== commentId) modifiedComments.push(comment);
      });
      setComments(modifiedComments);
    }
    // TODO: toast notifs
  };

  const deleteCommentAdminHandler = async (commentId: string) => {
    const deletedCommentAdminResObj = await deleteCommentAdminFetch(commentId);
    if (deletedCommentAdminResObj.status.success) {
      const modifiedComments: Comment[] = [];
      comments.forEach((comment) => {
        if (comment._id !== commentId) modifiedComments.push(comment);
      });
      setComments(modifiedComments);
    }
    // TODO: toast notifs
  };

  return (
    <div>
      <Status
        isError={isError}
        isLoading={isLoading}
        errorMessage={errorMessage}
      ></Status>
      {!isError && seriesRes !== null && (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <h1 className="text-center">{seriesRes.result.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <VideoPlayer fileName={selectedEpisode}></VideoPlayer>
            </div>
          </div>
          <div className="row mt-3 pb-3 p-1">
            {seriesRes.result.mediaFiles.map((mediaFile, index) => (
              <div className="col-1 episodeSwitchContainer mb-3" key={index}>
                <button
                  className={`btn primary-light-bg text-white shadow-lg ${
                    currentEpisodeIndex === index ? "secondary-light-bg" : ""
                  }`}
                  onClick={() => {
                    selectEpisodeHandler(index);
                    setCurrentEpisodeIndex(index);
                  }}
                >
                  {index + 1}
                </button>
              </div>
            ))}
          </div>
          <CommentForm
            addCommentHandler={addCommentHandler}
          />
          <div className="row">
            {comments.map((comment, index) => (
              <div className="col-12 my-2" key={index}>
                <CommentComp
                  comment={comment}
                  userInfo={loggedInUserInfo}
                  deleteCommentHandler={deleteCommentHandler}
                  deleteCommentAdminHandler={deleteCommentAdminHandler}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesPage;
