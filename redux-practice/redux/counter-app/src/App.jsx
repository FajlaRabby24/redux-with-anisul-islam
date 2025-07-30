import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  decrementDelay,
  incrementDelay,
} from "./fetures/counter/counterDelaySlice";
import { addBy5, reset } from "./fetures/counter/counterSlice";

const App = () => {
  const count = useSelector((state) => state.counterR.count);
  console.log(count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(incrementDelay())}>Inc</button>
      <button disabled={count < 1} onClick={() => dispatch(decrementDelay())}>
        Dec
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(addBy5(5))}>Add by 5</button>
    </div>
  );
};

export default App;
