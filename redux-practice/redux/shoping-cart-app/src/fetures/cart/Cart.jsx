import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQauntity,
  removeFromCart,
} from "./cartSlice";
const BASE_URL = `http://localhost:3003/products`;

const Cart = () => {
  const { cart } = useSelector((state) => state.cartR);
  const dispatch = useDispatch();
  const [userCart, setUserCart] = useState([]);

  const fetchFun = async () => {
    try {
      const responses = await Promise.all(
        cart.map((item) => axios.get(`${BASE_URL}/${item.productId}`))
      );
      console.log({ responses });
      const fullProducts = responses.map((res) => {
        const matchedCartItem = cart.find(
          (item) => item.productId === res.data.id
        );
        return {
          ...res.data,
          quantity: matchedCartItem?.quantity || 1,
        };
      });
      console.log({ fullProducts });
      setUserCart(fullProducts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchFun();
  }, [cart]);

  const total = userCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrease = (itemId) => {
    console.log(itemId);
    dispatch(increaseQauntity(itemId));
  };

  const handleDecrease = (itemId) => {
    console.log(itemId);
    dispatch(decreaseQuantity(itemId));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>

      {userCart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {userCart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-gray-500">৳{item.price}</p>
                  <div className="flex items-center mt-2 gap-3">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-2 py-1 btn btn-success rounded"
                    >
                      −
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-2 py-1 btn btn-success rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="font-medium">৳{item.price * item.quantity}</p>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 text-sm mt-2 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <h3 className="text-xl font-semibold">
              Total: ৳{total.toFixed(2)}
            </h3>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
