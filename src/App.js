import React, { Component } from 'react';
import './App.scss';

// components
import Map from  './components/map/index'
import VideosList from './components/videos-list/videos-list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [],
      index: 0
    }

    this.handleMapChanged = this.handleMapChanged.bind(this)
    this.pickMapObject = this.pickMapObject.bind(this)
  }

  handleMapChanged (mapData) {
    this.setState(prevState => ({
      history: [...prevState.history, mapData],
      index: prevState.history.length
    }))
  }

  pickMapObject (isPrev) {
    let { index } = this.state
    this.setState({index: index + (isPrev ? -1 : 1)})
  }

  render() {
    let { history, index } = this.state
    let limit = history.length - 2
    let mapObject = history[index]

    return (
      <div className="App">
        <header>
          <div className={`arrow ${index < 1 ? 'disabled' : ''}`} onClick={() => this.pickMapObject(true)}/>
          <div className={`arrow right ${index > limit ? 'disabled': ''}`} onClick={() => this.pickMapObject()}/>
        </header>
        <div className="container">
          <aside>
            <VideosList mapData={mapObject}/>
          </aside>
          <div className="map-area">
            <Map onMapChanged={this.handleMapChanged}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
