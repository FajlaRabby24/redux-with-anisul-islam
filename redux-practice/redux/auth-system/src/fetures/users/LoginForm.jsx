import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { googleLogin, signInUser } from "./userSlice";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(signInUser(data));
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  return (
    <div className=" ">
      <div className="w-full max-w-md p-8 bg-base-100 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Your email"
              {...register("email", { required: "Email is required" })}
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              placeholder="Your password"
              {...register("password", { required: "Password is required" })}
              className="input input-bordered w-full"
            />
            {errors.password && (
              <p className="text-error text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-2">
            Login
          </button>
        </form>

        <div className="divider">or</div>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5 mr-2"
            alt="Google"
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
