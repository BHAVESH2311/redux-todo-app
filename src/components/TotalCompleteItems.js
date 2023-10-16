import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const completedTodos = useSelector((state) =>
    state.todos.todos.filter((todo) => todo.completed === true)
  );
  return <h4 className="mt-3">Completed Todos : {completedTodos.length}</h4>;
  return <></>;
};

export default TotalCompleteItems;
