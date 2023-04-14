import { Button } from "antd";
import Plot from "../../Plot";
import insights from "./earthData.json";
// import * as Analysis from "../../../../../analysis";
import redo from "../../../assets/redo.svg";
import "./style.scss";
import { useState } from "react";

const CropRotation = (props) => {

  const data = props.statsData.map((currentCrop) => {
    const cropData = Analysis.dataForCrop(currentCrop.crop);
    const newCrop = Analysis.findAlternateCrop(cropData);
    return {
      currentCrop: cropData,
      newCrop
    };
  });

  const [currentIdx, setIdx] = useState(0)
  const currentData = data[currentIdx];

  const nextPage = () => {
      if (currentIdx === data.length - 1) {
          setIdx(0)
      } else {
          setIdx(currentIdx + 1)
      }
  }
  const prevPage = () => {
      if (currentIdx === 0) {
          setIdx(data.length - 1)
      } else {
          setIdx(currentIdx - 1)
      }
  }

  return (
    <div className="CropRotation">
      <h3 className="stat-title">Crop Rotations</h3>
      <p className="sub-title">Recommendation based off nutrient levels</p>
      <strong>
        <p>Recommended Rotations</p>
      </strong>
      <div className="resize">
        <Plot type={"crop"} image={currentData.currentCrop.image} state={currentData.currentCrop.state} name={currentData.currentCrop.name} earthScore={currentData.currentCrop.earthScore} />
      </div>
      <h3 style={{ textAlign: "center" }}>
        <span style={{ marginRight: "8px" }}>
          <img src={redo} alt="redo" />
        </span>
        Rotates To
      </h3>
      <div className="resize">
      <Plot type={"crop"} state={currentData.newCrop.state} image={currentData.newCrop.image} name={currentData.newCrop.name} earthScore={currentData.newCrop.earthScore} />
      </div>
     
      <div className="buttons">
        <Button className="backward" onClick={prevPage}>Back</Button>

        <Button className="forward" onClick={nextPage}>Next</Button>
      </div>
    </div>
  );
};

export default CropRotation;
