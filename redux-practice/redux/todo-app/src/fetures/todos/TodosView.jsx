import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodosCreateOrUpdate from "./TodosCreateOrUpdate";
import { deleteTodos, fetchTodos } from "./todosSlice";

const TodosView = () => {
  const { todos, isLoading, error } = useSelector((state) => state.todosR);
  const dispatch = useDispatch();
  const [updatedTodo, setUpdatedTodo] = useState(null);
  const [isCreateTodo, setIsCreateTodo] = useState(false);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <>
      <div className="todo-container">
        <h1 className="todo-heading">Todos</h1>
        <button onClick={() => setIsCreateTodo(true)}>Create new Todos</button>

        {isLoading && <p className="loading-text">Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && todos.length > 0 ? (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-card-horizontal">
                <div className="todo-info">
                  <h3 className="todo-title">{todo.title}</h3>
                  <p className="todo-description">{todo.description}</p>
                </div>
                <div className="todo-actions">
                  <button
                    className="todo-btn"
                    onClick={() => setUpdatedTodo(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="todo-btn delete"
                    onClick={() => dispatch(deleteTodos(todo.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="empty-text">No Todos here!</h3>
        )}
      </div>
      <div>
        {isCreateTodo && (
          <TodosCreateOrUpdate setIsCreateTodo={setIsCreateTodo} />
        )}
        {updatedTodo && (
          <TodosCreateOrUpdate
            updatedTodo={updatedTodo}
            setUpdatedTodo={setUpdatedTodo}
          />
        )}
      </div>
    </>
  );
};

export default TodosView;
