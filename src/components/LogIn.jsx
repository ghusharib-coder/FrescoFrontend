
import {useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
function LogIn({ switchToLogin }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const OnSubmit = async (data) => {
    try {
      const res = await fetch("https://fresco-backend-gray.vercel.app/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert(result.message); // Login successful
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/ShopingCart");
      } else {
        alert(result.message); // Invalid login
      }

      reset();
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(OnSubmit)} className="SignUp">
        <input
          placeholder="Enter Name"
          {...register("name", {
            required: "Enter name",
            minLength: { value: 3, message: "Atleast 3 letters required" },
          })}
        />
        {errors.name && (
          <p style={{ margin: "0", fontSize: "14px" }}>{errors.name.message}</p>
        )}
        <input
          placeholder="Enter Password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <button type="submit" style={{ marginTop: "1rem" }}>
          submit
        </button>
      </form>
    </>
  );
}
export default LogIn;
