"use client";

import { useState, useRef } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds - minutes * 60;

  const minuteStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${minuteStr}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const timeToPercentage = (remainingTime: number, totalTime: number) => {
  return (remainingTime / totalTime) * 100;
};

const DEFAULT_TIME = 60;

export default function Home() {
  const [totalTime, setTotalTime] = useState(DEFAULT_TIME);
  const [remainingTime, setRemainingTime] = useState(DEFAULT_TIME); // Time in seconds
  const interval = useRef<NodeJS.Timeout | null>(null);

  const handleStartClick = () => {
    if (interval.current == null) {
      setRemainingTime((prev) => prev - 1);
      interval.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return;
    }

    clearInterval(interval.current);
    interval.current = null;
  };

  const handleMinuteClick = () => {
    setTotalTime((prev) => prev + 60);
    setRemainingTime((prev) => prev + 60);
  };

  const handleResetClick = () => {
    setRemainingTime(DEFAULT_TIME);

    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const handleInputChange = (formattedTime: string) => {
    // Convert formatted time into time
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          width: "150px",
        }}
      >
        <div>{formatTime(remainingTime)}</div>
        <CircularSlider
          dataIndex={timeToPercentage(remainingTime, totalTime)}
          min={0}
          max={100}
          width={150}
          trackSize={10}
          progressSize={10}
          progressColorFrom="#ffffff"
          progressColorTo="#ffffff"
          knobColor="#ffffff"
          trackColor="#253238"
          onChange={(value) => {
            console.log(value);
          }}
          renderLabelValue={
            <input
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#ffffff",
                fontSize: "1.5rem",
                background: "none",
                border: "none",
                width: "60px",
                zIndex: "100",
              }}
              value={formatTime(remainingTime)}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button onClick={() => handleMinuteClick()}>Add 1 minute</button>
          <button onClick={() => handleStartClick()}>Pause/Play</button>
          <button onClick={() => handleResetClick()}>Reset</button>
        </div>
      </div>
    </div>
  );
}
