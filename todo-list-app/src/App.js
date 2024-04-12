import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");
  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (<div>
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

  </div>);
};

const TodoItemList = (props) => {

  const todoList = props.todoItemList.map((todoItem, index) => {
    return <li key={index}>{todoItem.todoItemContent}</li>;
  });

  return (
    <div>
      <ul>{todoList}</ul>
    </div>
  );
};


function App() {
  return (
    <div className="App">
      <TodoItemInputField onSubmit={(input) => { console.log(input) }} />
      <TodoItemList todoItemList={[{
        todoItemContent: "오늘 할 일 1"
      }]}/>
    </div>
  );
}

export default App;
