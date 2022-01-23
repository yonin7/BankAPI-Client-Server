import { useState } from 'react';
// import Input from '../Input/Input';
import myUrl from '../../api/Api';
import './card.css';

const Card = ({ usersData, user, handleDelete }) => {
  const [fields, SetFields] = useState({
    name: user.name,
    cash: user.cash,
    credit: user.credit,
  });
  const [money, setMoney] = useState(0);
  const [hide, setHide] = useState(true);

  //   const handleUpdate = async (e) => {
  //     // console.log(e.target.value);
  //     const tempFields = fields;
  //     tempFields[e.id] = e.value;
  //     SetFields(tempFields);
  //     const { data } = await myUrl.patch(`/users/${user._id}`, fields);
  //   };
  const changeMoney = (e) => {
    setMoney(e.target.value);
  };

  const handleDeposit = async (e) => {
    const { data } = await myUrl.patch(`/users/deposit/${user._id}`, {
      deposit: money,
    });
  };
  const handleCredit = async (e) => {
    const { data } = await myUrl.patch(`/users/credit/${user._id}`, {
      credit: money,
    });
  };
  const handleWithdraw = async (e) => {
    const { data } = await myUrl.patch(`/users/withdraw/${user._id}`, {
      withdraw: money,
    });
  };
  const optionsTransfer = async (e) => {
    setHide(!hide);
  };
  const handleTransfer = async (e) => {
    let selectedIndex = e.target.options.selectedIndex;
    console.log(user._id);
    console.log();
    const { data } = await myUrl.patch(
      `/users/transfer/${user._id}/${e.target[selectedIndex].id}`,
      {
        transfer: money,
      }
    );
  };

  return (
    <div className="container">
      <div className="text">
        <h2>User Details:</h2>
        <div className="detailsContainer">
          <label>PassportID:</label>
          <div>{user.passportID}</div>
          <label> Full Name:</label>{' '}
          <div type="text" id="name">
            {user.name}
          </div>
          <label> Cash:</label>
          <div type="text" id="cash">
            {user.cash}
          </div>
          <label> Credit:</label>{' '}
          <div type="text" id="credit">
            {user.credit}
          </div>
        </div>
      </div>
      <div className="actionsContainer">
        <h2>Actions:</h2>
        <input
          className="Delete"
          type="submit"
          value="❌"
          onClick={() => handleDelete(user._id)}
        />
        {/* <Input user={user} handleUpdate={handleUpdate} fields={fields} /> */}
        <input
          className="moneyinput"
          type="number"
          min="0"
          onChange={(e) => changeMoney(e)}
        />
        <div className="actionsContainer inputs">
          <input
            className="submit"
            type="submit"
            value="Deposit"
            onClick={(e) => handleDeposit(e)}
          />
          <input
            className="submit"
            type="submit"
            value="Credit"
            onClick={(e) => handleCredit(e)}
          />
          <input
            className="submit"
            type="submit"
            value="Withdraw"
            onClick={(e) => handleWithdraw(e)}
          />
          <input
            className="submit"
            type="submit"
            value="Transfer"
            onClick={(e) => optionsTransfer(e)}
          />
        </div>
        {hide ? null : (
          <select onClick={(e) => handleTransfer(e)}>
            {usersData.map((usery) => {
              if (usery._id == user._id) return null;
              return (
                <option key={usery._id} id={usery._id}>
                  {usery.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </div>
  );
};

export default Card;
