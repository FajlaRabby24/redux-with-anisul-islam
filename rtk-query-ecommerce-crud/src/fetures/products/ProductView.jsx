import { useGetProductsQuery } from "../../services/productApi";

const ProductView = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <div>
      <h2>Product view</h2>
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
              <p style={{ margin: 0, color: "#666" }}>{product.description}</p>
              <p style={{ margin: 0, color: "#666" }}>
                Category: {product.category}
              </p>
              <p style={{ margin: 0, color: "#666" }}>Price: {product.price}</p>
              <button>Edit</button>
              <button>Delete</button>
            </section>
          ))
        ) : (
          <h3>No products are there...</h3>
        )}
      </div>
    </div>
  );
};

export default ProductView;
