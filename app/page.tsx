"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import News from '../components/News'
import LoadingBar from "react-top-loading-bar";

const pagesize = 8;

 const page = (props) => {
const state = {
  progress: 0
};

const Setprogress = (progress: number) => {
  useState({ progress: progress })
}
  
    return (
      <div>
        <Navbar />
       <LoadingBar
  height={3}
  color="#000000"
  progress={props.progress}
/>
        <News pageSize={pagesize} country="us" category="sports"  setProgress={props.Setprogress}  />
        
      </div>
    )
  }

export default page
