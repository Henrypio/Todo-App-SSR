import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../redux/axiosInstance";

const ViewTodoPage = () => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`/todos/${id}`);
        setTodo(response.data);
      } catch (error) {
        setError("Todo not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTodo();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">View Todo</h1>
      <div className="border p-4">
        <h2 className="text-xl font-bold">{todo.title}</h2>
        <p>{todo.completed ? "Completed" : "Not Completed"}</p>
      </div>
      <button className="bg-blue-500 mt-4 text-white p-2 rounded">
        <a href={`/todos`}>Back</a>
      </button>
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const { id } = params;
  try {
    const response = await axiosInstance.get(`/todos/${id}`);
    return { props: { todo: response.data } };
  } catch (error) {
    return { props: { todo: null } };
  }
}

export default ViewTodoPage;
