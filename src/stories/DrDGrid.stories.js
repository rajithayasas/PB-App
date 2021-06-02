import React from "react";

import DndGrid from "../component/DndGrid";
import EmptyGrid from "../pages/Home/emptyGrid";

export default {
  title: "PastBook/DndGrid",
  component: DndGrid,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <DndGrid {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  featureImages: EmptyGrid,
};
