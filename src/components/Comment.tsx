import { Comment } from "./../models/CommentModel";
import { UserInfo } from "./../models/UserModel";

const CommentComp = (props: {
  comment: Comment;
  userInfo: null | UserInfo;
  deleteCommentHandler: (commentId: string) => Promise<void>;
  deleteCommentAdminHandler: (commentId: string) => Promise<void>;
}) => {
  const toLocalDateTime = (dateToFormat: Date) => {
    const date = new Date(dateToFormat);
    return date.toLocaleString();
  };

  return (
    <div className="container-fluid border border-dark border-danger secondary-dark-bg shadow">
      <div className="row bg-dark py-3 rounded-3 my-3">
        <div className="col-12">
          <p className="mx-3 text-break">{props.comment.text}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-3">
          <h4 className="text-muted">{props.comment.commentedBy.userName}</h4>
        </div>
        <div className="col-12 text-end">
          <p>{toLocalDateTime(props.comment.date)}</p>
        </div>
      </div>
      {props.userInfo !== null &&
        (props.comment.commentedBy._id === props.userInfo._id ||
          props.userInfo.isAdmin) && (
          <div className="row">
            <div className="col d-flex justify-content-end">
              <button
                className="btn"
                onClick={() => {
                  if (props.userInfo.isAdmin) {
                    props.deleteCommentAdminHandler(props.comment._id);
                  } else {
                    props.deleteCommentHandler(props.comment._id);
                  }
                }}
              >
                <span className="bi bi-trash-fill fs-2 secondary-light-text"></span>
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default CommentComp;
