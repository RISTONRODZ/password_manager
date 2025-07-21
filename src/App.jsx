import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'


function App() {
  return (
    <div className="min-h-screen flex flex-col h-screen w-screen">
      <Navbar />
      <div className="flex-grow">
        <Manager />
      </div>
      <Footer />
    </div>
  )
}


export default App;
