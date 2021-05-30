import React from "react";
import EmptyGrid from "../pages/Home/emptyGrid";

import { GridComp } from "./Grid";

export default {
  title: "PastBook/Grid",
  component: GridComp,
  argTypes: {},
};

const Template = (args) => <GridComp {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  photoList: EmptyGrid,
};
