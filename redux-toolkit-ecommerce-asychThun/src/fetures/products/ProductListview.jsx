import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts, updateProduct } from "./productSlice";

const ProductListview = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { products, isLoading, error } = useSelector(
    (state) => state.productsR
  );
  const dispatch = useDispatch();
  const [updateProductS, setUpdateProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // onsubmit
  const onSubmit = (data) => {
    dispatch(updateProduct({ ...data, id: updateProductS.id }));
    setUpdateProduct(null);
  };

  const handleCancel = () => {
    setUpdateProduct(null);
    reset();
  };

  // handle edit
  const handleEdit = (product) => {
    setUpdateProduct(product);
  };
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {!isLoading && !error && products.length > 0 ? (
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
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => dispatch(deleteProduct(product.id))}>
                Delete
              </button>
            </section>
          ))
        ) : (
          <h3>No products are there...</h3>
        )}
      </div>

      {/* Modal */}
      {updateProductS && (
        <dialog open className="modal modal-middle">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="modal-box space-y-4"
          >
            <h2 className="text-xl font-bold mb-4">Add a Book</h2>

            <div className="mb-3">
              <label className="block font-medium">Title</label>
              <input
                type="text"
                defaultValue={updateProductS?.title}
                {...register("title", { required: "Title is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block font-medium">Description</label>
              <input
                type="text"
                defaultValue={updateProductS?.description}
                {...register("description", { required: "Author is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block font-medium">Price</label>
              <input
                type="number"
                step="0.01"
                defaultValue={updateProductS?.price}
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="mb-3">
              <label className="block font-medium">category</label>
              <input
                defaultValue={updateProductS?.category}
                type="text"
                {...register("category", {
                  required: "Quantity is required",
                  min: 1,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="btn btn-warning ml-3"
            >
              Cancel
            </button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default ProductListview;
