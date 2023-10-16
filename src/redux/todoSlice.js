import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodoAsync",
  async () => {
    const res = await fetch("http://localhost:7000/todos");
    if (res.ok) {
      const todos = await res.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const res = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title, endDate: payload.endDate }),
    });

    if (res.ok) {
      const todo = await res.json();
      console.log({ todo });
      return { todo };
    }
  }
);

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleCompleteAsync",
  async (payload) => {
    const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });
    if (res.ok) {
      const todo = await res.json();
      return { todo };
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",

  async (payload) => {
    const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      return { id: payload.id };
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodoAsync",
  async (payload) => {
    console.log(payload);
    const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title, endDate: payload.endDate }),
    });
    if (res.ok) {
      return payload;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    modal: {
      isModalOpen: false,
      id: null,
    },
  },
  reducers: {
    updateModal: (state, action) => {
      state.modal = action.payload;
      return state;
    },
  },

  extraReducers: {
    [getTodosAsync.fulfilled]: (state, action) => {
      return { ...state, todos: action.payload.todos };
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      return { ...state, todos: [...state.todos, action.payload.todo] };
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.todo.id
      );
      state.todos[index].completed = action.payload.todo.completed;
    },

    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log(action, state);
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    },

    [updateTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.todos[index].title = action.payload.title;
      state.todos[index].endDate = action.payload.endDate;
      state.modal.isModalOpen = false;
    },
  },
});

export const { updateModal } = todoSlice.actions;

export default todoSlice.reducer;
