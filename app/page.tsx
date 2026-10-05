"use client"
import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import News from '../components/News'

const pagesize = 8;

export default class page extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <News pageSize={pagesize} country="us" category="sports" />
        
      </div>
    )
  }
}

