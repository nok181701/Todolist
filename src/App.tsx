import React, { useState } from "react";
import "./App.css";
import { log } from "console";

function App() {
  //①todo各項目の文字列の値、②todo各項目をそれぞれ認識するためのid、③完了or未完了の識別をする識別、が必要。⇨型指定する。
  type Todo = {
    inputvalue: string;
    id: number;
    checked: boolean;
  };

  const [inputvalue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const hundleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //新しいTodoの作成
    const newTodo: Todo = {
      inputvalue: inputvalue,
      id: todos.length,
      checked: false,
    };
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const handleEdit = (id: number, inputvalue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputvalue = inputvalue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handlechecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <h2>Todoリスト with TypeScript</h2>
        <form
          onSubmit={(e) => {
            hundleSubmit(e);
          }}
        >
          <input type="text" onChange={handleChange} className="inputText" />
          <input type="submit" className="submitButton " value="作成" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                value={todo.inputvalue}
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => handlechecked(todo.id, todo.checked)}
              />
              <button onClick={(e) => handleDelete(todo.id)}>消す</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
