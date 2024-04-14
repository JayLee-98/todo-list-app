import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link';
import FacebookIcon from '@mui/icons-material/GitHub';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, setDoc, doc, deleteDoc, getDocs, query, orderBy, where, } from "firebase/firestore";
import { GoogleAuthProvider, getAuth, signInWithRedirect, onAuthStateChanged, signOut, } from 'firebase/auth';
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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const TodoItemInputField = (props) => {

  const [input, setInput] = useState("");
  const onSubmit = () => {
    props.onSubmit(input);
    setInput("");
  };

  return (
    <div>
      <Box sx={{ margin: "auto" }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          <TextField
            id="todo-item-input"
            label="Todo List를 입력해주세요."
            variant="standard"
            onChange={(e) => setInput(e.target.value)} value={input}
          />
          <Button variant="outlined" onClick={onSubmit}>등록</Button>
        </Stack>
      </Box>
    </div>
  );
};

const TodoItem = (props) => {

  const style = props.todoItem.isFinished ? { textDecoration: 'line-through' } : {};

  return (
    <ListItem secondaryAction={
      <IconButton edge="end" aria-label='comments' onClick={() => props.onRemoveClick(props.todoItem)}>
        <DeleteIcon />
      </IconButton>
    }>
      <ListItemButton role={undefined} onClick={() => props.onTodoItemClick(props.todoItem)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={props.todoItem.isFinished}
            disabledRipple
          />
        </ListItemIcon>
        <ListItemText style={style} primary={props.todoItem.todoItemContent} />
      </ListItemButton>
    </ListItem>
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
    <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
      <List sx={{ margin: "auto", maxWidth: 720 }}>
        {todoList}
      </List>
    </Box>
  );
};

const TodoListHeader = (props) => {

  const loginWithGoogleButton = (
    <Button
      color='inherit'
      onClick={() => { signInWithRedirect(auth, provider); }}
    >
      구글 아이디로 로그인하기
    </Button>
  );
  const logoutButton = (
    <Button
      color='inherit'
      onClick={() => { signOut(auth); }}
    >
      로그아웃
    </Button>
  );

  const button = props.currentUser === null ? loginWithGoogleButton : logoutButton;

  return (
    <AppBar position='static'>
      <Toolbar sx={{ width: "100%", maxWidth: 720, margin: "auto" }}>
        <Typography variant='h6' component="div">
          Jay's Todo List App
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {button}
      </Toolbar>
    </AppBar>
  );
}

const TodoListFooter = (props) => {

  const Copyright = () => {
    return (
      <Typography variant="body2" color="text.secondary" mt={1}>
        {'Copyright © '}
        <Link href="">Jay Lee&nbsp;</Link>
        {new Date().getFullYear()}
      </Typography>
    );
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: { xs: '100%', sm: '60%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
            <div>
              <Link color="text.secondary" href="#">
                Privacy Policy
              </Link>
              <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
              </Typography>
              <Link color="text.secondary" href="#">
                Terms of Service
              </Link>
              <Copyright />
            </div>
            <Stack
              direction="row"
              justifyContent="left"
              spacing={1}
              useFlexGap
              sx={{
                color: 'text.secondary',
              }}
            >
              <IconButton
                color="inherit"
                href="https://github.com/JayLee-98"
                aria-label="GitHub"
                sx={{ alignSelf: 'center' }}
              >
                <FacebookIcon />
              </IconButton>
            </Stack>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Blog
          </Typography>
          <Link color="text.secondary" href="#">
            Coming soon
          </Link>
          <Link color="text.secondary" href="#">
            Instagram
          </Link>
          <Link color="text.secondary" href="#">
            Youtube
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Encyclopedia
          </Typography>
          <Link color="text.secondary" href="#">
            About me
          </Link>
          <Link color="text.secondary" href="#">
            Recent KDA
          </Link>
          <Link color="text.secondary" href="#">
            Workout routines
          </Link>
          <Link color="text.secondary" href="#">
            Daily rates on how I feel
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Illaoi
          </Typography>
          <Link color="text.secondary" href="#">
            Nagakabouros
          </Link>
          <Link color="text.secondary" href="#">
            Project L
          </Link>
        </Box>
      </Box>
    </Container>
  );

}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [todoItemList, setTodoItemList] = useState([]);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user.uid);
    } else {
      setCurrentUser(null);
    }
  });

  const syncTodoItemListStateWithFirestore = () => {
    const q = query(collection(db, "todoItem"), where("userId", "==", currentUser), orderBy("createdTime", "desc"));

    getDocs(q).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          todoItemContent: doc.data().todoItemContent,
          isFinished: doc.data().isFinished,
          createdTime: doc.data().createdTime ?? 0,
          userId: doc.data().userId,
        });
      });
      setTodoItemList(firestoreTodoItemList);
    });
  };

  useEffect(() => {
    syncTodoItemListStateWithFirestore();
  }, [currentUser]);

  const onSubmit = async (newTodoItem) => {

    await addDoc(collection(db, "todoItem"), {
      todoItemContent: newTodoItem,
      isFinished: false,
      createdTime: Math.floor(Date.now() / 1000),
      userId: currentUser,
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
      <TodoListHeader currentUser={currentUser} />
      <Container sx={{ paddingTop: 3 }}>
        <TodoItemInputField onSubmit={onSubmit} />
        <TodoItemList
          todoItemList={todoItemList}
          onTodoItemClick={onTodoItemClick}
          onRemoveClick={onRemoveClick}
        />
      </Container>
      <TodoListFooter />
    </div>
  );
}

export default App;
