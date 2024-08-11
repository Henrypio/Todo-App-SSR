import { todos } from "../../../data/todos";

export default function handler(req, res) {
  if (req.method === "GET") {
    // Handle GET request to fetch all todos
    
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    // Handle POST request to add a new todo
    const newTodo = req.body;
    newTodo.id = todos.length ? Math.max(todos.map((todo) => todo.id)) + 1 : 1; // Simple ID generation
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
