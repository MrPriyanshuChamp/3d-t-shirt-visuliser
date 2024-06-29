import React from "react";
import { fullTextureFiles } from "../../config/constants";
import { useSnapshot } from "valtio";
import state from "../../store";

const FullTextureFiles = () => {
    
  const handleClick = (file) => {
    console.log("intially",state.fullDecal);
    state.fullDecal = file;
    console.log("finally",state.fullDecal);
  };

  return (
    <div className="overflow-y-scroll grid grid-cols-3 gap-4 p-4 ">
      {fullTextureFiles.map((file) => (
        <div
          key={file.id}
          className="relative"
          onClick={() => {
            handleClick(file.src);
          }}
        >
          <img
            src={file.src}
            alt="full texture"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default FullTextureFiles;
