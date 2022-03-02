import { Dispatch, SetStateAction, useState } from "react";


const CommentForm = (props: {
  addCommentHandler: (commentText: string) => Promise<void>;
}) => {
  const [commentText, setCommentText] = useState("");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <textarea
            className="form-control bg-dark shadow"
            placeholder="Comment here..."
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-12 d-flex justify-content-center">
          <button
            className="btn primary-light-bg text-white text fs-5 ms-5 p-2 px-5 shadow"
            onClick={() => {
              props.addCommentHandler(commentText);
              setCommentText("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
