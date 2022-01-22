import myUrl from './api/Api';
import axios from 'axios';

// import './App.css';

function App() {
  const getReq = async (req, res) => {
    const { data } = await myUrl.get('/users');
    console.log(data);
  };
  return (
    <div className="App">
      <header className="App-header">'hello world'</header>
      <button onClick={getReq}>click</button>
    </div>
  );
}

export default App;
