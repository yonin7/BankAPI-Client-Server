const express = require('express');
const Users = require('../models/users');

const router = new express.Router();

router.post('/api/users', async (req, res) => {
  console.log(req.body);
  const user = new Users(req.body);
  //check if user already exist
  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err);
  }
});

router.get('/api/users', async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send();
  }
});

// router.get('/api/products/actives', async (req, res) => {
//   try {
//     const activProduct = await Accounts.find({ isActive: true });
//     if (!activProduct) {
//       return res.status(404).send();
//     }
//     res.status(200).send(activProduct);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

// router.get('/api/price/:min/:max', async (req, res) => {
//   const min = req.params.min;
//   const max = req.params.max;

//   try {
//     const products = await Accounts.find({
//       $and: [
//         { 'details.Price': { $gte: min } },
//         { 'details.Price': { $lte: max } },
//       ],
//     });
//     if (!products) {
//       return res.status(400).send();
//     }
//     res.status(200).send(products);
//   } catch {
//     res.status(500).send();
//   }
// });

router.get('/api/users/:id', async (req, res) => {
  const passportID = req.params.id;
  try {
    const user = await Users.findOne({ passportID });
    if (!user) {
      return res.status(404).send('user not exists');
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
});

router.patch('/api/users/deposit/:id', async (req, res) => {
  //   console.log(req.body);
  //   const updates = Object.keys(req.body);
  //   const allowedUpdates = ['name', 'isActive', 'credit', 'cash'];
  //   const isValidOperation = updates.every((update) =>
  //     allowedUpdates.includes(update)
  //   );

  //   if (!isValidOperation) {
  //     return res.status(404).send({ error: 'Invalid updates!' });
  //   }
  const passportID = req.params.id;
  console.log(passportID);
  let userdata = await Users.findById(passportID);

  if (!userdata) {
    console.log(userdata);
    return res.status(404).send();
  }
  try {
    const cash = parseFloat(req.body.deposit);
    console.log(cash);
    console.log(req.body);
    userdata.cash += cash;
    console.log(userdata);
    const user = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      userdata,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send();
  }
});
router.patch('/api/users/credit/:id', async (req, res) => {
  const passportID = req.params.id;
  let userdata = await Users.findById(passportID);
  if (!userdata) {
    return res.status(404).send();
  }

  try {
    const credit = parseFloat(req.body.credit);
    userdata.credit = credit;
    const user = await Users.findByIdAndUpdate(
      { _id: req.params.id },
      userdata,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send();
  }
});
router.patch('/api/users/withdraw/:id', async (req, res) => {
  const passportID = req.params.id;
  let userdata = await Users.findById(passportID);
  if (!userdata) {
    return res.status(404).send();
  }

  try {
    const withdrawMoney = parseFloat(req.body.withdraw);
    const credit = userdata.credit;
    let cash = userdata.cash;

    if (credit + cash >= withdrawMoney) {
      cash -= withdrawMoney;
      userdata.cash = cash;
      const user = await Users.findByIdAndUpdate(
        { _id: req.params.id },
        userdata,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).send(user);
    }

    return res.status(404).send();
  } catch (error) {
    console.log(error.message);
    res.status(400).send();
  }
});
router.patch('/api/users/transfer/:id1/:id2', async (req, res) => {
  const passportID1 = req.params.id1;
  const passportID2 = req.params.id2;
  console.log(passportID1);
  console.log(passportID2);
  let user1data = await Users.findById(passportID1);
  let user2data = await Users.findById(passportID2);
  if (!user1data || !user2data) {
    return res.status(404).send();
  }

  try {
    const transfermoney = parseFloat(req.body.transfer);
    const credit = user1data.credit;
    let cash = user1data.cash;

    if (credit + cash >= transfermoney) {
      cash -= transfermoney;
      user1data.cash = cash;
      user2data.cash += transfermoney;
      const user1 = await Users.findByIdAndUpdate(
        { _id: passportID1 },
        user1data,
        {
          new: true,
          runValidators: true,
        }
      );
      const user2 = await Users.findByIdAndUpdate(
        { _id: passportID2 },
        user2data,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).send(user1);
    }

    return res.status(404).send();
  } catch (error) {
    console.log(error.message);
    res.status(400).send();
  }
});

router.delete('/api/users/:id', async (req, res) => {
  try {
    const product = await Users.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send('user not found');
    }
    res.status(200).send(`User ${product} deleted`);
  } catch (err) {
    console.log(err.message);
    res.status(500).send();
  }
});

// router.delete('/api/products', async (req, res) => {
//   try {
//     const products = await Accounts.deleteMany({});

//     if (!products || products.deletedCount === 0) {
//       return res.status(404).send('No products');
//     }
//     res.status(200).send(products);
//   } catch (err) {
//     res.status(500).send();
//   }
// });

module.exports = router;
