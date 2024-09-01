import React, { useState } from "react";
import TableContext from "./TableContext";

const TableState = (props) => {
  const createEmptyMatrix = (rows, cols) => {
    return Array.from({ length: rows }, () => Array(cols).fill(''));
  };
  
  const [table, setTable] = useState(createEmptyMatrix(15,15));

  const update = (field) => {
    setTimeout(() => {
      
      setTable(field);
    }, 1000);
  };

  const del_row = (index) => {
    
    setTable((prevTable) => prevTable.filter((_, i) => i !== index));
  };

  return (
    <TableContext.Provider value={{ table, update, del_row }}>
      {props.children}
    </TableContext.Provider>
  );
};

export default TableState;
