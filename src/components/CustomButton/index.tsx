import { wp } from '@/utils/ScreenDimension';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress }:any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: 10,
    width:wp(80),
    alignSelf:'center'

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
