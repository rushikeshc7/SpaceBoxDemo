import React, { useState } from "react";
import { LogBox, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import Button from "./components/Button";
import ImagesModal from "./components/ImagesModal";
import { colors } from "./utils/colors";
import { CHOOSE_PHOTO, PHOTO_GALLERY, TAKE_PHOTO } from "./utils/constants";

// Ignore all log notifications
LogBox.ignoreAllLogs();

const App = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Navigate to the camera screen
  const handleTakePhoto = () => {
    navigation.navigate("components/Camera");
  };

  // Open the image picker and handle selected images
  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
      setIsModalVisible(true);
    }
  };

  // Close modal and reset image state
  const setModalVisibility = (value) => {
    setIsModalVisible(value);
    setImages([]);
  };

  // Open the saved images
  const handlePhotoGallery = () => navigation.navigate("components/Gallery");

  return (
    <SafeAreaView style={styles.container}>
      <Button
        testID="take-photo"
        label={TAKE_PHOTO}
        onButtonPressed={handleTakePhoto}
      />
      <Button
        testID="choose-photo"
        label={CHOOSE_PHOTO}
        onButtonPressed={handleChooseImage}
      />
      <Button
        testID="photo-gallery"
        label={PHOTO_GALLERY}
        onButtonPressed={handlePhotoGallery}
      />
      <StatusBar backgroundColor={colors.dark} />
      <ImagesModal
        testID="pick-images-modal"
        isVisible={isModalVisible}
        images={images}
        setIsModalVisible={setModalVisibility}
        isGallery={false}
        imageIndex={0}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default App;
