import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Alert,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import * as Animatable from "react-native-animatable";
import firestore from "@react-native-firebase/firestore";
import { hp, wp } from "@/utils/ScreenDimension";
import { CustomButton, CustomHeader, CustomInput } from "@/components";
import { useSelector } from "react-redux";

const BlogScreen = ({ route, navigation }: any) => {
  const user = auth().currentUser;
  const [userBlogs, setUserBlogs] = useState([]);
  const [isEntry, setIsEntry] = useState(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (user) {
      // Fetch blogs for the current user from Firestore and update the state
      const unsubscribe = firestore()
        .collection("blogs")
        .where("userId", "==", user.uid)
        .onSnapshot((snapshot) => {
          const updatedBlogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserBlogs(updatedBlogs);
        });

      return () => unsubscribe();
    }
  }, [user]);

  const createBlog = async (title, content) => {
    if (user) {
      await firestore().collection("blogs").add({
        title,
        content,
        userId: user.uid, // Associate the blog with the current user
      });
    }
  };

  const updateBlog = async (blogId, title, content) => {
    await firestore()
      .collection("blogs")
      .doc(blogId)
      .update({ title, content });
  };

  const deleteBlog = async (blogId) => {
    await firestore().collection("blogs").doc(blogId).delete();
  };

  const onPress = (i: string, index: number) => {
    if (index == 0) {
      if (isShow) {
        setIsShow(false);
        createBlog(isEntry.title, isEntry.content);
      } else {
        setIsShow(true);
      }
    } else if (index == 1) {
      updateBlog(isEntry?.id, isEntry?.title, isEntry?.content);
      setIsShow(false);
    } else {
      deleteBlog(isEntry?.id);
    }
    setIsEntry(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <CustomHeader title="Blog Screen" />
        <Text style={styles.headingStyle}>User Blogs:</Text>
        <View style={{ marginHorizontal: wp(5), marginVertical: hp(1) }}>
          <FlatList
            data={userBlogs}
            keyExtractor={(item) => item.id}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.blogItem}
                onPress={() => {
                  console.log(item);
                  setIsEntry(item);
                  setIsShow(true);
                }}
              >
                <Text style={styles.blogTitle}>{item.title}</Text>
                <Text style={styles.blogContent}>{item.content}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {isShow ? (
          <View style={{ marginVertical: hp(2) }}>
            <CustomInput
              inputProps={{
                placeholderTextColor: "#B1B1B1",
                onChangeText: (e) => setIsEntry({ ...isEntry, title: e }),
                value: isEntry?.title,
              }}
              inputProps1={{
                placeholderTextColor: "#B1B1B1",
                onChangeText: (e) => setIsEntry({ ...isEntry, content: e }),
                value: isEntry?.content,
              }}
            />
          </View>
        ) : null}

        {["Create", "Update", "Delete"].map((i, index) => {
          return (
            <View key={index}>
              <CustomButton title={i} onPress={() => onPress(i, index)} />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default BlogScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingStyle: {
    fontWeight: "bold",
    fontSize: wp(5),
    color: "black",
    marginHorizontal: wp(5),
    marginTop: hp(5),
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
  blogItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: hp(1),
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  blogContent: {
    fontSize: 16,
    color: "#333",
  },
});
