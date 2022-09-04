import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import { formatDistance } from "date-fns";

export default function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);

  function handleClick() {
    dispatch({
      type: "COMPLETED_TODO",
      payload: { id: todo.id, isCompleted: !todo.isCompleted },
    });
  }

  return (
    <li
      className={`todo-item${todo.isCompleted ? " checked" : ""}`}
      onClick={handleClick}
      key={todo.id}
    >
      <div className="todo-content">
        <p>{todo.name}</p>
        <div className="updatedAt">
          {formatDistance(new Date(todo.date), new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>
      <button
        className="remove"
        onClick={() =>
          dispatch({
            type: "REMOVE_TODO",
            payload: { id: todo.id },
          })
        }
      >
        X
      </button>
    </li>
  );
}
