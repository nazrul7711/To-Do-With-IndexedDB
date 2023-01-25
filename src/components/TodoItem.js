import React from "react";

import style from "./TodoItem.module.css";

function TodoItem(props) {
  function addToProcessedHandler(e) {
    let txt =
      e.target.parentNode.parentNode.innerText.split(" ")[0] +
      " " +
      e.target.parentNode.parentNode.innerText.split(" ")[2].split("\n")[0];
    props.editHandle(txt);
  }
  function editHandler(e) {
    e.target.parentNode.contentEditable = true;
  }
  function deleteHandler(e) {
    let txt =
      e.target.parentNode.innerText.split(" ")[0] +
      " " +
      e.target.parentNode.innerText.split(" ")[2].split("\n")[0];
    props.delteHandle(txt);
  }
  return (
    <li className={style.todoItem}>
      <div>
        {props.title} and {props.description}
      </div>
      <button className={style.some} onClick={addToProcessedHandler}>
        <i className="fa fa-check" aria-hidden="true"></i>
      </button>
      <button className={style.editBtn} onClick={editHandler}>Edit</button>
      <button className={style.dltBtn} onClick={deleteHandler}>Delete</button>
    </li>
  );
}

export default TodoItem;
