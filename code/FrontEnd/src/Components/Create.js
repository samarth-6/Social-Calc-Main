import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableContext from '../Context/Table/TableContext';
import { useSocket } from '../Context/Socket/SocketProvider';
import TableIdContext from '../Context/Table/TableIdContext';

const Create = () => {
  const { table, update } = useContext(TableContext);
  const [col_no, setColNo] = useState(0);
  // const [fields, setFields] = useState([]);
  const TableId = useContext(TableIdContext);
  const socket = useSocket();
  const navigate = useNavigate();

  // const handleInputChange = (index, event) => {
  //   const newFields = [...fields];
  //   newFields[index] = event.target.value;
  //   setFields(newFields);
  // };

  // const click = () => {
  //   const newFields = Array(col_no).fill('');
  //   setFields(newFields);
  // };

  const handleButtonClick = () => {
    navigate(`/Doc/${TableId.Id}`);
  };

  const saveData = () => {
    socket.emit("join", { table, roomId: TableId.Id });
    console.log('Updated table with fields:', table);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.title}></div>
        {/* <input
          type="number"
          value={col_no}
          onChange={(e) => setColNo(Number(e.target.value))}
          style={styles.input}
        /> */}
        <div style={styles.inputGroup}>
          <label htmlFor="tableId" style={styles.label}>ID</label>
          <input
            id="tableId"
            type="text"
            onChange={(e) => TableId.update(e.target.value)}
            style={styles.input}
          />
        </div>
        {/* <button onClick={click} style={styles.createButton}>Create</button> */}

        {/* <div style={styles.inputContainer}>
          {fields.map((field, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Column ${index + 1}`}
              value={field}
              onChange={(e) => handleInputChange(index, e)}
              style={styles.input}
            />
          ))}
        </div> */}

        <button onClick={saveData} style={styles.saveButton}>Save</button>
        <button onClick={handleButtonClick} style={styles.goButton}>GO</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    padding: '20px',
  },
  box: {
    textAlign: 'center',
    backgroundColor: '#2c2c34',
    padding: '40px',
    borderRadius: '15px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    maxWidth: '400px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: '20px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '16px',
    color: '#dddddd',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #444',
    marginBottom: '20px',
    backgroundColor: '#3c3c44',
    color: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  createButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4a4e69',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  saveButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#2a9d8f',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '10px',  // Added space between buttons
    transition: 'background-color 0.3s, transform 0.3s',
  },
  goButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#e76f51',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, box-shadow 0.3s, transform 0.3s',
    marginBottom: '20px',
  },
  buttonHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default Create;
