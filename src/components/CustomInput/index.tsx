// CustomTextInput.js
import { hp, wp } from "@/utils/ScreenDimension";
import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const CustomTextInput = ({ inputProps1, inputProps, title }: any) => {
  return (
    <View style={styles.container}>
      {inputProps ? (
        <TextInput style={styles.input} placeholder="Value" {...inputProps} />
      ) : (
        <View
          style={{
            justifyContent: "center",
            borderRightWidth: 1,
            borderColor: "black",
            width: wp(20),
          }}
        >
          <Text style={styles.titleStyle}>{title}</Text>
        </View>
      )}

      <TextInput style={styles.input1} placeholder="Field" {...inputProps1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(1),
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderColor: "black",
    width: wp(80),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    fontSize: 16,
    color: "#333",
    width: wp(20),
    borderRightWidth: 1,
    borderColor: "black",
  },
  input1: {
    height: 50,
    fontSize: 16,
    color: "#333",
    width: wp(50),
  },
  titleStyle: {
    color: "black",
    fontSize: 16,
    alignSelf: "center",
    marginLeft:wp(-5)
  },
});

export default CustomTextInput;
