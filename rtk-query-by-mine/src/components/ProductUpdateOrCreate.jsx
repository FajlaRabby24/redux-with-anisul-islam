import { useForm } from "react-hook-form";
import {
  useCreateProductsMutation,
  useUpdateProductsMutation,
} from "../services/productApi";

const ProductUpdateOrCreate = ({
  isEditProduct,
  setIsEditProduct,
  setIsAddProduct,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [updateProduct] = useUpdateProductsMutation();
  const [createProduct] = useCreateProductsMutation();

  // onSubmit
  const onSubmit = (data) => {
    if (isEditProduct) {
      const updateProductInfo = {
        id: isEditProduct.id,
        updatedProducts: {
          title: data.title,
          price: data.price,
          category: data.category,
        },
      };
      updateProduct(updateProductInfo);
      setIsEditProduct(null);
    } else {
      createProduct(data);
      setIsAddProduct(false);
    }
    reset();
  };

  const handleCancel = () => {
    isEditProduct ? setIsEditProduct(null) : setIsAddProduct(false);
  };

  return (
    <dialog open className="modal modal-middle">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box space-y-4">
        <h2 className="text-xl font-bold mb-4">Add a Book</h2>

        <div className="mb-3">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            defaultValue={isEditProduct?.title || ""}
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            defaultValue={isEditProduct?.price || ""}
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
            defaultValue={isEditProduct?.category || ""}
            type="text"
            {...register("category", {
              required: "Quantity is required",
              min: 1,
            })}
            className="w-full p-2 border rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.quantity.message}</p>
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
  );
};

export default ProductUpdateOrCreate;
