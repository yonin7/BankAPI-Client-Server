import { useEffect, useState } from 'react';
import myUrl from './api/Api';
import Card from './components/Card/Card';
import './App.css';

function App() {
  const [userData, setUserData] = useState([]);
  const [newUser, SetNewUser] = useState({
    passportID: '',
    name: '',
    cash: 0,
    credit: 0,
  });

  const handleDelete = async (id) => {
    console.log(id);

    const { data } = await myUrl.delete(`/users/${id}`);
    console.log(data);
    let newData = userData.filter((Obj) => Obj.passportID !== id);
    console.log(newData);

    setUserData({ newData });
  };
  useEffect(() => {
    const timeOut = setTimeout(async () => {
      try {
        const { data } = await myUrl.get('/users');
        setUserData(data);
      } catch (e) {
        setUserData([]);
      }
      return () => {};
    });
  }, [userData]);

  const handleCreate = (e) => {
    const tempUser = newUser;
    tempUser[e.target.id] = e.target.value;
    SetNewUser(tempUser);
  };
  const sendNewUser = async () => {
    console.log(newUser);
    const { data } = await myUrl.post(`/users`, newUser);
  };
  return (
    <div className="App">
      {Array.isArray(userData) &&
        userData.map((user) => {
          return (
            <div className="cardscontainer" key={user._id}>
              {' '}
              <Card
                usersData={userData}
                user={user}
                handleDelete={handleDelete}
              />
            </div>
          );
        })}
      <div className="inputcontainer">
        <h2>Add Account:</h2>
        <form>
          <h5>PassportID:</h5>
          <input
            type="text"
            id="passportID"
            placeholder="passportID"
            onChange={(e) => handleCreate(e)}
          />
          <h5> Name:</h5>{' '}
          <input
            type="text"
            id="name"
            placeholder="name"
            onChange={(e) => handleCreate(e)}
          />
          <h5> Cash:</h5>
          <input
            type="text"
            id="cash"
            placeholder="cash"
            onChange={(e) => handleCreate(e)}
          />
          <h5> Credit:</h5>{' '}
          <input
            type="text"
            id="credit"
            placeholder="credit"
            onChange={(e) => handleCreate(e)}
          />
        </form>
        <input className="submit" type="submit" onClick={() => sendNewUser()} />
      </div>
      ;
    </div>
  );
}

export default App;
