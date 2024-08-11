import { todos } from "../../../data/todos";

export default function handler(req, res) {
  const { id } = req.query;
  const todoId = parseInt(id);

  if (req.method === "GET") {
    // Handle GET request for a single todo
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } else if (req.method === "PUT") {
    // Handle PUT request to update a todo
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...req.body };
      res.status(200).json(todos[index]);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request to remove a todo
    const index = todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      todos.splice(index, 1);
      res.status(204).end(); // No content
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
