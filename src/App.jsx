import { useState } from 'react'
import './App.css'
import VoiceRecord from './Component/VoiceRecord'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VoiceRecord/>
    </>
  )
}

export default App
