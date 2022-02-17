import { Dispatch, SetStateAction } from "react";
import { UserInfoResponse } from "./../models/UserModel";

const Login = (props: {
  userName: string;
  userPassword: string;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserPassword: Dispatch<SetStateAction<string>>;
  userInfoResponse: UserInfoResponse;
  loginHandler: () => Promise<void>;
  logoutHandler: () => Promise<void>;
}) => {
  const renderLogin = () => {
    const loginFormTemplate = (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-12 col-12">
            <input
              type="text"
              name="userName"
              id="userName"
              className="form-control p-2 m-3"
              placeholder="username"
              value={props.userName}
              onChange={(event) => {
                props.setUserName(event.target.value);
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <input
              type="password"
              name="userPassword"
              id="userPassword"
              className="form-control p-2 m-3"
              placeholder="password"
              value={props.userPassword}
              onChange={(event) => {
                props.setUserPassword(event.target.value);
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <button
              className="btn secondary-light-bg text-white m-3"
              onClick={props.loginHandler}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );

    if (
      props.userInfoResponse === null ||
      props.userInfoResponse.status.details ===
        "Authorization cookie is missing!" ||
      props.userInfoResponse.status.message === "Could not authenticate!"
    ) {
      return loginFormTemplate;
    } else {
      return (
        <div>
          <div className="bg-success p-1 m-4 rounded-3 shadow-lg">
            <span>
              You are logged in as:{" "}
              <strong>{props.userInfoResponse.result.userName}</strong>
            </span>
          </div>
          <button
            className="btn secondary-light-bg text-white"
            onClick={props.logoutHandler}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  return <div>{renderLogin()}</div>;
};

export default Login;
