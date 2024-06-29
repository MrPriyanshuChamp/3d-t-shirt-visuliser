import React from "react";
import CustomButton from "./CustomButton";
import FullTextureFiles from "./illustrations/FullTextureFiles";
const FilePicker = ({ setFile, file, readFile }) => {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>

        <p className="mt-2  text-xm truncate text-gray-500">
          {file != "" ? file?.name : "No file selected"}
        </p>
      </div>

      <div className="mt-4 mb-2 flex flex-wrap gap-4">
        <CustomButton
          type="filled"
          title="full"
          handleClick={() => readFile("full")}
          customStyles="text-xs w-full"
        />
      </div>
      
      <FullTextureFiles />
    </div>
  );
};

export default FilePicker;
