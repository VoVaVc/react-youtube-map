import React, { Component } from 'react';
import './App.css';

// components
import Map from  './components/map/index'

console.log('Map is', Map)

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          Here is a nice header
        </header>
        <div className="content">
          <aside>
            Here will be some youtube videos
          </aside>
          <div className="map-area">
            <Map/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
