import { useState, Dispatch, SetStateAction } from "react";
import { SeriesResponse } from "./../models/SeriesModel";
import UploadSeriesForm from "./../components/UploadSeriesForm";
import Status from "./../components/Status";


const UploadPage = () => {
  // state variables
  const [isUploading, setIsUploading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [seriesName, setSeriesName]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const [seriesDescription, setSeriesDescription]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const [seriesThumb, setSeriesThumb]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState("");
  const [seriesFiles, setSeriesFiles]: [
    FileList,
    Dispatch<SetStateAction<FileList>>
  ] = useState(null);

  const fetchUploadSeries = async (formData: FormData) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      };
      const uploadSeriesResponse = await fetch(
        `${process.env.REACT_APP_API}/series/upload`,
        requestOptions
      );
      const uploadSeriesResponseObj =
        (await uploadSeriesResponse.json()) as Promise<SeriesResponse>;
      return uploadSeriesResponseObj;
    } catch (error) {
      console.error(error);
      setIsUploading(false);
      setIsError(true);
      return null;
    }
  };

  const uploadHandler = async () => {
    try {
      setIsUploading(true);
      // create & populate form
      const formData = new FormData();
      formData.append("name", seriesName);
      formData.append("description", seriesDescription);
      formData.append("thumb", seriesThumb);
      // TODO: read userId from redux
      formData.append("userId", "61e2b9b0650a5bf6e3ea7ad1");

      // add files to the form data
      for (let index = 0; index < seriesFiles.length; index++) {
        const file = seriesFiles[index];
        formData.append("Files", file, file.name);
      }

      // send request
      const uploadSeriesResponseObj = await fetchUploadSeries(formData);
      if (
        uploadSeriesResponseObj !== null &&
        !uploadSeriesResponseObj.status.success
      )
        throw uploadSeriesResponseObj.status;

      console.log(uploadSeriesResponseObj.result);

      // clear inputs & form
      setSeriesName("");
      setSeriesDescription("");
      setSeriesThumb("");
      setSeriesFiles(null);
      const filesInputEl: React.InputHTMLAttributes<HTMLInputElement> =
        document.querySelector("#filesInput");
      filesInputEl.value = null;

      setIsUploading(false);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsUploading(false);
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-12 d-flex justify-content-center align-content-center">
          <div className="row w-100">
            <div className="col-12 uploadForm">
              <UploadSeriesForm
                seriesName={seriesName}
                seriesDescription={seriesDescription}
                seriesThumb={seriesThumb}
                seriesFiles={seriesFiles}
                setSeriesName={setSeriesName}
                setSeriesDescription={setSeriesDescription}
                setSeriesThumb={setSeriesThumb}
                setSeriesFiles={setSeriesFiles}
                uploadHandler={uploadHandler}
              />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <Status isLoading={isUploading} isError={isError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
