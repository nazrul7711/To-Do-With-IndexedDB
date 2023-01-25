import React from 'react'
import style from "./ProcessedItem.module.css"

function ProcessedItem(props) {
  function deleteHandler(e){
    let txt =
      e.target.parentNode.innerText.split(" ")[0] +
      " " +
      e.target.parentNode.innerText.split(" ")[2].split("\n")[0];
    console.log(txt)
      props.deleteHandle(txt)
  
  }
  return (
    <li className={style.processedItem}>
      <div>
        {props.title} and {props.description}
      </div>
      <button className={style.dltBtn} onClick={deleteHandler}>Delete</button>
    </li>
  );
}

export default ProcessedItem