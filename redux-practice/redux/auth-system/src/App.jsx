import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import User from "./fetures/users/User";
import { monitorAuthState } from "./fetures/users/userSlice";
import { auth } from "./firebase/fireabase.config";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          monitorAuthState({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(monitorAuthState(null));
      }
    });

    return () => unsubscribe(); // ✅ Clean up listener
  }, [dispatch]);

  return (
    <div>
      <User />
    </div>
  );
};

export default App;
