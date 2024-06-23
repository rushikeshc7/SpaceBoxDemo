import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  AppState,
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-simple-toast";
import { useRouter } from "expo-router";
import {
  Camera,
  getCameraDevice,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
} from "react-native-vision-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ACTIVE, IMAGE_SAVED, SAVE_IMAGE } from "../utils/constants";
import { onSaveImage } from "../utils/utils";
import ImageViewer from "./ImageViewer";
import Button from "./Button";
import { colors } from "../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";

const CameraScreen = () => {
  const [isActive, setIsActive] = useState(true);
  const [image, setImage] = useState(undefined);
  const { hasPermission, requestPermission } = useCameraPermission();
  const route = useRouter();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const [device, setDevice] = useState(getCameraDevice(devices, "back"));

  useEffect(() => {
    getPermissions();
  }, []);

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      setIsActive(nextAppState === ACTIVE);
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
      setIsActive(false);
    };
  }, []);

  const getPermissions = async () => {
    if (!hasPermission) {
      const request = await requestPermission();
      if (!request) Linking.openSettings();
    }
  };

  const handleBackPress = () => {
    setImage(undefined);
    route.back();
  };

  const handleTakePhotoPress = async () => {
    const photo = await camera.current?.takePhoto();
    setImage(photo);
  };

  const handleRevertCamera = () => {
    const position = device?.position == "front" ? "back" : "front";
    setDevice(getCameraDevice(devices, position));
  };

  const handleSave = () => {
    onSaveImage([{ uri: `file://${image.path}` }]);
    Toast.show(IMAGE_SAVED, Toast.SHORT, { backgroundColor: colors.green });
    route.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        testID="camera-back-btn"
        style={styles.backIcon}
        onPress={handleBackPress}
      >
        <Ionicons name="chevron-back-circle" size={50} color={colors.gray} />
      </TouchableOpacity>
      {image ? (
        <View style={StyleSheet.absoluteFill}>
          <ImageViewer imgUri={`file://${image.path}`} index={1} size={1} />
          <View style={styles.button}>
            <Button label={SAVE_IMAGE} onButtonPressed={handleSave} />
          </View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            testID="revert-camera"
            style={styles.revertCamera}
            onPress={handleRevertCamera}
          >
            <MaterialIcons name="cameraswitch" size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            testID="take-photo-camera"
            style={styles.takePhotoBtn}
            onPress={handleTakePhotoPress}
          >
            <View style={styles.innerCircle} />
          </TouchableOpacity>
          {hasPermission && (
            <Camera
              ref={camera}
              photo={true}
              photoHdr={true}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={isActive}
              zoom={16}
            />
          )}
        </>
      )}
      <StatusBar backgroundColor={colors.dark} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  takePhotoBtn: {
    position: "absolute",
    bottom: 50,
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: "center",
    backgroundColor: "transparent",
    borderColor: colors.white,
    borderWidth: 5,
    zIndex: 2,
  },
  revertCamera: {
    position: "absolute",
    bottom: 65,
    width: 50,
    height: 50,
    left: 50,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: colors.white20,
  },
  innerCircle: {
    position: "absolute",
    top: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: colors.white,
  },
});

export default CameraScreen;
