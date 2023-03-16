import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { Room } from './components/pages/Room';
import { RecoilRoot } from 'recoil';
import { Setting } from './components/pages/Setting';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<Room />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
