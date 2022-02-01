import { Dispatch, SetStateAction } from "react";

const UploadSeriesForm = (props: {
  seriesName: string;
  seriesDescription: string;
  seriesThumb: string;
  seriesFiles: FileList;
  setSeriesName: Dispatch<SetStateAction<string>>;
  setSeriesDescription: Dispatch<SetStateAction<string>>;
  setSeriesThumb: Dispatch<SetStateAction<string>>;
  setSeriesFiles: Dispatch<SetStateAction<FileList>>;
  uploadHandler: () => Promise<void>;
}) => {
  return (
    <div className="secondary-dark-bg p-lg-5 p-md-3 p-sm-2 p-1 rounded-3 shadow-lg text-center">
      <h4 className="mb-4">Upload a new Series:</h4>
      <div className="form-text">Series Name</div>
      <input
        type="text"
        name="seriesName"
        id="seriesName"
        className="form-control"
        value={props.seriesName}
        onChange={(event) => {
          props.setSeriesName(event.target.value);
        }}
      />
      <div className="form-text">Series Description</div>
      <textarea
        name="seriesDescription"
        id="seriesDescription"
        className="form-control"
        value={props.seriesDescription}
        onChange={(event) => {
          props.setSeriesDescription(event.target.value);
        }}
      ></textarea>
      <div className="form-text">Thumbnail image link</div>
      <input
        type="text"
        name="seriesThumb"
        id="seriesThumb"
        className="form-control"
        value={props.seriesThumb}
        onChange={(event) => {
          props.setSeriesThumb(event.target.value);
        }}
      />
      <div className="form-text">Select files</div>
      <input
        id="filesInput"
        type="file"
        className="form-control"
        multiple
        onChange={(event) => {
          props.setSeriesFiles(event.target.files);
        }}
      />
      <button
        className="btn btn-success mt-5 text-white"
        disabled={
          props.seriesName === "" ||
          props.seriesDescription === "" ||
          props.seriesThumb === "" ||
          props.seriesFiles === null
        }
        onClick={() => {
          props.uploadHandler();
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadSeriesForm;
