import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoAsync,
  toggleCompleteAsync,
  updateModal,
} from "../redux/todoSlice";

const TodoItem = ({ id, title, completed, endDate }) => {
  const state = useSelector((state) => state);

  console.log(state);
  console.log(state.todos.todos[1].endDate);
  const dispatch = useDispatch();
  const handleComplete = () => {
    console.log(completed);
    dispatch(
      toggleCompleteAsync({
        id: id,
        completed: !completed,
      })
    );
  };

  const handleModal = () => {
    dispatch(
      updateModal({
        isModalOpen: true,
        id,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteTodoAsync({
        id: id,
      })
    );
  };
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            type="checkbox"
            className="mr-3"
            checked={completed}
            onChange={handleComplete}
          ></input>
          {title}
        </span>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-danger" onClick={handleModal}>
          update
        </button>
        <label>{endDate}</label>
      </div>
    </li>
  );
};

export default TodoItem;
