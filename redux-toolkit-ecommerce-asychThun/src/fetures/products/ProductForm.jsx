import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { craeteProduct } from "./productSlice";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const submitHandler = (data) => {
    console.log(data);
    dispatch(craeteProduct({ ...data, id: nanoid() }));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <label>Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <small style={{ color: "red" }}>{errors.title.message}</small>
        )}
      </div>

      <div>
        <label>Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
        ></textarea>
        {errors.description && (
          <small style={{ color: "red" }}>{errors.description.message}</small>
        )}
      </div>

      <div>
        <label>Category</label>
        <input
          type="text"
          {...register("category", { required: "Category is required" })}
        />
        {errors.category && (
          <small style={{ color: "red" }}>{errors.category.message}</small>
        )}
      </div>

      <div>
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be positive" },
          })}
        />
        {errors.price && (
          <small style={{ color: "red" }}>{errors.price.message}</small>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductForm;
