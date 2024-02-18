import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);

  const inputref = useRef();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const HandelClick = () => {
    let task = inputref.current.value;
    let newItem = { state: false, task };
    setTodos([...todos, newItem]);
    inputref.current.value = "";
  }

  const HandelLi = (index) => {
    const newTodos = [...todos];
    newTodos[index].state = !newTodos[index].state;
    setTodos(newTodos);
  }

  const HandelDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h2>To Do List</h2>
      <ul>
        {todos.map(({ task, state }, index) => (
          <div key={index}>
            <li className={state ? "done" : ""} onClick={() => HandelLi(index)}>{task}</li>
            <span onClick={() => HandelDelete(index)}>❌</span>
          </div>
        ))}
      </ul>
      <input ref={inputref} />
      <button onClick={HandelClick}>Add</button>
    </div>
  );
}

export default App;
