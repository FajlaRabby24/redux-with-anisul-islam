import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../services/productApi";
import ProductUpdateOrCreate from "./ProductUpdateOrCreate";

const ProductView = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [isEditProduct, setIsEditProduct] = useState(null);
  const [isAddProduct, setIsAddProduct] = useState(false);

  const handleDelete = async (product) => {
    console.log(product);
    await deleteProduct(product.id);
  };

  console.log(isEditProduct);
  return (
    <div>
      <h2>Product view</h2>
      <button onClick={() => setIsAddProduct(true)}>Add Produt</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>There was an error!</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {!isLoading && !isError && products.length > 0 ? (
          products.map((product) => (
            <section
              key={product.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "8px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                maxWidth: "200px",
              }}
            >
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "1.25rem",
                  color: "#333",
                }}
              >
                {product.title}
              </h2>
              <p style={{ margin: 0, color: "#666" }}>
                Category: {product.category}
              </p>
              <p style={{ margin: 0, color: "#666" }}>Price: {product.price}</p>
              <button onClick={() => setIsEditProduct(product)}>Edit</button>
              <button onClick={() => handleDelete(product)}>Delete</button>
            </section>
          ))
        ) : (
          <h3>No products are there...</h3>
        )}
      </div>
      {/* Modal */}
      {isAddProduct && (
        <ProductUpdateOrCreate setIsAddProduct={setIsAddProduct} />
      )}
      {isEditProduct && (
        <ProductUpdateOrCreate
          isEditProduct={isEditProduct}
          setIsEditProduct={setIsEditProduct}
        />
      )}
    </div>
  );
};

export default ProductView;
