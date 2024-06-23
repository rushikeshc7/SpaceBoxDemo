import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { colors } from "../utils/colors";

const ImageViewer = ({ imgUri, index, size }) => {
  return (
    <View style={styles.container}>
      <View style={styles.countView}>
        <Text style={styles.countText}>
          {index}/{size}
        </Text>
      </View>
      <Image source={{ uri: imgUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countView: {
    backgroundColor: colors.gray,
    borderRadius: 20,
    zIndex: 2,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 30,
    width: 50,
  },
  countText: {
    margin: 10,
    textAlign: "center",
    fontWeight: "600",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ImageViewer;
