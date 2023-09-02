import React, { useEffect,useState } from 'react';
import './VoiceSearch.css';

const VoiceSearch = () => {
  const [text, setText] = useState('');
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [clicked,setClicked]=useState(false);
  const [voicePrompt, setVoicePrompt] = useState(''); // Voice prompt state
  //const [userInput, setUserInput] = useState(''); 
  const prompt = "Where do you want to go?";


  const startRecording = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);
      setRecording(true);
      console.log("Start recording");
      let SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onend = () => {
      setRecording(false);
    };

    recognition.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  const stopRecording = () => {
    console.log("stop");
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setStream(null);
    setRecording(false);
  };
  

  const speakPrompt = (text) => {
    return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = resolve;
    synth.speak(utterance);
  });
  };
        // Function to animate the voice prompt letter by letter
        const animateVoicePrompt = (text) => {
        
          let currentIndex = 0;
    
          const intervalId = setInterval(() => {
            setVoicePrompt(text.slice(0, currentIndex + 1));
    
            if (currentIndex === text.length - 1) {
               clearInterval(intervalId);
            }
    
            currentIndex++;
          }, 70); 
        }// Adjust the speed here (e.g., 100ms per letter)
 
        const handleClick = async () => {
          setClicked(true);
          animateVoicePrompt(prompt);
          await speakPrompt(prompt);
          startRecording();
          setTimeout(() => stopRecording(), 4000);
        };
        

  return (
    <>
    <div className="voice-search-container">
    <h1 >VisionNavAI</h1>
      {!clicked? <button onClick={handleClick}>Speak</button> : <div><input
  type="text"
  placeholder="Destination"
  value={text}
  onChange={(e) => setText(e.target.value)}/>
{(!recording)?<div className="voice-prompt">{voicePrompt}</div>:<p>Recording...</p>}</div>}
    </div>
    </>
  );
};

export default VoiceSearch;



