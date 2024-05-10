import {useState, useEffect} from 'react'
import viteLogo from '/vite.svg'
import Weather from './Weather.jsx'
import Maps from './Maps.jsx'
import Currency from './Currency.jsx'
import Explore from './Explore.jsx'
import SearchContent from "./Search-Content"

import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

const App = () =>{
  return(
    <Router>
      <Routes>
        <Route path='/' element={<SearchContent/>}></Route>
        <Route path='/weather' element={<Maps/>}></Route>
        <Route path='/explore' element={<Navigate to="/explore/1" replace/>}></Route>
        <Route path='/explore/:id' element={<Explore/>}></Route>
      </Routes>
    </Router>
  )
}



export default App



