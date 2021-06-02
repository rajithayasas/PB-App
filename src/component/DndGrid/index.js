import React, { useState } from "react";
// Import Icons
import CloseIcon from "../../assets/icons/close-icon.png";
import "./dragNDrop.css";

const DragNDrop = ({
  featureImages,
  onClickRemoveItem,
  onChangeFeatureImages,
}) => {
  const [dragId, setDragId] = useState(null);

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  // Trigger On Grag Event
  const drag = (ev) => {
    // Save Drag Image Id
    setDragId(ev.target.id);
  };

  // Trigger On Drop Event
  const drop = (ev) => {
    // GRAB Drop Image Id
    const dropId = ev.target.id;

    let dragIndex = 0;
    let dropIndex = 0;

    let featureImagesTemp = featureImages;

    featureImagesTemp.map((res, index) => {
      if (res._id == dragId) {
        // Set Drop Values
        dragIndex = index;
      }

      if (res._id == dropId) {
        // Set Drop Values
        dropIndex = index;
      }
    });

    if (dragId !== dropId) {
      // Set Grag and Drop Objects
      let dragIndexObj = featureImages[dragIndex];
      let dropIndexObj = featureImages[dropIndex];

      if (dragIndexObj.default) {
        dragIndexObj = { ...dragIndexObj, _id: dropIndex + 1 };
      }

      if (dropIndexObj.default) {
        dropIndexObj = { ...dropIndexObj, _id: dragIndex + 1 };
      }

      // Change Position of Drag and Drop Images
      featureImagesTemp[dragIndex] = dropIndexObj;
      featureImagesTemp[dropIndex] = dragIndexObj;

      // Set New Order
      onChangeFeatureImages(featureImagesTemp);
    }

    ev.preventDefault();
  };

  return (
    <div className="dd-grid-container">
      {featureImages.map((item, index) => (
        <div
          key={("key-", item._id)}
          className="dd-grid-item"
          onDrop={(e) => drop(e)}
          onDragOver={(e) => allowDrop(e)}
        >
          <img
            className="dd-feature-img"
            src={item.picture}
            draggable={true}
            onDragStart={(e) => drag(e)}
            id={item._id}
          />

          {!item.default && (
            <img
              src={CloseIcon}
              className="dd-close-icon"
              onClick={() => onClickRemoveItem(index)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DragNDrop;
