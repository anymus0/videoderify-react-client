import { useState, useEffect, Dispatch, SetStateAction } from "react";
import sha256 from './../sha256'
import { Link } from "react-router-dom";
import Login from "./../components/Login";
import { UserInfoResponse } from "./../models/UserModel";
import Status from "./../components/Status";
import './../style/HomePage.scss';


const HomePage = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userInfoRes, setUserInfoRes]: [
    UserInfoResponse,
    Dispatch<SetStateAction<UserInfoResponse>>
  ] = useState(null);

  const getLoggedInUser = async () => {
    try {
      setIsLoading(true);
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/user/getAuthenticatedUser`;
      const res = await fetch(fetchUrl, {
        method: "GET",
        credentials: "include",
      });
      const userInfoResObj = (await res.json()) as Promise<UserInfoResponse>;
      setIsLoading(false);
      return userInfoResObj;
    } catch (error) {
      setIsLoading(true);
      setIsError(true);
      console.error(error);
      return null;
    }
  };

  const fetchLogin = async () => {
    try {      
      // create a SHA256 hash from userPassword
      setIsLoading(true);
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/user/login`;
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userName: userName,
          userPassword: await sha256(userPassword),
        }),
      });
      const loginInfoResObj = (await res.json()) as Promise<UserInfoResponse>;
      setIsLoading(false);
      return loginInfoResObj;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    }
  };

  const fetchLogout = async () => {
    try {
      setIsLoading(true);
      const apiURL = process.env.REACT_APP_API;
      const fetchUrl = `${apiURL}/user/logout`;
      const res = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const logoutInfoResObj = (await res.json()) as Promise<UserInfoResponse>;
      setIsLoading(false);
      return logoutInfoResObj;
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    }
  };

  const loginHandler = async () => {
    try {
      const loginInfoResObj = await fetchLogin();
      // server error handling
      if (loginInfoResObj.status.success === false) {
        setIsError(true);
        setErrorMessage(loginInfoResObj.status.details);
      }
      // on successful login, fetch user's info
      else {
        const userInfoRes = await getLoggedInUser();
        setUserInfoRes(userInfoRes);
        setUserName("");
        setUserPassword("");
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    try {
      const logoutInfoResObj = await fetchLogout();
      // server error handling
      if (logoutInfoResObj.status.success === false) {
        setIsError(true);
        setErrorMessage(logoutInfoResObj.status.details);
      }
      // on successful logout, reset 'setUserInfoRes'
      else {
        setUserInfoRes(null);
        setIsError(false);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    getLoggedInUser().then((userInfoResObj) => {
      setUserInfoRes(userInfoResObj);
    });
  }, []);

  return (
    <div
      className="container-fluid h-100 d-flex justify-content-center align-items-center"
      id="homePage"
    >
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12 text-center">
              <h2>
                <strong>Start Derifying</strong>
              </h2>
              <p className="h4">Maybe you want to upload something new?</p>
              <Status
                isError={isError}
                isLoading={isLoading}
                errorMessage={errorMessage}
              ></Status>
              <Login
                userName={userName}
                userPassword={userPassword}
                setUserName={setUserName}
                setUserPassword={setUserPassword}
                userInfoResponse={userInfoRes}
                loginHandler={loginHandler}
                logoutHandler={logoutHandler}
              ></Login>
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
  );
};

export default HomePage;
