import { useEffect, useState } from 'react';
import myUrl from './api/Api';
import Card from './components/Card/Card';

// import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [usersData, setUsersData] = useState([]);

  const getReq = async (req, res) => {
    const { data } = await myUrl.post('/users');
    console.log(data);
  };

  // const handledisplay = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await myUrl.get('/users', {
  //       // collection: 'users',
  //       // database: 'myFirstDatabase',
  //       // dataSource: 'Cluster0',
  //     });
  //     setUserData(response.data);
  //     setIsLoading(false);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await myUrl.get('/users');
      setUserData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {/* {handledisplay()} */}
      {userData?.map((user) => {
        return <Card user={user} />;
      })}
      <div>
        <button onClick={getReq}>click</button>
      </div>
    </div>
  );
}

export default App;
