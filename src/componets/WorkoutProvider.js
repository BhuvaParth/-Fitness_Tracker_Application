import React, { createContext, useState, useEffect } from "react";

export const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const storedWorkouts = localStorage.getItem("workouts");
    if (storedWorkouts) {
      setWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);

  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem("workouts", JSON.stringify(workouts));
    }
  }, [workouts]);

  const addWorkout = (workout) => {
    setWorkouts((prevWorkouts) => {
      const updatedWorkouts = [...prevWorkouts, workout];
      localStorage.setItem("workouts", JSON.stringify(updatedWorkouts));
      return updatedWorkouts;
    });
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
}
