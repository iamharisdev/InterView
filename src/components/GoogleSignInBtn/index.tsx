import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { signInWithGoogle } from "@/utils/export";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";

const GoogleSigning = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => signInWithGoogle(navigation,dispatch)}
      activeOpacity={0.7}
    >
      <View style={styles.btnView}>
        <Icon
          name="google"
          size={24}
          color="white"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.textStyle}>Sign in </Text>
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
