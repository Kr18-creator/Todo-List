import React, { useState, useEffect } from "react";
// import { Button } from '@mui/material';
import "./App.css";
import Todo from "./component/Todo";
import db from "./firebase";
import firebase from "firebase/compat/app";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, Input } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.... fires when app.js loads
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        ); //this allows us to read from the db
      });
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); //will stop the refresh
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setTodos([...todos, input]);//clearup the input after hitting submit
    setInput("");
  };

  return (
    <div className="App">
      <h1>Todos List</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          variant="contained"
          disabled={!input}
          type="submit"
          onClick={addTodo}
        >
          {" "}
          ADD TODO
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
