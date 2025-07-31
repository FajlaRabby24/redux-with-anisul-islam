import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { fetchProducs } from "./productSlice";

const ProductView = () => {
  const { productLoading, productsError, products } = useSelector(
    (state) => state.productsR
  );
  const { cartError, cartLoading, cart } = useSelector((state) => state.cartR);
  console.log({ cart });

  //   console.log(res);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducs());
  }, [dispatch]);

  const onAddToCart = (product) => {
    dispatch(addToCart({ productId: product.id }));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex item-center gap-4 justify-center">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle ">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />{" "}
            </svg>
            <span className="badge badge-sm indicator-item">{cart.length}</span>
          </div>
        </div>
      </div>
      {productLoading && <p className="text-5xl font-semibold ">Loading....</p>}
      {productsError && (
        <p className="text-3xl font-semibold ">Error: {productsError}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length ? (
          products.map((product) => (
            <div key={product.id} className="card bg-base-100 shadow-xl">
              <figure className="px-4 pt-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-52 object-contain"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <div className="flex items-center gap-2 text-yellow-500">
                  <span className="font-semibold">{product.rating.rate}⭐</span>
                  <span className="text-xs text-gray-400">
                    ({product.rating.count} reviews)
                  </span>
                </div>
                <p className="text-base font-bold text-primary">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {product.description}
                </p>

                <div className="card-actions mt-4">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="btn btn-primary w-full"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-4xl font-semibold col-span-3">
            There was no products here right now!
          </h3>
        )}
      </div>
    </div>
  );
};

export default ProductView;
