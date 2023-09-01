import React, { useState, useEffect } from "react";
import "./VoiceRecord.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-IN";

function VoiceRecord() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (isListening) {
      mic.start();

      mic.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setNote(transcript);
        console.log("Recognized Text:", transcript);
      };

      mic.onend = () => {
        setIsListening(false);
      };
    } else {
      mic.stop();
    }

    return () => {
      mic.stop();
    };
  }, [isListening]);

  const sendTextToBackend = async () => {
    try {
      const response = await fetch("YOUR_BACKEND_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: note }),
      });

      if (response.ok) {
        console.log("Text sent to backend successfully");
      } else {
        console.error("Failed to send text to backend");
      }
    } catch (error) {
      console.error("Error sending text to backend:", error);
    }
  };



  return (
    <div id="VcR-main">
      <div id="search-section">
        <input
          id="search-box"
          type="text"
          placeholder="Search here"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>
      <div id="map-section">{/* You can add your map component here */}</div>
      <div id="record-section">
        <button
          id="rcd-btn"
          onClick={() => {
            setIsListening((prevIsListening) => !prevIsListening);
            if (isListening) {
              sendTextToBackend();
            }
          }}
          className={isListening ? "recording" : ""}
        >
          {isListening ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </div>
  );
}

export default VoiceRecord;



