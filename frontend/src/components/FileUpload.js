import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `1997282f8309bc54284d`,
            pinata_secret_api_key: `eb9d25754d55451e697850ddaf74e9e30a6bd3a8e5cd3f909d6bd5695827cd2c`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        const dateInSecs = Math.floor(new Date().getTime() / 1000);
        await contract.add(account,ImgUrl, file.name, dateInSecs);
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
      <div class="grid gap-6 mb-6 md:grid-cols-3">
        <label htmlFor="file-upload" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          Choose Report File
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <h4 class="font-extrabold text-white">File:<small class="ms-2 font-semibold"> {fileName}</small></h4>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
        </div>
      </form>
    </div>
  );
};
export default FileUpload;