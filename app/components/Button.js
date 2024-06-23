import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../utils/colors";

const Button = ({ label, onButtonPressed, testID }) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        testID={testID}
        style={styles.button}
        onPress={onButtonPressed}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 60,
    width: "100%",
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: colors.green,
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
});

export default Button;
