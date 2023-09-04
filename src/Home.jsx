import React, { useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import gif from '/gif/HomePageAnimation.gif';
import logo from '/images/Logo3.jpg';
    
const Welcome = () => {
    const [text, setText] = useState('');
    const [recording, setRecording] = useState(false);
    const [stream, setStream] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [voicePrompt, setVoicePrompt] = useState(''); // Voice prompt state
    const [show, setShow] = useState(false);
    const voiceText=useRef('');
    const [audio1] = useState(new Audio('./sound/start.mp3'));
    const [audio2] = useState(new Audio('./sound/end.mp3')); 
    const navigate=useNavigate();
    const prompt1 = 'How can I help you?';
    
      // Function to animate the voice prompt letter by letter
    const animateVoicePrompt = (textElement) => {
        let currentIndex = 0;
      const intervalId = setInterval(() => {
          setVoicePrompt(textElement.slice(0, currentIndex + 1));
    
          // if (currentIndex === textElement.length - 1) {
          //   clearInterval(intervalId);
          // }
          currentIndex++;
        }, 70); // Adjust the speed here (e.g., 70ms per letter)
      };
    

      const startRecording = async () => {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setStream(audioStream);
          setRecording(true);
          audio1.play();

          let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          let recognition = new SpeechRecognition();
          recognition.lang = 'en-US';

          recognition.onresult = (event) => {
            const result = event.results[0][0];
            const transcript = result.transcript;
            setText(transcript);
            voiceText.current = transcript;
          };
    
          recognition.onend = () => {
            setRecording(false);
          };
    
          recognition.start()

        } catch (error) {
          console.error('Error accessing microphone:', error);
        }
      };
    
      const stopRecording = () => {
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }
        setStream(null);
        setRecording(false);
        audio2.play();
      };
    
      const voiceNav=(text)=>{
        text=text.toLowerCase();
        console.log("voice :",text);
        const roadAssist=["road", "walk", "assist", "outside", "street", "stroll", "outdoors"];
        const location=["current", "location", "where", "place"];
        const facialRecog=["who", "recognize", "face",  "know","recognition"];
        for (let i = 0; i < roadAssist.length; i++) {
          const item = roadAssist[i];
          if (text.includes(item)) {
            navigate("/Traveling Aid");
            break;
          }
        }
        
        for (let i = 0; i < location.length; i++) {
          const item = location[i];
          if (text.includes(item)) {
            navigate("/Location");
            break;
          }
        }
        
        for (let i = 0; i < facialRecog.length; i++) {
          const item = facialRecog[i];
          if (text.includes(item)) {
            navigate("/Face Recognition");
            break;
          }
        }
        

      }

      const speakPrompt = (text) => {
        return new Promise((resolve) => {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.onend = resolve;
          synth.speak(utterance);
        });
      };
    
      const handleClick = async () => {
        setClicked(true);
        setShow(true);
        // animateVoicePrompt(prompt1);
        setVoicePrompt(prompt1);
        await speakPrompt(prompt1);
        startRecording();
        setTimeout(() => {
          stopRecording();
          voiceNav(voiceText.current);
          // animateVoicePrompt(text);
        }, 4000);
      };

    
      return (
        <>
          <div id='hm-main'>
            
            {/* Gif section */}
            <div id='gif'>
                <img id='gifvd' src={gif} alt="GIF" />
            </div>
            {/* heading */}
            <div id='logo'>
            <img src={logo} id='lg-img' alt="" />
            </div>
            {(!show) ? (
              <div className="conv" id='welcome'>Welcome</div>
            ) : (
              {/* Conversetion section */},
              <div className="conv">
                <h2>Welcome</h2>
                <h2>AI - <span></span>{voicePrompt}</h2>
                <div className='cursor-container'>
                  <span className="cursor">&#124;</span>
                </div>
                <h2>User - <span >{text}</span></h2>
                <div className='cursor-container'>
                  <span className="cursor">&#124;</span>
                </div>
              </div>
            )}
            {/* Button */}
            <div className='hm-btn'>
                <div id='hm-btn-s'onClick={handleClick} >Click Here to Speak</div>
            </div>
          </div>
        </>
      );
    };
    
    export default Welcome;