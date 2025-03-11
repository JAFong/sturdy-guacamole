"use client";

import { useState, useRef, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import ButtonGroup from "./components/ButtonGroup";
import formatTime from "./utils/formatTime";
import timeToPercentage from "./utils/timeToPercentage";

const DEFAULT_TIME = 60;

export default function Home() {
  const [totalTime, setTotalTime] = useState(DEFAULT_TIME);
  const [remainingTime, setRemainingTime] = useState(DEFAULT_TIME); // Time in seconds
  const [isPaused, setIsPaused] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setInputVal(formatTime(remainingTime));
  }, [remainingTime]);

  const pauseTimer = () => {
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
      setIsPaused(true);
    }
  };

  const handleStartClick = () => {
    if (interval.current == null) {
      setIsPaused(false);
      setRemainingTime((prev) => prev - 1);
      interval.current = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
      return;
    }

    pauseTimer();
  };

  const handleMinuteClick = () => {
    setTotalTime((prev) => prev + 60);
    setRemainingTime((prev) => prev + 60);
  };

  const handleResetClick = () => {
    setRemainingTime(DEFAULT_TIME);
    setTotalTime(DEFAULT_TIME);
    setIsPaused(true);

    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const handleInputBlur = () => {
    const [minutes, seconds] = inputVal.split(":").map(Number);

    if (isNaN(minutes) || isNaN(seconds)) {
      throw new Error("Invalid time format. Expected MM:SS.");
    }

    const minutesInSeconds = minutes * 60;
    const newTime = minutesInSeconds + seconds;

    setRemainingTime(newTime);

    if (newTime > totalTime) {
      setTotalTime(newTime);
    }
  };

  const handleInputChange = (formattedTime: string) => {
    setInputVal(formattedTime);
  };

  const handleSliderChange = (percentage: number) => {
    if (!percentage || !isDragging) return;
    pauseTimer();
    setRemainingTime(Math.round(totalTime * (percentage / 100)));
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
          width: "200px",
        }}
      >
        <CircularSlider
          dataIndex={timeToPercentage(remainingTime, totalTime)}
          min={0}
          max={100}
          width={200}
          trackSize={10}
          progressSize={10}
          progressColorFrom="#ffffff"
          progressColorTo="#ffffff"
          knobColor="#ffffff"
          trackColor="#253238"
          isDragging={(value) => setIsDragging(value)}
          onChange={(value) => handleSliderChange(value)}
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
              value={inputVal}
              onFocus={() => pauseTimer()}
              onBlur={() => handleInputBlur()}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          }
        />
        <ButtonGroup
          isPaused={isPaused}
          onMinuteClick={handleMinuteClick}
          onStartClick={handleStartClick}
          onResetClick={handleResetClick}
        />
      </div>
    </div>
  );
}
