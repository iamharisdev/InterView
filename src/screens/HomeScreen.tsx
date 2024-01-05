import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import * as Animatable from "react-native-animatable";
import firestore from "@react-native-firebase/firestore";
import { hp, wp } from "@/utils/ScreenDimension";
import { CustomButton, CustomHeader } from "@/components";
import { useSelector } from "react-redux";

const HomeScreen = ({ route, navigation }: any) => {
  const { user } = useSelector((state) => state.local);
  const [isFirstSignIn, setIsFirstSignIn] = useState(false);

  useEffect(() => {
    checkFirstSignIn();

    if (isFirstSignIn) {
      Alert.alert("Welcome", `You are welcome ${user?.name} in the app`);
    } else {
    }
  }, [isFirstSignIn]);

  const checkFirstSignIn = async () => {
    try {
      const user = auth().currentUser;

      if (user) {
        const userDoc = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (!userDoc.exists) {
          setIsFirstSignIn(true);

          await firestore().collection("users").doc(user.uid).set({
            isFirstSignIn: true,
          });
        }
      }
    } catch (error) {
      console.error("Error checking first sign-in:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Home Screen" />
      <Animatable.Text
        animation="slideInDown"
        iterationCount="infinite"
        direction="alternate"
        style={{ marginTop: hp(20), alignSelf: "center" }}
      >
        {isFirstSignIn
          ? `Welcome "${user?.name}" in the app.`
          : `Welcome back "${user?.name}"`}
      </Animatable.Text>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{ textAlign: "center", marginBottom: hp(5) }}
      >
        ❤️
      </Animatable.Text>
      <CustomButton
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <CustomButton title="Blogs" 
      onPress={() => navigation.navigate("Blog")}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: wp(40),
    height: wp(40),
    borderRadius: wp(40),
    marginBottom: hp(4),
    alignSelf: "center",
    marginTop: hp(5),
  },
  text: {
    marginBottom: hp(3),
    alignSelf: "center",
  },
});
