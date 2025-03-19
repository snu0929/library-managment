import { useState } from 'react'
import './App.css'
import { AllRoutes } from './components/AllRoutes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <AllRoutes />
      <Footer />
    </>
  )
}

export default App
