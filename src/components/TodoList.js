import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodosAsync } from "../redux/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    console.log("useEffect running");
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {
        todos.todos && todos.todos.length && todos.todos.map((todo) => (
          <TodoItem
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            endDate={todo.endDate}
          />
        ))}
    </ul>
  );
};

export default TodoList;
