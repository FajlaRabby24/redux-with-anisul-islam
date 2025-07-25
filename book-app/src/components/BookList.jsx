import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, updateBookSlice } from "../fetures/bookSlice";

const BookList = () => {
  const books = useSelector((state) => state.booksR.books);
  const [updateBook, setUpdateBook] = useState(null);
  const dispatch = useDispatch();

  // handle Delete
  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  // handle edit
  const handleEdit = (book) => {
    setUpdateBook(book);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    setUpdateBook(null);
    reset();
  };

  const onSubmit = (data) => {
    const updatedBook = { ...data, id: updateBook.id };
    dispatch(updateBookSlice(updatedBook));
    reset();
    setUpdateBook(null);
  };

  return (
    <div className="text-center">
      <h2 className="text-4xl font-semibold">Book List</h2>
      {books && books.length ? (
        <ul className="  space-y-2">
          {books?.map((book) => (
            <li className="list-disc" key={book.id}>
              {book.title} by {book.author} - ${book.price} - {book.quantity}{" "}
              pcs{" "}
              <button
                onClick={() => handleEdit(book)}
                className="btn btn-error"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="btn btn-error"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-2xl font-semibold mt-2">No books are there!</h3>
      )}

      {/* Modal */}
      {updateBook && (
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
                defaultValue={updateBook?.title}
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
                defaultValue={updateBook?.author}
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
                defaultValue={updateBook?.price}
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
              <label className="block font-medium">Quantity</label>
              <input
                defaultValue={updateBook?.quantity}
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: 1,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.quantity && (
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

export default BookList;
