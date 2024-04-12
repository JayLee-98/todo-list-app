import './App.css';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const TodoItemInputField = (props) => {
  const [input, setInput] = useState("");

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
      <Button variant="outlined">Submit</Button>

    </Box>



  </div>);
};


function App() {
  return (
    <div className="App">
      <TodoItemInputField />
    </div>
  );
}

export default App;
