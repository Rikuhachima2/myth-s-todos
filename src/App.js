import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import { TodoContext } from "./context/TodoContext";

function App() {
  const { todos, dispatch } = useContext(TodoContext);

  useEffect(
    function () {
      dispatch({ type: "SET_TODO" });
    },
    [todos, dispatch]
  );

  return (
    <div className="App">
      <Header />
      <div className="main">
        <div className="section todo-container w-60">
          <h2>My List</h2>
          <div className="todo-list">
            {todos &&
              todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id} />;
              })}

            {todos.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "40px",
                  opacity: ".8",
                }}
              >
                <h1>kosong</h1>
                <p>tambahkan List..</p>
              </div>
            )}
          </div>
        </div>
        <TodoForm />
      </div>
    </div>
  );
}

export default App;

function TodoForm() {
  const { dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    dispatch({ type: "CREATE_TODO", payload: todo });
    setTodo("");
  }

  return (
    <div className="section todo-form w-40">
      <h2>Write Something..!</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="form-control"
          placeholder="I will Do.."
          maxLength="40"
          required={true}
          minLength={5}
        />
        <input type="submit" className="btn btn-submit" value="Create List" />
      </form>
    </div>
  );
}
