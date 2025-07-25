import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addBook } from "../fetures/bookSlice";

const BookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispacth = useDispatch();

  const onSubmit = (data) => {
    const newBook = { ...data, id: nanoid() };
    dispacth(addBook(newBook));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-4 rounded"
    >
      <h2 className="text-xl font-bold mb-4">Add a Book</h2>

      <div className="mb-3">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Author</label>
        <input
          type="text"
          {...register("author", { required: "Author is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.author && (
          <p className="text-red-500 text-sm">{errors.author.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", { required: "Price is required", min: 0 })}
          className="w-full p-2 border rounded"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block font-medium">Quantity</label>
        <input
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
            min: 1,
          })}
          className="w-full p-2 border rounded"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">{errors.quantity.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default BookForm;
