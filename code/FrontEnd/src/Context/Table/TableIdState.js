import { createContext, useContext, useState } from "react";
import TableIdContext from "./TableIdContext";

const TableIdState = (props) => {
    const[Id , setId] = useState('');
    const update = (key) => {
        setTimeout(() => {
          
          setId(key);
        }, 1000);
      };
    return (
      <TableIdContext.Provider value={{ Id , update}}>
        {props.children}
      </TableIdContext.Provider>
    );
  };
  
  export default TableIdState;