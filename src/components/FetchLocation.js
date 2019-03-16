import React from 'react';
import { Button } from 'react-native'

const FetchLocation = props => {
  return (
    <Button title="Fetch Location" onPress={props.getLocation} />
  )
}

export default FetchLocation