import React from "react";
import style from "./ToDoItems.module.css";
import TodoItem from "./TodoItem";

function ToDoItem(props) {
  return (
    <ul className={style.ulList}>
      {props.todoList.map((item) => (
        <TodoItem 
          key={Math.random().toString()}
          title={item.title}
          description={item.description}
          delteHandle={props.deleteHandle}
          editHandle={props.editHandle}
        />
      ))}
    </ul>
  );
}

export default ToDoItem;
