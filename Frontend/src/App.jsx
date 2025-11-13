import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import LandingPage from './assets/components/LandingPage.jsx'
import About from './assets/components/About.jsx'
import Register from './assets/components/Register.jsx'
import Dashboard from './assets/components/Dashboard.jsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
