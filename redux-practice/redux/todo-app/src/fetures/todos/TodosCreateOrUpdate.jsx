import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createTodos, updateTodos } from "./todosSlice";

const TodosCreateOrUpdate = ({
  updatedTodo,
  setUpdatedTodo,
  setIsCreateTodo,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  // onSubmit
  const onSubmit = (data) => {
    if (updatedTodo) {
      const id = updatedTodo.id;
      const updatedTodoInfo = { id, ...data };
      dispatch(updateTodos({ id, updatedTodoInfo }));
      setUpdatedTodo(null);
    } else {
      console.log(data);
      setIsCreateTodo(false);
      dispatch(createTodos(data));
    }
    reset();
  };

  const handleCancel = () => {
    updatedTodo ? setUpdatedTodo(null) : setIsCreateTodo(false);
  };
  return (
    <dialog open className="modal modal-middle">
      <form onSubmit={handleSubmit(onSubmit)} className="modal-box space-y-4">
        <h2 className="text-xl font-bold mb-4">Add a Book</h2>

        <div className="mb-3">
          <label className="block font-medium">Title</label>
          <input
            type="text"
            defaultValue={updatedTodo?.title || ""}
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block font-medium">Price</label>
          <textarea
            type="text"
            defaultValue={updatedTodo?.description || ""}
            {...register("description", {
              required: "description is required",
              min: 0,
            })}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
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

export default TodosCreateOrUpdate;
