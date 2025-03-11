type ButtonGroupProps = {
  isPaused: boolean;
  onMinuteClick: () => void;
  onStartClick: () => void;
  onResetClick: () => void;
};

const ButtonGroup = ({
  isPaused,
  onMinuteClick,
  onStartClick,
  onResetClick,
}: ButtonGroupProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: "14px",
          color: "#ffffff",
          cursor: "pointer",
        }}
        onClick={() => onMinuteClick()}
      >
        +1:00
      </button>
      <button
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.32)",
          border: "none",
          fontSize: "24px",
          color: "#ffffff",
          borderRadius: "100%",
          height: "50px",
          width: "50px",
          cursor: "pointer",
        }}
        onClick={() => onStartClick()}
      >
        {!isPaused ? <>&#x23F8;</> : <>&#x23F5;</>}
      </button>
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: "14px",
          color: "#ffffff",
          cursor: "pointer",
        }}
        onClick={() => onResetClick()}
      >
        Reset
      </button>
    </div>
  );
};

export default ButtonGroup;
