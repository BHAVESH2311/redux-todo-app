import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodoAsync } from "../redux/todoSlice";

const UpdateTodoForm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todos);
  const [todo, setTodo] = useState({ id: null, title: null, endDate: "" });

  useEffect(() => {
    setTodo(state.todos.filter((todo) => todo.id === state.modal.id)[0]);
  }, [state.modal.isModalOpen]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTodoAsync(todo));
    setTodo({ id: "", title: "", endDate: "" });
  };
  console.log(todo);
  return state.modal.isModalOpen ? (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Update todo..."
        value={todo?.title}
        onChange={(event) => setTodo({ ...todo, title: event.target.value })}
      ></input>
      <button type="submit" className="btn btn-primary mb-2">
        Submit
      </button>
      <input
        type="date"
        className="form-control mb-2 mr-sm-2"
        value={todo?.endDate}
        onChange={(event) => setTodo({ ...todo, endDate: event.target.value })}
      ></input>
    </form>
  ) : (
    ""
  );
};

export default UpdateTodoForm;
