import { Outlet } from "react-router";
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

export default App;
