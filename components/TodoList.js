import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "../redux/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      {list.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
