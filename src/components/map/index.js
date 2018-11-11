import React, { Component } from 'react';
import './map.scss'

// 3-rd party scripts
import { withGoogleMap, GoogleMap, Circle } from "react-google-maps"

class Map extends Component {
  apiInterval = null

  constructor (props) {
    super(props)

    this.state = {
      center: { lat: -34.397, lng: 150.644 },
      radius: 10000
    }

    this.handleMapClick = this.handleMapClick.bind(this)
  }

  componentDidMount () {
    this.changeLocation()
  }

  componentWillUnmount () {
    clearTimeout(this.apiInterval)
  }

  handleMapClick (event) {
    // console.log('map clicked', )
    let { lat, lng } = event.latLng
    this.setState({center: {
      lat: lat(),
      lng: lng()
    }})
    this.changeLocation()
  }

  handleChanged (self, eventType) {
    if(eventType === 'radius'){
      this.radius = self.radius
    }

    if(eventType === 'center'){
      let {lat, lng} = self.center
      this.center = {
        lat: lat(),
        lng: lng()
      }
    }

    this.changeLocation()
  }

  changeLocation () {
    clearTimeout(this.apiInterval)
    this.apiInterval = setTimeout(() => {
      let location = `${this.state.center.lat},${this.state.center.lng}`
      let locationRadius = `${Math.ceil(this.state.radius / 100)}km`

      this.props.onMapChanged({location, locationRadius})
    }, 500)
  }

  MapComponent = withGoogleMap((props) => {
    let _self = this
    let { center, radius } = this.state

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        onClick={this.handleMapClick}
      >
        <Circle
          draggable={true}
          editable={true}
          radius={radius}
          center={center}
          visible={true}
          onRadiusChanged={function(){_self.handleChanged(this, 'radius')}}
          onCenterChanged={function(){_self.handleChanged(this, 'center')}}
        />
      </GoogleMap>
    )
  })

  render() {
    const { MapComponent } = this
    return (
      <MapComponent
        containerElement={ <div className="map-wrapper" /> }
        mapElement={ <div style={{ height: `100%` }} /> }
      />
    )
  }
}

export default Map
