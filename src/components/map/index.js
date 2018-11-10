import React, { Component } from 'react';

// 3-rd party scripts
import ScriptTag from 'react-script-tag';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps"

class Map extends Component {
  render() {
    const MapComponent = withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
      >
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
      </GoogleMap>
    ))

    return (
      <div>
        <MapComponent
          containerElement={ <div style={{ height: `500px`, width: '500px' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    )
  }
}

export default Map
