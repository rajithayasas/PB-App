import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import EmptyGrid from "../pages/Home/emptyGrid";
import DragItem from "../component/Grid/DragItem";
import { Grid, GridImage, GridItem } from "../component/Grid/Grid";

export const GridComp = ({ onMoveItem, photoList, ...props }) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid>
        {photoList.map((item) => (
          <DragItem
            key={item._id}
            id={item._id}
            onMoveItem={() => {
              onMoveItem();
            }}
          >
            <GridItem>
              <GridImage src={item.picture}></GridImage>
            </GridItem>
          </DragItem>
        ))}
      </Grid>
    </DndProvider>
  );
};

GridComp.defaultProps = {
  photoList: EmptyGrid,
};
