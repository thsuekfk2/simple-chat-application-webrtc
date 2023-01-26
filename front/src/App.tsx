import { io } from 'socket.io-client';

function App() {
  const socket = io(`http://localhost:3000`);
  console.log(socket);
  return <div className="App">test</div>;
}

export default App;
