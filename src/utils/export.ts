import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native'
import { setUserData } from "@/store/local";

const fb = firestore().collection("users");
const user = auth().currentUser;

const signInWithGoogle = async (navigation:any,dispatch:any) => {
  try {
    await GoogleSignin.hasPlayServices();
    const {user} = await GoogleSignin.signIn();
    let obj ={
      name:user?.name,
      email:user?.email,
      photo:user?.photo
    }
     dispatch(setUserData(obj))
   navigation.navigate("Home");
    GoogleSignin.signOut();
  } catch (error) {
    GoogleSignin.signOut();
    console.log(error)
  }
};


const deleteUserAccount = async (navigation:any) => {
  try {
    await fb.doc(user?.uid).delete()
   
    setTimeout(()=>{
      navigation.navigate("SignIn");
      Alert.alert("Alert","Account deleted successfully")
    },1500)
  
  } catch (error) {
    Alert.alert("Error deleting account:",error)
   
  }
};

const storeUserDataInFirestore = async (data) => {
  try {
    await firestore().collection("users").doc(user.uid).set(
      {
       data,
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error storing user data in Firestore:', error);
  }
};

export { signInWithGoogle,deleteUserAccount ,storeUserDataInFirestore};
