import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Header = ({ title }: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Header;
