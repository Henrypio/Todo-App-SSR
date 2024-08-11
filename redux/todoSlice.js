import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axiosInstance.get("/todos");
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axiosInstance.post("/todos", todo);
  return response.data;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, ...todo }) => {
    const response = await axiosInstance.put(`/todos/${id}`, todo);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axiosInstance.delete(`/todos/${id}`);
  return id;
});

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todosSlice.reducer;
