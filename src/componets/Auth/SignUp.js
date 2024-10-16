import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
    if (!formData.name.trim()) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";
    if (!formData.password || formData.password.length < 6)
      validationErrors.password = "Password must be at least 6 characters long";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      
      existingUsers.push(formData);
      
      localStorage.setItem("users", JSON.stringify(existingUsers));
      
      alert("Registration Successful!");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-center text-2xl font-bold mb-6">Fitness Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 text-black border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 text-black border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full p-2 text-black border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring focus:ring-blue-500`}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
            >
              Register
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>Already have an account? <Link to='/login' className="text-blue-500 hover:underline">Log In</Link></p>
          </div>
        </div>
      </div>
    </>
  );
}
