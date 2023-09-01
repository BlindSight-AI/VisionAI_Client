
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ClickHerePage.css";
import Navbar from "./Navbar";
const ClickHerePage = () => {
  const navigate = useNavigate();
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (animationComplete) {
      navigate("/VoiceRecord"); // Redirect to a different page route
    }
  }, [animationComplete, navigate]);

  function handleClick() {
    setAnimationComplete(true);
    promptForDestination();
  }

  function promptForDestination() {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(
      "Press the button to tell your destination"
    );
    synth.speak(utterance);
  }

  return (
    <>
    <Navbar/>
    <div className="click-here-page" onClick={handleClick}>
      <div id="clh" className={animationComplete ? "animation-complete" : ""}>
        <h3>Click Here</h3>
      </div>
    </div>
    </>
  );
};

export default ClickHerePage;

