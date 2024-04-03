import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CustText from '../Component/CustText';

export default function WeatherData({item, index}) {
  const [isOpen, setOpen] = useState(false);

  return (
    <View>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => setOpen(!isOpen)}>
          <View style={styles.header}>
            <CustText
              text={new Date(item?.dt * 1000).toDateString()}
              extra=""
              style={styles.date}
            />

            <View style={styles.temp}>
              <Image
                source={{
                  uri: `https://openweathermap.org/img/w/${item?.weather[0].icon}.png`,
                }}
                style={styles.cloud1}
              />

              <CustText text={item?.temp.min} extra="/" style={styles.date} />
              <CustText text={item?.temp.max} extra="˚C" style={styles.date} />

              {isOpen ? (
                <TouchableOpacity onPress={() => setOpen(false)}>
                  <Image
                    source={require('../assets/Images/down-arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Image
                    source={require('../assets/Images/up-arrow.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {isOpen ? (
            <>
              <View style={styles.cloud2}>
                <Image
                  source={{
                    uri: `https://openweathermap.org/img/w/${item?.weather[0].icon}.png`,
                  }}
                  style={styles.descimg}
                />

                <View style={styles.desc}>
                  <CustText
                    text={item?.weather[0].description}
                    extra=""
                    style={styles.desc1}
                  />

                  <CustText
                    text={`The high will be ${item?.temp.min}˚C, the low will be ${item?.temp.max}˚C`}
                    extra=""
                    style={styles.desc2}
                  />
                </View>
              </View>

              <View style={styles.dayweather}>
                <View style={styles.tempfeel}>
                  <CustText text="TEMPRETURE" style={styles.tempr} />
                  <CustText text="FEELS LIKE" style={styles.tempr} />
                </View>

                <View style={styles.morning}>
                  <CustText text="Morning" style={styles.mornhead} />
                  <CustText
                    text={item?.temp.morn}
                    extra="%"
                    style={styles.morn}
                  />
                  <CustText
                    text={item?.feels_like.morn}
                    extra="%"
                    style={styles.morn}
                  />
                </View>

                <View style={styles.evening}>
                  <CustText text="Evening" style={styles.evehead} />
                  <CustText
                    text={item?.temp.eve}
                    extra="%"
                    style={styles.eve}
                  />
                  <CustText
                    text={item?.feels_like.eve}
                    extra="%"
                    style={styles.eve}
                  />
                </View>

                <View style={styles.night}>
                  <CustText text="Night" style={styles.nighthead} />
                  <CustText
                    text={item?.temp.night}
                    extra="%"
                    style={styles.nigh}
                  />
                  <CustText
                    text={item?.feels_like.night}
                    extra="%"
                    style={styles.nigh}
                  />
                </View>
              </View>

              <View style={styles.huv}>
                <View>
                  <View style={styles.huminity}>
                    <Image
                      source={require('../assets/Images/cloud.png')}
                      style={styles.arrow}
                    />
                    <CustText
                      text={item?.wind_gust}
                      extra="%"
                      style={styles.humi}
                    />
                  </View>

                  <View style={styles.huminity}>
                    <CustText text="Huminity : " style={styles.hum} />
                    <CustText
                      text={item?.humidity}
                      extra="%"
                      style={styles.tempr}
                    />
                  </View>
                </View>

                <View>
                  <View style={styles.huminity}>
                    <Image
                      source={require('../assets/Images/navigation.png')}
                      style={styles.arrow}
                    />
                    <CustText
                      text={item?.wind_deg}
                      extra="m/s"
                      style={styles.uvi}
                    />
                  </View>

                  <View style={styles.huminity}>
                    <CustText text="UV: " style={styles.uv} />
                    <CustText text={item?.uvi} style={styles.tempr} />
                  </View>
                </View>

                <View>
                  <View style={styles.huminity}>
                    <Image
                      source={require('../assets/Images/pressure.png')}
                      style={styles.arrow}
                    />
                    <CustText
                      text={item?.pressure}
                      extra="Hpa"
                      style={styles.dewp}
                    />
                  </View>
                  <View style={styles.huminity}>
                    <CustText text="Dew point: " style={styles.dew} />
                    <CustText
                      text={item?.dew_point}
                      extra="˚C"
                      style={styles.tempr}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.sun}>
                <View style={styles.sunrise}>
                  <CustText text="SUNRISE" style={styles.mornhead} />
                  <CustText
                    text={
                      new Date(item?.sunrise * 1000).getHours() +
                      ':' +
                      new Date(item?.sunrise * 1000).getMinutes()
                    }
                    extra=" am"
                    style={styles.morn}
                  />
                </View>

                <View style={styles.sunset}>
                  <CustText text="SENSET" style={styles.evehead} />
                  <CustText
                    text={
                      new Date(item?.sunset * 1000).getHours() +
                      ':' +
                      new Date(item?.sunset * 1000).getMinutes()
                    }
                    extra=" pm"
                    style={styles.eve}
                  />
                </View>
              </View>
            </>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 15,
    opacity: 10,
    marginBottom: 15,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
  },

  date: {
    color: 'black',
    fontSize: 15,
  },

  temp: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cloud1: {
    marginLeft: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
  },

  arrow: {
    marginLeft: 5,
    width: 18,
    height: 18,
    borderRadius: 20,
  },

  cloud2: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  descimg: {
    marginLeft: 10,
    width: 35,
    height: 35,
  },

  desc: {
    marginLeft: 10,
    marginRight: 50,
  },

  desc1: {
    color: 'black',
    fontSize: 16,
  },

  desc2: {
    color: 'grey',
    fontSize: 14,
  },

  dayweather: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },

  tempr: {
    color: 'black',
    fontSize: 13,
  },

  tempfeel: {
    margin: 5,
    marginTop: 20,
  },

  morning: {
    marginLeft: 13,
    color: 'grey',
    fontSize: 15,
  },

  evening: {
    marginLeft: 13,
    color: 'grey',
    fontSize: 15,
  },

  night: {
    marginLeft: 13,
    color: 'grey',
    fontSize: 15,
  },

  mornhead: {
    color: 'grey',
    fontSize: 14,
  },

  evehead: {
    color: 'grey',
    fontSize: 14,
  },

  nighthead: {
    color: 'grey',
    fontSize: 15,
  },

  morn: {
    fontSize: 13,
    color: 'black',
  },

  eve: {
    fontSize: 13,
    color: 'black',
  },

  nigh: {
    fontSize: 13,
    color: 'black',
  },

  daynum: {
    marginLeft: 12,
  },

  umbrella: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  huminity: {
    flexDirection: 'row',
    marginLeft: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  huv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  huv: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  humi: {
    color: 'black',
    fontSize: 13,
    marginLeft: 5,
  },

  uvi: {
    color: 'black',
    fontSize: 13,
    marginLeft: 5,
  },

  dewp: {
    color: 'black',
    fontSize: 13,
    marginLeft: 5,
  },

  uv: {
    color: 'grey',
    fontSize: 13,
  },

  dew: {
    color: 'grey',
    fontSize: 13,
  },

  hum: {
    fontSize: 14,
    color: 'grey',
  },

  sun: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 5,
  },

  sunrise: {
    marginLeft: 30,
  },

  sunset: {
    marginLeft: 12,
    marginBottom: 6,
  },
});
