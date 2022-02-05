const Status = (props: {
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}) => {
  return (
    <div className="w-100">
      {(props.isError === true && !props.errorMessage) && (
        <div>
          <p className="text-danger">Error!</p>
        </div>
      )}
      {props.isError && props.errorMessage && (
        <div>
          <p className="text-danger">Error!<br/>{props.errorMessage}</p>
        </div>
      )}
      {props.isError === false && props.isLoading === true && (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Status;
