import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { downloadImages } from "../utils/utils";
import { colors } from "../utils/colors";
import { StatusBar } from "expo-status-bar";
import { GALLERY, NO_IMAGES_FOUND } from "../utils/constants";
import AppBar from "./AppBar";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ImagesModal from "./ImagesModal";
const { height, width } = Dimensions.get("screen");

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const imageData = await downloadImages();
    setImages(imageData);
    setIsLoading(false);
  };

  const onImgPressed = (index) => {
    setImageIndex(index);
    setIsModalVisible(true);
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.image}
        testID="gallery-img"
        onPress={() => onImgPressed(index)}
      >
        <Image source={{ uri: item.imgUri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const emptyComponent = () => {
    return (
      <View style={styles.emptyView}>
        <MaterialIcons name="hide-image" color={colors.white} size={150} />
        <Text style={styles.noImages}>{NO_IMAGES_FOUND}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title={GALLERY} onBackPress={() => route.back()} />
      {isLoading && (
        <View style={styles.loadingView}>
          <ActivityIndicator size="large" colors={colors.white} />
        </View>
      )}
      <FlatList
        data={images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={!isLoading && emptyComponent}
      />
      <ImagesModal
        testID="gallery-images-modal"
        isVisible={isModalVisible}
        images={images}
        setIsModalVisible={setIsModalVisible}
        isGallery={true}
        imageIndex={imageIndex}
      />
      <StatusBar backgroundColor={colors.dark} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  image: {
    height: (height - 60) / 3,
    width: width / 2,
    borderColor: colors.gray,
    borderWidth: 1,
    resizeMode: "cover",
  },
  loadingView: {
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  emptyView: {
    height: height - 100,
    justifyContent: "center",
    alignItems: "center",
  },
  noImages: {
    fontSize: 20,
    marginTop: 5,
    color: colors.white,
  },
});
export default Gallery;
