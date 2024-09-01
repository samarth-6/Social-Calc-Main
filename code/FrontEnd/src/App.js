import logo from './logo.svg';
import './App.css';
import Choose from './Components/Choose';
import Create from './Components/Create';
import Doc from './Components/Doc';
import TableState from './Context/Table/TableState';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TableIdState from './Context/Table/TableIdState';

function App() {
  return (
    <TableState>
    <TableIdState>
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1c1c1c, #282828)' }}>
    <Router>
      <Routes>
       
        <Route path="/" element={<Choose />} />
        <Route path="/create" element={<Create />} />
        <Route path="/Doc/:doc_id" element={<Doc/>}></Route>
      </Routes>
    </Router>
    </div>
    </TableIdState>
    </TableState>
  );
}

export default App;
