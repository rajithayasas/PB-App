const moveItem = (sourceId, destinationId, photoList) => {
  const sourceIndex = photoList.findIndex((item) => item._id === sourceId);
  const destinationIndex = photoList.findIndex(
    (item) => item._id === destinationId
  );

  // If source/destination is unknown, do nothing.
  if (sourceId === -1 || destinationId === -1) {
    return;
  }

  const offset = destinationIndex - sourceIndex;

  const updatedItems = moveElement(photoList, sourceIndex, offset);

  return updatedItems;
};

const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};

const moveElement = (array, index, offset) => {
  const newIndex = index + offset;

  return move(array, index, newIndex);
};

export default moveItem;
