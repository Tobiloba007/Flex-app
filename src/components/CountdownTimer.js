import { Text } from "react-native";
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ duration }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Decrease the time remaining by 1 second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000); // Update every second

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Run once on component mount

  // Format the time remaining as minutes and seconds
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // Display the countdown timer
  return (
    <Text>{`${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`}</Text>
  );
};

export default CountdownTimer;
