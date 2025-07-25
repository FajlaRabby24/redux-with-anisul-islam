import { useDispatch, useSelector } from "react-redux";
import {
  decreament,
  increament,
  increaseByAmount,
  reset,
} from "./couterSliece";

const CounterView = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Counter {count}</h1>
      <button onClick={() => dispatch(increament())}>Increment</button>
      <button disabled={!count} onClick={() => dispatch(decreament())}>
        Decrement
      </button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <button onClick={() => dispatch(increaseByAmount(5))}>
        Increase By 5
      </button>
    </div>
  );
};

export default CounterView;
