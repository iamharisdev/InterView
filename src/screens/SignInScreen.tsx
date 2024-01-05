import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Animatable from "react-native-animatable";
import { GoogleSigning } from "@/components";

const SignInScreen = () => {
  return (
    <Animatable.View
      animation="pulse"
      easing="ease-out"
      iterationCount="infinite"
      style={styles.container}
    >
      <GoogleSigning />
    </Animatable.View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});
