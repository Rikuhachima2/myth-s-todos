import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export function TodoContextProvider({ children }) {
  const [state, dispatch] = useReducer(
    TodoReducer,
    {
      isError: false,
      todos: [],
    },
    () => {
      return { todos: JSON.parse(localStorage.getItem("todos")) || [] };
    }
  );
  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function TodoReducer(state, action) {
  switch (action.type) {
    case "SET_TODO":
      return { ...state };

    case "CREATE_TODO":
      const payload = {
        date: new Date(),
        id: Math.round(Math.random() * 10000),
        isCompleted: false,
        name: action.payload,
      };
      localStorage.setItem("todos", JSON.stringify([payload, ...state.todos]));
      return {
        ...state,
        todos: [payload, ...state.todos],
      };

    case "REMOVE_TODO":
      const filtered = state.todos.filter((todo) => {
        return action.payload.id !== todo.id;
      });

      localStorage.setItem("todos", JSON.stringify(filtered));

      return {
        ...state,
        todos: filtered,
      };

    case "COMPLETED_TODO":
      const checkedFiltered = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = action.payload.isCompleted;
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(checkedFiltered));

      return {
        ...state,
        todo: checkedFiltered,
      };
    default:
      return state;
  }
}
