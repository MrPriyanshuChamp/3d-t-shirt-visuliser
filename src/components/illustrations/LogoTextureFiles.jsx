import React from "react";
import { logoTextureFiles } from "../../config/constants";
import { useSnapshot } from "valtio";
import state from "../../store";

const LogoTextureFiles = ({setActiveEditorTab}) => {
    
  const handleClick = (file) => {
    setActiveEditorTab("")
    state.logoDecal = file;
  };

  return (
    <div className="overflow-y-scroll grid grid-cols-3 gap-4 p-4 ">
      {logoTextureFiles.map((file) => (
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

export default LogoTextureFiles;
