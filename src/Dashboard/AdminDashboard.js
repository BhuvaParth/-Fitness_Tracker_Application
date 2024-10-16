import React, { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { WorkoutContext } from "../componets/WorkoutProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const { workouts } = useContext(WorkoutContext);

  const aggregateData = () => {
    const activityData = {};
    workouts.forEach((workout) => {
      const { activityType, caloriesBurned } = workout;
      if (!activityData[activityType]) {
        activityData[activityType] = 0;
      }
      activityData[activityType] += Number(caloriesBurned);
    });
    return activityData;
  };

  const chartData = () => {
    const aggregated = aggregateData();
    const labels = Object.keys(aggregated);
    const data = Object.values(aggregated);
    return {
      labels,
      datasets: [
        {
          label: "Calories Burned",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 mt-10">Workout Trends</h2>
      <div className="w-full max-w-md mb-6">
        <Pie data={chartData()} />
      </div>
      <div className="w-full max-w-4xl">
        {workouts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg mb-10">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4">Activity Type</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Duration (minutes)</th>
                  <th className="py-2 px-4">Calories Burned</th>
                  <th className="py-2 px-4">Weight (kg)</th>
                  <th className="py-2 px-4">Weekly Goals</th>
                  <th className="py-2 px-4">Progress Tracking</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{workout.activityType}</td>
                    <td className="border px-4 py-2">{workout.date}</td>
                    <td className="border px-4 py-2">{workout.duration}</td>
                    <td className="border px-4 py-2">{workout.caloriesBurned}</td>
                    <td className="border px-4 py-2">{workout.weight}</td>
                    <td className="border px-4 py-2">{workout.weeklyGoals}</td>
                    <td className="border px-4 py-2">{workout.progressTracking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No workouts added yet.</p>
        )}
      </div>
    </div>
  );
}
