import { useState } from 'react';
import myUrl from './api/Api';
import Card from './components/Card/Card';

// import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const getReq = async (req, res) => {
    const { data } = await myUrl.get('/users');
    console.log(data);
  };

  const handledisplay = async () => {
    try {
      setIsLoading(true);
      const response = await myUrl.get('/users', {
        collection: 'users',
        database: 'myFirstDatabase',
        dataSource: 'Cluster0',
      });
      setUserData(response.data.documents);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      {handledisplay}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        userData.map((user, i) => {
          <Card user={user} />;
        })
      )}
      <header className="App-header">'hello world'</header>
      <button onClick={getReq}>click</button>
    </div>
  );
}

export default App;
