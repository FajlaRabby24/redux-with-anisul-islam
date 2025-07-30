import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "./userSlice";

const UpdateProfileForm = ({ setIsUpdateProfile, isUpdateProfile }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const updatedInfo = { displayName: data?.name, photoURL: data?.photoURL };
    console.log(updatedInfo);
    dispatch(updateUserProfile(updatedInfo));
    setIsUpdateProfile(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-base-100 shadow-xl p-6 rounded-xl border border-base-300">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            defaultValue={isUpdateProfile?.displayName || ""}
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="url"
            defaultValue={isUpdateProfile?.photoURL || ""}
            placeholder="https://example.com/image.jpg"
            className="input input-bordered w-full"
            {...register("photoURL", {
              required: "Photo URL is required",
            })}
          />
          {errors.photoURL && (
            <p className="text-red-500 text-sm mt-1">
              {errors.photoURL.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
        <button
          type="button"
          onClick={() => setIsUpdateProfile(false)}
          className="btn btn-warning w-full"
          disabled={isSubmitting}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;
