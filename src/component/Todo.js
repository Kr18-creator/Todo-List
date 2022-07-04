import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import db from "../firebase";
import "./Todo.css";

const useStyles = makeStyles({
  position: "absolute",
  borderRadius: 3,
  color: "white",
  height: 48,
  padding: "0 30px",
});

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button className="updateBtn" onClick={updateTodo}>
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary="deadline" />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
