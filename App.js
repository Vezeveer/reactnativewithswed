import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import FetchLocation from './src/components/FetchLocation';
import GetMaps from './src/components/GetMaps'

export default class App extends Component {
  state = {
    userLocation: null,
    userPlaces: []
  }

  handleFetchLocation = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      this.setState({
        userLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          latitudeDelta: 0.0600,
          longitudeDelta: 0.0400
        }
      })
      fetch('https://realtime-database-666.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        })
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, err => console.log(err))
  }

  getUserPlacesHanlder = () => {
    fetch('https://realtime-database-666.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key
          })
        }
        this.setState({
          userPlaces: placesArray
        })
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Hello There</Text>
        <View style={{ marginBottom: 20 }}>
          <Button title="Get User Places" onPress={this.getUserPlacesHandler} />
        </View>
        <FetchLocation getLocation={this.handleFetchLocation} />
        <GetMaps userLocation={this.state.userLocation} userPlaces={this.state.userPlaces} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
