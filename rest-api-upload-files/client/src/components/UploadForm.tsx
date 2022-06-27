import React, { useState } from "react";
import axios, { AxiosError } from "axios";

function UploadForm() {
  const [fileName, setFileName] = useState("No file selected");
  const fileInput = React.createRef<HTMLInputElement>();

  function fileChangeHandler() {
    const files = fileInput.current?.files as FileList;
    if (files.length > 0) {
      setFileName(files[0].name);
    }
  }

  async function sendSingleFile() {
    const formData = new FormData();

    if (fileInput.current?.files) {
      formData.append("uploaded_file", fileInput.current?.files[0]);
      try {
        const upload = await axios.post("http://localhost/api/files", formData);
        const data = await upload.data;
        console.log(data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
          console.log(err.response?.data);
        }
      }
    }
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      method="post"
      encType="multipart/form-data"
    >
      <div>
        <input
          type="file"
          name="upload_file"
          ref={fileInput}
          onChange={fileChangeHandler}
          style={{ display: "none" }}
        />

        <button id="upload-button" onClick={() => fileInput.current?.click()}>
          Choose file to upload
        </button>
      </div>
      <div>{fileName}</div>
      <button onClick={sendSingleFile}>Submit</button>
    </form>
  );
}
export default UploadForm;
