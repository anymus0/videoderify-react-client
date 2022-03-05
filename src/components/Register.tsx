import { Dispatch, SetStateAction } from "react";
import { UserInfoResponse } from "./../models/UserModel";

const Register = (props: {
  userName: string;
  userPassword: string;
  userPasswordConfirm: string;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserPassword: Dispatch<SetStateAction<string>>;
  setUserPasswordConfirm: Dispatch<SetStateAction<string>>;
  userInfoResponse: UserInfoResponse;
  registerHandler: () => Promise<void>;
}) => {
  const renderRegister = () => {
    const RegisterFormTemplate = (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <h2 className="secondary-light-text">Register</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-12 col-12">
            <input
              type="text"
              name="userNameRegister"
              id="userNameRegister"
              className="form-control p-2 m-3"
              placeholder="username"
              onChange={(event) => {
                props.setUserName(event.target.value);
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <input
              type="password"
              name="userPasswordRegister"
              id="userPasswordRegister"
              className="form-control p-2 m-3"
              placeholder="password"
              onChange={(event) => {
                props.setUserPassword(event.target.value);
              }}
            />
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <input
              type="password"
              name="userPasswordConfirmRegister"
              id="userPasswordConfirmRegister"
              className="form-control p-2 m-3"
              placeholder="confirm password"
              onChange={(event) => {
                props.setUserPasswordConfirm(event.target.value);
              }}
            />
          </div>
          <div className="col-12">
            <button
              className="btn secondary-light-bg text-white m-3"
              onClick={props.registerHandler}
              disabled={
                props.userPassword !== props.userPasswordConfirm ||
                props.userName === "" ||
                props.userPassword === "" ||
                props.userPasswordConfirm === ""
              }
            >
              Register
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
      return RegisterFormTemplate;
    }
  };

  return <div>{renderRegister()}</div>;
};

export default Register;
