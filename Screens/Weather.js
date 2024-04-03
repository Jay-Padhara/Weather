import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  RefreshControl,
  Linking,
  AppState,
} from 'react-native';
import WeatherData from './WeatherData';
import {useDispatch, useSelector} from 'react-redux';
import {weatherApi} from '../Redux/WeatherApi';
import Geolocation from '@react-native-community/geolocation';
import {locationcords} from '../Redux/WeatherReducer';
import CustText from '../Component/CustText';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import {useNavigation} from '@react-navigation/native';

export default function Weather() {
  const [isrefreshing, setRefreshing] = useState(false);

  const [cappstate, setCappstate] = useState(AppState.currentState);
  console.log(cappstate);

  const dispatch = useDispatch();

  const items = useSelector(state => state.api.data);
  const data = useSelector(state => state.api);

  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    handlePermission();
  }, [handlePermission]);

  useEffect(() => {
    const appstate = AppState.addEventListener('change', async nextAppState => {
      console.log('Next AppState is: ', nextAppState);
      setCappstate(nextAppState);

      if (nextAppState === 'active') {
        try {
          const check = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          console.log('check : ' + check);

          if (!check) {
            handlePerAlert();
          } else {
            console.log('Location permission granted.');
            handleLocAlert();
          }
        } catch (error) {
          console.log(error);
        }
      }
    });

    return () => {
      appstate.remove();
    };
  }, [handleLocAlert]);

  const handlePermission = useCallback(async () => {
    try {
      //////////// ANDROID PERMISSION ////////////////////
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location permission',
            message: 'Give access to location permission',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          handleLoc();
        } else {
          console.log('Location permission denied.');
          handlePerAlert();
        }
      } else {
        ///////////// IOS PERIMISSION FOR GEOLOCATION ////////////////////
        const authStatus = await Geolocation.getAuthorizationStatus();
        if (authStatus === 'authorized') {
          handleData();
        } else {
          Geolocation.requestAuthorization(
            () => {
              handleData();
            },
            () => {
              console.log('Location permission denied.');
              handlePerAlert();
            },
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleData, handleLoc]);

  /////////// HANDLE USERLOCATION AND DATA DISPATCH /////////////////////
  const handleData = useCallback(() => {
    try {
      // setRefreshing(true);
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          const {latitude, longitude} = position.coords;
          const cord = {latitude: latitude, longitude: longitude};

          dispatch(weatherApi(cord));

          dispatch(locationcords({latitude: latitude, longitude: longitude}));

          console.log('Dispatched : ' + latitude, longitude);
        },
        error => {
          if (error.code == 2) {
            console.log('Location provider not available');
          } else {
            console.log('Error getting location: ' + error.message);
          }
        },
      );
      // setRefreshing(false);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  /////////////// ALERT FOR OPEN SETIING /////////////////////
  const handlePerAlert = () => {
    Alert.alert(
      'Device location permission',
      'Grant permission to access device fine location.',
      [
        {
          text: 'Grant permission',
          style: 'default',
          onPress: () => {
            if (Platform.OS === 'android') {
              Linking.openSettings();
            } else {
              Linking.openURL('app - settings:');
            }
          },
        },
      ],
    );
  };

  ///////////// HANDLE LOCATION PROMPT //////////////////////
  const handleLoc = useCallback(async () => {
    const check = await isLocationEnabled();

    if (check) {
      handleData();
    } else {
      try {
        const result = await promptForEnableLocationIfNeeded();
        console.log('Result : ', result);
        handleData();
      } catch (error) {
        console.log(error);
        handleLocAlert();
      }
    }
  }, [handleData, handleLocAlert]);

  /////////////// ALERT FOR OPEN SETIING /////////////////////
  const handleLocAlert = useCallback(() => {
    Alert.alert(
      'Location permission',
      'Grant permission to access device location.',
      [
        {
          text: 'Grant Permission',
          style: 'default',
          onPress: () => {
            handleLoc();
          },
        },
      ],
    );
  }, [handleLoc]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <CustText text="Weather" style={styles.text1} />

      <View style={styles.contain1}>
        <Text style={styles.text2}>Latitude : {data.latitude}</Text>

        <Text style={styles.text2}>Longitude : {data.longitude}</Text>
      </View>

      {items ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isrefreshing}
              onRefresh={handleData}
              colors={['green', 'blue']}
              progressBackgroundColor="white"
            />
          }
          data={items?.daily}
          renderItem={({item, index}) => {
            return <WeatherData item={item} index={index} />;
          }}
        />
      ) : (
        <View style={styles.contain2}>
          <ActivityIndicator color="red" size={50} style={styles.indicator} />
          <CustText text="Loading data..." style={styles.text3} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  contain1: {
    alignItems: 'center',
  },

  contain2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text1: {
    fontSize: 25,
    color: 'white',
    margin: 25,
  },

  text2: {
    color: 'white',
    fontSize: 15,
  },

  text3: {
    color: 'white',
    fontSize: 23,
  },

  indicator: {
    margin: 15,
  },
});
