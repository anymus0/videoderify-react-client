const Status = (props: {
  isLoading: boolean;
  isError: boolean;
}) => {
  return (
    <div>
      {props.isError === true && (
        <div>
          <p>Error!</p>
        </div>
      )}
      {(props.isError === false && props.isLoading === true) && (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  )
}

export default Status;
