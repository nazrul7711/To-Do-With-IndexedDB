import React from "react";
import style from "./TodoList.module.css";
import ToDoItems from "./ToDoItems";
import { useState, useEffect } from "react";
import ProcessedList from "./ProcessedList";

function TodoList() {
  useEffect(() => {
    let db;

    let openRequest = indexedDB.open("dbFour", 3);

    openRequest.onupgradeneeded = function () {
      db = openRequest.result;
      let objStore = db.createObjectStore("objThree", { keyPath: "task" });

      objStore.createIndex("finished", "finished", { unique: false });
    };
    openRequest.onerror = function () {
      db = openRequest.result;
      console.log("some thing went wrong");
    };

    openRequest.onsuccess = function () {
      db = openRequest.result;

      let transaction = db.transaction("objThree", "readwrite");
      let objStore = transaction.objectStore("objThree");

      let allRecords = objStore.getAll();
      allRecords.onsuccess = function () {
        let res = allRecords.result;

        let newRes = res
          .filter((a) => a["finished"] === "WIP")
          .map((item) => ({
            title: item.task.split(" ")[0],
            description: item.task.split(" ")[1],
          }));

        setTodoList(newRes);
        let newProcRes = res
          .filter((a) => a["finished"] === "done")
          .map((item) => ({
            title: item.task.split(" ")[0],
            description: item.task.split(" ")[1],
          }));
        setProcessedArray(newProcRes);
      };
    };
  }, []);

  let [todoList, setTodoList] = useState([]);
  let [enteredTitle, setEnteredTitle] = useState("");
  let [enteredDescription, setEnteredDescription] = useState("");
  let [processedArray, setProcessedArray] = useState([]);

  function enteredTitleHandler(e) {
    setEnteredTitle(e.target.value);
  }

  function enteredDescriptionHandler(e) {
    setEnteredDescription(e.target.value);
  }

  function addHandler() {
    let a = {
      task: `${enteredTitle} ${enteredDescription}`,
      finished: "WIP",
    };

    let openRequest = indexedDB.open("dbFour", 3);
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      let transaction = db.transaction("objThree", "readwrite");
      const dt = transaction.objectStore("objThree");
      const insertData = dt.add(a);
      insertData.onsuccess = function () {
        alert("User Added");
        let allRecords = dt.getAll();
        allRecords.onsuccess = function () {
          let res = allRecords.result;
          let newRes = res
            .filter((a) => a["finished"] === "WIP")
            .map((item) => ({
              title: item.task.split(" ")[0],
              description: item.task.split(" ")[1],
            }));
          setTodoList(newRes);
        };
      };
    };
  }

  function cancelHandler(e) {
    window.close();
  }

  function deleteHandler(txt) {
    let openRequest = indexedDB.open("dbFour", 3);
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      let transaction = db.transaction("objThree", "readwrite");
      const dt = transaction.objectStore("objThree");
      const deletedData = dt.delete(txt);

      deletedData.onsuccess = () => {
        alert("item got deleted");
      };
      let allRecords = dt.getAll();

      allRecords.onsuccess = function () {
        let res = allRecords.result;
        let newRes = res.map((item) => ({
          title: item.task.split(" ")[0],
          description: item.task.split(" ")[1],
        }));
        setTodoList(newRes);
      };
    };
  }

  function editHandler(txt) {
    let openRequest = indexedDB.open("dbFour", 3);
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      let transaction = db.transaction("objThree", "readwrite");
      const dt = transaction.objectStore("objThree");
      const gottenData = dt.get(txt);

      gottenData.onsuccess = () => {
        let obj = gottenData.result;
        obj.finished = "done";
        let modifyReq = dt.put(obj);
        modifyReq.onsuccess = () => {
          console.log("data modified");
          let allRecords = dt.getAll();
          allRecords.onsuccess = function () {
            let res = allRecords.result;

            let newRes = res
              .filter((a) => a["finished"] === "done")
              .map((item) => ({
                title: item.task.split(" ")[0],
                description: item.task.split(" ")[1],
              }));

            setProcessedArray(newRes);
            let newList = res
              .filter((a) => a["finished"] === "WIP")
              .map((item) => ({
                title: item.task.split(" ")[0],
                description: item.task.split(" ")[1],
              }));
            setTodoList(newList);
          };
        };
      };
    };
  }

  function processDeleteHandler(txt) {
    let openRequest = indexedDB.open("dbFour", 3);
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      let transaction = db.transaction("objThree", "readwrite");
      const dt = transaction.objectStore("objThree");
      const deletedData = dt.delete(txt);

      deletedData.onsuccess = () => {
        alert("processed item got deleted");
      };
      let allRecords = dt.getAll();

      allRecords.onsuccess = function () {
        let res = allRecords.result;

        let newRes = res
          .filter((a) => a["finished"] === "done")
          .map((item) => ({
            title: item.task.split(" ")[0],
            description: item.task.split(" ")[1],
          }));

        setProcessedArray(newRes);
      };
    };
  }

  return (
    <div className={style.todoList}>
      <div className={style.first}>
        <input
          type="text"
          value={enteredTitle}
          onChange={enteredTitleHandler}
        />
        <input
          type="text"
          value={enteredDescription}
          onChange={enteredDescriptionHandler}
        />
        <button className={style.addBtn} onClick={addHandler}>
          Add
        </button>
        <button className={style.deleteBtn} onClick={cancelHandler}>
          Cancel
        </button>
      </div>
      <ToDoItems
        todoList={todoList}
        deleteHandle={deleteHandler}
        editHandle={editHandler}
      />
      <ProcessedList
        data={processedArray}
        processDeleteHandle={processDeleteHandler}
      />
    </div>
  );
}

export default TodoList;
