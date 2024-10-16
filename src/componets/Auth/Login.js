import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setIsAuthenticated }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateLoginForm = () => {
    let validationErrors = {};
    if (!loginData.email) validationErrors.email = "Email is required";
    if (!loginData.password) validationErrors.password = "Password is required";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (validateLoginForm()) {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const matchedUser = users.find(
        (user) =>
          user.email === loginData.email && user.password === loginData.password
      );

      if (matchedUser) {
        localStorage.setItem("auth", "true");
        setIsAuthenticated(true);
        navigate("/admindashboard");
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("Please fill all fields correctly.");
    }
  };

  const handleNavigateToSignup = () => {
    navigate("/signup"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h4 className="text-center text-2xl font-bold mb-4">Login Page</h4>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              className={`w-full p-2 border text-black ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              className={`w-full p-2 border text-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">Don't have an account?</p>
          <button
            onClick={handleNavigateToSignup}
            className="text-blue-600 hover:underline"
          >
            Sign Up Here
          </button>
        </div>
      </div>
    </div>
  );
}
