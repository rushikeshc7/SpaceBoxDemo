import { Alert } from "react-native";
import firebaseApp from "./Firebase/firebase";

const uploadImage = async (imgUri) => {
  const fileName = imgUri.split("/").pop();
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new TypeError("Image upload failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", imgUri, true);
    xhr.send(null);
  });
  const reference = firebaseApp.storage().ref("/images").child(fileName);
  await reference.put(blob);
};

export const onSaveImage = async (images) => {
  try {
    const uploadPromises = images.map((img) => uploadImage(img.uri));
    await Promise.all(uploadPromises);
  } catch (error) {
    Alert.alert("Image Error", "Images not saved", [
      { text: "OK", onPress: () => console.log("OK") },
    ]);
  }
};

export const downloadImages = async () => {
  try {
    const imageRefs = await firebaseApp.storage().ref("/images").listAll();
    const images = await Promise.all(
      imageRefs.items.map(async (ref) => {
        const imgPath = ref.fullPath;
        const url = await firebaseApp.storage().ref(imgPath).getDownloadURL();
        return { imageName: imgPath, imgUri: url };
      })
    );
    return images;
  } catch (error) {
    console.error("Images download error:", error);
    Alert.alert("Image Error", "Error while downloading the images", [
      { text: "OK", onPress: () => console.log("OK") },
    ]);
  }
};
