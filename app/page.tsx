"use client"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import News from '../components/News'

export default class page extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pagesize={9} />
        
      </div>
    )
  }
}

