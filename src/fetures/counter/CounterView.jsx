import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementBy5, reset } from "./counterSlice";

const CounterView = () => {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Couter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button disabled={!count} onClick={() => dispatch(decrement())}>
        Increment
      </button>
      <button onClick={() => dispatch(reset())}>Increment</button>
      <button onClick={() => dispatch(incrementBy5(5))}>incrementBy5</button>
    </div>
  );
};

export default CounterView;
