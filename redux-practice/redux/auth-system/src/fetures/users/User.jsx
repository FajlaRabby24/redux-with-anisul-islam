import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import UpdateProfileForm from "./UpdateProfileForm";
import { signOutUser } from "./userSlice";

const User = () => {
  const { loading, error, user } = useSelector((state) => state.authR);
  console.log({ loading, error, user });
  const [isUpdateProfile, setIsUpdateProfile] = useState(null);
  const dispatch = useDispatch();
  console.log(user?.photoURL);
  return (
    <div className="bg-gradient-to-br from-secondary to-primary">
      <h1 className="text-4xl font-semibold text-center">User</h1>
      <div className="flex   min-h-screen justify-center items-center gap-10">
        {loading && <p className="text-5xl font-semibold ">Loading....</p>}
        {error && <p className="text-3xl font-semibold ">Error: {error}</p>}
        {!loading && !error && !user && (
          <>
            <RegisterForm />
            <LoginForm />
          </>
        )}
        {!loading && !error && user && (
          <div>
            <img
              className="w-12 h-12  object-cover rounded-full"
              src={user?.photoURL}
              alt="PHOTO"
            />
            <h3>Name: {user?.displayName}</h3>
            <p>Email: {user?.email}</p>
            <button
              onClick={() => dispatch(signOutUser())}
              className="btn btn-warning"
            >
              Sign out
            </button>
            <button
              onClick={() => setIsUpdateProfile(user)}
              className="btn btn-success"
            >
              Update Profile
            </button>
            {isUpdateProfile && (
              <UpdateProfileForm
                setIsUpdateProfile={setIsUpdateProfile}
                isUpdateProfile={isUpdateProfile}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
