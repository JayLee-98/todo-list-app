import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDocs, query, orderBy } from "firebase/firestore";
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
const db = getFirestore(app);

const TodoListHeader = (props) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component="div" sx={{ flexGrow: 1 }}>
          Jay's Todo List App
        </Typography>
        <Button color='inherit'>로그인</Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [todoItemList, setTodoItemList] = useState([]);

  const syncTodoItemListStateWithFirestore = () => {
    const q = query(collection(db, "todoItem"), orderBy("createdTime", "desc"));

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0,
        });
      });
      setTodoItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncTodoItemListStateWithFirestore();
  }, []);

  const onSubmit = async (newTodoItem) => {

    await addDoc(collection(db, "todoItem"), {
      todoItemContent: newTodoItem,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
    });

    syncTodoItemListStateWithFirestore();
  };

  const onTodoItemClick = async (clickedTodoItem) => {

    const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
    await setDoc(todoItemRef, { isFinished: !clickedTodoItem.isFinished }, { merge: true });

    syncTodoItemListStateWithFirestore();
  };

  const onRemoveClick = async (removedTodoItem) => {

    const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
    await deleteDoc(todoItemRef);

    syncTodoItemListStateWithFirestore();
  };

  return (
    <div className="App">
      <TodoListHeader />
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
