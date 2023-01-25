import React from 'react'
import ProcessedItem from './ProcessedItem'
import style from "./ProcessedList.css"


function ProcessedList(props) {

  return (
    <ul className={style.processedList}>
      {props.data.map((item) => (
        <ProcessedItem
          key={Math.random().toString()}
          title={item.title}
          description={item.description}
          deleteHandle={props.processDeleteHandle}
        />
      ))}
    </ul>
  );
}

export default ProcessedList