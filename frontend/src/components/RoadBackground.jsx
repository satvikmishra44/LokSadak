import React from "react";

const RoadBackground = () => {
  return (
    <div style={styles.container}>
      <div style={styles.road}></div>
    </div>
  );
};

const styles = {
  container: {
    margin: 0,
    background: "#222",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  road: {
    width: "90vw",
    height: "90vh",
    backgroundColor: "#333",
    position: "relative",
    borderRadius: "20px",
    boxShadow: "inset 0 0 30px #111",
    overflow: "hidden",
    // White dashed center line using background image
    backgroundImage: `
      linear-gradient(to right, transparent 50%, white 50%),
      repeating-linear-gradient(
        to bottom,
        white 0,
        white 80px,
        transparent 80px,
        transparent 160px
      )
    `,
    backgroundSize: "10vw 100%, 10vw 160px",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat, repeat-y",
  },
};

export default RoadBackground;
