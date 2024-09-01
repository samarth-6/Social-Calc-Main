import React, { useState, useEffect, useContext } from 'react';
import TableContext from '../Context/Table/TableContext';
import { useSocket } from '../Context/Socket/SocketProvider';
import TableIdContext from '../Context/Table/TableIdContext';

const Doc = () => {
  const { table, update } = useContext(TableContext);
  const { Id } = useContext(TableIdContext);
  const Socket = useSocket();

  const [updatedTable, setupdatedTable] = useState(table);

  useEffect(() => {
    setupdatedTable(table);
  }, [table]);

  useEffect(() => {
    if (Socket) {
      // Handle the 'commited' event
      const handleCommit = (data) => {
        console.log('Received commited event with data:', data);
        setupdatedTable(data);
      };

      // Handle the 'join' event
      const handleJoin = (data) => {
        console.log('Received join event with data:', data);
        setupdatedTable(data);
      };

      // Listen for 'commited' and 'join' events
      Socket.on('commited', handleCommit);
      Socket.on('joinned', handleJoin);

      // Clean up the event listeners on component unmount
      return () => {
        Socket.off('commited', handleCommit);
        Socket.off('joinned', handleJoin);
      };
    }
  }, [Socket]);

  // const addRow = () => {
  //   console.log('hear');
  //   const emptyRow = Array(updatedTable[0].length).fill('');
  //   const newTable = [...updatedTable, emptyRow];

  //   setupdatedTable(newTable);
  //   Socket.emit('commit', { table: newTable, Id });
  // };

  // const deleteRow = (rowIndex) => {
  //   if (updatedTable.length > 1 && rowIndex > 0) {
  //     const newTable = updatedTable.filter((_, index) => index !== rowIndex);

  //     setupdatedTable(newTable);
  //     Socket.emit('commit', { table: newTable, Id });
  //   }
  // };

  const handleInputChange = (rowIndex, colIndex, event) => {
    console.log(rowIndex, colIndex, event.target.value);
    const value = event.target.value;
    const newTable = updatedTable.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : cell
      )
    );
    console.log(newTable);

    setupdatedTable(newTable);
    Socket.emit('commit', { table: newTable, Id });
  };

  if (!Array.isArray(updatedTable) || updatedTable.length === 0) {
    return <div style={styles.noData}>No data available</div>;
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        
        <tbody>
          {updatedTable.map((row, rowIndex) => (
            <tr key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} style={styles.cell}>
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) => handleInputChange(rowIndex , colIndex, e)}
                    style={styles.input}
                  />
                </td>
              ))}
              {/* <td style={styles.cell}>
                <button
                  onClick={() => deleteRow(rowIndex + 1)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div style={styles.buttonContainer}>
        <button onClick={addRow} style={styles.addButton}>Add Row</button>
      </div> */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height:'100vh',
    background: 'linear-gradient(135deg, #1c1c1c, #282828)',
    padding: '30px',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  table: {
    borderCollapse: 'collapse',
    width:'fit',
    marginBottom: '30px',
    backgroundColor: '#2b2b2b',
    overflow: 'hidden',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  },
  // headerCell: {
  //   padding: '16px',
  //   backgroundColor: '#444444',
  //   color: '#ffffff',
  //   textAlign: 'center',
  //   fontSize: '18px',
  //   fontWeight: '600',
  //   borderBottom: '2px solid #555555',
  //   position: 'sticky',
  //   top: 0,
  //   zIndex: 1,
  // },
  cell: {
    width:'120px',
    border:'2px solid white',
    textAlign: 'center',
    backgroundColor: '#3b3b3b',
  },
  row: {
    transition: 'background-color 0.2s',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #555',
    outline: 'none',
    backgroundColor: '#444',
    color: '#eee',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  addButton: {
    padding: '12px 25px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#556b2f',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  deleteButton: {
    padding: '8px 15px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#8b0000',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
  noData: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
    color: '#bbb',
  },
};

export default Doc;
