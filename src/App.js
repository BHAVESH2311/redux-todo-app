import React from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";
import UpdateTodoForm from "./components/UpdateTodoForm";

const App = () => {
  const state = useSelector((state) => state);
  console.log(state);
  return (
    <div className="container bg-white p-4 mt-5">
      <h1>My Todo List</h1>
      <AddTodoForm />
      <UpdateTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default App;
