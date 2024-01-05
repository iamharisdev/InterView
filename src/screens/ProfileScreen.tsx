import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomHeader, CustomInput } from "@/components";
import { deleteUserAccount, storeUserDataInFirestore } from "@/utils/export";
import auth from "@react-native-firebase/auth";
import { setUserData } from "@/store/local";
import { hp } from "@/utils/ScreenDimension";

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.local);
  const [isEntry, setIsEntry] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const fbUser = auth().currentUser;

  //const userDocument = await firestore().collection('users').doc(fbUser?.uid).get();

  const onPress = () => {
    if (isCheck) {
      const { key, value } = isEntry;

      const obj = { [key]: value };
      let object = { ...user, ...obj };
      console.log(object);
      dispatch(setUserData(object));
      storeUserDataInFirestore(obj);
      setIsCheck(false);
      setIsEntry(null);
    } else {
      setIsCheck(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <CustomHeader title="Profile" />
        <Image
          style={styles.profileImage}
          source={{ uri: user?.photo || "default_profile_image_url" }}
        />
        <>
          {Object.keys(user).map((key) => {
            const value = user[key];
            if (key == "photo") {
              return null;
            }
            return (
              <View key={key}>
              <CustomInput
                title={key}
                inputProps1={{
                  placeholderTextColor: "#B1B1B1",
                  value: value,
                  editable: false,
                }}
              />
              </View>
            );
          })}
        </>

        {isCheck ? (
          <CustomInput
            inputProps={{
              placeholderTextColor: "#B1B1B1",
              onChangeText: (e) => setIsEntry({ ...isEntry, key: e }),
            }}
            inputProps1={{
              placeholderTextColor: "#B1B1B1",
              onChangeText: (e) => setIsEntry({ ...isEntry, value: e }),
            }}
          />
        ) : null}
        <View style={styles.footer}>
          <CustomButton title="Add addiotinal field" onPress={onPress} />

          <CustomButton
            title="Delete User"
            onPress={() => {
              deleteUserAccount(navigation);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: "center",
    marginTop: hp(5),
  },
  text: {
    marginBottom: 10,
    alignSelf: "center",
  },
  footer: { flex:1,justifyContent:'flex-end',marginBottom:hp(5) },
});
