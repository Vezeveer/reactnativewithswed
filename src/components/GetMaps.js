import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'

const GetMaps = (props) => {
  const userMarkers = props.userPlaces.map(userPlace =>
    <MapView.Marker coordinate={userPlace} key={userPlace.id} />)
  return (
    <View style={styles.mapContainer}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        region={props.userLocation}
      >
        {props.userLocation ? <MapView.Marker coordinate={props.userLocation} /> : <View></View>}
        {userMarkers}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: 200,
    marginTop: 20
  },
  map: {
    height: '100%',
    width: '100%'
  }
})

export default GetMaps