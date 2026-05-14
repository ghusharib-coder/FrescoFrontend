import { useForm } from "react-hook-form";
import { useState } from "react";
import API_BASE_URL from "../config";

function SignUp({switchToLogin}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const OnSubmit = async(data) => {
    setIsLoading(true);
    try {
      const payload = { name: data.name, password: data.password };
      const res = await fetch(`https://fresco-backend-gray.vercel.app/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);
      if (result) {
        alert(result.message);
        console.log(result.user);
        if (switchToLogin) {
          switchToLogin();
        }
      } else {
        alert(result.message);
      }
      reset();
    } catch (err) {
      console.error("Error:", err);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className="auth-form">
      {/* Name Field */}
      <div className="form-group">
        <label htmlFor="signup-name">👤 Create Username</label>
        <input
          id="signup-name"
          placeholder="Choose a username (min 3 chars)"
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
        <label htmlFor="signup-password">🔒 Password</label>
        <div className="password-wrapper">
          <input
            id="signup-password"
            placeholder="Create a strong password"
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

      {/* Confirm Password Field */}
      <div className="form-group">
        <label htmlFor="signup-confirm">✓ Confirm Password</label>
        <div className="password-wrapper">
          <input
            id="signup-confirm"
            placeholder="Re-enter your password"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className={errors.confirmPassword ? "input-error" : ""}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="error-message">❌ {errors.confirmPassword.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className="auth-button"
        disabled={isLoading}
      >
        {isLoading ? "⏳ Creating Account..." : "✨ Create Account"}
      </button>

      <p className="form-note">Your password is encrypted and secure</p>
    </form>
  );
}

export default SignUp;
