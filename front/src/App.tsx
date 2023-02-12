import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Room } from './components/pages/Room';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
