import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../redux/todoSlice";

const TodoForm = ({ initialTodo, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setCompleted(initialTodo.completed);
    }
  }, [initialTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialTodo) {
      await dispatch(
        updateTodo({
          id: initialTodo.id,
          title,
          completed,
        })
      );
    } else {
      await dispatch(
        addTodo({
          title,
          completed,
        })
      );
    }
    setTitle("");
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Todo title"
        className="border p-2 w-full text-black"
        required
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          Completed
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {initialTodo ? "Update Todo" : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
