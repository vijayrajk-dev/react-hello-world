import React from "react";
import "./styles.css";

export default function App() {
  const [todos, setToDos] = React.useState([
    { id: 1, text: "Code", done: false },
    { id: 2, text: "Eat", done: false },
    { id: 3, text: "Sleep", done: false }
  ]);
  return (
    <div className="App">
      <h1> Todo List </h1>
      <div className="ToDoList">
        <ToDoList setToDos={setToDos} todos={todos} />
        <AddToDo setToDos={setToDos} />
      </div>
    </div>
  );
}

function ToDoList({ todos, setToDos }) {
  function handleToggleTodo(todo) {
    const updateToDos = todos.map(t => 
        t.id === todo.id
        ? { ...t, done: !t.done }
        : t );
    setToDos(updateToDos)
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{ textDecoration: todo.done ? 'line-through' : '' }}
          key={todo.id}
        >
          {todo.text}
          <DeleteToDo setToDos={setToDos} todo={todo} />
        </li>
      ))}
    </ul>
  );
}

function AddToDo({ setToDos }) {
  const inputRef = React.useRef();

  function handleAddToDo(event) {
    event.preventDefault();
    console.log(event.target.elements.addToDo.value);
    const text = event.target.elements.addToDo.value;
    const todo = { id: Math.random(), text, done: false };
    setToDos((prevTodo) => {
      return prevTodo.concat(todo);
    })
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddToDo}>
      <input name="addToDo" placeholder="Add ToDo" ref={inputRef} />
      <button type="submit"> Submit </button>
    </form>
  );
}

function DeleteToDo({todo, setToDos}) {
  function handleDeleteToDo(){
    const confirmed = window.confirm("Do you want to Delete this?");
    if(confirmed){
      setToDos(prevTodo => {
        return prevTodo.filter((t) => t.id !== todo.id);
      });
    }
  }

  return(
    <span 
      onClick={handleDeleteToDo}
      role="button" style={{
      color: 'red',
      fontWeight: 'bold',
      marginLeft: 5,
    }}> X </span>
  )
}
