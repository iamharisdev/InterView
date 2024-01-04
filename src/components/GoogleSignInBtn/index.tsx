import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { onGoogleButtonPress } from "@/utils/export";

const GoogleSigning = () => {
  return (
    <TouchableOpacity onPress={onGoogleButtonPress} activeOpacity={0.7}>
      <View style={styles.btnView}>
        <Icon
          name="google"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.textStyle}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleSigning;

const styles = StyleSheet.create({
  btnView: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 10,
  },
  textStyle: { color: "white", fontSize: 16 },
});
