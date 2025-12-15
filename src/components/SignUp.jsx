import { useForm } from "react-hook-form";

function SignUp({switchToLogin}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const OnSubmit = async(data) => {
    try {
      const payload = { name: data.name, password: data.password };
      const res = await fetch("https://fresco-backend-gray.vercel.app/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log(result);
      if (result) {
        alert(result.message); // Login successful
        console.log(result.user);
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
          <p style={{ margin: "0", fontSize: "14px" }}>
            {errors.name.message}
          </p>
        )}
        <input
          placeholder="Enter Password"
          {...register("password", { 
            required: "Password is required",})}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          placeholder="Enter Confirm Password"
          {...register("confirmPassword", {
            required: "Enter confirm password",
            validate: (value) => value === watch("password") || "Passwords do not match"
          })}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <button type="submit" style={{ marginTop: "1rem" }}>
          submit
        </button>
      </form>
    </>
  );
}
export default SignUp;
