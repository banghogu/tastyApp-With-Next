/* global kakao */
import Map from '../components/Map'
import Markers from '../components/Markers'
import React, { useState } from 'react'
import StoreBox from '../components/StoreBox'
import axios from 'axios'
import { useQuery } from 'react-query'

const Home = () => {

  return (
    <>
      <Map />
      <Markers />
      <StoreBox />
    </>
  )
}

export default Home

