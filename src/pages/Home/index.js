// React imports
import React, { useState, useEffect } from "react";

// Notification imports
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

// API imports
import API from "../../api";
import {
  FETCH_ALBUM,
  FETCH_IMAGES,
  DELETE_ALBUM,
  SAVE_ALBUM,
  UPDATE_ALBUM,
} from "../../api/urls";

// component imports
import DragItem from "../../component/Grid/DragItem";
import { Button } from "../../component/Button";
import { Grid, GridImage, GridItem } from "../../component/Grid/Grid";

// helpers
import MoveItem from "../../helpers/move-item-hepler";

// default Ggid view
import EmptyGrid from "./emptyGrid";
import EmptyImage from "../../assets/images/gray-box.png";

// home styles
import "./home.css";

const USER_ID = 123; // This is use to mock the login user

const Home = () => {
  // Local State
  const [previewPhotoList, setPreviewPhotoList] = useState(EmptyGrid);
  const [allPhotoList, setAllPhotoList] = useState([]);
  const [albumId, setAlbumId] = useState(null);
  const [hideAddButton, setHideAddButton] = useState(true);
  const [hideDeleteButton, setHideDeleteButton] = useState(true);

  useEffect(() => {
    // Call fetch selected photos API
    getSelectedPhotos();

    // Call fetch all photos API
    getAllPhotos();
  }, []);

  // Get Album Photos
  const getSelectedPhotos = async () => {
    const res = await API.GET(FETCH_ALBUM.replace(":userId", USER_ID));

    // Return id there is an error
    if (res.error) return;

    const { entries = [] } = res.data;

    if (entries.length > 0) {
      // Set selected photos
      setPreviewPhotoList(res.data.entries);

      // Set album Id
      setAlbumId(res.data._id);

      // Set delete button visibility
      setHideDeleteButton(false);
    }
  };

  // Get all photos
  const getAllPhotos = async () => {
    const res = await API.GET(FETCH_IMAGES.replace(":userId", USER_ID));

    // Return id there is an error
    if (res.error) return;

    setAllPhotoList(res.data.entries);
  };

  const onMoveItem = (sourceId, destinationId, list) => {
    const updatedItems = MoveItem(sourceId, destinationId, list);
    setPreviewPhotoList([...updatedItems]);
  };

  // Handle on click Add to Album Event
  const onClickAddToAlbum = async () => {
    // Update Album
    if (albumId) {
      const res = await API.PUT(UPDATE_ALBUM, {
        _id: albumId,
        entries: previewPhotoList,
      });

      // Return if there is an error
      if (res.error) {
        // Hide After 3 Secounds
        NotificationManager.error(
          "An error occurred when updating album",
          "Error",
          3000,
          () => {}
        );

        return;
      }

      const { entries = [], _id } = res.data;

      // Hide After 3 Secounds
      NotificationManager.success(
        "Photo album updated successfully",
        "Photo album updated",
        3000,
        () => {}
      );

      // Set selected photos
      setPreviewPhotoList([...entries]);

      // Set album Id
      setAlbumId(_id);
      setHideAddButton(true);
      setHideDeleteButton(false);
    } else {
      // Create Album

      const res = await API.POST(SAVE_ALBUM, {
        userId: USER_ID,
        entries: previewPhotoList,
      });

      // Return if there is an error
      if (res.error) {
        // Hide After 3 Secounds
        NotificationManager.error(
          "An error occurred when create album",
          "Error",
          3000,
          () => {}
        );

        return;
      }

      const { entries = [], _id } = res.data;

      NotificationManager.success(
        "Photo album created successfully",
        "Photo album created",
        3000,
        () => {}
      );

      // Set selected photos
      setPreviewPhotoList([...entries]);

      // Set album Id
      setAlbumId(_id);
      setHideAddButton(true);
      setHideDeleteButton(false);
    }
  };

  // Handle on click Delete Album Event
  const onClickDeleteAlbum = async () => {
    const res = await API.DELETE(DELETE_ALBUM.replace(":id", albumId));

    // Return id there is an error
    if (res.error) {
      // Hide After 3 Secounds
      NotificationManager.error(
        "An error occurred when deleting album",
        "Error",
        3000,
        () => {}
      );

      return;
    }

    // Hide After 3 Secounds
    NotificationManager.success(
      "Photo album deleted successfully",
      "Photo album deleted",
      3000,
      () => {}
    );

    // reset data
    setPreviewPhotoList([...EmptyGrid]);
    setAlbumId(null);
    setHideAddButton(true);
  };

  // Add to item
  const onclickImagetoAdd = (item) => {
    let defaultVal = false;
    let previewPhotoListTemp = previewPhotoList;

    // replace deafult tiles with selected images
    previewPhotoListTemp = previewPhotoListTemp.map((res) => {
      if (!defaultVal && res.default === true) {
        defaultVal = true;
        return item;
      } else {
        return res;
      }
    });

    // set updated photos
    setPreviewPhotoList([...previewPhotoListTemp]);

    // enable add to album button
    const deafaultImages = previewPhotoListTemp.filter((res) => res.default);
    if (deafaultImages.length === 0) {
      setHideAddButton(false);
    }

    if (!hideAddButton) {
      // Hide After 3 Secounds
      NotificationManager.warning(
        "You can only add 9 photos to the album",
        "Info",
        3000,
        () => {}
      );
    }
  };

  // Remove item from the album
  const onClickRemoveItem = (index) => {
    // replace remove item with default value
    const previewPhotoListTemp = previewPhotoList;
    previewPhotoListTemp[index] = {
      _id: index + 1,
      default: true,
      picture: EmptyImage,
    };

    setPreviewPhotoList([...previewPhotoListTemp]);
    setHideAddButton(true);
    setHideDeleteButton(true);
  };

  return (
    <>
      <div className="image-container">
        {/* All Photos View */}
        <div className="all-image-view">
          <Grid>
            {allPhotoList.map((item, index) => (
              <DragItem key={item._id} id={item._id} onMoveItem={() => {}}>
                <GridItem>
                  <GridImage
                    src={item.picture}
                    onClick={() => onclickImagetoAdd(item)}
                  ></GridImage>
                </GridItem>
              </DragItem>
            ))}
          </Grid>
        </div>

        {/* Album View  */}
        <div className="album-view">
          <Grid>
            {previewPhotoList.map((item, index) => (
              <DragItem
                key={item.index}
                id={item.index}
                onMoveItem={(sourceId, destinationId) =>
                  onMoveItem(sourceId, destinationId, previewPhotoList)
                }
              >
                <GridItem>
                  <GridImage src={item.picture}>
                    {item.default !== true && (
                      <p
                        className="remove-item"
                        onClick={() => onClickRemoveItem(index)}
                      >
                        X
                      </p>
                    )}
                  </GridImage>
                </GridItem>
              </DragItem>
            ))}
          </Grid>

          <div className="action-button-container">
            {/* Add to Button Visibility  */}
            {hideAddButton ? (
              <Button size="large" label="Add to Album"></Button>
            ) : (
              <Button
                size="large"
                label="Add to Album"
                primary={true}
                onClickButton={() => onClickAddToAlbum()}
              ></Button>
            )}

            {/* Delete Button Visibility  */}
            {albumId && !hideDeleteButton ? (
              <>
                <Button
                  size="large"
                  label="Delete Album"
                  primary={true}
                  backgroundColor="red"
                  onClickButton={() => onClickDeleteAlbum()}
                ></Button>
              </>
            ) : (
              <>
                <Button size="large" label="Delete Album"></Button>
              </>
            )}
          </div>
        </div>
        <NotificationContainer />
      </div>
    </>
  );
};

export default Home;
