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
        <form>
          <h5>passportID</h5>
          <input
            type="text"
            id="passportID"
            onChange={(e) => handleCreate(e)}
          />
          <h5> name</h5>{' '}
          <input type="text" id="name" onChange={(e) => handleCreate(e)} />
          <h5> cash</h5>
          <input type="text" id="cash" onChange={(e) => handleCreate(e)} />
          <h5> credit</h5>{' '}
          <input type="text" id="credit" onChange={(e) => handleCreate(e)} />
        </form>
        <input type="submit" onClick={() => sendNewUser()} />
      </div>
      ;
    </div>
  );
}

export default App;
