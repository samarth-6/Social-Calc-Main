import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TableIdContext from '../Context/Table/TableIdContext';
import { useSocket } from '../Context/Socket/SocketProvider';

const Choose = () => {
  const { Id, update } = useContext(TableIdContext);
  const socket = useSocket();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/Doc/${Id}`);
    socket.emit("join", { table: [], roomId: Id });
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={styles.title}>Enter Doc Id</div>
        <div>
          <input 
            type="text" 
            style={styles.input} 
            onChange={(e) => update(e.target.value)} 
          />
        </div>
        <button onClick={handleButtonClick} style={styles.joinButton}>JOIN</button>
        <div style={styles.orText}>OR</div>
        <div>
          <Link to='/Create' style={styles.link}>NEW</Link>
        </div>
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
  joinButton: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#2a9d8f',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  orText: {
    margin: '20px 0',
    fontSize: '18px',
    color: '#dddddd',
  },
  link: {
    display: 'inline-block',
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#e76f51',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, box-shadow 0.3s',
  },
};

export default Choose;
