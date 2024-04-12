import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4T2sFXxYpUepLfby7_0__svccOt_57SM",
  authDomain: "todo-list-app-c9c51.firebaseapp.com",
  projectId: "todo-list-app-c9c51",
  storageBucket: "todo-list-app-c9c51.appspot.com",
  messagingSenderId: "77571397844",
  appId: "1:77571397844:web:580110d48c2eacf5a4c341",
  measurementId: "G-E5CTCMJYR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const TodoItemInputField = (props) => {

  const [input, setInput] = useState("");
  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="todo-item-input"
          label="Todo List를 입력해주세요."
          variant="standard"
          onChange={(e) => setInput(e.target.value)} value={input}
        />
        <Button variant="outlined" onClick={onSubmit}>Submit</Button>
      </Box>
    </div>
  );
};

const TodoItem = (props) => {

  const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};

  return (
    <li>
      <span
        style={style}
        onClick={() => props.onTodoItemClick(props.todoItem)}
      >
        {props.todoItem.todoItemContent}
      </span>
      <Button variant="text" onClick={() => props.onRemoveClick(props.todoItem)}>삭제</Button>
    </li>
  );
};

const TodoItemList = (props) => {

  const todoList = props.todoItemList.map((todoItem, index) => {
    return <TodoItem
      key={index}
      todoItem={todoItem}
      onTodoItemClick={props.onTodoItemClick}
      onRemoveClick={props.onRemoveClick}
    />
  });

  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};

let todoItemId = 0;

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const onSubmit = (newTodoItem) => {
    setTodoItemList([...todoItemList, {
      id: todoItemId++,
      todoItemContent: newTodoItem,
      isFinished: false,
    }]);
  };

  const onTodoItemClick = (clickedTodoItem) => {
    setTodoItemList(todoItemList.map((todoItem) => {
      if (clickedTodoItem.id === todoItem.id) {
        return {
          id: clickedTodoItem.id,
          todoItemContent: clickedTodoItem.todoItemContent,
          isFinished: !clickedTodoItem.isFinished,
        };
      } else {
        return todoItem;
      }
    }));
  };

  const onRemoveClick = (removedTodoItem) => {
    setTodoItemList(todoItemList.filter((todoItem) => {
      return todoItem.id !== removedTodoItem.id;
    }));
  };

  return (
    <div className="App">
      <TodoItemInputField onSubmit={onSubmit} />
      <TodoItemList
        todoItemList={todoItemList}
        onTodoItemClick={onTodoItemClick}
        onRemoveClick={onRemoveClick}
      />
    </div>
  );
}

export default App;
