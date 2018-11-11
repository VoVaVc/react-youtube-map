import React, { Component } from 'react'
import YouTube from 'react-youtube';
import './videos-list.scss'

import {
  init as YoutubeApiInit,
  request as YoutubeRequest
 } from '../../utils/youtube-api';

class VideosList extends Component {
  constructor (props) {
    super(props)
    this.listRef = React.createRef()
    this.state = {
      videos: [],
      videoWidth: 320,
      videoHeight: 160,
      loading: false
    }

    this.onWindowResize = this.onWindowResize.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.mapData !== this.props.mapData) {
      this.fetchData(nextProps.mapData)
    }
  }

  componentDidMount () {
    YoutubeApiInit()
    window.addEventListener('resize', this.onWindowResize)
    this.onWindowResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.onWindowResize)
  }

  onWindowResize () {
    let width = this.listRef.current.clientWidth
    this.setState({
      videoWidth: width,
      videoHeight: width/2
    })
  }

  async fetchData (params) {
    let response = await YoutubeRequest(params)
    let videos = !response.items || response.items.map((item) => {
      let { title } = item.snippet
      return {
        id: item.id.videoId,
        title: title
      }
    })

    this.setState({videos})
  }

  render() {
    let {videoHeight, videoWidth} = this.state

    return (
      <ul className="videos" ref={this.listRef}>
        { this.state.videos.map((item, index) => {
          return <li key={index}>
            <YouTube videoId={item.id} opts={{height: videoHeight, width: videoWidth}}/>
            <p>{ item.title }</p>
          </li>
        }) }
      </ul>
    )
  }
}

export default VideosList
