import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Home'
import CameraRecorder from './Component/CameraRecorder'
import FaceRecognition from './Component/FaceRecognition'
import CurrentLocation from './Component/CurrentLocation'
import { MyProvider } from './Context'
import Welcome from './Home'
function App() {

  return (
    <>

      <MyProvider>
        <Home />
      </MyProvider>
    </>
  )
}

export default App;


      {/* <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Traveling Aid' element={<CameraRecorder />} />
          <Route path='/Location' element={<CurrentLocation />} />
          <Route path='/Face Recognition' element={<FaceRecognition />}/>
        </Routes>
      </Router> */}