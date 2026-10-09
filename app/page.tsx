"use client"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import News from '../components/News'
import LoadingBar from "react-top-loading-bar";

const pagesize = 8;

export default class page extends Component {
state = {
  progress: 0
};
Setprogress = (progress: number) => {
  this.setState({ progress: progress })
}
  render() {
    return (
      <div>
        <Navbar />
       <LoadingBar
  height={3}
  color="#000000"
  progress={this.state.progress}
/>
        <News pageSize={pagesize} country="us" category="sports"  setProgress={this.Setprogress} />
        
      </div>
    )
  }
}

