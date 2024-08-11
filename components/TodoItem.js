import { useDispatch } from "react-redux";
import { deleteTodo } from "../redux/todoSlice";
import { useRouter } from "next/router";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    router.push(`/todos/edit/${todo.id}`);
  };

  return (
    <div className="border p-4 mb-2 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{todo.title}</h2>
        <p>{todo.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <div className="flex space-x-2">
        <a
          href={`/todos/${todo.id}`}
          className="bg-gray-500 text-white p-2 rounded"
        >
          View
        </a>
        <button
          onClick={handleEdit}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
