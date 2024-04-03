import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustText from '../Component/CustText';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Images/Weather.png')}
        style={styles.image}
      />

      <View style={styles.textcon}>
        <Text style={styles.cont}>Welcome to the weather app</Text>
      </View>

      <TouchableOpacity
        style={styles.touch}
        onPress={() => navigation.navigate('Weather')}>
        <CustText text="Continue" style={styles.cont} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  image: {
    width: 130,
    height: 130,
  },

  touch: {
    width: 300,
    backgroundColor: 'green',
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 15,
  },

  textcon: {
    alignItems: 'center',
  },

  cont: {
    fontSize: 20,
    color: 'white',
  },
});
