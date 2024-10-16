import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WorkoutContext } from "../WorkoutProvider";

export default function FitnessForm() {
  const navigate = useNavigate();
  const { addWorkout } = useContext(WorkoutContext);
  const [formData, setFormData] = useState({
    activityType: "",
    duration: "",
    caloriesBurned: "",
    date: "",
    weeklyGoals: "",
    progressTracking: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.activityType.trim())
      validationErrors.activityType = "Activity type is required";
    if (!formData.duration) validationErrors.duration = "Duration is required";
    if (!formData.caloriesBurned)
      validationErrors.caloriesBurned = "Calories burned is required";
    if (!formData.date) validationErrors.date = "Date is required";
    if (!formData.weeklyGoals.trim())
      validationErrors.weeklyGoals = "Weekly goals are required";
    if (!formData.progressTracking.trim())
      validationErrors.progressTracking = "Progress tracking is required";
    if (!formData.weight) validationErrors.weight = "Weight is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addWorkout(formData);
      const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
      workouts.push(formData);
      localStorage.setItem("workouts", JSON.stringify(workouts));
      alert("Add Workout data successfully!");
      navigate("/");

      setFormData({
        activityType: "",
        duration: "",
        caloriesBurned: "",
        date: "",
        weeklyGoals: "",
        progressTracking: "",
        weight: "",
      });
      setErrors({});
    } else {
      alert("Please fill in all fields correctly.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-black">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md my-10">
          <h2 className="text-center text-2xl font-bold mb-6 text-white">
            Log Your Workout
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="activityType"
                className="block text-sm font-medium mb-1 text-white"
              >
                Activity Type:
              </label>
              <input
                type="text"
                name="activityType"
                value={formData.activityType}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.activityType ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.activityType && (
                <p className="text-red-500 text-sm">{errors.activityType}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="duration"
                className="block text-sm font-medium mb-1 text-white"
              >
                Duration (minutes):
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="caloriesBurned"
                className="block text-sm font-medium mb-1 text-white"
              >
                Calories Burned:
              </label>
              <input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleChange}
                className={`w-full p-2 border text-black ${
                  errors.caloriesBurned ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.caloriesBurned && (
                <p className="text-red-500 text-sm">{errors.caloriesBurned}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="weight"
                className="block text-sm font-medium mb-1 text-white"
              >
                Weight (lbs or kg):
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.weight ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="date"
                className="block text-sm font-medium mb-1 text-white"
              >
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.date ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="weeklyGoals"
                className="block text-sm font-medium mb-1 text-white"
              >
                Weekly Goals:
              </label>
              <input
                type="text"
                name="weeklyGoals"
                value={formData.weeklyGoals}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.weeklyGoals ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.weeklyGoals && (
                <p className="text-red-500 text-sm">{errors.weeklyGoals}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="progressTracking"
                className="block text-sm font-medium mb-1 text-white"
              >
                Progress Tracking:
              </label>
              <input
                type="text"
                name="progressTracking"
                value={formData.progressTracking}
                onChange={handleChange}
                className={`w-full p-2 border ${
                  errors.progressTracking ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.progressTracking && (
                <p className="text-red-500 text-sm">
                  {errors.progressTracking}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
