import React from "react";

import "./grid.css";

const NormalGrid = ({ featureImages, onClickImage }) => {
  return (
    <div className="grid-container">
      {featureImages.map((item) => (
        <div key={("key-all-", item._id)} className="grid-item">
          <img
            className="feature-img"
            onClick={() => onClickImage(item)}
            src={item.picture}
            id={item._id}
          />
        </div>
      ))}
    </div>
  );
};

export default NormalGrid;
