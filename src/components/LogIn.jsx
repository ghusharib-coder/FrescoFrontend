
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import API_BASE_URL from "../config";
function LogIn({ switchToLogin }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const OnSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://fresco-backend-gray.vercel.app/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/ShopingCart");
      } else {
        alert(result.message);
      }
      reset();
    } catch (err) {
      console.error("Error:", err);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="auth-form">
      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="login-name">👤 Username</label>
        <input
          id="login-name"
          placeholder="Enter your username"
          type="text"
          {...register("name", {
            required: "Username is required",
            minLength: { value: 3, message: "At least 3 characters required" },
          })}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && (
          <span className="error-message">❌ {errors.name.message}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="form-group">
        <label htmlFor="login-password">🔒 Password</label>
        <div className="password-wrapper">
          <input
            id="login-password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className={errors.password ? "input-error" : ""}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.password && (
          <span className="error-message">❌ {errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="auth-button"
        disabled={isLoading}
      >
        {isLoading ? "⏳ Logging in..." : "🚀 Log In"}
      </button>

      <p className="form-note">Keep your password safe and secure</p>
    </form>
  );
}

export default LogIn;
