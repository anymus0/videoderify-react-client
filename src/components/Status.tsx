import { TailSpin } from "react-loader-spinner";

const Status = (props: {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}) => {
  return (
    <div className="w-100">
      {props.isError === true && !props.errorMessage && (
        <div>
          <p className="text-danger">Error!</p>
        </div>
      )}
      {props.isError && props.errorMessage && (
        <div>
          <p className="text-danger">
            Error!
            <br />
            {props.errorMessage}
          </p>
        </div>
      )}
      {props.isError === false && props.isLoading === true && (
        <div className="container-fluid">
          <div className="row">
            <div className="col d-flex justify-content-center">
              <TailSpin color="#f44336" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
