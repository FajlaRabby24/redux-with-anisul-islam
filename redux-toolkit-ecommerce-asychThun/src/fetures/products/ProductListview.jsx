import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "./productSlice";

const ProductListview = () => {
  const { products, isLoading, error } = useSelector(
    (state) => state.productsR
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && products.length > 0 ? (
        products.map((product) => (
          <section
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "16px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h2
              style={{ margin: "0 0 8px", fontSize: "1.25rem", color: "#333" }}
            >
              {product.title}
            </h2>
            <p style={{ margin: 0, color: "#666" }}>{product.description}</p>
            <button onClick={() => dispatch(deleteProduct(product.id))}>
              Delete
            </button>
          </section>
        ))
      ) : (
        <h3>No products are there...</h3>
      )}
    </div>
  );
};

export default ProductListview;
