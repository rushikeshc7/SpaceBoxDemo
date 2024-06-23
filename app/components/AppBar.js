import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const AppBar = ({ title, onBackPress }) => {
  return (
    <View style={styles.appBar}>
      <MaterialIcons
        name="arrow-back"
        size={30}
        color={colors.white}
        onPress={onBackPress}
      />
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    width: "100%",
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: -40,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    color: colors.white,
  },
});

export default AppBar;
