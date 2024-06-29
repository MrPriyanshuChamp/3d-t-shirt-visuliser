import React, { useState, useEffect, act } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import config from "../config/config";
import state from "../store";
import { download, stylishShirt } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";

import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AiPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  LogoPicker,
  Tab,
} from "../components/index";
import { Decal } from "@react-three/drei";
import FullTextureFiles from "../components/illustrations/FullTextureFiles";
const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "aipicker":
        return (
          <LogoPicker
            setFile={setFile}
            file={file}
            readFile={readFile}
            setActiveEditorTab={setActiveEditorTab}
          />
        );
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return (
          <>
            <FilePicker setFile={setFile} file={file} readFile={readFile} />
          </>
        );
      default:
        return null;
    }
  };

  const handleDecals = (type, result) => {
    const decalTypes = DecalTypes[type];

    state[decalTypes.stateProperty] = result;

    if (!activeFilterTab[decalTypes.filterTab]) {
      handleActiveFilterTab(decalTypes.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        console.log(activeFilterTab[tabName]);
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, index) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                      activeEditorTab === tab.name
                        ? setActiveEditorTab("")
                        : setActiveEditorTab(tab.name)
                    }
                  />
                ))}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute top-5 right-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type={"filled"}
              title={"Go Back"}
              handleClick={() => (state.intro = true)}
              customStyles={"w-fit px-4 py-2.5 font-bold text-sm"}
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab, index) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
