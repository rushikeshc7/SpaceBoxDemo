import React, { useRef, useEffect } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-simple-toast";
import ImageViewer from "./ImageViewer";
import Button from "./Button";
import { IMAGES_SAVED, SAVE_ALL_IMAGES } from "../utils/constants";
import { onSaveImage } from "../utils/utils";
import { colors } from "../utils/colors";

const { width } = Dimensions.get("screen");

const ImagesModal = ({
  isVisible,
  images,
  setIsModalVisible,
  isGallery,
  imageIndex,
  testID,
}) => {
  // Render each image in the FlatList
  const renderItem = ({ item, index }) => (
    <View style={{ flex: 1, width: width }}>
      <ImageViewer
        imgUri={item.uri || item.imgUri}
        index={index + 1}
        size={images?.length}
      />
    </View>
  );

  // Save all images
  const handleSave = () => {
    onSaveImage(images);
    Toast.show(IMAGES_SAVED, Toast.SHORT, { backgroundColor: colors.green });
    setIsModalVisible(false);
  };

  const getItemLayout = (_, index) => {
    return {
      length: width,
      offset: width * index,
      index,
    };
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      style={styles.modal}
      onRequestClose={() => setIsModalVisible(false)}
      presentationStyle="fullScreen"
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          testID={testID ? `${testID}-close-modal` : "close-modal"}
          style={styles.backIcon}
          onPress={() => setIsModalVisible(false)}
        >
          <Ionicons name="close-circle" size={50} color={colors.gray} />
        </TouchableOpacity>
        <FlatList
          data={images}
          initialScrollIndex={imageIndex}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          pagingEnabled
          getItemLayout={getItemLayout}
        />
        <StatusBar backgroundColor={colors.dark} />
        {!isGallery && (
          <View style={styles.button}>
            <Button
              testID={testID ? `${testID}-save-img` : "save-all-images-btn"}
              label={SAVE_ALL_IMAGES}
              onButtonPressed={handleSave}
            />
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  backIcon: {
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 3,
  },
  button: {
    position: "absolute",
    bottom: 20,
    width: "89%",
  },
});

export default ImagesModal;
